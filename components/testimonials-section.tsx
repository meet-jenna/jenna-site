"use client"

import { useState, useEffect } from "react"
import type React from "react"

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

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      quote:
        "We used to lose orders every Friday night because no one could get to the phone. Jenna answers every single call now — pickup revenue is up and the kitchen isn't slammed by the phone.",
      name: "Tony Russo",
      company: "Owner, Vitos Northport",
      image: "/testimonials/restaurant-1.png",
    },
    {
      quote:
        "Orders come in exactly right because Jenna pulls straight from our menu. No more wrong sizes, no more comped meals from mistakes.",
      name: "Maria Delgado",
      company: "GM, Rosie's Trattoria",
      image: "/testimonials/restaurant-2.png",
    },
    {
      quote:
        "My staff can focus on the guests in front of them instead of running to the phone. Reservations just show up already booked.",
      name: "Kevin Tran",
      company: "Owner, Harbor House Grill",
      image: "/testimonials/restaurant-3.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300)
    }, 12000) // increased from 6000ms to 12000ms for longer testimonial display

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNavigationClick = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  return (
    <div data-reveal="scale" className="w-full rounded-[6px] overflow-hidden flex flex-col justify-center items-center">
      {/* Testimonial Card with restaurant photo background */}
      <div className="relative w-full min-h-[420px] md:min-h-[480px] rounded-[6px] overflow-hidden flex items-end">
        {/* Background restaurant photos (cross-fade) */}
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${t.image})`,
              opacity: index === activeTestimonial && !isTransitioning ? 1 : 0,
              transform: index === activeTestimonial ? "scale(1.03)" : "scale(1)",
              transition: "opacity 0.7s ease-in-out, transform 8s ease-out",
            }}
          />
        ))}

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 pb-10 md:pb-12 pt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1 max-w-3xl flex flex-col gap-6">
            <div
              className="text-white text-xl sm:text-2xl md:text-[30px] font-medium leading-8 md:leading-[42px] font-sans tracking-tight transition-all duration-700 ease-in-out [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
              style={{
                filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                opacity: isTransitioning ? 0.5 : 1,
                transition: "filter 0.7s ease-in-out, opacity 0.7s ease-in-out",
              }}
            >
              "{testimonials[activeTestimonial].quote}"
            </div>
            <div
              className="flex flex-col gap-1 transition-all duration-700 ease-in-out"
              style={{
                filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                opacity: isTransitioning ? 0.5 : 1,
                transition: "filter 0.7s ease-in-out, opacity 0.7s ease-in-out",
              }}
            >
              <div className="text-white text-lg font-semibold leading-[26px] font-sans [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-white/75 text-lg font-medium leading-[26px] font-sans [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                {testimonials[activeTestimonial].company}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="justify-start items-center gap-[14px] flex">
            <button
              aria-label="Previous testimonial"
              onClick={() => handleNavigationClick((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.18)] overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-sm justify-center items-center gap-2 flex hover:bg-white/20 transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => handleNavigationClick((activeTestimonial + 1) % testimonials.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.18)] overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-sm justify-center items-center gap-2 flex hover:bg-white/20 transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
