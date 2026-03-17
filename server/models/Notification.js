const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['campaign_update', 'donation_received', 'system_alert', 'goal_reached'],
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  link: { 
    type: String // Optional link to redirect the user when they click the notification
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Notification', notificationSchema);