export type Show = {
  id: string
  movieId: string
  theatreId: string
  time: string // ISO datetime
  speciality: '4K' | 'Dolby Atmos' | 'EPIQ' | 'IMAX'
  price: number
  layoutId: string
  booked: string[] // seat ids
}

export type Theatre = {
  id: string
  name: string
  location: { state: string; district?: string; village?: string }
  layouts: Record<string, { rows: number; cols: number; aisles?: number[]; blocked?: string[]; wheelchair?: string[] }>
  tags: string[]
}

export const theatres: Theatre[] = [
  {
    id: 'th5',
    name: 'Regal Cinemas - Agali',
    location: { state: 'Andhra Pradesh', district: 'Anantapur', village: 'Agali' },
    layouts: {
  'L6': { rows: 12, cols: 10, aisles: [5], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['4K']
  },
  {
    id: 'th6',
    name: 'Cityplex - Anakapalle',
    location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Anakapalle' },
    layouts: {
  'L7': { rows: 14, cols: 12, aisles: [6], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['Dolby Atmos']
  },
  {
    id: 'th1',
    name: 'CineGalaxy - Hitech',
    location: { state: 'Karnataka', district: 'Bengaluru Urban', village: 'Yelahanka' },
    layouts: {
  'L1': { rows: 14, cols: 16, aisles: [8], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
  'L2': { rows: 16, cols: 20, aisles: [10], blocked: ['A1','A2','A3'], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['Dolby Atmos','4K']
  },
  {
    id: 'th2',
    name: 'MegaPlex - Vizag',
    location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Bheemunipatnam' },
    layouts: {
  'L3': { rows: 12, cols: 14, aisles: [7], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['IMAX','EPIQ']
  },
  {
    id: 'th3',
    name: 'Star Cinemas - Anantapur',
    location: { state: 'Andhra Pradesh', district: 'Anantapur', village: 'Amarapuram' },
    layouts: {
  'L4': { rows: 13, cols: 12, aisles: [6], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['4K']
  },
  {
    id: 'th4',
    name: 'Skyline Movies - Jakkur',
    location: { state: 'Karnataka', district: 'Bengaluru Urban', village: 'Jakkur' },
    layouts: {
  'L5': { rows: 11, cols: 10, aisles: [5], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] },
    },
    tags: ['Dolby Atmos']
  },
  // --- Added Theatres ---
    { id: 'th7', name: 'INOX - Vizag', location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Vizag' }, layouts: { 'L8': { rows: 16, cols: 18, aisles: [9], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K'] },
    { id: 'th8', name: 'PVR - Vizag', location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Vizag' }, layouts: { 'L9': { rows: 15, cols: 20, aisles: [10], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K'] },
  { id: 'th9', name: 'AMB Cinemas - Vizag', location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Vizag' }, layouts: { 'L10': { rows: 18, cols: 20, aisles: [10], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K','EPIQ'] },
    { id: 'th10', name: 'Jagadamba - Vizag', location: { state: 'Andhra Pradesh', district: 'Visakhapatnam', village: 'Vizag' }, layouts: { 'L11': { rows: 12, cols: 14, aisles: [7], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','EPIQ'] },
    { id: 'th11', name: 'Sudarshan - Hyderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Hyderabad' }, layouts: { 'L12': { rows: 14, cols: 16, aisles: [8], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['Dolby Atmos','4K'] },
    { id: 'th12', name: 'Bhramaramba - Hyderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Hyderabad' }, layouts: { 'L13': { rows: 13, cols: 15, aisles: [8], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['Dolby Atmos','4K'] },
    { id: 'th13', name: 'PVR - Hyderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Hyderabad' }, layouts: { 'L14': { rows: 17, cols: 20, aisles: [10], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K'] },
    { id: 'th14', name: 'AAA Cinemas - Hyderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Hyderabad' }, layouts: { 'L15': { rows: 12, cols: 14, aisles: [7], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['4K','EPIQ'] },
    { id: 'th15', name: 'ART Cinemas - Hyderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Hyderabad' }, layouts: { 'L16': { rows: 13, cols: 15, aisles: [8], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['Dolby Atmos','4K','EPIQ'] },
  { id: 'th16', name: 'AMB Cinemas - Secunderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Secunderabad' }, layouts: { 'L17': { rows: 18, cols: 20, aisles: [10], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K','EPIQ'] },
    { id: 'th17', name: 'INOX - Secunderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Secunderabad' }, layouts: { 'L18': { rows: 16, cols: 18, aisles: [9], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K'] },
    { id: 'th18', name: 'PVR - Secunderabad', location: { state: 'Telangana', district: 'Hyderabad', village: 'Secunderabad' }, layouts: { 'L19': { rows: 17, cols: 20, aisles: [10], blocked: [], wheelchair: ['E6','E7','E8','E9','E10','E11'] } }, tags: ['IMAX','Dolby Atmos','4K'] },
]


// PROGRAMMATIC SHOW GENERATION
import { movies } from './movies'

// For major theatres, use more showtimes
const majorTheatreIds = ['th7','th8','th9','th10','th13','th16','th17','th18'];
const timeSlotsMajor = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,23.983]; // 18 shows
const timeSlots = [9, 12, 15, 18, 21, 23.983]; // 6 shows (default)

const allSpecialities: Show['speciality'][] = ['4K', 'Dolby Atmos', 'EPIQ', 'IMAX']


export const shows: Show[] = [];
let showId = 1;
const today = new Date();
today.setHours(0,0,0,0);
theatres.forEach(theatre => {
  const layoutIds = Object.keys(theatre.layouts);
  const isMajor = majorTheatreIds.includes(theatre.id);
  const slots = isMajor ? timeSlotsMajor : timeSlots;
  // Only allow EPIQ if theatre has EPIQ tag
  // Only allow show variants that match the theatre's tags
  const specialities = allSpecialities.filter(s => theatre.tags.includes(s));
  movies.forEach(movie => {
    // For each of the next 5 days, vary show count: Day 0 (release) = max, Day 1 = high, Day 2 = normal, Day 3/4 = minimal
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
      const showDate = new Date(today);
      showDate.setDate(today.getDate() + dayOffset);
      let showsToday;
      if (dayOffset === 0) {
        showsToday = slots.length; // Release day: all shows
      } else if (dayOffset === 1) {
        showsToday = Math.max(6, Math.floor(slots.length * 0.8)); // Day 2: high
      } else if (dayOffset === 2) {
        showsToday = Math.max(5, Math.floor(slots.length * 0.6)); // Day 3: normal
      } else if (dayOffset === 3) {
        showsToday = Math.max(3, Math.floor(slots.length * 0.4)); // Day 4: minimal
      } else {
        showsToday = Math.max(2, Math.floor(slots.length * 0.25)); // Day 5: minimal
      }
      const slotsToday = slots.slice(0, showsToday);
      slotsToday.forEach((hour, idx) => {
        const date = new Date(showDate);
        date.setHours(Math.floor(hour), hour % 1 ? 59 : 0, 0, 0);
        const speciality = specialities[(idx + layoutIds.length) % specialities.length] as Show['speciality'];
        const price = 180 + (idx * 15) + (layoutIds.length * 5);
        const layout = theatre.layouts[layoutIds[idx % layoutIds.length]];
        const booked: string[] = [];
        shows.push({
          id: `sh${showId++}`,
          movieId: movie.id,
          theatreId: theatre.id,
          time: date.toISOString(),
          speciality,
          price,
          layoutId: layoutIds[idx % layoutIds.length],
          booked,
        });
      });
    }
  });
});
