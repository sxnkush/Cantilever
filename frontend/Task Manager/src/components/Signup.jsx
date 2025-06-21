import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const handlesignup = async(e) => {
    e.preventDefault();
    if(!name && !email && !password) return;
    const formData = {
        name: name,
        email: email,
        password: pass
    }
    const response = await fetch("http://localhost:8001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // to specify JSON format
      },
      body: JSON.stringify(formData),       // to convert form data into JSON string
    });
    const result = await response.json()
    setName("")
    setEmail("")
    setPass("")
  };
  return (
    <>
      <div className="text-6xl font-bold text-center">SignUp</div>
      <form onSubmit={handlesignup}>
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
