
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { X, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';

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
  }, [location.state, location.search]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-24 pb-12 bg-figma-bg text-white selection:bg-figma-accent selection:text-white font-sans px-4">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-figma-accent pl-4 self-start max-w-6xl mx-auto w-full flex items-center gap-3">
        <Sparkles className="text-figma-accent" />
        Upcoming Events
      </h2>
      
      <div className="flex flex-wrap gap-8 justify-center w-full max-w-6xl">
        {events.map(ev => (
          <div key={ev.id} className="flex flex-col group min-w-[280px] max-w-sm w-full bg-figma-card rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(247,37,133,0.3)] hover:border-figma-accent/30 transition-all duration-300">
            <div className="h-40 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-figma-card to-transparent"></div>
                <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{ev.icon}</span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-figma-accent font-bold tracking-wider mb-1 uppercase">{ev.type}</div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-figma-accent transition-colors">{ev.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <MapPin size={14} /> {ev.location}
                    <span className="mx-1 text-white/20">•</span>
                    <Calendar size={14} /> {new Date(ev.date).getFullYear()}
                </div>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{ev.description}</p>
                <Button 
                    className="mt-auto w-full bg-white/5 hover:bg-figma-accent hover:text-white text-white border border-white/10 transition-all duration-300" 
                    onClick={() => { setEventModal(ev); setSelectedEventDate(null); }}
                >
                    View Details
                </Button>
            </div>
          </div>
        ))}
      </div>
      
      <footer className="mt-12 w-full text-center text-xs text-text-muted">
          Developed by Venkata Sai Harshith Danda
      </footer>

      {/* Modal */}
      {eventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setEventModal(null); setSelectedEventDate(null); }}></div>
          
          <div className="relative bg-figma-card rounded-3xl shadow-[0_0_50px_rgba(247,37,133,0.2)] p-6 md:p-8 max-w-md w-full border border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" 
                onClick={() => { setEventModal(null); setSelectedEventDate(null); }}
            >
                <X size={24} />
            </button>

            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 border border-white/10 shadow-inner">
                    {eventModal.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{eventModal.title}</h2>
                <div className="text-sm text-figma-accent font-medium">{eventModal.type} • {eventModal.location}</div>
            </div>

            <p className="text-gray-300 text-center text-sm mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                {eventModal.description}
            </p>

            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                    <Calendar size={14} /> Select Date
                </div>
                <div className="flex flex-wrap gap-2">
                  {getNextFiveOddDays().map((date, idx) => {
                     const isSelected = selectedEventDate && date.toDateString() === selectedEventDate.toDateString();
                     return (
                        <button
                            key={idx}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                                isSelected 
                                ? 'bg-figma-accent text-white border-figma-accent shadow-[0_0_15px_rgba(247,37,133,0.5)] scale-105' 
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-figma-accent/50 hover:text-white'
                            }`}
                            onClick={() => setSelectedEventDate(date)}
                        >
                            {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </button>
                     )
                  })}
                </div>
              </div>

              {selectedEventDate && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                    <Clock size={14} /> Select Time
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {eventModal.timings.map(time => (
                      <button 
                        key={time} 
                        className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10 hover:border-figma-accent hover:text-figma-accent text-xs font-bold transition-colors"
                      >
                          {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
                className="w-full mt-8 bg-figma-accent hover:bg-pink-600 text-white font-bold h-12 text-lg shadow-[0_0_20px_rgba(247,37,133,0.4)] border-none" 
                disabled={!selectedEventDate} 
                onClick={() => { setEventModal(null); setSelectedEventDate(null); }}
            >
                Book Tickets
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
