import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !pass) {
      setWarning(true);
      setLoading(false)
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/user/signup",
        {
          name,
          email,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup success:", response.data);
      setName("");
      setEmail("");
      setPass("");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-400 to-purple-600">
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <span className={`text-red-600 ${warning ? "flex" : "hidden"}`}>
              Fill each field
            </span>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition ${
                loading
                  ? "bg-purple-700 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <span>
            Already a user please do{" "}
            <a href="/login" className="text-blue-400 underline">
              Log In
            </a>
          </span>
        </div>
      </div>

      <div className="w-1/2 h-fit">
        <img
          src="/signup.svg"
          alt="Signup Visual"
          className="w-full sm:h-screen object-cover rounded-[50px] p-6"
        />
      </div>
    </div>
  );
}
