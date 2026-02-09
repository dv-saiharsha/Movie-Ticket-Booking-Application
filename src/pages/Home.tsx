
import React, { useState, useRef, useEffect } from 'react';
import { Film } from 'lucide-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { signIn, signUp, useAuthStore } from '../lib/storage';
import Card from '../components/ui/Card';
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';

// Carousel component for hero section images
function ImageCarousel() {
  const images = [
    { src: '/projector tape.jpeg', alt: 'Projector Tape' },
    { src: '/red-carpet.png', alt: 'Red Carpet' },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const isRedCarpet = images[idx].src.includes('red-carpet.png');
  return (
    <div className="w-full max-w-lg aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-figma-card via-figma-bg to-black rounded-xl shadow-[0_0_30px_rgba(247,37,133,0.2)] overflow-hidden transition-all duration-700 border border-white/10">
      <img
        src={images[idx].src}
        alt={images[idx].alt}
        className={isRedCarpet ? "object-contain p-6 w-full h-full opacity-90" : "object-cover w-full h-full opacity-90"}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
}

export function SignInInline({ onSwitch, onClose, forceSignIn }: { onSwitch: () => void; onClose: () => void; forceSignIn?: boolean }) {
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  // If forceSignIn is true, do not allow switching to sign-up
  const onSubmit = () => {
    try {
      const u = signIn(email, password);
      setUser(u);
      onClose();
      nav('/home');
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <Card className="w-full max-w-md p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] rounded-2xl bg-figma-card border border-white/10 flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <Film className="h-8 w-8 text-figma-accent mb-1" />
        <h1 className="text-3xl font-bold text-center text-white">Cine<span className="text-figma-accent">Sphere</span></h1>
  <p className="text-center text-gray-400 text-sm mt-1">A complete world of cinema.</p>
      </div>
      <form className="w-full flex flex-col gap-5" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className="rounded-lg bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-figma-accent placeholder:text-gray-600" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required className="rounded-lg bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-figma-accent placeholder:text-gray-600" />
        </div>
        <Button className="w-full mt-2 py-3 text-lg font-semibold rounded-lg bg-figma-accent text-white hover:bg-pink-600 transition shadow-[0_0_15px_rgba(247,37,133,0.4)]" type="submit">Sign in</Button>
      </form>
      <div className="w-full flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs">or sign in with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="flex gap-3 justify-center">
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign in with Google">
            <img src="/google.svg" alt="Google" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign in with Apple">
            <img src="/apple.svg" alt="Apple" className="w-6 h-6 invert" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign in with Facebook">
            <img src="/facebook.svg" alt="Facebook" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign in with Gmail">
            <img src="/gmail.svg" alt="Gmail" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
        </div>
      </div>
      {forceSignIn ? null : (
        <p className="text-sm text-center text-gray-500 mt-4">New user? <button className="text-figma-accent underline font-medium hover:text-white transition-colors" onClick={onSwitch}>Create account</button></p>
      )}
      <Button variant="ghost" className="w-full mt-2 text-gray-400 hover:text-white" onClick={onClose}>Close</Button>
    </Card>
  );
}

function SignUpInline({ onSwitch, onClose }: { onSwitch: () => void; onClose: () => void }) {
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const onSubmit = () => {
    try {
      const user = signUp({ name, email, password });
      setUser(user);
      onClose();
      nav('/home');
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <Card className="w-full max-w-md p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] rounded-2xl bg-figma-card border border-white/10 flex flex-col items-center">
  <h1 className="text-2xl font-bold mb-6 text-center text-white">Create your <span className="text-figma-accent">CineSphere</span> account</h1>
  <p className="text-center text-gray-400 text-sm mb-4">A complete world of cinema.</p>
  <form className="w-full flex flex-col gap-5" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className="text-gray-300">Full Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" autoComplete="name" required className="rounded-lg bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-figma-accent placeholder:text-gray-600" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className="rounded-lg bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-figma-accent placeholder:text-gray-600" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" required className="rounded-lg bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-figma-accent placeholder:text-gray-600" />
        </div>
        <Button className="w-full mt-2 py-3 text-lg font-semibold rounded-lg bg-figma-accent text-white hover:bg-pink-600 transition shadow-[0_0_15px_rgba(247,37,133,0.4)]" type="submit">Sign up</Button>
      </form>
      <div className="w-full flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs">or sign up with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="flex gap-3 justify-center">
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign up with Google">
            <img src="/google.svg" alt="Google" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign up with Apple">
            <img src="/apple.svg" alt="Apple" className="w-6 h-6 invert" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign up with Facebook">
            <img src="/facebook.svg" alt="Facebook" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition bg-white/5" title="Sign up with Gmail">
            <img src="/gmail.svg" alt="Gmail" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
          </button>
        </div>
      </div>
      <p className="text-sm text-center text-gray-500 mt-4">Already have an account? <button className="text-figma-accent underline font-medium hover:text-white transition-colors" onClick={onSwitch}>Sign in</button></p>
      <Button variant="ghost" className="w-full mt-2 text-gray-400 hover:text-white" onClick={onClose}>Close</Button>
    </Card>
  );
}

type EventModalType = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  icon: string;
  description: string;
  timings: string[];
};

function getNextFiveOddDays() {
  const days = [];
  let date = new Date();
  while (days.length < 5) {
    date.setDate(date.getDate() + 1);
    if (date.getDate() % 2 === 1) {
      days.push(new Date(date));
    }
  }
  return days;
}

function Home() {
  const { user, setUser } = useAuthStore();
  // Rehydrate Zustand user state from localStorage if missing
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem('cinebook:user');
      if (stored) setUser(JSON.parse(stored));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once

  const [modalOpen, setModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const nowShowingRef = useRef<HTMLDivElement>(null);
  const nowShowing = movies.filter(m => !m.upcoming);
  const upcoming = movies.filter(m => m.upcoming);
  // Event Modal State
  const [eventModal, setEventModal] = useState<EventModalType | null>(null);
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);

  if (!user) {
    // This fallback UI is for when Home is rendered directly without user
    // Ideally routing handles this, but we style it just in case.
    return (
      <div className="min-h-screen flex items-center justify-center bg-figma-bg relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-figma-accent/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
        
        <div className="w-full max-w-md mx-auto p-4 z-10">
          {showSignIn ? (
            <SignInInline onSwitch={() => setShowSignIn(false)} onClose={() => {}} />
          ) : (
            <SignUpInline onSwitch={() => setShowSignIn(true)} onClose={() => {}} />
          )}
        </div>
      </div>
    );
  }

  // If logged in, show the original home page with movies
  return (
    <div className="min-h-screen bg-figma-bg text-white font-sans selection:bg-figma-accent selection:text-white">
      <div className="w-full flex flex-col justify-between">
        
        {/* HERO SECTION */}
        <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 min-h-[60vh] relative z-10">
          
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-figma-bg via-transparent to-figma-bg -z-10"></div>
          
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-5xl md:text-7xl font-sans font-black leading-tight text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The Art<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-figma-accent to-purple-400">of Booking</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300 font-light tracking-wide">
                Book your next movie experience with ease. Discover, select, and reserve your seat in seconds.
            </p>
            <div className="flex gap-4 mb-10">
              <Button
                className="px-8 py-3 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(247,37,133,0.4)] bg-figma-accent text-white hover:bg-pink-600 transition border border-white/10"
                onClick={() => {
                  if (nowShowingRef.current) {
                    const y = nowShowingRef.current.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                Book Now
              </Button>
              <Button variant="outline" className="px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 backdrop-blur-sm" onClick={() => {
                  const el = document.getElementById('events-section');
                  if(el) el.scrollIntoView({behavior:'smooth'});
              }}>
                Events
              </Button>
            </div>
          </div>
          
          {/* Right Content? Usually carousel or illustration. If it was empty, we can add a visual */}
          <div className="flex-1 flex w-full justify-center md:justify-end">
             <ImageCarousel />
          </div>
        </main>

        {/* Movie Sections */}
        <section ref={nowShowingRef} className="max-w-7xl mx-auto w-full px-6 pb-16 relative z-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-figma-accent rounded-full"></span>
                    Now Showing
                </h2>
            </div>
            
            {/* List now showing movies */}
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-figma-accent/50 scrollbar-track-white/5">
            {nowShowing.map((m: any) => (
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

            <div className="flex items-center justify-between mt-16 mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
                    Upcoming
                </h2>
            </div>
            
            {/* List upcoming movies */}
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/5">
            {upcoming.map((m: any) => (
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

        {/* Events Section */}
        <section id="events-section" className="relative w-full py-16 bg-black/20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-yellow-400 rounded-full"></span>
                    Events
                </h2>
                
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {/* Inline event cards */}
                {[
                    {
                    id: 'ev1',
                    title: 'Sunburn Music Festival',
                    type: 'Concert',
                    date: '2025-12-28',
                    location: 'Goa',
                    icon: '☀️',
                    description: 'Asia’s biggest electronic music festival, held every December in Goa.',
                    timings: ['10:00 AM', '2:00 PM', '6:00 PM']
                    },
                    {
                    id: 'ev2',
                    title: 'Navratri Garba Night',
                    type: 'Festival',
                    date: '2025-10-10',
                    location: 'Ahmedabad',
                    icon: '💃',
                    description: 'Traditional Garba and Dandiya event during Navratri, Gujarat.',
                    timings: ['7:00 PM', '9:30 PM']
                    },
                    {
                    id: 'ev3',
                    title: 'Standup Comedy with Zakir Khan',
                    type: 'Standup Comedy',
                    date: '2025-09-15',
                    location: 'Mumbai',
                    icon: '😂',
                    description: 'Laugh out loud with India’s top standup comedian.',
                    timings: ['5:00 PM', '8:00 PM']
                    },
                    {
                    id: 'ev4',
                    title: 'Diwali Mela',
                    type: 'Festival',
                    date: '2025-11-01',
                    location: 'Delhi',
                    icon: '🎆',
                    description: 'Celebrate Diwali with food, music, and fireworks.',
                    timings: ['4:00 PM', '7:00 PM', '10:00 PM']
                    },
                    {
                    id: 'ev5',
                    title: 'Holi Bash',
                    type: 'Festival',
                    date: '2026-03-06',
                    location: 'Bangalore',
                    icon: '🎨',
                    description: 'Colorful Holi party with DJs and rain dance.',
                    timings: ['11:00 AM', '1:30 PM', '3:00 PM']
                    },
                ].map(ev => (
                    <div key={ev.id} className="flex flex-col items-center min-w-[260px] max-w-xs p-6 border border-white/10 bg-figma-card rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:border-figma-accent group cursor-pointer"
                        onClick={() => {
                             setEventModal(ev);
                        }}
                    >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-4xl mb-4 border border-white/5 group-hover:bg-figma-accent/20 transition-colors">
                        {ev.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{ev.title}</h3>
                    <div className="text-xs text-gray-400 mb-1 font-medium tracking-wide uppercase">{ev.type} • {ev.location}</div>
                    <div className="text-xs text-gray-500 mb-4">{new Date(ev.date).toLocaleDateString()}</div>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2 text-center">{ev.description}</p>
                    <Button className="bg-white/10 text-white hover:bg-figma-accent hover:border-transparent px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20 transition-all w-full" onClick={(e) => {
                         e.stopPropagation();
                         const nav = useNavigate();
                         nav('/events', { state: { eventId: ev.id } });
                    }}>View Details</Button>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Event Timing Modal */}
      {eventModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-figma-card rounded-2xl shadow-[0_0_50px_rgba(247,37,133,0.3)] p-8 max-w-sm w-full border border-white/20 relative flex flex-col items-center animate-in fade-in zoom-in duration-200">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl" onClick={() => { setEventModal(null); setSelectedEventDate(null); }}>&times;</button>
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-6xl mb-6 border border-white/10 shadow-inner">
                 {eventModal.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 text-center">{eventModal.title}</h2>
            <div className="text-sm text-figma-accent font-bold mb-2 uppercase tracking-wider">{eventModal.type} • {eventModal.location}</div>
            <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed">{eventModal.description}</p>
            
            <div className="w-full mb-4 space-y-4">
              <div>
                <div className="font-bold text-white text-xs uppercase tracking-widest mb-2">Select Date</div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {getNextFiveOddDays().map((date, idx) => (
                    <span
                        key={idx}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-200 text-center uppercase tracking-wide
                        ${selectedEventDate && date.toDateString() === selectedEventDate.toDateString() 
                             ? 'bg-figma-accent border-figma-accent text-white shadow-lg' 
                             : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white'}`}
                        onClick={() => setSelectedEventDate(date)}
                    >
                        {date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
                    </span>
                    ))}
                </div>
              </div>
              
              {selectedEventDate && (
                 <div className="animate-in slide-in-from-top-2 duration-300">
                  <div className="font-bold text-white text-xs uppercase tracking-widest mb-2">Select Timing</div>
                  <div className="flex flex-wrap gap-2">
                    {eventModal.timings.map(time => (
                      <span key={time} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 font-bold text-xs cursor-pointer hover:bg-figma-accent hover:text-white hover:border-figma-accent transition-all duration-150">
                          {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Button 
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${selectedEventDate ? 'bg-figma-accent text-white shadow-[0_0_20px_rgba(247,37,133,0.4)] hover:shadow-[0_0_30px_rgba(247,37,133,0.6)]' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}
                disabled={!selectedEventDate} 
                onClick={() => { setEventModal(null); setSelectedEventDate(null); }}
            >
                Proceed Booking
            </Button>
          </div>
        </div>
      )}

      {/* Footer Minimal */}
      <footer className="w-full py-12 bg-black/40 border-t border-white/5 mt-auto">
         <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="flex justify-center gap-8 mb-8">
                 {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
                     <a key={platform} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-figma-accent hover:text-white transition-all duration-300 border border-white/10 hover:border-figma-accent shadow-sm hover:shadow-[0_0_15px_rgba(247,37,133,0.5)]">
                         <i className={`fab fa-${platform}`}></i>
                     </a>
                 ))}
             </div>
             <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">Developed by Venkata Sai Harshith Danda</p>
         </div>
      </footer>

    </div>
    </div>
  );
}
export default Home;
