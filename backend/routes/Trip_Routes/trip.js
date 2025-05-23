
const express = require('express');
const router = express.Router();
const {
    getAllTrips,
    createTrip,
    getTripById,
    updateTrip,
    deleteTrip,
    inviteFriends,
    acceptInvitation,
} = require('../../controllers/tripController');

//GET all trips
router.get('/', getAllTrips)

//POST a new trip
router.post('/', createTrip)

//GET a trip by ID
router.get('/:id', getTripById)

//PUT update a trip
router.put('/:id', updateTrip)

//DELETE a trip
router.delete('/:id', deleteTrip)

//POST invite friends to a trip
router.post('/:id/invite', inviteFriends)

//POST accept invitation of a trip
router.post('/:id/join', acceptInvitation)

module.exports = router;