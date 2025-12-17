# ⚡ Configuração Rápida do Telegram

## Passo 1: Criar o arquivo .env.local

Na raiz do projeto, crie um arquivo chamado `.env.local` com o seguinte conteúdo:

```env
TELEGRAM_BOT_TOKEN=seu_token_aqui
TELEGRAM_CHAT_ID=seu_chat_id_aqui
```

## Passo 2: Obter o Token do Bot

1. Abra o Telegram e procure por `@BotFather`
2. Envie `/newbot` e siga as instruções
3. Copie o token fornecido (formato: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Cole no `.env.local` substituindo `seu_token_aqui`

## Passo 3: Obter o Chat ID

### Opção A: Usando o script (Recomendado)

1. Certifique-se de ter o token configurado no `.env.local`
2. Envie uma mensagem qualquer para o seu bot no Telegram
3. Execute o script:
   ```bash
   chmod +x get-chat-id.sh
   ./get-chat-id.sh
   ```
4. O script irá atualizar automaticamente o `.env.local` com o chat_id

### Opção B: Manualmente

1. Envie uma mensagem para o seu bot
2. Acesse no navegador:
   ```
   https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
   ```
   (Substitua `<SEU_TOKEN>` pelo token real)
3. Procure por `"chat":{"id":` e copie o número
4. Cole no `.env.local` substituindo `seu_chat_id_aqui`

## Passo 4: Reiniciar o servidor

```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev
```

## ✅ Testar

1. Acesse a landing page
2. Escolha um presente
3. Preencha o formulário
4. Você deve receber uma notificação no Telegram!

## 🔍 Verificar se está funcionando

Se você receber erros, verifique:

1. **Token inválido (erro 401)**: Verifique se o token está correto
2. **Chat ID não encontrado (erro 400)**: 
   - Verifique se enviou uma mensagem para o bot
   - Execute o script `get-chat-id.sh` novamente
3. **Variáveis não encontradas**: 
   - Certifique-se de que o arquivo `.env.local` está na raiz do projeto
   - Reinicie o servidor após criar/editar o arquivo

## 📚 Mais informações

Veja o arquivo `TELEGRAM_SETUP.md` para instruções detalhadas e troubleshooting completo.

## 🚀 Em produção (Vercel)

Em deploy na Vercel, não existe `.env.local`. Você deve configurar as variáveis no painel:

- Vercel → **Project Settings → Environment Variables**
- Adicione `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` (marque Production e Preview)
- Faça um **Redeploy** para aplicar


