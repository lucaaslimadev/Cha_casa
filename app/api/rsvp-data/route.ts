import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

const RSVP_FILE = join(process.cwd(), 'data', 'rsvps.json')

function loadRSVPs(): RSVPEntry[] {
  try {
    const data = readFileSync(RSVP_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveRSVPs(rsvps: RSVPEntry[]): void {
  try {
    writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2))
  } catch (error) {
    console.error('Erro ao salvar RSVPs:', error)
  }
}

export async function GET() {
  const rsvps = loadRSVPs()
  return NextResponse.json({ rsvps })
}

export async function POST(request: NextRequest) {
  try {
    const { name, guests, message } = await request.json()
    
    const newRSVP: RSVPEntry = {
      id: Date.now().toString(),
      name,
      guests,
      message,
      date: new Date().toISOString()
    }
    
    const rsvps = loadRSVPs()
    rsvps.push(newRSVP)
    saveRSVPs(rsvps)
    
    return NextResponse.json({ success: true, rsvp: newRSVP })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}