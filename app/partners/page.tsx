import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import { buildBreadcrumbJsonLd } from "../../lib/seo"
import { SITE_EMAIL } from "../../lib/social"

const title = "Partners"
const description =
  "Partner with Jenna AI — co-marketing, POS referrals, and restaurant tech collaborations for voice AI phone answering."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function PartnersPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Partners", path: "/partners" },
  ])

  return (
    <CompanyPage title={title} description={description} jsonLd={breadcrumb}>
      <p>
        Jenna integrates with the POS and reservation stack restaurants already run. We partner with POS vendors,
        restaurant groups, consultants, and agencies who want to stop missed calls without replacing hardware.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Ways to partner
      </h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>
          <strong className="text-[#242424] font-medium">POS & tech:</strong> co-authored integration guides, referral
          programs, and joint demos (see our{" "}
          <Link href="/integrations" className="text-[#101010] font-medium underline underline-offset-2">
            integrations
          </Link>
          ).
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Restaurant groups:</strong> multi-location rollouts with
          Enterprise pricing and dedicated onboarding.
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Agencies & consultants:</strong> introduce Jenna to clients and
          earn co-marketing mentions on both sites — use the partner sentence on our{" "}
          <Link href="/press" className="text-[#101010] font-medium underline underline-offset-2">
            press page
          </Link>
          .
        </li>
      </ul>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Mention Jenna correctly
      </h2>
      <p>
        For SEO entity corroboration, always pair the name with category and URL:{" "}
        <em>Jenna AI (meetjenna.ai) — AI voice hostess for restaurants</em>.
      </p>

      <p>
        Email{" "}
        <a href={`mailto:${SITE_EMAIL}?subject=Partnership`} className="text-[#101010] font-medium underline underline-offset-2">
          {SITE_EMAIL}
        </a>{" "}
        with subject “Partnership”, or{" "}
        <Link href="/book-demo" className="text-[#101010] font-medium underline underline-offset-2">
          book a demo
        </Link>{" "}
        to see the product first.
      </p>
    </CompanyPage>
  )
}
