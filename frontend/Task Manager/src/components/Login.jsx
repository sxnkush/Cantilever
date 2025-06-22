import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) return;

    try {
      const response = await axios.post(
        "/api/user/login",
        { email, password: pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "not found") {
        setWarning(true);
        setPass("");
        return;
      }
      if (response.data.message === "success") {
        navigate(`/`);
      }
      setEmail("");
      setPass("");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-300 to-yellow-500">
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
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
              className={`text-red-600 -mt-2 ${
                warning ? "flex" : "hidden"
              }`}
            >
              Invalid Credentials
            </span>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition hover:cursor-pointer"
            >
              Login
            </button>
          </form>
          <span>If new user please do <a href="/signup" className="text-blue-400 underline">Sign Up</a></span>
        </div>
      </div>

      <div className="w-1/2 h-fit">
        <img
          src="/Login.svg"
          alt="Login Visual"
          className="w-full sm:h-screen object-cover rounded-[50px] p-6"
        />
      </div>
    </div>
  );
}
