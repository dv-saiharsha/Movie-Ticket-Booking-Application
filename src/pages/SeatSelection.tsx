
// SeatSelection page: Lets user select seats for a show, with suggestions
import { useMemo, useState } from 'react'
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
  // State for ticket count, selected seats, and suggested seats
  const [count, setCount] = useState(initialCount)
  const [selected, setSelected] = useState<string[]>([])
  const [suggested, setSuggested] = useState<string[]>([])

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
            <span className="text-sm text-black">Tickets:</span>
            {/* Select number of tickets */}
            <select value={count} onChange={e=>{setCount(parseInt(e.target.value)); setSelected([]); setSuggested([])}} className="h-10 border-2 border-darkred text-black rounded-2xl px-3 focus:ring-2 focus:ring-darkred">
              {Array.from({length:6},(_,i)=>i+1).map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            {/* Suggest seats button */}
            <Button onClick={onSuggest} variant="outline">Suggest seats</Button>
            {/* Continue to checkout */}
            <Button onClick={proceed} className="bg-darkred text-lightgrey font-bold text-lg py-2 px-6 rounded-xl shadow hover:bg-red transition">Continue</Button>
          </div>
        </div>
      </Card>

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
