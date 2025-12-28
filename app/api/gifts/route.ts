import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Dados iniciais para primeira carga
const initialGifts = ["13", "20", "1", "25", "18"]

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chosen_gifts')
      .select('gift_id')
    
    if (error) throw error
    
    const chosenGifts = data?.map(item => item.gift_id) || []
    
    // Se não tem dados no Supabase, retorna dados iniciais
    if (chosenGifts.length === 0) {
      return NextResponse.json({ chosenGifts: initialGifts })
    }
    
    return NextResponse.json({ chosenGifts })
  } catch (error) {
    // Fallback para dados iniciais
    return NextResponse.json({ chosenGifts: initialGifts })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, action } = await request.json()
    
    if (action === "add") {
      const { error } = await supabase
        .from('chosen_gifts')
        .insert({ gift_id: giftId })
      
      if (error && !error.message.includes('duplicate')) {
        throw error
      }
    }
    
    // Retornar lista atualizada
    const { data } = await supabase
      .from('chosen_gifts')
      .select('gift_id')
    
    const chosenGifts = data?.map(item => item.gift_id) || []
    return NextResponse.json({ success: true, chosenGifts })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}