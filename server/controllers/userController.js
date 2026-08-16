import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (avatar) user.avatar = avatar;

  await user.save();

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    },
  });
});

/**
 * @route   GET /api/users/dashboard
 * @desc    Get dashboard data for the current user (their campaigns + their donations)
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const [campaigns, donations] = await Promise.all([
    Campaign.find({ creator: req.user._id }).sort({ createdAt: -1 }),
    Donation.find({ donor: req.user._id, status: 'completed' })
      .populate('campaign', 'title coverImage')
      .sort({ createdAt: -1 }),
  ]);

  res.json({
    success: true,
    data: {
      campaigns,
      donations,
    },
  });
});
