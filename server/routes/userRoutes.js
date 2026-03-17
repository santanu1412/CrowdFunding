const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  getUserDashboard,
  updateProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Apply protection to all user routes
router.use(protect);

// Standard profile retrieval and updates
router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

// Dashboard data (aggregates user's campaigns and backed projects)
router.get('/dashboard', getUserDashboard);

module.exports = router;