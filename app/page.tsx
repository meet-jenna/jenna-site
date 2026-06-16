"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import SmartSimpleBrilliant from "../components/smart-simple-brilliant"
import YourWorkInSync from "../components/your-work-in-sync"
import EffortlessIntegration from "../components/effortless-integration-updated"
import NumbersThatSpeak from "../components/numbers-that-speak"
import DocumentationSection from "../components/documentation-section"
import TestimonialsSection from "../components/testimonials-section"
import FAQSection from "../components/faq-section"
import PricingSection from "../components/pricing-section"
import CTASection from "../components/cta-section"
import FooterSection from "../components/footer-section"
import HeroDashboard from "../components/hero/hero-dashboard"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PosGridWordmark } from "../components/integration-logo"
import { POS_GRID_IDS } from "../lib/integrations/pos"
import { PORTAL_URL } from "../lib/portal"
import StructuredData from "../components/structured-data"
import { faqJsonLd } from "../lib/seo"

// Reusable Badge Component
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

// Section header — lives on the page background, outside containers
function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col justify-start items-center gap-3 sm:gap-4 text-center">
      {badge}
      <h2 className="text-[#242424] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[1.1] font-sans tracking-tight">
        {title}
      </h2>
      <p className="text-[#6B7280] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
        {description}
      </p>
    </div>
  )
}

export default function LandingPage() {
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    mountedRef.current = true
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3)
          }
          return 0
        }
        return prev + 2 // 2% every 100ms = 5 seconds total
      })
    }, 100)

    return () => {
      mountedRef.current = false
      clearInterval(progressInterval)
    }
  }, [])

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return
    setActiveCard(index)
    setProgress(0)
  }

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={faqJsonLd} />
      {/* Navigation */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4">
        <div
          className={`w-full max-w-[720px] xl:max-w-[800px] h-12 py-2 pl-4 pr-2 rounded-[6px] flex justify-between items-center transition-all duration-300 ${
            scrolled
              ? "bg-[#F4F4F5]/90 backdrop-blur-md shadow-[0px_2px_8px_rgba(36,36,36,0.06)]"
              : "bg-transparent"
          }`}
        >
          <div className="flex justify-center items-center">
            <span className="text-[#242424] text-lg sm:text-xl font-semibold leading-5 font-sans">Jenna</span>
            <nav className="pl-4 sm:pl-5 hidden sm:flex flex-row gap-3 sm:gap-4">
              <a
                href="#features"
                onClick={scrollToSection("features")}
                className="text-[rgba(36, 36, 36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={scrollToSection("pricing")}
                className="text-[rgba(36, 36, 36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={scrollToSection("faq")}
                className="text-[rgba(36, 36, 36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors cursor-pointer"
              >
                FAQ
              </a>
            </nav>
          </div>
          <div className="flex justify-end items-center gap-2 sm:gap-3">
            <a
              href={PORTAL_URL}
              className="flex items-center text-[rgba(36, 36, 36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors px-2"
            >
              Sign in
            </a>
            <Link
              href="/book-demo"
              className="px-3 md:px-[14px] py-[7px] bg-[#101010] overflow-hidden rounded-[6px] flex justify-center items-center gap-1 hover:bg-[#242424] transition-colors"
            >
              <span className="text-white text-xs md:text-[13px] font-medium leading-5 font-sans">Demo</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6 flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {/* Hero copy (lives on the page, no container) */}
        <section className="flex flex-col justify-start items-center text-center pt-6 sm:pt-10 lg:pt-14">
          <h1 className="w-full max-w-[680px] text-center text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.08] sm:leading-[1.1] md:leading-[1.12] font-sans tracking-[-0.025em]">
            The AI Hostess
            <br />
            For Every Restaurant
          </h1>
          <Link
            href="/book-demo"
            className="mt-8 h-11 md:h-12 px-8 md:px-12 relative z-10 bg-[#101010] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#242424] transition-colors"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply pointer-events-none"></div>
            <div
              className="relative z-[1] flex flex-row items-center justify-center gap-1.5 text-[15px] font-medium leading-5 font-sans"
              style={{ color: "#FFFFFF", opacity: 1, mixBlendMode: "normal" }}
            >
              Book a Demo
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
            </div>
          </Link>

          {/* Hero dashboard */}
          <div className="relative mt-10 sm:mt-12 w-full">
            {/* Top-edge glow: straddles the dashboard's top edge */}
            <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
              <img
                src="/gradients/hero-top-glow.svg?v=3"
                alt=""
                aria-hidden
                className="w-full h-auto -translate-y-[38%] opacity-70 mix-blend-multiply"
              />
            </div>
            <div className="relative z-[1] w-full h-[210px] sm:h-[320px] md:h-[480px] lg:h-[640px] xl:h-[700px] bg-white rounded-[6px] shadow-[0px_8px_30px_rgba(36, 36, 36,0.08)] overflow-hidden">
              <HeroDashboard activeView={activeCard} />
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 -mt-6 sm:-mt-8 lg:-mt-12">
          <FeatureCard
            title="Answers every call"
            description="First ring, 24/7 — no missed orders or reservations."
            isActive={activeCard === 0}
            progress={activeCard === 0 ? progress : 0}
            onClick={() => handleCardClick(0)}
          />
          <FeatureCard
            title="Takes the whole order"
            description="Pickup, delivery, or reservations — handled start to finish."
            isActive={activeCard === 1}
            progress={activeCard === 1 ? progress : 0}
            onClick={() => handleCardClick(1)}
          />
          <FeatureCard
            title="Syncs to your POS"
            description="Orders land in your existing system. No new hardware."
            isActive={activeCard === 2}
            progress={activeCard === 2 ? progress : 0}
            onClick={() => handleCardClick(2)}
          />
        </section>

        {/* Social proof / integrations */}
        <section className="flex flex-col gap-7 sm:gap-9">
          <SectionHeader
            badge={
              <Badge
                icon={
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="3" width="4" height="6" stroke="#242424" strokeWidth="1" fill="none" />
                    <rect x="7" y="1" width="4" height="8" stroke="#242424" strokeWidth="1" fill="none" />
                    <rect x="2" y="4" width="1" height="1" fill="#242424" />
                    <rect x="3.5" y="4" width="1" height="1" fill="#242424" />
                    <rect x="2" y="5.5" width="1" height="1" fill="#242424" />
                    <rect x="3.5" y="5.5" width="1" height="1" fill="#242424" />
                    <rect x="8" y="2" width="1" height="1" fill="#242424" />
                    <rect x="9.5" y="2" width="1" height="1" fill="#242424" />
                    <rect x="8" y="3.5" width="1" height="1" fill="#242424" />
                    <rect x="9.5" y="3.5" width="1" height="1" fill="#242424" />
                    <rect x="8" y="5" width="1" height="1" fill="#242424" />
                    <rect x="9.5" y="5" width="1" height="1" fill="#242424" />
                  </svg>
                }
                text="Integrations"
              />
            }
            title="Connects to Your POS"
            description="Plugs into your existing POS. Orders and reservations flow in automatically."
          />

          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {POS_GRID_IDS.map((id) => (
              <div
                key={id}
                className="h-24 sm:h-28 lg:h-32 flex justify-center items-center bg-[#EFEFEF] rounded-[6px]"
              >
                <PosGridWordmark id={id} />
              </div>
            ))}
          </div>
        </section>

        {/* Bento grid */}
        <section id="features" className="scroll-mt-24 flex flex-col gap-7 sm:gap-9">
          <SectionHeader
            badge={
              <Badge
                icon={
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="4" height="4" stroke="#242424" strokeWidth="1" fill="none" />
                    <rect x="7" y="1" width="4" height="4" stroke="#242424" strokeWidth="1" fill="none" />
                    <rect x="1" y="7" width="4" height="4" stroke="#242424" strokeWidth="1" fill="none" />
                    <rect x="7" y="7" width="4" height="4" stroke="#242424" strokeWidth="1" fill="none" />
                  </svg>
                }
                text="Built for restaurants"
              />
            }
            title="Handles Every Call"
            description="Jenna is the communication layer that helps your restaurant run smoother."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <BentoCard
              title="Every Event, Organized"
              description="Jenna logs each call the moment it happens, so you always see what's coming in."
            >
              <SmartSimpleBrilliant
                width="100%"
                height="100%"
                theme="light"
                className="scale-60 sm:scale-65 md:scale-75 lg:scale-90 xl:scale-100 2xl:scale-110"
              />
            </BentoCard>

            <BentoCard
              title="Every Call, Natural"
              description="Jenna understands what people want and answers instantly — just like your best host."
            >
              <YourWorkInSync
                width="400"
                height="250"
                theme="light"
                className="scale-70 sm:scale-75 md:scale-90 xl:scale-100 2xl:scale-105"
              />
            </BentoCard>

            <BentoCard
              title="Every Order, Accurate"
              description="Live menu and prices pulled from your POS — every order comes out right."
            >
              <div className="w-full h-full flex items-center justify-center">
                <EffortlessIntegration width={400} height={250} className="max-w-full max-h-full xl:scale-110 2xl:scale-125" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#EFEFEF] to-transparent pointer-events-none"></div>
            </BentoCard>

            <BentoCard
              title="Every Number, Tracked"
              description="Every call, order, and dollar — logged in your portal automatically."
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <NumbersThatSpeak width="100%" height="100%" theme="light" className="w-full h-full xl:scale-110 2xl:scale-125" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#EFEFEF] to-transparent pointer-events-none"></div>
            </BentoCard>
          </div>
        </section>

        {/* Documentation Section */}
        <div id="how-it-works" className="scroll-mt-24">
          <DocumentationSection />
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <div id="pricing" className="scroll-mt-24">
          <PricingSection />
        </div>

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-24">
          <FAQSection />
        </div>

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer Section */}
      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}

function BentoCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#EFEFEF] rounded-[6px] p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col justify-start items-start gap-4 sm:gap-6 overflow-hidden">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#242424] text-lg sm:text-xl font-semibold leading-tight font-sans">{title}</h3>
        <p className="text-[#6B7280] text-sm md:text-base font-normal leading-relaxed font-sans">{description}</p>
      </div>
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[340px] rounded-[6px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  isActive,
  progress,
  onClick,
}: {
  title: string
  description: string
  isActive: boolean
  progress: number
  onClick: () => void
}) {
  return (
    <div
      className={`relative w-full px-6 py-5 rounded-[6px] overflow-hidden flex flex-col justify-start items-start gap-2 cursor-pointer border transition-all duration-300 ${
        isActive
          ? "bg-white border-[rgba(36, 36, 36,0.12)] shadow-[0px_4px_14px_rgba(36, 36, 36,0.07)]"
          : "bg-[#EFEFEF] border-transparent hover:bg-[#E6E6E6]"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-[rgba(36, 36, 36,0.08)]">
          <div
            className="h-full bg-[#101010] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="self-stretch flex justify-center flex-col text-[#242424] text-sm font-semibold leading-6 font-sans">
        {title}
      </div>
      <div className="self-stretch text-[#6B7280] text-[13px] font-normal leading-[22px] font-sans">
        {description}
      </div>
    </div>
  )
}
