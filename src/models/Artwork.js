import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    category: [String],
    tags: [String],
    price: Number,
    dimensions: {
        height: Number,
        width: Number,
    },
    medium: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    inStock: Boolean,

})

export default mongoose.models.Artwork || mongoose.model('Artwork', artworkSchema);
