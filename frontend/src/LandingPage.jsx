import React from "react";
import Chatbot from "./Chat";
import doctorImg_home from "./assets/dr.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center shadow-md bg-white fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-green-800">MediCare+</h1>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#about" className="hover:text-green-800 transition">About</a>
          <a href="#services" className="hover:text-green-800 transition">Services</a>
          <a href="#testimonials" className="hover:text-green-800 transition">Testimonials</a>
          <a href="#contact" className="hover:text-green-800 transition">Contact</a>
        </nav>
        <button className="ml-6 px-5 py-2 bg-green-800 text-white rounded-full shadow hover:bg-green-700 transition">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-32 md:py-30">
        <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
  Meet Your     <span className="text-green-800">Virtual Health Companion</span> 🩺
            </h2>

          <p className="text-lg text-gray-600">
            Talk to our AI-powered medical assistant for quick guidance,
            symptom checks, and health tips – Our goal is to make healthcare accessible and stress-free
            for everyone,<br></br> anytime, anywhere.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-green-800 text-white rounded-full shadow-lg hover:bg-green-700 transition">
              Consult Now
            </button>
            <button className="px-6 py-3 border-2 border-green-800 text-green-800 rounded-full hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src={doctorImg_home}
            alt="Doctor"
            className="w-[320px] md:w-[420px] drop-shadow-xl"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-10 md:px-20 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold text-gray-800">About MediCare+</h3>
          <p className="text-gray-600 text-lg">
            MediCare+ is your virtual health companion. We combine advanced AI
            with trusted medical resources to provide quick and reliable health
            guidance. Our goal is to make healthcare accessible and stress-free
            for everyone, anytime and anywhere.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-10 md:px-20 py-20 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Services
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-md text-center">
            <h4 className="text-xl font-semibold text-green-800">24/7 Support</h4>
            <p className="text-gray-600 mt-3">
              Get medical guidance anytime without waiting for appointments.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-md text-center">
            <h4 className="text-xl font-semibold text-green-800">Symptom Checker</h4>
            <p className="text-gray-600 mt-3">
              AI-powered bot to analyze symptoms and suggest possible causes.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-md text-center">
            <h4 className="text-xl font-semibold text-green-800">Secure & Private</h4>
            <p className="text-gray-600 mt-3">
              Your health conversations remain confidential and encrypted.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-10 md:px-20 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">
              “MediCare+ helped me quickly understand my symptoms and guided me
              towards the right treatment. It’s like having a doctor available
              24/7.”
            </p>
            <h5 className="mt-4 font-semibold text-green-700">— Asha K.</h5>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">
              “I love how easy it is to use. The chatbot gave me helpful
              lifestyle tips and answered my health questions instantly.”
            </p>
            <h5 className="mt-4 font-semibold text-green-700">— Rohan P.</h5>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-10 md:px-20 py-20 bg-green-800 text-white text-center">
        <h3 className="text-3xl font-bold mb-6">
          Ready to take control of your health?
        </h3>
        <p className="text-lg mb-8">
          Start chatting with our AI medical assistant and get answers in
          seconds.
        </p>
        <button className="px-8 py-3 bg-white text-green-800 font-semibold rounded-full shadow hover:bg-green-100 transition">
          Start Chat Now
        </button>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-300 py-10 px-10 md:px-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-white">MediCare+</h4>
            <p className="mt-3 text-gray-400 text-sm">
              Your trusted AI-powered health assistant. Making healthcare simple
              and accessible for everyone.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">Contact</h4>
            <p className="mt-3 text-sm text-gray-400">
              📍 Pune, India <br />
              📧 support@medicare.com <br />
              ☎️ +91 98765 43210
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} MediCare+. All Rights Reserved.
        </div>
      </footer>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
