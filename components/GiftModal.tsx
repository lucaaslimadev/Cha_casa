"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gift } from "@/types/gift"
import GiftForm from "./GiftForm"

interface GiftModalProps {
  gift: Gift
  onClose: () => void
  onGiftChosen: (giftId: string) => void
}

export default function GiftModal({ gift, onClose, onGiftChosen }: GiftModalProps) {
  const [showForm, setShowForm] = useState(false)

  const handleWantToGift = () => {
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    onGiftChosen(gift.id)
    setShowForm(false)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl">{gift.name}</DialogTitle>
              {gift.description && (
                <DialogDescription className="text-base pt-2">
                  {gift.description}
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden my-4">
              <Image
                src={gift.image}
                alt={gift.name}
                fill
                className="object-cover"
              />
            </div>

            {gift.price && (
              <p className="text-2xl font-semibold text-brown-soft mb-6">
                {gift.price}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleWantToGift} className="flex-1">
                Quero presentear
              </Button>
            </div>
          </>
        ) : (
          <GiftForm gift={gift} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
        )}
      </DialogContent>
    </Dialog>
  )
}

