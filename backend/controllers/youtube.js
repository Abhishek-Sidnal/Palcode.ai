const { google } = require("googleapis");
const Playlist = require("../models/Playlist");


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/oauth-callback"
);

exports.getAuthUrl = (req, res) => {
    const scopes = [
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/userinfo.email", 
    ];
    const url = oauth2Client.generateAuthUrl({ access_type: "offline", scope: scopes, prompt: "consent" });
    res.json({ url });
}

exports.authCallback = async (req, res) => {
    const { code } = req.body;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log("Tokens received:", tokens);
        res.json(tokens);
    } catch (err) {
        console.error("Error exchanging code for token:", err.message);
        res.status(500).json({ message: "Error exchanging code for token" });
    }
}

exports.getUserPlaylists = async (req, res) => {
    try {
        const userId = req.user.id;
        const accessToken = req.header("Authorization")?.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({ message: "Missing access token" });
        }

        oauth2Client.setCredentials({ access_token: accessToken });
        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        const playlistResponse = await youtube.playlists.list({
            part: "snippet,contentDetails",
            mine: true,
            maxResults: 50,
        });

        const playlists = playlistResponse.data.items;
        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ message: "No playlists found." });
        }

        for (const playlist of playlists) {
           
            const videoResponse = await youtube.playlistItems.list({
                part: "snippet,contentDetails",
                playlistId: playlist.id,
                maxResults: 50,
            });

            const videoIds = videoResponse.data.items.map((item) => item.contentDetails.videoId);

            const videoDetailsResponse = await youtube.videos.list({
                part: "contentDetails,snippet",
                id: videoIds.join(","),
            });

            const videos = videoDetailsResponse.data.items.map((video) => {
                const duration = video.contentDetails.duration; 
                return {
                    videoId: video.id,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnails: video.snippet.thumbnails,
                    duration: duration, 
                };
            });

            await Playlist.updateOne(
                { id: playlist.id, userId },
                {
                    ...playlist,
                    userId,
                    videos, 
                    lastUpdated: new Date(),
                },
                { upsert: true }
            );
        }

        res.json(playlists);
    } catch (err) {
        console.error("Error fetching playlists or videos:", err.response?.data || err.message);
        res.status(500).json({ message: "Error fetching playlists or videos" });
    }
}

exports.getUserPlaylist = async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log(`Fetching playlists for user: ${userId}`);

        const playlists = await Playlist.find({ userId }).select("-__v"); 
        res.json(playlists);
    } catch (err) {
        console.error("Error fetching user playlists:", err.message);
        res.status(500).json({ message: "Error fetching user playlists" });
    }
}