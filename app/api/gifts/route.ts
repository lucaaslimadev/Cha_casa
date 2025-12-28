import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const GIFTS_FILE = join(process.cwd(), 'data', 'chosen-gifts.json')

function loadChosenGifts(): string[] {
  try {
    const data = readFileSync(GIFTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveChosenGifts(gifts: string[]): void {
  try {
    writeFileSync(GIFTS_FILE, JSON.stringify(gifts, null, 2))
  } catch (error) {
    console.error('Erro ao salvar presentes:', error)
  }
}

export async function GET() {
  const chosenGifts = loadChosenGifts()
  return NextResponse.json({ chosenGifts })
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    let chosenGifts = loadChosenGifts()
    
    if (action === "add" && !chosenGifts.includes(giftId)) {
      chosenGifts.push(giftId)
    } else if (action === "remove") {
      chosenGifts = chosenGifts.filter(id => id !== giftId)
    } else if (action === "reset") {
      chosenGifts = []
    }
    
    saveChosenGifts(chosenGifts)
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}