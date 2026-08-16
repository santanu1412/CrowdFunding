import Campaign from '../models/Campaign.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   GET /api/campaigns
 * @desc    Get all campaigns (with filtering, pagination)
 */
export const getCampaigns = asyncHandler(async (req, res) => {
  const { category, status, search, page = 1, limit = 12 } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [campaigns, total] = await Promise.all([
    Campaign.find(filter)
      .populate('creator', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Campaign.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: campaigns,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @route   GET /api/campaigns/:id
 * @desc    Get a single campaign by ID
 */
export const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    'creator',
    'name avatar bio'
  );

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  res.json({ success: true, data: campaign });
});

/**
 * @route   POST /api/campaigns
 * @desc    Create a new campaign (auth required)
 */
export const createCampaign = asyncHandler(async (req, res) => {
  const { title, description, category, coverImage, goalAmount, deadline } = req.body;

  const campaign = await Campaign.create({
    title,
    description,
    category,
    coverImage,
    goalAmount,
    deadline,
    creator: req.user._id,
  });

  const populated = await campaign.populate('creator', 'name avatar');

  res.status(201).json({ success: true, data: populated });
});

/**
 * @route   PUT /api/campaigns/:id
 * @desc    Update a campaign (only by creator)
 */
export const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.creator.toString() !== req.user._id.toString()) {
    throw new ApiError('Not authorized to update this campaign', 403);
  }

  const allowedFields = ['title', 'description', 'category', 'coverImage', 'deadline'];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      campaign[field] = req.body[field];
    }
  });

  await campaign.save();
  const updated = await campaign.populate('creator', 'name avatar');

  res.json({ success: true, data: updated });
});

/**
 * @route   DELETE /api/campaigns/:id
 * @desc    Cancel / delete a campaign (only by creator, only if no donations)
 */
export const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.creator.toString() !== req.user._id.toString()) {
    throw new ApiError('Not authorized', 403);
  }

  if (campaign.raisedAmount > 0) {
    // Soft cancel instead of delete
    campaign.status = 'Cancelled';
    await campaign.save();
    return res.json({ success: true, message: 'Campaign cancelled (has backers)' });
  }

  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Campaign deleted' });
});
