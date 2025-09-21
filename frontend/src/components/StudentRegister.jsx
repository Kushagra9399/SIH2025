import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

export default function StudentRegister({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/studentRegister/`, {
        username,
        password,
      });
      //onLogin(res.data);
      navigate("/studentLogin");
    } catch (err) {
      alert("Student Already exists...");
    }
  }

  return (
    <div>
      <h2>Student Register</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
