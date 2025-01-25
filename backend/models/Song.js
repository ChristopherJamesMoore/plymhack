const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  _id: String,
  user_id: { type: String, required: true },
  audio: { type: String, required: true },
  cover: String,
  lyrics: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Song || mongoose.model('Song', SongSchema);
