const express = require('express');
const router = express.Router();

//GET journal entries
router.get('/', (req, res) => {
    res.json({ message: 'Get all journal entries' });
 })

//POST a new journal entry
router.post('/', (req, res) => {
    res.json({ message: 'Create a new journal entry' });
 })

//PUT update a journal entry
router.put('/:entryId', (req, res) => {
    res.json({ message: 'Update a journal entry' });
 })

//DELETE a journal entry
router.delete('/:entryId', (req, res) => {
    res.json({ message: 'Delete a journal entry' });
 })

module.exports = router;