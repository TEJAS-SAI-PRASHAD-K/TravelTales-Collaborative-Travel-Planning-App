const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ["Accommodation", "Food", "Transport", "Activity", "Other"] },
    splitBetween: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        share: { type: Number }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);