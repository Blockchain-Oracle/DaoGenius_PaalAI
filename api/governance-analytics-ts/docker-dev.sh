#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting DAOGenius Governance Analytics API in development mode...${NC}"

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

# Clean up any existing containers to avoid conflicts
echo -e "${GREEN}Stopping any existing containers...${NC}"
docker compose -f docker-compose.dev.yml down 2>/dev/null || true

# Build and start the containers with the --force-recreate flag to ensure clean state
echo -e "${GREEN}Building Docker images (this may take a moment)...${NC}"
docker compose -f docker-compose.dev.yml build --no-cache

echo -e "${GREEN}Starting containers with hot reloading...${NC}"
docker compose -f docker-compose.dev.yml up --force-recreate

# This script doesn't use -d flag, so it will show logs in the console
# To exit, press Ctrl+C 