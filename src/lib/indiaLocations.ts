export type LocationNode = {
  name: string
  children?: LocationNode[]
}

// Minimal sample for demo. Replace public/data/india_locations.json with a full dataset.
export async function loadIndiaLocations(): Promise<LocationNode[]> {
  const res = await fetch('/data/india_locations.json')
  return res.json()
}
