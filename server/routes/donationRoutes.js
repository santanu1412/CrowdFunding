const express = require('express');
const router = express.Router();
const { 
  createCheckoutSession, 
  getMyDonations 
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// All donation routes require the user to be logged in
router.use(protect);

// Initialize a Stripe checkout session for a specific campaign
router.post('/checkout/:campaignId', createCheckoutSession);

// Retrieve the logged-in user's donation history
router.get('/my', getMyDonations);

module.exports = router;