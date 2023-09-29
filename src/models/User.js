import mongoose from "mongoose";

// mongoose.models = {}

const userSchema = new mongoose.Schema({
    fullName: String,
    profilePicture: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    image: {
        type: String,
    },
    phoneNo: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ['artist', 'customer'],
    },
    // Additional artist-related fields
    artistInfo: {
        bio: String,
        artworks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artwork',
            },
        ],
    },
    // Additional customer-related fields
    customerInfo: {
        preferences: [String], // Store customer preferences, e.g., art styles
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
    },
    // Add more fields as needed for user management and future expansion
});

export default mongoose?.models?.User || mongoose.model('User', userSchema)
