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
              <Badge key={t}>
                {t === 'Dolby Atmos' && <SiDolby className="inline-block mr-1 text-lg text-silver align-text-bottom" title="Dolby Atmos" />}
                {t === '4K' && <Md4K className="inline-block mr-1 text-lg text-yellow align-text-bottom" title="4K" />}
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {shows.map((s: any) => (
            <Link key={s.id} to={`/seat/${s.id}`}>
              <Button
                variant="outline"
                className="!bg-matte !text-silver !border-matte hover:!bg-matte/80 hover:!text-yellow hover:!border-yellow transition-colors duration-200 flex items-center gap-1"
              >
                {s.speciality === 'Dolby Atmos' && <SiDolby className="text-silver text-base" title="Dolby Atmos" />}
                {s.speciality === '4K' && <Md4K className="text-yellow text-base" title="4K" />}
                {new Date(s.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  )
}
