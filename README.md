
# CineBook (React + Vite + Tailwind + shadcn-style UI)

A responsive movie ticket booking demo with:
- Auth (localStorage) with location saved (state/district/village)
- Now Showing & Upcoming
- Theatre showtimes with speciality tags (4K, Dolby Atmos, EPIQ, IMAX)
- Seat selection with **red (booked)**, **yellow (suggested)**, **green (selected)**, **blue (free)** and a curved SCREEN label
- Smart "Suggest seats" based on a heuristic ML-like scoring (pluggable with TFJS later)
- Checkout with snacks, coupon (use `CINE10`), taxes and multiple payment options (mock)
- Ticket page with QR code, and My Tickets list
- Minimal shadcn-style components (Button, Card, Input, Badge, Navbar)

## Run locally
```bash
cd client
npm install
npm run dev
```

## Notes
- Location data is a **small sample** at `public/data/india_locations.json`. Replace with a full India states → districts → villages dataset when available; the cascading selects will work as-is.
- Auth is stored in localStorage for demo only. Do not use in production.
- The seat suggestion uses a weighted scoring with a contiguous-block search. Replace `src/lib/seatModel.ts` with a TFJS/ONNX model if you prefer.
