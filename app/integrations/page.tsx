import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import SiteNav from "../../components/marketing/site-nav"
import CTASection from "../../components/cta-section"
import FooterSection from "../../components/footer-section"
import StructuredData from "../../components/structured-data"
import { PosGridWordmark } from "../../components/integration-logo"
import { TOP_POS_INTEGRATIONS } from "../../lib/integrations/pos"
import { buildBreadcrumbJsonLd } from "../../lib/seo"

const description =
  "Jenna connects to the POS you already run — Toast, Square, Clover, Lightspeed, NCR Aloha, Oracle MICROS and more. Orders and reservations sync automatically, no new hardware."

export const metadata: Metadata = {
  title: "POS Integrations",
  description,
  keywords: [
    "restaurant POS integrations",
    "AI phone answering POS integration",
    "Toast AI integration",
    "Square restaurant AI",
    "Clover voice AI",
  ],
  alternates: { canonical: "/integrations" },
  openGraph: { title: "POS Integrations — Jenna", description, url: "/integrations", type: "website" },
  twitter: { card: "summary_large_image", title: "POS Integrations — Jenna", description },
}

export default function IntegrationsIndexPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
  ])

  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={breadcrumb} />
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6 flex flex-col gap-14 sm:gap-20">
        <section className="flex flex-col justify-start items-center text-center pt-6 sm:pt-10">
          <h1 data-reveal className="w-full max-w-[760px] text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] md:leading-[1.12] font-sans tracking-[-0.025em]">
            Connects to Your POS
          </h1>
          <p data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties} className="mt-4 w-full max-w-[560px] text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">
            {description}
          </p>
          <Link
            href="/book-demo"
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="btn-cta mt-8 h-11 md:h-12 px-8 md:px-12 bg-[#101010] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] rounded-[6px] flex justify-center items-center hover:bg-[#242424] transition-colors text-white text-[15px] font-medium leading-5 font-sans gap-1.5"
          >
            Book a Demo
            <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
          </Link>
        </section>

        <section className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TOP_POS_INTEGRATIONS.map((integration) => (
            <Link
              key={integration.id}
              href={`/integrations/${integration.id}`}
              data-reveal="scale"
              className="hover-lift group h-32 sm:h-36 flex flex-col justify-center items-center gap-3 bg-[#EFEFEF] rounded-[6px] hover:bg-[#E6E6E6] transition-colors"
            >
              <PosGridWordmark id={integration.id} />
              <span className="text-[rgba(36,36,36,0.6)] text-xs font-medium font-sans group-hover:text-[#242424] transition-colors">
                {integration.name}
              </span>
            </Link>
          ))}
        </section>

        <CTASection />
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
