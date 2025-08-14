
// SeatSelection page: Lets user select seats for a show, with suggestions
import { useMemo, useState } from 'react'
import { FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus, FaUser } from 'react-icons/fa'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Seat from '../components/Seat'
import ScreenArc from '../components/ScreenArc'
import { shows, theatres } from '../data/theaters'
import { suggestSeats } from '../lib/seatModel'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'

export default function SeatSelection() {
  const icons = [FaUser, FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus]
  const nav = useNavigate() // Navigation hook
  const { showId } = useParams() // Get show ID from URL
  const location = useLocation()
  // Get ticket count from query param if present
  const urlParams = new URLSearchParams(location.search)
  const initialCount = parseInt(urlParams.get('count') || '1', 10)
  // Find show, theatre, and layout
  const show = shows.find(s => s.id === showId)!
  const theatre = theatres.find(t => t.id === show.theatreId)!
  const layout = theatre.layouts[show.layoutId]
  // State for ticket count, selected seats, suggested seats, and modal
  const [count, setCount] = useState(initialCount)
  const [selected, setSelected] = useState<string[]>([])
  const [suggested, setSuggested] = useState<string[]>([])
  const [showCountModal, setShowCountModal] = useState(true)

  // Build seat grid with booked/blocked info
  const seatGrid = useMemo(() => {
    const rows = Array.from({ length: layout.rows }, (_, r) => String.fromCharCode(65 + r))
    const cols = Array.from({ length: layout.cols }, (_, c) => c + 1)
    const bookedSet = new Set(show.booked)
    const blockedSet = new Set(layout.blocked || [])
    return rows.map(r => cols.map(c => {
      const id = `${r}${c}`
      const isBooked = bookedSet.has(id)
      const isBlocked = blockedSet.has(id)
      return { id, isBooked, isBlocked }
    }))
  }, [layout, show])

  // Suggest best seats using heuristic
  const onSuggest = () => {
    const ids = suggestSeats(layout, show.booked, count)
    setSuggested(ids)
    setSelected(ids)
  }

  // Toggle seat selection
  const toggleSeat = (id: string) => {
    if (show.booked.includes(id)) return
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id))
    } else {
      if (selected.length >= count) return
      setSelected(prev => [...prev, id])
    }
  }

  // Proceed to checkout if all seats selected
  const proceed = () => {
    if (selected.length < count) {
      alert('Please select all seats')
      return
    }
    sessionStorage.setItem('cinebook:checkout', JSON.stringify({ showId, seats: selected }))
    nav(`/checkout/${showId}`)
  }

  // Render seat selection UI
  return (
    <div className="container py-6 space-y-4 text-black bg-lightgrey ">
      {/* Ticket count modal */}
      {showCountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={()=>setShowCountModal(false)} />
          <div className="relative z-10 bg-lightgrey rounded-2xl shadow-2xl p-8 min-w-[380px] flex flex-col items-center border-2 border-darkred">
            <h4 className="text-3xl font-extrabold text-black mb-4 tracking-wide">How many seats?</h4>
            {/* Show only the selected vehicle icon, large and centered */}
            <div className="mb-4 flex items-center justify-center">
              {(() => {
                const Icon = icons[count-1] || FaUser;
                return <Icon className="text-6xl text-darkred drop-shadow" />
              })()}
            </div>
            <div className="flex gap-4 mb-6">
              {[1,2,3,4,5,6].map(n => (
                <button
                  key={n}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold border-2 transition-all duration-150 ${count===n ? 'bg-red text-white border-red shadow-lg scale-110' : 'bg-white text-black border-slate-300 hover:border-red'} focus:outline-none`}
                  onClick={()=>setCount(n)}
                  aria-label={`Select ${n} seats`}
                >
                  {n}
                </button>
              ))}
            </div>
            <Button onClick={()=>setShowCountModal(false)} className="w-full mt-2 bg-red text-white font-bold text-lg py-3 rounded-xl shadow hover:bg-darkred transition">Select Seats</Button>
          </div>
        </div>
      )}
      {/* Main content only visible when modal is closed */}
      {!showCountModal && (
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-darkred">{theatre.name}</h2>
              <p className="text-sm text-darkred flex items-center gap-1">
                {new Date(show.time).toLocaleString()} •
                {show.speciality === 'Dolby Atmos' && <SiDolby className="text-darkred text-base" title="Dolby Atmos" />}
                {show.speciality === '4K' && <Md4K className="text-darkred text-base" title="4K" />}
                {show.speciality} • ₹{show.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Tickets: {count}</span>
              <Button onClick={onSuggest} variant="outline">Suggest seats</Button>
              <Button onClick={proceed} className="bg-darkred text-lightgrey font-bold text-lg py-2 px-6 rounded-xl shadow hover:bg-red transition">Continue</Button>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <ScreenArc />
        <div className="w-full flex flex-col items-center">
          <div className="text-green text-base font-semibold mb-2">Screen this way</div>
          <div className="inline-block p-2 rounded-2xl">
            {/* Render seat grid */}
            {seatGrid.map((row, i) => {
              // Center each row by adding left margin based on the difference between max and current row length
              const maxCols = layout.cols;
              const rowLength = row.length;
              const seatSize = 28; // w-6 + m-0.5 (24px + 4px)
              const totalWidth = maxCols * seatSize;
              const rowWidth = rowLength * seatSize;
              const marginLeft = (totalWidth - rowWidth) / 2;
              return (
                <div key={i} className="flex items-center justify-center">
                  {/* Row label */}
                  <span className="w-6 text-xs font-bold text-darkred drop-shadow">{String.fromCharCode(65+i)}</span>
                  <div className="flex" style={{ marginLeft }}>
                    {row.map(c => {
                      const state = c.isBlocked ? 'blocked'
                        : c.isBooked ? 'booked'
                        : selected.includes(c.id) ? 'selected'
                        : suggested.includes(c.id) ? 'suggested'
                        : 'free'
                      return <Seat key={c.id} id={c.id} state={state as any} onClick={() => toggleSeat(c.id)} />
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Reset and Continue buttons */}
          {selected.length > 0 && (
            <div className="mt-4 flex gap-4 justify-center">
              <Button onClick={()=>{setSelected([]);}} className="bg-red text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-darkred transition">Reset Seats</Button>
              <Button onClick={proceed} className="bg-darkred text-lightgrey font-bold px-6 py-2 rounded-xl shadow hover:bg-red transition">Continue</Button>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-error" />Booked</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-lightgrey border-2 border-darkred" />Suggested</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-darkred border-2 border-black" />Selected</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 border border-black bg-lightgrey inline-block rounded-sm" />Free</div>
        </div>
      </Card>
  <footer className="w-full text-center py-4 text-xs text-black">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
