"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Gift } from "@/types/gift"
import toast from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  giftName: z.string(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface GiftFormProps {
  gift: Gift
  onSuccess: () => void
  onCancel: () => void
}

export default function GiftForm({ gift, onSuccess, onCancel }: GiftFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      giftName: gift.name,
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Salvar na API global primeiro
      const giftResponse = await fetch("/api/gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftId: gift.id,
          action: "add"
        }),
      })

      // Enviar notificação para Telegram
      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          giftName: data.giftName,
          message: data.message || "",
        }),
      })

      const telegramResult = await telegramResponse.json()

      if (!telegramResponse.ok) {
        console.error("Telegram API Error:", telegramResult)
        const errorMsg = telegramResult.error || "Erro ao enviar notificação"
        
        // Mensagem específica para Chat ID não configurado
        if (errorMsg.includes("Chat ID")) {
          toast.error("⚠️ Configure o Chat ID do Telegram primeiro. Veja o arquivo TELEGRAM_SETUP.md")
        } else {
          toast.error(`Erro: ${errorMsg}`)
        }
        
        throw new Error(errorMsg)
      }

      toast.success("Obrigado! Seu presente foi registrado com sucesso! ❤️")
      onSuccess()
    } catch (error) {
      console.error("Error:", error)
      // Não mostrar toast duplicado se já foi mostrado acima
      if (!(error instanceof Error && error.message.includes("Chat ID"))) {
        toast.error("Ops! Algo deu errado. Tente novamente.")
      }
    }
  }

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-charcoal-dark mb-6">
        Confirmar Presente
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
          <label htmlFor="giftName" className="block text-sm font-medium text-charcoal-dark mb-2">
            Item escolhido
          </label>
          <Input
            id="giftName"
            {...register("giftName")}
            readOnly
            className="bg-rose-soft/30 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal-dark mb-2">
            Mensagem (opcional)
          </label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Deixe uma mensagem carinhosa para o casal..."
            rows={4}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Enviando..." : "Confirmar"}
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

