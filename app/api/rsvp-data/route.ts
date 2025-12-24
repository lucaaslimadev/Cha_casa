import { NextRequest, NextResponse } from "next/server"

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

// Simulação de banco de dados em memória (em produção, usar um banco real)
let rsvpData: RSVPEntry[] = []

export async function GET() {
  return NextResponse.json({ rsvps: rsvpData })
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
    
    rsvpData.push(newRSVP)
    
    return NextResponse.json({ success: true, rsvp: newRSVP })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}