#!/bin/bash

# Build script for Vue.js application
# This script builds the app and deploys it to the production directory

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}🚀 Starting build process...${NC}"
echo ""

# Check if pnpm is available
if ! command -v pnpm &> /dev/null && ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ Error: pnpm or npx not found. Please install Node.js and npm.${NC}"
    exit 1
fi

# Determine pnpm command
if command -v pnpm &> /dev/null; then
    PNPM_CMD="pnpm"
else
    PNPM_CMD="npx pnpm"
fi

echo -e "${YELLOW}📦 Installing dependencies (if needed)...${NC}"
# Try frozen lockfile first (for CI/production), fall back to updating if needed
if ! $PNPM_CMD install --frozen-lockfile 2>/dev/null; then
    echo -e "${YELLOW}  ⚠️  Lockfile out of sync, updating...${NC}"
    $PNPM_CMD install --no-frozen-lockfile
fi

echo ""
echo -e "${YELLOW}🔨 Building application for production...${NC}"
# Use --emptyOutDir to ensure a clean build without cached files
$PNPM_CMD build:clean

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📁 Checking if dist directory exists...${NC}"
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Error: dist directory not found after build!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Copying built files to production directory...${NC}"

# Clean old production files before copying new ones
echo "  → Cleaning old production files..."
# Backup .htaccess if it exists (Vite doesn't copy it to dist)
HTACCESS_BACKUP=""
if [ -f ".htaccess" ]; then
    HTACCESS_BACKUP=$(mktemp)
    cp .htaccess "$HTACCESS_BACKUP"
    echo "  → Backed up .htaccess"
fi
# Remove old assets directory if it exists
if [ -d "assets" ]; then
    rm -rf assets
    echo "  → Removed old assets directory"
fi
# Remove old index.html and vite.svg if they exist
[ -f "index.html" ] && rm -f index.html && echo "  → Removed old index.html"
[ -f "vite.svg" ] && rm -f vite.svg && echo "  → Removed old vite.svg"

# Copy all files from dist to root
echo "  → Copying new files from dist/ to root..."
cp -r dist/* .

# Replace index.html with index-new.html
if [ -f "index.html" ]; then
    rm -f index.html
    echo "  → Removed index.html from dist"
fi
if [ -f "index-new.html" ]; then
    cp index-new.html index.html
    echo "  → Copied index-new.html to index.html"
else
    echo -e "${YELLOW}  ⚠️  Warning: index-new.html not found!${NC}"
fi

# Copy images from public/assets/images to assets directory
# Files in public/ are copied to dist root by Vite, so we need to copy them to assets/
if [ -d "dist/assets/images" ]; then
    echo "  → Copying images from dist/assets/images..."
    mkdir -p assets/images
    cp -r dist/assets/images/* assets/images/ 2>/dev/null || true
    echo "  → Images from dist/assets/images copied"
fi

# Also ensure images from public/assets/images are available
# (Vite copies public/ to dist root, so they should be in dist/assets/images/)
if [ -d "public/assets/images" ] && [ ! -d "assets/images" ]; then
    echo "  → Copying images from public/assets/images..."
    mkdir -p assets/images
    cp -r public/assets/images/* assets/images/ 2>/dev/null || true
    echo "  → Images from public/assets/images copied"
fi

# Restore .htaccess if it was backed up
if [ -n "$HTACCESS_BACKUP" ] && [ -f "$HTACCESS_BACKUP" ]; then
    cp "$HTACCESS_BACKUP" .htaccess
    rm -f "$HTACCESS_BACKUP"
    echo "  → Restored .htaccess"
elif [ -f "dist/.htaccess" ]; then
    cp dist/.htaccess .
    echo "  → Copied .htaccess from dist/"
elif [ ! -f ".htaccess" ]; then
    echo -e "${YELLOW}  ⚠️  Warning: .htaccess not found. Make sure it exists for SPA routing.${NC}"
fi

echo "  → Files copied successfully"

# Set proper permissions (adjust as needed for your server)
echo ""
echo -e "${YELLOW}🔐 Setting file permissions...${NC}"
chmod 644 index.html .htaccess 2>/dev/null || true
find assets -type f -exec chmod 644 {} \; 2>/dev/null || true
find assets -type d -exec chmod 755 {} \; 2>/dev/null || true

echo ""
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo -e "${GREEN}📊 Build summary:${NC}"
echo "  • Built files are in: dist/"
echo "  • Production files deployed to: $(pwd)"
echo "  • Assets directory: assets/"
echo ""
echo -e "${GREEN}🎉 Your application is ready for production!${NC}"
echo ""
echo -e "${YELLOW}💡 Tip: Clear your browser cache or do a hard refresh (Ctrl+Shift+R) to see changes.${NC}"
