const stripe = require('../config/stripe');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { amount, anonymous, message } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Contribution to ${campaign.title}`,
              images: [campaign.coverImage],
            },
            unit_amount: amount * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/campaigns/${campaignId}?canceled=true`,
      metadata: {
        campaignId: campaignId.toString(),
        userId: req.user._id.toString(),
        anonymous: anonymous ? 'true' : 'false',
        message: message || '',
      },
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate('campaign', 'title coverImage slug status')
      .sort('-createdAt');
    
    res.status(200).json({ success: true, data: donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};