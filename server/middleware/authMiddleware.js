const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes by verifying the JSON Web Token (JWT).
 * It checks for the token in cookies first, then falls back to Authorization headers.
 */
exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in cookies or headers
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user to the request object
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
};

/**
 * Authorize specific user roles (e.g., 'admin', 'user').
 * Must be used AFTER the `protect` middleware.
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to perform this action` 
      });
    }
    next();
  };
};