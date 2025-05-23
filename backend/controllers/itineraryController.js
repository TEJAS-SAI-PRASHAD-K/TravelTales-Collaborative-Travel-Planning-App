const Itinerary = require('../models/itineraryModel');

// GET all itineraries
const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find().populate('tripId').populate('days.activities.assignedTo', 'username email');
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch itineraries' });
    }
};

// POST create new itinerary
const createItinerary = async (req, res) => {
    try {
        const { tripId, days } = req.body;

        if (!tripId || !days) {
            return res.status(400).json({ error: 'tripId and days are required' });
        }

        const newItinerary = new Itinerary({ tripId, days });
        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create itinerary' });
    }
};

// PUT update itinerary by activityId (update an activity inside days)
const updateItineraryActivity = async (req, res) => {
    try {
        const { activityId } = req.params;
        const updateData = req.body;

        // Find the itinerary that contains this activity
        const itinerary = await Itinerary.findOne({ 'days.activities._id': activityId });

        if (!itinerary) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Loop through days and activities to find the exact activity and update
        let updated = false;
        itinerary.days.forEach(day => {
            day.activities.forEach(activity => {
                if (activity._id.toString() === activityId) {
                    Object.assign(activity, updateData);
                    updated = true;
                }
            });
        });

        if (!updated) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        await itinerary.save();
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update itinerary activity' });
    }
};

// DELETE an itinerary activity by activityId
const deleteItineraryActivity = async (req, res) => {
    try {
        const { activityId } = req.params;

        const itinerary = await Itinerary.findOne({ 'days.activities._id': activityId });

        if (!itinerary) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Remove the activity from the day's activities array
        itinerary.days.forEach(day => {
            day.activities = day.activities.filter(activity => activity._id.toString() !== activityId);
        });

        // Optionally, remove days that have no activities left
        itinerary.days = itinerary.days.filter(day => day.activities.length > 0);

        await itinerary.save();
        res.json({ message: 'Activity deleted successfully', itinerary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete itinerary activity' });
    }
};

module.exports = {
    getAllItineraries,
    createItinerary,
    updateItineraryActivity,
    deleteItineraryActivity
};
