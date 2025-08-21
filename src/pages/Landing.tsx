import React, { useRef, useEffect } from 'react';
import Button from '../components/ui/Button';


export default function Landing() {
  const eventsRef = useRef<HTMLDivElement>(null);

  // Listen for scroll intent from Navbar
  useEffect(() => {
    if (localStorage.getItem("cinebook:scrollToEvents") === "1") {
      localStorage.removeItem("cinebook:scrollToEvents");
      setTimeout(() => {
        eventsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200); // Wait for page render
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[60vh] text-center bg-gradient-to-br from-red-400 to-yellow-200 relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4">Welcome to CineBook</h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8">Book movie tickets, events, and more!</p>
        <Button className="px-8 py-3 text-lg font-bold bg-yellow-400 text-red-900 rounded-xl shadow-lg hover:bg-yellow-300 transition" onClick={() => eventsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          Explore Events
        </Button>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl">↓</span>
      </section>

      {/* Events Section */}
      <section ref={eventsRef} className="py-16 px-4 max-w-4xl mx-auto" id="events">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">Upcoming Events</h2>
        {/* You can map your events here or import an EventsList component */}
        <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-700">
          <p className="text-lg">Events will be listed here.</p>
        </div>
      </section>
    </div>
  );
}
