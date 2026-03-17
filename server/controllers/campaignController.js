const Campaign = require('../models/Campaign');

// @desc    Create a new campaign
// @route   POST /api/campaigns
exports.createCampaign = async (req, res) => {
  try {
    req.body.creator = req.user.id;
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, data: campaign });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all campaigns (with filters, search, pagination)
// @route   GET /api/campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const { category, sort, search, page = 1, limit = 12 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const skip = (page - 1) * limit;
    
    let result = Campaign.find(query).populate('creator', 'name avatar');

    if (sort) {
      const sortBy = sort.split(',').join(' ');
      result = result.sort(sortBy);
    } else {
      result = result.sort('-createdAt');
    }

    const campaigns = await result.skip(skip).limit(Number(limit));
    const total = await Campaign.countDocuments(query);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
      data: campaigns
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single campaign by ID
// @route   GET /api/campaigns/:id
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('creator', 'name avatar bio');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found in the grid' });
    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a campaign (Owner only)
// @route   PUT /api/campaigns/:id
exports.updateCampaign = async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    
    // Ensure user is the creator
    if (campaign.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to modify this campaign' });
    }

    // Optional: Prevent editing if donations have already started
    // if (campaign.raisedAmount > 0) {
    //   return res.status(400).json({ message: 'Cannot edit an active campaign with existing backers' });
    // }

    campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a campaign (Owner only)
// @route   DELETE /api/campaigns/:id
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    
    // Ensure user is the creator
    if (campaign.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to scrub this campaign' });
    }

    await campaign.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get logged in user's campaigns
// @route   GET /api/campaigns/user/mine
exports.getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ creator: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get featured campaigns
// @route   GET /api/campaigns/featured
exports.getFeaturedCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ featured: true }).limit(5).populate('creator', 'name avatar');
    res.status(200).json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};