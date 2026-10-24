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
#   4. --delete is applied only to assets/ and dist/, which are build output.
#
# Run on the server as the Cloudways master user:
#   ./scripts/deploy.sh
#   DEPLOY_REF=<sha> ./scripts/deploy.sh
#
# See DEPLOY.md.

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
  APP_USER / APP_GROUP Override the webroot owner and group.
  BUN_BIN              Override the bun binary.

The live site is not modified until the build in the side worktree succeeds.
EOF
  exit 0
fi

# Re-exec from /tmp so a later git reset cannot change the script under bash.
if [ "${DEPLOY_SH_REEXEC:-0}" != "1" ]; then
  if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
    reexec=$(mktemp /tmp/2p-deploy.XXXXXX.sh)
    cp "${BASH_SOURCE[0]}" "$reexec"
    chmod 700 "$reexec"
    export DEPLOY_SH_REEXEC=1
    exec bash "$reexec" "$@"
  fi
fi

export GIT_TERMINAL_PROMPT=0
umask 022
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

APP_USER="${APP_USER:-$(stat -c '%U' "$DEPLOY_PATH")}"
APP_GROUP="${APP_GROUP:-$(stat -c '%G' "$DEPLOY_PATH")}"

run_as_app() {
  if [ "$(id -un)" = "$APP_USER" ]; then
    "$@"
  else
    sudo -n -H -u "$APP_USER" -- "$@" </dev/null
  fi
}

if [ "$(id -un)" != "$APP_USER" ]; then
  if ! sudo -n -u "$APP_USER" true </dev/null; then
    die "Passwordless sudo to $APP_USER is required (try: sudo -n -u $APP_USER true)"
  fi
fi

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
if ! run_as_app test -x "$BUN_BIN"; then
  shared_bun_dir=$(mktemp -d /tmp/bun-bin.XXXXXX)
  cp "$BUN_BIN" "$shared_bun_dir/bun"
  chmod 755 "$shared_bun_dir" "$shared_bun_dir/bun"
  BUN_BIN="$shared_bun_dir/bun"
fi
BUN_DIR=$(dirname "$BUN_BIN")
log "Using bun $("$BUN_BIN" --version) ($BUN_BIN)"

command -v rsync >/dev/null 2>&1 || die "rsync is required on the server"
command -v git >/dev/null 2>&1 || die "git is required on the server"

BUILD_DIR=""
SHARED_BUN_DIR="${shared_bun_dir:-}"
cleanup() {
  status=$?
  if [ -n "$BUILD_DIR" ]; then
    case "$BUILD_DIR" in
      */.deploy-work/build.[0-9]*|/tmp/2p-frontend-deploy/build.[0-9]*)
        run_as_app git -C "$DEPLOY_PATH" worktree remove --force "$BUILD_DIR" >/dev/null 2>&1 || true
        run_as_app rm -rf "$BUILD_DIR" || true
        run_as_app git -C "$DEPLOY_PATH" worktree prune >/dev/null 2>&1 || true
        ;;
      *)
        printf 'WARNING: not removing unexpected build dir %s\n' "$BUILD_DIR" >&2
        ;;
    esac
  fi
  if [ -n "${DEPLOY_PATH:-}" ]; then
    run_as_app rm -f "$DEPLOY_PATH/index.html.next" >/dev/null 2>&1 || true
  fi
  if [ -n "$SHARED_BUN_DIR" ]; then
    rm -rf "$SHARED_BUN_DIR" || true
  fi
  exit "$status"
}
trap cleanup EXIT

if ! run_as_app git -C "$DEPLOY_PATH" rev-parse --is-inside-work-tree >/dev/null; then
  die "$DEPLOY_PATH is not a git work tree"
fi
git_root=$(run_as_app git -C "$DEPLOY_PATH" rev-parse --show-toplevel)
git_root=$(readlink -f "$git_root")
if [ "$git_root" != "$DEPLOY_PATH" ]; then
  die "DEPLOY_PATH ($DEPLOY_PATH) is not the git root ($git_root)"
fi

if [ -n "$(run_as_app git -C "$DEPLOY_PATH" status --porcelain --untracked-files=no)" ]; then
  die "Tracked files in the webroot have local changes. Commit them elsewhere or discard them before deploying."
fi

log "Fetching origin/main"
if ! run_as_app git -C "$DEPLOY_PATH" fetch origin main --prune --tags; then
  die "git fetch origin main failed. The public_html clone must fetch https://github.com/buddy-ma/2p-front as $APP_USER."
fi

if ! run_as_app git -C "$DEPLOY_PATH" merge-base --is-ancestor HEAD origin/main; then
  die "The webroot has commits that are not on origin/main. Refusing to reset over local history."
fi

if ! run_as_app git -C "$DEPLOY_PATH" rev-parse --verify --quiet "${DEPLOY_REF}^{commit}" >/dev/null; then
  if [ "$(run_as_app git -C "$DEPLOY_PATH" rev-parse --is-shallow-repository)" = "true" ]; then
    log "Unshallowing the clone so $DEPLOY_REF can be resolved"
    run_as_app git -C "$DEPLOY_PATH" fetch --unshallow origin
  fi
  log "Fetching $DEPLOY_REF"
  if ! run_as_app git -C "$DEPLOY_PATH" fetch origin "$DEPLOY_REF"; then
    die "Could not fetch $DEPLOY_REF"
  fi
fi
if ! TARGET=$(run_as_app git -C "$DEPLOY_PATH" rev-parse --verify "${DEPLOY_REF}^{commit}"); then
  die "Could not resolve $DEPLOY_REF"
fi
log "Deploying $TARGET"

parent=$(dirname "$DEPLOY_PATH")
if run_as_app test -w "$parent"; then
  BUILD_PARENT="$parent/.deploy-work"
else
  BUILD_PARENT="/tmp/2p-frontend-deploy"
fi
case "$BUILD_PARENT" in
  "$DEPLOY_PATH"|"$DEPLOY_PATH"/*)
    die "Refusing to build inside the webroot"
    ;;
esac
run_as_app mkdir -p "$BUILD_PARENT"
run_as_app git -C "$DEPLOY_PATH" worktree prune
BUILD_DIR="$BUILD_PARENT/build.$$"
log "Building in $BUILD_DIR (outside the webroot)"
run_as_app git -C "$DEPLOY_PATH" worktree add --detach "$BUILD_DIR" "$TARGET"

for env_name in .env .env.production .env.local .env.production.local; do
  if run_as_app test -f "$DEPLOY_PATH/$env_name"; then
    run_as_app cp "$DEPLOY_PATH/$env_name" "$BUILD_DIR/$env_name"
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
if ! run_as_app env "${build_env[@]}" bash -c 'cd "$1" && bun install --frozen-lockfile' bash "$BUILD_DIR"; then
  die "bun install failed. The live site was not modified."
fi

log "Running build.sh"
if ! run_as_app env "${build_env[@]}" bash -c 'cd "$1" && bash ./build.sh' bash "$BUILD_DIR"; then
  die "Build failed. The live site was not modified."
fi

if ! run_as_app test -s "$BUILD_DIR/dist/index.html"; then
  die "dist/index.html is missing. The live site was not modified."
fi
if run_as_app grep -q '/src/main.js' "$BUILD_DIR/dist/index.html"; then
  die "dist/index.html still references /src/main.js. The live site was not modified."
fi
if ! run_as_app test -d "$BUILD_DIR/dist/assets"; then
  die "dist/assets is missing. The live site was not modified."
fi
if [ -z "$(run_as_app ls -A "$BUILD_DIR/dist/assets")" ]; then
  die "dist/assets is empty. Refusing to delete live assets."
fi

had_env=0
had_sitemaps=0
had_sitemapss=0
had_git=0
if run_as_app test -e "$DEPLOY_PATH/.env"; then had_env=1; fi
if run_as_app test -d "$DEPLOY_PATH/sitemaps"; then had_sitemaps=1; fi
if run_as_app test -d "$DEPLOY_PATH/sitemapss"; then had_sitemapss=1; fi
if run_as_app test -d "$DEPLOY_PATH/.git"; then had_git=1; fi

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
  run_as_app mkdir -p "$dest"
  assert_publish_dest "$dest"
  local -a args=(-a --chmod=D755,F644)
  if [ "$mode" = "delete" ]; then
    args+=(--delete --delay-updates)
  fi
  run_as_app rsync "${args[@]}" "${src%/}/" "$dest/"
}

log "Publishing new assets alongside the current bundle"
sync_contents "$BUILD_DIR/dist/assets" "$DEPLOY_PATH/assets" keep

log "Updating tracked files to $TARGET"
run_as_app git -C "$DEPLOY_PATH" reset --hard "$TARGET"

log "Switching live index.html"
run_as_app cp "$BUILD_DIR/dist/index.html" "$DEPLOY_PATH/index.html.next"
run_as_app chmod 644 "$DEPLOY_PATH/index.html.next"
run_as_app mv -f "$DEPLOY_PATH/index.html.next" "$DEPLOY_PATH/index.html"

log "Removing hashed assets that this build did not emit"
sync_contents "$BUILD_DIR/dist/assets" "$DEPLOY_PATH/assets" delete

log "Replacing webroot dist/ with this build"
sync_contents "$BUILD_DIR/dist" "$DEPLOY_PATH/dist" delete

run_as_app chmod 644 "$DEPLOY_PATH/index.html"
run_as_app find "$DEPLOY_PATH/assets" "$DEPLOY_PATH/dist" -type d -exec chmod 755 {} +
run_as_app find "$DEPLOY_PATH/assets" "$DEPLOY_PATH/dist" -type f -exec chmod 644 {} +
if ! run_as_app chgrp -R "$APP_GROUP" "$DEPLOY_PATH/index.html" "$DEPLOY_PATH/assets" "$DEPLOY_PATH/dist"; then
  printf 'WARNING: could not set group %s on published files\n' "$APP_GROUP" >&2
fi

if run_as_app grep -q '/src/main.js' "$DEPLOY_PATH/index.html"; then
  die "Live index.html still references /src/main.js"
fi
if [ "$had_git" = 1 ] && ! run_as_app test -d "$DEPLOY_PATH/.git"; then
  die ".git disappeared during deploy"
fi
if [ "$had_env" = 1 ] && ! run_as_app test -e "$DEPLOY_PATH/.env"; then
  die ".env disappeared during deploy"
fi
if [ "$had_sitemaps" = 1 ] && ! run_as_app test -d "$DEPLOY_PATH/sitemaps"; then
  die "sitemaps/ disappeared during deploy"
fi
if [ "$had_sitemapss" = 1 ] && ! run_as_app test -d "$DEPLOY_PATH/sitemapss"; then
  die "sitemapss/ disappeared during deploy"
fi

log "Deployed $TARGET to $DEPLOY_PATH"
log "Served files: index.html and assets/. Replaced build output: dist/."
log "Left in place: .git, .env, sitemaps/, sitemapss/, and every other path outside assets/ and dist/."
