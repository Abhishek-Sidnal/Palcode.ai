import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const validateEmail = (email) => email.includes("@");

  if (token) {
    navigate("/");
  }

  const sendOtp = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/auth/send-otp`, { email });
      setIsOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/verify-otp`, {
        email,
        otp,
      });

      const { token, user } = response.data;

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again.");
        return;
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 bg-[#27272f]">
      <div className="bg-[#33333d] shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Email"
          />
          {isOtpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="OTP"
            />
          )}
          {!isOtpSent ? (
            <button
              onClick={sendOtp}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded text-white ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } focus:ring-2 focus:outline-none`}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <button
              onClick={verifyOtp}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded text-white ${
                isLoading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } focus:ring-2 focus:outline-none`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
