import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import { buildBreadcrumbJsonLd } from "../../lib/seo"
import { SITE_EMAIL } from "../../lib/social"

const title = "Terms of Use"
const description =
  "Terms of use for the Jenna marketing site at meetjenna.ai. Customer service agreements apply separately when you subscribe."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function TermsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Use", path: "/terms" },
  ])

  return (
    <CompanyPage title={title} description={description} showCta={false} jsonLd={breadcrumb}>
      <p className="text-sm text-[#9CA3AF]">Last updated: August 3, 2026</p>

      <p>
        These Terms of Use govern your access to the public website at meetjenna.ai (the &quot;Site&quot;) operated by
        Jenna (&quot;we&quot;, &quot;us&quot;). By using the Site, you agree to these terms. If you purchase or use the
        Jenna AI hostess product, a separate customer agreement will also apply.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Use of the Site
      </h2>
      <p>
        You may browse the Site for lawful purposes — learning about Jenna, reading our blog, and requesting a demo. You
        agree not to misuse the Site (including attempting to disrupt it, scrape it aggressively, or submit abusive or
        fraudulent form content).
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Demo requests
      </h2>
      <p>
        Information you submit through{" "}
        <Link href="/book-demo" className="text-[#101010] font-medium underline underline-offset-2">
          Book a demo
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-[#101010] font-medium underline underline-offset-2">
          Contact
        </Link>{" "}
        must be accurate. We may follow up by email about Jenna&apos;s products and services.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Intellectual property
      </h2>
      <p>
        Site content, branding, and software descriptions are owned by Jenna or our licensors. You may not copy or
        redistribute them for commercial purposes without permission, except for fair use / press excerpts as described
        on our{" "}
        <Link href="/press" className="text-[#101010] font-medium underline underline-offset-2">
          press
        </Link>{" "}
        page.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Disclaimers
      </h2>
      <p>
        The Site is provided &quot;as is.&quot; Marketing descriptions of features and pricing may change. Competitor
        comparisons on the blog reflect publicly available positioning and should be verified with each vendor.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Limitation of liability
      </h2>
      <p>
        To the fullest extent permitted by law, Jenna is not liable for indirect, incidental, or consequential damages
        arising from your use of the Site. Our aggregate liability related to the Site will not exceed one hundred U.S.
        dollars (USD $100).
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Governing law
      </h2>
      <p>
        These terms are governed by the laws of the United States and the State of Delaware, without regard to conflict
        of law rules, unless a different jurisdiction is required by applicable law.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="text-[#101010] font-medium underline underline-offset-2">
          {SITE_EMAIL}
        </a>
      </p>
    </CompanyPage>
  )
}
