
// React hooks and required components
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { shows, theatres } from '../data/theaters'


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
  const nav = useNavigate() // Navigation hook
  const { showId } = useParams() // Get show ID from URL
  // Find the show and theatre details
  const show = shows.find(s => s.id === showId);
  const theatre = show ? theatres.find(t => t.id === show.theatreId) : null;
  // State for selected seats
  const [seats, setSeats] = useState<string[]>([])

  // If show or theatre is missing, show error and link home
  if (!show || !theatre) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-lightgrey text-darkred">
        <h1 className="text-2xl font-bold mb-4">Invalid or expired booking session</h1>
        <p className="mb-4">We couldn't find your show or theatre details. Please start your booking again.</p>
        <a href="/" className="px-6 py-3 bg-darkred text-white rounded-xl font-semibold shadow hover:bg-red transition">Go to Home</a>
      </div>
    );
  }
  // State for snacks: { [snackId_size]: qty }
  const [snacks, setSnacks] = useState<Record<string, number>>({})
  // State for coupon code
  const [coupon, setCoupon] = useState('')
  // State for payment method
  const [method, setMethod] = useState('card')
  // State for card details
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' })
  // Card brand detection
  const getCardBrand = (number: string) => {
    const n = number.replace(/\D/g, '');
    if (/^4/.test(n)) return 'Visa';
    if (/^5[1-5]/.test(n)) return 'MasterCard';
    if (/^3[47]/.test(n)) return 'Amex';
    if (/^6/.test(n)) return 'Discover';
    return '';
  };
  const cardBrand = method === 'apple' ? 'Apple Card' : getCardBrand(cardDetails.number);

  // On mount, load selected seats from sessionStorage or redirect if not found
  useEffect(() => {
    const raw = sessionStorage.getItem('cinebook:checkout')
    if (!raw) { nav(`/seat/${showId}`); return }
    setSeats(JSON.parse(raw).seats || [])
  }, [])

  // Calculate subtotal (seats + snacks)
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

  // Calculate discount if coupon is applied
  const discount = coupon.trim().toUpperCase() === 'CINE10' ? Math.round(subtotal * 0.10) : 0
  // Calculate tax (18%)
  const tax = Math.round((subtotal - discount) * 0.18)
  // Calculate total amount
  const total = subtotal - discount + tax

  // Update snack quantity
  const changeSnack = (id: string, size: string, qty: number) => {
    setSnacks(prev => ({ ...prev, [`${id}_${size}`]: Math.max(0, qty) }))
  }

  // Payment animation state
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  // Simulate payment and save booking to localStorage
  const pay = async () => {
    setPaying(true);
    setTimeout(() => {
      setPaid(true);
      // Simulate payment success
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
    }, 900);
  }

  // Render checkout UI
  return (
  <div className="container py-6 space-y-4 min-h-screen text-black bg-lightgrey">
      <Card>
  <h2 className="text-xl font-semibold mb-2 text-darkred">Order Summary</h2>
  <p className="text-sm text-darkred">{theatre.name} • {new Date(show.time).toLocaleString()} • {show.speciality}</p>
  <div className="mt-4 space-y-1 text-sm text-black">
          {/* Seats summary */}
          <div>Seats: <strong>{seats.join(', ')}</strong> × ₹{show.price}</div>
          <div className="mt-2">
            <h3 className="font-medium mb-2">Snacks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* List all snacks with size and quantity controls */}
              {SNACKS.map(s => (
                <div key={s.id} className="border border-darkred rounded-2xl p-2 flex items-center gap-3">
                  {/* Snack image */}
                  {s.name === 'Popcorn' && <img src="/Popcorn.png" alt="Popcorn" className="w-10 h-10 object-contain" />}
                  {s.name === 'Nachos' && <img src="/nachos.png" alt="Nachos" className="w-10 h-10 object-contain" />}
                  {s.name === 'Coke' && <img src="/soda.png" alt="Coke" className="w-10 h-10 object-contain" />}
                  {s.name === 'Water' && <img src="/water.png" alt="Water" className="w-10 h-10 object-contain" />}
                  <div className="flex-1">
                    <span className="text-darkred font-semibold">{s.name}</span>
                    <div className="flex flex-col gap-1 mt-2">
                      {s.sizes.map(sz => (
                        <div key={sz.size} className="flex items-center justify-between">
                          <span className="text-xs text-black">{sz.size} - ₹{sz.price}</span>
                          <div className="flex items-center gap-2">
                            {/* Quantity controls for each snack size */}
                            <button className="w-7 h-7 rounded-full text-darkred font-bold" onClick={()=>changeSnack(s.id, sz.size, (snacks[`${s.id}_${sz.size}`]||0)-1)}>-</button>
                            <span className="w-5 text-center text-darkred">{snacks[`${s.id}_${sz.size}`]||0}</span>
                            <button className="w-7 h-7 rounded-full text-darkred font-bold" onClick={()=>changeSnack(s.id, sz.size, (snacks[`${s.id}_${sz.size}`]||0)+1)}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Coupon input */}
          <div className="mt-4">
            <label className="text-sm block mb-1 text-black">Coupon code</label>
            <input className="h-10 border border-darkred rounded-2xl px-3 text-black placeholder-darkred/60" value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="CINE10" />
          </div>
          {/* Payment method selection */}
          <div className="mt-4">
            <label className="text-sm block mb-1 text-black">Payment method</label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'card', label: 'Credit / Debit Card', icons: ["/credit-card.gif"] },
                { value: 'upi', label: 'UPI', icons: ["/cashless-payment.png"] },
                { value: 'paypal', label: 'PayPal', icons: ["/paypal.png"] },
                { value: 'apple', label: 'Apple Pay', icons: ["/apple-pay.png"] },
                { value: 'google', label: 'Google Pay', icons: ["/google-pay.png"] },
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl border border-darkred font-semibold transition-all duration-150 ease-in-out ${method === opt.value ? 'bg-darkred text-white' : ''}`}
                  onClick={()=>setMethod(opt.value)}
                  type="button"
                >
                  {opt.label}
                  {opt.icons && opt.icons.map((icon, i) => (
                    <img key={icon} src={icon} alt={opt.label + ' icon'} className="w-7 h-7 object-contain ml-2" />
                  ))}
                </button>
              ))}
            </div>
          </div>

          {/* Card details fields for all payment modes except UPI/Google Pay */}
          {(method === 'card' || method === 'apple' || method === 'paypal') && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-black">Card Number {cardBrand && <span className="ml-2 text-xs text-darkred font-bold">({cardBrand === 'Apple Card' ? 'Apple Card' : cardBrand})</span>}</label>
                <div className="relative">
                  <input className="w-full h-10 border border-darkred rounded-2xl px-3 pr-20 text-black placeholder-darkred/60" maxLength={19} placeholder="1234 5678 9012 3456" value={cardDetails.number} onChange={e=>setCardDetails(d=>({...d,number:e.target.value}))} />
                  {(method === 'card' || method === 'apple') && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <img src="/amex.png" alt="Amex" className="w-7 h-7 object-contain" />
                      <img src="/business.png" alt="Business" className="w-7 h-7 object-contain" />
                      <img src="/visa.png" alt="Visa" className="w-7 h-7 object-contain" />
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm text-black">Name on Card</label>
                <input className="w-full h-10 border border-darkred rounded-2xl px-3 text-black placeholder-darkred/60" placeholder="Name" value={cardDetails.name} onChange={e=>setCardDetails(d=>({...d,name:e.target.value}))} />
              </div>
              <div>
                <label className="text-sm text-silver">Expiry</label>
                <input className="w-full h-10 border border-yellow rounded-2xl px-3 text-silver placeholder-yellow/60" maxLength={5} placeholder="MM/YY" value={cardDetails.expiry} onChange={e=>setCardDetails(d=>({...d,expiry:e.target.value}))} />
              </div>
              <div>
                <label className="text-sm text-silver">CVV</label>
                <input className="w-full h-10 border border-yellow rounded-2xl px-3 text-silver placeholder-yellow/60" maxLength={4} placeholder="CVV" value={cardDetails.cvv} onChange={e=>setCardDetails(d=>({...d,cvv:e.target.value}))} />
              </div>
            </div>
          )}
          {/* For other payment methods, prompt for required details */}
          {(method === 'upi' || method === 'paypal' || method === 'google') && (
            <div className="mt-4">
              <label className="text-sm text-black">Enter {method === 'upi' ? 'UPI ID' : method === 'paypal' ? 'PayPal Email' : 'Google Pay Number'}</label>
              <input className="w-full h-10 border border-darkred rounded-2xl px-3 text-black placeholder-darkred/60" placeholder={method === 'upi' ? 'yourname@upi' : method === 'paypal' ? 'email@example.com' : '9876543210'} />
            </div>
          )}
          {/* Order summary */}
          <div className="mt-4 border-t border-night-700 pt-4">
            <div className="flex justify-between"><span className="text-night-700">Subtotal</span><span className="text-night-700">₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-night-700">Discount</span><span className="text-night-400">-₹{discount}</span></div>
            <div className="flex justify-between"><span className="text-night-700">Tax (18%)</span><span className="text-night-700">₹{tax}</span></div>
            <div className="flex justify-between font-semibold text-lg mt-1 text-night-700"><span>Total</span><span>₹{total}</span></div>
          </div>
          {/* Pay button with green fill and checkmark on success */}
          <button
            className={`w-full mt-4 font-bold text-lg py-3 rounded-xl shadow transition relative flex items-center justify-center
              ${paid ? 'bg-green-600 text-white' : paying ? 'bg-green-500 text-white' : 'bg-darkred text-lightgrey hover:bg-red'}`}
            onClick={pay}
            disabled={paying || paid}
            style={{ cursor: paying || paid ? 'wait' : 'pointer', minHeight: 56 }}
          >
            {paid ? (
              <span className="flex items-center justify-center w-full animate-fade-in">
                <img src="/checkmark.png" alt="Success" className="w-8 h-8 mr-2" />
                Payment Successful
              </span>
            ) : (
              <span className={paying ? 'opacity-70' : ''}>Pay ₹{total}</span>
            )}
          </button>
          <div className="mt-4 text-xs text-night-400">* Snack prices vary by size. Payment options are shown above. Card details required for card payments.</div>
        </div>
      </Card>
    </div>
  )
}

export default Checkout
