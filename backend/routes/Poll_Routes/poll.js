const express = require('express');
const router = express.Router();
const { 
    getAllPolls,
    createPoll,
    voteOnPoll,
    deletePoll
} = require('../../controllers/pollController');

//GET polls
router.get('/', getAllPolls)

//POST create a new poll
router.post('/', createPoll)

//POST vote on a poll
router.post('/:pollId/vote', voteOnPoll)

//DELETE a poll
router.delete('/:pollId', deletePoll)

module.exports = router;