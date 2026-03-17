const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Identity not found' });
    
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    // 1. Get Campaigns created by this user
    const myCampaigns = await Campaign.find({ creator: req.user.id }).sort('-createdAt');
    
    // 2. Get Donations made by this user (populate the campaign details)
    const myDonations = await Donation.find({ donor: req.user.id })
      .populate('campaign', 'title coverImage status goalAmount raisedAmount')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: {
        campaigns: myCampaigns,
        donations: myDonations
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};