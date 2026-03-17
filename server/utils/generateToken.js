const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT for authentication.
 * @param {string} id - The User's database ID
 * @returns {string} - The signed JSON Web Token
 */
const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '1d',
  });
};

/**
 * Generates a random cryptographic token (useful for email verification or password resets).
 * @returns {Object} - Returns the unhashed token (to send via email) and the hashed token (to save in DB)
 */
const generateRandomCryptoToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the token to store securely in the database
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  return { resetToken, hashedToken };
};

module.exports = {
  generateAuthToken,
  generateRandomCryptoToken
};