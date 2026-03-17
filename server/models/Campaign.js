const mongoose = require('mongoose');
const slugify = require('slugify');

const campaignSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Campaign title is required'], 
    trim: true 
  },
  slug: { 
    type: String, 
    unique: true 
  },
  description: { 
    type: String, 
    required: [true, 'Campaign description is required'] 
  },
  goalAmount: { 
    type: Number, 
    required: [true, 'Funding goal is required'],
    min: [10, 'Minimum goal is $10']
  },
  raisedAmount: { 
    type: Number, 
    default: 0 
  },
  deadline: { 
    type: Date, 
    required: [true, 'Deadline is required'] 
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    enum: ['Tech', 'Art', 'Music', 'Film', 'Games', 'Health', 'Education', 'Social', 'Environment'] 
  },
  coverImage: { 
    type: String, 
    required: [true, 'Cover image asset is required'] 
  },
  videoUrl: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Draft', 'Active', 'Funded', 'Expired', 'Failed'], 
    default: 'Active' 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  backersCount: { 
    type: Number, 
    default: 0 
  },
  tags: [String],
  featured: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
  toObject: { virtuals: true }
});

// Pre-save hook: Automatically generate a URL-friendly slug from the title
campaignSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Virtual Property: Calculate days left dynamically (not stored in DB)
campaignSchema.virtual('daysLeft').get(function() {
  const diff = new Date(this.deadline) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Reverse Populate: Link rewards to this campaign
campaignSchema.virtual('rewards', {
  ref: 'Reward',
  localField: '_id',
  foreignField: 'campaign',
  justOne: false
});

module.exports = mongoose.model('Campaign', campaignSchema);