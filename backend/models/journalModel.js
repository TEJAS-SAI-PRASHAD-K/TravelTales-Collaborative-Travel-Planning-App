const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const journalEntrySchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photos: [{ type: String }], // URLs to stored images
    mood: { type: String, enum: ["Happy", "Excited", "Tired", "Stressed", "Relaxed"] },
    isPrivate: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', journalEntrySchema);