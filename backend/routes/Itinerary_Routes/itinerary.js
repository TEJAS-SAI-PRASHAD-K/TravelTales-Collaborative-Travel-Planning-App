const express = require('express');
const router = express.Router();

//GET all itineraries
router.get('/', (req, res) => {
    res.json({ message: 'Get all itineraries' });
 })

//POST a new itinerary
router.post('/', (req, res) => {
    res.json({ message: 'Create a new itinerary' });
 })

//PUT update an itinerary
router.put('/:activityId', (req, res) => {
    res.json({ message: 'Update an itinerary' });
 })

//DELETE an itinerary
router.delete('/:activityId', (req, res) => {
    res.json({ message: 'Delete an itinerary' });
 })

module.exports = router;