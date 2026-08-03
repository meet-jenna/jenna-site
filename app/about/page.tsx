import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import { absoluteUrl, buildBreadcrumbJsonLd, SITE_DESCRIPTION } from "../../lib/seo"
import { BRAND_PRESS_BOILERPLATE } from "../../lib/social"

const title = "About Jenna"
const description =
  "Meet Jenna — the AI voice hostess for restaurants. Learn what Jenna AI is, who we serve, and how we help restaurants answer every call."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "About Jenna",
    "What is Jenna AI",
    "Meet Jenna",
    "Jenna AI restaurant",
    "Jenna AI hostess",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ])

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: absoluteUrl("/about"),
    mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
  }

  return (
    <CompanyPage title={title} description={description} jsonLd={[breadcrumb, aboutPageJsonLd]}>
      <h2 className="text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        What is Jenna AI?
      </h2>
      <p>
        {SITE_DESCRIPTION} Operators know her as <strong className="text-[#242424] font-medium">Meet Jenna</strong>{" "}
        — the AI hostess that never misses a ring.
      </p>
      <p>{BRAND_PRESS_BOILERPLATE}</p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Who we build for
      </h2>
      <p>
        Jenna is built for restaurants where the phone still drives revenue: pickup, delivery, and reservations.
        Whether you run a single neighborhood spot or a multi-location group, Jenna connects to the{" "}
        <Link href="/integrations" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]">
          POS you already use
        </Link>{" "}
        — Toast, Square, Clover, and more — so orders land in the kitchen without new hardware or staff training.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        How Jenna works
      </h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>We connect your POS and sync live menus, prices, and hours.</li>
        <li>We customize Jenna&apos;s greeting, voice, and upsells for your brand.</li>
        <li>You forward your restaurant line — Jenna answers on the first ring, 24/7.</li>
      </ul>
      <p>
        Learn more about the{" "}
        <Link href="/ai-hostess" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]">
          AI hostess
        </Link>{" "}
        approach,{" "}
        <Link
          href="/voice-ai-for-restaurants"
          className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]"
        >
          voice AI for restaurants
        </Link>
        , or read{" "}
        <Link
          href="/blog/what-is-jenna-ai"
          className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]"
        >
          What is Jenna AI?
        </Link>{" "}
        on our blog.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Not the other Jennas
      </h2>
      <p>
        Jenna AI at meetjenna.ai is specifically an <strong className="text-[#242424] font-medium">AI voice hostess for restaurants</strong>.
        We are not a consumer finance app, recruiting screener, or academic writing tool. If you searched for restaurant
        phone answering or an AI hostess, you&apos;re in the right place.
      </p>

      <p>
        Ready to hear her live?{" "}
        <Link href="/book-demo" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]">
          Book a demo
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]">
          contact us
        </Link>
        .
      </p>
    </CompanyPage>
  )
}
