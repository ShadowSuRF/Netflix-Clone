import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
