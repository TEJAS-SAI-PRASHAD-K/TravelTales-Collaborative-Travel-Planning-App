const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    }],
    isOpen: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    closesAt: { type: Date }
});

module.exports = mongoose.model('Poll', pollSchema);