require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

// Config & Utils
const connectDB = require('./config/db');
const socketManager = require('./socket/socketManager');
const { handleStripeWebhook } = require('./webhooks/stripeWebhook');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Initialize Socket.io
socketManager.init(server);

// ==========================================
// 1. STRIPE WEBHOOK (CRITICAL PLACEMENT)
// ==========================================
// Stripe needs the raw body to verify the signature. 
// This MUST come before app.use(express.json()).
app.post(
  '/api/webhooks/stripe', 
  express.raw({ type: 'application/json' }), 
  handleStripeWebhook
);

// ==========================================
// 2. SECURITY & PARSING MIDDLEWARES
// ==========================================
// Body parser (limit payload size to prevent DOS)
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests originating from this IP, please try again later.'
});
app.use('/api', limiter);

// ==========================================
// 3. MOUNT ROUTES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// ==========================================
// 4. GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ==========================================
// 5. BOOT UP SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚀 NEXUS CORE INITIALIZED`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`=========================================\n`);
});

// Handle unhandled promise rejections (e.g., DB connection failure)
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});