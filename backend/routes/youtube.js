const express = require("express");
const authMiddleware = require("../utils/authMiddleware");
const { getAuthUrl, authCallback, getUserPlaylist, getUserPlaylists } = require("../controllers/youtube");
const router = express.Router();

router.get("/auth-url", getAuthUrl);
router.post("/auth-callback", authCallback);
router.get("/playlists", authMiddleware, getUserPlaylists);
router.get("/user-playlists", authMiddleware, getUserPlaylist);

module.exports = router;
