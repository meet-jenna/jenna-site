import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import DemoForm from "../../components/demo-form"
import FooterSection from "../../components/footer-section"
import { PosGridWordmark } from "../../components/integration-logo"
import { POS_GRID_IDS } from "../../lib/integrations/pos"
import { PORTAL_URL } from "../../lib/portal"

export const metadata: Metadata = {
  title: "Book a Demo — Jenna",
  description:
    "See Jenna live. Watch the AI hostess answer every call, take pickup and delivery orders, and book reservations — synced to the POS you already run.",
}

export default function BookDemoPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#FFFFFF] overflow-x-hidden flex flex-col items-center font-sans">
      {/* Navigation */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-[720px] xl:max-w-[800px] h-12 py-2 pl-4 pr-2 bg-[#FFFFFF]/80 backdrop-blur-md border border-[rgba(36,36,36,0.10)] shadow-[0px_2px_8px_rgba(36,36,36,0.05)] rounded-[6px] flex justify-between items-center">
          <div className="flex justify-center items-center">
            <Link href="/" className="text-[#242424] text-lg sm:text-xl font-semibold leading-5 font-sans">
              Jenna
            </Link>
            <nav className="pl-4 sm:pl-5 hidden sm:flex flex-row gap-3 sm:gap-4">
              <Link
                href="/"
                className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
              >
                Features
              </Link>
              <Link
                href="/"
                className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex justify-end items-center gap-2 sm:gap-3">
            <a
              href={PORTAL_URL}
              className="flex items-center text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors px-2"
            >
              Sign in
            </a>
            <a
              href="#demo-form"
              className="px-3 md:px-[14px] py-[7px] bg-[#101010] overflow-hidden rounded-[6px] flex justify-center items-center gap-1 hover:bg-[#242424] transition-colors"
            >
              <span className="text-white text-xs md:text-[13px] font-medium leading-5 font-sans">Demo</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6">
        {/* Hero: two-column (copy + form) */}
        <section className="w-full bg-[#F6F5F7] rounded-[6px] px-5 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left column */}
            <div className="flex flex-col items-start gap-5 lg:pr-6">
              <div className="px-[12px] py-[5px] bg-white overflow-hidden rounded-[6px] flex justify-start items-center gap-[8px] border border-[rgba(36,36,36,0.10)] shadow-[0px_1px_1px_rgba(36,36,36,0.04)]">
                <div className="w-[10px] h-[10px] bg-[#242424] rounded-[2px] rotate-45 flex items-center justify-center">
                  <span className="-rotate-45 text-white text-[7px] font-bold leading-none font-sans">J</span>
                </div>
                <div className="text-center flex justify-center flex-col text-[#242424] text-xs font-medium leading-3 font-sans">
                  Book a Demo
                </div>
              </div>

              <h1 className="text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.08] sm:leading-[1.1] font-sans tracking-[-0.025em]">
                See what an AI
                <br />
                hostess can do
              </h1>

              <p className="max-w-[460px] text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">
                See Jenna answer calls, take orders, and book tables — live.
              </p>

              {/* POS logos */}
              <div className="w-full max-w-[480px] pt-6 flex flex-col gap-4">
                <div className="text-[rgba(36,36,36,0.55)] text-xs font-medium leading-4 font-sans uppercase tracking-wide">
                  Works with the POS you already use
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {POS_GRID_IDS.map((id) => (
                    <div
                      key={id}
                      className="h-16 flex justify-center items-center bg-white rounded-[6px] border border-[rgba(36,36,36,0.06)]"
                    >
                      <PosGridWordmark id={id} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: form */}
            <div className="flex justify-center lg:justify-end items-start">
              <DemoForm />
            </div>
          </div>
        </section>

        <div className="pt-4 sm:pt-5">
          <FooterSection />
        </div>
      </main>
    </div>
  )
}
