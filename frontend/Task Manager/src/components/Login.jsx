import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";


export default function Login() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setWarning(true);
      return;
    }
    setLoading(true);

    try {
      setTimeout(async () => {
        const response = await axios.post(
          `${BASE_URL}/api/user/login`,
          { email, password: pass },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        );

        if (response.data.message === "not found") {
          setWarning(true);
          setLoading(false);
          setPass("");
          return;
        }
        if (response.data.message === "success") {
          navigate(`/`);
        }
        setEmail("");
        setPass("");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-500 to-yellow-800">
      <img
        src="/Login.svg"
        alt="Login Background"
        className="absolute sm:top-0 -top-10 -left-5 inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="text-center mb-8 mt-8">
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="text-yellow-900">Task</span>{" "}
            <span className="text-white">Manager</span>
          </h1>
          <p className="text-amber-100 font-semibold text-sm sm:text-lg mt-1">
            Let’s manage your tasks effortlessly.
          </p>
        </div>

        <div className="bg-white opacity-90 backdrop-blur-md shadow-xl rounded-lg p-8 sm:p-10 w-full max-w-md mt-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                placeholder="Enter Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <span
              className={`text-red-600 -mt-2 ${warning ? "flex" : "hidden"}`}
            >
              Invalid Credentials
            </span>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition ${
                loading
                  ? "bg-yellow-600 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <span className="block text-center mt-4">
            If new user please do{" "}
            <a href="/signup" className="text-blue-400 underline">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
