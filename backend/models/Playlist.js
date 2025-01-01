const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // YouTube Playlist ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associated User
    snippet: {
        title: { type: String, required: true },
        description: { type: String },
        thumbnails: {
            default: { url: String },
            medium: { url: String },
            high: { url: String },
        },
    },
    contentDetails: {
        itemCount: { type: Number },
    },
    videos: [
        {
            videoId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            thumbnails: {
                default: { url: String },
                medium: { url: String },
                high: { url: String },
            },
            duration: { type: String }, // e.g., "PT1H30M45S"

        },
    ],
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
