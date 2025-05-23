const express = require('express');
const router = express.Router();
const requireAuth = require('../../middleware/authMiddleware')
const {createUser, loginUser, logoutUser, getUserProfile, requestPasswordReset, verifyPasswordReset} = require('../../controllers/authController');


// POST /signup
router.post('/signup', createUser);

// POST /login
router.post('/login', loginUser);

// POST /logout (handled on frontend by removing token)
router.post('/logout', logoutUser);

// GET /me (Protected route)
router.get('/me', requireAuth, getUserProfile);

//POST /request-password-reset
router.post('/request-password-reset', requestPasswordReset);

//POST /verify-password-reset
router.post('/verify-password-reset', verifyPasswordReset);

module.exports = router;
