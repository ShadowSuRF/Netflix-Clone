import { Router } from 'express';
import { getMyList, getWatchHistory, updateProfile, changePassword } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/my-list', getMyList);
router.get('/watch-history', getWatchHistory);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

export default router;
