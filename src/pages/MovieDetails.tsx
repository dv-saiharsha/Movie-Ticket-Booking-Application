
// MovieDetails page: Shows details for a selected movie and available showtimes
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { movies } from '../data/movies'
import { shows, theatres } from '../data/theaters'
import TheatreCard from '../components/TheatreCard'

export default function MovieDetails() {
  // Get movie ID from URL
  const { id } = useParams()
  // State for movie details
  const [movie, setMovie] = useState<any>(null)
  // State for shows for this movie and date
  const [activeShows, setActiveShows] = useState<any[]>([])
  // Loading state for showtimes
  const [loading, setLoading] = useState(true)
  // State for selected date (default: today)
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    d.setHours(0,0,0,0)
    return d.toISOString().slice(0,10)
  })
  // Generate next 5 days for calendar
  const today = new Date()
  const next5Days = Array.from({length:5}, (_,i) => {
    const d = new Date()
    d.setDate(today.getDate() + i)
    d.setHours(0,0,0,0)
    return d
  })

  // Simulate loading (network or computation)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // Find movie by ID
      const m = movies.find(m => m.id === id)
      setMovie(m)
      // Only shows for this movie and selected date
      const filteredShows = shows.filter(s => {
        if (s.movieId !== id) return false
        const showDate = new Date(s.time)
        showDate.setHours(0,0,0,0)
        return showDate.toISOString().slice(0,10) === selectedDate
      })
      setActiveShows(filteredShows)
      setLoading(false)
    }, 600) // Simulate 600ms network delay
  }, [id, selectedDate])


  // Render movie details, calendar, and showtimes
  return (
    <div className="min-h-screen flex flex-col justify-between bg-figma-bg text-white pt-24 selection:bg-figma-accent selection:text-white">
      <div className="container py-6 space-y-8 flex-1">
        {movie && (
          <div className="relative rounded-3xl overflow-hidden bg-figma-card border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            {/* Background Blur Image */}
            <div className="absolute inset-0 z-0">
                <img src={movie.poster} className="w-full h-full object-cover blur-2xl opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-figma-card via-figma-card/80 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8">
                {/* Movie poster */}
                <div className="shrink-0">
                    <img src={movie.poster} className="w-64 h-96 object-cover rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/20" />
                </div>
                
                {/* Info */}
                <div className="flex flex-col justify-end space-y-4">
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2 drop-shadow-md">{movie.title}</h1>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">{movie.rating}</span>
                        <span>•</span>
                        <span>{movie.languages.join(', ')}</span>
                        <span>•</span>
                        <span>{movie.durationMins} mins</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map((g: string) => (
                            <span key={g} className="px-3 py-1 rounded-full bg-figma-accent/10 text-figma-accent border border-figma-accent/30 text-xs font-bold uppercase tracking-wider">{g}</span>
                        ))}
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{movie.synopsis}</p>
                    
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Release Date</span>
                            <span className="text-white font-medium">{new Date(movie.releaseDate).toLocaleDateString()}</span>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">User Rating</span>
                            <span className="text-figma-accent font-bold text-lg">{movie.userRating} ★</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Date Selector */}
        <div className="bg-figma-card/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Select Date</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-figma-accent/20 scrollbar-track-transparent">
            {next5Days.map((d, i) => {
                const iso = d.toISOString().slice(0,10)
                const isSelected = iso === selectedDate
                return (
                <button
                    key={iso}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-24 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                         isSelected 
                         ? 'bg-figma-accent text-white border-figma-accent shadow-[0_0_15px_rgba(247,37,133,0.4)]' 
                         : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white'
                    }`}
                    onClick={() => setSelectedDate(iso)}
                >
                    <span className="text-xs font-medium uppercase tracking-wider mb-1 opacity-80">{d.toLocaleString('default', { month: 'short' })}</span>
                    <span className={`text-3xl font-black ${isSelected ? 'scale-110' : ''} transition-transform`}>{d.getDate()}</span>
                    <span className="text-xs mt-1 opacity-60">{d.toLocaleString('default', { weekday: 'short' })}</span>
                    
                    {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>}
                </button>
                )
            })}
            </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-figma-accent rounded-full inline-block"></span>
                  Select Theatre
              </h2>
          </div>
          
          {/* List all theatres with shows for this movie and date */}
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-figma-accent"></span>
            </div>
          ) : (
            <div className="space-y-4">
              {theatres.map(t => {
                const tShows = activeShows.filter(s => s.theatreId === t.id)
                if (!tShows.length) return null
                return <TheatreCard key={t.id} theatre={t} shows={tShows} />
              })}
              {/* Show message if no shows available */}
              {activeShows.length === 0 && !loading && (
                <div className="text-gray-400 text-center py-20 text-lg border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                    No shows available for the selected date.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="w-full text-center py-8 text-xs text-gray-500 border-t border-white/5 bg-black/20 mt-12 uppercase tracking-wider font-medium">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}

