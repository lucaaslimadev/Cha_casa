import { NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.JSONBIN_API_KEY || "$2a$10$example"
const BIN_ID = "676f1234567890abcdef1234" // ID fixo para presentes

async function loadFromJSONBin(): Promise<string[]> {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    })
    const data = await response.json()
    return data.record || ["13", "20", "1", "25"]
  } catch {
    return ["13", "20", "1", "25"]
  }
}

async function saveToJSONBin(gifts: string[]): Promise<void> {
  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify(gifts)
    })
  } catch (error) {
    console.error('Erro ao salvar:', error)
  }
}

export async function GET() {
  const chosenGifts = await loadFromJSONBin()
  return NextResponse.json({ chosenGifts })
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    let chosenGifts = await loadFromJSONBin()
    
    if (action === "add" && !chosenGifts.includes(giftId)) {
      chosenGifts.push(giftId)
      await saveToJSONBin(chosenGifts)
    }
    
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}