
// Ticket page: Shows ticket details and QR code for entry
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import { QRCodeSVG } from 'qrcode.react'
import { shows, theatres } from '../data/theaters'
import { movies } from '../data/movies'
import { SiDolby } from 'react-icons/si'
import { Md4K } from 'react-icons/md'


export default function Ticket() {
  // Get booking ID from URL
  const { bookingId } = useParams()
  // State for booking details
  const [booking, setBooking] = useState<any>(null)

  // On mount, load booking from localStorage
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('cinebook:bookings') || '[]')
    const b = list.find((x: any) => x.id === bookingId)
    setBooking(b)
  }, [bookingId])

  // Show message if booking not found
  if (!booking) return (
    <div className="min-h-screen flex flex-col justify-between bg-slate">
      <div className="container py-6">Booking not found.</div>
      <footer className="w-full text-center py-4 text-xs text-silver bg-transparent">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )

  // Find show, theatre, and movie for this booking
  const show = shows.find(s => s.id === booking.showId)!
  const theatre = theatres.find(t => t.id === booking.theatreId)!
  const movie = movies.find(m => m.id === show.movieId)!

  // Render ticket details and QR code
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate">
      <div className="container py-6">
        <Card className="max-w-xl mx-auto bg-matte border-matte text-silver">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-2xl font-bold text-yellow tracking-wide">{movie.title}</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-yellow font-semibold text-lg">{theatre.name}</span>
              <span className="text-silver flex items-center gap-1">
                • {new Date(show.time).toLocaleString()} •
                {show.speciality === 'Dolby Atmos' && <SiDolby className="text-silver text-base" title="Dolby Atmos" />}
                {show.speciality === '4K' && <Md4K className="text-yellow text-base" title="4K" />}
                {show.speciality}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              {/* Show seat numbers */}
              <div className="mb-2">
                <span className="text-sm text-silver">Seats</span>
                <div className="font-semibold text-lg text-yellow">{booking.seats.join(', ')}</div>
              </div>
              {/* Show theatre location */}
              <div className="mb-2">
                <span className="text-sm text-silver">Location</span>
                <div className="text-silver font-semibold">{theatre.location.state}{theatre.location.district?', '+theatre.location.district:''}{theatre.location.village?', '+theatre.location.village:''}</div>
              </div>
              {/* Show QR code */}
              <div className="mt-4">
                <QRCodeSVG value={JSON.stringify(booking)} size={96} />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <footer className="w-full text-center py-4 text-xs text-silver bg-transparent">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
