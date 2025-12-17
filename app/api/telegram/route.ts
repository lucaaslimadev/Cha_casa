import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, giftName, message } = body

    // Obter credenciais do Telegram das variáveis de ambiente
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatIdEnv = process.env.TELEGRAM_CHAT_ID

    // Validação detalhada das credenciais
    if (!botToken) {
      console.error("TELEGRAM_BOT_TOKEN não configurado")
      return NextResponse.json(
        { 
          error: "Token do bot não configurado",
          details: "Configure a variável TELEGRAM_BOT_TOKEN no arquivo .env.local. Veja o arquivo TELEGRAM_SETUP.md para instruções."
        },
        { status: 500 }
      )
    }

    if (!chatIdEnv || chatIdEnv === "seu_chat_id_aqui") {
      console.error("TELEGRAM_CHAT_ID não configurado", { chatIdEnv })
      return NextResponse.json(
        { 
          error: "Chat ID não configurado",
          details: "Configure a variável TELEGRAM_CHAT_ID no arquivo .env.local. Execute o script get-chat-id.sh ou veja o arquivo TELEGRAM_SETUP.md para instruções."
        },
        { status: 500 }
      )
    }

    // Validar formato do token (deve ter o formato: número:hash)
    if (!botToken.match(/^\d+:[A-Za-z0-9_-]+$/)) {
      console.error("Formato de token inválido")
      return NextResponse.json(
        { 
          error: "Token do bot inválido",
          details: "O token deve ter o formato: número:hash (ex: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz)"
        },
        { status: 500 }
      )
    }

    // Suportar múltiplos chat_ids separados por vírgula
    const chatIds = chatIdEnv.split(',').map(id => id.trim()).filter(id => id)
    
    // Validar formato dos chat_ids (devem ser números)
    const invalidChatIds = chatIds.filter(id => !id.match(/^-?\d+$/))
    if (invalidChatIds.length > 0) {
      console.error("Formato de chat_id inválido", { invalidChatIds })
      return NextResponse.json(
        { 
          error: "Chat ID inválido",
          details: `Os Chat IDs devem ser números. IDs inválidos encontrados: ${invalidChatIds.join(', ')}. Execute o script get-chat-id.sh para obter os valores corretos.`
        },
        { status: 500 }
      )
    }

    // Formatar mensagem de presente (diferente de confirmação)
    const telegramMessage = `
🎁 *Novo Presente Escolhido!*

👤 *Nome:* ${name}
🎁 *Presente:* ${giftName}
${message ? `💬 *Mensagem:* ${message}` : ""}

_Enviado em ${new Date().toLocaleString("pt-BR")}_
    `.trim()

    // Enviar mensagem para todos os chat_ids configurados
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const results = []
    const errors = []
    
    for (const chatId of chatIds) {
      try {
        const response = await fetch(telegramUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        })

        const data = await response.json()

        if (response.ok && data.ok) {
          results.push({ chatId, success: true, data })
        } else {
          console.error(`Telegram API error para chat_id ${chatId}:`, {
            status: response.status,
            statusText: response.statusText,
            data
          })
          
          // Mensagens de erro mais específicas
          let errorMessage = "Erro ao enviar mensagem para o Telegram"
          let errorDetails = data

          if (data.error_code === 401) {
            errorMessage = "Token do bot inválido ou expirado"
            errorDetails = "Verifique se o TELEGRAM_BOT_TOKEN está correto no arquivo .env.local"
          } else if (data.error_code === 400) {
            errorMessage = "Requisição inválida para o Telegram"
            if (data.description?.includes("chat not found")) {
              errorMessage = "Chat ID não encontrado"
              errorDetails = `Chat ID ${chatId} não encontrado. Verifique se está correto e se você enviou uma mensagem para o bot`
            } else if (data.description?.includes("parse")) {
              errorMessage = "Erro ao formatar mensagem"
              errorDetails = data.description
            }
          } else if (data.error_code === 429) {
            errorMessage = "Muitas requisições. Aguarde um momento"
          } else if (data.description) {
            errorMessage = data.description
          }

          errors.push({ chatId, error: errorMessage, details: errorDetails })
        }
      } catch (error) {
        console.error(`Erro ao enviar para chat_id ${chatId}:`, error)
        errors.push({ chatId, error: "Erro ao processar requisição", details: String(error) })
      }
    }

    // Se pelo menos uma mensagem foi enviada com sucesso, retornar sucesso
    if (results.length > 0) {
      return NextResponse.json({ 
        success: true, 
        sent: results.length,
        total: chatIds.length,
        results,
        ...(errors.length > 0 && { warnings: errors })
      })
    }

    // Se todas falharam, retornar erro
    return NextResponse.json(
      { 
        error: "Erro ao enviar mensagens para o Telegram",
        details: errors.length > 0 ? errors : "Nenhuma mensagem foi enviada com sucesso"
      },
      { status: 500 }
    )
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}



