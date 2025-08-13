import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { Link } from 'react-router-dom'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'

export default function TheatreCard({ theatre, shows }: any) {
  return (
    <Card>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold">{theatre.name}</h3>
          <div className="mt-1 flex flex-wrap gap-2 items-center">
            {theatre.tags.map((t: string) => (
              <span key={t} className="inline-block">
                {t === 'Dolby Atmos' && (
                  <SiDolby
                    className="text-lg align-text-bottom"
                    style={{ color: '#00e6e6', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}
                    title="Dolby Atmos"
                  />
                )}
                {t === '4K' && (
                  <Md4K
                    className="text-lg align-text-bottom"
                    style={{ color: '#facc15', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}
                    title="4K"
                  />
                )}
                {t === 'IMAX' && (
                  <span
                    className="text-lg align-text-bottom font-extrabold tracking-widest"
                    style={{ color: '#1976d2', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}
                    title="IMAX"
                  >IMAX</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {shows.map((s: any) => (
            <Link key={s.id} to={`/seat/${s.id}`}>
              <Button
                variant="outline"
                className="!bg-matte !text-silver !border-matte hover:!bg-matte/80 hover:!text-yellow hover:!border-yellow transition-all duration-150 ease-in-out flex items-center gap-1"
              >
                {s.speciality === 'Dolby Atmos' && (
                  <SiDolby
                    className="text-base align-text-bottom"
                    style={{ color: '#00e6e6', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}
                    title="Dolby Atmos"
                  />
                )}
                {s.speciality === '4K' && (
                  <Md4K
                    className="text-base align-text-bottom"
                    style={{ color: '#facc15', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}
                    title="4K"
                  />
                )}
                {s.speciality === 'IMAX' && (
                  <span
                    className="text-base align-text-bottom font-extrabold tracking-widest"
                    style={{ color: '#1976d2', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}
                    title="IMAX"
                  >IMAX</span>
                )}
                {new Date(s.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  )
}
