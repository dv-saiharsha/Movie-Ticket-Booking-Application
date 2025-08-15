type Props = {
  id: string
  state: 'booked'|'suggested'|'selected'|'free'|'blocked'
  seatType?: 'economy'|'premium'|'premium-economy'|'accessible'|'recliner'|'s-class-teal'
  onClick?: () => void
}

import { MdEventSeat } from 'react-icons/md'

export default function Seat({ id, state, seatType, onClick }: Props) {

  // Color logic: selected=black, booked=red, suggested=lightgrey with darkred border, free=lightgrey with black border
  let color = ''
  let textColor = 'text-lightgrey'
  let border = ''
  let hover = ''
  // Add seat type color overlay
  let seatTypeBg = '';
  if (seatType === 'premium') seatTypeBg = 'ring-2 ring-purple-500';
  else if (seatType === 'premium-economy') seatTypeBg = 'ring-2 ring-green-500';
  else if (seatType === 'economy') seatTypeBg = 'ring-2 ring-yellow-400';
  else if (seatType === 'accessible') seatTypeBg = 'ring-2 ring-blue-500';
  else if (seatType === 'recliner') seatTypeBg = 'ring-2 ring-pink-500 bg-pink-100';
  else if (seatType === 's-class-teal') seatTypeBg = 'ring-2 ring-teal-400 bg-teal-100';

  switch (state) {
    case 'booked':
      color = 'bg-red';
      textColor = 'text-lightgrey';
      border = 'border border-red';
      break;
    case 'suggested':
      color = 'bg-lightgrey';
      textColor = 'text-darkred';
      border = 'border-2 border-darkred';
      // Ring hover for S Class, fill for recliner, ring for others
      hover = seatType === 'recliner'
        ? 'hover:bg-pink-400 hover:text-white hover:border-pink-500 hover:ring-0'
        : seatType === 's-class-teal'
          ? 'hover:ring-2 hover:ring-teal-400 hover:brightness-110'
          : 'hover:ring-2 hover:ring-darkred hover:brightness-110';
      break;
    case 'selected':
      if (seatType === 's-class-teal') {
        color = 'bg-teal-400';
        textColor = 'text-white';
        border = 'border-2 border-teal-500';
      } else {
        color = 'bg-darkred';
        textColor = 'text-lightgrey';
        border = 'border-2 border-black ring-2 ring-darkred';
      }
      break;
    case 'blocked':
      color = 'bg-lightgrey';
      textColor = 'text-darkred';
      border = 'border border-darkred opacity-50';
      break;
    default: // free
      color = 'bg-lightgrey';
      textColor = 'text-black';
      border = 'border border-black';
      // Ring hover for S Class, fill for recliner, ring for others
      hover = seatType === 'recliner'
        ? 'hover:bg-pink-400 hover:text-white hover:border-pink-500 hover:ring-0'
        : seatType === 's-class-teal'
          ? 'hover:ring-2 hover:ring-teal-400 hover:brightness-110'
          : 'hover:ring-2 hover:ring-darkred hover:brightness-110';
  }

  // Animation: scale up and shadow for selected/suggested
  let animate = ''
  if (state === 'selected') animate = 'scale-110 shadow-lg z-10'
  else if (state === 'suggested') animate = 'animate-pulse shadow-md z-10'

  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 m-0.5 rounded-sm ${color} ${border} ${hover} ${textColor} text-[10px] flex items-center justify-center transition-all duration-200 ease-in-out transform ${animate} ${seatTypeBg}`}
      disabled={state === 'booked' || state === 'blocked'}
      style={{ cursor: (state === 'booked' || state === 'blocked') ? 'not-allowed' : 'pointer' }}
      aria-label={seatType === 'accessible' ? 'Accessible Seat' : seatType === 'recliner' ? 'Recliner Seat' : undefined}
    >
  {seatType === 'recliner' ? <MdEventSeat className="text-pink-500 text-[15px]" title="Recliner" /> : seatType === 's-class-teal' ? <MdEventSeat className="text-teal-500 text-[15px]" title="S Class" /> : id.replace(/\D/g, '')}
    </button>
  )
}
