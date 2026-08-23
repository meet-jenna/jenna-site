import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import FounderBlock from "../../components/marketing/founder-block"
import { FOUNDER_NAME, FOUNDER_URL } from "../../lib/founder"
import { absoluteUrl, buildBreadcrumbJsonLd, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "../../lib/seo"
import {
  BRAND_DIRECTORY_BIO,
  BRAND_PRESS_BOILERPLATE,
  BRAND_SHORT_BIO,
  getActiveSocialProfiles,
  SITE_EMAIL,
} from "../../lib/social"

const title = "Press & Brand Kit"
const description =
  "Official boilerplate, directory bios, and brand facts for Jenna AI (meetjenna.ai) — the AI voice hostess for restaurants."

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Jenna AI press", "Meet Jenna", "Jenna AI restaurant", "Jenna media kit"],
  alternates: { canonical: "/press" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/press",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function PressPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Press", path: "/press" },
  ])

  const active = getActiveSocialProfiles()

  return (
    <CompanyPage title={title} description={description} jsonLd={breadcrumb}>
      <h2 className="text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">At a glance</h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>
          <strong className="text-[#242424] font-medium">Product name:</strong> {SITE_NAME}
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Legal / alt names:</strong> Jenna AI, Meet Jenna
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Category:</strong> {SITE_TAGLINE}
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Website:</strong>{" "}
          <a href={absoluteUrl("/")} className="text-[#101010] font-medium underline underline-offset-2">
            {absoluteUrl("/")}
          </a>
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Founder:</strong>{" "}
          <a href={FOUNDER_URL} className="text-[#101010] font-medium underline underline-offset-2">
            {FOUNDER_NAME}
          </a>
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Press contact:</strong>{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="text-[#101010] font-medium underline underline-offset-2">
            {SITE_EMAIL}
          </a>
        </li>
      </ul>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        One-line bio
      </h2>
      <p className="bg-[#EFEFEF] rounded-[6px] p-4 text-[#242424]">{BRAND_SHORT_BIO}</p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Directory bio
      </h2>
      <p className="bg-[#EFEFEF] rounded-[6px] p-4 text-[#242424]">{BRAND_DIRECTORY_BIO}</p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Press boilerplate
      </h2>
      <p>{BRAND_PRESS_BOILERPLATE}</p>
      <p>{SITE_DESCRIPTION}</p>
      <FounderBlock />

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Disambiguation
      </h2>
      <p className="bg-[#EFEFEF] rounded-[6px] p-4 text-[#242424]">
        Jenna (meetjenna.ai) — AI voice hostess for restaurants. Not a consumer finance app, recruiting screener, or
        academic writing assistant.
      </p>

      {active.length > 0 && (
        <>
          <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
            Official profiles
          </h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            {active.map((p) => (
              <li key={p.id}>
                <a
                  href={p.url!}
                  className="text-[#101010] font-medium underline underline-offset-2"
                  rel="noopener noreferrer"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Partner mention
      </h2>
      <p className="bg-[#EFEFEF] rounded-[6px] p-4 text-[#242424]">
        We use Jenna AI (meetjenna.ai), the AI voice hostess for restaurants, to answer every call, take orders, and
        book reservations synced to our POS.
      </p>
      <p>
        Co-marketing:{" "}
        <Link href="/partners" className="text-[#101010] font-medium underline underline-offset-2">
          Partners
        </Link>
        .
      </p>
    </CompanyPage>
  )
}
