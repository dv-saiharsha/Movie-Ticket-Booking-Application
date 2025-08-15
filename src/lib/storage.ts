import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  password: string // demo only (do NOT use in prod)
  location?: { state: string; district?: string; village?: string }
}

type AuthState = {
  user: User | null
  setUser: (u: User | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  get user() {
    return JSON.parse(localStorage.getItem('cinebook:user') || 'null');
  },
  setUser: (u) => {
    if (u) localStorage.setItem('cinebook:user', JSON.stringify(u))
    else localStorage.removeItem('cinebook:user')
    set({ user: u })
  },
}))

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  return { user }
}

export function signUp(u: Omit<User, 'id'>) {
  const users: User[] = JSON.parse(localStorage.getItem('cinebook:users') || '[]')
  if (users.find((x) => x.email === u.email)) {
    throw new Error('Email already registered')
  }
  const user: User = { ...u, id: crypto.randomUUID() }
  users.push(user)
  localStorage.setItem('cinebook:users', JSON.stringify(users))
  localStorage.setItem('cinebook:user', JSON.stringify(user))
  return user
}

export function signIn(email: string, password: string) {
  const users: User[] = JSON.parse(localStorage.getItem('cinebook:users') || '[]')
  const user = users.find((x) => x.email === email && x.password === password)
  if (!user) throw new Error('Invalid credentials')
  localStorage.setItem('cinebook:user', JSON.stringify(user))
  return user
}

export function signOut() {
  localStorage.removeItem('cinebook:user')
}

export function saveUserLocation(loc: { state: string; district?: string; village?: string }) {
  const userRaw = localStorage.getItem('cinebook:user')
  if (!userRaw) return
  const user = JSON.parse(userRaw)
  user.location = loc
  localStorage.setItem('cinebook:user', JSON.stringify(user))

  const users: User[] = JSON.parse(localStorage.getItem('cinebook:users') || '[]')
  const idx = users.findIndex((x) => x.id === user.id)
  if (idx !== -1) {
    users[idx] = user
    localStorage.setItem('cinebook:users', JSON.stringify(users))
  }
}
