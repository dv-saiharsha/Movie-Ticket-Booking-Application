
// Seat Component: Represents a single seat in the grid
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SeatProps {
  id: string;
  state: 'free' | 'selected' | 'booked' | 'blocked' | 'suggested';
  seatType: 'standard' | 'premium' | 's-class-teal' | 'recliner';
  onClick: () => void;
}

export default function Seat({ id, state, seatType = 'standard', onClick }: SeatProps) {
  
  if (state === 'blocked') {
     return <div className="w-6 h-6 m-1 md:w-8 md:h-8" />; // Invisible spacer
  }

  // Base styles matching the circle style
  const baseStyles = "w-6 h-6 md:w-7 md:h-7 m-0.5 rounded-full text-[10px] flex items-center justify-center cursor-pointer transition-all duration-300 relative font-medium";
  
  let styles = '';
  
  switch(state) {
      case 'booked':
         styles = "bg-white/10 text-white/20 cursor-not-allowed border-none"; // Dark grey for booked
         break;
      case 'selected':
          styles = "bg-figma-accent text-white shadow-[0_0_10px_rgba(247,37,133,0.8)] scale-110 z-10 border border-pink-400"; // Neon pink for selected
          break;
      case 'suggested':
          styles = "bg-figma-accent/20 text-figma-accent ring-2 ring-figma-accent/50"; 
          break;
      case 'free':
      default:
          styles = "bg-white/5 border border-white/10 text-transparent hover:text-white/50 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"; // Translucent for free
          
          if (seatType === 'premium') {
              styles += " border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 shadow-[0_0_5px_rgba(168,85,247,0.1)]";
          } else if (seatType === 's-class-teal') {
              styles += " border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 shadow-[0_0_5px_rgba(20,184,166,0.1)]";
          }
          break;
  }

  return (
    <motion.div
        whileTap={state !== 'booked' ? { scale: 0.9 } : {}}
        onClick={state !== 'booked' ? onClick : undefined}
        className={clsx(baseStyles, styles)}
        title={`${id} (${seatType})`}
    >
        {/* Seat ID is transparent usually, visible on hover */}
        {id.replace(/[0-9]/g, '')}
    </motion.div>
  );
}
