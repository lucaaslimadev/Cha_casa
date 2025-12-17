# 📸 Como Alterar as Fotos

Este guia explica como substituir todas as imagens da landing page pelas suas próprias fotos.

## 📁 Onde estão as imagens

Existem **3 lugares** onde você precisa alterar as fotos:

1. **Hero** - Foto de fundo principal do casal
2. **Footer** - Galeria de fotos do casal
3. **Presentes** - Imagens dos itens da lista

---

## 🎯 Método 1: Usando imagens locais (Recomendado)

### Passo 1: Criar a pasta de imagens

1. Crie uma pasta `public` na raiz do projeto (se não existir)
2. Dentro de `public`, crie uma pasta `images`:
   ```
   public/
   └── images/
       ├── hero.jpg
       ├── gallery-1.jpg
       ├── gallery-2.jpg
       ├── gallery-3.jpg
       ├── gallery-4.jpg
       ├── gallery-5.jpg
       ├── gallery-6.jpg
       └── presentes/
           ├── pratos.jpg
           ├── panela.jpg
           └── ...
   ```

### Passo 2: Adicionar suas fotos

- Coloque a foto principal do casal em `public/images/hero.jpg`
- Coloque as fotos da galeria em `public/images/gallery-1.jpg`, `gallery-2.jpg`, etc.
- Coloque as fotos dos presentes em `public/images/presentes/`

### Passo 3: Atualizar os componentes

#### Hero (Foto Principal)

Edite `components/Hero.tsx` na linha 18:

```tsx
// ANTES:
src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop"

// DEPOIS:
src="/images/hero.jpg"
```

#### Footer (Galeria)

Edite `components/Footer.tsx` nas linhas 8-15:

```tsx
// ANTES:
const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
  // ...
]

// DEPOIS:
const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
]
```

#### Presentes

Edite `data/gifts.ts` e altere o campo `image` de cada presente:

```tsx
// ANTES:
image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop"

// DEPOIS:
image: "/images/presentes/pratos.jpg"
```

---

## 🌐 Método 2: Usando URLs externas

Se preferir hospedar as imagens em outro lugar (Google Drive, Imgur, etc.):

### Passo 1: Fazer upload das imagens

1. Faça upload das fotos em um serviço de hospedagem:
   - **Imgur** (gratuito)
   - **Cloudinary** (gratuito com limite)
   - **Google Drive** (compartilhar como público)
   - **Vercel Blob** (se estiver usando Vercel)

2. Copie a URL completa da imagem

### Passo 2: Atualizar os componentes

Substitua as URLs nos mesmos lugares mencionados acima, mas usando suas URLs:

```tsx
// Exemplo com URL externa:
src="https://i.imgur.com/abc123.jpg"
```

### Passo 3: Configurar Next.js (se necessário)

Se usar um domínio externo, edite `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'drive.google.com'], // Adicione seus domínios
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite qualquer domínio
      },
    ],
  },
}

module.exports = nextConfig
```

---

## 📐 Tamanhos recomendados

Para melhor qualidade e performance:

- **Hero**: 1920x1080px (ou proporção 16:9)
- **Galeria**: 800x800px (quadrado)
- **Presentes**: 800x600px (proporção 4:3)

### Dica: Redimensionar imagens

Use ferramentas online como:
- [TinyPNG](https://tinypng.com/) - Comprimir imagens
- [Squoosh](https://squoosh.app/) - Redimensionar e otimizar
- [Canva](https://www.canva.com/) - Editar e redimensionar

---

## ✅ Checklist

- [ ] Foto do Hero atualizada
- [ ] 6 fotos da galeria atualizadas
- [ ] Fotos dos presentes atualizadas (12 itens)
- [ ] Imagens otimizadas (tamanho reduzido)
- [ ] Testado em diferentes dispositivos

---

## 🐛 Problemas comuns

### Imagem não aparece

1. Verifique se o caminho está correto (começa com `/` para imagens locais)
2. Confirme que a imagem está na pasta `public`
3. Reinicie o servidor (`npm run dev`)

### Imagem muito pesada

1. Comprima a imagem usando TinyPNG
2. Redimensione para o tamanho recomendado
3. Use formato WebP quando possível

### Erro de CORS (URLs externas)

1. Configure o `next.config.js` com o domínio correto
2. Ou use imagens locais na pasta `public`

---

## 💡 Dicas

- **Formato**: Use JPG para fotos, PNG para imagens com transparência
- **Qualidade**: 80-90% de qualidade JPG é suficiente
- **Nomes**: Use nomes descritivos (ex: `hero-casal.jpg`)
- **Backup**: Mantenha as fotos originais em outro lugar




