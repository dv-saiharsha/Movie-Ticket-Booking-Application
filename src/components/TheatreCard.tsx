

import Card from './ui/Card'
import Button from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function TheatreCard({ theatre, shows }: any) {
  const nav = useNavigate()

  const handleShowClick = (show: any) => {
    nav(`/seat/${show.id}`)
  }

  return (
    <Card className="!p-0 overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="flex flex-col md:flex-row">
        {/* Left: Theatre Info */}
        <div className="flex flex-col justify-center px-6 py-5 min-w-[220px] max-w-[320px] border-r border-slate-200 bg-white/80">
          <h3 className="font-bold text-xl text-darkred" title={theatre.name}>{theatre.name}</h3>
          <div className="flex gap-2 mt-2">
            {theatre.tags.includes('IMAX') && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shadow-sm" title="IMAX">IMAX</span>}
            {theatre.tags.includes('Dolby Atmos') && <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center gap-1 shadow-sm" title="Dolby Atmos"><SiDolby className="inline text-base text-teal-600"/>Dolby</span>}
            {theatre.tags.includes('4K') && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1 shadow-sm" title="4K"><Md4K className="inline text-base text-red-600"/>4K</span>}
            {theatre.tags.includes('Laser 4K') && <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-400 via-red-400 to-yellow-300 text-white text-xs font-bold flex items-center gap-1 shadow-lg border border-red-300 animate-pulse" title="Laser 4K">Laser 4K</span>}
            {theatre.tags.includes('EPIQ') && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold shadow-sm" title="EPIQ">EPIQ</span>}
          </div>
        </div>
        {/* Right: Showtimes Grid */}
        <div className="flex-1 px-4 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 place-items-center bg-gradient-to-br from-slate-50 to-slate-100">
          {shows.map((s: any) => (
            <button
              key={s.id}
              onClick={() => handleShowClick(s)}
              className={
                'rounded-full px-4 py-2 font-semibold text-sm shadow-md border-2 transition-all duration-150 flex items-center gap-2 ' +
                (s.speciality === 'IMAX' ? 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100' :
                s.speciality === 'Dolby Atmos' ? 'bg-teal-50 border-teal-300 text-teal-900 hover:bg-teal-100' :
                s.speciality === '4K' ? 'bg-red-50 border-red-300 text-red-900 hover:bg-red-100 font-bold ring-2 ring-red-200' :
                 s.speciality === 'EPIQ' ? 'bg-yellow-50 border-yellow-300 text-yellow-900 hover:bg-yellow-100' :
                 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200')
              }
              title={s.speciality}
            >
              {s.speciality === 'Dolby Atmos' && <SiDolby className="text-base align-text-bottom text-teal-600" title="Dolby Atmos" />}
              {s.speciality === '4K' && <Md4K className="text-base align-text-bottom text-red-600" title="4K" />}
              {s.speciality === 'IMAX' && <span className="text-base align-text-bottom font-extrabold tracking-widest text-blue-700" title="IMAX">IMAX</span>}
              {s.speciality === 'EPIQ' && <span className="text-base align-text-bottom font-extrabold tracking-widest text-yellow-700" title="EPIQ">EPIQ</span>}
              <span>{new Date(s.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
