import type { Metadata } from "next"
import Link from "next/link"
import CompanyPage from "../../components/marketing/company-page"
import { buildBreadcrumbJsonLd } from "../../lib/seo"
import { SITE_EMAIL } from "../../lib/social"

const title = "Privacy Policy"
const description =
  "Privacy policy for Jenna (meetjenna.ai) — how we collect, use, and protect information when you use our site and services."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${title} — Jenna`,
    description,
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Jenna`,
    description,
  },
}

export default function PrivacyPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ])

  return (
    <CompanyPage title={title} description={description} showCta={false} jsonLd={breadcrumb}>
      <p className="text-sm text-[#9CA3AF]">Last updated: August 3, 2026</p>

      <p>
        Jenna (&quot;we&quot;, &quot;us&quot;) operates meetjenna.ai and related services (the &quot;Service&quot;). This
        policy explains what information we collect and how we use it. For product questions,{" "}
        <Link href="/contact" className="text-[#101010] font-medium underline underline-offset-2">
          contact us
        </Link>
        .
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Information we collect
      </h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>
          <strong className="text-[#242424] font-medium">Demo and contact requests</strong> — name, email, restaurant
          details, and message content you submit via our forms.
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Usage data</strong> — approximate location, device/browser type,
          pages viewed, and referral URLs via privacy-friendly analytics (e.g. Vercel Analytics) to improve the site.
        </li>
        <li>
          <strong className="text-[#242424] font-medium">Service data</strong> — if you become a customer, call-related
          data (transcripts, recordings, orders) is processed as described in your customer agreement to provide the
          AI hostess service.
        </li>
      </ul>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        How we use information
      </h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>Respond to demo requests and sales inquiries</li>
        <li>Provide, maintain, and improve the Service</li>
        <li>Communicate about product updates and support</li>
        <li>Detect abuse and protect the security of our systems</li>
      </ul>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Sharing
      </h2>
      <p>
        We do not sell your personal information. We may share data with processors who help us run the Service (hosting,
        email delivery, analytics) under contractual obligations to protect it, or when required by law.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
        Retention & rights
      </h2>
      <p>
        We retain contact and account data as long as needed for the purposes above or as required by law. Depending on
        your location, you may have rights to access, correct, or delete personal information. Email{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="text-[#101010] font-medium underline underline-offset-2">
          {SITE_EMAIL}
        </a>{" "}
        to make a request.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Cookies</h2>
      <p>
        We use essential cookies required for the site to function and limited analytics cookies/pixels that help us
        understand aggregate traffic. You can control cookies through your browser settings.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Updates</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change when we do.
        Continued use of the site after updates constitutes acceptance of the revised policy.
      </p>

      <h2 className="mt-4 text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">Contact</h2>
      <p>
        Privacy questions:{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="text-[#101010] font-medium underline underline-offset-2">
          {SITE_EMAIL}
        </a>
      </p>
    </CompanyPage>
  )
}
