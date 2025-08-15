import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding/Art Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-50 via-purple-50 to-green-50 flex-col justify-center items-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-extrabold font-serif text-darkred mb-4 drop-shadow-lg">The Art of Booking</h1>
          <p className="text-lg text-gray-700 mb-8">Experience seamless ticket booking with innovation and style. Join our community and unlock exclusive offers!</p>
          {/* Badges removed as requested */}
        </div>
      </div>
      {/* Right: Auth Form */}
  <div className="flex flex-1 flex-col justify-center items-center bg-lightgrey px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-lg font-semibold mb-2 text-darkred flex items-center gap-2">
            CineBook <Film className="inline h-6 w-6 text-darkred" />
          </h2>
          <h1 className="text-3xl font-bold mb-2 text-black">{isLogin ? 'Login' : 'Sign Up'}</h1>
          <p className="text-gray-600 mb-6">{isLogin ? 'Welcome Back! Please enter your details.' : 'Create your account to get started.'}</p>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); /* handle login/signup */ }}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border-b border-darkred focus:border-black outline-none py-2 px-1 bg-lightgrey text-black"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-darkred focus:border-black outline-none py-2 px-1 bg-lightgrey text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-darkred focus:border-black outline-none py-2 px-1 bg-lightgrey text-black"
              required
            />
            {isLogin && (
              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  Remember me for 30 days
                </label>
                <button type="button" className="text-darkred hover:underline">Forgot Password?</button>
              </div>
            )}
            <button type="submit" className="w-full bg-darkred text-white py-3 rounded-md font-semibold mt-2 hover:bg-red transition">{isLogin ? 'Log in' : 'Register'}</button>
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 border border-darkred py-3 rounded-md font-semibold bg-white hover:bg-lightgrey transition">
                <img src="/google.png" alt="Google" className="w-6 h-6" />
                {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
              </a>
              <a href="https://www.facebook.com/login.php" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 border border-darkred py-3 rounded-md font-semibold bg-white hover:bg-lightgrey transition">
                <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
                {isLogin ? 'Sign In with Facebook' : 'Sign Up with Facebook'}
              </a>
              <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 border border-darkred py-3 rounded-md font-semibold bg-white hover:bg-lightgrey transition">
                <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
                {isLogin ? 'Sign In with Twitter' : 'Sign Up with Twitter'}
              </a>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <button className="text-darkred underline font-medium" onClick={() => setIsLogin(false)}>Sign up for free</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="text-darkred underline font-medium" onClick={() => setIsLogin(true)}>Log in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
