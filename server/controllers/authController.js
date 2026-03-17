const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Helper function to send token in httpOnly cookie
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + 24 * 60 * 60 * 1000 // 1 day
    ),
    httpOnly: true, // Prevents XSS attacks (cannot be accessed via JS)
    secure: process.env.NODE_ENV === 'production', // Must be true in production (HTTPS)
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-domain cookies in prod
  };

  res.cookie('token', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: { user },
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User identity already exists in the system' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    createSendToken(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and security key' });
    }

    // Explicitly select password since it's hidden by default in the schema
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid authentication credentials' });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // Expire immediately
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Session terminated' });
};