# 🚀 Deploy na Vercel (com Telegram funcionando)

Este guia assume um projeto Next.js 14 (App Router) com rotas em `app/api/*`.

## ✅ Checklist rápido

- [ ] Repositório no GitHub com o código (não pode estar vazio)
- [ ] Variáveis de ambiente configuradas na Vercel:
  - [ ] `TELEGRAM_BOT_TOKEN`
  - [ ] `TELEGRAM_CHAT_ID`
  - [ ] `ADMIN_PASSWORD`
- [ ] Deploy concluído e testado:
  - [ ] Formulário de presente envia Telegram
  - [ ] RSVP envia Telegram
  - [ ] `/admin` acessível com senha

---

## 1) Publicar o projeto no GitHub (repo está vazio)

Na pasta do projeto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:lucaaslimadev/Cha_casa.git
git push -u origin main
```

Se você prefere HTTPS:

```bash
git remote add origin https://github.com/lucaaslimadev/Cha_casa.git
git push -u origin main
```

> Importante: o arquivo `.env.local` **não** vai para o Git. Use `env.example` como referência.

---

## 2) Criar/Conectar projeto na Vercel

1. Acesse a Vercel e clique em **Add New → Project**
2. Importe o repositório `lucaaslimadev/Cha_casa`
3. Framework: **Next.js** (auto-detect)
4. Clique em **Deploy**

---

## 3) Configurar variáveis de ambiente (essencial pro bot)

No projeto da Vercel:

**Settings → Environment Variables**

Adicione as variáveis (recomendado marcar para **Production** e **Preview**):

- `TELEGRAM_BOT_TOKEN` = (token do BotFather)
- `TELEGRAM_CHAT_ID` = (chat id do seu usuário ou do grupo; pode ser múltiplos separados por vírgula)
- `ADMIN_PASSWORD` = (senha do `/admin`)

Depois disso, faça **Redeploy**:
- **Deployments → … → Redeploy**, ou
- dê um novo `git push` (recomendado)

---

## 4) Testes pós-deploy (produção)

1) Abra o site publicado

2) **Teste presente**
- Abra um presente → “Quero presentear” → envie
- Verifique se a mensagem chegou no Telegram

3) **Teste RSVP**
- “Confirmar Presença” → envie
- Verifique se a mensagem chegou no Telegram

4) **Teste admin**
- Acesse `/admin`
- Faça login com `ADMIN_PASSWORD`

---

## 5) Tenho um site já hospedado na Vercel — isso muda algo?

Depende do que você quer manter:

- **Se você quer manter o mesmo domínio**: você pode **apontar o domínio** para este novo projeto (ou trocar o repo do projeto atual).
- **Se você quer manter o projeto atual e criar outro**: sem problema — crie um projeto novo na Vercel e depois mova o domínio quando estiver tudo ok.

O bot não depende do “projeto antigo”, ele depende de:
- rotas `app/api/*` estarem no deploy
- variáveis de ambiente corretas

---

## 6) Problemas comuns

### Bot funciona local e não funciona na Vercel
- Verifique se as env vars foram adicionadas em **Production**
- Veja logs em **Vercel → Deployments → Functions/Logs**

### Chat ID de grupo não funciona
- Chat ID de grupo é **negativo**
- O bot precisa estar no grupo e ter permissão de enviar mensagens

---

## 7) Segurança

- **Nunca** coloque `TELEGRAM_BOT_TOKEN` no código
- Use `ADMIN_PASSWORD` forte e só em env var


