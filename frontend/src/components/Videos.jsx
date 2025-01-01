import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import VideoList from "./VideoList";
import { useDashboard } from "../context/DashboardContext";

const Videos = () => {
  const { pTitle, videos, isVideoSidebarOpen, setIsVideoSidebarOpen } =
    useDashboard();

  return (
    <div
      className={`fixed top-0 md:relative ${
        isVideoSidebarOpen ? "right-0" : "-right-full"
      } transition-all duration-300 min-w-[240px] sm:min-w-[300px] md:min-w-[300px] w-1/6 h-screen bg-[#27272f] p-4 md:block md:right-0 rounded-lg shadow-lg text-white overflow-auto custom-scrollbar`}
    >
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">
          {pTitle ? `Videos of ${pTitle}` : "Videos"}
        </h2>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsVideoSidebarOpen(false)}
        >
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className="mt-4">
        {videos?.length > 0 ? (
          <VideoList videos={videos} />
        ) : (
          <p className="text-gray-400">
            {pTitle
              ? `${pTitle} doesn't have any videos.`
              : "No videos available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Videos;
