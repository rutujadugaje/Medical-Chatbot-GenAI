import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import doctorImg from "./assets/doctor.png"; // Your doctor image

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I’m your medical assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const botMsg = await res.text();
      setMessages((prev) => [...prev, { sender: "bot", text: botMsg }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to server." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-green-600 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transition-transform duration-300 hover:scale-110 animate-bounce"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "w-[400px] h-[500px]" : "w-0 h-0"
        }`}
      >
        {isOpen && (
          <div className="w-[400px] h-[500px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 flex items-center justify-between font-semibold text-lg shadow">
              <div className="flex items-center gap-2">
                <img
                  src={doctorImg}
                  alt="Doctor"
                  className="w-8 h-8 rounded-full bg-white"
                />
                <span>Medical Chatbot</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <IoClose size={22} className="text-white hover:text-gray-200" />
              </button>
            </div>

            {/* Chat Box */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <img
                      src={doctorImg}
                      alt="Doctor"
                      className="w-8 h-8 rounded-full bg-green-100"
                    />
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[70%] text-sm font-medium shadow-sm transition ${
                      msg.sender === "bot"
                        ? "bg-green-100 text-gray-800"
                        : "bg-blue-100 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="flex border-t border-gray-200">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
