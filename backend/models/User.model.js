const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: 4,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email adress'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash passwords before saving it to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Check entered password with hashed password in database
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate and hash email verification token
userSchema.methods.getVerificationToken = function () {
  // Create reset token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash reset token
  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  return verificationToken;
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Create reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash reset token
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  return resetToken;
};

module.exports = User = mongoose.model('User', userSchema);
