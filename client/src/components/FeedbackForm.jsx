import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState(null);
  const [history, setHistory] = useState([]);

  const API_BASE_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://ai-feedback-backend-l4rf.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/feedback`, {
        user_input: input,
      });

      setResponses(res.data);
      setHistory([res.data, ...history]);
      setInput("");
    } catch (error) {
      if (error.response) {
        console.error(
          "Server Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No Response Received. Request Details:", error.request);
      } else {
        console.error("Axios Setup Error:", error.message);
      }
      alert("Failed to fetch feedback. Check console for details.");
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/history`);
        setHistory(res.data);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };
    fetchHistory();
  }, [API_BASE_URL]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">AI-Powered Feedback App</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-4 shadow rounded"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your response..."
          className="w-full p-2 border rounded mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Feedback
        </button>
      </form>

      {responses && (
        <div className="mt-4 p-4 bg-green-100 w-full max-w-md rounded shadow">
          <h3 className="font-bold">Latest Feedback:</h3>
          <p>{responses.feedback}</p>
        </div>
      )}

      <h2 className="mt-6 text-xl font-semibold">History</h2>
      <div className="w-full max-w-md">
        {history.map((item) => (
          <div key={item._id} className="p-3 bg-white mt-2 rounded shadow">
            <p>
              <strong>Your Response:</strong> {item.user_input}
            </p>
            <p>
              <strong>Feedback:</strong> {item.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
