const express = require('express');
const router = express.Router();
const {
    getAllItineraries,
    createItinerary,
    updateItineraryActivity,
    deleteItineraryActivity
} = require('../controllers/itineraryController');

//GET all itineraries
router.get('/', getAllItineraries)

//POST a new itinerary
router.post('/', createItinerary)

//PUT update an itinerary
router.put('/:activityId', updateItineraryActivity)

//DELETE an itinerary
router.delete('/:activityId', deleteItineraryActivity)

module.exports = router;