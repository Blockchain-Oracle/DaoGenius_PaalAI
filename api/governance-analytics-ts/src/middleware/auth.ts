import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload, AuthenticatedRequest } from '../interfaces/auth';

/**
 * Authentication middleware for protecting API routes
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  // Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Authentication token is missing or invalid'
    });
    return;
  }
  
  // Extract token
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'daogenius_default_secret'
    ) as UserPayload;
    
    // Add user info to request
    (req as AuthenticatedRequest).user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid authentication token'
    });
  }
}; 