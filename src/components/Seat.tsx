type Props = {
  id: string
  state: 'booked'|'suggested'|'selected'|'free'|'blocked'
  onClick?: () => void
}

export default function Seat({ id, state, onClick }: Props) {

  // Color logic: selected=black, booked=red, suggested=lightgrey with darkred border, free=lightgrey with black border
  let color = ''
  let textColor = 'text-lightgrey'
  let border = ''
  let hover = ''
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
      hover = 'hover:ring-2 hover:ring-darkred hover:brightness-110';
      break;
    case 'selected':
      color = 'bg-darkred';
      textColor = 'text-lightgrey';
      border = 'border-2 border-black ring-2 ring-darkred';
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
      hover = 'hover:ring-2 hover:ring-darkred hover:brightness-110';
  }

  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 m-0.5 rounded-sm ${color} ${border} ${hover} ${textColor} text-[10px] flex items-center justify-center transition`}
      disabled={state === 'booked' || state === 'blocked'}
      style={{ cursor: (state === 'booked' || state === 'blocked') ? 'not-allowed' : 'pointer' }}
    >
      {id.replace(/\D/g, '')}
    </button>
  )
}
