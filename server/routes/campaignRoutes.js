import { Router } from 'express';
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.post('/', protect, createCampaign);
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

export default router;
