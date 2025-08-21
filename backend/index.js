import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY || 'b4b85c19211cc5c2afdb78910faa4741';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Path to the CSV file
const csvFilePath = path.join(process.cwd(), '../cinemaTicket_Ref.csv');
let cinemaData = [];

// Parse CSV on server start
function loadCinemaData() {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      cinemaData = results;
      console.log(`Loaded ${cinemaData.length} cinema records from CSV.`);
    });
}
loadCinemaData();

// Endpoint to get cinema data
// Enhanced endpoint: supports filtering, search, and pagination
app.get('/api/cinema-data', (req, res) => {
  let data = cinemaData;
  const { film_code, cinema_code, date, search, page = 1, pageSize = 20 } = req.query;

  // Filtering
  if (film_code) data = data.filter(d => d.film_code === film_code);
  if (cinema_code) data = data.filter(d => d.cinema_code === cinema_code);
  if (date) data = data.filter(d => d.date === date);

  // Search (by film_code or cinema_code or date)
  if (search) {
    const s = String(search).toLowerCase();
    data = data.filter(d =>
      (d.film_code && d.film_code.toLowerCase().includes(s)) ||
      (d.cinema_code && d.cinema_code.toLowerCase().includes(s)) ||
      (d.date && d.date.toLowerCase().includes(s))
    );
  }

  // Pagination
  const p = parseInt(page, 10) || 1;
  const ps = parseInt(pageSize, 10) || 20;
  const start = (p - 1) * ps;
  const paged = data.slice(start, start + ps);

  res.json({
    total: data.length,
    page: p,
    pageSize: ps,
    results: paged
  });
});

app.use(cors());
app.use(express.json());

// Fetch popular movies from TMDB
app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US', page: 1 },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

// Fetch movie details by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// In-memory store for bookings and users
import { theatres, shows } from './data.js';
const bookings = [];

// Persistent user storage
import fs from 'fs';
const USERS_FILE = './users.json';
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
let users = loadUsers();
// Get all theatres
app.get('/api/theatres', (req, res) => {
  res.json(theatres);
});

// Get all shows
app.get('/api/shows', (req, res) => {
  res.json(shows);
});

// Get show by ID
app.get('/api/shows/:id', (req, res) => {
  const show = shows.find(s => s.id === req.params.id);
  if (!show) return res.status(404).json({ error: 'Show not found' });
  res.json(show);
});

// Book seats for a show (real-time)
app.post('/api/shows/:id/book', (req, res) => {
  const { seats, username } = req.body;
  const show = shows.find(s => s.id === req.params.id);
  if (!show) return res.status(404).json({ error: 'Show not found' });
  if (!Array.isArray(seats) || !username) return res.status(400).json({ error: 'Missing booking details' });
  // Check for already booked seats
  const alreadyBooked = seats.some(seat => show.booked.includes(seat));
  if (alreadyBooked) return res.status(409).json({ error: 'Some seats already booked' });
  show.booked.push(...seats);
  bookings.push({ username, showId: show.id, seats, time: Date.now() });
  res.json({ message: 'Booking successful', showId: show.id, seats });
});

// Get bookings for a user
app.get('/api/bookings/:username', (req, res) => {
  const { username } = req.params;
  const userBookings = bookings.filter(b => b.username === username);
  res.json(userBookings);
});

// User registration (persistent)
app.post('/api/auth/register', (req, res) => {
  const { username, password, name, email, location } = req.body;
  if (!username || !password || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const user = { id: Date.now().toString(), username, password, name, email, location };
  users.push(user);
  saveUsers(users);
  res.json({ message: 'User registered successfully', user: { ...user, password: undefined } });
});

// User login (persistent)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user: { ...user, password: undefined } });
});

// Book a ticket
app.post('/api/bookings', (req, res) => {
  const { username, movieId, seats } = req.body;
  if (!username || !movieId || !seats) {
    return res.status(400).json({ error: 'Missing booking details' });
  }
  bookings.push({ username, movieId, seats, time: Date.now() });
  res.json({ message: 'Booking successful' });
});

// Get bookings for a user
app.get('/api/bookings/:username', (req, res) => {
  const { username } = req.params;
  const userBookings = bookings.filter(b => b.username === username);
  res.json(userBookings);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
