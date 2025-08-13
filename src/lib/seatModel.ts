export type Seat = {
  id: string
  row: number
  col: number
  isBooked?: boolean
  isBlocked?: boolean
}

export type Layout = { rows: number; cols: number; aisles?: number[]; blocked?: string[] }

const weights = {
  centerRow: 1.8,
  centerCol: 2.0,
  aisleDistance: 0.4,
  edgePenalty: -1.2,
  bookedProximityPenalty: -0.9,
  blockedPenalty: -5,
}

// Compute a scalar score for one seat
export function scoreSeat(seat: Seat, layout: Layout, bookedSet: Set<string>) {
  if (seat.isBlocked) return -999
  if (seat.isBooked) return -999

  const midRow = (layout.rows - 1) / 2
  const midCol = (layout.cols - 1) / 2

  const distRow = Math.abs(seat.row - midRow)
  const distCol = Math.abs(seat.col - midCol)

  // prefer center-ish rows (slightly behind middle)
  const idealRow = Math.round(layout.rows * 0.6)
  const rowPref = -Math.abs(seat.row - idealRow)

  // penalty if near extreme edges
  const edge = (seat.col === 0 || seat.col === layout.cols - 1) ? 1 : 0

  // distance to nearest aisle (if any)
  let aisleDist = Infinity
  if (layout.aisles && layout.aisles.length) {
    aisleDist = Math.min(...layout.aisles.map(a => Math.abs(seat.col - (a-1))))
  } else {
    aisleDist = Math.min(seat.col, layout.cols - 1 - seat.col)
  }

  // proximity to booked seats (avoid sitting immediately adjacent if possible)
  const neighbors = [
    `${String.fromCharCode(65 + seat.row)}${seat.col}`, // left (same id will never match, fine)
    `${String.fromCharCode(65 + seat.row)}${seat.col+2}`, // right (+2 because id uses 1-based col)
    `${String.fromCharCode(65 + seat.row-1)}${seat.col+1}`, // up
    `${String.fromCharCode(65 + seat.row+1)}${seat.col+1}`, // down
  ]
  const nearBooked = neighbors.some(n => bookedSet.has(n))

  let score = 0
  score += weights.centerRow * (-distRow)
  score += weights.centerCol * (-distCol)
  score += weights.aisleDistance * (-aisleDist)
  score += weights.edgePenalty * edge
  if (nearBooked) score += weights.bookedProximityPenalty

  return score + rowPref * 0.5
}

// Suggest contiguous seats for a party size (1..6). Prefer contiguous in same row near center.
export function suggestSeats(layout: Layout, booked: string[], count: number) {
  const bookedSet = new Set(booked)
  const grid: Seat[] = []
  for (let r = 0; r < layout.rows; r++) {
    for (let c = 0; c < layout.cols; c++) {
      const id = `${String.fromCharCode(65 + r)}${c+1}`
      const isBooked = bookedSet.has(id)
      const isBlocked = (layout.blocked || []).includes(id)
      grid.push({ id, row: r, col: c, isBooked, isBlocked })
    }
  }

  // try contiguous window in a row
  let bestRun: { ids: string[]; score: number } | null = null
  for (let r = 0; r < layout.rows; r++) {
    for (let start = 0; start <= layout.cols - count; start++) {
      const segment = grid.filter(g => g.row === r && g.col >= start && g.col < start + count)
      if (segment.some(s => s.isBooked || s.isBlocked)) continue
      const segScore = segment.reduce((acc, s) => acc + scoreSeat(s, layout, bookedSet), 0)
      if (!bestRun || segScore > bestRun.score) bestRun = { ids: segment.map(s => s.id), score: segScore }
    }
  }

  // fallback to best individual seats if no contiguous block
  if (!bestRun) {
    const freeSeats = grid.filter(s => !s.isBooked && !s.isBlocked).sort((a,b) => scoreSeat(b, layout, new Set(booked)) - scoreSeat(a, layout, new Set(booked)))
    return freeSeats.slice(0, count).map(s => s.id)
  }
  return bestRun.ids
}
