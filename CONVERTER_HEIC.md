# 🔄 Como Converter HEIC para JPG - Solução Definitiva

As imagens `gallery-4.jpg` e `gallery-5.jpg` ainda estão em formato HEIC. Use um destes métodos:

## 🌐 Método 1: Conversor Online (Mais Fácil)

1. Acesse: **https://cloudconvert.com/heic-to-jpg**
2. Faça upload de `gallery-4.jpg` e `gallery-5.jpg`
3. Aguarde a conversão
4. Baixe os arquivos JPG convertidos
5. **Substitua** os arquivos na pasta `public/`

## 💻 Método 2: Usando sips (Terminal do Mac)

Abra o Terminal e execute:

```bash
cd /Users/lucaslima/Desktop/PROJETOS_GITHUB/lanepage_chacasa/public

# Converter gallery-4
sips -s format jpeg gallery-4.jpg --out gallery-4-converted.jpg
mv gallery-4-converted.jpg gallery-4.jpg

# Converter gallery-5
sips -s format jpeg gallery-5.jpg --out gallery-5-converted.jpg
mv gallery-5-converted.jpg gallery-5.jpg
```

## 📱 Método 3: Usando App no iPhone/iPad

1. Baixe o app **"HEIC Converter"** (gratuito)
2. Abra as fotos no app
3. Converta para JPG
4. Envie para o Mac e substitua na pasta `public/`

## ✅ Verificar se Funcionou

Após converter, execute no Terminal:

```bash
file public/gallery-4.jpg public/gallery-5.jpg
```

Deve mostrar: `JPEG image data` (não "HEIF")

---

**Recomendação:** Use o Método 1 (CloudConvert) - é o mais confiável e rápido!




