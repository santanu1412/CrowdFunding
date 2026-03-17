/**
 * Utility function to standardize API responses across the backend.
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Custom message
 * @param {Object|Array} data - Payload data (optional)
 */
const sendResponse = (res, statusCode, message, data = null) => {
  const payload = {
    success: statusCode >= 200 && statusCode < 300,
    message,
  };

  if (data) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

/**
 * Validates if a provided string is a valid MongoDB ObjectId
 * @param {String} id 
 * @returns {Boolean}
 */
const isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  sendResponse,
  isValidObjectId
};