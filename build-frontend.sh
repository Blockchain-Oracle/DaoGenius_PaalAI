#!/bin/bash

# ANSI color codes
PURPLE='\033[0;35m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}"
echo "╔════════════════════════════════════════════════════╗"
echo "║                                                    ║"
echo -e "║           ${BLUE}DAOGenius${PURPLE} by ${GREEN}PAAL AI${PURPLE} - DEPLOYMENT        ║"
echo "║                                                    ║"
echo "║       Building optimized production bundle         ║"
echo "║                                                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}Starting DAOGenius Frontend build process...${NC}\n"

# Create necessary directories
mkdir -p frontend/build

# Navigate to frontend directory
cd frontend

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Build the production bundle
echo -e "\n${GREEN}Creating optimized production build...${NC}"
npm run build

# Build completion message
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Production build completed successfully!${NC}"
    echo -e "${YELLOW}The optimized build is available in:${NC} ${CYAN}frontend/build/${NC}\n"
    
    echo -e "${PURPLE}Deployment Options:${NC}"
    echo -e "  ${YELLOW}1. Static file serving:${NC}"
    echo -e "     ${CYAN}npx serve -s build${NC}"
    echo -e "  ${YELLOW}2. Deploy to GitHub Pages:${NC}"
    echo -e "     Add ${CYAN}\"homepage\": \"https://yourusername.github.io/daogenius\"${NC} to package.json"
    echo -e "     Then run ${CYAN}npm install gh-pages --save-dev${NC}"
    echo -e "     Add scripts to package.json: ${CYAN}\"predeploy\": \"npm run build\", \"deploy\": \"gh-pages -d build\"${NC}"
    echo -e "     Deploy with ${CYAN}npm run deploy${NC}"
    echo -e "  ${YELLOW}3. Deploy to Netlify/Vercel:${NC}"
    echo -e "     Connect your repository and set build command to ${CYAN}npm run build${NC}"
    echo -e "     Set publish directory to ${CYAN}build${NC}\n"
else
    echo -e "\n${YELLOW}❌ Build process encountered errors.${NC}"
    echo -e "Please check the logs above for more information.\n"
fi

echo -e "${GREEN}Thank you for using DAOGenius!${NC}" 