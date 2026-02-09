import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore, signOut } from '../../lib/storage'
import { MapPin, ShoppingBag, Menu, User, Sun, Moon, LogOut, Percent, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadIndiaLocations, LocationNode } from '../../lib/indiaLocations'

export default function Navbar() {
  const { user, setUser } = useAuthStore()
  const nav = useNavigate()
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(user?.location?.village || '')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
   const [allPlaces, setAllPlaces] = useState<string[]>([])
   const [profileOpen, setProfileOpen] = useState(false)
  
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


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on Landing page
  if (location.pathname === '/' && !user) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-figma-bg/95 backdrop-blur-md py-2 shadow-lg border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 h-12 flex items-center justify-between">
        
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
             <Link to="/home" className="hover:text-figma-accent transition-colors">Home</Link>
             <Link to="/events" className="hover:text-figma-accent transition-colors">Events</Link>
             <Link to="/offers" className="hover:text-figma-accent transition-colors">Offers</Link>
             <div className="relative">
                 <button onClick={() => setShowLocationDropdown(!showLocationDropdown)} className="flex items-center gap-1 hover:text-figma-accent transition-colors text-white/80">
                    <MapPin className="w-4 h-4"/>
                    {selectedPlace || "Select Location"}
                 </button>
                 {showLocationDropdown && (
                      <div className="absolute top-12 left-0 mt-2 w-64 bg-figma-card border border-white/10 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 text-white max-h-60 overflow-y-auto">
                        <div className="p-2">
                            {allPlaces.map(place => (
                                <button
                                    key={place}
                                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg text-sm transition-colors text-gray-200 hover:text-white"
                                    onClick={() => { handlePlaceChange(place); setShowLocationDropdown(false); }}
                                >
                                    {place}
                                </button>
                            ))}
                        </div>
                      </div>
                    )}
             </div>
        </nav>

        {/* Center Logo */}
        <Link to="/home" className="absolute left-1/2 -translate-x-1/2 group">
          <div className="bg-figma-card/80 backdrop-blur-sm border border-white/10 px-6 py-1.5 rounded-full group-hover:bg-figma-card transition-all shadow-sm">
             <span className="font-extrabold text-xl tracking-tight text-white italic">Cine<span className="text-figma-accent">Sphere</span></span>
          </div>
        </Link>
        
        {/* Right Actions */}
        <div className="flex items-center gap-6">
             <button
            className="p-2 rounded-full text-gray-400 hover:bg-white/10 transition-all hover:text-white"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

            <button className="text-gray-300 hover:text-figma-accent transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                {/* Dot */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-figma-accent rounded-full shadow-[0_0_5px_#F72585]"></span>
            </button>
            
            <div className="flex items-center gap-2 text-gray-300 font-medium cursor-pointer hover:text-figma-accent transition-colors">
                <span className="hidden sm:inline">Menu</span>
                <Menu className="w-5 h-5" />
            </div>
            
            {user ? (
                 <div className="relative">
                 <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-figma-accent to-purple-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/20 shadow-md">
                        {user.name?.[0] || <User className='w-4 h-4' />}
                    </div>
                 </button>
                 {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-figma-card border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 py-2">
                    <Link
                      to="/my-tickets"
                      className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Ticket className="w-4 h-4 text-figma-accent"/> My Tickets
                    </Link>
                    <Link
                      to="/offers"
                      className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                         <Percent className="w-4 h-4 text-figma-accent"/> Offers
                    </Link>
                    <div className="h-px bg-white/10 my-1"></div>
                    <button
                      className="w-full text-left px-4 py-2 text-figma-accent hover:bg-white/5 flex items-center gap-2 transition"
                      onClick={() => { signOut(); nav('/home') }}
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
                 </div>
            ) : (
                <div className="flex gap-2">
                    <Link to="/auth" className="text-gray-300 hover:text-figma-accent text-sm font-medium">Sign In</Link>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}

