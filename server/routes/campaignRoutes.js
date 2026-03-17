const express = require('express');
const router = express.Router();
const { 
  createCampaign, 
  getCampaigns, 
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getMyCampaigns,
  getFeaturedCampaigns
} = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

// Specific routes must go BEFORE parameterized routes (/:id) to prevent matching errors
router.get('/featured', getFeaturedCampaigns);
router.get('/user/mine', protect, getMyCampaigns);

// Base routes
router.route('/')
  .get(getCampaigns)
  .post(protect, createCampaign);

// Parameterized routes
router.route('/:id')
  .get(getCampaign)
  .put(protect, updateCampaign)
  .delete(protect, deleteCampaign);

module.exports = router;