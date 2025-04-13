import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import analyticsRoutes from './routes/analytics.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: express.Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Cross-origin resource sharing
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Request logging

// Load Swagger documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error('Error loading Swagger documentation:', error);
}

// API routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'daogenius-governance-analytics',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`DAOGenius Governance Analytics API running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app; // For testing 