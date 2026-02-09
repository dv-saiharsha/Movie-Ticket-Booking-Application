
// React hooks and required components
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { shows, theatres } from '../data/theaters'
import { movies } from '../data/movies';
import { Check, Loader2 } from 'lucide-react';

// Snack type and available snacks with sizes and prices
type Snack = { id:string; name:string; sizes: { size: string; price: number }[] }
const SNACKS: Snack[] = [
  { id:'s1', name:'Popcorn', sizes: [
    { size: 'Small', price: 80 },
    { size: 'Medium', price: 120 },
    { size: 'Large', price: 180 },
  ] },
  { id:'s2', name:'Nachos', sizes: [
    { size: 'Small', price: 70 },
    { size: 'Medium', price: 110 },
    { size: 'Large', price: 150 },
  ] },
  { id:'s3', name:'Coke', sizes: [
    { size: 'Small', price: 50 },
    { size: 'Medium', price: 75 },
    { size: 'Large', price: 100 },
  ] },
  { id:'s4', name:'Water', sizes: [
    { size: 'Small', price: 20 },
    { size: 'Medium', price: 35 },
    { size: 'Large', price: 50 },
  ] },
]

// Checkout page for booking tickets and snacks
function Checkout() {
  const nav = useNavigate()
  const { showId } = useParams()
  
  const show = shows.find(s => s.id === showId);
  const movie = show ? movies.find(m => m.id === show.movieId) : null;
  const theatre = show ? theatres.find(t => t.id === show.theatreId) : null;
  const [seats, setSeats] = useState<string[]>([])

  // If show or theatre is missing, show error and link home
  if (!show || !theatre || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-figma-bg text-white">
        <h1 className="text-2xl font-bold mb-4 text-figma-accent">Invalid or expired booking session</h1>
        <p className="mb-4 text-gray-400">We couldn't find your show or theatre details.</p>
        <Button onClick={() => nav('/')} variant="outline" className="text-white border-white/20 hover:bg-white/10">Go to Home</Button>
      </div>
    );
  }

  const [snacks, setSnacks] = useState<Record<string, number>>({})
  const [coupon, setCoupon] = useState('')
  const [method, setMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const getCardBrand = (number: string) => {
    const n = number.replace(/\D/g, '');
    if (/^4/.test(n)) return 'Visa';
    if (/^5[1-5]/.test(n)) return 'MasterCard';
    if (/^3[47]/.test(n)) return 'Amex';
    if (/^6/.test(n)) return 'Discover';
    return '';
  };
  const cardBrand = method === 'apple' ? 'Apple Card' : getCardBrand(cardDetails.number);

  useEffect(() => {
    const raw = sessionStorage.getItem('cinebook:checkout')
    if (!raw) { nav(`/seat/${showId}`); return }
    setSeats(JSON.parse(raw).seats || [])
  }, [])

  const subtotal = useMemo(() => {
    const seatCost = seats.length * show.price
    const snackCost = Object.entries(snacks).reduce((sum,[key,qty]) => {
      const [id, size] = key.split('_')
      const s = SNACKS.find(x => x.id === id)!
      const price = s.sizes.find(sz => sz.size === size)?.price || 0
      return sum + price * qty
    }, 0)
    return seatCost + snackCost
  }, [snacks, seats])

  const discount = coupon.trim().toUpperCase() === 'CINE10' ? Math.round(subtotal * 0.10) : 0
  const tax = Math.round((subtotal - discount) * 0.18)
  const total = subtotal - discount + tax // + booking fee? usually there is one.

  const changeSnack = (id: string, size: string, qty: number) => {
    setSnacks(prev => ({ ...prev, [`${id}_${size}`]: Math.max(0, qty) }))
  }

  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  
  const pay = async () => {
    setPaying(true);
    setTimeout(() => {
      setPaid(true);
      const booking = {
        id: crypto.randomUUID(),
        showId,
        theatreId: show.theatreId,
        seats,
        amount: total,
        time: new Date().toISOString()
      }
      const list = JSON.parse(localStorage.getItem('cinebook:bookings') || '[]')
      list.push(booking)
      localStorage.setItem('cinebook:bookings', JSON.stringify(list))
      setTimeout(() => {
        setPaying(false);
        setPaid(false);
        nav(`/ticket/${booking.id}`)
      }, 2000);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-figma-bg text-white pt-24 px-4 pb-20 selection:bg-figma-accent selection:text-white font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Order Details & Snacks */}
        <div className="md:col-span-2 space-y-6">
            {/* Movie Header Card */}
            <div className="bg-figma-card rounded-2xl p-6 border border-white/10 shadow-[0_0_20px_rgba(247,37,133,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-figma-accent"></div>
                <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                <div className="flex flex-wrap text-sm text-gray-400 gap-4 mb-4">
                    <span className="flex items-center gap-1">📍 {theatre.name}</span>
                    <span className="flex items-center gap-1">📅 {new Date(show.time).toLocaleString([], {weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})}</span>
                    <span className="text-figma-accent border border-figma-accent/30 px-2 rounded-full text-xs py-0.5">{show.speciality}</span>
                </div>
                <div className="text-gray-300">
                    Seats: <span className="text-white font-mono text-lg tracking-wider ml-2">{seats.join(', ')}</span> 
                    <span className="text-gray-500 text-xs ml-2">({seats.length} tickets)</span>
                </div>
            </div>

            {/* Snacks Section */}
            <div className="bg-figma-card rounded-2xl p-6 border border-white/10 shadow-[0_0_20px_rgba(247,37,133,0.1)]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    🍿 Add Snacks 
                    <span className="text-xs font-normal text-gray-500 ml-auto">Optional</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SNACKS.map(s => (
                        <div key={s.id} className="bg-white/5 rounded-xl p-3 border border-white/10 flex gap-3 hover:border-white/20 transition-colors">
                            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center p-1 shrink-0 border border-white/5">
                                {s.name === 'Popcorn' && <img src="/Popcorn.png" alt="Popcorn" className="w-full h-full object-contain drop-shadow-lg" />}
                                {s.name === 'Nachos' && <img src="/nachos.png" alt="Nachos" className="w-full h-full object-contain drop-shadow-lg" />}
                                {s.name === 'Coke' && <img src="/soda.png" alt="Coke" className="w-full h-full object-contain drop-shadow-lg" />}
                                {s.name === 'Water' && <img src="/water.png" alt="Water" className="w-full h-full object-contain drop-shadow-lg" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm text-white mb-2 truncate">{s.name}</h4>
                                <div className="space-y-2">
                                    {s.sizes.map(sz => {
                                        const qty = snacks[`${s.id}_${sz.size}`] || 0;
                                        return (
                                            <div key={sz.size} className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">{sz.size} <span className="text-gray-500">₹{sz.price}</span></span>
                                                <div className="flex items-center bg-black/20 rounded-lg overflow-hidden h-6 border border-white/5">
                                                    <button onClick={()=>changeSnack(s.id, sz.size, qty-1)} className={`w-6 h-full flex items-center justify-center hover:bg-white/10 ${qty>0?'text-figma-accent':'text-gray-500'}`}>-</button>
                                                    <span className="w-6 text-center font-mono text-white">{qty}</span>
                                                    <button onClick={()=>changeSnack(s.id, sz.size, qty+1)} className="w-6 h-full flex items-center justify-center hover:bg-white/10 text-figma-accent">+</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Col: Payment & Summary */}
        <div className="space-y-6">
             {/* Payment Methods */}
             <div className="bg-figma-card rounded-2xl p-6 border border-white/10 shadow-[0_0_20px_rgba(247,37,133,0.1)]">
                <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                        { value: 'card', label: 'Card' },
                        { value: 'upi', label: 'UPI' },
                        { value: 'paypal', label: 'PayPal' },
                        { value: 'google', label: 'GPay' },
                    ].map(opt => (
                        <button
                            key={opt.value}
                            onClick={()=>setMethod(opt.value)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                method === opt.value 
                                ? 'bg-figma-accent text-white shadow-[0_0_10px_rgba(247,37,133,0.4)]' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Card Fields */}
                {(method === 'card' || method === 'apple' || method === 'paypal') && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div>
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white placeholder-gray-600 focus:border-figma-accent focus:ring-1 focus:ring-figma-accent outline-none transition-all" 
                                placeholder="Card Number" 
                                value={cardDetails.number} 
                                onChange={e=>setCardDetails({...cardDetails, number: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-3">
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white placeholder-gray-600 focus:border-figma-accent focus:ring-1 focus:ring-figma-accent outline-none transition-all" 
                                placeholder="MM/YY" 
                                value={cardDetails.expiry} 
                                onChange={e=>setCardDetails({...cardDetails, expiry: e.target.value})}
                            />
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white placeholder-gray-600 focus:border-figma-accent focus:ring-1 focus:ring-figma-accent outline-none transition-all" 
                                placeholder="CVV" 
                                value={cardDetails.cvv} 
                                onChange={e=>setCardDetails({...cardDetails, cvv: e.target.value})}
                            />
                        </div>
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white placeholder-gray-600 focus:border-figma-accent focus:ring-1 focus:ring-figma-accent outline-none transition-all" 
                             placeholder="Name on Card" 
                             value={cardDetails.name} 
                             onChange={e=>setCardDetails({...cardDetails, name: e.target.value})}
                        />
                    </div>
                )}
                {/* UPI Fields */}
                {(method === 'upi' || method === 'google') && (
                     <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 h-10 text-sm text-white placeholder-gray-600 focus:border-figma-accent focus:ring-1 focus:ring-figma-accent outline-none transition-all" 
                             placeholder="example@upi" 
                        />
                     </div>
                )}
             </div>
             
             {/* Bill Summary */}
             <div className="bg-figma-card rounded-2xl p-6 border border-white/10 shadow-[0_0_20px_rgba(247,37,133,0.1)]">
                 <h3 className="text-lg font-bold text-white mb-4">Summary</h3>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400"><span>Subtotal</span> <span>₹{subtotal}</span></div>
                    
                    {/* Coupon Input */}
                    <div className="flex gap-2 my-2">
                        <input 
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 h-8 text-xs text-white uppercase placeholder-gray-600 focus:border-figma-accent outline-none transition-colors"
                            placeholder="COUPON (CASE SENSITIVE)"
                            value={coupon}
                            onChange={e=>setCoupon(e.target.value)}
                        />
                    </div>
                    {discount > 0 && <div className="flex justify-between text-figma-accent"><span>Discount</span> <span>-₹{discount}</span></div>}
                    
                    <div className="flex justify-between text-gray-400"><span>Tax (18%)</span> <span>₹{tax}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Convenience Fee</span> <span>₹50</span></div>
                    <div className="h-px bg-white/10 my-3"></div>
                    <div className="flex justify-between text-xl font-bold text-white"><span>Total</span> <span>₹{total + 50}</span></div>
                 </div>

                 <button
                    onClick={pay}
                    disabled={paying || paid}
                    className={`w-full mt-6 h-12 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 group shadow-[0_0_20px_rgba(247,37,133,0.4)] border border-white/10
                        ${paid ? 'bg-green-500 hover:bg-green-600 border-green-400' : 'bg-figma-accent hover:bg-pink-600 hover:shadow-[0_0_30px_rgba(247,37,133,0.6)]'}
                        disabled:opacity-80 disabled:cursor-not-allowed
                    `}
                 >
                    {paying ? (
                        <Loader2 className="animate-spin" />
                    ) : paid ? (
                        <>Payment Successful <Check size={18} /></>
                    ) : (
                        <>Pay ₹{total + 50}</>
                    )}
                 </button>
             </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
