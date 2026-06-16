"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Settings } from "lucide-react"
import HowItWorksVisual from "./how-it-works-visual"

const HOW_IT_WORKS_CARDS = [
  {
    title: "We connect your POS",
    description: "Jenna syncs with your menu, prices, and hours — we handle the entire integration.",
  },
  {
    title: "We customize for you",
    description: "Set the greeting, the upsells, and exactly how Jenna sounds on every call.",
  },
  {
    title: "We attach it to your phone",
    description: "Forward your line to Jenna and start capturing every call right away.",
  },
] as const

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[12px] py-[5px] bg-white overflow-hidden rounded-[6px] flex justify-start items-center gap-[8px] shadow-[0px_1px_1px_rgba(36, 36, 36,0.04)]">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#242424] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function DocumentationSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % HOW_IT_WORKS_CARDS.length)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-7 sm:gap-9">
      {/* Header Section (on page, outside container) */}
      <div className="w-full max-w-[586px] flex flex-col justify-start items-center gap-3 sm:gap-4 text-center">
        <Badge
          icon={<Settings className="w-[10.50px] h-[10.50px] text-[#242424]" />}
          text="How it works"
        />
        <div className="self-stretch text-center flex justify-center flex-col text-[#242424] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[1.1] font-sans tracking-tight">
          Done For You
        </div>
        <div className="self-stretch text-center text-[#6B7280] text-sm sm:text-base font-normal leading-7 font-sans">
          From the moment you sign up we build and manage every piece of Jenna
        </div>
      </div>

      {/* Content Section (no base container — matches hero layout) */}
      <div className="w-full flex justify-start items-center">
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 xl:gap-16">
          {/* Left Column - Feature Cards */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-[400px] xl:max-w-[440px] flex flex-col justify-center items-center gap-3 sm:gap-4 order-2 md:order-1">
            {HOW_IT_WORKS_CARDS.map((card, index) => {
              const isActive = index === activeCard

              return (
                <div
                  key={card.title}
                  onClick={() => handleCardClick(index)}
                  className={`w-full rounded-[6px] border overflow-hidden flex flex-col justify-start items-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-[rgba(36, 36, 36,0.12)] shadow-[0px_4px_14px_rgba(36, 36, 36,0.07)]"
                      : "bg-[#EFEFEF] border-transparent hover:bg-[#E6E6E6]"
                  }`}
                >
                  <div
                    className={`w-full h-0.5 bg-[rgba(0,0,0,0.08)] overflow-hidden ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#101010] animate-[progressBar_5s_linear_forwards] will-change-transform"
                    />
                  </div>
                  <div className="px-6 py-5 w-full flex flex-col gap-2">
                    <div className="self-stretch flex justify-center flex-col text-[#242424] text-sm font-semibold leading-6 font-sans">
                      {card.title}
                    </div>
                    <div className="self-stretch text-[#6B7280] text-[13px] font-normal leading-[22px] font-sans whitespace-pre-line">
                      {card.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Visual */}
          <div className="w-full md:w-auto md:flex-1 flex flex-col justify-center items-center order-1 md:order-2 md:px-0">
            <div className="relative w-full md:w-[580px] xl:w-[640px] 2xl:w-[700px] h-[250px] md:h-[420px] xl:h-[440px]">
              <HowItWorksVisual activeStep={activeCard} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}
