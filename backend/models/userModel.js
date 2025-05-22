const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "default.jpg" },
    bio: { type: String, maxlength: 200 },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    preferences: {
        travelStyle: { type: String, enum: ["Adventure", "Relaxation", "Cultural", "Foodie"] },
        notificationSettings: {
            email: { type: Boolean, default: true },
            app: { type: Boolean, default: true }
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);