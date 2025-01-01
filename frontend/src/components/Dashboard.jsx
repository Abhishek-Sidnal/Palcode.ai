import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaVideo } from "react-icons/fa";
import Videos from "./Videos";
import Playlists from "./Playlists";
import { useDashboard } from "../context/DashboardContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const {
    isVideoSidebarOpen,
    setIsVideoSidebarOpen,
    setPlaylists,
    setPTitle,
    setVideos,
    setLayout,
    baseUrl,
  } = useDashboard();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/youtube/user-playlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(response.data);
        setPTitle(response.data[0]?.snippet.title);
        setVideos(response.data[0]?.videos);
        setLayout(response.data.map((playlist) => playlist.id));
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.warn("Logged Out! Please re-login!");
        navigate(0);
      }
    };
    fetchPlaylists();
  }, [token, setPlaylists, setPTitle, setVideos, setLayout, baseUrl]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex relative gap-3 ">
        <Playlists />
        <Videos />
        <div className=" absolute right-2 top-2 ">
          {!isVideoSidebarOpen && (
            <button
              onClick={() => setIsVideoSidebarOpen(true)}
              className="md:hidden bg-[#27272f] text-white p-2 rounded-full shadow-lg"
            >
              <FaVideo size={16} />
            </button>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
