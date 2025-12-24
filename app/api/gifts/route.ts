import { NextRequest, NextResponse } from "next/server"

// Dados já existentes baseados nas mensagens do Telegram
let chosenGifts: string[] = ["13"] // Sanduicheira já escolhida pela Laleska

export async function GET() {
  return NextResponse.json({ chosenGifts })
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    
    if (action === "add" && !chosenGifts.includes(giftId)) {
      chosenGifts.push(giftId)
    } else if (action === "remove") {
      chosenGifts = chosenGifts.filter(id => id !== giftId)
    } else if (action === "reset") {
      chosenGifts = []
    }
    
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}