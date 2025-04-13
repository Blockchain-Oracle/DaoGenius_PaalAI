# DAOGenius Governance Analytics API

A TypeScript-based RESTful API providing comprehensive governance analytics for Decentralized Autonomous Organizations (DAOs).

## Features

- **Governance Overview**: Get comprehensive analytics about a DAO's governance
- **Proposal Analytics**: Detailed insights about governance proposals
- **Voter Analytics**: Analyze voter behavior and participation patterns
- **DAO Comparison**: Compare governance metrics against similar DAOs
- **Secure Authentication**: JWT-based authentication for API access

## Technology Stack

- Node.js
- TypeScript
- Express.js
- JWT for authentication
- Swagger for API documentation
- Docker for containerization

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (optional, for containerized deployment)

## Installation

### Standard Installation

1. Clone the repository:
```
git clone https://github.com/your-username/daogenius-governance-analytics.git
cd daogenius-governance-analytics
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
```
cp .env.example .env
```
Edit the `.env` file with your configuration.

### Docker Installation

We provide Docker configuration for easy deployment:

1. Clone the repository and navigate to the project folder
2. Copy the example environment file and edit it:
```
cp .env.example .env
```
3. Build and run with Docker:
```
./docker-build-run.sh
```

For more details about Docker setup, see [DOCKER.md](DOCKER.md).

## Development

### Local Development

Start the development server:
```
npm run dev
```

This will start the server with hot reloading enabled.

### Docker Development

For development with Docker and hot reloading:
```
./docker-dev.sh
```

## Build

Compile TypeScript code to JavaScript:
```
npm run build
```

## Production

### Standard Deployment

Start the production server:
```
npm start
```

### Docker Deployment

Run in production mode with Docker:
```
docker compose up -d
```

## API Documentation

API documentation is available at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/auth/token` - Get JWT access token

### Analytics
- `GET /api/analytics` - Get governance analytics overview
- `GET /api/analytics/proposals` - Get detailed proposal analytics
- `GET /api/analytics/voters` - Get voter analytics
- `GET /api/analytics/compare` - Compare DAO against similar DAOs

### Health Check
- `GET /api/health` - API health check

## Integration with DAOGenius

This API can be integrated with the DAOGenius bot as a custom API tool:

1. **Tool Name**: GovernanceAnalytics
2. **Description**: Analyzes governance participation rates and voting patterns
3. **Endpoint**: https://api.daogenius.io/api/analytics
4. **Method**: GET
5. **Headers**:
   - **Key**: Content-Type
   - **Value**: application/json
   - **Key**: Authorization
   - **Value**: Bearer ${API_KEY}
6. **Query Parameters**:
   - daoAddress: Ethereum address of the DAO
   - timeFrame: Time period for analytics (week, month, quarter, year)
   - platforms: Comma-separated list of data sources

## License

MIT 