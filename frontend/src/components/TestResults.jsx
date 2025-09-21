import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

export default function TestResults({ session }) {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.username) {
        navigate("/"); // redirect if no session
        console.warn("⚠️ No session.username found, redirecting to home...");
        return;
    }

    console.log("👉 Fetching test results for user:", session.username);

    async function fetchResults() {
      try {
        const res = await fetch(`${API_URL}/testResults/${session.username}`);
        if (!res.ok) throw new Error("No results found");
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setResult(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [session, navigate]);

  if (loading) return <div>Loading results...</div>;

  if (!result) {
    return (
      <div>
        <p>No test results found.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <section className="card">
      <h2>Test Results</h2>
      <p>
        Score: {result.score} / {result.questions.length*2}
      </p>  
      <table>
        <thead>
          <tr>
            <th>Q#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>AI Verdict</th>
            <th>Your Reasoning</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {result.detailed_scores?.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d.question}</td>
              <td>{d.student_answer || "—"}</td>
              <td>{d.correct_answer || "—"}</td>
              <td>{d.verdict || "—"}</td>
              <td>{d.reasoning || "—"}</td>
              <td>{d.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </section>
  );
}
