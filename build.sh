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
$PNPM_CMD build

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

# List of files/directories to exclude from root (keep source files)
EXCLUDE_LIST=(
    "src"
    "node_modules"
    "public"
    "dist"
    ".git"
    ".github"
    ".vscode"
    "package.json"
    "package-lock.json"
    "pnpm-lock.yaml"
    "vite.config.js"
    "tailwind.config.js"
    "postcss.config.js"
    "DEPLOYMENT_GUIDE.md"
    "QUICK_START.md"
    "README.md"
    ".gitignore"
    "build.sh"
)

# Backup current production files (optional - comment out if not needed)
# echo -e "${YELLOW}💾 Creating backup...${NC}"
# BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
# mkdir -p "$BACKUP_DIR"
# for item in assets index.html vite.svg .htaccess 2>/dev/null; do
#     if [ -e "$item" ]; then
#         cp -r "$item" "$BACKUP_DIR/" 2>/dev/null || true
#     fi
# done

# Copy all files from dist to root
echo "  → Copying files from dist/ to root..."
cp -r dist/* .

# Ensure .htaccess is in place
if [ -f "dist/.htaccess" ]; then
    cp dist/.htaccess .
    echo "  → Copied .htaccess from dist/"
elif [ -f ".htaccess" ]; then
    echo "  → .htaccess already exists in root"
else
    echo -e "${YELLOW}  ⚠️  Warning: .htaccess not found. Make sure it exists for SPA routing.${NC}"
fi

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
