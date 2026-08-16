import stripe from '../config/stripe.js';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import Notification from '../models/Notification.js';
import { emitFundingUpdate } from '../socket/socketManager.js';
import sendEmail from '../utils/sendEmail.js';

/**
 * @route   POST /api/webhooks/stripe
 * @desc    Handle Stripe webhook events (payment completion, etc.)
 * @note    This route uses express.raw() — registered BEFORE express.json() in server.js
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object;
      await handleExpiredSession(session);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};

/**
 * Process a successful payment.
 */
async function handleSuccessfulPayment(session) {
  try {
    const { donationId, campaignId, donorId } = session.metadata;

    // Update donation status
    const donation = await Donation.findById(donationId);
    if (!donation || donation.status === 'completed') return;

    donation.status = 'completed';
    donation.stripePaymentIntentId = session.payment_intent;
    await donation.save();

    // Update campaign totals
    const campaign = await Campaign.findByIdAndUpdate(
      campaignId,
      {
        $inc: { raisedAmount: donation.amount, backersCount: 1 },
      },
      { new: true }
    );

    if (campaign) {
      // Check if the campaign just got fully funded
      if (
        campaign.raisedAmount >= campaign.goalAmount &&
        campaign.status === 'Active'
      ) {
        campaign.status = 'Funded';
        await campaign.save();
      }

      // Emit real-time update via Socket.IO
      emitFundingUpdate(campaignId, {
        raisedAmount: campaign.raisedAmount,
        backersCount: campaign.backersCount,
      });

      // Create notification for campaign creator
      await Notification.create({
        user: campaign.creator,
        type: 'donation',
        title: 'New Backer!',
        message: `Someone donated $${donation.amount} to "${campaign.title}"`,
        relatedCampaign: campaign._id,
      });
    }

    console.log(`✅ Payment processed: donation ${donationId}, amount $${donation.amount}`);
  } catch (error) {
    console.error('❌ Error processing payment:', error);
  }
}

/**
 * Handle an expired checkout session.
 */
async function handleExpiredSession(session) {
  try {
    const { donationId } = session.metadata || {};
    if (donationId) {
      await Donation.findByIdAndUpdate(donationId, { status: 'failed' });
      console.log(`⏰ Checkout expired: donation ${donationId}`);
    }
  } catch (error) {
    console.error('❌ Error handling expired session:', error);
  }
}
