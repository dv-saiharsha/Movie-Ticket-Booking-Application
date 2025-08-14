
// ...existing code...


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

type EventModalType = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  icon: string;
  description: string;
  timings: string[];
};

function getNextFiveOddDays() {
  const days = [];
  let date = new Date();
  while (days.length < 5) {
    date.setDate(date.getDate() + 1);
    if (date.getDate() % 2 === 1) {
      days.push(new Date(date));
    }
  }
  return days;
}

const events = [
  {
    id: 'ev1',
    title: 'Sunburn Music Festival',
    type: 'Concert',
    date: '2025-12-28',
    location: 'Goa',
    icon: '☀️',
    description: 'Asia’s biggest electronic music festival, held every December in Goa.',
    timings: ['10:00 AM', '2:00 PM', '6:00 PM']
  },
  {
    id: 'ev2',
    title: 'Navratri Garba Night',
    type: 'Festival',
    date: '2025-10-10',
    location: 'Ahmedabad',
    icon: '💃',
    description: 'Traditional Garba and Dandiya event during Navratri, Gujarat.',
    timings: ['7:00 PM', '9:30 PM']
  },
  {
    id: 'ev3',
    title: 'Standup Comedy with Zakir Khan',
    type: 'Standup Comedy',
    date: '2025-09-15',
    location: 'Mumbai',
    icon: '😂',
    description: 'Laugh out loud with India’s top standup comedian.',
    timings: ['5:00 PM', '8:00 PM']
  },
  {
    id: 'ev4',
    title: 'Diwali Mela',
    type: 'Festival',
    date: '2025-11-01',
    location: 'Delhi',
    icon: '🎆',
    description: 'Celebrate Diwali with food, music, and fireworks.',
    timings: ['4:00 PM', '7:00 PM', '10:00 PM']
  },
  {
    id: 'ev5',
    title: 'Holi Bash',
    type: 'Festival',
    date: '2026-03-06',
    location: 'Bangalore',
    icon: '🎨',
    description: 'Colorful Holi party with DJs and rain dance.',
    timings: ['11:00 AM', '1:30 PM', '3:00 PM']
  },
];


export default function Events() {
  const [eventModal, setEventModal] = useState<EventModalType | null>(null);
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    let id = null;
    if (location.state && location.state.eventId) {
      id = location.state.eventId;
    } else {
      const params = new URLSearchParams(window.location.search);
      id = params.get('id');
    }
    if (id) {
      const ev = events.find(e => e.id === id);
      if (ev) {
        setEventModal(ev);
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-darkred mb-8">Events</h2>
      <div className="flex gap-6 flex-wrap justify-center">
        {events.map(ev => (
          <div key={ev.id} className="flex flex-col items-center min-w-[260px] max-w-xs p-4 border-2 border-darkred bg-white rounded-xl shadow mb-4">
            <span className="text-5xl mb-2" aria-label="event-icon">{ev.icon}</span>
            <h3 className="text-lg font-semibold text-darkred mb-1">{ev.title}</h3>
            <div className="text-xs text-black mb-1">{ev.type} • {ev.location}</div>
            <div className="text-xs text-black/60 mb-2">{new Date(ev.date).toLocaleDateString()}</div>
            <p className="text-xs text-black mb-2 line-clamp-2">{ev.description}</p>
            <Button className="bg-darkred text-lightgrey px-4 py-1 rounded-lg text-sm" onClick={() => { setEventModal(ev); setSelectedEventDate(null); }}>Book Now</Button>
          </div>
        ))}
      </div>
      {eventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full border-2 border-darkred relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-darkred text-2xl" onClick={() => { setEventModal(null); setSelectedEventDate(null); }}>&times;</button>
            <span className="text-6xl mb-2">{eventModal.icon}</span>
            <h2 className="text-xl font-bold text-darkred mb-1 text-center">{eventModal.title}</h2>
            <div className="text-xs text-black mb-1">{eventModal.type} • {eventModal.location}</div>
            <p className="text-xs text-black mb-4 text-center">{eventModal.description}</p>
            <div className="w-full mb-2">
              <div className="font-semibold text-darkred mb-1">Select Date:</div>
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                {getNextFiveOddDays().map((date, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-lg border border-darkred font-bold text-sm cursor-pointer transition-all duration-150 ${selectedEventDate && date.toDateString() === selectedEventDate.toDateString() ? 'bg-darkred text-lightgrey' : 'bg-lightgrey text-darkred hover:bg-darkred hover:text-lightgrey'}`}
                    onClick={() => setSelectedEventDate(date)}
                  >
                    {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
              {selectedEventDate && (
                <>
                  <div className="font-semibold text-darkred mb-1">Select Timing:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {eventModal.timings.map(time => (
                      <span key={time} className="px-3 py-1 rounded-lg border border-darkred bg-lightgrey text-darkred font-bold text-sm cursor-pointer hover:bg-darkred hover:text-lightgrey transition-all duration-150">{time}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Button className="bg-darkred text-lightgrey px-6 py-2 rounded-xl w-full mt-4 font-bold" disabled={!selectedEventDate} onClick={() => { setEventModal(null); setSelectedEventDate(null); }}>Proceed</Button>
          </div>
        </div>
      )}
    </div>
  );
}




