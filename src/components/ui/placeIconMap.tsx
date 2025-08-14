// PlaceIconMap: mapping of city names to icon components
// Add more icons as needed for famous cities
import { FaMonument, FaLandmark, FaUmbrellaBeach, FaBuilding, FaCity } from 'react-icons/fa'

// Temple icon for South Indian temple cities
const TempleIcon = <FaMonument className="text-xl text-darkred" title="Temple" />;

export const placeIconMap: Record<string, JSX.Element> = {
  'Delhi': <FaLandmark className="text-xl text-darkred" title="India Gate" />,
  'Agra': <FaLandmark className="text-xl text-darkred" title="Taj Mahal" />,
  'Mumbai': <FaBuilding className="text-xl text-darkred" title="Gateway of India" />,
  'Chennai': TempleIcon,
  'Madurai': TempleIcon,
  'Kanchipuram': TempleIcon,
  'Rameswaram': TempleIcon,
  'Thanjavur': TempleIcon,
  'Coimbatore': TempleIcon,
  'Tiruchirappalli': TempleIcon,
  'Kanyakumari': TempleIcon,
  'Tirupati': TempleIcon,
  'Thiruvananthapuram': TempleIcon,
  'Kochi': TempleIcon,
  'Kollam': TempleIcon,
  'Thrissur': TempleIcon,
  'Palakkad': TempleIcon,
  'Alappuzha': TempleIcon,
  'Kottayam': TempleIcon,
  'Hyderabad': <FaMonument className="text-xl text-darkred" title="Charminar" />,
  'Visakhapatnam': <FaUmbrellaBeach className="text-xl text-darkred" title="RK Beach" />,
  'Vizag': <FaUmbrellaBeach className="text-xl text-darkred" title="RK Beach" />,
  'Kolkata': <FaLandmark className="text-xl text-darkred" title="Victoria Memorial" />,
  'Pune': <FaCity className="text-xl text-darkred" title="Shaniwar Wada" />,
}
