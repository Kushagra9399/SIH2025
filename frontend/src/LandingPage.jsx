import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          Learn Smarter with <span className="text-purple-900">QuizApp</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create, share, and play quizzes with ease. Perfect for teachers,
          students, and teams.
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
            onClick={() => navigate("/studentLogin")}
          >
            Students
          </button>
          <button
            className="px-6 py-3 bg-white border border-purple-600 text-purple-600 rounded-xl shadow-md hover:bg-purple-50 transition"
            onClick={() => navigate("/teacherLogin")}
          >
            Teachers
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 max-w-6xl">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            Easy to Use
          </h3>
          <p className="text-gray-600">
            Simple interface for creating and playing quizzes in minutes.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            Teacher Dashboard
          </h3>
          <p className="text-gray-600">
            Track student progress and analyze results in real-time.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            Fun for Students
          </h3>
          <p className="text-gray-600">
            Interactive quizzes make learning engaging and enjoyable.
          </p>
        </div>
      </section>
    </div>
  );
}
