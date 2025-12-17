"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Gift } from "@/types/gift"
import { CheckCircle2 } from "lucide-react"
import { useState, memo } from "react"

interface GiftCardProps {
  gift: Gift
  index: number
  isChosen: boolean
  onClick: () => void
}

function GiftCard({ gift, index, isChosen, onClick }: GiftCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
      whileHover={!isChosen ? { scale: 1.03, y: -3 } : {}}
      className={`h-full flex flex-col ${isChosen ? "cursor-default" : "cursor-pointer"}`}
      onClick={!isChosen ? onClick : undefined}
    >
      <div className={`bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/10 transition-all duration-200 flex flex-col h-full ${
        isChosen 
          ? "ring-2 ring-brown-soft ring-offset-2" 
          : "hover:shadow-2xl hover:shadow-black/20"
      }`}>
        <div className="relative h-64 w-full flex-shrink-0 bg-rose-soft/10">
          {imageLoading && (
            <div className="absolute inset-0 bg-rose-soft/20 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-brown-soft/30 border-t-brown-soft rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={gift.image}
            alt={gift.name}
            fill
            loading="lazy"
            className={`object-contain p-2 transition-opacity duration-200 ${imageLoading ? "opacity-0" : "opacity-100"} ${isChosen ? "grayscale" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setImageLoading(false)}
            quality={75}
          />
          {isChosen && (
            <div className="absolute inset-0 bg-brown-soft/20 flex items-center justify-center">
              <div className="bg-white rounded-full p-3 shadow-xl">
                <CheckCircle2 className="w-8 h-8 text-brown-soft" />
              </div>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow min-h-[140px]">
          <div className="flex items-start justify-between mb-2 gap-2">
            <h3 className="font-display text-lg font-semibold text-charcoal-dark line-clamp-2 flex-1">
              {gift.name}
            </h3>
            {isChosen && (
              <span className="text-xs font-medium text-brown-soft bg-rose-soft px-3 py-1 rounded-full flex-shrink-0">
                Escolhido
              </span>
            )}
          </div>
          {gift.price && (
            <p className="text-brown-soft font-medium mt-auto">{gift.price}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Memoizar componente para evitar re-renders desnecessários
export default memo(GiftCard, (prevProps, nextProps) => {
  return (
    prevProps.gift.id === nextProps.gift.id &&
    prevProps.isChosen === nextProps.isChosen &&
    prevProps.index === nextProps.index
  )
})

