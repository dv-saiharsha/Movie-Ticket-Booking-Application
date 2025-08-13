export type Movie = {
  id: string
  title: string
  poster: string
  rating: string
  durationMins: number
  languages: string[]
  genres: string[]
  releaseDate: string
  synopsis: string
  upcoming?: boolean
  userRating: number // out of 5
}

export const movies: Movie[] = [
  { id: 'mv1', title: 'Solar Odyssey', poster: 'https://picsum.photos/400/600?1', rating: 'U/A', durationMins: 142, languages: ['Hindi','English','Telugu'], genres: ['Sci-Fi','Adventure'], releaseDate: '2025-08-01', synopsis: 'A mission to reignite the sun, with twists across galaxies.', userRating: 4.5 },
  { id: 'mv2', title: 'Monsoon Memories', poster: 'https://picsum.photos/400/600?2', rating: 'U', durationMins: 128, languages: ['Hindi','Tamil'], genres: ['Drama','Romance'], releaseDate: '2025-07-15', synopsis: 'Two strangers connect over a shared monsoon past.', userRating: 4.2 },
  { id: 'mv9', title: 'Echoes of Time', poster: 'https://picsum.photos/400/600?9', rating: 'U/A', durationMins: 130, languages: ['English','Hindi'], genres: ['Drama','Fantasy'], releaseDate: '2025-08-12', synopsis: 'A young woman discovers she can communicate with her ancestors.', userRating: 4.4, upcoming: true },
  { id: 'mv10', title: 'Metro Rush', poster: 'https://picsum.photos/400/600?10', rating: 'U', durationMins: 112, languages: ['Hindi'], genres: ['Action','Comedy'], releaseDate: '2025-08-15', synopsis: 'A group of friends get caught up in a city-wide chase.', userRating: 3.9 },
  { id: 'mv11', title: 'Desert Mirage', poster: 'https://picsum.photos/400/600?11', rating: 'U/A', durationMins: 118, languages: ['English'], genres: ['Adventure','Mystery'], releaseDate: '2025-08-18', synopsis: 'An archaeologist unearths secrets in the desert.', userRating: 4.0 },
  { id: 'mv15', title: 'Midnight Express', poster: 'https://picsum.photos/400/600?15', rating: 'U/A', durationMins: 122, languages: ['English','Hindi'], genres: ['Thriller','Drama'], releaseDate: '2025-08-20', synopsis: 'A train journey turns into a race against time.', userRating: 4.2 },
  { id: 'mv16', title: 'Lotus Lake', poster: 'https://picsum.photos/400/600?16', rating: 'U', durationMins: 108, languages: ['Hindi','Tamil'], genres: ['Romance','Drama'], releaseDate: '2025-08-22', synopsis: 'A love story unfolds by a mystical lake.', userRating: 4.1 },
  { id: 'mv3', title: 'Cyber Chase', poster: 'https://picsum.photos/400/600?3', rating: 'U/A', durationMins: 116, languages: ['English'], genres: ['Action','Thriller'], releaseDate: '2025-09-20', synopsis: 'A hacker must stop an AI he created from going rogue.', upcoming: true, userRating: 0 },
  { id: 'mv4', title: 'Spice Route', poster: 'https://picsum.photos/400/600?4', rating: 'U', durationMins: 101, languages: ['Malayalam','Hindi'], genres: ['Drama'], releaseDate: '2025-10-05', synopsis: 'Family, food, and legacy along India\'s spice trail.', upcoming: true, userRating: 0 },
  { id: 'mv12', title: 'Frozen Dreams', poster: 'https://picsum.photos/400/600?12', rating: 'U', durationMins: 120, languages: ['English'], genres: ['Animation','Family'], releaseDate: '2025-09-25', synopsis: 'A magical journey through a world of ice and wonder.', upcoming: true, userRating: 0 },
  { id: 'mv13', title: 'Starlit Promises', poster: 'https://picsum.photos/400/600?13', rating: 'U/A', durationMins: 110, languages: ['Hindi','English'], genres: ['Romance','Drama'], releaseDate: '2025-10-10', synopsis: 'Two lovers are separated by fate but united by the stars.', upcoming: true, userRating: 0 },
  { id: 'mv14', title: 'The Inventor', poster: 'https://picsum.photos/400/600?14', rating: 'U', durationMins: 105, languages: ['English'], genres: ['Biography','Drama'], releaseDate: '2025-11-01', synopsis: 'The story of a genius who changed the world.', upcoming: true, userRating: 0 },
  { id: 'mv17', title: 'Crimson Skies', poster: 'https://picsum.photos/400/600?17', rating: 'U/A', durationMins: 115, languages: ['English'], genres: ['Action','Adventure'], releaseDate: '2025-11-15', synopsis: 'Pilots face danger and glory in the skies.', upcoming: true, userRating: 0 },
  { id: 'mv18', title: 'The Forgotten City', poster: 'https://picsum.photos/400/600?18', rating: 'U', durationMins: 125, languages: ['Hindi'], genres: ['Mystery','Thriller'], releaseDate: '2025-12-01', synopsis: 'A detective unravels secrets in an ancient city.', upcoming: true, userRating: 0 },
  { id: 'mv5', title: 'Neon Nights', poster: 'https://picsum.photos/400/600?5', rating: 'U/A', durationMins: 124, languages: ['English','Hindi'], genres: ['Thriller','Mystery'], releaseDate: '2025-07-30', synopsis: 'A detective unravels a neon-lit city mystery.', userRating: 4.0 },
  { id: 'mv6', title: 'Jungle Beat', poster: 'https://picsum.photos/400/600?6', rating: 'U', durationMins: 110, languages: ['Hindi','Telugu'], genres: ['Adventure','Family'], releaseDate: '2025-08-05', synopsis: 'A group of kids discover a magical jungle.', userRating: 3.8 },
  { id: 'mv7', title: 'The Last Melody', poster: 'https://picsum.photos/400/600?7', rating: 'U', durationMins: 99, languages: ['Tamil','English'], genres: ['Drama','Music'], releaseDate: '2025-07-20', synopsis: 'A musician finds hope in unexpected places.', userRating: 4.3 },
  { id: 'mv8', title: 'Quantum Leap', poster: 'https://picsum.photos/400/600?8', rating: 'U/A', durationMins: 135, languages: ['English'], genres: ['Sci-Fi','Action'], releaseDate: '2025-08-10', synopsis: 'Scientists race to fix a time anomaly.', userRating: 4.1 },
]
