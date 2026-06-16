import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import SiteNav from "../../../components/marketing/site-nav"
import CTASection from "../../../components/cta-section"
import FooterSection from "../../../components/footer-section"
import StructuredData from "../../../components/structured-data"
import { TOP_POS_INTEGRATIONS, getPosIntegration, type PosIntegrationId } from "../../../lib/integrations/pos"
import { POS_CONTENT } from "../../../lib/integrations/content"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "../../../lib/seo"

interface PageProps {
  params: { slug: string }
}

const VALID_IDS = new Set(TOP_POS_INTEGRATIONS.map((i) => i.id))

function isPosId(slug: string): slug is PosIntegrationId {
  return VALID_IDS.has(slug as PosIntegrationId)
}

export function generateStaticParams() {
  return TOP_POS_INTEGRATIONS.map((integration) => ({ slug: integration.id }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isPosId(params.slug)) return {}
  const integration = getPosIntegration(params.slug)
  const title = `Jenna for ${integration.name} — AI Phone Answering`
  const description = `${POS_CONTENT[params.slug].tagline} Jenna is the AI voice hostess that answers calls, takes orders, and books reservations — synced to ${integration.name}, 24/7.`

  return {
    title: `${integration.name} Integration`,
    description,
    keywords: [
      `Jenna ${integration.name}`,
      `${integration.name} AI phone answering`,
      `AI for ${integration.name}`,
      `${integration.name} voice AI`,
      `${integration.name} phone ordering`,
    ],
    alternates: { canonical: `/integrations/${integration.id}` },
    openGraph: { title, description, url: `/integrations/${integration.id}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  }
}

function buildFaqs(name: string) {
  return [
    {
      question: `Does Jenna work with ${name}?`,
      answer: `Yes. Jenna connects to ${name} so phone orders and reservations flow in automatically. There's no new hardware to buy and nothing for your staff to learn.`,
    },
    {
      question: `Do I need new hardware to use Jenna with ${name}?`,
      answer: `No. You keep your existing ${name} setup and forward your phone line to Jenna. Orders sync into ${name} just like they would if a staff member entered them.`,
    },
    {
      question: `How long does it take to connect Jenna to ${name}?`,
      answer: `Most restaurants are live within days. We handle the ${name} integration for you — syncing your menu, prices, and hours — so Jenna is accurate from the first call.`,
    },
  ]
}

export default function IntegrationPage({ params }: PageProps) {
  if (!isPosId(params.slug)) notFound()

  const integration = getPosIntegration(params.slug)
  const copy = POS_CONTENT[params.slug]
  const faqs = buildFaqs(integration.name)

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: integration.name, path: `/integrations/${integration.id}` },
  ])
  const faqJson = buildFaqJsonLd(faqs)

  const others = TOP_POS_INTEGRATIONS.filter((i) => i.id !== integration.id)

  const steps = [
    { title: "We connect your POS", description: `Jenna syncs with your ${integration.name} menu, prices, and hours — we handle the full integration.` },
    { title: "We customize for you", description: "Set the greeting, the upsells, and exactly how Jenna sounds on every call." },
    { title: "We attach it to your phone", description: "Forward your line to Jenna and start capturing every call right away." },
  ]

  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={[breadcrumb, faqJson]} />
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6 flex flex-col gap-14 sm:gap-20">
        {/* Hero */}
        <section className="flex flex-col justify-start items-center text-center pt-6 sm:pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 px-4 flex items-center justify-center bg-[#EFEFEF] rounded-[6px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={integration.logo} alt={`${integration.name} logo`} className="h-5 w-auto object-contain" />
            </div>
            <span className="text-[#9CA3AF] text-lg">+</span>
            <div className="h-12 px-4 flex items-center justify-center bg-[#101010] rounded-[6px] text-white text-base font-semibold">
              Jenna
            </div>
          </div>

          <h1 className="w-full max-w-[760px] text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] md:leading-[1.12] font-sans tracking-[-0.025em]">
            AI Phone Answering for {integration.name}
          </h1>
          <p className="mt-4 w-full max-w-[560px] text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">
            {copy.tagline}
          </p>
          <Link
            href="/book-demo"
            className="mt-8 h-11 md:h-12 px-8 md:px-12 bg-[#101010] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] rounded-[6px] flex justify-center items-center hover:bg-[#242424] transition-colors text-white text-[15px] font-medium leading-5 font-sans gap-1.5"
          >
            Book a Demo
            <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
          </Link>
        </section>

        {/* Intro */}
        <section className="w-full max-w-[760px] mx-auto">
          <p className="text-[#374151] text-base md:text-lg font-normal leading-8 font-sans">{copy.intro}</p>
        </section>

        {/* How it works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-[#EFEFEF] rounded-[6px] p-6 sm:p-7 flex flex-col gap-2">
              <div className="text-[#9CA3AF] text-sm font-semibold font-sans">0{index + 1}</div>
              <h2 className="text-[#242424] text-base sm:text-lg font-semibold leading-tight font-sans">{step.title}</h2>
              <p className="text-[#6B7280] text-sm md:text-[15px] font-normal leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="w-full max-w-[760px] mx-auto flex flex-col gap-6">
          <h2 className="text-[#242424] text-2xl sm:text-3xl font-semibold leading-tight font-sans tracking-tight text-center">
            {integration.name} + Jenna FAQ
          </h2>
          <div className="flex flex-col">
            {faqs.map((item) => (
              <details key={item.question} className="group w-full border-b border-[rgba(36,36,36,0.16)]">
                <summary className="w-full px-1 py-[18px] flex justify-between items-center gap-5 cursor-pointer list-none text-[#242424] text-base font-medium leading-6 font-sans">
                  {item.question}
                  <span className="shrink-0 text-[rgba(36,36,36,0.6)] transition-transform duration-200 group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="px-1 pb-[18px] text-[#6B7280] text-sm font-normal leading-6 font-sans">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other integrations */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[#242424] text-xl sm:text-2xl font-semibold leading-tight font-sans tracking-tight text-center">
            Other POS integrations
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/integrations/${other.id}`}
                className="px-4 py-2 rounded-full bg-[#EFEFEF] border border-[rgba(36,36,36,0.10)] text-[#242424] text-sm font-medium font-sans hover:bg-[#E6E6E6] transition-colors"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
