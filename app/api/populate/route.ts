import { NextRequest, NextResponse } from "next/server"

// Importar as variáveis globais das outras APIs
import { chosenGifts } from "../gifts/route"
import { rsvpData } from "../rsvp-data/route"

// Dados baseados nas mensagens do Telegram fornecidas
const existingRSVPs = [
  {
    name: "Júlia França",
    guests: 1,
    message: "Muito feliz por vocês e por essa nova fase que estão vivendo!!! Peço a Deus que continue abençoando e iluminando o caminho de vocês dois. Vocês merecem ❤️ ❤️"
  },
  {
    name: "Valdirene Lima",
    guests: 4,
    message: "🥳🥳Bora festar meus Amores❤️❤️"
  },
  {
    name: "Gabriela Cordeiro",
    guests: 1,
    message: ""
  },
  {
    name: "Vinicius Leite",
    guests: 1,
    message: "Que abençoe a união de vocês. ❤️"
  },
  {
    name: "Fernanda Taques",
    guests: 1,
    message: "Quero a minha buzinha kkkkk"
  },
  {
    name: "Guilherme",
    guests: 1,
    message: "Gordão tá feliz com a notícia"
  }
]

const existingGifts = ["13"]

export async function POST(request: NextRequest) {
  try {
    const { action, password } = await request.json()
    
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
    }
    
    if (action === "populate") {
      // Popular RSVPs diretamente
      for (const rsvp of existingRSVPs) {
        const newRSVP = {
          id: Date.now().toString() + Math.random(),
          name: rsvp.name,
          guests: rsvp.guests,
          message: rsvp.message,
          date: new Date().toISOString()
        }
        rsvpData.push(newRSVP)
      }
      
      // Popular presentes diretamente
      for (const giftId of existingGifts) {
        if (!chosenGifts.includes(giftId)) {
          chosenGifts.push(giftId)
        }
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