import { NextRequest, NextResponse } from "next/server"

// Senha simples para proteger o dashboard (em produção, use algo mais seguro)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      )
    }

    // Em produção, você poderia buscar dados de um banco de dados
    // Por enquanto, retornamos sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}


