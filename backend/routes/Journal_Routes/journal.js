const express = require('express');
const router = express.Router();
const {
    getAllJournalEntries,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
} = require('../../controllers/journalController');

//GET journal entries
router.get('/', getAllJournalEntries)

//POST a new journal entry
router.post('/', createJournalEntry)

//PUT update a journal entry
router.put('/:entryId', updateJournalEntry)

//DELETE a journal entry
router.delete('/:entryId', deleteJournalEntry)

module.exports = router;