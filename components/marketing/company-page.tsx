import type { ReactNode } from "react"
import SiteNav from "./site-nav"
import FooterSection from "../footer-section"
import CTASection from "../cta-section"
import StructuredData from "../structured-data"

interface CompanyPageProps {
  title: string
  description: string
  children: ReactNode
  /** Show bottom CTA (default true). Off for legal pages. */
  showCta?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Shared shell for About / Contact / Privacy / Terms / Press.
 */
export default function CompanyPage({
  title,
  description,
  children,
  showCta = true,
  jsonLd,
}: CompanyPageProps) {
  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      {jsonLd && <StructuredData data={jsonLd} />}
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-6 flex flex-col gap-12 sm:gap-16">
        <header data-reveal className="w-full max-w-[720px] mx-auto flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-[#242424] text-3xl sm:text-4xl md:text-[44px] font-semibold leading-[1.12] font-sans tracking-[-0.02em]">
            {title}
          </h1>
          <p className="text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">{description}</p>
        </header>

        <div data-reveal className="w-full max-w-[720px] mx-auto flex flex-col gap-6 text-[#374151] text-base md:text-lg font-normal leading-8 font-sans">
          {children}
        </div>

        {showCta && <CTASection />}
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
