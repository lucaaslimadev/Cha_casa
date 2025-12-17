import type { Metadata } from "next"
import { Inter, DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anna & Lucas - Chá de Casa Nova",
  description: "Vamos começar nossa casa juntos! Chá de Panela — 31 de Janeiro de 2026. Escolha um presente especial para ajudar a construir nosso lar com muito amor.",
  keywords: ["chá de casa nova", "lista de presentes", "casamento", "Anna e Lucas", "presentes"],
  authors: [{ name: "Anna & Lucas" }],
  openGraph: {
    title: "Anna & Lucas - Chá de Casa Nova",
    description: "Vamos começar nossa casa juntos! Chá de Panela — 31 de Janeiro de 2026",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anna & Lucas - Chá de Casa Nova",
    description: "Vamos começar nossa casa juntos! Chá de Panela — 31 de Janeiro de 2026",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#3E3E3E',
              borderRadius: '1rem',
              padding: '16px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#8D6E63',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

