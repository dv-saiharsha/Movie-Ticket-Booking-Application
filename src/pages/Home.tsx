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
import React from 'react';
// Carousel component for hero section images
function ImageCarousel() {
  const images = [
    { src: '/projector tape.jpeg', alt: 'Projector Tape' },
    { src: '/red-carpet.png', alt: 'Red Carpet' },
  ];
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const isRedCarpet = images[idx].src.includes('red-carpet.png');
  return (
    <div className="w-full max-w-lg aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-700">
      <img
        src={images[idx].src}
        alt={images[idx].alt}
        className={isRedCarpet ? "object-contain p-6 w-full h-full" : "object-cover w-full h-full"}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
}
import { useState, useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope } from 'react-icons/fa';
import { signIn, signUp, useAuthStore } from '../lib/storage';
import Card from '../components/ui/Card';
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';
import { Ticket } from 'lucide-react';

function SignInInline({ onSwitch, onClose }: { onSwitch: () => void; onClose: () => void }) {
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const onSubmit = () => {

  const nav = useNavigate();
  const onSubmit = () => {
    try {
      const u = signIn(email, password);
      setUser(u);
      onClose();
      nav('/home');
    } catch (e: any) {
      alert(e.message);
    }

  }
  };
  return (
    <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkred">Welcome to CineBook</h1>
      <form className="w-full flex flex-col gap-5" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className="rounded-lg border-gray-300 focus:ring-2 focus:ring-darkred" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required className="rounded-lg border-gray-300 focus:ring-2 focus:ring-darkred" />
        </div>
        <Button className="w-full mt-2 py-3 text-lg font-semibold rounded-lg bg-darkred text-white hover:bg-red-700 transition" type="submit">Sign in</Button>
      </form>
      <div className="w-full flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-xs">or sign in with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex gap-3 justify-center">
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign in with Google">
            <img src="/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign in with Apple">
            <img src="/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign in with Facebook">
            <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign in with Gmail">
            <img src="/gmail.svg" alt="Gmail" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <p className="text-sm text-center text-gray-600 mt-4">New user? <button className="text-brand-700 underline font-medium" onClick={onSwitch}>Create account</button></p>
      <Button variant="ghost" className="w-full mt-2" onClick={onClose}>Close</Button>
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
    <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkred">Create your CineBook account</h1>
  <form className="w-full flex flex-col gap-5" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" autoComplete="name" required className="rounded-lg border-gray-300 focus:ring-2 focus:ring-darkred" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className="rounded-lg border-gray-300 focus:ring-2 focus:ring-darkred" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" required className="rounded-lg border-gray-300 focus:ring-2 focus:ring-darkred" />
        </div>
        <Button className="w-full mt-2 py-3 text-lg font-semibold rounded-lg bg-darkred text-white hover:bg-red-700 transition" type="submit">Sign up</Button>
      </form>
      <div className="w-full flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-xs">or sign up with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex gap-3 justify-center">
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign up with Google">
            <img src="/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign up with Apple">
            <img src="/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign up with Facebook">
            <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition" title="Sign up with Gmail">
            <img src="/gmail.svg" alt="Gmail" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <p className="text-sm text-center text-gray-600 mt-4">Already have an account? <button className="text-brand-700 underline font-medium" onClick={onSwitch}>Sign in</button></p>
      <Button variant="ghost" className="w-full mt-2" onClick={onClose}>Close</Button>
    </Card>
  );
}

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
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const nowShowingRef = useRef<HTMLDivElement>(null);
  const nowShowing = movies.filter(m => !m.upcoming);
  const upcoming = movies.filter(m => m.upcoming);
  // Event Modal State
  const [eventModal, setEventModal] = useState<EventModalType | null>(null);
  // Sample time slots for events
  const eventTimeSlots = [
    '10:00 AM', '12:30 PM', '3:00 PM', '6:00 PM', '8:30 PM'
  ];
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-between">
        <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 flex-1">
          {/* Left: Sign in/up layout */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-xl">
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-darkred mb-6 text-center">The Art<br />of Booking</h1>
            {showSignIn ? (
              <SignInInline onSwitch={() => setShowSignIn(false)} onClose={() => {}} />
            ) : (
              <SignUpInline onSwitch={() => setShowSignIn(true)} onClose={() => {}} />
            )}
          </div>
          {/* Right: Carousel */}
          <div className="flex-1 flex items-center justify-center">
            <ImageCarousel />
          </div>
        </main>
      </div>
    );
// ...existing code...
  }

  // If logged in, show the original home page with movies
  return (
  <div className="min-h-screen w-full flex flex-col justify-between">
      <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 flex-1">
        {/* Left: Text content */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-darkred mb-6">The Art<br />of Booking</h1>
          <p className="mb-8 text-lg text-black">Book your next movie experience with ease. Discover, select, and reserve your seat in seconds. Enjoy the show!</p>
          <div className="flex gap-4 mb-10">
            <Button
              className="px-8 py-3 rounded-lg font-bold text-lg shadow bg-darkred text-lightgrey hover:bg-red transition"
              onClick={() => {
                if (nowShowingRef.current) {
                  const y = nowShowingRef.current.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              Book Now
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg font-bold text-lg flex items-center gap-2" onClick={() => {
              const el = document.getElementById('events-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 7v6l5 3" /></svg>
              Events
            </Button>
          </div>
        </div>
        {/* Right: Illustration image */}
        <div className="flex-1 flex items-center justify-center">
          <ImageCarousel />
        </div>
      </main>
      {/* Movie Sections */}
      <section ref={nowShowingRef} className="max-w-7xl mx-auto w-full px-6 pb-16">
  <h2 className="text-2xl font-bold text-darkred mb-4">Now Showing</h2>
        {/* List now showing movies */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
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
  <h2 className="text-2xl font-bold text-darkred mt-12 mb-4">Upcoming</h2>
        {/* List upcoming movies */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
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
  <section id="events-section" className="max-w-7xl mx-auto w-full px-6 pb-16">
        <h2 className="text-2xl font-bold text-darkred mt-12 mb-4">Events</h2>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {/* Inline event cards with emoji icons */}
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
            <div key={ev.id} className="flex flex-col items-center min-w-[260px] max-w-xs p-4 border-2 border-darkred bg-white rounded-xl shadow">
              <span className="text-5xl mb-2" aria-label="event-icon">{ev.icon}</span>
              <h3 className="text-lg font-semibold text-darkred mb-1">{ev.title}</h3>
              <div className="text-xs text-black mb-1">{ev.type} • {ev.location}</div>
              <div className="text-xs text-black/60 mb-2">{new Date(ev.date).toLocaleDateString()}</div>
              <p className="text-xs text-black mb-2 line-clamp-2">{ev.description}</p>
              <Button className="bg-darkred text-lightgrey px-4 py-1 rounded-lg text-sm" onClick={() => {
                const nav = useNavigate();
                nav('/events', { state: { eventId: ev.id } });
              }}>Book Now</Button>
            </div>
          ))}
  // Event Modal State

      {/* Event Timing Modal */}
      {eventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full border-2 border-darkred relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-darkred text-2xl" onClick={() => { setEventModal(null); setSelectedEventDate(null); }}>&times;</button>
            <span className="text-6xl mb-2">{eventModal.icon}</span>
            <h2 className="text-xl font-bold text-darkred mb-1 text-center">{eventModal.title}</h2>
            <div className="text-xs text-black mb-1">{eventModal.type} • {eventModal.location}</div>
            <p className="text-xs text-black mb-4 text-center">{eventModal.description}</p>
            <div className="w-full mb-2">
              <div className="font-semibold text-darkred mb-1">Select Date:</div>
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                {getNextFiveOddDays().map((date, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-lg border border-darkred font-bold text-sm cursor-pointer transition-all duration-150 ${selectedEventDate && date.toDateString() === selectedEventDate.toDateString() ? 'bg-darkred text-lightgrey' : 'bg-lightgrey text-darkred hover:bg-darkred hover:text-lightgrey'}`}
                    onClick={() => setSelectedEventDate(date)}
                  >
                    {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
              {selectedEventDate && (
                <>
                  <div className="font-semibold text-darkred mb-1">Select Timing:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {eventModal.timings.map(time => (
                      <span key={time} className="px-3 py-1 rounded-lg border border-darkred bg-lightgrey text-darkred font-bold text-sm cursor-pointer hover:bg-darkred hover:text-lightgrey transition-all duration-150">{time}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Button className="bg-darkred text-lightgrey px-6 py-2 rounded-xl w-full mt-4 font-bold" disabled={!selectedEventDate} onClick={() => { setEventModal(null); setSelectedEventDate(null); }}>Proceed</Button>
          </div>
        </div>
      )}
        </div>
      </section>
      {/* Event Timing Modal */}
      {eventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full border-2 border-darkred relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-darkred text-2xl" onClick={() => setEventModal(null)}>&times;</button>
            <span className="text-6xl mb-2">{eventModal.icon}</span>
            <h2 className="text-xl font-bold text-darkred mb-1 text-center">{eventModal.title}</h2>
            <div className="text-xs text-black mb-1">{eventModal.type} • {eventModal.location}</div>
            <div className="text-xs text-black/60 mb-2">{new Date(eventModal.date).toLocaleDateString()}</div>
            <p className="text-xs text-black mb-4 text-center">{eventModal.description}</p>
            <div className="w-full mb-2">
              <div className="font-semibold text-darkred mb-1">Select Timing:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {eventTimeSlots.map(time => (
                  <span key={time} className="px-3 py-1 rounded-lg border border-darkred bg-lightgrey text-darkred font-bold text-sm cursor-pointer hover:bg-darkred hover:text-lightgrey transition-all duration-150">{time}</span>
                ))}
              </div>
            </div>
            <Button className="bg-darkred text-lightgrey px-6 py-2 rounded-xl w-full mt-4 font-bold" onClick={() => setEventModal(null)}>Proceed</Button>
          </div>
        </div>
      )}
      {/* Social icons */}
      <footer className="flex flex-col items-center gap-2 pb-8">
        <div className="flex justify-center gap-6">
          <a href="#" className="text-black hover:text-darkred text-2xl"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-black hover:text-darkred text-2xl"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-black hover:text-darkred text-2xl"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-black hover:text-darkred text-2xl"><i className="fab fa-medium"></i></a>
          <a href="#" className="text-black hover:text-darkred text-2xl"><i className="fab fa-instagram"></i></a>
        </div>
  <div className="text-xs text-black mt-2">Developed by Venkata Sai Harshith Danda</div>
      </footer>
    </div>
  );
}
export default Home;
