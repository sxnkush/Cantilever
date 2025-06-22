import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !pass) return;

    try {
      console.log("In sign up form")
      const response = await axios.post(
        "http://localhost:8001/user/signup",
        {
          name,
          email,
          password: pass
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Signup success:", response.data);
      navigate("/login")
      
      setName("");
      setEmail("");
      setPass("");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="text-6xl font-bold text-center">SignUp</div>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
