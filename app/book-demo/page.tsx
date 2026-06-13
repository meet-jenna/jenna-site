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
    <div className="w-full min-h-screen relative bg-[#F4F4F4] overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] xl:max-w-[1180px] 2xl:max-w-[1320px] relative flex flex-col justify-start items-start min-h-screen">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(36,36,36,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(36,36,36,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

          <div className="self-stretch pt-[9px] overflow-x-hidden border-b border-[rgba(36,36,36,0.06)] flex flex-col justify-center items-center relative z-10">
            {/* Navigation */}
            <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-4 sm:top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
              <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(36,36,36,0.12)] shadow-[0px_1px_0px_white]"></div>

              <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] xl:max-w-[780px] xl:w-[780px] 2xl:max-w-[870px] 2xl:w-[870px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F4F4F4] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
                <div className="flex justify-center items-center">
                  <Link href="/" className="flex justify-start items-center">
                    <div className="flex flex-col justify-center text-[#242424] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                      Jenna
                    </div>
                  </Link>
                  <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                    <Link href="/" className="flex justify-start items-center">
                      <div className="flex flex-col justify-center text-[rgba(36,36,36,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors">
                        Features
                      </div>
                    </Link>
                    <Link href="/" className="flex justify-start items-center">
                      <div className="flex flex-col justify-center text-[rgba(36,36,36,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors">
                        Pricing
                      </div>
                    </Link>
                    <Link href="/" className="flex justify-start items-center">
                      <div className="flex flex-col justify-center text-[rgba(36,36,36,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors">
                        FAQ
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="h-6 sm:h-7 md:h-8 flex justify-end items-center gap-2 sm:gap-3 md:gap-4">
                  <a
                    href={PORTAL_URL}
                    className="flex items-center text-[rgba(36,36,36,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
                  >
                    Sign in
                  </a>
                  <a href="#demo-form" className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(36,36,36,0.12)] overflow-hidden rounded-full flex justify-center items-center gap-1">
                    <div className="flex flex-col justify-center text-[#242424] text-xs md:text-[13px] font-medium leading-5 font-sans">
                      Demo
                    </div>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#242424] shrink-0" strokeWidth={2.25} />
                  </a>
                </div>
              </div>
            </div>

            {/* Hero: two-column (copy + form) */}
            <div className="w-full pt-28 sm:pt-32 md:pt-36 lg:pt-44 pb-10 sm:pb-14 md:pb-20 px-2 sm:px-4 md:px-8 lg:px-0 relative">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* Left column */}
                <div className="flex flex-col items-start gap-5 lg:pr-6">
                  <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(36,36,36,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
                    <div className="w-[10px] h-[10px] bg-[#242424] rounded-[3px] rotate-45 flex items-center justify-center">
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
                    <div className="grid grid-cols-4 gap-x-6 gap-y-5 items-center">
                      {POS_GRID_IDS.map((id) => (
                        <div key={id} className="flex justify-start items-center opacity-80">
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
            </div>

            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  )
}
