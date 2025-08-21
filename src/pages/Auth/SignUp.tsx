
// SignUp page: Handles user registration and location selection

import { useState, useEffect } from 'react'
import { Film } from 'lucide-react';
import Card from '../../components/ui/Card'
import Label from '../../components/ui/Label'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { signUp, useAuthStore, saveUserLocation } from '../../lib/storage'
import { loadIndiaLocations, LocationNode } from '../../lib/indiaLocations'
export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate() // Navigation hook
  const { setUser } = useAuthStore() // Auth state
  // State for form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // State for location data
  const [locations, setLocations] = useState<LocationNode[]>([])
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')

  // Load location data on mount
  useEffect(() => {
    loadIndiaLocations().then(setLocations)
  }, [])

  // Find selected state and district nodes
  const stateNode = locations.find(l => l.name === state)
  const districtNode = stateNode?.children?.find(d => d.name === district)

  // Handle sign up form submit
  const onSubmit = async () => {
    setError(null)
    if (!name || !email || !password || !state || !district || !village) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const user = await signUp({ name, email, password, location: { state, district, village } })
      setUser(user)
      // Optionally: saveUserLocation({ state, district, village })
      nav('/home')
    } catch(e:any) {
      setError(e.message || 'Registration failed.');
    }
  }

  // Render sign up form
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-4">
          <Film className="h-7 w-7 text-darkred mb-1" />
          <h1 className="text-2xl font-semibold text-center">CineSphere</h1>
          <p className="text-center text-darkred text-xs mt-1">A complete world of cinema.</p>
        </div>
        {error && (
          <div className="w-full mb-2 text-center text-sm text-red-600 bg-red-100 rounded p-2">{error}</div>
        )}
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {/* Location cascading selects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* State select */}
            <div>
              <Label>State</Label>
              <select className="w-full h-10 border rounded-2xl px-3" value={state} onChange={(e)=>{setState(e.target.value); setDistrict(''); setVillage('')}}>
                <option value="">Select state</option>
                {locations.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            {/* District select */}
            <div>
              <Label>District</Label>
              <select className="w-full h-10 border rounded-2xl px-3" value={district} onChange={(e)=>{setDistrict(e.target.value); setVillage('')}} disabled={!stateNode}>
                <option value="">Select district</option>
                {stateNode?.children?.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            {/* Village select */}
            <div>
              <Label>Village</Label>
              <select className="w-full h-10 border rounded-2xl px-3" value={village} onChange={(e)=>setVillage(e.target.value)} disabled={!districtNode}>
                <option value="">Select village</option>
                {districtNode?.children?.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
              </select>
            </div>
          </div>

          <Button className="w-full" onClick={onSubmit} disabled={!name || !email || !password || !state || !district || !village}>Sign up</Button>
          <p className="text-sm text-center text-gray-600">Already have an account? <Link className="text-brand-700" to="/signin">Sign in</Link></p>
        </div>
      </Card>
    </div>
  )
}
