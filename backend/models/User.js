const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String, // Use Clerk's user ID
  email: { type: String, required: true },
  pfp: String,
  account_level: { type: String, enum: ['basic', 'premium'], default: 'basic' },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
