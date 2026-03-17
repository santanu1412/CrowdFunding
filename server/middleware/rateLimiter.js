const rateLimit = require('express-rate-limit');

/**
 * General API Rate Limiter
 * Prevents DDoS attacks by limiting IP addresses to 100 requests per 15 minutes.
 */
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes',
  },
});

/**
 * Strict Auth Rate Limiter
 * Prevents brute-force password guessing attacks on login/register endpoints.
 */
exports.authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Hour
  max: 10, // Limit each IP to 10 login/register requests per hour
  message: {
    success: false,
    message: 'Too many authentication attempts. Your IP is temporarily locked for 1 hour.',
  },
});