"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { saveRSVP } from "@/lib/rsvpStorage"

const rsvpSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  guests: z.string().min(1, "Informe o número de pessoas").regex(/^\d+$/, "Deve ser um número"),
  message: z.string().optional(),
})

type RSVPFormData = z.infer<typeof rsvpSchema>

interface RSVPFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function RSVPForm({ onSuccess, onCancel }: RSVPFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RSVPFormData) => {
    try {
      // Salvar na API global primeiro
      const rsvpResponse = await fetch("/api/rsvp-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          guests: parseInt(data.guests),
          message: data.message || "",
        }),
      })

      // Enviar notificação para Telegram
      const telegramResponse = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          guests: data.guests,
          message: data.message || "",
        }),
      })

      const telegramResult = await telegramResponse.json()

      if (!telegramResponse.ok) {
        console.error("Telegram API Error:", telegramResult)
        const errorMsg = telegramResult.error || "Erro ao enviar notificação"
        toast.error(`Erro: ${errorMsg}`)
        throw new Error(errorMsg)
      }

      // Salvar no localStorage também (backup local)
      saveRSVP({
        name: data.name,
        guests: parseInt(data.guests),
        message: data.message,
      })

      toast.success("Presença confirmada com sucesso! Estamos ansiosos para celebrar com você! ❤️")
      onSuccess()
    } catch (error) {
      console.error("Error:", error)
      if (!(error instanceof Error && error.message.includes("Chat ID"))) {
        toast.error("Ops! Algo deu errado. Tente novamente.")
      }
    }
  }

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-charcoal-dark mb-6">
        Confirmar Presença
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal-dark mb-2">
            Nome completo *
          </label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Seu nome completo"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-charcoal-dark mb-2">
            Número de pessoas *
          </label>
          <Input
            id="guests"
            type="number"
            min="1"
            {...register("guests")}
            placeholder="Ex: 2"
            className={errors.guests ? "border-red-500" : ""}
          />
          {errors.guests && (
            <p className="mt-1 text-sm text-red-500">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal-dark mb-2">
            Mensagem (opcional)
          </label>
          <Input
            id="message"
            {...register("message")}
            placeholder="Deixe uma mensagem para o casal..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Enviando..." : "Confirmar Presença"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

