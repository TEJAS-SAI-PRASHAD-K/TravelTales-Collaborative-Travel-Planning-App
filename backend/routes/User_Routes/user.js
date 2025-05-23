const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    sendFriendRequest,
    removeFriend} = require('../../controllers/userController');

//GET search users
router.get('/', getAllUsers)

//GET user by ID
router.get('/:id', getUserById)

//PUT update user
router.put('/:id', updateUser)

//POST send friend request
router.post('/friends/:id', sendFriendRequest)

//DELETE remove friend
router.delete('/friends/:id', removeFriend)

module.exports = router;