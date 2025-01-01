const { google } = require("googleapis");

const refreshAccessToken = async (refreshToken) => {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const { credentials } = await oauth2Client.refreshAccessToken();
        console.log("Refreshed tokens:", credentials);

        return credentials.access_token;
    } catch (err) {
        console.error("Error refreshing access token:", err.message);
        throw new Error("Token refresh failed");
    }
};

module.exports = refreshAccessToken;
