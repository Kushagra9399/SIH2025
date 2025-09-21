import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";
const DEFAULT_TIME_SECONDS = 15 * 60;

export default function Test({ session }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [remaining, setRemaining] = useState(DEFAULT_TIME_SECONDS);
  const [currentQ, setCurrentQ] = useState(0);
  const timerRef = useRef(null);

  // Fetch questions from backend
  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(`${API_URL}/questions`);
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.questions.map(() => ({ selectedIndex: null, reasoning: "" })));
    }
    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions]);

  function updateAnswer(qIdx, selectedIndex) {
    const copy = [...answers];
    copy[qIdx].selectedIndex = selectedIndex;
    setAnswers(copy);
  }

  function updateReason(qIdx, text) {
    const copy = [...answers];
    copy[qIdx].reasoning = text;
    setAnswers(copy);
  }

  function handleSubmit(auto = false) {
    if (!auto && !window.confirm("Submit the test now?")) return;

    clearInterval(timerRef.current);

    // Save result to backend
    fetch(`${API_URL}/submitTest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: session.username,
        answers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Test submitted, backend result:", data);
        // Redirect to /testresults with data
        navigate("/testresults");
      })
      .catch((err) => {
        console.error("Error submitting test:", err);
        alert("Error submitting test");
      });
  }

  if (questions.length === 0) return <div>Loading questions...</div>;

  const q = questions[currentQ];

  return (
    <section className="card">
      <div>
        <p>{session.username}</p>
        <p>Time left: {formatTime(remaining)}</p>
        <p>Q {currentQ + 1} / {questions.length}</p>
      </div>

      <h3>{q.text}</h3>
      {q.options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            checked={answers[currentQ].selectedIndex === i}
            onChange={() => updateAnswer(currentQ, i)}
          />
          {String.fromCharCode(65 + i)}. {opt}
        </label>
      ))}

      <textarea
        placeholder="Your reasoning"
        value={answers[currentQ].reasoning}
        onChange={(e) => updateReason(currentQ, e.target.value)}
      />

      <div>
        <button onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}>Prev</button>
        <button onClick={() => setCurrentQ((c) => Math.min(questions.length - 1, c + 1))}>Next</button>
        <button onClick={() => handleSubmit(false)}>Submit Test</button>
      </div>
    </section>
  );

  function formatTime(s) {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }
}
