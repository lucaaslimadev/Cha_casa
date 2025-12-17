"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Heart, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const galleryImages = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpeg",
  "/gallery-5.jpg",
  "/gallery-6.jpg",
]

function GalleryImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Evita "spinner infinito" quando a imagem já está em cache e o onLoad dispara
  // antes da hidratação/assinatura do handler.
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    if (img.complete && img.naturalWidth > 0) {
      setImageLoading(false)
      setImageError(false)
    }
  }, [src])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-32 sm:h-48 w-full rounded-2xl overflow-hidden shadow-xl shadow-black/20 bg-rose-soft/20 cursor-pointer group"
      onClick={onClick}
    >
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-rose-soft/20 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {!imageError ? (
        <img
          ref={imgRef}
          src={src}
          alt={`Foto ${index + 1}`}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={() => {
            setImageError(true)
            setImageLoading(false)
          }}
          onLoad={() => setImageLoading(false)}
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/50 p-4 text-center">
          <span className="text-sm mb-2">Foto {index + 1}</span>
          <span className="text-xs opacity-70">
            Erro ao carregar imagem
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function Footer() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Informações do evento
  const eventDate = "31 de Janeiro de 2026"
  const eventTime = "12:00" // Ajuste conforme necessário
  const eventAddress = "Av. das Hortências, 1206 - Park Res. Convivio" // Ajuste conforme necessário

  const handleGoogleCalendar = () => {
    const eventDateISO = "20260131"
    const eventTitle = encodeURIComponent("Chá de Panela - Anna & Lucas")
    const eventDetails = encodeURIComponent(`Chá de Panela de Anna & Lucas\n\nData: ${eventDate}\nHorário: ${eventTime}\nLocal: ${eventAddress}`)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDateISO}/${eventDateISO}&details=${eventDetails}`
    window.open(calendarUrl, "_blank")
  }

  const handleMaps = () => {
    // Abre já com destino (melhor UX do que "search")
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventAddress)}`
    window.open(mapsUrl, "_blank")
  }

  const handleWaze = () => {
    // Tenta abrir já em modo navegação
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(eventAddress)}&navigate=yes`
    window.open(wazeUrl, "_blank")
  }

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    setLightboxOpen(true)
  }

  return (
    <footer className="bg-charcoal-dark text-white py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Nossos Momentos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <GalleryImage key={index} src={image} index={index} onClick={() => handleImageClick(image)} />
            ))}
          </div>
        </motion.div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black/95 border-none">
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-8 h-8" />
              </button>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Foto ampliada"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Informações do Evento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-6">
            Informações do Evento
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <p className="text-white/80 mb-2">📅 Data</p>
              <p className="text-white font-semibold text-lg">{eventDate}</p>
            </div>
            <div>
              <p className="text-white/80 mb-2">🕐 Horário</p>
              <p className="text-white font-semibold text-lg">{eventTime}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-white/80 mb-2">📍 Local</p>
              <p className="text-white font-semibold text-lg">{eventAddress}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8 flex-wrap"
        >
          <Button
            variant="outline"
            onClick={handleGoogleCalendar}
            className="bg-transparent border-white text-white hover:bg-white hover:text-charcoal-dark"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Salvar no Calendar
          </Button>
          <Button
            variant="outline"
            onClick={handleMaps}
            className="bg-transparent border-white text-white hover:bg-white hover:text-charcoal-dark"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Google Maps
          </Button>
          <Button
            variant="outline"
            onClick={handleWaze}
            className="bg-transparent border-white text-white hover:bg-white hover:text-charcoal-dark"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Waze
          </Button>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-white/80">
            Feito com amor por{" "}
            <span className="font-display font-semibold">Anna & Lucas</span>{" "}
            <Heart className="inline h-5 w-5 text-rose-soft" />
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

