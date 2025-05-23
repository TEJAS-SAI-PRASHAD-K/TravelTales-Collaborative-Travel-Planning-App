const Journal = require('../models/journalModel');

// GET all journal entries
const getAllJournalEntries = async (req, res) => {
    try {
        // Optionally filter by author or trip via query params, e.g. ?author=userid or ?trip=tripid
        const filter = {};
        if (req.query.author) filter.author = req.query.author;
        if (req.query.trip) filter.tripId = req.query.trip;

        // If you want to exclude private entries for other users, add logic here

        const entries = await Journal.find(filter)
            .populate('author', 'username email')
            .populate('tripId', 'name startDate endDate') // assuming Trip has those fields
            .sort({ date: -1 }); // latest first

        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
};

// POST create a new journal entry
const createJournalEntry = async (req, res) => {
    try {
        const { tripId, author, date, title, content, photos, mood, isPrivate } = req.body;

        if (!tripId || !author || !date || !title || !content) {
            return res.status(400).json({ error: 'tripId, author, date, title, and content are required' });
        }

        const newEntry = new Journal({
            tripId,
            author,
            date,
            title,
            content,
            photos: photos || [],
            mood,
            isPrivate: isPrivate || false
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
};

// PUT update a journal entry by entryId
const updateJournalEntry = async (req, res) => {
    try {
        const { entryId } = req.params;
        const updateData = req.body;

        const updatedEntry = await Journal.findByIdAndUpdate(entryId, updateData, { new: true });

        if (!updatedEntry) return res.status(404).json({ error: 'Journal entry not found' });

        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update journal entry' });
    }
};

// DELETE a journal entry by entryId
const deleteJournalEntry = async (req, res) => {
    try {
        const { entryId } = req.params;

        const deletedEntry = await Journal.findByIdAndDelete(entryId);

        if (!deletedEntry) return res.status(404).json({ error: 'Journal entry not found' });

        res.json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete journal entry' });
    }
};

module.exports = {
    getAllJournalEntries,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
};
