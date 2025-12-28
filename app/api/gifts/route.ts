import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

const GIFTS_KEY = "chosen_gifts"

// Dados iniciais (carregados uma vez)
const initialGifts = ["13", "20", "1", "25"]

async function loadChosenGifts(): Promise<string[]> {
  try {
    let gifts = await kv.get<string[]>(GIFTS_KEY)
    if (!gifts) {
      // Primeira vez - carregar dados iniciais
      await kv.set(GIFTS_KEY, initialGifts)
      gifts = initialGifts
    }
    return gifts
  } catch {
    return initialGifts
  }
}

export async function GET() {
  const chosenGifts = await loadChosenGifts()
  return NextResponse.json({ chosenGifts })
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    let chosenGifts = await loadChosenGifts()
    
    if (action === "add" && !chosenGifts.includes(giftId)) {
      chosenGifts.push(giftId)
    } else if (action === "remove") {
      chosenGifts = chosenGifts.filter(id => id !== giftId)
    } else if (action === "reset") {
      chosenGifts = []
    }
    
    await kv.set(GIFTS_KEY, chosenGifts)
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}