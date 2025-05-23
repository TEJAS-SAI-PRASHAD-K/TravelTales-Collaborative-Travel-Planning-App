const Trip = require('../models/tripModel');

// GET all trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('createdBy participants.user');
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST a new trip
const createTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        const savedTrip = await trip.save();
        res.status(201).json(savedTrip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET a trip by ID
const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id).populate('createdBy participants.user');
        if (!trip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT update a trip
const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTrip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a trip
const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json({ message: 'Trip deleted successfully', deletedTrip });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST invite friends to a trip
const inviteFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const { userIds } = req.body; // expects: { userIds: [id1, id2, ...] }

        const trip = await Trip.findById(id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });

        userIds.forEach(uid => {
            const alreadyAdded = trip.participants.some(p => p.user.toString() === uid);
            if (!alreadyAdded) {
                trip.participants.push({ user: uid });
            }
        });

        await trip.save();
        res.status(200).json({ message: 'Users invited successfully', trip });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// POST accept invitation (join trip)
const acceptInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // expects: { userId: "..." }

        const trip = await Trip.findById(id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });

        const participant = trip.participants.find(p => p.user.toString() === userId);

        if (!participant) {
            trip.participants.push({ user: userId });
        }

        await trip.save();
        res.status(200).json({ message: 'User joined the trip', trip });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllTrips,
    createTrip,
    getTripById,
    updateTrip,
    deleteTrip,
    inviteFriends,
    acceptInvitation,
};
