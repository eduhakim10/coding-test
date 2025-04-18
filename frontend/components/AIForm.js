"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { handleAskQuestion } from "../utils/api";



export default function AiForm({ setAiResponse }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   

    try {
      const data = await handleAskQuestion(question);
  
      if (data.error) {
        setError(data.error);
      } else {
        setAiResponse(data.answer);
      }
    } catch (err) {
      setError("An error occurred while fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
            Ask a Question
          </label>
          <textarea
            id="question"
            value={question}
            placeholder="Enter your question..."
            onChange={(e) => setQuestion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            disabled={loading}
          >
            {loading ? <LoadingSpinner  /> : "Ask"}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
