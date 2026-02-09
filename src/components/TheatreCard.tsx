
import Card from './ui/Card'
import { useNavigate } from 'react-router-dom'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'

export default function TheatreCard({ theatre, shows }: any) {
  const nav = useNavigate()

  const handleShowClick = (show: any) => {
    nav(`/seat/${show.id}`)
  }

  return (
    <Card className="!p-0 overflow-hidden shadow-md border border-white/10 bg-figma-card">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* Left: Theatre Info */}
        <div className="flex flex-col justify-center px-6 py-5 min-w-[220px] max-w-[320px] bg-white/5">
          <h3 className="font-bold text-xl text-white tracking-wide" title={theatre.name}>{theatre.name}</h3>
          <div className="flex gap-2 mt-3 flex-wrap">
            {theatre.tags.includes('IMAX') && <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold tracking-wider" title="IMAX">IMAX</span>}
            {theatre.tags.includes('Dolby Atmos') && <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[10px] font-bold flex items-center gap-1" title="Dolby Atmos"><SiDolby className="inline"/> Atmos</span>}
            {theatre.tags.includes('4K') && <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold flex items-center gap-1" title="4K"><Md4K className="inline text-lg"/> 4K</span>}
            {theatre.tags.includes('Laser 4K') && <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold flex items-center gap-1" title="Laser 4K">Laser 4K</span>}
            {theatre.tags.includes('EPIQ') && <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[10px] font-bold" title="EPIQ">EPIQ</span>}
          </div>
        </div>
        {/* Right: Showtimes Grid */}
        <div className="flex-1 px-4 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 place-items-center bg-figma-card">
          {shows.map((s: any) => (
            <button
              key={s.id}
              onClick={() => handleShowClick(s)}
              className={
                'w-full py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 border ' +
                (s.speciality === 'IMAX' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
                s.speciality === 'Dolby Atmos' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/50 hover:shadow-[0_0_10px_rgba(20,184,166,0.3)]' :
                s.speciality === '4K' ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                 s.speciality === 'EPIQ' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.3)]' :
                 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white shadow-sm hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]')
              }
              title={s.speciality}
            >
                <div className="text-sm font-bold text-gray-200 group-hover:text-white">{new Date(s.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[10px] opacity-70 mt-0.5 truncate">{s.speciality || '2D'}</div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
