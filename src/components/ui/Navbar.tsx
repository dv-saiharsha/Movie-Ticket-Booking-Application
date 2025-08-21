import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore, signOut } from '../../lib/storage'
import { MapPin, Ticket, Percent, LogOut, Film, User, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadIndiaLocations, LocationNode } from '../../lib/indiaLocations'
export default function Navbar() {
  const { user, setUser } = useAuthStore()
  const nav = useNavigate()
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false)
  const [allPlaces, setAllPlaces] = useState<string[]>([])
  const [selectedPlace, setSelectedPlace] = useState(user?.location?.village || '')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

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
    <header className="sticky top-0 z-40 border-b border-darkred shadow-sm bg-lightgrey">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/home" className="flex flex-col items-start justify-center text-darkred">
            <div className="flex items-center gap-2">
              <Film className="h-7 w-7 text-darkred" />
              <span className="font-semibold text-lg">CineSphere</span>
            </div>
            <span className="text-xs font-medium mt-0.5">A complete world of cinema.</span>
          </Link>
          {/* Theme toggle icon button */}
          <button
            className="ml-4 p-2 rounded-full border border-darkred text-darkred hover:bg-darkred/80 hover:text-lightgrey transition-all duration-150 ease-in-out will-change-transform"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link to="/my-tickets" className="hover:text-darkred flex items-center gap-1"><Ticket className="h-4 w-4 text-darkred" />My Tickets</Link>
              {/* Location selector on right */}
              <div className="relative ml-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-darkred bg-white text-black font-semibold hover:bg-darkred/10 transition"
                  onClick={() => setShowLocationDropdown(v => !v)}
                  aria-label="Select Location"
                >
                  <MapPin className="h-4 w-4 text-darkred" />
                    {/* Place icon removed: placeIconMap not found */}
                    <span className="font-medium text-black/80">{selectedPlace || 'Select Location'}</span>
                </button>
                {showLocationDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-darkred rounded-xl shadow-lg z-50">
                    <select
                      className="w-full px-4 py-2 rounded-xl border-0 text-black bg-white focus:ring-2 focus:ring-darkred outline-none"
                      value={selectedPlace}
                      onChange={e => { handlePlaceChange(e.target.value); setShowLocationDropdown(false); }}
                      size={8}
                    >
                      <option value="">Select Location</option>
                      {allPlaces.map(place => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-black font-semibold hover:text-darkred transition border-2 border-darkred"
                  onClick={() => setProfileOpen(v => !v)}
                >
                  <User className="h-5 w-5 text-black group-hover:text-darkred transition" />
                  <span className="transition">{firstName}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 border border-darkred rounded shadow-lg z-50 bg-lightgrey">
                    <Link
                      to="/offers"
                      className="block px-4 py-2 text-secondary transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Percent className="inline h-4 w-4 mr-1 text-accent" /> Offers
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-silver flex items-center gap-2 transition"
                      onClick={() => { signOut(); nav('/home') }}
                    >
                      <LogOut className="h-4 w-4 text-yellow" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="relative ml-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-darkred bg-white text-black font-semibold hover:bg-darkred/10 transition"
                  onClick={() => setShowLocationDropdown(v => !v)}
                  aria-label="Select Location"
                >
                  <MapPin className="h-4 w-4 text-darkred" />
                  <span className="font-medium text-black/80">{selectedPlace || 'Select Location'}</span>
                </button>
                {showLocationDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-darkred rounded-xl shadow-lg z-50">
                    <select
                      className="w-full px-4 py-2 rounded-xl border-0 text-black bg-white focus:ring-2 focus:ring-darkred outline-none"
                      value={selectedPlace}
                      onChange={e => { handlePlaceChange(e.target.value); setShowLocationDropdown(false); }}
                      size={8}
                    >
                      <option value="">Select Location</option>
                      {allPlaces.map(place => (
                        <option key={place} value={place}>{place}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {/* Hide Sign In/Sign Up on / and /home */}
              {!(location.pathname === '/' || location.pathname === '/home') && (
                <>
                  <Link to="/signin" className="px-4 py-2 rounded-2xl border border-yellow text-yellow font-semibold transition-all duration-150 ease-in-out">Sign In</Link>
                  <Link to="/signup" className="px-4 py-2 rounded-2xl border border-yellow text-yellow font-semibold transition-all duration-150 ease-in-out">Sign Up</Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
