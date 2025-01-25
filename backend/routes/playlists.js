const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// Get all playlists
router.get('/', async (req, res) => {
  const playlists = await Playlist.find();
  res.json(playlists);
});

// Add a new playlist
router.post('/', async (req, res) => {
  const newPlaylist = new Playlist(req.body);
  await newPlaylist.save();
  res.status(201).json(newPlaylist);
});

module.exports = router;