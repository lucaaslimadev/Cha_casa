"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gifts } from "@/data/gifts"
import { Lock, Gift, Users, TrendingUp, CheckCircle2, FileDown } from "lucide-react"
import toast from "react-hot-toast"
import { getRSVPs, getTotalGuests, type RSVPEntry } from "@/lib/rsvpStorage"
import { generatePDF } from "@/lib/generatePDF"

const STORAGE_KEY = "chosen_gifts"
// Altere esse valor quando quiser "resetar" a lista para todo mundo após um deploy
const RESET_TOKEN_KEY = "chosen_gifts_reset_token"
const RESET_TOKEN = "2025-12-17-reset-2"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [chosenGifts, setChosenGifts] = useState<string[]>([])
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([])

  useEffect(() => {
    // Carregar presentes escolhidos e confirmações do localStorage
    if (typeof window !== "undefined") {
      try {
        // Reset automático (uma vez) para liberar todos os presentes novamente
        const lastReset = localStorage.getItem(RESET_TOKEN_KEY)
        if (lastReset !== RESET_TOKEN) {
          localStorage.removeItem(STORAGE_KEY)
          localStorage.setItem(RESET_TOKEN_KEY, RESET_TOKEN)
        }

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const giftIds = JSON.parse(stored) as string[]
          const validIds = giftIds.filter((id) => gifts.some((g) => g.id === id))
          setChosenGifts(validIds)
        }
        setRsvps(getRSVPs())
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setAuthenticated(true)
        toast.success("Acesso autorizado!")
      } else {
        toast.error("Senha incorreta")
      }
    } catch (error) {
      toast.error("Erro ao autenticar")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-light px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-brown-soft mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-charcoal-dark mb-2">
              Área Administrativa
            </h1>
            <p className="text-charcoal-dark/70">
              Digite a senha para acessar
            </p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full"
            />
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </div>
          <p className="text-xs text-charcoal-dark/50 mt-4 text-center">
            Senha padrão: admin123 (configure ADMIN_PASSWORD no .env.local)
          </p>
        </div>
      </div>
    )
  }

  const chosenGiftsData = gifts.filter((gift) => chosenGifts.includes(gift.id))
  const totalGifts = gifts.length
  const chosenCount = chosenGifts.length
  const percentage = Math.round((chosenCount / totalGifts) * 100)
  const totalGuests = getTotalGuests()

  const handleGeneratePDF = () => {
    try {
      generatePDF({
        gifts,
        chosenGifts,
        rsvps,
        totalGifts,
        chosenCount,
        totalGuests,
      })
      toast.success("PDF gerado com sucesso! 📄")
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      toast.error("Erro ao gerar PDF. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-beige-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="font-display text-4xl font-bold text-charcoal-dark">
              Dashboard - Chá de Casa Nova
            </h1>
            <Button
              onClick={handleGeneratePDF}
              className="bg-brown-soft hover:bg-brown-soft/90 text-white"
            >
              <FileDown className="mr-2 h-5 w-5" />
              Gerar PDF
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-rose-soft/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <Gift className="w-12 h-12 text-brown-soft" />
                <div>
                  <p className="text-charcoal-dark/70 text-sm">Presentes Escolhidos</p>
                  <p className="text-3xl font-bold text-charcoal-dark">
                    {chosenCount} / {totalGifts}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-rose-soft/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-12 h-12 text-brown-soft" />
                <div>
                  <p className="text-charcoal-dark/70 text-sm">Progresso</p>
                  <p className="text-3xl font-bold text-charcoal-dark">
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-rose-soft/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-brown-soft" />
                <div>
                  <p className="text-charcoal-dark/70 text-sm">Disponíveis</p>
                  <p className="text-3xl font-bold text-charcoal-dark">
                    {totalGifts - chosenCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas de Confirmações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
                <div>
                  <p className="text-charcoal-dark/70 text-sm">Confirmações de Presença</p>
                  <p className="text-3xl font-bold text-charcoal-dark">
                    {rsvps.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-green-600" />
                <div>
                  <p className="text-charcoal-dark/70 text-sm">Total de Convidados</p>
                  <p className="text-3xl font-bold text-charcoal-dark">
                    {totalGuests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Presentes Escolhidos */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-charcoal-dark mb-6">
              Presentes Escolhidos
            </h2>
            {chosenGiftsData.length === 0 ? (
              <p className="text-charcoal-dark/70 text-center py-8">
                Nenhum presente foi escolhido ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {chosenGiftsData.map((gift) => (
                  <div
                    key={gift.id}
                    className="bg-beige-light rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal-dark">{gift.name}</h3>
                      <p className="text-sm text-charcoal-dark/70">{gift.category}</p>
                    </div>
                    <div className="px-4 py-2 bg-brown-soft text-white rounded-full text-sm font-medium">
                      Escolhido
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lista de Confirmações de Presença */}
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal-dark mb-6">
              Confirmações de Presença
            </h2>
            {rsvps.length === 0 ? (
              <p className="text-charcoal-dark/70 text-center py-8">
                Nenhuma confirmação de presença ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="bg-green-50 rounded-xl p-4 border-2 border-green-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-charcoal-dark mb-1">{rsvp.name}</h3>
                        <p className="text-sm text-charcoal-dark/70 mb-2">
                          {rsvp.guests} {rsvp.guests === 1 ? "pessoa" : "pessoas"}
                        </p>
                        {rsvp.message && (
                          <p className="text-sm text-charcoal-dark/80 italic mt-2">
                            &quot;{rsvp.message}&quot;
                          </p>
                        )}
                        <p className="text-xs text-charcoal-dark/50 mt-2">
                          {new Date(rsvp.date).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium flex-shrink-0">
                        Confirmado
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-charcoal-dark/10">
            <Button
              variant="outline"
              onClick={() => {
                setAuthenticated(false)
                setPassword("")
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

