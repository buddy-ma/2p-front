#!/usr/bin/env bash
# Publish the Vue frontend on the Cloudways server.
#
# The application webroot IS the git clone. Visitors are served index.html
# and assets/ from that directory (build.sh's publish layout). This script
# therefore must not rsync --delete or git clean the webroot: .git, .env,
# sitemaps/, and other untracked server files have to stay.
#
# What it does:
#   1. Fetch origin (no working-tree changes yet).
#   2. Build in a detached worktree OUTSIDE public_html.
#   3. Only if that build succeeds, publish dist/index.html, dist/assets,
#      and dist/ into the webroot, then git reset --hard the tracked files.
#      A failed install or build exits before the webroot is modified.
#   4. --delete is applied only to assets/ and dist/, which are build output.
#   5. Optional cleanup (worktree prune, chmod of the published index.html)
#      logs a warning and continues. This script does not copy sitemap dumps
#      or flush a server cache. If sitemaps/, .git, or .env disappear during
#      publish, that is data loss and the script still exits with an error.
#
# Run on the server as the SSH user (Cloudways master). That account has no
# sudo. The webroot is group www-data and mode 775, and the master's primary
# group is www-data, so umask 002 keeps new files group-writable and readable
# by the web server. Do not sudo, chown, or chgrp.
#
#   ./scripts/deploy.sh
#   DEPLOY_REF=<sha> ./scripts/deploy.sh
#
# See DEPLOY.md.

set -euo pipefail

# Re-exec from a temp file so a later git reset cannot change the script
# under bash. Actions streams this file on SSH stdin (`bash -s`) because
# Cloudways SFTP is chrooted and scp cannot write the shell's /tmp. The
# copy includes this script from the next `set -e` downward (functions
# included) and closes stdin, so git, bun, and rsync cannot consume the
# unread script. mktemp runs in the SSH shell, not in the SFTP chroot.
if [ "${DEPLOY_SH_REEXEC:-0}" != "1" ]; then
  reexec=$(mktemp /tmp/2p-deploy.XXXXXX.sh)
  if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
    cp "${BASH_SOURCE[0]}" "$reexec"
  else
    cat > "$reexec"
  fi
  if [ ! -s "$reexec" ]; then
    printf 'ERROR: deploy script was empty\n' >&2
    rm -f "$reexec"
    exit 1
  fi
  chmod 700 "$reexec"
  export DEPLOY_SH_REEXEC=1
  exec bash "$reexec" "$@" </dev/null
fi

set -euo pipefail

DEFAULT_DEPLOY_PATH="/home/master/applications/pfpxvernvm/public_html"

log() {
  printf '==> %s\n' "$*"
}

die() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  cat <<EOF
Usage: ./scripts/deploy.sh

Environment:
  DEPLOY_PATH          Webroot (default: ${DEFAULT_DEPLOY_PATH})
  DEPLOY_REF           Git ref to deploy (default: origin/main)
  VITE_API_BASE_URL    Optional. Overrides the server .env for this build.
                       Origin only, for example https://2p.ma — do not append /api.
  BUN_BIN              Override the bun binary.

The live site is not modified until the build in the side worktree succeeds.
EOF
  exit 0
fi

export GIT_TERMINAL_PROMPT=0
# 002 -> files 664, directories 775, group www-data (the SSH user's primary group).
umask 002
cd /tmp

DEPLOY_PATH="${DEPLOY_PATH:-$DEFAULT_DEPLOY_PATH}"
DEPLOY_REF="${DEPLOY_REF:-origin/main}"

case "$DEPLOY_REF" in
  main|master) DEPLOY_REF="origin/$DEPLOY_REF" ;;
esac

if [[ "$DEPLOY_REF" == *..* ]] || [[ ! "$DEPLOY_REF" =~ ^[A-Za-z0-9._/-]+$ ]]; then
  die "Refusing DEPLOY_REF ($DEPLOY_REF)"
fi
if [[ ! "$DEPLOY_PATH" =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  die "Refusing DEPLOY_PATH ($DEPLOY_PATH)"
fi
DEPLOY_PATH="${DEPLOY_PATH%/}"
if [ ! -d "$DEPLOY_PATH" ]; then
  die "DEPLOY_PATH does not exist: $DEPLOY_PATH"
fi
DEPLOY_PATH=$(readlink -f "$DEPLOY_PATH")
if [ "$(basename "$DEPLOY_PATH")" != "public_html" ]; then
  die "DEPLOY_PATH must be the application public_html directory (got $DEPLOY_PATH)"
fi

validate_api_base() {
  local url="$1"
  [ -n "$url" ] || return 0
  case "$url" in
    */)
      die "VITE_API_BASE_URL must not have a trailing slash"
      ;;
    */api)
      die "VITE_API_BASE_URL must be the site origin without /api (src/services/api.js appends /api)"
      ;;
  esac
}
validate_api_base "${VITE_API_BASE_URL:-}"

# The clone may be owned by the app user. Fetch already works for the master
# SSH user; pin safe.directory so a non-interactive shell does not trip
# Git's dubious-ownership check. This does not change ownership.
git_repo() {
  git -c safe.directory="$DEPLOY_PATH" -C "$DEPLOY_PATH" "$@"
}

LOCK_FILE="/tmp/2p-frontend-deploy.lock"
touch "$LOCK_FILE"
chmod 666 "$LOCK_FILE" || true
exec 9<>"$LOCK_FILE"
if ! flock -w 900 9; then
  die "Timed out waiting for another deploy to finish"
fi

resolve_bun() {
  local candidate home
  if [ -n "${BUN_BIN:-}" ] && [ -x "$BUN_BIN" ]; then
    printf '%s\n' "$BUN_BIN"
    return 0
  fi
  if command -v bun >/dev/null 2>&1; then
    command -v bun
    return 0
  fi
  for candidate in "${HOME:-}/.bun/bin/bun" /home/master/.bun/bin/bun /usr/local/bin/bun; do
    if [ -x "$candidate" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  home=$(getent passwd "$(id -un)" | cut -d: -f6 || true)
  if [ -n "$home" ] && [ -x "$home/.bun/bin/bun" ]; then
    printf '%s\n' "$home/.bun/bin/bun"
    return 0
  fi
  return 1
}

BUN_BIN=$(resolve_bun) || die "bun was not found. Install it for the SSH user (expected ~/.bun/bin/bun)."
if [ ! -x "$BUN_BIN" ]; then
  die "bun at $BUN_BIN is not executable by $(id -un)"
fi
BUN_DIR=$(dirname "$BUN_BIN")
log "Using bun $("$BUN_BIN" --version) ($BUN_BIN) as $(id -un)"

command -v rsync >/dev/null 2>&1 || die "rsync is required on the server"
command -v git >/dev/null 2>&1 || die "git is required on the server"

BUILD_DIR=""
cleanup() {
  status=$?
  if [ -n "$BUILD_DIR" ]; then
    case "$BUILD_DIR" in
      */.deploy-work/build.[0-9]*|/tmp/2p-frontend-deploy/build.[0-9]*)
        git_repo worktree remove --force "$BUILD_DIR" >/dev/null 2>&1 || true
        rm -rf "$BUILD_DIR" || true
        git_repo worktree prune >/dev/null 2>&1 || true
        ;;
      *)
        printf 'WARNING: not removing unexpected build dir %s\n' "$BUILD_DIR" >&2
        ;;
    esac
  fi
  if [ -n "${DEPLOY_PATH:-}" ]; then
    rm -f "$DEPLOY_PATH/index.html.next" >/dev/null 2>&1 || true
  fi
  exit "$status"
}
trap cleanup EXIT

if ! git_repo rev-parse --is-inside-work-tree >/dev/null; then
  die "$DEPLOY_PATH is not a git work tree"
fi
git_root=$(git_repo rev-parse --show-toplevel)
git_root=$(readlink -f "$git_root")
if [ "$git_root" != "$DEPLOY_PATH" ]; then
  die "DEPLOY_PATH ($DEPLOY_PATH) is not the git root ($git_root)"
fi

if [ -n "$(git_repo status --porcelain --untracked-files=no)" ]; then
  die "Tracked files in the webroot have local changes. Commit them elsewhere or discard them before deploying."
fi

log "Fetching origin/main"
if ! git_repo fetch origin main --prune --tags; then
  die "git fetch origin main failed. The public_html clone must be able to fetch https://github.com/buddy-ma/2p-front as $(id -un)."
fi

if ! git_repo merge-base --is-ancestor HEAD origin/main; then
  die "The webroot has commits that are not on origin/main. Refusing to reset over local history."
fi

if ! git_repo rev-parse --verify --quiet "${DEPLOY_REF}^{commit}" >/dev/null; then
  if [ "$(git_repo rev-parse --is-shallow-repository)" = "true" ]; then
    log "Unshallowing the clone so $DEPLOY_REF can be resolved"
    git_repo fetch --unshallow origin
  fi
  log "Fetching $DEPLOY_REF"
  if ! git_repo fetch origin "$DEPLOY_REF"; then
    die "Could not fetch $DEPLOY_REF"
  fi
fi
if ! TARGET=$(git_repo rev-parse --verify "${DEPLOY_REF}^{commit}"); then
  die "Could not resolve $DEPLOY_REF"
fi
log "Deploying $TARGET"

parent=$(dirname "$DEPLOY_PATH")
if  test -w "$parent"; then
  BUILD_PARENT="$parent/.deploy-work"
else
  BUILD_PARENT="/tmp/2p-frontend-deploy"
fi
case "$BUILD_PARENT" in
  "$DEPLOY_PATH"|"$DEPLOY_PATH"/*)
    die "Refusing to build inside the webroot"
    ;;
esac
 mkdir -p "$BUILD_PARENT"
# Stale worktree metadata is cleanup, not a reason to abort before the build.
git_repo worktree prune || log "WARNING: git worktree prune failed. Continuing."
BUILD_DIR="$BUILD_PARENT/build.$$"
log "Building in $BUILD_DIR (outside the webroot)"
git_repo worktree add --detach "$BUILD_DIR" "$TARGET"

for env_name in .env .env.production .env.local .env.production.local; do
  if [ -f "$DEPLOY_PATH/$env_name" ]; then
    if [ -r "$DEPLOY_PATH/$env_name" ]; then
      cp "$DEPLOY_PATH/$env_name" "$BUILD_DIR/$env_name"
    else
      log "WARNING: $DEPLOY_PATH/$env_name is not readable by $(id -un). Left in place and not loaded into this build."
    fi
  fi
done

app_path="${BUN_DIR}:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
build_env=("PATH=${app_path}")
if [ -n "${VITE_API_BASE_URL:-}" ]; then
  build_env+=("VITE_API_BASE_URL=${VITE_API_BASE_URL}")
  log "VITE_API_BASE_URL is set for this build and overrides .env"
else
  log "VITE_API_BASE_URL is not set; the build uses the server .env if present"
fi

log "Installing dependencies"
if !  env "${build_env[@]}" bash -c 'cd "$1" && bun install --frozen-lockfile' bash "$BUILD_DIR"; then
  die "bun install failed. The live site was not modified."
fi

log "Running build.sh"
if !  env "${build_env[@]}" bash -c 'cd "$1" && bash ./build.sh' bash "$BUILD_DIR"; then
  die "Build failed. The live site was not modified."
fi

if !  test -s "$BUILD_DIR/dist/index.html"; then
  die "dist/index.html is missing. The live site was not modified."
fi
if  grep -q '/src/main.js' "$BUILD_DIR/dist/index.html"; then
  die "dist/index.html still references /src/main.js. The live site was not modified."
fi
if !  test -d "$BUILD_DIR/dist/assets"; then
  die "dist/assets is missing. The live site was not modified."
fi
if [ -z "$( ls -A "$BUILD_DIR/dist/assets")" ]; then
  die "dist/assets is empty. Refusing to delete live assets."
fi

had_env=0
had_sitemaps=0
had_sitemapss=0
had_git=0
if  test -e "$DEPLOY_PATH/.env"; then had_env=1; fi
if  test -d "$DEPLOY_PATH/sitemaps"; then had_sitemaps=1; fi
if  test -d "$DEPLOY_PATH/sitemapss"; then had_sitemapss=1; fi
if  test -d "$DEPLOY_PATH/.git"; then had_git=1; fi

if [ -L "$DEPLOY_PATH/index.html" ] || [ -L "$DEPLOY_PATH/assets" ] || [ -L "$DEPLOY_PATH/dist" ]; then
  die "index.html, assets, or dist is a symlink. Refusing to publish."
fi

assert_publish_dest() {
  local dest_real root
  root=$(readlink -f "$DEPLOY_PATH")
  dest_real=$(readlink -f "$1")
  if [ "$dest_real" = "$root" ]; then
    die "Refusing to rsync the webroot itself"
  fi
  case "$dest_real" in
    "$root/assets"|"$root/dist") ;;
    *) die "Refusing to rsync into $dest_real" ;;
  esac
}

sync_contents() {
  local src="$1" dest="$2" mode="${3:-keep}"
  if [ -L "$dest" ]; then
    die "Refusing to publish through symlink $dest"
  fi
 mkdir -p "$dest"
  assert_publish_dest "$dest"
  # --no-owner/--no-group: the SSH user is not root and must not chown.
  # D775,F664 matches umask 002 (group-writable, world-readable).
  local -a args=(-a --no-owner --no-group --chmod=D775,F664)
  if [ "$mode" = "delete" ]; then
    args+=(--delete --delay-updates)
  fi
 rsync "${args[@]}" "${src%/}/" "$dest/"
}

log "Publishing new assets alongside the current bundle"
sync_contents "$BUILD_DIR/dist/assets" "$DEPLOY_PATH/assets" keep

log "Updating tracked files to $TARGET"
git_repo reset --hard "$TARGET"

log "Switching live index.html"
cp "$BUILD_DIR/dist/index.html" "$DEPLOY_PATH/index.html.next"
# umask 002 already created this file as 664. A chmod failure must not
# skip the swap or fail a publish that is otherwise ready.
chmod 664 "$DEPLOY_PATH/index.html.next" || log "WARNING: could not chmod index.html.next. Continuing with the mode from umask 002."
mv -f "$DEPLOY_PATH/index.html.next" "$DEPLOY_PATH/index.html"

log "Removing hashed assets that this build did not emit"
sync_contents "$BUILD_DIR/dist/assets" "$DEPLOY_PATH/assets" delete

log "Replacing webroot dist/ with this build"
sync_contents "$BUILD_DIR/dist" "$DEPLOY_PATH/dist" delete

chmod 664 "$DEPLOY_PATH/index.html" || log "WARNING: could not chmod the published index.html. Leaving the mode from umask 002."

if grep -q '/src/main.js' "$DEPLOY_PATH/index.html"; then
  die "Live index.html still references /src/main.js"
fi
if [ "$had_git" = 1 ] && !  test -d "$DEPLOY_PATH/.git"; then
  die ".git disappeared during deploy"
fi
if [ "$had_env" = 1 ] && !  test -e "$DEPLOY_PATH/.env"; then
  die ".env disappeared during deploy"
fi
if [ "$had_sitemaps" = 1 ] && !  test -d "$DEPLOY_PATH/sitemaps"; then
  die "sitemaps/ disappeared during deploy"
fi
if [ "$had_sitemapss" = 1 ] && !  test -d "$DEPLOY_PATH/sitemapss"; then
  die "sitemapss/ disappeared during deploy"
fi

log "Deployed $TARGET to $DEPLOY_PATH"
log "Served files: index.html and assets/. Replaced build output: dist/."
log "Left in place: .git, .env, sitemaps/, sitemapss/, and every other path outside assets/ and dist/."
