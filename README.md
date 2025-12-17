# Chá de Panela — Anna & Lucas (Next.js)

Landing page moderna e elegante para **Chá de Panela**, com lista de presentes, confirmação de presença e **notificações no Telegram** via rotas serverless do Next.js.

## ✅ O que este projeto entrega

- **Lista de presentes** com grid responsivo + modal + formulário
- **Confirmação de presença (RSVP)** com formulário
- **Notificações no Telegram**:
  - quando alguém confirma presença
  - quando alguém envia o formulário de presente
- **Galeria “Nossos Momentos”** com lightbox
- **Informações do evento** + botões para Google Maps/Waze + Google Calendar
- **Dashboard admin** em `/admin` com exportação de PDF
- **Reset controlado** dos “presentes escolhidos” (localStorage) após deploy

## 🧱 Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **TailwindCSS** + componentes **shadcn/ui**
- **Framer Motion** (animações)
- **React Hook Form** + **Zod**
- **react-hot-toast**

## 📦 Rodar localmente

Pré‑requisito: Node.js **18+**

1) Instalar dependências:

```bash
npm install
```

2) Criar `.env.local` (ou copie de `env.example`):

```bash
cp env.example .env.local
```

3) Rodar:

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 🔐 Variáveis de ambiente

Crie `.env.local` em desenvolvimento e configure **Environment Variables** na Vercel (produção).

- **`TELEGRAM_BOT_TOKEN`**: token do BotFather
- **`TELEGRAM_CHAT_ID`**: chat id (pode ser múltiplos, separados por vírgula)
- **`ADMIN_PASSWORD`**: senha do `/admin`

Guias:
- `TELEGRAM_SETUP.md`
- `COMO_CONFIGURAR_GRUPO.md`
- `CONFIGURACAO_RAPIDA.md`

## 🗂️ Estrutura (resumo)

```
app/
  api/
    telegram/route.ts   # notifica presente
    rsvp/route.ts       # notifica RSVP
    admin/route.ts      # autenticação simples do admin
  admin/page.tsx        # dashboard admin
components/
  GiftGrid.tsx          # controla chosen_gifts (localStorage)
  Footer.tsx            # galeria + infos do evento + maps/waze/calendar
data/
  gifts.ts              # catálogo de presentes
lib/
  rsvpStorage.ts        # RSVPs em localStorage
```

## 🧠 Persistência (importante)

Hoje, **presentes escolhidos** e **RSVPs** ficam no **localStorage do navegador**.  
Ou seja: não é um “banco global” compartilhado entre todos os convidados.

Se quiser persistência global (evitar duplicidade real), a solução é integrar um banco (ex.: Postgres/Neon/Supabase) — podemos fazer isso depois.

## ♻️ Reset dos presentes (quando necessário)

Para “liberar todos os presentes” após um deploy, usamos um reset automático controlado por token:
- `components/GiftGrid.tsx`
- `app/admin/page.tsx`

Basta alterar `RESET_TOKEN` e fazer novo deploy.

## 🚀 Deploy na Vercel

Veja o guia completo em `docs/DEPLOY_VERCEL.md`.

## 🖼️ Personalização rápida

- **Fotos**: `COMO_ALTERAR_FOTOS.md`
- **Presentes**: `data/gifts.ts` (adicionar/remover/editar)
- **Texto do evento**: `components/Hero.tsx`, `components/HistorySection.tsx`, `components/Footer.tsx`

## 📄 Licença

Projeto privado para uso do evento de Anna & Lucas.

