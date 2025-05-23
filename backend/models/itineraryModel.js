const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itinerarySchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    days: [{
        date: { type: Date, required: true },
        activities: [{
            name: { type: String, required: true },
            description: { type: String },
            startTime: { type: String },
            endTime: { type: String },
            location: { type: String },
            cost: { type: Number, default: 0 },
            assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }
        }]
    }]
});

module.exports = mongoose.model('Itinerary', itinerarySchema);