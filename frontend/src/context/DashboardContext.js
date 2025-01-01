import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ token, children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [pTitle, setPTitle] = useState("");
    const [videos, setVideos] = useState([]);
    const [layout, setLayout] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVideoSidebarOpen, setIsVideoSidebarOpen] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;


    const fetchAuthUrl = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/youtube/auth-url`);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Failed to fetch auth URL:", err);
            toast.error("Failed to fetch YouTube authorization URL. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const importPlaylists = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/youtube/playlists`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPlaylists(response.data);
            setLayout(response.data.map((playlist) => playlist.id));
            toast.success("Playlists imported and saved successfully!");
        } catch (err) {
            console.error("Failed to import playlists:", err.response?.data || err.message);
            toast.error("Please authorize first and then try again.");

        } finally {
            setLoading(false);
        }
    };

    const saveLayout = async () => {
        try {
            await axios.post(`${baseUrl}/layout/save`, { layout }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Layout saved successfully!");
        } catch (err) {
            console.error("Failed to save layout:", err.message);
            toast.error("Failed to save layout. Please try again.");
        }
    };

    const loadLayout = async () => {
        try {
            const response = await axios.get(`${baseUrl}/layout/load`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data) {
                setLayout(response.data);
                toast.success("Layout loaded successfully!");
            } else {
                toast.warn("No layout found.");
            }
        } catch (err) {
            console.error("Failed to load layout:", err.message);
            toast.error("Failed to load layout. Please try again.");
        }
    };

    const handlePlaylistClick = (playlist) => {
        setVideos(playlist.videos);
        setPTitle(playlist.snippet.title);
        setIsVideoSidebarOpen(true);
    };

    return (
        <DashboardContext.Provider
            value={{
                playlists,
                setPlaylists,
                pTitle,
                setPTitle,
                videos,
                setVideos,
                layout,
                setLayout,
                loading,
                setLoading,
                isVideoSidebarOpen,
                setIsVideoSidebarOpen,
                fetchAuthUrl,
                importPlaylists,
                saveLayout,
                loadLayout,
                handlePlaylistClick,baseUrl
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
