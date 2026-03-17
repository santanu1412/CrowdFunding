const stripe = require('stripe');

/**
 * Initializes the Stripe SDK with our secret key.
 * This client will be used in our donation controllers to generate checkout sessions
 * and securely process financial transactions.
 */
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeClient;