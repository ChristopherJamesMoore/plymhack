const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs
router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// Add a new song
router.post('/', async (req, res) => {
  const newSong = new Song(req.body);
  await newSong.save();
  res.status(201).json(newSong);
});

module.exports = router;