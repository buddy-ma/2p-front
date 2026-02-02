#!/bin/bash

# Production build script for Octa8 Frontend v2
# Uses pnpm as the package manager

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

# Check if pnpm is available (via npx or direct command)
if ! command -v pnpm &> /dev/null && ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ Error: pnpm is not installed and npx is not available${NC}"
    echo "Please install pnpm first: npm install -g pnpm"
    exit 1
fi

# Use npx pnpm if pnpm is not directly available
if command -v pnpm &> /dev/null; then
    PNPM_CMD="pnpm"
else
    PNPM_CMD="npx pnpm"
    echo -e "${YELLOW}ℹ️  Using npx pnpm (pnpm not in PATH)${NC}"
fi

# Clean dist directory
echo -e "${YELLOW}🧹 Cleaning dist directory...${NC}"
rm -rf dist/*

# Clean assets directory
echo -e "${YELLOW}🧹 Cleaning assets directory...${NC}"
rm -rf assets/*

# Copy index-new.html to index.html (Vite needs index.html to build)
echo -e "${YELLOW}📄 Preparing index.html for build...${NC}"
cp index-new.html index.html
echo -e "${GREEN}   ✓ index.html created from index-new.html${NC}"

# Remove node_modules/.vite
echo -e "${YELLOW}🧹 Cleaning Vite cache...${NC}"
rm -rf node_modules/.vite

# Run production build with pnpm
echo -e "${YELLOW}🔨 Building for production...${NC}"
$PNPM_CMD run build

# Check if build was successful
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    
    # Copy built index.html to project root (contains correct asset references)
    echo -e "${YELLOW}📄 Copying built index.html to project root...${NC}"
    cp dist/index.html index.html
    echo -e "${GREEN}   ✓ index.html copied from dist${NC}"
    
    # Copy built assets to project root
    echo -e "${YELLOW}📦 Copying built assets to project root...${NC}"
    cp -r dist/assets/* assets/ 2>/dev/null || mkdir -p assets && cp -r dist/assets/* assets/
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
