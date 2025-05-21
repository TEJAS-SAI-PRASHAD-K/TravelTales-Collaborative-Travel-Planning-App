const express = require('express');
const router = express.Router();

//GET polls
router.get('/', (req, res) => {
    res.json({ message: 'Get all polls' });
 })

//POST create a new poll
router.post('/', (req, res) => {
    res.json({ message: 'Create a new poll' });
 })

//POST vote on a poll
router.post('/:pollId/vote', (req, res) => {
    res.json({ message: 'Vote on a poll' });
 })

//DELETE a poll
router.delete('/:pollId', (req, res) => {
    res.json({ message: 'Delete a poll' });
 })

module.exports = router;