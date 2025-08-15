import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import Events from './pages/Events'
import MovieDetails from './pages/MovieDetails'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Ticket from './pages/Ticket'
import Offers from './pages/Offers'
import MyTickets from './pages/MyTickets'
import Navbar from './components/ui/Navbar'
import HomeRouteWrapper from './pages/HomeRouteWrapper';
import { useEffect } from 'react';
import { useAuthStore } from './lib/storage';

export default function App() {
  // Global Zustand hydration from localStorage
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem('cinebook:user');
      if (stored) setUser(JSON.parse(stored));
    }
  }, [user, setUser]);
  return (
    <div className="min-h-screen bg-lightgrey text-black transition-all duration-150 ease-in-out will-change-transform">
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomeRouteWrapper />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seat/:showId" element={<SeatSelection />} />
        <Route path="/checkout/:showId" element={<Checkout />} />
        <Route path="/ticket/:bookingId" element={<Ticket />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
