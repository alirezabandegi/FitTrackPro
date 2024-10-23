const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); //Import User model
const router = express.Router();
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables

router.use(cookieParser()); // Parse cookies from requests

// JWT Secret Key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route for new users
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already in use
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create a new user if email is not used
        const newUser = new User({ name, email, password });
        await newUser.save(); // Save the new user in the database

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Handle server errors
    }
});

// Login Route for existing users
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token if login is successful
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '4h' });

        // Store the JWT token in a cookie (valid for 4 hours)
        res.cookie('token', token, { httpOnly: true, maxAge: 4 * 60 * 60 * 1000, sameSite: 'Lax' });


        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Handle server errors
    }
});

// Middleware to protect routes by verifying JWT token
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' }); // No token, deny access
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Add user ID to request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' }); // Invalid token, deny access
    }
};

// Route to verify if token is valid (for token checking purposes)
router.get('/user', authMiddleware, async (req, res) => {
    res.json({tokenverify: true});
});

// Protected profile route (only accessible if token is valid)
router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId); // Fetch user details by ID
    res.json({ user });
});

// Logout Route (clear JWT token from cookies)
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.json({ message: 'Logged out successfully' });
});

module.exports = router; // Export the router
