export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

const RSVP_STORAGE_KEY = "rsvp_confirmations"

export function saveRSVP(rsvp: Omit<RSVPEntry, "id" | "date">): RSVPEntry {
  if (typeof window === "undefined") return { ...rsvp, id: "", date: "" }
  
  const newRSVP: RSVPEntry = {
    ...rsvp,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  }
  
  const existing = getRSVPs()
  const updated = [...existing, newRSVP]
  
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated))
  return newRSVP
}

export function getRSVPs(): RSVPEntry[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(RSVP_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getTotalGuests(): number {
  return getRSVPs().reduce((total, rsvp) => total + rsvp.guests, 0)
}