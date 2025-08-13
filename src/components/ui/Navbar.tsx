import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../lib/storage'
import { MapPin, Ticket, Percent, LogOut, Film, User, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadIndiaLocations, LocationNode } from '../../lib/indiaLocations'

export default function Navbar() {
  const { user, setUser } = useAuthStore()
  const nav = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [allPlaces, setAllPlaces] = useState<string[]>([])
  const [selectedPlace, setSelectedPlace] = useState(user?.location?.village || '')

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Load all places for location select
  useEffect(() => {
    loadIndiaLocations().then((locs: LocationNode[]) => {
      const places: string[] = []
      locs.forEach((state) => {
        state.children?.forEach((district) => {
          district.children?.forEach((village) => {
            places.push(village.name)
          })
        })
      })
      setAllPlaces(places.sort((a, b) => a.localeCompare(b)))
    })
  }, [])

  const handlePlaceChange = (place: string) => {
    setSelectedPlace(place)
    if (user) {
      setUser({
        ...user,
        location: { state: '', district: '', village: place }
      })
    }
  }

  const firstName = user?.name?.split(' ')[0] || 'Profile'

  return (
    <header className="sticky top-0 z-40 bg-matte border-b border-matte shadow-sm">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/home" className="font-semibold text-lg flex items-center gap-2 text-yellow">
            CineBook
            <Film className="h-7 w-7 text-yellow" />
          </Link>
          <div className="ml-4 flex items-center gap-1 text-sm text-silver">
            <MapPin className="h-4 w-4 text-yellow" />
            <select
              className="border border-matte rounded px-1 bg-matte text-silver min-w-[220px] focus:ring-2 focus:ring-yellow"
              value={selectedPlace}
              onChange={e => handlePlaceChange(e.target.value)}
            >
              <option value="">Select Location</option>
              {allPlaces.map(place => (
                <option key={place} value={place}>{place}</option>
              ))}
            </select>
          </div>
          {/* Theme toggle icon button */}
          <button
            className="ml-4 p-2 rounded-full border border-yellow bg-matte text-yellow hover:bg-yellow hover:text-matte transition-all duration-150 ease-in-out will-change-transform"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link to="/my-tickets" className="hover:text-yellow flex items-center gap-1"><Ticket className="h-4 w-4 text-yellow" />My Tickets</Link>
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow text-matte font-semibold hover:bg-matte hover:text-yellow transition border-2 border-yellow"
                  onClick={() => setProfileOpen(v => !v)}
                >
                  <User className="h-5 w-5 text-matte group-hover:text-yellow transition" />
                  <span className="transition">{firstName}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-matte border border-matte rounded shadow-lg z-50">
                    <Link
                      to="/offers"
                      className="block px-4 py-2 text-silver hover:bg-yellow/10 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Percent className="inline h-4 w-4 mr-1 text-yellow" /> Offers
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-silver hover:bg-yellow/10 flex items-center gap-2 transition"
                      onClick={() => { setUser(null); nav('/home') }}
                    >
                      <LogOut className="h-4 w-4 text-yellow" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-4 py-2 rounded-2xl border border-yellow text-yellow font-semibold hover:bg-yellow hover:text-matte transition-all duration-150 ease-in-out">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 rounded-2xl border border-yellow text-yellow font-semibold hover:bg-yellow hover:text-matte transition-all duration-150 ease-in-out">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
