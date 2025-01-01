import React from "react";

const VideoList = ({ videos }) => {
  function parseDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    const minutes = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
    const seconds = match[3] ? parseInt(match[3].slice(0, -1)) : 0;

    // Format the duration
    const formattedTime =
      hours > 0
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`
        : `${minutes}:${String(seconds).padStart(2, "0")}`;

    return formattedTime;
  }


  return (
    <div className="space-y-3 w-full ">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-white rounded-lg shadow p-1 flex items-start gap-2"
        >
          <img
            src={video.thumbnails?.default?.url}
            alt={video.title}
            className="w-10 h-10 object- rounded-xl"
          />
          <div className="flex-1 overflow-hidden">
            <h3
              className="text-sm font-semibold text-gray-800 truncate text-ellipsis cursor-pointer "
              title={video.title}
            >
              {video.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {parseDuration(video.duration)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
