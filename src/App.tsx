import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Ticket from './pages/Ticket'
import Offers from './pages/Offers'
import MyTickets from './pages/MyTickets'
import Navbar from './components/ui/Navbar'
import { useAuth } from './lib/storage'
import { createContext, useContext, useState, useEffect } from 'react'
import LoadingSpinner from './components/ui/LoadingSpinner'

const LoadingContext = createContext<{loading: boolean, setLoading: (v: boolean) => void}>({loading: false, setLoading: ()=>{}})
export function useLoading() { return useContext(LoadingContext) }

function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 2000) // Simulate 2s load for better visibility
    return () => clearTimeout(timeout)
  }, [location])
  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      {loading ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"><LoadingSpinner /></div> : children}
    </LoadingContext.Provider>
  )
}
export default function App() {
  const { user } = useAuth()
  return (
    <LoaderWrapper>
      <div className="min-h-screen bg-slate text-silver transition-colors duration-300">
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />} />
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
    </LoaderWrapper>
  )
}
