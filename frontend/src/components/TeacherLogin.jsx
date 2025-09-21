import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

export default function TeacherLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/teacherLogin/`, {
        username,
        password,
      });
      onLogin(res.data);
      navigate("/teacher");
    } catch (err) {
      alert("Invalid teacher login");
    }
  }

  return (
    <div>
      <h2>Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <Link to="/teacherRegister">Register here</Link>
      </p>
    </div>
  );
}
