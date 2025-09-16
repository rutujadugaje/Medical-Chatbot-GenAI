import React, { useState } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import doctorImg from "./assets/doctor.png";

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
      const res = await fetch("http://3.109.144.172:8080/get", {
        method: "POST",
        body: new URLSearchParams({ msg: input }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const botMsg = await res.text();
      setMessages((prev) => [...prev, { sender: "bot", text: botMsg }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button (shown when closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

          {/* Floating text bubble */}
          <div className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-md border border-gray-200 animate-bounce">
            Your health buddy is here!💚
          </div>

          {/* Floating Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-green-600 rounded-full shadow-md flex items-center justify-center text-white text-2xl transition duration-200 hover:scale-110 animate-bounce"
            aria-label="Open chat"
          >
            💬
          </button>
        </div>
      )}

      {/* Dim overlay (appears when chat is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 opacity-50 z-40 backdrop-blur-2xl" 
          onClick={() => setIsOpen(false)} // click outside closes chat
        />
      )}

      {/* Chat Window container */}
      <div
        // keep it fixed bottom-right and above overlay (z-50)
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 overflow-hidden   ${
          isOpen ? "w-[400px] h-[520px] shadow-xl rounded-2xl" : "w-0 h-0"
        }`}
        // prevent clicks inside the chat from closing it (stop overlay click propagation)
        onClick={(e) => e.stopPropagation()}
      >
        {isOpen && (
          <div className="w-full h-full bg-white rounded-2xl shadow-xl ring-1 ring-green-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 flex items-center justify-between font-semibold text-lg">
              <div className="flex items-center gap-2">
                <img
                  src={doctorImg}
                  alt="Doctor"
                  className="w-9 h-9 rounded-full bg-white ring-2 ring-white shadow-md"
                />
                <span>Medical Chatbot</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat" 
                className="p-1 rounded-full hover:bg-green-700/80 transition"
              >
                <IoClose size={22} className="text-white" />
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
                      className="w-8 h-8 rounded-full bg-green-100 p-1 shadow"
                    />
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[70%] text-sm font-medium shadow-sm transition ${
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

            {/* Chat Input (no blur) */}
            <form onSubmit={sendMessage} className="flex items-center border-t border-gray-200 p-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
              />
              <button
                type="submit"
                className="ml-2 bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition"
                aria-label="Send message"
              >
                <IoSend size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
