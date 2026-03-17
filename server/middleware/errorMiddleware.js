/**
 * Global Error Handler Middleware
 * Catches errors from all controllers and formats them into a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for the developer
  console.error(`[Error]: ${err.stack.red || err.stack}`);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with ID of ${err.value}`;
    error = { statusCode: 404, message };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered. This data already exists.';
    error = { statusCode: 400, message };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = { statusCode: 400, message };
  }

  // Determine final status code and message
  const statusCode = error.statusCode || res.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    // Only show stack trace in development mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;