const express = require('express');
const router = express.Router();

// POST signup
router.post('/signup', (req, res) => {
    res.json({ msg: "Signup successful" });
});


// POST login
router.post('/login', (req, res) => {
    res.json({ msg: "Login successful" });
});
  

// POST logout
router.post('/logout', (req, res) => {
    res.json({ msg: "Logout successful" });
});

// GET my user
router.get('/me', (req, res) => {
    res.json({ msg: "My details fetched successful" });
});

module.exports = router;