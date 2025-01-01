import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OAuthCallback from "./components/OAuthCallback";
import { DashboardProvider } from "./context/DashboardContext";
import MenuSideBar from "./components/MenuSideBar";
import Header from "./components/Header";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    return (
        <DashboardProvider token={token}>
            <Router>
                <div className="flex min-h-screen bg-gray-900 p-3 sm:gap-3 ">
                    {token && (
                        <div className="relative bg-[#27272f] ">
                            <MenuSideBar />
                        </div>
                    )}

                    <div className="flex-1">
                        <Header token={token} />

                        <div className="sm:p-2 md:p-4">
                            <Routes>
                                <Route
                                    path="/"
                                    element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
                                />

                                <Route
                                    path="/oauth-callback"
                                    element={<OAuthCallback setToken={setToken} />}
                                />

                                <Route
                                    path="/revenue-details"
                                    element={<Page title="Revenue Details" />}
                                />
                                <Route
                                    path="/shoppable-overview"
                                    element={<Page title="Shoppable Overview" />}
                                />
                                <Route
                                    path="/create-story"
                                    element={<Page title="Create Story" />}
                                />
                                <Route
                                    path="/schedule-post"
                                    element={<Page title="Schedule Post" />}
                                />
                                <Route
                                    path="/view-calendar"
                                    element={<Page title="View Calendar" />}
                                />
                                <Route
                                    path="/find-influencer"
                                    element={<Page title="Find Influencer" />}
                                />

                                <Route
                                    path="/login"
                                    element={!token ? <Login setToken={setToken} token={token} /> : <Navigate to={'/'} />}
                                />

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </DashboardProvider>
    );
};

const Page = ({ title }) => (
    <div className="text-white flex justify-center items-center h-screen text-2xl font-bold capitalize">
        {title}
    </div>
);

export default App;
