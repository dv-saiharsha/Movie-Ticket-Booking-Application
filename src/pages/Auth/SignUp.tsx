
// SignUp page: Handles user registration and location selection
import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Label from '../../components/ui/Label'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { signUp, useAuthStore, saveUserLocation } from '../../lib/storage'
import { loadIndiaLocations, LocationNode } from '../../lib/indiaLocations'


export default function SignUp() {
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
  const onSubmit = () => {
    try {
      const user = signUp({ name, email, password, location: { state, district, village } })
      setUser(user)
      saveUserLocation({ state, district, village })
      nav('/home')
    } catch(e:any) {
      alert(e.message)
    }
  }

  // Render sign up form
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create your CineBook account</h1>
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Bhavya Sree" />
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

          <Button className="w-full" onClick={onSubmit}>Sign up</Button>
          <p className="text-sm text-center text-gray-600">Already have an account? <Link className="text-brand-700" to="/signin">Sign in</Link></p>
        </div>
      </Card>
    </div>
  )
}
