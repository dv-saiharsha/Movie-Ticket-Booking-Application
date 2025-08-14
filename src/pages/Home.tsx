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
    { src: '/event.png', alt: 'Event' },
  ];
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const isEvent = images[idx].src.includes('event.png');
  return (
    <div className="w-full max-w-lg aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-700">
      <img
        src={images[idx].src}
        alt={images[idx].alt}
        className={isEvent ? "object-contain p-6 w-full h-full" : "object-cover w-full h-full"}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
}
import { useState, useRef } from 'react';
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
    <Card className="w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to CineBook</h1>
      <div className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button className="w-full" onClick={onSubmit}>Sign in</Button>
        <p className="text-sm text-center text-gray-600">New user? <button className="text-brand-700 underline" onClick={onSwitch}>Create account</button></p>
        <Button variant="ghost" className="w-full mt-2" onClick={onClose}>Close</Button>
      </div>
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
    <Card className="w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Create your CineBook account</h1>
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Bhavya Sree" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button className="w-full" onClick={onSubmit}>Sign up</Button>
        <p className="text-sm text-center text-gray-600">Already have an account? <button className="text-brand-700 underline" onClick={onSwitch}>Sign in</button></p>
        <Button variant="ghost" className="w-full mt-2" onClick={onClose}>Close</Button>
      </div>
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
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-darkred mb-6">The Art<br />of Booking</h1>
            <p className="mb-8 text-lg text-black">Book your next movie experience with ease. Discover, select, and reserve your seat in seconds. Enjoy the show!</p>
            <div className="flex gap-4 mb-10">
              <Button
                className="px-8 py-3 rounded-lg font-bold text-lg shadow bg-darkred text-lightgrey hover:bg-red transition"
                onClick={() => setModalOpen(true)}
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
        {/* Modal for login/signup */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="rounded-lg shadow-lg p-0 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setModalOpen(false)}>&times;</button>
              {showSignIn ? (
                <SignInInline onSwitch={() => setShowSignIn(false)} onClose={() => setModalOpen(false)} />
              ) : (
                <SignUpInline onSwitch={() => setShowSignIn(true)} onClose={() => setModalOpen(false)} />
              )}
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
