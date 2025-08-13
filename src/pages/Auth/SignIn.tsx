
// SignIn page: Handles user login
import { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import Label from '../../components/ui/Label'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, useAuthStore } from '../../lib/storage'


export default function SignIn() {
  const nav = useNavigate() // Navigation hook
  const { user, setUser } = useAuthStore() // Auth state
  // State for email and password fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) nav('/home')
  }, [user])

  // Handle sign in form submit
  const onSubmit = () => {
    try {
      const u = signIn(email, password)
      setUser(u)
      nav('/home')
    } catch(e:any) {
      alert(e.message)
    }
  }

  // Render sign in form
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to CineBook</h1>
        <div className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button className="w-full" onClick={onSubmit}>Sign in</Button>
          <p className="text-sm text-center text-gray-600">New user? <Link className="text-brand-700" to="/signup">Create account</Link></p>
        </div>
      </Card>
    </div>
  )
}
