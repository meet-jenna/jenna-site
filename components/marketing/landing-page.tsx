import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import SiteNav from "./site-nav"
import CTASection from "../cta-section"
import FooterSection from "../footer-section"
import StructuredData from "../structured-data"
import { PosGridWordmark } from "../integration-logo"
import { POS_GRID_IDS } from "../../lib/integrations/pos"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo"
import type { LandingPageContent } from "../../lib/landing-pages"

export default function LandingPage({ content }: { content: LandingPageContent }) {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: content.metaTitle, path: `/${content.slug}` },
  ])
  const faq = buildFaqJsonLd(content.faqs)

  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={[breadcrumb, faq]} />
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6 flex flex-col gap-14 sm:gap-20">
        {/* Hero */}
        <section className="flex flex-col justify-start items-center text-center pt-6 sm:pt-10">
          <div className="px-[12px] py-[5px] bg-white overflow-hidden rounded-[6px] flex justify-start items-center gap-[8px] border border-[rgba(36,36,36,0.10)] shadow-[0px_1px_1px_rgba(36,36,36,0.04)]">
            <div className="w-[10px] h-[10px] bg-[#101010] rounded-[2px] rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-white text-[7px] font-bold leading-none font-sans">J</span>
            </div>
            <div className="text-center text-[#242424] text-xs font-medium leading-3 font-sans">{content.eyebrow}</div>
          </div>

          <h1 className="mt-5 w-full max-w-[760px] text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] md:leading-[1.12] font-sans tracking-[-0.025em]">
            {content.h1}
          </h1>
          <p className="mt-4 w-full max-w-[560px] text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">
            {content.subhead}
          </p>
          <Link
            href="/book-demo"
            className="mt-8 h-11 md:h-12 px-8 md:px-12 relative bg-[#101010] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-[6px] flex justify-center items-center hover:bg-[#242424] transition-colors"
          >
            <div className="relative z-[1] flex flex-row items-center justify-center gap-1.5 text-white text-[15px] font-medium leading-5 font-sans">
              Book a Demo
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
            </div>
          </Link>
        </section>

        {/* Intro copy */}
        <section className="w-full max-w-[760px] mx-auto flex flex-col gap-4">
          {content.intro.map((paragraph, index) => (
            <p key={index} className="text-[#374151] text-base md:text-lg font-normal leading-8 font-sans">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Feature grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {content.features.map((feature) => (
            <div key={feature.title} className="bg-[#EFEFEF] rounded-[6px] p-6 sm:p-7 flex flex-col gap-2">
              <h2 className="text-[#242424] text-base sm:text-lg font-semibold leading-tight font-sans">
                {feature.title}
              </h2>
              <p className="text-[#6B7280] text-sm md:text-[15px] font-normal leading-relaxed font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* POS strip */}
        <section className="flex flex-col gap-6 sm:gap-8">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-[#242424] text-2xl sm:text-3xl font-semibold leading-tight font-sans tracking-tight">
              Works with the POS you already use
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-normal leading-7 font-sans">
              Orders and reservations flow into your existing system automatically — no new hardware.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {POS_GRID_IDS.map((id) => (
              <Link
                key={id}
                href={`/integrations/${id}`}
                className="h-24 sm:h-28 flex justify-center items-center bg-[#EFEFEF] rounded-[6px] hover:bg-[#E6E6E6] transition-colors"
              >
                <PosGridWordmark id={id} />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-[760px] mx-auto flex flex-col gap-6">
          <h2 className="text-[#242424] text-2xl sm:text-3xl font-semibold leading-tight font-sans tracking-tight text-center">
            Frequently asked questions
          </h2>
          <div className="flex flex-col">
            {content.faqs.map((item) => (
              <details key={item.question} className="group w-full border-b border-[rgba(36,36,36,0.16)]">
                <summary className="w-full px-1 py-[18px] flex justify-between items-center gap-5 cursor-pointer list-none text-[#242424] text-base font-medium leading-6 font-sans">
                  {item.question}
                  <ChevronDown className="w-5 h-5 shrink-0 text-[rgba(36,36,36,0.6)] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-1 pb-[18px] text-[#6B7280] text-sm font-normal leading-6 font-sans">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related internal links */}
        {content.related.length > 0 && (
          <section className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {content.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full bg-[#EFEFEF] border border-[rgba(36,36,36,0.10)] text-[#242424] text-sm font-medium font-sans hover:bg-[#E6E6E6] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </section>
        )}

        <CTASection />
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
