import React from "react";
import DraggablePlaylistCard from "./DraggablePlaylistCard";
import { useDashboard } from "../context/DashboardContext";

const Playlists = () => {
  const { playlists, layout, handlePlaylistClick, setLayout } = useDashboard();

  return (
    <div className="w-full ">
      <h2 className="text-2xl font-semibold text-white mb-6">Playlists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 bg-[#27272f] p-3 sm:p-6 rounded-lg shadow-lg">
        {layout.length > 0 ? (
          layout.map((playlistId, index) => {
            const playlist = playlists.find((p) => p.id === playlistId);
            return (
              <DraggablePlaylistCard
                key={playlistId}
                playlist={playlist}
                index={index}
                layout={layout}
                setLayout={setLayout}
                onClick={() => handlePlaylistClick(playlist)}
              />
            );
          })
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No playlists available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Playlists;
