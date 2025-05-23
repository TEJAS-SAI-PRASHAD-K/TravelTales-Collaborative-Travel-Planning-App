const express = require('express');
const router = express.Router();
const {createUser, loginUser, logoutUser, getUserProfile} = require('../../controllers/userController');


// POST /signup
router.post('/signup', createUser);

// POST /login
router.post('/login', loginUser);

// POST /logout (handled on frontend by removing token)
router.post('/logout', logoutUser);

// GET /me (Protected route)
router.get('/me', requireAuth, getUserProfile);

module.exports = router;
