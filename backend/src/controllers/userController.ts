import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../types';

export const getMyList = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate('myList');
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    res.status(200).json({ success: true, data: user.myList });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getWatchHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate('watchHistory.movie');
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    res.status(200).json({ success: true, data: user.watchHistory });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user?.id).select('+password');
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }

    if (!(await user.comparePassword(currentPassword))) {
      res.status(400).json({ success: false, message: 'Current password is incorrect' });
      return;
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
