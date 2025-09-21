import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

export default function TeacherRegister({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/teacherRegister/`, {
        username,
        password,
      });
      onLogin(res.data);
      navigate("/teacherLogin");
    } catch (err) {
      alert("Teacher Already exists...");
    }
  }

  return (
    <div>
      <h2>Teacher Register</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
