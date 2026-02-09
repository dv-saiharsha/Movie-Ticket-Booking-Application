
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { shows, theatres } from '../data/theaters'
import { movies } from '../data/movies'
import Button from '../components/ui/Button'
import { Home } from 'lucide-react'

export default function Ticket() {
  const { bookingId } = useParams()
  const nav = useNavigate()
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('cinebook:bookings') || '[]')
    const b = list.find((x: any) => x.id === bookingId)
    setBooking(b)
  }, [bookingId])

  if (!booking) return (
    <div className="min-h-screen bg-figma-bg text-white flex flex-col items-center justify-center p-4">
      <div className="text-figma-accent text-xl font-bold mb-4">Booking not found</div>
      <Button onClick={() => nav('/')} variant="outline" className="border-figma-accent text-figma-accent hover:bg-figma-accent/10">Go Home</Button>
    </div>
  )

  const show = shows.find(s => s.id === booking.showId)
  const theatre = show ? theatres.find(t => t.id === booking.theatreId) : null
  const movie = show ? movies.find(m => m.id === show.movieId) : null

  if (!show || !theatre || !movie) return null

  return (
    <div className="min-h-screen bg-figma-bg text-white flex flex-col items-center justify-center p-4 pt-20 pb-10 font-sans selection:bg-figma-accent selection:text-white">
      
      {/* Ticket Container */}
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(247,37,133,0.3)] border border-white/10 relative">
        
        {/* Top Half: Movie Poster/Visual */}
        <div className="relative h-48 bg-gray-900 overflow-hidden group">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{movie.title}</h2>
                <div className="flex gap-2 text-xs mt-1 text-gray-300">
                     <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20 backdrop-blur-sm">{show.speciality || 'Standard'}</span>
                     <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20 backdrop-blur-sm">{movie.languages[0]}</span>
                </div>
            </div>
        </div>

        {/* Middle: Details */}
        <div className="p-6 pb-8 space-y-6 relative bg-white text-gray-900">
            {/* Perforation circles - mimicking the background color to look like holes */}
            <div className="absolute -left-3 top-[-12px] w-6 h-6 bg-figma-bg rounded-full shadow-inner"></div>
            <div className="absolute -right-3 top-[-12px] w-6 h-6 bg-figma-bg rounded-full shadow-inner"></div>
            <div className="absolute left-3 right-3 top-0 border-t-2 border-dashed border-gray-300"></div>

            <div className="grid grid-cols-2 gap-y-6 text-sm">
                <div>
                   <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Date</label>
                   <div className="text-gray-900 font-bold">{new Date(show.time).toLocaleDateString([], {weekday:'short', day:'numeric', month:'short'})}</div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Time</label>
                   <div className="text-gray-900 font-bold">{new Date(show.time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Theatre</label>
                   <div className="text-gray-900 font-medium truncate pr-2">{theatre.name}</div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Location</label>
                   <div className="text-gray-900 font-medium truncate">{theatre.location.district || theatre.location.state}</div>
                </div>
                
                <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Seats ({booking.seats.length})</label>
                        <div className="text-figma-accent font-bold text-lg tracking-widest">{booking.seats.join(', ')}</div>
                    </div>
                    <div className="text-right">
                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Price</label>
                        <div className="text-gray-900 font-bold text-lg">₹{booking.amount}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom: Check-in QR */}
        <div className="bg-gray-50 p-6 pb-8 flex flex-col items-center justify-center relative border-t border-dashed border-gray-200">
            
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <QRCodeSVG
                    value={JSON.stringify({ id: booking.id, seats: booking.seats })}
                    size={140}
                    fgColor="#000000"
                    bgColor="#ffffff"
                    level="H"
                />
            </div>
            <div className="mt-4 text-center">
                <div className="text-xs text-gray-400 font-mono mb-1">BOOKING ID</div>
                <div className="text-gray-900 font-bold font-mono tracking-widest text-lg">{booking.id.slice(0, 8).toUpperCase()}</div>
            </div>
            
            <div className="mt-6 flex gap-3 w-full">
                <Button onClick={() => nav('/')} className="w-full bg-figma-accent text-white hover:bg-pink-600 h-12 flex items-center justify-center gap-2 rounded-xl shadow-[0_0_15px_rgba(247,37,133,0.4)] transition-all">
                    <Home size={18} /> Done
                </Button>
            </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
          Developed by Venkata Sai Harshith Danda
      </footer>
    </div>
  )
}

