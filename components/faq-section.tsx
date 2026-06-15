"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Jenna and who is it for?",
    answer:
      "Jenna is an AI hostess for restaurants. She answers your phone, takes pickup and delivery orders, and books reservations — start to finish. She's built for any restaurant that takes orders or bookings over the phone.",
  },
  {
    question: "How does Jenna take an order?",
    answer:
      "Jenna answers the call, understands what the customer wants, reads your live menu and prices, confirms the order, and sends it straight into your POS — just like a trained employee would.",
  },
  {
    question: "Does Jenna work with my POS?",
    answer:
      "Yes. Jenna connects to the major POS systems so orders and reservations flow in automatically. There's no new hardware to buy and nothing for your staff to learn.",
  },
  {
    question: "What happens during a rush or after hours?",
    answer:
      "Jenna answers every call instantly, 24/7 — no hold times and no missed orders, even when every table is full or you're closed.",
  },
  {
    question: "How accurate is Jenna?",
    answer:
      "Very. Because Jenna reads your live menu and prices directly from your system and confirms each order with the customer, what reaches your kitchen is exactly what was ordered.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a quick demo to hear Jenna live. Once you're in, we connect your POS and you can be taking calls within days.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#242424] font-semibold leading-tight md:leading-[44px] font-sans text-3xl sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-[#6B7280] text-base font-normal leading-7 font-sans">
            Everything you need to know about putting Jenna on your phone line.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[rgba(36, 36, 36,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(36, 36, 36,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#242424] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[rgba(36, 36, 36,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#6B7280] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
