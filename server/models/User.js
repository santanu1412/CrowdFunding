const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Display designation (name) is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email identity is required'], 
    unique: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: { 
    type: String, 
    required: [true, 'Security key (password) is required'], 
    minlength: 8, 
    select: false // Prevents password from being returned in standard queries
  },
  avatar: { 
    type: String, 
    default: 'https://res.cloudinary.com/demo/image/upload/v1631700000/default-avatar.png' 
  },
  bio: { 
    type: String, 
    maxlength: [500, 'Biography cannot exceed 500 characters'] 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  emailVerifyToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { 
  timestamps: true 
});

// Pre-save hook: Encrypt password before saving to the database
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method: Compare incoming password with hashed password in database
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);