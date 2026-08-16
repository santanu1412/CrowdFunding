import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * Protect routes — requires a valid access token cookie.
 */
export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError('Not authorized — no token', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new ApiError('User not found', 401);
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError('Token expired', 401);
    }
    throw new ApiError('Not authorized — invalid token', 401);
  }
});

/**
 * Restrict access to specific roles.
 */
export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError('Not authorized for this action', 403);
    }
    next();
  };
};
