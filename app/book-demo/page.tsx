import type { Metadata } from "next"
import SiteNav from "../../components/marketing/site-nav"
import DemoForm from "../../components/demo-form"
import FooterSection from "../../components/footer-section"
import { PosLogoGrid } from "../../components/pos-logo-grid"
import { JennaLogo } from "../../components/jenna-logo"
import { POS_GRID_IDS } from "../../lib/integrations/pos"

const description =
  "See Jenna live. Watch the AI voice hostess answer every call, take pickup and delivery orders, and book reservations — synced to the POS you already run."

export const metadata: Metadata = {
  title: "Book a Demo",
  description,
  alternates: {
    canonical: "/book-demo",
  },
  openGraph: {
    title: "Book a Demo — Jenna",
    description,
    url: "/book-demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo — Jenna",
    description,
  },
}

export default function BookDemoPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      {/* Navigation */}
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-6">
        {/* Hero: two-column (copy + form) */}
        <section className="w-full py-8 sm:py-14 lg:py-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(420px,460px)] gap-8 sm:gap-10 lg:gap-14 items-start">
            {/* Left column */}
            <div data-reveal="left" className="flex flex-col items-start gap-6 lg:pr-4">
              <div className="px-[12px] py-[5px] bg-white overflow-hidden rounded-[6px] flex justify-start items-center gap-[8px] border border-[rgba(36, 36, 36,0.10)] shadow-[0px_1px_1px_rgba(36, 36, 36,0.04)]">
                <JennaLogo shape="app" size={16} />
                <div className="text-center flex justify-center flex-col text-[#242424] text-xs font-medium leading-3 font-sans">
                  Book a Demo
                </div>
              </div>

              <h1 className="text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.08] sm:leading-[1.1] font-sans tracking-[-0.025em]">
                See what an AI
                <br />
                hostess can do
              </h1>

              {/* POS logos */}
              <div className="w-full max-w-[560px] pt-2 sm:pt-4 flex flex-col gap-4">
                <div className="text-[rgba(36, 36, 36,0.55)] text-xs font-medium leading-4 font-sans uppercase tracking-wide">
                  Works with the POS you already use
                </div>
                <PosLogoGrid ids={POS_GRID_IDS} columnsClassName="grid-cols-2 sm:grid-cols-4" />
              </div>
            </div>

            {/* Right column: form */}
            <div data-reveal="right" className="flex justify-center lg:justify-end items-start">
              <div className="relative w-full max-w-[460px]">
                {/* Hero-style glow straddling the top edge of the form */}
                <div className="pointer-events-none absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-0 w-[150%] sm:w-[160%]">
                  <img
                    src="/gradients/hero-top-glow.svg?v=3"
                    alt=""
                    aria-hidden
                    className="w-full h-auto opacity-70 mix-blend-multiply"
                  />
                </div>
                <div className="relative z-[1]">
                  <DemoForm />
                </div>
              </div>
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
