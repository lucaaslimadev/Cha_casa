"use client"

import { useRef } from "react"
import Hero from "@/components/Hero"
import HistorySection from "@/components/HistorySection"
import GiftGrid from "@/components/GiftGrid"
import Footer from "@/components/Footer"

export default function Home() {
  const giftsRef = useRef<HTMLDivElement>(null)

  const scrollToGifts = () => {
    giftsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      <Hero onScrollToGifts={scrollToGifts} />
      <HistorySection />
      <div ref={giftsRef}>
        <GiftGrid />
      </div>
      <Footer />
    </main>
  )
}




