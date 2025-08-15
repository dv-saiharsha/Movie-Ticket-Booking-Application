import React from 'react';
import { useAuthStore } from '../lib/storage';
import Home from './Home';
import AuthPage from './AuthPage';



export default function HomeRouteWrapper() {
  const { user } = useAuthStore();
  if (!user) {
    // Render the same split AuthPage layout as the root page
    return <AuthPage />;
  }
  return <Home />;
}
