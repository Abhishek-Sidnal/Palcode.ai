import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiSolidVideos } from "react-icons/bi";

const DraggablePlaylistCard = ({
  playlist,
  index,
  layout,
  setLayout,
  onClick,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "PLAYLIST_CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "PLAYLIST_CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        const updatedLayout = [...layout];
        const [removed] = updatedLayout.splice(draggedItem.index, 1);
        updatedLayout.splice(index, 0, removed);
        setLayout(updatedLayout);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (!playlist) return null;

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`bg-gray-500 shadow-md rounded-xl overflow-hidden transition-shadow duration-300 cursor-pointer relative p-1 
        ${isDragging ? "opacity-50 border-2 border-blue-500" : ""}
        ${isOver ? "border-2 border-green-500 shadow-lg" : ""}
      `}
      onClick={onClick}
    >
      <img
        src={playlist.snippet.thumbnails.default.url}
        alt={playlist.snippet.title}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="absolute bottom-0 w-full right-0 p-1 rounded-lg overflow-hidden ">
        <h3 className="text-lg font-semibold truncate text-white bg-black/40 ">
          <span className="px-2 bg-blue-400 rounded-r-full mr-2"></span>{" "}
          {playlist.snippet.title}
        </h3>
        <div className="text-sm w-full bg-black rounded-b-lg text-gray-50 flex items-center gap-2 justify-center p-2">
          <BiSolidVideos />
          {playlist.contentDetails.itemCount} videos
        </div>
      </div>
    </div>
  );
};

export default DraggablePlaylistCard;
