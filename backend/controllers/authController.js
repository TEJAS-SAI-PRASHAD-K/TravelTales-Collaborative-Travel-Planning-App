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
const createUser = async (req, res) => {
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
};

// POST /login
const loginUser = async (req, res) => {
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
};

// POST /logout (handled on frontend by removing token)
const logoutUser = (req, res) => {
    // Optional: invalidate token via blacklist
    res.json({ msg: 'Logout successful (frontend should discard token)' });
};

// GET /me (Protected route)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

//POST /request-password-reset
const requestPasswordReset = async (req, res) => {
    const { identifier } = req.body;

    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // valid for 10 minutes

    user.resetPasswordOTP = otp;
    user.resetPasswordExpiry = expiry;
    await user.save();

    // Send email with nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your.email@gmail.com',
            pass: 'yourpassword'
        }
    });

    const mailOptions = {
        from: 'no-reply@yourapp.com',
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}. It expires in 10 minutes.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).json({ message: 'Failed to send OTP', error: err });
        res.status(200).json({ message: 'OTP sent to email.' });
    });
};
  
//POST /verify-password-reset
const verifyPasswordReset = async (req, res) => {
    const { identifier, otp, newPassword } = req.body;

    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user || user.resetPasswordOTP !== otp || Date.now() > user.resetPasswordExpiry) {
        return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successful.' });
  };

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserProfile,
    requestPasswordReset,
    verifyPasswordReset
};