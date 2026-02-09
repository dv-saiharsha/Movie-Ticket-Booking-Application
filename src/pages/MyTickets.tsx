
import { Link } from 'react-router-dom'
import { shows, theatres } from '../data/theaters'
import { movies } from '../data/movies'
import { Ticket, Calendar, MapPin } from 'lucide-react'

export default function MyTickets() {
  const bookings = JSON.parse(localStorage.getItem('cinebook:bookings') || '[]').reverse() // Newest first

  if (!bookings.length) {
    return (
        <div className="min-h-screen bg-figma-bg text-white flex flex-col items-center justify-center pt-20">
            <Ticket size={48} className="text-gray-500 mb-4" />
            <div className="text-xl font-bold text-gray-400 mb-2">No tickets yet</div>
            <Link to="/" className="text-figma-accent hover:underline">Book your first movie</Link>
            
            <footer className="absolute bottom-4 w-full text-center text-xs text-gray-500">
                Developed by Venkata Sai Harshith Danda
            </footer>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-figma-bg text-white pt-24 pb-12 px-4 selection:bg-figma-accent selection:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-figma-accent pl-4 flex items-center gap-3">
            My Tickets
            <span className="text-sm font-normal text-gray-500 bg-white/5 px-2 py-1 rounded-full">{bookings.length}</span>
        </h1>
        
        {bookings.map((b:any) => {
          const show = shows.find(s => s.id === b.showId)
          if (!show) return null
          const theatre = theatres.find(t => t.id === b.theatreId)
          if (!theatre) return null
          const movie = movies.find(m => m.id === show.movieId)
          if (!movie) return null
          
          return (
            <Link key={b.id} to={`/ticket/${b.id}`} className="block group">
                <div className="bg-figma-card rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(247,37,133,0.1)] group-hover:shadow-[0_0_30px_rgba(247,37,133,0.3)] group-hover:border-figma-accent/30 transition-all duration-300 relative">
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-figma-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex gap-4 md:gap-6 p-4">
                        {/* Poster Thumb */}
                        <div className="w-20 md:w-24 h-28 md:h-32 bg-gray-900 rounded-lg overflow-hidden shrink-0 shadow-lg border border-white/5">
                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-figma-accent transition-colors">{movie.title}</h3>
                            <div className="space-y-1.5 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-500" />
                                    <span className="truncate">{theatre.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span>{new Date(show.time).toLocaleString([], {weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-xs text-gray-300">
                                        {b.seats.length} Seats: <span className="text-white font-mono font-bold">{b.seats.join(', ')}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex flex-col justify-center items-center px-2">
                             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-figma-accent group-hover:text-white transition-all duration-300 border border-white/5">
                                <Ticket size={16} />
                             </div>
                        </div>
                    </div>
                </div>
            </Link>
          )
        })}
      </div>
      
      <footer className="mt-12 w-full text-center text-xs text-gray-500">
        Developed by Venkata Sai Harshith Danda
      </footer>
    </div>
  )
}
