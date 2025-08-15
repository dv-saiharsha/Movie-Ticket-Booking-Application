import React, { useEffect } from 'react';
import { useAuthStore } from '../lib/storage';
import Home from './Home';
import AuthPage from './AuthPage';



export default function HomeRouteWrapper() {
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem('cinebook:user');
      if (stored) setUser(JSON.parse(stored));
    }
  }, [user, setUser]);
  if (!user) {
    // Render the same split AuthPage layout as the root page
    return <AuthPage />;
  }
  return <Home />;
}
