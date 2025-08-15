import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Badge from "../../components/ui/Badge";
import { Film, Ticket, Loader2, Lock, Mail, User } from "lucide-react";

// --- very tiny in-memory/localStorage auth helper ---
const AUTH_KEY = "cinebook_token";
const getIsAuthed = () => Boolean(typeof window !== "undefined" && localStorage.getItem(AUTH_KEY));
const setAuthed = () => localStorage.setItem(AUTH_KEY, "yes");
const clearAuthed = () => localStorage.removeItem(AUTH_KEY);

// Social icons (simple SVGs to avoid extra deps)
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="mr-2">
    <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.4 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.9 3 14.6 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.6 12 20.6c6.1 0 8.1-4.2 8.1-6.3 0-.4 0-.7-.1-1H12z"/>
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="mr-2 fill-current">
    <path d="M16.365 1.43c0 1.14-.46 2.21-1.193 3.004-.77.83-2.054 1.47-3.136 1.386-.143-1.1.424-2.28 1.165-3.074.777-.83 2.14-1.48 3.164-1.316zM21.5 17.38c-.41.94-.9 1.86-1.47 2.73-.78 1.17-1.73 2.48-3.01 2.5-1.27.02-1.68-.81-3.13-.81-1.46 0-1.91.79-3.18.83-1.31.02-2.31-1.26-3.09-2.43-1.69-2.46-2.99-6.97-1.25-10.01.86-1.49 2.41-2.43 4.09-2.46 1.28-.02 2.49.86 3.13.86.64 0 2.2-1.06 3.72-.9.63.03 2.41.25 3.55 1.9-3.1 1.88-2.6 6.19.84 7.25z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="mr-2 fill-current">
    <path d="M22 12a10 10 0 10-11.56 9.87v-6.98H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.77-1.64 1.56V12h2.79l-.45 2.89h-2.34v6.98A10 10 0 0022 12" />
  </svg>
);

// Reusable field
type FieldProps = {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  [key: string]: any;
};
function Field({ id, label, type = "text", icon, ...props }: FieldProps) {
  return (
    <div className="grid gap-2">
  <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">{icon}</span>}
        <Input id={id} type={type} className={icon ? "pl-10" : ""} {...props} />
      </div>
    </div>
  );
}

// SignIn & SignUp bodies with animation
const panelVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAuthed();
      setLoading(false);
      onSuccess();
    }, 700);
  };
  return (
    <motion.div key="signin" variants={panelVariants} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field id="email" label="Email" type="email" icon={<Mail className="h-4 w-4" />} required />
        <Field id="password" label="Password" type="password" icon={<Lock className="h-4 w-4" />} required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
          Sign In
        </Button>
      </form>
    </motion.div>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAuthed();
      setLoading(false);
      onSuccess();
    }, 800);
  };
  return (
    <motion.div key="signup" variants={panelVariants} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field id="name" label="Full name" icon={<User className="h-4 w-4" />} required />
        <Field id="email2" label="Email" type="email" icon={<Mail className="h-4 w-4" />} required />
        <Field id="password2" label="Password" type="password" icon={<Lock className="h-4 w-4" />} required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
          Create account
        </Button>
      </form>
    </motion.div>
  );
}

function SocialButtons({ onSuccess }: { onSuccess: () => void }) {
  const click = () => { setAuthed(); onSuccess(); };
  return (
    <div className="grid gap-2">
      <Button variant="outline" className="w-full" onClick={click}>
        <GoogleIcon/> Continue with Google
      </Button>
      <Button variant="outline" className="w-full" onClick={click}>
        <AppleIcon/> Continue with Apple
      </Button>
      <Button variant="outline" className="w-full" onClick={click}>
        <FacebookIcon/> Continue with Facebook
      </Button>
    </div>
  );
}

type AuthModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultTab?: "signin" | "signup";
  onSuccess: () => void;
};
function AuthModal({ open, onOpenChange, defaultTab = "signin", onSuccess }: AuthModalProps) {
  const [tab, setTab] = React.useState(defaultTab);
  React.useEffect(() => setTab(defaultTab), [defaultTab]);
  const title = tab === "signin" ? "Welcome back" : "Create your account";
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 max-w-md w-[92vw]">
        <Card className="overflow-hidden shadow-2xl border-none">
          <div className="text-black p-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Film className="h-5 w-5" /> {title}
            </div>
          </div>
          <div className="p-6">
            <div className="flex mb-4">
              <button className={`flex-1 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${tab === 'signin' ? 'text-black shadow' : 'text-gray-500 hover:text-black'}`} onClick={() => setTab('signin')}>Sign In</button>
              <button className={`flex-1 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${tab === 'signup' ? 'text-black shadow' : 'text-gray-500 hover:text-black'}`} onClick={() => setTab('signup')}>Sign Up</button>
            </div>
            <div className="grid gap-4">
              <AnimatePresence mode="wait">
                {tab === "signin" ? (
                  <SignInForm onSuccess={onSuccess} />
                ) : (
                  <SignUpForm onSuccess={onSuccess} />
                )}
              </AnimatePresence>
              <div className="relative py-2">
                <div className="h-px my-2" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 text-xs text-gray-400">or</span>
              </div>
              <SocialButtons onSuccess={onSuccess} />
            </div>
          </div>
          <div className="flex justify-between p-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-darkred" />
              <span className="font-semibold">CineSphere</span>
              <span className="text-xs text-darkred ml-2">A complete world of cinema.</span>
              <Badge>v1</Badge>
            </div>
            <button className="underline" onClick={() => { clearAuthed(); }}>Reset auth</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative min-h-[70vh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1780&auto=format&fit=crop')] bg-cover bg-center"/>
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-lightgrey"/>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-lightgrey mb-4 bg-darkred">
          <Film className="h-3.5 w-3.5"/> Your next story awaits
        </div>
  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-darkred">
          Book movie tickets in a <span className="text-fuchsia-300">click</span>
        </h1>
  <p className="mt-3 text-black/80">
          Discover new releases, fan screenings and more — all in CineSphere.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button size="lg" onClick={onBook} className="shadow-lg">
            <Ticket className="mr-2 h-5 w-5"/> Book Now
          </Button>
          <Button size="lg" variant="outline" className="border-darkred/30 text-darkred">
            Browse Events
          </Button>
        </div>
      </div>
    </section>
  );
}

function MoviesPage({ onSignOut }: { onSignOut: () => void }){
  const fakeMovies = [
    { id: 1, title: "Echoes of Tomorrow", rating: "PG-13" },
    { id: 2, title: "Neon Skies", rating: "PG" },
    { id: 3, title: "The Last Frame", rating: "R" },
  ];
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><Film className="h-5 w-5"/> Now Showing</h2>
        <Button variant="outline" onClick={onSignOut}>Sign out</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fakeMovies.map(m => (
          <Card key={m.id} className="hover:shadow-lg transition-all">
            <div className="p-4">
              <div className="h-44 rounded-xl mb-4 grid place-items-center text-muted-foreground">Poster</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.title}</div>
                  <div className="text-xs text-muted-foreground">Rating: {m.rating}</div>
                </div>
                <Button size="sm">Book</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CinebookAuthFlow(){
  const [authed, setAuthedState] = React.useState(getIsAuthed());
  const [authOpen, setAuthOpen] = React.useState(false);

  const handleBookNow = () => {
    if (getIsAuthed()) {
      setAuthedState(true);
    } else {
      setAuthOpen(true);
    }
  };

  const onSuccess = () => { setAuthedState(true); setAuthOpen(false); };
  const signOut = () => { clearAuthed(); setAuthedState(false); };

  return (
  <div className="min-h-screen">
      {!authed ? (
        <>
          <Hero onBook={handleBookNow} />
          <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultTab="signin" onSuccess={onSuccess} />
        </>
      ) : (
        <MoviesPage onSignOut={signOut} />
      )}
    </div>
  );
}
