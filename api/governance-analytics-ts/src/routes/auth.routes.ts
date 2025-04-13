import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiKeyStore, TokenResponse } from '../interfaces/auth';

// Create router
const router: Router = Router();

// In-memory store of valid API keys (would use a database in production)
const validApiKeys: ApiKeyStore = {
  'daogenius_demo_key': {
    clientId: 'demo_client',
    permissions: ['read:analytics']
  },
  // Add more API keys as needed
};

/**
 * @route   POST /api/auth/token
 * @desc    Generate authentication token
 * @access  Public
 */
router.post('/token', (req: Request, res: Response) => {
  const { apiKey } = req.body;
  
  // Validate API key
  if (!apiKey) {
    return res.status(400).json({ 
      error: 'Bad request', 
      message: 'API key is required' 
    });
  }
  
  // Check if API key is valid
  if (!validApiKeys[apiKey]) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid API key' 
    });
  }
  
  // Create JWT payload
  const payload = {
    clientId: validApiKeys[apiKey].clientId,
    permissions: validApiKeys[apiKey].permissions
  };
  
  // Sign JWT token
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'daogenius_default_secret',
    { expiresIn: '1h' }
  );
  
  // Return token
  const response: TokenResponse = {
    token,
    expiresIn: '1h'
  };
  
  res.json(response);
});

export default router; 