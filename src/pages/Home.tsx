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

function Home() {
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const nowShowingRef = useRef<HTMLDivElement>(null);
  const nowShowing = movies.filter(m => !m.upcoming);
  const upcoming = movies.filter(m => m.upcoming);

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-slate flex flex-col justify-between">
        <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 flex-1">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-white mb-6">The Art<br />of Booking</h1>
            <p className="mb-8 text-lg text-silver">Book your next movie experience with ease. Discover, select, and reserve your seat in seconds. Enjoy the show!</p>
            <div className="flex gap-4 mb-10">
              <Button
                className="px-8 py-3 rounded-lg font-bold text-lg shadow"
                onClick={() => setModalOpen(true)}
              >
                Book Now
              </Button>
              <Button variant="outline" className="px-8 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21 5,3" /></svg>
                How it works
              </Button>
            </div>
          </div>
          {/* Right: Illustration image */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/projector tape.jpeg" alt="Projector Tape" className="w-full max-w-lg h-auto rounded-xl shadow-xl bg-matte object-cover object-center" style={{aspectRatio:'4/3'}} />
          </div>
        </main>
        {/* Modal for login/signup */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg p-0 max-w-md w-full relative">
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
            <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-medium"></i></a>
            <a href="#" className="text-silver hover:text-yellow text-2xl"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="text-xs text-silver mt-2">Developed by Venkata Sai Harshith Danda</div>
        </footer>
      </div>
    );
  }

  // If logged in, show the original home page with movies
  return (
    <div className="min-h-screen w-full bg-slate flex flex-col justify-between">
      <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 flex-1">
        {/* Left: Text content */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-white mb-6">The Art<br />of Booking</h1>
          <p className="mb-8 text-lg text-silver">Book your next movie experience with ease. Discover, select, and reserve your seat in seconds. Enjoy the show!</p>
          <div className="flex gap-4 mb-10">
            <Button
              className="px-8 py-3 rounded-lg font-bold text-lg shadow"
              onClick={() => nowShowingRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21 5,3" /></svg>
              How it works
            </Button>
          </div>
        </div>
        {/* Right: Illustration image */}
        <div className="flex-1 flex items-center justify-center">
          <img src="/projector tape.jpeg" alt="Projector Tape" className="w-full max-w-lg h-auto rounded-xl shadow-xl bg-matte object-cover object-center" style={{aspectRatio:'4/3'}} />
        </div>
      </main>
      {/* Movie Sections */}
      <section ref={nowShowingRef} className="max-w-7xl mx-auto w-full px-6 pb-16">
        <h2 className="text-2xl font-bold text-yellow mb-4">Now Showing</h2>
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
        <h2 className="text-2xl font-bold text-yellow mt-12 mb-4">Upcoming</h2>
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
  );
}
export default Home;
