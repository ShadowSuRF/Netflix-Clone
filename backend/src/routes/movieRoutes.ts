import { Router } from 'express';
import {
  getAllMovies,
  getMovieById,
  getTrending,
  getFeatured,
  getNewReleases,
  getByGenre,
  searchMovies,
  addToMyList,
  updateWatchProgress,
} from '../controllers/movieController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getAllMovies);
router.get('/trending', getTrending);
router.get('/featured', getFeatured);
router.get('/new-releases', getNewReleases);
router.get('/search', searchMovies);
router.get('/genre/:genre', getByGenre);
router.get('/:id', getMovieById);
router.post('/:id/my-list', protect, addToMyList);
router.post('/:id/progress', protect, updateWatchProgress);

export default router;
