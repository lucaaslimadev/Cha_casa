"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import RSVPForm from "./RSVPForm"

export default function HistorySection() {
  const [rsvpOpen, setRsvpOpen] = useState(false)

  return (
    <section className="py-24 px-4 bg-beige-light">
      <div className="max-w-4xl mx-auto">
        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-dark mb-8 text-center">
            Nossa História
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-black/10">
            <p className="text-lg md:text-xl text-charcoal-dark leading-relaxed text-center md:text-left">
              Esse é um momento muito especial para nós. Depois de tantos planos, sonhos e conversas infinitas, estamos dando o próximo passo: vamos morar juntos — e queremos celebrar com você no nosso Chá de Panela no dia 31 de janeiro de 2026.
            </p>
            <br />
            <p className="text-lg md:text-xl text-charcoal-dark leading-relaxed text-center md:text-left">
              E não poderia ser mais especial ter você com a gente!
            </p>
            <br />
            <p className="text-lg md:text-xl text-charcoal-dark leading-relaxed text-center md:text-left">
              Cada pessoa que está recebendo este convite faz parte da nossa história — e foi escolhida a dedo com muito carinho.
            </p>
            <br />
            <p className="text-lg md:text-xl text-charcoal-dark leading-relaxed text-center md:text-left">
              Estamos felizes, animados, celebrando e construindo nosso lar com amor.
            </p>
            <br />
            <p className="text-lg md:text-xl text-charcoal-dark leading-relaxed text-center md:text-left font-medium">
              Que bom que você está aqui para viver isso com a gente!
            </p>
          </div>
        </motion.div>

        {/* Data do Civil - Centralizada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-rose-soft flex items-center justify-center shadow-xl shadow-black/10 mb-4">
            <Calendar className="w-8 h-8 text-brown-soft" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal-dark mb-2 text-center">
            Chá de Panela
          </h3>
          <p className="text-xl md:text-2xl text-brown-soft font-medium text-center mb-6">
            31 de Janeiro de 2026
          </p>
          <Button
            onClick={() => setRsvpOpen(true)}
            className="mt-4"
          >
            Confirmar Presença
          </Button>
        </motion.div>

        {/* Modal de Confirmação de Presença */}
        <Dialog open={rsvpOpen} onOpenChange={setRsvpOpen}>
          <DialogContent className="max-w-2xl">
            <RSVPForm 
              onSuccess={() => setRsvpOpen(false)} 
              onCancel={() => setRsvpOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}



