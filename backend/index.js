const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');  // Clerk middleware

dotenv.config();

const app = express();
// Middleware
const cors = require('cors');

// Use CORS with default settings to allow requests from any origin
app.use(cors());

// Initialize Clerk SDK with the Clerk Frontend API
const clerkApiKey = process.env.CLERK_FRONTEND_API_KEY;  // Set in .env
app.use(ClerkExpressWithAuth({ apiKey: clerkApiKey }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/songs', require('./routes/songs'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/users', require('./routes/users'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));