
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'
import { FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus, FaUser } from 'react-icons/fa'

export default function TheatreCard({ theatre, shows }: any) {
  const [popupShow, setPopupShow] = useState<any>(null)
  const [ticketCount, setTicketCount] = useState(1)
  const nav = useNavigate()
  const icons = [FaUser, FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus]
  const iconLabels = ['User', 'Cycle', 'Auto', 'Bike', 'Car', 'XL Car', 'XXL Car']

  const handleShowClick = (show: any) => {
    setPopupShow(show)
    setTicketCount(1)
  }

  const handleBook = () => {
    // Pass ticketCount and showId to seat selection
    nav(`/seat/${popupShow.id}?count=${ticketCount}`)
    setPopupShow(null)
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold">{theatre.name}</h3>
          <div className="mt-1 flex flex-wrap gap-2 items-center">
            {theatre.tags.map((t: string) => (
              <span key={t} className="inline-block">
                {t === 'Dolby Atmos' && (
                  <SiDolby className="text-lg align-text-bottom text-darkred" title="Dolby Atmos" />
                )}
                {t === '4K' && (
                  <Md4K className="text-lg align-text-bottom text-red" title="4K" />
                )}
                {t === 'IMAX' && (
                  <span className="text-lg align-text-bottom font-extrabold tracking-widest text-black" title="IMAX">IMAX</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {shows.map((s: any) => (
            <Button
              key={s.id}
              variant="outline"
              className="text-darkred border-darkred hover:bg-red/20 transition-all duration-150 ease-in-out flex items-center gap-1"
              onClick={() => handleShowClick(s)}
            >
              {s.speciality === 'Dolby Atmos' && <SiDolby className="text-base align-text-bottom text-teal" title="Dolby Atmos" />}
              {s.speciality === '4K' && <Md4K className="text-base align-text-bottom text-lightteal" title="4K" />}
              {s.speciality === 'IMAX' && <span className="text-base align-text-bottom font-extrabold tracking-widest text-darkteal" title="IMAX">IMAX</span>}
              {new Date(s.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Button>
          ))}
        </div>
      </div>
      {/* Popup for ticket count selection */}
      {popupShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-lightgrey rounded-2xl shadow-xl p-6 min-w-[320px] flex flex-col items-center border-2 border-darkred">
            <h4 className="text-lg font-bold text-darkred mb-2">How many tickets?</h4>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5,6].map(n => {
                const Icon = icons[n-1] || FaUser
                return (
                  <button
                    key={n}
                    className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl border-2 font-bold ${ticketCount===n?'bg-darkred text-lightgrey border-black ring-2 ring-darkred':'bg-lightgrey text-black border-darkred'} transition`}
                    onClick={()=>setTicketCount(n)}
                  >
                    <Icon className="text-2xl mb-1" />
                    <span className="text-xs font-semibold">{n}</span>
                  </button>
                )
              })}
            </div>
            <div className="text-xs text-black mb-4">1 ticket per person</div>
            <div className="flex gap-4">
              <Button onClick={handleBook} className="bg-darkred text-lightgrey px-6 font-bold hover:bg-red transition">Book</Button>
              <Button variant="outline" onClick={()=>setPopupShow(null)} className="border-darkred text-darkred font-bold hover:bg-red/10 transition">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
