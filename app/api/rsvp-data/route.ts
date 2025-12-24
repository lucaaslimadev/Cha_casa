import { NextRequest, NextResponse } from "next/server"

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

// Dados já existentes baseados nas mensagens do Telegram
let rsvpData: RSVPEntry[] = [
  {
    id: "1735048553000",
    name: "Júlia França",
    guests: 1,
    message: "Muito feliz por vocês e por essa nova fase que estão vivendo!!! Peço a Deus que continue abençoando e iluminando o caminho de vocês dois. Vocês merecem ❤️ ❤️",
    date: "2025-12-24T13:05:53.000Z"
  },
  {
    id: "1735049746000",
    name: "Valdirene Lima",
    guests: 4,
    message: "🥳🥳Bora festar meus Amores❤️❤️",
    date: "2025-12-24T13:25:46.000Z"
  },
  {
    id: "1735049968000",
    name: "Gabriela Cordeiro",
    guests: 1,
    message: "",
    date: "2025-12-24T13:29:28.000Z"
  },
  {
    id: "1735050073000",
    name: "Vinicius Leite",
    guests: 1,
    message: "Que abençoe a união de vocês. ❤️",
    date: "2025-12-24T13:31:13.000Z"
  },
  {
    id: "1735050216000",
    name: "Fernanda Taques",
    guests: 1,
    message: "Quero a minha buzinha kkkkk",
    date: "2025-12-24T13:33:36.000Z"
  },
  {
    id: "1735050300000",
    name: "Guilherme",
    guests: 1,
    message: "Gordão tá feliz com a notícia",
    date: "2025-12-24T13:35:00.000Z"
  }
]

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