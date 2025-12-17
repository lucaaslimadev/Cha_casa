import jsPDF from "jspdf"
import { Gift } from "@/types/gift"
import { RSVPEntry } from "./rsvpStorage"

interface PDFData {
  gifts: Gift[]
  chosenGifts: string[]
  rsvps: RSVPEntry[]
  totalGifts: number
  chosenCount: number
  totalGuests: number
}

export function generatePDF(data: PDFData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  // Função para adicionar nova página se necessário
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Cabeçalho
  doc.setFontSize(24)
  doc.setTextColor(61, 61, 61) // charcoal-dark
  doc.setFont("helvetica", "bold")
  doc.text("Chá de Casa Nova - Anna & Lucas", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 15

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text(`Relatório gerado em ${new Date().toLocaleString("pt-BR")}`, pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Estatísticas Gerais
  doc.setFontSize(16)
  doc.setTextColor(61, 61, 61)
  doc.setFont("helvetica", "bold")
  doc.text("Estatísticas Gerais", margin, yPosition)
  yPosition += 10

  doc.setFontSize(11)
  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "normal")
  doc.text(`Presentes Escolhidos: ${data.chosenCount} de ${data.totalGifts}`, margin + 5, yPosition)
  yPosition += 7
  doc.text(`Progresso: ${Math.round((data.chosenCount / data.totalGifts) * 100)}%`, margin + 5, yPosition)
  yPosition += 7
  doc.text(`Confirmações de Presença: ${data.rsvps.length}`, margin + 5, yPosition)
  yPosition += 7
  doc.text(`Total de Convidados: ${data.totalGuests} pessoas`, margin + 5, yPosition)
  yPosition += 15

  // Seção de Presentes Escolhidos
  checkNewPage(30)
  doc.setFontSize(16)
  doc.setTextColor(61, 61, 61)
  doc.setFont("helvetica", "bold")
  doc.text("Presentes Escolhidos", margin, yPosition)
  yPosition += 10

  const chosenGiftsData = data.gifts.filter((gift) => data.chosenGifts.includes(gift.id))

  if (chosenGiftsData.length === 0) {
    doc.setFontSize(11)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "italic")
    doc.text("Nenhum presente foi escolhido ainda.", margin + 5, yPosition)
    yPosition += 10
  } else {
    chosenGiftsData.forEach((gift, index) => {
      checkNewPage(20)
      doc.setFontSize(11)
      doc.setTextColor(61, 61, 61)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${gift.name}`, margin + 5, yPosition)
      yPosition += 6

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text(`Categoria: ${gift.category}`, margin + 10, yPosition)
      yPosition += 6

      if (gift.description) {
        const descriptionLines = doc.splitTextToSize(gift.description, pageWidth - margin * 2 - 10)
        doc.text(descriptionLines, margin + 10, yPosition)
        yPosition += descriptionLines.length * 5
      }
      yPosition += 5
    })
  }

  yPosition += 10

  // Seção de Confirmações de Presença
  checkNewPage(30)
  doc.setFontSize(16)
  doc.setTextColor(61, 61, 61)
  doc.setFont("helvetica", "bold")
  doc.text("Confirmações de Presença", margin, yPosition)
  yPosition += 10

  if (data.rsvps.length === 0) {
    doc.setFontSize(11)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "italic")
    doc.text("Nenhuma confirmação de presença ainda.", margin + 5, yPosition)
    yPosition += 10
  } else {
    data.rsvps.forEach((rsvp, index) => {
      checkNewPage(25)
      doc.setFontSize(11)
      doc.setTextColor(61, 61, 61)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${rsvp.name}`, margin + 5, yPosition)
      yPosition += 6

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text(`${rsvp.guests} ${rsvp.guests === 1 ? "pessoa" : "pessoas"}`, margin + 10, yPosition)
      yPosition += 6

      if (rsvp.message) {
        const messageLines = doc.splitTextToSize(`"${rsvp.message}"`, pageWidth - margin * 2 - 10)
        doc.text(messageLines, margin + 10, yPosition)
        yPosition += messageLines.length * 5
      }

      doc.setFontSize(9)
      doc.setTextColor(120, 120, 120)
      doc.text(`Confirmado em: ${new Date(rsvp.date).toLocaleString("pt-BR")}`, margin + 10, yPosition)
      yPosition += 8
    })
  }

  // Rodapé
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.setFont("helvetica", "normal")
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    )
  }

  // Salvar PDF
  const fileName = `cha-casa-nova-relatorio-${new Date().toISOString().split("T")[0]}.pdf`
  doc.save(fileName)
}


