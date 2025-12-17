// Utilitário para gerenciar confirmações de presença no localStorage

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

const STORAGE_KEY = "rsvp_confirmations"

export function saveRSVP(rsvp: Omit<RSVPEntry, "id" | "date">): RSVPEntry {
  const entry: RSVPEntry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...rsvp,
  }

  if (typeof window !== "undefined") {
    try {
      const existing = getRSVPs()
      existing.push(entry)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    } catch (error) {
      console.error("Erro ao salvar RSVP:", error)
    }
  }

  return entry
}

export function getRSVPs(): RSVPEntry[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as RSVPEntry[]
    }
  } catch (error) {
    console.error("Erro ao carregar RSVPs:", error)
  }

  return []
}

export function getTotalGuests(): number {
  const rsvps = getRSVPs()
  return rsvps.reduce((total, rsvp) => total + rsvp.guests, 0)
}

export function clearRSVPs(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}


