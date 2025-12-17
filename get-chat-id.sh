#!/bin/bash

# Script para obter o Chat ID do Telegram
# Execute este script APÓS enviar uma mensagem para o seu bot

# IMPORTANTE: Configure o token no arquivo .env.local primeiro!
# Este script lê o token do arquivo .env.local

ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Arquivo .env.local não encontrado!"
    echo ""
    echo "Crie o arquivo .env.local na raiz do projeto com:"
    echo "TELEGRAM_BOT_TOKEN=seu_token_aqui"
    echo ""
    echo "Veja o arquivo TELEGRAM_SETUP.md para instruções completas"
    exit 1
fi

# Ler o token do arquivo .env.local
TOKEN=$(grep "^TELEGRAM_BOT_TOKEN=" "$ENV_FILE" | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "seu_token_aqui" ]; then
    echo "❌ Token não configurado no arquivo .env.local!"
    echo ""
    echo "Configure o TELEGRAM_BOT_TOKEN no arquivo .env.local"
    echo "Veja o arquivo TELEGRAM_SETUP.md para instruções"
    exit 1
fi

URL="https://api.telegram.org/bot${TOKEN}/getUpdates"

echo "🔍 Buscando seu Chat ID..."
echo ""
echo "⚠️  IMPORTANTE: Certifique-se de ter enviado uma mensagem para o seu bot antes!"
echo ""

RESPONSE=$(curl -s "$URL")

# PRIORIDADE 1: Buscar chat_id de GRUPOS (números negativos) em my_chat_member
GROUP_CHAT_ID=$(echo "$RESPONSE" | grep -o '"my_chat_member".*"chat":{"id":[-0-9]*' | grep -o '"id":[-0-9]*' | head -1 | grep -o '[-0-9]*$')

# PRIORIDADE 2: Buscar chat_id de GRUPOS em mensagens (números negativos)
if [ -z "$GROUP_CHAT_ID" ]; then
    GROUP_CHAT_ID=$(echo "$RESPONSE" | grep -o '"message".*"chat":{"id":-[0-9]*' | grep -o '"id":-[0-9]*' | head -1 | grep -o '[-0-9]*$')
fi

# PRIORIDADE 3: Buscar chat_id de chats privados (números positivos)
PRIVATE_CHAT_ID=$(echo "$RESPONSE" | grep -o '"chat":{"id":[0-9]*' | head -1 | grep -o '[0-9]*$')

# Usar grupo se encontrado, senão usar chat privado
if [ -n "$GROUP_CHAT_ID" ]; then
    CHAT_ID="$GROUP_CHAT_ID"
    CHAT_TYPE="grupo"
elif [ -n "$PRIVATE_CHAT_ID" ]; then
    CHAT_ID="$PRIVATE_CHAT_ID"
    CHAT_TYPE="chat privado"
fi

if [ -z "$CHAT_ID" ]; then
    echo "❌ Chat ID não encontrado!"
    echo ""
    echo "Certifique-se de:"
    echo "1. Ter enviado uma mensagem no grupo (ou adicionado o bot ao grupo)"
    echo "2. Ter aguardado alguns segundos após enviar"
    echo ""
    echo "Resposta completa da API:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo "✅ Chat ID encontrado: $CHAT_ID"
    if [ "$CHAT_TYPE" = "grupo" ]; then
        echo "📦 Tipo: Grupo"
    else
        echo "💬 Tipo: Chat privado"
    fi
    echo ""
    echo "Agora vou atualizar o arquivo .env.local..."
    
    # Atualizar o arquivo .env.local
    sed -i '' "s/TELEGRAM_CHAT_ID=.*/TELEGRAM_CHAT_ID=$CHAT_ID/" .env.local
    
    echo "✅ Arquivo .env.local atualizado!"
    echo ""
    echo "📋 Conteúdo do .env.local:"
    cat .env.local
    echo ""
    echo "🎉 Configuração completa! Agora reinicie o servidor (npm run dev)"
fi


