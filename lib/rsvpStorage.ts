// Utilitário para gerenciar confirmações de presença no localStorage

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

const STORAGE_KEY = "rsvp_confirmations"
// Altere esse valor quando quiser "resetar" as confirmações para todo mundo após um deploy
const RESET_TOKEN_KEY = "rsvp_confirmations_reset_token"
const RESET_TOKEN = "2025-12-17-reset-3"

function ensureResetApplied() {
  if (typeof window === "undefined") return
  try {
    const lastReset = localStorage.getItem(RESET_TOKEN_KEY)
    if (lastReset !== RESET_TOKEN) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(RESET_TOKEN_KEY, RESET_TOKEN)
    }
  } catch (error) {
    console.error("Erro ao aplicar reset de RSVP:", error)
  }
}

export function saveRSVP(rsvp: Omit<RSVPEntry, "id" | "date">): RSVPEntry {
  const entry: RSVPEntry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...rsvp,
  }

  if (typeof window !== "undefined") {
    try {
      ensureResetApplied()
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
    ensureResetApplied()
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


