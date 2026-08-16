import { Router } from 'express';
import {
  createCheckoutSession,
  getCampaignDonations,
} from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/checkout/:campaignId', protect, createCheckoutSession);
router.get('/campaign/:campaignId', getCampaignDonations);

export default router;
