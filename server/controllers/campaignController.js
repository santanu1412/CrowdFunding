const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
  try {
    // Attach the currently logged-in user as the creator
    req.body.creator = req.user.id;
    const campaign = await Campaign.create(req.body);
    
    res.status(201).json({ success: true, data: campaign });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const { category, search, sort = '-createdAt', limit = 12 } = req.query;
    let query = {};

    // Apply filters if provided
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const campaigns = await Campaign.find(query)
      .populate('creator', 'name avatar')
      .sort(sort)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name avatar bio');
      
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found in the database' });
    }
    
    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid campaign ID' });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Ensure only the creator can delete their campaign
    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to scrub this campaign' });
    }

    await campaign.deleteOne();
    res.status(200).json({ success: true, message: 'Campaign scrubbed from network' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};