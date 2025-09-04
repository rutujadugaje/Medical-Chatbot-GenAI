import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I’m your medical assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8080/get", {
        method: "POST",
        body: new URLSearchParams({ msg: input }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const botMsg = await res.text();
      setMessages((prev) => [...prev, { sender: "bot", text: botMsg }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to server." }]);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[400px] max-w-[90%] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 text-center font-semibold text-lg">
          🩺 Medical Chatbot
        </div>

        {/* Chat Box */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] text-sm font-semibold ${
                msg.sender === "bot"
                  ? "bg-green-100 self-start"
                  : "bg-blue-100 self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={sendMessage}
          className="flex border-t border-gray-200"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 hover:bg-green-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
