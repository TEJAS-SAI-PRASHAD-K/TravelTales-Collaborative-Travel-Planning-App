const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destinations: [{
        name: { type: String, required: true },
        coordinates: { lat: Number, lng: Number }
    }],
    coverImage: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["Organizer", "Member"], default: "Member" }
    }],
    isPublic: { type: Boolean, default: false },
    status: { type: String, enum: ["Planning", "Ongoing", "Completed"], default: "Planning" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);