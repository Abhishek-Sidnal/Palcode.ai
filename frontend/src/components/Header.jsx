import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboard } from "../context/DashboardContext";
import { IoClose, IoMenuSharp } from "react-icons/io5";

const Header = ({ token }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, fetchAuthUrl, importPlaylists, saveLayout, loadLayout } =
    useDashboard();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out!");
    navigate(0);
  }

  return (
    <header className="bg-gray-800 p-4 mb-4 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-bold text-2xl">Dashboard</h2>

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenuSharp size={24} />}
        </button>

        <div className="hidden md:flex flex-wrap gap-4">
          {token ? (
            <>
              <button
                onClick={fetchAuthUrl}
                disabled={loading}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Authorize YouTube
              </button>
              <button
                onClick={importPlaylists}
                disabled={loading}
                className="bg-green-500 text-white px-2 py-1 rounded-lg transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import Playlists
              </button>
              <button
                onClick={saveLayout}
                className="bg-yellow-500 text-white px-2 py-1 rounded-lg transition hover:bg-yellow-600"
              >
                Save Layout
              </button>
              <button
                onClick={loadLayout}
                className="bg-purple-500 text-white px-2 py-1 rounded-lg transition hover:bg-purple-600"
              >
                Load Layout
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-2 py-1 rounded-lg transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/">
              <button className="bg-red-500 text-white px-2 py-1 rounded-lg transition hover:bg-red-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile  */}
      <div
        className={`mt-4 flex-col gap-4 md:hidden ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {token ? (
          <>
            <button
              onClick={fetchAuthUrl}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Authorize YouTube
            </button>
            <button
              onClick={importPlaylists}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import Playlists
            </button>
            <button
              onClick={saveLayout}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg transition hover:bg-yellow-600"
            >
              Save Layout
            </button>
            <button
              onClick={loadLayout}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg transition hover:bg-purple-600"
            >
              Load Layout
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
