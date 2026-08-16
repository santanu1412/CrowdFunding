import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Minimum donation is $1'],
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stripeSessionId: {
      type: String,
    },
    stripePaymentIntentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

donationSchema.index({ campaign: 1 });
donationSchema.index({ donor: 1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
