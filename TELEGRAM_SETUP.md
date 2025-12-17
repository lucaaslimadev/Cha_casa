# 📱 Configuração do Telegram

Este guia explica como configurar as notificações do Telegram para receber mensagens quando alguém escolher um presente.

## Passo a Passo

### 1. Criar um Bot no Telegram

1. Abra o Telegram e procure por `@BotFather`
2. Envie o comando `/newbot`
3. Escolha um nome para o bot (ex: "Chá de Casa Nova Bot")
4. Escolha um username para o bot (deve terminar com `bot`, ex: `chacasa_bot`)
5. **Copie o token** que o BotFather fornecer (algo como: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Obter seu Chat ID

1. Envie uma mensagem qualquer para o bot que você acabou de criar
2. Acesse no navegador:
   ```
   https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
   ```
   (Substitua `<SEU_TOKEN>` pelo token que você copiou)
3. Procure na resposta por `"chat":{"id":` e copie o número que vem depois
   - Exemplo: `"chat":{"id":123456789` → seu chat_id é `123456789`

### 3. Configurar no Projeto

1. Crie um arquivo `.env.local` na raiz do projeto (mesmo nível do `package.json`)
2. Adicione as seguintes linhas:
   ```env
   TELEGRAM_BOT_TOKEN=seu_token_aqui
   TELEGRAM_CHAT_ID=seu_chat_id_aqui
   ```
3. Substitua `seu_token_aqui` e `seu_chat_id_aqui` pelos valores que você copiou
4. Salve o arquivo
5. **Reinicie o servidor** (`npm run dev`)

### 4. Testar

1. Preencha o formulário de um presente na landing page
2. Envie o formulário
3. Você deve receber uma mensagem no Telegram com:
   - Nome da pessoa
   - Presente escolhido
   - Mensagem (se houver)
   - Data e hora

## Exemplo de Mensagem Recebida

```
🎁 Novo Presente Escolhido!

👤 Nome: Maria Silva
🎁 Presente: Jogo de Pratos
💬 Mensagem: Parabéns pelo casamento! Muito sucesso!

Enviado em 15/01/2026 14:30:00
```

## Troubleshooting

### Não recebo mensagens
- Verifique se o arquivo `.env.local` está na raiz do projeto
- Confirme que as variáveis estão corretas (sem espaços extras)
- Certifique-se de ter reiniciado o servidor após criar o `.env.local`
- Verifique se enviou uma mensagem para o bot antes de obter o chat_id

### Erro: "Token do bot não configurado"
- Crie o arquivo `.env.local` na raiz do projeto
- Adicione a linha: `TELEGRAM_BOT_TOKEN=seu_token_aqui`
- Substitua `seu_token_aqui` pelo token real do BotFather
- Reinicie o servidor

### Erro: "Chat ID não configurado"
- Adicione a linha no `.env.local`: `TELEGRAM_CHAT_ID=seu_chat_id_aqui`
- Execute o script `get-chat-id.sh` para obter o chat_id automaticamente
- Ou obtenha manualmente acessando: `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates`
- Reinicie o servidor

### Erro: "Token do bot inválido ou expirado" (erro 401)
- Verifique se o token está correto no arquivo `.env.local`
- Confirme que não há espaços extras ou aspas no token
- Gere um novo token no BotFather se necessário

### Erro: "Chat ID não encontrado" (erro 400)
- Verifique se o chat_id está correto
- Certifique-se de ter enviado pelo menos uma mensagem para o bot
- Execute o script `get-chat-id.sh` novamente para obter o chat_id atualizado

### Erro ao enviar
- Verifique os logs do servidor para mais detalhes
- Confirme que ambas as variáveis estão configuradas corretamente
- Teste o token acessando: `https://api.telegram.org/bot<SEU_TOKEN>/getMe`

## Segurança

⚠️ **IMPORTANTE:**
- Nunca commite o arquivo `.env.local` no Git
- O arquivo já está no `.gitignore` por padrão
- Em produção (Vercel, etc.), configure as variáveis de ambiente nas configurações do serviço:
  - Vercel → **Project Settings → Environment Variables**
  - Configure (Production e Preview): `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`
  - Depois faça um **Redeploy** para as env vars aplicarem




