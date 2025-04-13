import { Request } from 'express';

/**
 * Authentication related interfaces
 */

// User details stored in JWT
export interface UserPayload {
  clientId: string;
  permissions: string[];
}

// API Key details
export interface ApiKeyDetails {
  clientId: string;
  permissions: string[];
}

// API Key storage
export interface ApiKeyStore {
  [key: string]: ApiKeyDetails;
}

// Token response
export interface TokenResponse {
  token: string;
  expiresIn: string;
}

// Error response
export interface ErrorResponse {
  error: string;
  message: string;
}

// Request with authenticated user
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
} 