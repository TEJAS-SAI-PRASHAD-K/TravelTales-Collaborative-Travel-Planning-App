const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel'); // Adjust path if needed
const requireAuth = require('../../middleware/authMiddleware');

// Helper: Create JWT
const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// POST /signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = createToken(newUser);
        res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });

        const token = createToken(user);
        res.json({ token, user: { id: user._id, username: user.name, email } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// POST /logout (handled on frontend by removing token)
router.post('/logout', (req, res) => {
    // Optional: invalidate token via blacklist
    res.json({ msg: 'Logout successful (frontend should discard token)' });
});

// GET /me (Protected route)
router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

module.exports = router;
