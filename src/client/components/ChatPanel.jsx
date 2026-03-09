import React, { useState, useEffect, useRef } from 'react';
import { faq } from './faq';

const ChatPanel = ({ onClose, isOpen }) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // scroll to bottom whenever messages or typing state changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);

  const sendUserMessage = (text) => {
  setMessages((old) => [
    ...old,
    {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ]);
};

  const sendBotMessage = (text) => {
  setMessages((old) => [
    ...old,
    {
      sender: 'bot',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ]);
};

 // 👇 PUT THIS FIRST
const replyWithTyping = (answer) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  setTyping(true);

  timeoutRef.current = setTimeout(() => {
    setTyping(false);
    sendBotMessage(answer);
  }, 500);
};

// 👇 THEN THIS
const handleQuestionClick = (q, a) => {
  sendUserMessage(q);
  replyWithTyping(a);
};

// 👇 THEN THIS
const handleSubmit = (e) => {
  e.preventDefault();
  const trimmed = input.trim();
if (!trimmed || trimmed.length < 2) return;
  sendUserMessage(trimmed);
  setInput('');

  const found = faq.find(f => {
  const words = trimmed.toLowerCase().split(" ");
  const question = f.question.toLowerCase();

  return words
    .filter(word => word.length > 3)
    .some(word => question.includes(word));
});

replyWithTyping(
  found
    ? found.answer
    : "I'm not sure about that. Try asking in a different way."
);
};

  return (
<div className="chat-panel" style={{ display: isOpen ? 'flex' : 'none' }}>
    <div className="chat-header">
      <span>Assistant</span>
      <button className="close-btn" onClick={onClose}>✖</button>
    </div>

    <div ref={containerRef} className="chat-body">
      <div className="faq-suggestions">
  <div className="faq-title">Frequently Asked Questions</div>

  {faq.map((f, idx) => (
    <button
      key={idx}
      className="faq-card"
      onClick={() => handleQuestionClick(f.question, f.answer)}
    >
      {f.question}
    </button>
  ))}
</div>
       

      {messages.map((m, idx) => (
  <div key={idx} className={`message-row ${m.sender}`}>
    <div className="message-bubble">
      <div>{m.text}</div>
      <div className="message-time">{m.time}</div>
    </div>
  </div>
))}

      {typing && (
  <div className="message-row bot">
    <div className="message-bubble typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}

    </div>

    <form className="chat-input" onSubmit={handleSubmit}>
  <input
  value={input}
  onChange={(e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const matched = faq
      .filter(f =>
        f.question.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(matched);
    setActiveIndex(0);
  }}
  onKeyDown={(e) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[activeIndex].question);
      setSuggestions([]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : prev
      );
    }
  }}
  placeholder="Type a message..."
/>
  {suggestions.length > 0 && (
    <div className="suggestion-box">
      {suggestions.map((s, index) => (
        <div
          key={index}
          className={`suggestion-item ${
            index === activeIndex ? "active" : ""
          }`}
          onClick={() => {
            setInput(s.question);
            setSuggestions([]);
          }}
        >
          {s.question}
        </div>
      ))}
    </div>
  )}

  <button type="submit">Send</button>
</form>

  </div>
);
};

export default ChatPanel;
