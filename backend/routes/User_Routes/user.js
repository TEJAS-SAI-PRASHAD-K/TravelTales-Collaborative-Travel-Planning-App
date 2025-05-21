const express = require('express');
const router = express.Router();

//GET search users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
 })

//GET user by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get user with ID` });
 })

//PUT update user
router.put('/:id', (req, res) => {
    res.json({ message: `Update user with ID` });
 })

//POST send friend request
router.post('/friends/:id', (req, res) => {
    res.json({ message: `Send friend request to user with ID` });
 })

//DELETE remove friend
router.delete('/friends/:id', (req, res) => {
    res.json({ message: `Remove friend with ID` });
 })

module.exports = router;