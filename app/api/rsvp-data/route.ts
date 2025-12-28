import { NextRequest, NextResponse } from "next/server"

export interface RSVPEntry {
  id: string
  name: string
  guests: number
  message?: string
  date: string
}

// Dados em memória com todos os existentes
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
  },
  {
    id: "1735051759000",
    name: "Pedro Henrique Barbosa de Lima",
    guests: 1,
    message: "",
    date: "2025-12-24T14:15:59.000Z"
  },
  {
    id: "1735052596000",
    name: "Rebeca Molina",
    guests: 2,
    message: "",
    date: "2025-12-24T14:39:56.000Z"
  },
  {
    id: "1735054155000",
    name: "Ângela Maria da Silva",
    guests: 2,
    message: "Deus abençoe a união de vocês",
    date: "2025-12-24T15:09:15.000Z"
  },
  {
    id: "1735134209000",
    name: "Henrique Carvalho de Souza",
    guests: 1,
    message: "",
    date: "2025-12-24T15:23:29.000Z"
  },
  {
    id: "1735147544000",
    name: "Leonardo de Oliveira Camargo",
    guests: 1,
    message: "Toda felicidade do mundo pra vocês, meus amigos! Vocês merecem! 🫶🏻",
    date: "2025-12-24T19:05:44.000Z"
  },
  {
    id: "1735320230000",
    name: "Michele Caroline Morais e Tiago Luiz Ferreira",
    guests: 2,
    message: "",
    date: "2025-12-26T20:23:50.000Z"
  },
  {
    id: "1735333779000",
    name: "Matheus Medeiros e Júlia Murbach",
    guests: 2,
    message: "",
    date: "2025-12-27T00:09:39.000Z"
  },
  {
    id: "1735387235000",
    name: "Vicente Bronzatto e Adriana Bronzatto",
    guests: 2,
    message: "Parabéns pela nova etapa do casal",
    date: "2025-12-27T13:40:35.000Z"
  },
  {
    id: "1735400578000",
    name: "Rosana Aparecida F Tavares",
    guests: 2,
    message: "Obrigada pelo convite felicidades",
    date: "2025-12-27T17:32:58.000Z"
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