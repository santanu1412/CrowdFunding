const express = require('express');
const router = express.Router();
const { 
  getCampaigns, 
  getCampaign, 
  createCampaign, 
  updateCampaign, 
  deleteCampaign 
} = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

// Public routes: Anyone can view campaigns
router.route('/')
  .get(getCampaigns)
  .post(protect, createCampaign); // Only authenticated users can create

router.route('/:id')
  .get(getCampaign)
  .put(protect, updateCampaign)     // Only the creator can update
  .delete(protect, deleteCampaign); // Only the creator or admin can delete

module.exports = router;