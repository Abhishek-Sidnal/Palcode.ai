import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaDollarSign,
  FaVideo,
  FaBook,
  FaList,
  FaTelegramPlane,
  FaCalendarAlt,
  FaUserTie,
  FaChevronCircleLeft,
} from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";

const MenuSideBar = () => {
  const [isUlSidebarOpen, setIsUlSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleAccordionToggle = (sectionKey) => {
    setOpenSection((prevSection) =>
      prevSection === sectionKey ? null : sectionKey
    );
  };

  const menuSections = [
    {
      title: "Revenue",
      icon: <FaDollarSign />,
      links: [{ to: "/revenue-details", label: "Revenue Details" }],
      key: "revenue",
    },
    {
      title: "Shoppable Video",
      icon: <FaVideo />,
      links: [{ to: "/shoppable-overview", label: "Overview" }],
      key: "shoppable",
    },
    {
      title: "Story",
      icon: <FaBook />,
      links: [{ to: "/create-story", label: "Create Story" }],
      key: "story",
    },
    {
      title: "Playlist Manager",
      icon: <FaList />,
      links: [{ to: "/dashboard", label: "Product Playlist" }],
      key: "playlist",
    },
    {
      title: "One Click Post",
      icon: <FaTelegramPlane />,
      links: [{ to: "/schedule-post", label: "Schedule Post" }],
      key: "post",
    },
    {
      title: "Calendar",
      icon: <FaCalendarAlt />,
      links: [{ to: "/view-calendar", label: "View Calendar" }],
      key: "calendar",
    },
    {
      title: "Hire Influencer",
      icon: <FaUserTie />,
      links: [{ to: "/find-influencer", label: "Find Influencers" }],
      key: "influencer",
    },
  ];

  return (
    <div className="relative h-full">
      {/* Open/Close Button */}
      <button
        onClick={() => setIsUlSidebarOpen(!isUlSidebarOpen)}
        className={`fixed top-12 ${
          isUlSidebarOpen ? "left-[220px]" : "-left-3"
        } md:block lg:hidden bg-gray-800 text-white p-2 rounded-full shadow-md z-50 transition-all duration-300`}
        aria-label={isUlSidebarOpen ? "Close menu" : "Open menu"}
      >
        {isUlSidebarOpen ? (
          <FaChevronCircleLeft size={24} />
        ) : (
          <FaCircleChevronRight size={24} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isUlSidebarOpen ? "fixed left-0" : "fixed -left-full"
        } lg:relative lg:left-0 transition-all duration-300 bg-gray-800 text-white w-[240px] lg:w-[280px] h-full  z-40 lg:z-0 rounded-lg p-6`}
        role="navigation"
        aria-label="Sidebar menu"
      >
        {/* Sidebar Header */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Blaash
        </h2>

        {/* Sidebar Content */}
        <div className="space-y-4">
          {menuSections.map((section) => (
            <div key={section.key}>
              {/* Accordion Toggle Button */}
              <button
                onClick={() => handleAccordionToggle(section.key)}
                className="w-full flex items-center justify-between text-lg font-semibold px-4 py-2 hover:bg-gray-700 rounded transition"
              >
                <span className="flex items-center gap-2">
                  {section.icon} {section.title}
                </span>
                <span>{openSection === section.key ? "-" : "+"}</span>
              </button>

              {/* Accordion Content */}
              {openSection === section.key && (
                <div className="pl-8 mt-2 text-sm space-y-2">
                  {section.links.map((link, idx) => (
                    <NavLink
                      key={idx}
                      to={link.to}
                      className={({ isActive }) =>
                        `block py-1 ${
                          isActive ? "text-blue-500 font-bold" : "text-gray-300"
                        } hover:underline`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;
