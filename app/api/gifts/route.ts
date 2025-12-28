import { NextRequest, NextResponse } from "next/server"

// Dados em memória - atualize manualmente quando necessário
let chosenGifts: string[] = ["13", "20", "1", "25"]

export async function GET() {
  return NextResponse.json({ chosenGifts })
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    
    if (action === "add" && !chosenGifts.includes(giftId)) {
      chosenGifts.push(giftId)
    }
    
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}