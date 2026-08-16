import stripe from '../config/stripe.js';
import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   POST /api/donations/checkout/:campaignId
 * @desc    Create a Stripe Checkout session for a donation
 */
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { amount, anonymous } = req.body;
  const { campaignId } = req.params;

  if (!amount || amount < 1) {
    throw new ApiError('Minimum donation is $1', 400);
  }

  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.status !== 'Active') {
    throw new ApiError('This campaign is no longer accepting donations', 400);
  }

  // Create a pending donation record
  const donation = await Donation.create({
    amount,
    campaign: campaign._id,
    donor: req.user._id,
    anonymous: anonymous || false,
    status: 'pending',
  });

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Donation to "${campaign.title}"`,
            description: `Back this project on NexusFund`,
          },
          unit_amount: Math.round(amount * 100), // cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/campaigns/${campaignId}`,
    metadata: {
      donationId: donation._id.toString(),
      campaignId: campaign._id.toString(),
      donorId: req.user._id.toString(),
    },
  });

  // Store session ID on the donation
  donation.stripeSessionId = session.id;
  await donation.save();

  res.json({ success: true, url: session.url });
});

/**
 * @route   GET /api/donations/campaign/:campaignId
 * @desc    Get donations for a specific campaign
 */
export const getCampaignDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    campaign: req.params.campaignId,
    status: 'completed',
  })
    .populate('donor', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ success: true, data: donations });
});
