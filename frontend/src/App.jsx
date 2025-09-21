import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import StudentRegister from "./components/StudentRegister";
import TeacherRegister from "./components/TeacherRegister";
import Test from "./components/Test";
import TeacherDashboard from "./components/TeacherDashboard";
import TestResults from "./components/TestResults";

export default function App() {
  // Load session from browser storage on first load
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("session");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }
  }, [session]);

  function handleLogin(user) {
    setSession(user); // user comes from FastAPI /login
  }

  function signOut() {
    setSession(null);
    localStorage.removeItem("session");
    navigate("/");
  }

  return (
    <div className="wrap">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Student pages */}
        <Route path="/studentLogin" element={<StudentLogin onLogin={handleLogin} />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route
          path="/test"
          element={
            session ? <Test session={session} /> : <LandingPage />
          }
        />
        <Route path="/testresults" element={<TestResults session={session} />} /> 

        {/* Teacher pages */}
        <Route path="/teacherLogin" element={<TeacherLogin onLogin={handleLogin} />} />
        <Route path="/teacherRegister" element={<TeacherRegister />} />
        <Route
          path="/teacher"
          element={
            session ? <TeacherDashboard session={session} onLogout={signOut} /> : <LandingPage />
          }
        />
      </Routes>
    </div>
  );
}
