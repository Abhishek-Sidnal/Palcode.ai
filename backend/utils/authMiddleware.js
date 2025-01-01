const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const User = require("../models/User");
const axios = require("axios");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        if (token.startsWith("ya29")) {
            const oauth2Client = new google.auth.OAuth2();
            oauth2Client.setCredentials({ access_token: token });

            const { data: userInfo } = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!userInfo.email) {
                throw new Error("Google token validation failed: email not found");
            }

            const user = await User.findOne({ email: userInfo.email });
            if (!user) {
                throw new Error("User not found in the database");
            }

            req.user = { id: user._id, email: user.email };
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
        }

        next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
