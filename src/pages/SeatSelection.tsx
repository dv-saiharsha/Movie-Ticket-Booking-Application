
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
    // Add a dedicated accessible row between premium and premium economy
    const totalRows = layout.rows + 1;
    const cols = Array.from({ length: layout.cols }, (_, c) => c + 1);
    // Build row labels (A, B, ..., N, O for accessible row)
    const baseRows = Array.from({ length: layout.rows }, (_, r) => String.fromCharCode(65 + r)).reverse();
    const accessibleRowLabel = String.fromCharCode(65 + layout.rows); // e.g., 'O' if 14 rows
    // Section counts
    const economyRows = 3;
    const premiumRows = 4;
    const accessibleRowIdx = economyRows + premiumRows;
    // Insert accessible row label at correct position
    const rows = [...baseRows];
    rows.splice(accessibleRowIdx, 0, accessibleRowLabel);
    const bookedSet = new Set(show.booked)
    const blockedSet = new Set(layout.blocked || [])
    const wheelchairSet = new Set(layout.wheelchair || [])
    return rows.map((r, rowIdx) => {
      let seatType: 'economy'|'premium'|'accessible'|'premium-economy';
      if (rowIdx < economyRows) seatType = 'economy';
      else if (rowIdx < economyRows + premiumRows) seatType = 'premium';
      else if (rowIdx === accessibleRowIdx) seatType = 'accessible';
      else seatType = 'premium-economy';
      return cols.map(c => {
        const id = `${r}${c}`
        const isBooked = bookedSet.has(id)
        const isBlocked = blockedSet.has(id)
        const isWheelchair = seatType === 'accessible' ? true : wheelchairSet.has(id)
        return { id, isBooked, isBlocked, isWheelchair, seatType }
      })
    })
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
          <div className="inline-block p-2 rounded-2xl w-full">
            {/* Render seat grid */}
            {(() => {
              const economyRows = 3;
              const premiumRows = 4;
              const accessibleRowIdx = economyRows + premiumRows;
              const sectionBoundaries = [0, economyRows, economyRows + premiumRows, economyRows + premiumRows + 1];
              const sectionNames = [
                { name: 'Economy', color: 'bg-yellow-400' },
                { name: 'Premium', color: 'bg-purple-500' },
                { name: 'Accessible', color: 'bg-blue-500' },
                { name: 'Premium Economy', color: 'bg-green-500' }
              ];
              let sectionIdx = 0;
              let content: JSX.Element[] = [];
              for (let i = 0; i < seatGrid.length; i++) {
                // Insert a spacer row and section label before the first row of each section
                if (sectionBoundaries.includes(i)) {
                  const idx = sectionBoundaries.indexOf(i);
                  content.push(
                    <div key={`section-space-${idx}`} className="flex items-center justify-center my-2">
                      <span className="w-6" />
                      <div className="flex-1 flex justify-center">
                        <span className="flex items-center gap-2 px-4 py-1 rounded bg-gray-50 border text-xs font-bold shadow-sm"
                          style={{ color: sectionNames[idx].color.replace('bg-', 'text-'), borderColor: sectionNames[idx].color.replace('bg-', 'border-') }}>
                          <span className={`inline-block w-3 h-3 rounded-full ${sectionNames[idx].color}`}></span>
                          {sectionNames[idx].name}
                        </span>
                      </div>
                    </div>
                  );
                }
                const row = seatGrid[i];
                const maxCols = layout.cols;
                const rowLength = row.length;
                const seatSize = 28;
                const totalWidth = maxCols * seatSize;
                const rowWidth = rowLength * seatSize;
                const marginLeft = (totalWidth - rowWidth) / 2;
                const rowLabel = seatGrid[i][0].id.replace(/\d+$/, '');
                content.push(
                  <div key={i} className="flex items-center justify-center">
                    <span className="w-6 text-xs font-bold text-darkred drop-shadow">{rowLabel}</span>
                    <div className="flex items-center" style={{ marginLeft }}>
                      {row.map(c => {
                        const state = c.isBlocked ? 'blocked'
                          : c.isBooked ? 'booked'
                          : selected.includes(c.id) ? 'selected'
                          : suggested.includes(c.id) ? 'suggested'
                          : 'free'
                        return <Seat key={c.id} id={c.id} state={state as any} isWheelchair={c.isWheelchair} seatType={c.seatType} onClick={() => toggleSeat(c.id)} />
                      })}
                    </div>
                  </div>
                );
              }
              return content;
            })()}
          </div>
          {/* Reset and Continue buttons */}
          {selected.length > 0 && (
            <div className="mt-4 flex gap-4 justify-center">
              <Button onClick={()=>{setSelected([]);}} className="bg-red text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-darkred transition">Reset Seats</Button>
              <Button onClick={proceed} className="bg-darkred text-lightgrey font-bold px-6 py-2 rounded-xl shadow hover:bg-red transition">Continue</Button>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between w-full text-sm">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-error" />Booked</div>
            <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-lightgrey border-2 border-darkred" />Suggested</div>
            <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-darkred border-2 border-black" />Selected</div>
            <div className="flex items-center gap-1"><span className="w-4 h-4 border border-black bg-lightgrey inline-block rounded-sm" />Free</div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-yellow-400 bg-gray-200 mr-1"></span>Economy</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-purple-500 bg-gray-200 mr-1"></span>Premium</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-green-500 bg-gray-200 mr-1"></span>Premium Economy</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-blue-500 bg-gray-200 mr-1"></span>Accessible</span>
          </div>
        </div>
      </Card>
  <footer className="w-full text-center py-4 text-xs text-black">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
