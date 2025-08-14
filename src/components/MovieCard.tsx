
// MovieCard component: displays a single movie card with booking/reminder button
import Card from './ui/Card'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import { useState } from 'react'

// Props: expects a movie object with required fields
interface MovieCardProps {
  movie: {
    id: string
    title: string
    poster: string
    genre: string // single genre string (original version)
    rating: string
    upcoming?: boolean
    userRating?: number
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  // State for reminder button
  const [reminded, setReminded] = useState(false)
  return (
  <div className="rounded-xl shadow-md overflow-hidden w-48 min-w-[12rem] flex flex-col border border-matte">
      {/* Movie poster */}
  <img src={movie.poster} alt={movie.title} className="h-64 object-cover w-full" />
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Movie title */}
          <h3 className="font-bold text-lg mb-1 text-black">{movie.title}</h3>
          {/* Movie genre */}
          <p className="text-xs text-black/70 mb-2">{movie.genre}</p>
          {/* Movie rating and user rating */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-darkred">{movie.rating}</span>
            {typeof movie.userRating === 'number' && movie.userRating > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-lightgrey text-darkred font-bold text-xs shadow ml-1">
                <span className="mr-1 text-darkred text-base font-bold">★</span>{movie.userRating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
        {/* Only show booking button if not upcoming */}
        {!movie.upcoming ? (
          <Link to={`/movie/${movie.id}`} className="mt-3 w-full block">
            <Button className="w-full bg-darkred text-lightgrey font-bold text-base py-2 rounded-lg shadow hover:bg-red transition" variant="default">
              Book Now
            </Button>
          </Link>
        ) : (
          <Button
            className="mt-3 w-full bg-darkred text-lightgrey font-bold text-base py-2 rounded-lg shadow hover:bg-red transition"
            variant="default"
            onClick={() => setReminded(true)}
            disabled={reminded}
          >
            {reminded ? 'Notified' : 'Add to Reminder'}
          </Button>
        )}
      </div>
    </div>
  )
}
