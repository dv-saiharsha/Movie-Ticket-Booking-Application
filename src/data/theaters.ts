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
  }
]


// PROGRAMMATIC SHOW GENERATION
import { movies } from './movies'

const timeSlots = [9, 12, 15, 18, 21, 23.983]; // 23.983 ~ 23:59
const specialities: Show['speciality'][] = ['4K', 'Dolby Atmos', 'EPIQ', 'IMAX']

export const shows: Show[] = [];
let showId = 1;
const today = new Date();
today.setHours(0,0,0,0);
theatres.forEach(theatre => {
  const layoutIds = Object.keys(theatre.layouts);
  movies.forEach(movie => {
    // For each of the next 5 days
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
      const showDate = new Date(today);
      showDate.setDate(today.getDate() + dayOffset);
      timeSlots.forEach((hour, idx) => {
        const date = new Date(showDate);
        date.setHours(Math.floor(hour), hour % 1 ? 59 : 0, 0, 0);
        const speciality = specialities[(idx + layoutIds.length) % specialities.length] as Show['speciality'];
        const price = 180 + (idx * 15) + (layoutIds.length * 5);
        // Book all seats in rows C, F, and G for the current layout
        const layout = theatre.layouts[layoutIds[idx % layoutIds.length]];
  const booked: string[] = [];
  // All seats are free to book
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
