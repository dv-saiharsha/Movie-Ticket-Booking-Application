
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
    }, 600) // Simulate 600ms network delay
  }, [id, selectedDate])


  // Render movie details, calendar, and showtimes
  return (
  <div className="min-h-screen flex flex-col justify-between bg-lightgrey">
  <div className="container py-6 space-y-6 text-black flex-1">
      {movie && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Movie poster and info */}
          <img src={movie.poster} className="w-56 h-80 object-cover rounded-2xl border-2 border-lightteal" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-darkred">{movie.title}</h1>
            <div className="text-sm text-black">{movie.languages.join(', ')} • {movie.genres.join(', ')} • {movie.durationMins} mins</div>
            <p className="text-black/70">{movie.synopsis}</p>
          </div>
        </div>
      )}
      {/* Sliding calendar for next 5 days */}
      <div className="flex gap-2 overflow-x-auto py-2 mb-2">
        {next5Days.map((d, i) => {
          const iso = d.toISOString().slice(0,10)
          const isSelected = iso === selectedDate
          return (
            <button
              key={iso}
              className={`flex flex-col items-center px-4 py-2 rounded-2xl border-2 transition-all duration-150 ease-in-out min-w-[70px] ${isSelected ? 'text-darkred border-darkred font-bold' : 'text-black border-lightgrey'}`}
              onClick={() => setSelectedDate(iso)}
            >
              <span className="text-lg">{d.toLocaleString('default', { month: 'short' })}</span>
              <span className="text-2xl font-bold">{d.getDate()}</span>
              <span className="text-xs">{d.toLocaleString('default', { weekday: 'short' })}</span>
            </button>
          )
        })}
      </div>
      <div className="space-y-3">
  <h2 className="text-xl font-semibold text-darkred">Select Theatre & Showtime</h2>
        {/* List all theatres with shows for this movie and date */}
        {theatres.map(t => {
          const tShows = activeShows.filter(s => s.theatreId === t.id)
          if (!tShows.length) return null
          return <TheatreCard key={t.id} theatre={t} shows={tShows} />
        })}
        {/* Show message if no shows available */}
        {activeShows.length === 0 && (
          <div className="text-black text-center py-8 text-lg">No shows for this movie on the selected date.</div>
        )}
      </div>
      </div>
  <footer className="w-full text-center py-4 text-xs text-black bg-transparent">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
