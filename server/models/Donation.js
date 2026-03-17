const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Can be null if it's an anonymous guest checkout
  },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: [true, 'Donation amount is required'] 
  },
  stripeSessionId: { 
    type: String, 
    required: true,
    unique: true
  },
  stripePaymentIntentId: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'refunded', 'failed'], 
    default: 'pending' 
  },
  anonymous: { 
    type: Boolean, 
    default: false 
  },
  message: { 
    type: String,
    maxlength: 280
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Donation', donationSchema);