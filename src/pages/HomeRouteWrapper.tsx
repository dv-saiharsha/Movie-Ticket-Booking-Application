import React from 'react';
import { useAuthStore } from '../lib/storage';
import Home from './Home';
import Landing from './Landing';

export default function HomeRouteWrapper() {
  const { user } = useAuthStore();
  if (!user) {
    return <Landing />;
  }
  return <Home />;
}

