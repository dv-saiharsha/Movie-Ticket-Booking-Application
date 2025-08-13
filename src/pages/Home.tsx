
// Home page: Shows hero section and lists now showing/upcoming movies
import { useState, useRef } from 'react'
import { useAuthStore } from '../lib/storage'
import { movies } from '../data/movies'
import MovieCard from '../components/MovieCard'

export default function Home() {
  // State for tab (not used in this version, but could be for toggling now/upcoming)
  const [tab, setTab] = useState<'now'|'upcoming'>('now')
  // Filter movies for now showing and upcoming
  const nowShowing = movies.filter(m => !m.upcoming)
  const upcoming = movies.filter(m => m.upcoming)
  // Get current user (if logged in)
  const { user } = useAuthStore()
  // Ref for scrolling to now showing section
  const nowShowingRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen w-full bg-slate flex flex-col justify-between">
      {/* Hero Section: Only show if logged in */}
      {user && (
        <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 flex-1">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-white mb-6">The Art<br />of Booking</h1>
            <p className="mb-8 text-lg text-silver">Book your next movie experience with ease. Discover, select, and reserve your seat in seconds. Enjoy the show!</p>
            <div className="flex gap-4 mb-10">
              {/* Scroll to now showing section */}
              <button
                className="px-8 py-3 rounded-lg bg-yellow text-slate font-bold text-lg shadow hover:bg-yellow/80 transition-all duration-150 ease-in-out"
                onClick={() => {
                  nowShowingRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book Now
              </button>
              {/* How it works button (no action) */}
              <button className="px-8 py-3 rounded-lg border-2 border-silver text-silver font-bold text-lg bg-matte hover:bg-matte/80 transition-all duration-150 ease-in-out flex items-center gap-2">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21 5,3" /></svg>
                How it works
              </button>
            </div>
          </div>
          {/* Right: Illustration image */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/projector tape.jpeg" alt="Projector Tape" className="w-full max-w-lg h-auto rounded-xl shadow-xl bg-matte object-cover object-center" style={{aspectRatio:'4/3'}} />
          </div>
        </main>
      )}
      {/* Movie Sections */}
      <section ref={nowShowingRef} className="max-w-7xl mx-auto w-full px-6 pb-16">
        <h2 className="text-2xl font-bold text-yellow mb-4">Now Showing</h2>
        {/* List now showing movies */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {/* Render now showing movies */}
          {nowShowing.map(m => (
            <MovieCard key={m.id} movie={{
              id: m.id,
              title: m.title,
              poster: m.poster,
              genre: m.genres && m.genres.length > 0 ? m.genres[0] : '',
              rating: m.rating,
              upcoming: m.upcoming,
              userRating: m.userRating
            }} />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-yellow mt-12 mb-4">Upcoming</h2>
        {/* List upcoming movies */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {upcoming.map(m => (
            <MovieCard key={m.id} movie={{
              id: m.id,
              title: m.title,
              poster: m.poster,
              genre: m.genres && m.genres.length > 0 ? m.genres[0] : '',
              rating: m.rating,
              upcoming: true,
              userRating: m.userRating
            }} />
          ))}
        </div>
      </section>
      {/* Social icons */}
      <footer className="flex flex-col items-center gap-2 pb-8">
        <div className="flex justify-center gap-6">
          <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-medium"></i></a>
          <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="text-xs text-silver mt-2">Developed by Venkata Sai Harshith Danda</div>
      </footer>
    </div>
  )
}
