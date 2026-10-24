import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AITrainer.css';

function AITrainer() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI Fitness & Nutrition Coach. Ask me anything about workouts, diet, macros, or BMI!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setLoading(true);

    try {
      // Secure backend proxy call - no secret API keys exposed in the browser
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const aiMessage = { role: 'model', text: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: data.message || 'Sorry, I am temporarily unable to answer. Please try again in a moment.' }
        ]);
      }
    } catch (error) {
      console.error("AI Coach Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Sorry, unable to connect to the AI Fitness service right now. Please check your network connection.' }
      ]);
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
          placeholder="Ask me anything about diet, BMI, or workouts..."
          className="chat-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default AITrainer;