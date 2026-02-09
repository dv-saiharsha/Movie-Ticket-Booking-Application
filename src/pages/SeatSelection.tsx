
import { useMemo, useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Seat from '../components/Seat';
import ScreenArc from '../components/ScreenArc';
import { shows, theatres } from '../data/theaters';
import { movies } from '../data/movies';
import { suggestSeats } from '../lib/seatModel';

export default function SeatSelection() {
  const nav = useNavigate();
  const { showId } = useParams();
  
  const show = shows.find(s => s.id === showId);
  const movie = show ? movies.find(m => m.id === show.movieId) : null;
  const theatre = show ? theatres.find(t => t.id === show.theatreId) : null;
  
  const layout = useMemo(() => {
    if (!show || !theatre) return null;
    let l = theatre.layouts[show.layoutId];
    
    function getSortedLayouts() {
        const allLayouts = theatres.flatMap(t => Object.entries(t.layouts).map(([lid, ly]) => ({
          theatre: t,
          layoutId: lid,
          ...ly
        })));
        return allLayouts.sort((a, b) => (b.rows * b.cols) - (a.rows * a.cols));
    }

    if (show.speciality === 'IMAX') {
        const layouts = getSortedLayouts();
        if (layouts.length) l = layouts[0];
    } else if (show.speciality === 'Dolby Atmos') {
        const layouts = getSortedLayouts();
        if (layouts.length > 1) l = layouts[1];
    } else if (show.speciality === '4K') {
        const layouts = getSortedLayouts();
        if (layouts.length > 2) l = layouts[Math.floor(layouts.length/2)];
    }
    return l;
  }, [show, theatre]);

  const [count, setCount] = useState(2);
  const [selected, setSelected] = useState<string[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [showCountModal, setShowCountModal] = useState(true);
  const [loading, setLoading] = useState(false);

  // Use a default empty layout logic if show/theatre are missing to prevent Hook crashes
  const seatGrid = useMemo(() => {
    if (!layout || !show) return [];

    const cols = Array.from({ length: layout.cols }, (_, c) => c + 1);
    const baseRows = Array.from({ length: layout.rows }, (_, r) => String.fromCharCode(65 + r)).reverse();
    
    const rows = [...baseRows];
    const bookedSet = new Set(show.booked);
    const blockedSet = new Set(layout.blocked || []);
    
    return rows.map((r, rowIdx) => {
      // Visual Logic: Top 3 rows (back of hall) are premium, rest standard.
      // Modified for visual variety if IMAX
      let seatType: 'standard' | 'premium' | 's-class-teal' = (rowIdx < 3) ? 'premium' : 'standard';
      if (show.speciality === 'IMAX' && rowIdx === rows.length - 1) seatType = 's-class-teal';

      return cols.map(c => {
        const id = `${r}${c}`;
        const isBooked = bookedSet.has(id);
        const isBlocked = blockedSet.has(id);
        return { id, isBooked, isBlocked, seatType }; 
      });
    });
  }, [layout, show]);

  const onSuggest = () => {
    if (!layout || !show) return;
    const ids = suggestSeats(layout, show.booked, count);
    setSuggested(ids);
    setSelected(ids);
  };

  const toggleSeat = (id: string, isBooked: boolean, isBlocked: boolean) => {
    if (isBooked || isBlocked) return;
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id));
    } else {
      if (selected.length >= count) {
         // Auto-shift selection
         const newSel = [...selected.slice(1), id];
         setSelected(newSel);
      } else {
         setSelected(prev => [...prev, id]);
      }
    }
  };

  const proceed = () => {
    if (selected.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('cinebook:checkout', JSON.stringify({ showId, seats: selected }));
      nav(`/checkout/${showId}`);
    }, 600);
  };
  
  if (!show || !theatre || !layout || !movie) return <div className="min-h-screen bg-figma-bg text-white flex items-center justify-center">Show not found</div>;

  
  return (
    <div className="min-h-screen bg-figma-bg text-white font-sans selection:bg-figma-accent selection:text-white pb-32">
        {/* Loading overlay */}
        {loading && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-figma-accent shadow-[0_0_20px_rgba(247,37,133,0.5)]"></span>
            </div>
        )}

        {/* Modal: How many seats? */}
        {showCountModal && !loading && (
            <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
                setLoading(true);
                setTimeout(() => { setShowCountModal(false); setLoading(false); }, 400);
            }} />
            
            <div className="relative z-10 w-full md:w-auto bg-figma-card md:rounded-3xl rounded-t-3xl border md:border border-t border-white/20 shadow-[0_0_50px_rgba(247,37,133,0.2)] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-figma-accent to-transparent opacity-100"></div>
                <div className="p-8 flex flex-col items-center min-w-[340px]">
                    <h2 className="text-xl font-bold text-white mb-8 tracking-wider">How many seats?</h2>
                    
                    <div className="relative mb-10 w-full mx-auto flex justify-center py-6">
                         {/* Neon glow behind number */}
                         <div className="absolute inset-0 bg-figma-accent/20 blur-xl rounded-full transform scale-75"></div>
                        <div className="text-6xl text-figma-accent drop-shadow-[0_0_10px_rgba(247,37,133,0.8)] font-black relative z-10">
                            {count}
                        </div>
                    </div>

                    <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-full border border-white/10">
                        {[1,2,3,4,5,6].map(n => (
                            <button
                            key={n}
                            onClick={() => setCount(n)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                                count === n 
                                ? 'bg-figma-accent text-white scale-110 shadow-[0_0_15px_rgba(247,37,133,0.6)]' 
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                            >
                            {n}
                            </button>
                        ))}
                    </div>

                    <Button 
                        className="w-full bg-figma-accent text-white hover:bg-pink-600 font-bold h-12 text-lg shadow-[0_0_20px_rgba(247,37,133,0.4)] border border-white/10"
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => { setShowCountModal(false); setLoading(false); onSuggest(); }, 400);
                        }}
                    >
                        Select Seats
                    </Button>
                </div>
            </div>
            </div>
        )}

        {/* Header */}
        <div className="sticky top-0 z-40 bg-figma-bg/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-900/5">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
                        {movie.title}
                        <span className="text-xs font-normal text-figma-accent border border-figma-accent/50 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(247,37,133,0.3)]">
                           {show.speciality || '2D'}
                        </span>
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        {theatre.name} • {new Date(show.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
                <button 
                    onClick={() => setShowCountModal(true)}
                    className="text-sm px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-white flex items-center gap-2"
                >
                    {count} Seats <span className="text-figma-accent">▼</span>
                </button>
            </div>
        </div>

        {/* Info Legend */}
        <div className="w-full bg-white/5 border-b border-white/10 py-2">
             <div className="max-w-4xl mx-auto px-4 flex justify-center gap-6 text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-gray-600 bg-figma-bg"></div> Available</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-figma-accent shadow-[0_0_8px_rgba(247,37,133,0.8)]"></div> Selected</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-600/50"></div> Sold</div>
             </div>
        </div>

        {/* Screen Area */}
        <div className="max-w-5xl mx-auto px-4 pt-10 overflow-x-hidden">
            <ScreenArc />
            
            <div className="mt-12 w-full overflow-x-auto pb-12 scrollbar-thin scrollbar-thumb-figma-accent/30 scrollbar-track-transparent">
                <div className="min-w-max mx-auto flex flex-col items-center gap-1.5">
                    {seatGrid.map((row, rIdx) => (
                        <div key={rIdx} className="flex flex-nowrap items-center gap-3 md:gap-4">
                            <div className="w-4 text-[10px] font-bold text-gray-500 text-center uppercase">
                                {row[0]?.id.replace(/[0-9]/g, '')}
                            </div>
                            <div className="flex gap-1 md:gap-1.5">
                                {row.map(seat => {
                                    let state: any = 'free';
                                    if (seat.isBlocked) state = 'blocked';
                                    else if (seat.isBooked) state = 'booked';
                                    else if (selected.includes(seat.id)) state = 'selected';
                                    
                                    return (
                                        <Seat 
                                            key={seat.id}
                                            id={seat.id}
                                            state={state}
                                            seatType={seat.seatType as any}
                                            onClick={() => toggleSeat(seat.id, seat.isBooked, seat.isBlocked)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Catgegory Badge */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap pb-24">
                 <div className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/10">
                    Standard <span className="text-white font-bold ml-1">₹{show.price}</span>
                 </div>
                 <div className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/10">
                    Premium <span className="text-white font-bold ml-1">₹{show.price + 100}</span>
                 </div>
            </div>
        </div>

        {/* Bottom Booking Bar */}
        {selected.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-figma-card border-t border-white/10 p-4 safe-area-pb shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <div className="text-xs text-figma-accent font-medium mb-0.5 tracking-wider">PAYABLE AMOUNT</div>
                        <div className="text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">₹{selected.length * (show.price + 50)}</div>
                    </div>
                    <Button 
                        size="lg" 
                        onClick={proceed}
                        className="bg-figma-accent text-white hover:bg-pink-600 shadow-[0_0_20px_rgba(247,37,133,0.5)] font-bold text-base px-10 rounded-xl border border-white/10"
                    >
                        Book {selected.length} Tickets
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
}
