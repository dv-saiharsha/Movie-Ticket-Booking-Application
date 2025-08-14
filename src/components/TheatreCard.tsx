
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'
import { FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus, FaUser } from 'react-icons/fa'

export default function TheatreCard({ theatre, shows }: any) {
  const nav = useNavigate()
  const icons = [FaUser, FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus]
  const iconLabels = ['User', 'Cycle', 'Auto', 'Bike', 'Car', 'XL Car', 'XXL Car']

  const handleShowClick = (show: any) => {
    nav(`/seat/${show.id}`)
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
    </Card>
  )
}
