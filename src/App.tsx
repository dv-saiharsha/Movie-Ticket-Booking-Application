import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import LandingAuth from './pages/Auth/LandingAuth'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Ticket from './pages/Ticket'
import Offers from './pages/Offers'
import MyTickets from './pages/MyTickets'
import Navbar from './components/ui/Navbar'
import { useAuthStore } from './lib/storage'
// LoaderWrapper and loading context removed for direct rendering
export default function App() {
  const { user } = useAuthStore();
  return (
    <div className="min-h-screen bg-slate text-silver transition-all duration-150 ease-in-out will-change-transform">
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seat/:showId" element={<SeatSelection />} />
        <Route path="/checkout/:showId" element={<Checkout />} />
        <Route path="/ticket/:bookingId" element={<Ticket />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
