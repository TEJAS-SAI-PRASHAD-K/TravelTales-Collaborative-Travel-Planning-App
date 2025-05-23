const User = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Send friend request (add friend to user's friends array)
const sendFriendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // assuming req.user is set via auth middleware
        const friend = await User.findById(req.params.id);

        if (!user || !friend) return res.status(404).json({ error: 'User not found' });

        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ error: 'Already friends' });
        }

        user.friends.push(friend._id);
        await user.save();

        res.json({ message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send friend request' });
    }
};

// Remove friend
const removeFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // assuming req.user is set via auth middleware

        user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.id);
        await user.save();

        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove friend' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    sendFriendRequest,
    removeFriend
};
