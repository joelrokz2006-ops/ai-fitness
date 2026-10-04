import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown'; // <-- ReactMarkdown இறக்குமதி செய்யப்பட்டுள்ளது
import './AITrainer.css'; // <-- Import file CSS di sini

// Initialize Gemini API from environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function AITrainer() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! Naan thaan unga AI Fitness Coach. Enna kelvi venum naalum kelunga!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    if (!ai) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Please configure VITE_GEMINI_API_KEY in your .env file to enable the AI coach.' }
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
        config: {
          systemInstruction: "You are an elite AI Fitness Trainer. Only answer fitness, diet, and workout related questions. Keep it friendly.",
          temperature: 0.7,
        }
      });

      const aiMessage = { role: 'model', text: response.text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, temporary-ah connect panna mudiyala!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">AI FITNESS CHATBOT</h2>
      
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role}`}>
            <span className="message-bubble">
              {/* ReactMarkdown-ஐ இங்கு பயன்படுத்தியுள்ளேன். இது வரிகளைத் தனித்தனியாகப் பிரித்துக் காட்டும் */}
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </span>
          </div>
        ))}
        {loading && <div className="loading-text">AI Coach typing...</div>}
      </div>

      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about diet or exercises..."
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default AITrainer;