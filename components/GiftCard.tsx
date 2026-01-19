"use client"

import { motion } from "framer-motion"
import { Gift } from "@/types/gift"
import { CheckCircle2 } from "lucide-react"

interface GiftCardProps {
  gift: Gift
  index: number
  isChosen: boolean
  onClick: () => void
}

export default function GiftCard({ gift, index, isChosen, onClick }: GiftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isChosen 
          ? "ring-2 ring-brown-soft opacity-60 cursor-not-allowed" 
          : "hover:shadow-xl hover:scale-105"
      }`}
      onClick={!isChosen ? onClick : undefined}
    >
      {/* Imagem do presente */}
      <div className="aspect-square overflow-hidden bg-beige-light flex items-center justify-center">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="font-semibold text-charcoal-dark text-sm mb-2 line-clamp-2">
          {gift.name}
        </h3>
        <p className="text-xs text-charcoal-dark/60 mb-3 line-clamp-2">
          {gift.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-brown-soft bg-rose-soft/20 px-2 py-1 rounded-full">
            {gift.category}
          </span>
        </div>
      </div>

      {/* Overlay quando escolhido */}
      {isChosen && (
        <div className="absolute inset-0 bg-brown-soft/20 flex items-center justify-center">
          <div className="bg-brown-soft text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Escolhido
          </div>
        </div>
      )}
    </motion.div>
  )
}