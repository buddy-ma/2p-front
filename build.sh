#!/bin/bash

# Production build script for Octa8 Frontend v2
# Uses bun as the package manager

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${GREEN}🚀 Starting production build...${NC}"

# public_html is the live Cloudways webroot (it is also the git clone).
# Building here overwrites the index.html visitors are being served.
case "$SCRIPT_DIR" in
  */public_html)
    echo -e "${RED}❌ Refusing to build inside public_html.${NC}"
    echo "This directory is the live site. From the server run ./scripts/deploy.sh instead."
    exit 1
    ;;
esac

# Find bun (check PATH first, then default install location)
if command -v bun &> /dev/null; then
    BUN_CMD="bun"
elif [ -x "$HOME/.bun/bin/bun" ]; then
    BUN_CMD="$HOME/.bun/bin/bun"
else
    echo -e "${RED}❌ Error: bun is not installed${NC}"
    echo "Please install bun: curl -fsSL https://bun.sh/install | bash"
    echo "Then add to ~/.bashrc: export BUN_INSTALL=\"\$HOME/.bun\" && export PATH=\"\$BUN_INSTALL/bin:\$PATH\""
    exit 1
fi

# Clean dist directory. Leave ./assets alone until the build succeeds:
# on a machine that serves this directory, ./assets is the live bundle.
echo -e "${YELLOW}🧹 Cleaning dist directory...${NC}"
rm -rf dist/*

# Vite reads index.html. index-new.html is the source entry (index.html is
# gitignored build output). Keep the previous index.html so a failed build
# can put it back.
index_backup=""
restore_index_on_failure() {
  status=$?
  if [ "$status" -ne 0 ] && [ -n "$index_backup" ] && [ -f "$index_backup" ]; then
    cp "$index_backup" index.html || true
  fi
  if [ -n "$index_backup" ]; then
    rm -f "$index_backup"
  fi
  exit "$status"
}
trap restore_index_on_failure EXIT
if [ -f index.html ]; then
  index_backup=$(mktemp)
  cp index.html "$index_backup"
fi

echo -e "${YELLOW}📄 Preparing index.html for build...${NC}"
cp index-new.html index.html
echo -e "${GREEN}   ✓ index.html created from index-new.html${NC}"

# Remove node_modules/.vite
echo -e "${YELLOW}🧹 Cleaning Vite cache...${NC}"
rm -rf node_modules/.vite

# Run production build with bun
echo -e "${YELLOW}🔨 Building for production...${NC}"
$BUN_CMD run build

# Check if build was successful
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    
    # Copy built index.html to project root (contains correct asset references)
    echo -e "${YELLOW}📄 Copying built index.html to project root...${NC}"
    cp dist/index.html index.html
    echo -e "${GREEN}   ✓ index.html copied from dist${NC}"
    
    # Replace ./assets only after dist/ is complete, so a failed build
    # does not leave the previous bundle half-deleted.
    if [ ! -d dist/assets ]; then
        echo -e "${RED}❌ Build failed: dist/assets is missing${NC}"
        exit 1
    fi
    echo -e "${YELLOW}📦 Copying built assets to project root...${NC}"
    mkdir -p assets
    find assets -mindepth 1 -delete
    cp -a dist/assets/. assets/
    echo -e "${GREEN}   ✓ Assets copied to project root${NC}"
    
    # Copy favicon if it exists
    if [ -f "dist/favicon.ico" ]; then
        echo -e "${YELLOW}📄 Copying favicon.ico...${NC}"
        cp dist/favicon.ico favicon.ico
        echo -e "${GREEN}   ✓ favicon.ico copied${NC}"
    fi
    
    # Ensure .htaccess exists in root
    if [ ! -f ".htaccess" ]; then
        echo -e "${YELLOW}⚠️  Warning: .htaccess not found in project root${NC}"
        echo -e "${YELLOW}   Note: Make sure .htaccess is in the project root${NC}"
    fi
    
    # Set proper permissions for web files (using current directory)
    echo -e "${YELLOW}🔐 Setting proper file permissions...${NC}"
    # Try to get the current user and group, fallback to common web server defaults
    WEB_USER="${SUDO_USER:-$(whoami)}"
    WEB_GROUP="${WEB_GROUP:-nobody}"
    
    chown -R "$WEB_USER:$WEB_GROUP" index.html assets/ favicon.ico 2>/dev/null || true
    chmod 644 index.html .htaccess favicon.ico 2>/dev/null || true
    find assets/ -type f -exec chmod 644 {} \; 2>/dev/null || true
    
    # Show build size
    BUILD_SIZE=$(du -sh dist | cut -f1)
    echo -e "${GREEN}📊 Build size: $BUILD_SIZE${NC}"
else
    echo -e "${RED}❌ Build failed: dist directory is empty or missing${NC}"
    exit 1
fi

echo -e "${GREEN}✨ Done!${NC}"
