# Docker Setup for Governance Analytics API

This document explains how to use Docker to build and run the Governance Analytics API.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Environment Setup

1. Make sure you have a valid `.env` file in the project root.
2. You can copy the `.env.example` file as a starting point:

```bash
cp .env.example .env
```

3. Edit the `.env` file to add your specific configuration values:
   - JWT_SECRET - Secret key for JWT token generation
   - SNAPSHOT_API_KEY - API key for Snapshot GraphQL API (if using real data)
   - TALLY_API_KEY - API key for Tally API (if using real data)
   - USE_MOCK_DATA - Set to 'true' to use mock data instead of real API calls

## Build and Run (Production Mode)

To build and run the application in production mode:

```bash
./docker-build-run.sh
```

Or manually:

```bash
docker compose build
docker compose up -d
```

This will:
1. Build the Docker image using the multi-stage Dockerfile
2. Start the container in detached mode
3. Expose the API on port 3000

## Development Mode with Hot Reloading

For development with hot reloading of code changes:

```bash
./docker-dev.sh
```

Or manually:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up --force-recreate
```

This will:
1. Build a development-focused Docker image using Dockerfile.dev
2. Mount your local source code into the container
3. Run the application with ts-node-dev for hot reloading
4. Show logs directly in the console

## Accessing the API

- API endpoint: http://localhost:3000/api/analytics
- API Documentation: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/api/health

## Container Management

- View logs: `docker compose logs -f`
- Stop containers: `docker compose down`
- Restart containers: `docker compose restart`

## Docker Compose Services

The Docker Compose configuration includes the following service:

- **governance-analytics-api**: The main API service, built from the Dockerfile

## Docker Image Structure

The Dockerfile uses a multi-stage build:

1. **Build Stage**: 
   - Uses Node 18 Alpine as the base image
   - Installs all dependencies (including dev dependencies)
   - Builds the TypeScript code to JavaScript

2. **Production Stage**:
   - Uses Node 18 Alpine as the base image
   - Copies only the built code and production dependencies
   - Results in a smaller, more secure final image

3. **Development Image (Dockerfile.dev)**:
   - Single-stage build focused on development
   - Includes ts-node-dev for hot reloading
   - Mounts source code directory for real-time changes

## Troubleshooting

### Common Issues

- If the container exits immediately, check the logs: `docker compose logs`
- If you can't connect to the API, ensure the container is running: `docker ps`
- For permission issues with scripts, run: `chmod +x *.sh`

### Development Issues

- **"ts-node-dev: not found" error**: This occurs when the development dependencies aren't properly installed. Try:
  1. Rebuilding with no cache: `docker compose -f docker-compose.dev.yml build --no-cache`
  2. Make sure your Docker build isn't running out of memory
  3. Check that the volumes are correctly mounted

- **Hot reloading not working**: 
  1. Verify that your code changes are properly mapped into the container
  2. Run `docker compose -f docker-compose.dev.yml down` and start again
  3. Check Docker volume permissions

### Production Issues

- **API returning 500 errors**: Check the container logs for details
- **JWT authentication failing**: Verify your JWT_SECRET is properly set in the environment
- **API not returning real data**: Check that USE_MOCK_DATA is set to 'false' and your API keys are valid 