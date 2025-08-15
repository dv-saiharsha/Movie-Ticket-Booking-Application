import { useMemo, useState } from 'react';
import { FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus, FaUser } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Seat from '../components/Seat';
import ScreenArc from '../components/ScreenArc';
import { shows, theatres } from '../data/theaters';
import { suggestSeats } from '../lib/seatModel';
import { SiDolby } from 'react-icons/si';
import { Md4K } from 'react-icons/md';

export default function SeatSelection() {
  const icons = [FaUser, FaBicycle, FaMotorcycle, FaCar, FaShuttleVan, FaBus];
  const nav = useNavigate();
  const { showId } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialCount = parseInt(urlParams.get('count') || '1', 10);
  const show = shows.find(s => s.id === showId)!;
  let theatre = theatres.find(t => t.id === show.theatreId)!;
  let layout = theatre.layouts[show.layoutId];

  function getSortedLayouts() {
    const allLayouts = theatres.flatMap(t => Object.entries(t.layouts).map(([lid, l]) => ({
      theatre: t,
      layoutId: lid,
      ...l
    })));
    return allLayouts.sort((a, b) => (b.rows * b.cols) - (a.rows * a.cols));
  }
  if (show.speciality === 'IMAX') {
    const layouts = getSortedLayouts();
    if (layouts.length) {
      layout = { rows: layouts[0].rows, cols: layouts[0].cols, aisles: layouts[0].aisles, blocked: layouts[0].blocked, wheelchair: layouts[0].wheelchair };
      theatre = layouts[0].theatre;
    }
  } else if (show.speciality === 'Dolby Atmos') {
    const layouts = getSortedLayouts();
    if (layouts.length > 1) {
      layout = { rows: layouts[1].rows, cols: layouts[1].cols, aisles: layouts[1].aisles, blocked: layouts[1].blocked, wheelchair: layouts[1].wheelchair };
      theatre = layouts[1].theatre;
    }
  } else if (show.speciality === '4K') {
    const layouts = getSortedLayouts();
    if (layouts.length > 2) {
      const mid = Math.floor(layouts.length / 2);
      layout = { rows: layouts[mid].rows, cols: layouts[mid].cols, aisles: layouts[mid].aisles, blocked: layouts[mid].blocked, wheelchair: layouts[mid].wheelchair };
      theatre = layouts[mid].theatre;
    }
  }
  const [count, setCount] = useState(initialCount);
  const [selected, setSelected] = useState<string[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [showCountModal, setShowCountModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const seatGrid = useMemo(() => {
    const cols = Array.from({ length: layout.cols }, (_, c) => c + 1);
    const baseRows = Array.from({ length: layout.rows }, (_, r) => String.fromCharCode(65 + r)).reverse();
    const economyRows = 3;
    const premiumRows = 4;
    const rows = [...baseRows];
    const bookedSet = new Set(show.booked);
    const blockedSet = new Set(layout.blocked || []);
    return rows.map((r, rowIdx) => {
      let seatType: 'economy'|'premium'|'premium-economy';
      if (rowIdx < economyRows) seatType = 'economy';
      else if (rowIdx < economyRows + premiumRows) seatType = 'premium';
      else seatType = 'premium-economy';
      return cols.map(c => {
        const id = `${r}${c}`;
        const isBooked = bookedSet.has(id);
        const isBlocked = blockedSet.has(id);
        return { id, isBooked, isBlocked, seatType };
      });
    });
  }, [layout, show]);

  const onSuggest = () => {
    const ids = suggestSeats(layout, show.booked, count);
    setSuggested(ids);
    setSelected(ids);
  };

  const toggleSeat = (id: string) => {
    if (show.booked.includes(id)) return;
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id));
    } else {
      if (selected.length >= count) return;
      setSelected(prev => [...prev, id]);
    }
  };

  const proceed = () => {
    if (selected.length < count) {
      alert('Please select all seats');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('cinebook:checkout', JSON.stringify({ showId, seats: selected }));
      nav(`/checkout/${showId}`);
    }, 600);
  };

  return (
    <div className="container py-6 space-y-4 text-black bg-lightgrey ">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-darkred"></span>
        </div>
      )}
      {/* Ticket count modal */}
      {showCountModal && !loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setShowCountModal(false);
              setLoading(false);
            }, 600);
          }}></div>
          <div className="relative z-10 bg-lightgrey rounded-2xl shadow-2xl p-8 min-w-[380px] flex flex-col items-center border-2 border-darkred">
            <h4 className="text-3xl font-extrabold text-black mb-4 tracking-wide">How many seats?</h4>
            <div className="mb-4 flex items-center justify-center">
              {(() => {
                const Icon = icons[count-1] || FaUser;
                return <Icon className="text-6xl text-darkred drop-shadow" />;
              })()}
            </div>
            <div className="flex gap-4 mb-6">
              {[1,2,3,4,5,6].map(n => (
                <button
                  key={n}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold border-2 transition-all duration-150 ${count===n ? 'bg-red text-white border-red shadow-lg scale-110' : 'bg-white text-black border-slate-300 hover:border-red'} focus:outline-none`}
                  onClick={()=>setCount(n)}
                  aria-label={`Select ${n} seats`}
                >
                  {n}
                </button>
              ))}
            </div>
            <Button onClick={() => {
              setLoading(true);
              setTimeout(()=>{
                setShowCountModal(false);
                setLoading(false);
              }, 600);
            }} className="w-full mt-2 bg-red text-white font-bold text-lg py-3 rounded-xl shadow hover:bg-darkred transition">Select Seats</Button>
          </div>
        </div>
      )}
      {/* Main content only visible when modal is closed */}
      {!showCountModal && !loading && (
        <>
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-darkred">{theatre.name}</h2>
                <p className="text-sm text-darkred flex items-center gap-1">
                  {new Date(show.time).toLocaleString()} •
                  {show.speciality === 'Dolby Atmos' && <SiDolby className="text-darkred text-base" title="Dolby Atmos" />}
                  {show.speciality === '4K' && <Md4K className="text-darkred text-base" title="4K" />}
                  {show.speciality} • ₹{show.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-black">Tickets: {count}</span>
              </div>
            </div>
          </Card>
          <Card>
            <ScreenArc />
            <div className="w-full flex flex-col items-center">
              <div className="text-green text-base font-semibold mb-2">Screen this way</div>
              <div className="inline-block p-2 rounded-2xl w-full">
                {/* Render seat grid */}
                {(() => {
                  const economyRows = 3;
                  const premiumRows = 4;
                  const sectionBoundaries = [0, economyRows, economyRows + premiumRows];
                  const sectionNames = [
                    { name: 'Economy', color: 'bg-yellow-400' },
                    { name: 'Premium', color: 'bg-purple-500' },
                    { name: 'Premium Economy', color: 'bg-green-500' }
                  ];
                  let content: JSX.Element[] = [];
                  const isIMAX = show.speciality === 'IMAX';
                  const totalRows = seatGrid.length;
                  for (let i = 0; i < seatGrid.length; i++) {
                    // S CLASS label in the same format as Premium Economy, above the S Class rows (last 3 rows)
                    if (isIMAX && i === totalRows - 3) {
                      content.push(
                        <div key="imax-sclass-label-dot" className="flex items-center justify-center my-2">
                          <span className="w-6" />
                          <div className="flex-1 flex justify-center">
                            <span className="flex items-center gap-2 px-4 py-1 rounded bg-gray-50 border text-xs font-bold shadow-sm text-teal-600 border-teal-400">
                              <span className="inline-block w-3 h-3 rounded-full bg-teal-400"></span>
                              S CLASS
                            </span>
                          </div>
                        </div>
                      );
                    }
                    // Section labels for all screens (except S CLASS, which is handled above)
                    if (sectionBoundaries.includes(i) && !(isIMAX && i === totalRows - 3)) {
                      const idx = sectionBoundaries.indexOf(i);
                      content.push(
                        <div key={`section-space-${idx}`} className="flex items-center justify-center my-2">
                          <span className="w-6" />
                          <div className="flex-1 flex justify-center">
                            <span className="flex items-center gap-2 px-4 py-1 rounded bg-gray-50 border text-xs font-bold shadow-sm"
                              style={{ color: sectionNames[idx].color.replace('bg-', 'text-'), borderColor: sectionNames[idx].color.replace('bg-', 'border-') }}>
                              <span className={`inline-block w-3 h-3 rounded-full ${sectionNames[idx].color}`}></span>
                              {sectionNames[idx].name}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    const row = seatGrid[i];
                    const maxCols = layout.cols;
                    const rowLength = row.length;
                    const seatSize = 28;
                    const totalWidth = maxCols * seatSize;
                    const rowWidth = rowLength * seatSize;
                    const marginLeft = (totalWidth - rowWidth) / 2;
                    const rowLabel = seatGrid[i][0].id.replace(/\d+$/, '');
                    // Add a vertical gap after every row for all seat maps
                    content.push(
                      <div key={`gap-row-${i}`} className="h-3" />
                    );
                    // For IMAX, last 3 rows: use seatType='recliner' for pink S Class color
                    const sClassRow = isIMAX && i >= totalRows - 3;
                    content.push(
                      <div key={i} className="flex items-center justify-center">
                        <span className="w-6 text-xs font-bold text-darkred drop-shadow">{rowLabel}</span>
                        <div className="flex items-center" style={{ marginLeft }}>
                          {row.map(c => {
                            const state = c.isBlocked ? 'blocked'
                              : c.isBooked ? 'booked'
                              : selected.includes(c.id) ? 'selected'
                              : suggested.includes(c.id) ? 'suggested'
                              : 'free';
                            // For IMAX last 3 rows, pass seatType='recliner' to Seat, but with teal color
                            return <Seat key={c.id} id={c.id} state={state as any} seatType={sClassRow ? 's-class-teal' : c.seatType} onClick={() => toggleSeat(c.id)} />;
                          })}
                        </div>
                      </div>
                    );
                  }
                  return content;
                })()}
              </div>
              <div className="mt-6 flex w-full max-w-lg mx-auto justify-between items-center gap-2">
                <Button onClick={() => setSelected([])} className="flex-1 bg-red text-white font-bold py-3 rounded-xl shadow hover:bg-darkred transition disabled:opacity-50" disabled={selected.length === 0}>Reset Seats</Button>
                <Button onClick={onSuggest} className="flex-1 bg-yellow-400 text-darkred font-bold py-3 rounded-xl shadow hover:bg-yellow-500 transition border-2 border-darkred" variant="outline">Suggest Seats</Button>
                <Button onClick={proceed} className="flex-1 bg-darkred text-lightgrey font-bold py-3 rounded-xl shadow hover:bg-red transition disabled:opacity-50" disabled={selected.length === 0}>Proceed</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between w-full text-sm">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-error" />Booked</div>
                  <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-lightgrey border-2 border-darkred" />Suggested</div>
                  <div className="flex items-center gap-1"><span className="w-4 h-4 inline-block rounded-sm bg-darkred border-2 border-black" />Selected</div>
                  <div className="flex items-center gap-1"><span className="w-4 h-4 border border-black bg-lightgrey inline-block rounded-sm" />Free</div>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-yellow-400 bg-gray-200 mr-1"></span>Economy</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-purple-500 bg-gray-200 mr-1"></span>Premium</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-green-500 bg-gray-200 mr-1"></span>Premium Economy</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-400 flex items-center"><span className="inline-block w-3 h-3 rounded-sm ring-2 ring-teal-300 bg-gray-200 mr-1"></span>S CLASS</span>
                </div>
              </div>
            </div>
          </Card>
          <footer className="w-full text-center py-4 text-xs text-black">Developed by Venkata Sai Harshith Danda</footer>
        </>
      )}
    </div>
  );
}


