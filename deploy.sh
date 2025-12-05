#!/bin/bash

# ============================================
# Deploy script for GitHub Pages
# ============================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🚀 Deploying to GitHub Pages${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Check for uncommitted changes
echo -e "${YELLOW}📋 Checking for uncommitted changes...${NC}"
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}You have uncommitted changes:${NC}"
    git status --short
    echo ""
    
    # Ask for commit message
    read -p "Enter commit message (or press Enter to skip committing): " commit_msg
    
    if [[ -n "$commit_msg" ]]; then
        echo -e "${GREEN}📝 Committing changes...${NC}"
        git add .
        git commit -m "$commit_msg"
        
        echo -e "${GREEN}⬆️  Pushing to main branch...${NC}"
        git push origin main
    else
        echo -e "${YELLOW}⚠️  Skipping commit. Changes will still be deployed.${NC}"
    fi
else
    echo -e "${GREEN}✓ Working directory clean${NC}"
fi

echo ""

# Step 2: Build and deploy
echo -e "${YELLOW}🔨 Building production bundle...${NC}"
npm run build

echo ""
echo -e "${YELLOW}🚀 Deploying to gh-pages branch...${NC}"
npm run deploy

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ Deployment complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "Your site will be live at:"
echo -e "${BLUE}  https://clillianhong.github.io${NC}"
echo ""
echo -e "${YELLOW}Note: It may take 1-2 minutes for changes to appear.${NC}"

