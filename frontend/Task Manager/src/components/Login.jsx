import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const handlelogin = async(e) => {
    e.preventDefault();
    if(!email && !password) return;
    const formData = {
        email: email,
        password: pass
    }
    const response = await fetch("http://localhost:8001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // to specify JSON format
      },
      body: JSON.stringify(formData),       // to convert form data into JSON string
    });
    const result = await response.json()
    setEmail("")
    setPass("")
  };
  return (
    <>
      <div className="text-6xl font-bold text-center">Login</div>
      <form onSubmit={handlelogin}>
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
