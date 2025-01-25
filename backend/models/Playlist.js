const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  _id: String,
  user_id: { type: String, required: true },
  playlist_name: { type: String, required: true },
  songs: [String],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
