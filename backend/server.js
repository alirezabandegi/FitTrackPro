const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow requests from React app

// MongoDB connection
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { dbName: "FitTrackProDB" })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
