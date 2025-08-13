type Props = {
  id: string
  state: 'booked'|'suggested'|'selected'|'free'|'blocked'
  onClick?: () => void
}

export default function Seat({ id, state, onClick }: Props) {

  // Color logic: selected=green, booked=red, suggested=blue, blocked=silver, free=matte/yellow border
  let color = ''
  let textColor = 'text-black'
  let border = ''
  let hover = ''
  switch (state) {
    case 'booked':
      color = 'bg-red-600';
      textColor = 'text-white';
      break;
    case 'suggested':
      color = 'bg-blue-500';
      textColor = 'text-white';
      hover = 'hover:ring-2 hover:ring-yellow hover:brightness-110';
      break;
    case 'selected':
      color = 'bg-green-500';
      textColor = 'text-white';
      break;
    case 'blocked':
      color = 'bg-silver';
      textColor = 'text-matte';
      break;
    default:
      color = 'bg-matte';
      textColor = 'text-silver';
      border = 'border border-yellow';
      hover = 'hover:bg-blue-500';
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
