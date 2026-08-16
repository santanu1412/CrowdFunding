import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getDashboard,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/dashboard', protect, getDashboard);

export default router;
