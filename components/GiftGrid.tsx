"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { gifts } from "@/data/gifts"
import GiftCard from "./GiftCard"
import GiftModal from "./GiftModal"
import { Gift } from "@/types/gift"

export default function GiftGrid() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [chosenGifts, setChosenGifts] = useState<Set<string>>(new Set())

  // Carregar presentes escolhidos da API global
  useEffect(() => {
    const loadChosenGifts = async () => {
      try {
        const response = await fetch('/api/gifts')
        const data = await response.json()
        if (data.chosenGifts) {
          const validIds = data.chosenGifts.filter((id: string) => gifts.some((g) => g.id === id))
          setChosenGifts(new Set(validIds))
        }
      } catch (error) {
        console.error("Erro ao carregar presentes:", error)
      }
    }
    
    loadChosenGifts()
    
    // Atualizar a cada 5 segundos para sincronizar com outras sessões
    const interval = setInterval(loadChosenGifts, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleGiftClick = (gift: Gift) => {
    setSelectedGift(gift)
  }

  const handleCloseModal = () => {
    setSelectedGift(null)
  }

  const handleGiftChosen = async (giftId: string) => {
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId, action: 'add' })
      })
      
      const data = await response.json()
      if (data.success) {
        setChosenGifts(new Set(data.chosenGifts))
      }
    } catch (error) {
      console.error("Erro ao salvar presente:", error)
    }
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
          {gifts
            .sort((a, b) => {
              const aChosen = chosenGifts.has(a.id)
              const bChosen = chosenGifts.has(b.id)
              // Não escolhidos primeiro (false vem antes de true)
              if (aChosen === bChosen) return 0
              return aChosen ? 1 : -1
            })
            .map((gift, index) => (
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

