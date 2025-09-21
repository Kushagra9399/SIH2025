import React, { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function TeacherDashboard() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const handleOptionChange = (idx, value) => {
    const copy = [...options];
    copy[idx] = value;
    setOptions(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/addQuestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, options, correct }),
      });
      const data = await res.json();
      alert(data.message);
      // Reset form
      setText("");
      setOptions(["", "", "", ""]);
      setCorrect(0);
    } catch (err) {
      alert("Error adding question");
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ padding: 20, maxWidth: 600, margin: "20px auto" }}>
      <h2 className="title">Teacher Dashboard — Add Question</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Question Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ width: "100%", minHeight: 60 }}
          />
        </div>

        {options.map((opt, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <label>Option {i + 1}:</label>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 10 }}>
          <label>Correct Option:</label>
          <select value={correct} onChange={(e) => setCorrect(Number(e.target.value))}>
            {options.map((_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
      </form>
    </div>
  );
}
