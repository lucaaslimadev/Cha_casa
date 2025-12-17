# 👥 Configurar Bot no Grupo do Telegram

Este guia explica como configurar o bot para enviar notificações para um grupo, permitindo que múltiplas pessoas vejam as notificações.

## 📋 Passo a Passo

### 1. Criar um Grupo no Telegram

1. Abra o Telegram
2. Clique em "Nova Conversa" (ícone de lápis)
3. Selecione "Novo Grupo"
4. Adicione sua esposa/mulher ao grupo
5. Dê um nome ao grupo (ex: "Chá de Casa Nova - Notificações")

### 2. Adicionar o Bot ao Grupo

1. No grupo, clique no nome do grupo no topo
2. Vá em "Adicionar Membros" ou "Add Members"
3. Procure por `@Chacasa_bot` (ou o nome do seu bot)
4. Adicione o bot ao grupo

### 3. Obter o Chat ID do Grupo

**IMPORTANTE:** O chat_id de grupos é um número **negativo** (ex: `-123456789`)

#### Opção A: Usando o script (Recomendado)

1. No grupo, envie qualquer mensagem (ex: "teste")
2. Execute o script:
   ```bash
   ./get-chat-id.sh
   ```
3. O script irá atualizar automaticamente o `.env.local` com o chat_id do grupo

#### Opção B: Manualmente

1. No grupo, envie qualquer mensagem
2. Acesse no navegador:
   ```
   https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
   ```
   (Substitua `<SEU_TOKEN>` pelo token do seu bot)
3. Procure por `"chat":{"id":` na resposta
4. O chat_id do grupo será um número **negativo** (ex: `-123456789`)
5. Copie esse número (incluindo o sinal de menos)

### 4. Atualizar o .env.local

1. Abra o arquivo `.env.local` na raiz do projeto
2. Atualize a linha `TELEGRAM_CHAT_ID` com o chat_id do grupo:
   ```env
   TELEGRAM_CHAT_ID=-123456789
   ```
   (Substitua pelo chat_id real do seu grupo - será um número negativo)

### 5. Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev
```

### 6. Testar

1. Acesse a landing page
2. Escolha um presente
3. Preencha o formulário
4. Você e sua esposa devem receber a notificação no grupo! 🎉

## ✅ Vantagens de Usar Grupo

- ✅ Múltiplas pessoas podem ver as notificações
- ✅ Histórico de todos os presentes escolhidos
- ✅ Fácil de adicionar mais pessoas depois
- ✅ Não precisa mexer no código

## 🔍 Verificar se Está Funcionando

Se você receber erros, verifique:

1. **Bot não está no grupo**: Adicione o bot ao grupo novamente
2. **Chat ID incorreto**: 
   - Certifique-se de que o chat_id é negativo (grupos têm ID negativo)
   - Execute o script `get-chat-id.sh` novamente
3. **Bot não pode enviar mensagens**: 
   - Verifique se o bot tem permissão para enviar mensagens no grupo
   - Alguns grupos podem ter restrições

## 💡 Dica

Se quiser adicionar mais pessoas depois, basta adicioná-las ao grupo! Todas receberão as notificações automaticamente.


