import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshAccessToken,
} from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);

export default router;
