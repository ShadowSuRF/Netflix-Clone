import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types';

const signToken = (id: string, email: string, name: string): string => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide name, email and password' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already in use' });
      return;
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user.id, user.email, user.name);

    res.status(201).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = signToken(user.id, user.email, user.name);

    res.status(200).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate('myList');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
