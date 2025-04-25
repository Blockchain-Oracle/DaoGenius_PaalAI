#!/bin/bash

# ANSI color codes
PURPLE='\033[0;35m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${PURPLE}"
echo "╔════════════════════════════════════════════════════╗"
echo "║                                                    ║"
echo -e "║               ${BLUE}DAOGenius${PURPLE} by ${GREEN}PAAL AI${PURPLE}                 ║"
echo "║                                                    ║"
echo "║  Revolutionizing DAO Governance with AI Analytics  ║"
echo "║                                                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}Starting DAOGenius Frontend...${NC}\n"

# Create necessary directories
mkdir -p frontend/public

# Install dependencies and start the app
cd frontend
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

echo -e "\n${GREEN}Starting development server...${NC}"
echo -e "${YELLOW}The application will be available at: ${GREEN}http://localhost:3000${NC}\n"

npm start 