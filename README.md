# CineBook (React + Vite + Tailwind + shadcn-style UI)

A modern, responsive web app for booking movie tickets online. Features user authentication, movie discovery, showtime and seat selection, ticket management, offers, and a beautiful UI. Built with React, Vite, and Tailwind CSS.

A responsive movie ticket booking demo with:
- Auth (localStorage) with location saved (state/district/village)
- Now Showing & Upcoming
- Theatre showtimes with speciality tags (4K, Dolby Atmos, EPIQ, IMAX)
- Seat selection with **red (booked)**, **yellow (suggested)**, **green (selected)**, **blue (free)** and a curved SCREEN label
- Smart "Suggest seats" based on a heuristic ML-like scoring (pluggable with TFJS later)
- Checkout with snacks, coupon (use `CINE10`), taxes and multiple payment options (mock)
- Ticket page with QR code, and My Tickets list
- Minimal shadcn-style components (Button, Card, Input, Badge, Navbar)


## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/dv-saiharsha/Movie-Ticket-Booking-Application.git
cd Movie-Ticket-Booking-Application
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Features
- User registration and login
- Browse now showing & upcoming movies
- Theatre showtimes with speciality tags (4K, Dolby Atmos, EPIQ, IMAX, etc.)
- Seat selection with visual feedback and smart suggestions
- Checkout with snacks, coupon codes, and payment options (mock)
- Ticket page with QR code, and My Tickets list
- Offers and coupon management
- Responsive, mobile-friendly design
- Minimal shadcn-style components (Button, Card, Input, Badge, Navbar)

---

## Notes
- Location data is a **small sample** at `public/data/india_locations.json`. Replace with a full India states → districts → villages dataset when available; the cascading selects will work as-is.
- Auth is stored in localStorage for demo only. Do not use in production.
- The seat suggestion uses a weighted scoring with a contiguous-block search. Replace `src/lib/seatModel.ts` with a TFJS/ONNX model if you prefer.
