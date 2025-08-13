
// MyTickets page: Shows all tickets/bookings for the current user
import Card from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { shows, theatres } from '../data/theaters'
import { movies } from '../data/movies'

// Ticket icon component
const TicketIcon = () => (
  <img src="/ticket.png" alt="Ticket" className="w-6 h-6 inline-block mr-1 align-text-bottom" />
)

export default function MyTickets() {
  // Get all bookings from localStorage
  const bookings = JSON.parse(localStorage.getItem('cinebook:bookings') || '[]')

  // Show message if no tickets booked
  if (!bookings.length) {
    return <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="container py-6">No tickets yet.</div>
      <footer className="w-full text-center py-4 text-xs text-silver bg-transparent">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  }

  // Render all tickets as cards
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="container py-6 grid gap-4 grid-cols-1 text-black">
        {bookings.map((b:any) => {
          // Find show, theatre, and movie for each booking
          const show = shows.find(s => s.id === b.showId)!
          const theatre = theatres.find(t => t.id === b.theatreId)!
          const movie = movies.find(m => m.id === show.movieId)!
          return (
            <Card key={b.id} className="flex items-center justify-between bg-white border-orange text-black">
              <div>
                <div className="font-semibold text-black">{movie.title}</div>
                <div className="text-sm text-black/80">{theatre.name}  {new Date(show.time).toLocaleString()}</div>
                <div className="text-sm text-black/80">Seats: {b.seats.join(', ')}</div>
              </div>
              {/* Link to ticket details page */}
              <Link to={`/ticket/${b.id}`} className="text-yellow hover:underline flex items-center gap-1"><TicketIcon />View</Link>
            </Card>
          )
        })}
      </div>
      <footer className="w-full text-center py-4 text-xs text-silver bg-transparent">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
