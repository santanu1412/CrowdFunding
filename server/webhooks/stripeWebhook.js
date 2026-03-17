const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const { getIO } = require('../socket/socketManager');

/**
 * Handles incoming webhooks from Stripe to verify and finalize payments securely.
 * Bypasses standard JSON parsing (requires raw body in server.js).
 */
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify the webhook signature against your Stripe Webhook Secret
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`[Stripe Webhook Error]: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout sessions
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // 1. Extract metadata passed during session creation
      const campaignId = session.metadata.campaignId;
      const donorId = session.metadata.userId;
      const amount = session.amount_total / 100; // Convert cents to dollars

      // 2. Create the Donation record in the database
      await Donation.create({
        donor: donorId !== 'guest' ? donorId : null,
        campaign: campaignId,
        amount: amount,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        status: 'completed',
        anonymous: session.metadata.anonymous === 'true',
        message: session.metadata.message || ''
      });

      // 3. Increment the Campaign's raised amount and backer count
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { 
          $inc: { raisedAmount: amount, backersCount: 1 }
        },
        { new: true } // Return the updated document
      );

      // 4. EMIT REAL-TIME UPDATE via Socket.io
      // This pushes the new totals to everyone currently viewing the campaign page
      const io = getIO();
      io.to(campaignId).emit('fundingUpdate', {
        raisedAmount: updatedCampaign.raisedAmount,
        backersCount: updatedCampaign.backersCount
      });

      console.log(`[Stripe Webhook] Successfully processed $${amount} donation for campaign ${campaignId}`);

    } catch (dbError) {
      console.error('[Stripe Webhook Database Error]:', dbError);
      // Note: We still return 200 to Stripe so it doesn't retry infinitely,
      // but in a production environment, you should flag this for manual review.
    }
  }

  // Acknowledge receipt of the event
  res.status(200).json({ received: true });
};