const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  title: { 
    type: String, 
    required: [true, 'Reward tier title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Reward description is required'] 
  },
  minimumAmount: { 
    type: Number, 
    required: [true, 'Minimum contribution amount is required'] 
  },
  estimatedDelivery: { 
    type: Date,
    required: [true, 'Estimated delivery date is required']
  },
  limitedQuantity: { 
    type: Number,
    default: null // Null means unlimited
  },
  claimedCount: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Reward', rewardSchema);