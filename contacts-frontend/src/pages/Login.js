import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/contacts");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control my-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control my-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}