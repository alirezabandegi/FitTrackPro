const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import authentication routes
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from the frontend
// Only allowing requests from the specified origin (React app running at localhost:5173)
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow requests from React app

// MongoDB connection using the URL from environment variables
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { dbName: "FitTrackProDB" }) // Connecting to the MongoDB database
.then(() => console.log('MongoDB connected'))           // Log success message if connection is successful
.catch(err => console.log(err));                        // Log error message if connection fails

// Routes for handling authentication-related requests
app.use('/api/auth', authRoutes);

// Start the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
