import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuthCallback = ({ setToken }) => {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchToken = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get("code");

            if (!code) {
                console.error("Authorization code missing");
                return;
            }

            try {
                const response = await axios.post(`${baseUrl}/youtube/auth-callback`, { code });
                const { access_token } = response.data;

                console.log("Access token received:", access_token);
                setToken(access_token);
                localStorage.setItem("token", access_token);

                navigate("/"); // Redirect to dashboard
            } catch (err) {
                console.error("Error exchanging code for token:", err.response?.data || err.message);
            }
        };

        fetchToken();
    }, [setToken, navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;
