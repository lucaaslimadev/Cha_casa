"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { gifts } from "@/data/gifts"
import GiftCard from "./GiftCard"
import GiftModal from "./GiftModal"
import { Gift } from "@/types/gift"

const STORAGE_KEY = "chosen_gifts"
// Altere esse valor quando quiser "resetar" a lista para todo mundo após um deploy
const RESET_TOKEN_KEY = "chosen_gifts_reset_token"
const RESET_TOKEN = "2025-12-17"

export default function GiftGrid() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [chosenGifts, setChosenGifts] = useState<Set<string>>(new Set())

  // Carregar presentes escolhidos do localStorage ao montar
  useEffect(() => {
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
          // Garante que IDs removidos do catálogo não "quebrem" o estado
          const validIds = giftIds.filter((id) => gifts.some((g) => g.id === id))
          setChosenGifts(new Set(validIds))
        }
      } catch (error) {
        console.error("Erro ao carregar presentes do localStorage:", error)
      }
    }
  }, [])

  // Salvar no localStorage sempre que chosenGifts mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (chosenGifts.size === 0) {
          localStorage.removeItem(STORAGE_KEY)
          return
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(chosenGifts)))
      } catch (error) {
        console.error("Erro ao salvar presentes no localStorage:", error)
      }
    }
  }, [chosenGifts])

  const handleGiftClick = (gift: Gift) => {
    setSelectedGift(gift)
  }

  const handleCloseModal = () => {
    setSelectedGift(null)
  }

  const handleGiftChosen = (giftId: string) => {
    setChosenGifts((prev) => {
      const newSet = new Set([...prev, giftId])
      // Salvar imediatamente no localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)))
        } catch (error) {
          console.error("Erro ao salvar presente no localStorage:", error)
        }
      }
      return newSet
    })
  }

  return (
    <section id="gifts" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-dark mb-4">
            Lista de Presentes
          </h2>
          <p className="text-lg text-charcoal-dark/70 max-w-2xl mx-auto mb-4">
            Escolha um presente especial para ajudar a construir nosso lar com muito amor
          </p>
          {/* Contador de presentes escolhidos */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-soft/20 rounded-full">
            <span className="text-brown-soft font-semibold text-lg">
              {chosenGifts.size} de {gifts.length} presentes escolhidos
            </span>
            {chosenGifts.size > 0 && (
              <span className="text-brown-soft/70 text-sm">
                ({Math.round((chosenGifts.size / gifts.length) * 100)}%)
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gifts.map((gift, index) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              index={index}
              isChosen={chosenGifts.has(gift.id)}
              onClick={() => handleGiftClick(gift)}
            />
          ))}
        </div>
      </div>

      {selectedGift && (
        <GiftModal 
          gift={selectedGift} 
          onClose={handleCloseModal}
          onGiftChosen={handleGiftChosen}
        />
      )}
    </section>
  )
}

