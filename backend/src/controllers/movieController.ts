import { Request, Response } from 'express';
import Movie from '../models/Movie';
import User from '../models/User';
import { AuthRequest } from '../types';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, genre, search, page = 1, limit = 20 } = req.query;
    const query: Record<string, unknown> = {};

    if (type) query.type = type;
    if (genre) query.genre = { $in: [genre] };
    if (search) query.$text = { $search: search as string };

    const skip = (Number(page) - 1) * Number(limit);
    const [movies, total] = await Promise.all([
      Movie.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Movie.countDocuments(query),
    ]);

    res.status(200).json({ success: true, data: movies, total, page: Number(page), limit: Number(limit) });
  } catch {
    res.status(500).json({ success: false, message: 'Server error fetching movies' });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) { res.status(404).json({ success: false, message: 'Movie not found' }); return; }
    await Movie.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({ success: true, data: movie });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getTrending = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find({ isTrending: true }).limit(10).sort({ views: -1 });
    res.status(200).json({ success: true, data: movies });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFeatured = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find({ isFeatured: true }).limit(5);
    res.status(200).json({ success: true, data: movies });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getNewReleases = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find({ isNewRelease: true }).limit(20).sort({ releaseYear: -1 });
    res.status(200).json({ success: true, data: movies });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getByGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find({ genre: { $in: [req.params.genre] } }).limit(20);
    res.status(200).json({ success: true, data: movies });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q) { res.status(400).json({ success: false, message: 'Query required' }); return; }
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q as string, $options: 'i' } },
        { description: { $regex: q as string, $options: 'i' } },
        { cast: { $in: [new RegExp(q as string, 'i')] } },
        { genre: { $in: [new RegExp(q as string, 'i')] } },
      ],
    }).limit(20);
    res.status(200).json({ success: true, data: movies });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const addToMyList = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }

    const movieId = req.params.id;
    const alreadyAdded = user.myList.some((id) => id.toString() === movieId);

    if (alreadyAdded) {
      user.myList = user.myList.filter((id) => id.toString() !== movieId);
    } else {
      user.myList.push(new (require('mongoose').Types.ObjectId)(movieId));
    }

    await user.save();
    res.status(200).json({ success: true, inList: !alreadyAdded, myList: user.myList });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateWatchProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.user?.id);
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }

    const histIndex = user.watchHistory.findIndex((h) => h.movie.toString() === req.params.id);
    if (histIndex >= 0) {
      user.watchHistory[histIndex].progress = progress;
      user.watchHistory[histIndex].watchedAt = new Date();
    } else {
      user.watchHistory.push({
        movie: new (require('mongoose').Types.ObjectId)(req.params.id),
        watchedAt: new Date(),
        progress,
      });
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Progress saved' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
