import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Not authorized, no token' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
