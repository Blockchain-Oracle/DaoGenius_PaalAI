#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and starting DAOGenius Governance Analytics API in production mode...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running. Please start Docker Desktop or Docker daemon.${NC}"
  exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found. Please create one based on .env.example${NC}"
  exit 1
fi

# Build and start the containers
echo -e "${GREEN}Building Docker images...${NC}"
docker compose build

echo -e "${GREEN}Starting containers...${NC}"
docker compose up -d

echo -e "${GREEN}Container started successfully!${NC}"
echo -e "${YELLOW}API accessible at: ${GREEN}http://localhost:3000${NC}"
echo -e "${YELLOW}API Documentation: ${GREEN}http://localhost:3000/api-docs${NC}"
echo -e "\nTo view logs: ${GREEN}docker compose logs -f${NC}"
echo -e "To stop the service: ${GREEN}docker compose down${NC}" 