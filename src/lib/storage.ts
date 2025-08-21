import { create } from 'zustand'

export type User = {
  id: string
  name: string
  email: string
  location?: { state: string; district?: string; village?: string }
  username?: string
}

type AuthState = {
  user: User | null
  setUser: (u: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u })
}))

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  return { user }
}

// Backend API base URL
const API = '/api/auth';

export async function signUp(u: { name: string; email: string; password: string; location: { state: string; district?: string; village?: string } }) {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: u.email, // use email as username for now
      name: u.name,
      email: u.email,
      password: u.password,
      location: u.location
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  }
  const data = await res.json();
  return data.user;
}

export async function signIn(email: string, password: string) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Invalid credentials');
  }
  const data = await res.json();
  return data.user;
}

export function signOut() {
  useAuthStore.getState().setUser(null);
}

export function saveUserLocation(loc: { state: string; district?: string; village?: string }) {
  // Optionally, implement a backend call to update user location
}

