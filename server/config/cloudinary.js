const cloudinary = require('cloudinary').v2;

/**
 * Configures the Cloudinary SDK.
 * This service handles media storage (like campaign cover images and user avatars)
 * to keep our core database lightweight.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;