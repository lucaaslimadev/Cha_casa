import { NextRequest, NextResponse } from "next/server"

// Dados baseados nas mensagens do Telegram fornecidas
const existingRSVPs = [
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

// Presentes escolhidos baseados na mensagem do Telegram
const existingGifts = [
  "13" // Sanduicheira e Grill Britânia BGR27I Press 2 em 1 850W - Laleska Pauliana
]

export async function POST(request: NextRequest) {
  try {
    const { action, password } = await request.json()
    
    // Verificar senha admin
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
    }
    
    if (action === "populate") {
      // Popular dados nas APIs
      
      // Popular RSVPs
      for (const rsvp of existingRSVPs) {
        await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/rsvp-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: rsvp.name,
            guests: rsvp.guests,
            message: rsvp.message
          })
        })
      }
      
      // Popular presentes
      for (const giftId of existingGifts) {
        await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/gifts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            giftId,
            action: 'add'
          })
        })
      }
      
      return NextResponse.json({ 
        success: true, 
        message: `Populado ${existingRSVPs.length} RSVPs e ${existingGifts.length} presentes` 
      })
    }
    
    return NextResponse.json({ error: "Ação inválida" }, { status: 400 })
  } catch (error) {
    console.error("Erro ao popular dados:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}