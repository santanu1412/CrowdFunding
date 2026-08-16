import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 5000,
    },
    category: {
      type: String,
      required: true,
      enum: ['Tech', 'Art', 'Games', 'Music', 'Film'],
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    goalAmount: {
      type: Number,
      required: [true, 'Goal amount is required'],
      min: [10, 'Minimum goal is $10'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    backersCount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Funded', 'Expired', 'Cancelled'],
      default: 'Active',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rewards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward',
      },
    ],
  },
  { timestamps: true }
);

// Virtual: days left
campaignSchema.virtual('daysLeft').get(function () {
  const now = new Date();
  const diff = this.deadline - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Ensure virtuals are included in JSON
campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

// Index for search and filtering
campaignSchema.index({ category: 1, status: 1 });
campaignSchema.index({ creator: 1 });
campaignSchema.index({ createdAt: -1 });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
