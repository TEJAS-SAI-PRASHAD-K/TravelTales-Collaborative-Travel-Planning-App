const Poll = require('../models/pollModel');

// GET all polls (optionally filter by tripId)
const getAllPolls = async (req, res) => {
    try {
        const filter = {};
        if (req.query.tripId) filter.tripId = req.query.tripId;

        const polls = await Poll.find(filter)
            .populate('createdBy', 'username email')
            .populate('options.voters', 'username');

        res.json(polls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
};

// POST create a new poll
const createPoll = async (req, res) => {
    try {
        const { tripId, createdBy, question, options, closesAt } = req.body;

        if (!tripId || !createdBy || !question || !options || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ error: 'tripId, createdBy, question, and at least two options are required' });
        }

        const formattedOptions = options.map(opt => ({ text: opt, voters: [] }));

        const newPoll = new Poll({
            tripId,
            createdBy,
            question,
            options: formattedOptions,
            closesAt
        });

        const savedPoll = await newPoll.save();
        res.status(201).json(savedPoll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create poll' });
    }
};

// POST vote on a poll
const voteOnPoll = async (req, res) => {
    try {
        const { pollId } = req.params;
        const { userId, optionIndex } = req.body;

        if (!userId || optionIndex === undefined) {
            return res.status(400).json({ error: 'userId and optionIndex are required' });
        }

        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        if (!poll.isOpen) {
            return res.status(400).json({ error: 'Poll is closed' });
        }

        if (poll.closesAt && new Date() > poll.closesAt) {
            poll.isOpen = false;
            await poll.save();
            return res.status(400).json({ error: 'Poll has closed' });
        }

        // Check if user already voted on any option
        const alreadyVoted = poll.options.some(opt =>
            opt.voters.some(voterId => voterId.toString() === userId)
        );

        if (alreadyVoted) {
            return res.status(400).json({ error: 'User has already voted' });
        }

        // Check optionIndex bounds
        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            return res.status(400).json({ error: 'Invalid optionIndex' });
        }

        // Add user to voters of chosen option
        poll.options[optionIndex].voters.push(userId);

        await poll.save();

        res.json({ message: 'Vote recorded', poll });
    } catch (error) {
        res.status(500).json({ error: 'Failed to vote on poll' });
    }
};

// DELETE a poll by pollId
const deletePoll = async (req, res) => {
    try {
        const { pollId } = req.params;

        const deletedPoll = await Poll.findByIdAndDelete(pollId);

        if (!deletedPoll) return res.status(404).json({ error: 'Poll not found' });

        res.json({ message: 'Poll deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete poll' });
    }
};

module.exports = {
    getAllPolls,
    createPoll,
    voteOnPoll,
    deletePoll
};
