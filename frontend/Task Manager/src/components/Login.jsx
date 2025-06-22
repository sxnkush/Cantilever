import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) return;

    try {
      const response = await axios.post(
        "http://localhost:8001/user/login",
        { email, password: pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login status:", response.data);
      if(response.data.message === "not found")
      {
        navigate("/login")
        return
      }
      if(response.data.message === "success")
      {
        const userId = response.data.userId
        navigate(`/`)
      }
      setEmail("");
      setPass("");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="text-6xl font-bold text-center">Login</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
