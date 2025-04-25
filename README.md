# DAOGenius - DAO Governance Analytics

A comprehensive solution for DAO governance analytics, powered by PAAL AI.

<div align="center">
  <img src="frontend/ReadmeImages/DAOGenius by PAAL AI.jpeg" alt="DAOGenius Logo" width="600px" />
  <br><br>
  <img src="frontend/ReadmeImages/readmeImage.png" alt="DAOGenius Preview" width="800px" />
</div>

## 🏆 Hackathon Submission

This project was built for the [PAAL Agents Hackathon](https://dorahacks.io/hackathon/paalagents/buidl) hosted on DoraHacks.

View our project submission: [DAOGenius on DoraHacks](https://dorahacks.io/buidl/25988)

## 📺 Video Showcase

Check out our demo video: [DAOGenius Showcase](https://www.loom.com/share/80b5f838c64e4ed080f21c987386e065?sid=f67029a5-a15b-4c4a-866e-ff4b4db9eb94)

## 🚀 Live Demo

Try the live demo: [DAOGenius on Vercel](https://dao-genius-paal-ai.vercel.app/)

## 📋 Project Overview

DAOGenius is a comprehensive analytics tool designed for Decentralized Autonomous Organizations (DAOs) to gain insights into their governance processes. The project combines a powerful backend API for detailed analytics with an intuitive frontend showcase.

## 🏗️ Project Structure

This repository contains:

- **Backend API**: A TypeScript-based RESTful API providing governance analytics for DAOs
- **Frontend Showcase**: A React-based demonstration frontend for the DAOGenius bot

## 🛠️ Technology Stack

### Backend
- Node.js
- TypeScript
- Express.js
- JWT for authentication
- Swagger for API documentation
- Docker for containerization

### Frontend
- React
- CSS/SCSS
- Responsive design framework
- Vercel for deployment

## 🧠 Backend: Governance Analytics API

Located in `/api/governance-analytics-ts`

### Features

- **Governance Overview**: Get comprehensive analytics about a DAO's governance
- **Proposal Analytics**: Detailed insights about governance proposals
- **Voter Analytics**: Analyze voter behavior and participation patterns
- **DAO Comparison**: Compare governance metrics against similar DAOs
- **Secure Authentication**: JWT-based authentication for API access

### API Documentation

API documentation is available at:
- Production: [https://daogenius-paalai.onrender.com/api-docs](https://daogenius-paalai.onrender.com/api-docs)
- Local development: http://localhost:3000/api-docs

### API Endpoints

- `POST /api/auth/token` - Get JWT access token
- `GET /api/analytics` - Get governance analytics overview
- `GET /api/analytics/proposals` - Get detailed proposal analytics
- `GET /api/analytics/voters` - Get voter analytics
- `GET /api/analytics/compare` - Compare DAO against similar DAOs
- `GET /api/health` - API health check

### Example Usage with cURL

```bash
# Get authentication token
TOKEN=$(curl -s -X POST https://daogenius-paalai.onrender.com/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "daogenius_demo_key"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Use token to request analytics
curl -X GET "https://daogenius-paalai.onrender.com/api/analytics?daoAddress=0x1a9C8182C09F50C8318d769245beA52c32BE35BC&timeFrame=month&platforms=all" \
  -H "Authorization: Bearer $TOKEN"
```

## 💻 Frontend: Showcase UI

Located in `/frontend`

### Features

- Simulated chat interface with the DAOGenius AI assistant
- Overview of key features and capabilities
- Direct integration with the PAAL AI platform
- Fully responsive design for mobile and desktop devices

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (optional, for containerized deployment)

### Backend Setup

1. Clone the repository:
```
git clone https://github.com/Blockchain-Oracle/DaoGenius_PaalAI.git
cd daogenius-governance-analytics
```

2. Install dependencies:
```
cd api/governance-analytics-ts
npm install
```

3. Set up environment variables:
```
cp .env.example .env
```
Edit the `.env` file with your configuration.

4. Start the development server:
```
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

## 🚢 Deployment

### Backend Deployment

The API is deployed and accessible at:
```
https://daogenius-paalai.onrender.com
```

### Frontend Deployment

The frontend is deployed using Vercel at [https://dao-genius-paal-ai.vercel.app/](https://dao-genius-paal-ai.vercel.app/).

To deploy your own version:

```bash
# Build the production version
cd frontend
npm run build

# Deploy to your preferred hosting service
# For Vercel:
vercel
```

## 🔄 Integration with PAAL AI

This project integrates with the PAAL AI platform, which hosts the actual DAOGenius bot. The frontend showcase provides a demonstration of the bot's capabilities and redirects users to the PAAL AI platform for full interaction.

### Integration as a Custom API Tool

This API can be integrated with the DAOGenius bot as a custom API tool:

1. **Tool Name**: GovernanceAnalytics
2. **Description**: Analyzes governance participation rates and voting patterns
3. **Endpoint**: https://daogenius-paalai.onrender.com/api/analytics
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

## 📜 License

This project is licensed under the MIT License. 