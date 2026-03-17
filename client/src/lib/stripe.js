import { loadStripe } from '@stripe/stripe-js';

/**
 * Initialize the Stripe client.
 * Using loadStripe ensures that Stripe.js is injected asynchronously.
 * * NOTE: Ensure you add VITE_STRIPE_PUBLISHABLE_KEY to your client/.env file.
 */
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.warn("Stripe publishable key is missing. Financial modules will be disabled.");
}

const stripePromise = loadStripe(stripeKey || '');

export default stripePromise;