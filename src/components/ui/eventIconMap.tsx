// EventIconMap: mapping of event type/id to icon component
import { FaSun, FaLaughBeam, FaPalette, FaMusic, FaFire, FaRegLaughBeam } from 'react-icons/fa';
import { GiFireworkRocket, GiPartyPopper } from 'react-icons/gi';
import { MdCelebration } from 'react-icons/md';

export const eventIconMap: Record<string, JSX.Element> = {
  'sunburn': <FaSun className="text-3xl text-yellow-400" title="Sunburn" />,
  'diwali': <GiFireworkRocket className="text-3xl text-orange-500" title="Diwali Fireworks" />,
  // No Garba/Dhol icon available, fallback to party popper
  'garba': <GiPartyPopper className="text-3xl text-pink-500" title="Garba Dance" />,
  'holi': <FaPalette className="text-3xl text-fuchsia-500" title="Holi Colors" />,
  'standup': <FaLaughBeam className="text-3xl text-amber-500" title="Standup Comedy" />,
  'music': <FaMusic className="text-3xl text-blue-500" title="Music Event" />,
  'festival': <MdCelebration className="text-3xl text-green-500" title="Festival" />,
  'party': <GiPartyPopper className="text-3xl text-purple-500" title="Party" />,
};
