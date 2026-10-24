# Deploying the frontend to Cloudways

Production for [2p.ma](https://2p.ma) is the git clone at:

```text
/home/master/applications/pfpxvernvm/public_html
```

That directory is both the repository root and the webroot. Apache (behind Cloudways nginx) serves `index.html` and `assets/` from it. `build.sh` is what copies a finished Vite build into those two paths. `dist/` is build output, not the document root.

A push to `main` builds in GitHub Actions, then SSHs to the server and runs `scripts/deploy.sh`. The same script is the manual fallback.

## Why the deploy works this way

The previous workflow uploaded `dist/*` with `appleboy/scp-action`, `strip_components: 0`, and `rm: false`.

- `strip_components: 0` keeps the `dist/` prefix, so the files land in `public_html/dist/`. The live site does not read that directory. It reads `public_html/index.html` and `public_html/assets/`.
- `rm: false` never removes previous hashed files, so old JS and CSS accumulate.
- `rm: true` is not a fix. The target would be the whole `public_html` clone. Deleting it would remove `.git`.

`rsync --delete` of the webroot is the same kind of mistake. The clone contains `.git`, the server-only `.env`, and sitemap dumps that are not in git. The deploy script never deletes those. It builds in a worktree outside `public_html`, and it uses `rsync --delete` only for `assets/` and `dist/`.

Nothing is published until that outside build succeeds. A failed `bun install`, a failed `build.sh`, or a dist check exits before the first write to the webroot, so the live `index.html` and `assets/` stay as they were.

Optional cleanup does not fail a deploy. `git worktree prune`, and `chmod` of the index file that is about to go live, log a warning and continue. The Vite cache wipe in `build.sh` (`node_modules/.vite`) runs inside the side worktree; if it fails, the build continues, and the webroot is still untouched until that build succeeds. This deploy does not copy sitemap dumps or flush a server cache. `sitemaps/` and `sitemapss/` are left in place. If either directory, `.git`, or `.env` was present and is missing after publish, the script still exits with an error, because that is missing data, not a skipped copy.

## What a deploy changes

| Path | What happens |
| --- | --- |
| `index.html` | Replaced with the new build, after the new assets are already on disk. Gitignored, so `git reset` does not own it. |
| `assets/` | New hashed files are added, then files this build did not emit are removed. Treat this directory as build output only. |
| `dist/` | Replaced with this build (`rsync --delete` inside `dist/` only). |
| Tracked files (`.htaccess`, `robots.txt`, `ads.xml`, `sitemap.xml`, `blog.xml`, `pages.xml`, favicons, `site.webmanifest`, source) | `git reset --hard` to the deployed commit. Local edits to tracked files are discarded. |
| `.git` | Kept. The script refuses to run if it would stop being a git checkout of this repo. |
| `.env` and `.env.*` | Kept. Not in git. Copied into the build worktree so Vite can read them. |
| `sitemaps/`, `sitemapss/` | Kept. Gitignored server dumps. `sitemap.xml` links to `sitemaps/`. |
| Anything else outside `assets/` and `dist/` (`.well-known/`, `cgi-bin/`, `.user.ini`, stray favicons that are not in git) | Kept. |
| `node_modules/` in the webroot | Kept, but unused. The build installs a fresh one in the side worktree. You can delete the webroot copy by hand to free disk. |

Do not put server-only files inside `assets/` or `dist/`. Those two directories are wiped to match the build.

The side worktree lives in `../.deploy-work/` (next to `public_html`, not served) or, if that parent is not writable, under `/tmp/2p-frontend-deploy/`. It is removed at the end of the run.

## GitHub Actions

Workflow: `.github/workflows/vue-frontend.yml`.

- Runs on every push to `main`, and from the Actions tab via **Run workflow**.
- A pull request targeting `main` runs the build job only. It does not SSH or publish. The first publish of a change is the push to `main` after merge, or a manual run.
- Builds with Bun `1.3.9` (the version on the server) and `bun install --frozen-lockfile`.
- Fails the job if the bundle is missing or if `dist/index.html` still points at `/src/main.js`.
- Uploads `dist/` as the `vue-frontend-dist` artifact for 30 days. That artifact is a record of the CI compile. The server builds again so it can read the server `.env`. The bytes visitors receive are the server build.
- Deploys only after the CI build succeeds, and deploys that exact commit (`github.sha`, or the commit checked out for a manual run).
- A second push waits. An in-progress deploy is not cancelled. The server also takes a lock so a manual run cannot overlap Actions.

Manual run: Actions → **Build and Deploy Vue Frontend** → **Run workflow**. Set **ref** only for a rollback (a full SHA, a tag, or a branch name such as `main`). Leave it empty to deploy the commit you selected in the workflow UI.

## GitHub secrets

Repository → Settings → Secrets and variables → Actions.

| Secret | Required | Value |
| --- | --- | --- |
| `DEPLOY_HOST` | yes | `165.227.235.60` |
| `DEPLOY_USER` | yes | `master_bcuuqjymxp` (the Cloudways master user, not the app user) |
| `DEPLOY_SSH_KEY` | yes | Private key that can log in as that master user. Paste the whole file, including the `BEGIN` / `END` lines. A single line with literal `\n` is accepted. |
| `DEPLOY_PATH` | no | Defaults to `/home/master/applications/pfpxvernvm/public_html`. |
| `DEPLOY_PORT` | no | Defaults to `22`. |
| `VITE_API_BASE_URL` | yes | Site origin only, `https://2p.ma`. No trailing slash and no `/api` suffix. `src/services/api.js` appends `/api` itself. |

When Actions runs the server script, the secret overrides `VITE_API_BASE_URL` from the server `.env` for that build. Other `VITE_*` variables (`VITE_ACCOUNT_URL`, `VITE_APP_URL`, `VITE_MIGRATION_MODE`) still come from the server `.env`. A manual `./scripts/deploy.sh` with the variable unset uses `.env` for the API origin too. If neither is set, the app falls back to `https://2p.ma/api`.

## One-time server setup

The clone, Bun `1.3.9`, and the app user are already in place. Do this once so Actions can log in.

1. On a trusted machine, create a key used only for deploy:

   ```bash
   ssh-keygen -t ed25519 -C "github-actions-2p-front" -f deploy_key
   ```

2. In Cloudways, open the server → **Master Credentials** and add `deploy_key.pub` to the master user's SSH keys.

3. Store `deploy_key` (the private file) in the `DEPLOY_SSH_KEY` secret, and set the other secrets from the table above.

4. Confirm the master user can log in, reach Bun, and fetch. The master user has no sudo; the deploy does not need it.

   ```bash
   ssh -i deploy_key master_bcuuqjymxp@165.227.235.60
   ~/.bun/bin/bun --version
   id
   git -C /home/master/applications/pfpxvernvm/public_html fetch origin
   rsync --version
   ```

   `id` should show primary group `www-data`. The webroot is mode `775` and group `www-data`, so this user can write there. The repo is public, so `git fetch` does not need a token. If fetch prompts or fails, point `origin` at `https://github.com/buddy-ma/2p-front.git`.

5. Nginx history-mode routing is not part of the rsync. Cloudways nginx is configured in the panel. The snippet in `.nginx.conf` (`try_files $uri $uri/ /index.html`) belongs under the application → **Domain Management** → nginx configuration. Apache still uses the repo `.htaccess`, which deploy updates with the rest of the tracked files. The `.htaccess` also denies web access to dotfiles, which is what keeps `.env` from being served.

## Deploy by hand

SSH in as the master user, then:

```bash
cd /home/master/applications/pfpxvernvm/public_html
./scripts/deploy.sh
```

That fetches `origin/main`, builds outside the webroot, and publishes. Check the script first with `./scripts/deploy.sh --help`.

Do not run `./build.sh` inside `public_html`. It would replace the live `index.html` with the Vite source shell while it compiles. `build.sh` now exits if its directory is `public_html`. `scripts/deploy.sh` runs it in the side worktree instead.

Override the commit or the API origin when you need to:

```bash
DEPLOY_REF=7329fd018f5a29e55bb9af6333a329bba4e3f907 ./scripts/deploy.sh
VITE_API_BASE_URL=https://2p.ma ./scripts/deploy.sh
```

`DEPLOY_REF` may be a full SHA, a tag, or `origin/main`. A bare `main` is treated as `origin/main`.

The script stops if tracked files in the webroot are dirty, or if the clone has commits that are not on `origin/main`. Untracked and gitignored files do not block a deploy. Fix or discard the tracked edits, then run it again.

## Rollback

Roll back by deploying a known-good commit. That rebuilds it; it does not unpack an old `dist/` tarball.

From GitHub: **Run workflow** on `main`, and set **ref** to the good full SHA.

From the server:

```bash
DEPLOY_REF=<40-character-sha> ./scripts/deploy.sh
```

The previous live files stay up until that build finishes. The `vue-frontend-dist` artifact on the old green run is the CI compile of that commit, useful to inspect, and it is not what gets copied to the webroot.

Recent commits build from `index-new.html`. A rollback target has to be a commit `bun install --frozen-lockfile` and `bun run build` can still compile.

## `index-new.html` and `index.html`

Vite's production entry is `index.html`. That file is gitignored because it is build output: the HTML shell with hashed `/assets/...` URLs. The source document is `index-new.html`.

`package.json` has `"prebuild": "cp index-new.html index.html"`, and `build.sh` copies it as well, so `bun run build` works on a clean checkout. CI does the same copy before `bun run build`. The file that is published is `dist/index.html` after Vite rewrites it, never `index-new.html` itself.

The built HTML still requests `/android-chrome-128x128.png` and `/safari-pinned-tab.svg` from the site root. Those two files are not in this repository. A deploy leaves them alone if they are already on the server, and it does not create them.

## Permissions

The deploy SSHes in as `master_bcuuqjymxp` and runs as that user. It does not call sudo, chown, or chgrp. The account's primary group is `www-data`, and `scripts/deploy.sh` sets `umask 002`, so new files are `664` and new directories are `775`, group `www-data`. That keeps them group-writable and readable by the web server. The script does not change the owner of files it does not replace.
