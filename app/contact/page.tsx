import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import { absoluteUrl, buildBreadcrumbJsonLd } from "../../lib/seo"
import { SITE_EMAIL } from "../../lib/social"

const title = "Contact"
const description =
  "Contact Jenna AI — book a demo, ask about POS integrations, or reach the team at meetjenna.ai."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ])

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "Jenna",
      email: SITE_EMAIL,
      url: absoluteUrl("/"),
    },
  }

  return (
    <CompanyPage title={title} description={description} jsonLd={[breadcrumb, contactJsonLd]}>
      <p>
        Want to see Jenna answer a real restaurant call? The fastest path is a live demo — we&apos;ll walk through
        order taking, reservations, and POS sync for your stack.
      </p>
      <p>
        <Link
          href="/book-demo"
          className="inline-flex items-center justify-center h-11 px-6 bg-[#101010] rounded-[6px] text-white text-[14px] font-medium hover:bg-[#242424] transition-colors"
        >
          Book a demo
        </Link>
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Email</h2>
      <p>
        Sales and general inquiries:{" "}
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]"
        >
          {SITE_EMAIL}
        </a>
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Press & partners</h2>
      <p>
        For media kits, boilerplate, and directory bios, see our{" "}
        <Link href="/press" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]">
          press page
        </Link>
        . Partnership and co-marketing ideas are welcome at the same inbox — include your restaurant or POS affiliation
        in the subject line.
      </p>
    </CompanyPage>
  )
}
