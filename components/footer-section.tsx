import type { ReactNode } from "react"
import Link from "next/link"
import { JennaWordmark } from "./jenna-logo"
import { getActiveSocialProfiles, type SocialProfile } from "../lib/social"

function SocialIcon({ profile }: { profile: SocialProfile }) {
  if (!profile.url) return null

  const paths: Record<SocialProfile["id"], ReactNode> = {
    x: (
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="#242424"
      />
    ),
    linkedin: (
      <path
        d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
        fill="#242424"
      />
    ),
    github: (
      <path
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.374-12-12-12z"
        fill="#242424"
      />
    ),
    youtube: (
      <path
        d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"
        fill="#242424"
      />
    ),
    producthunt: (
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.5 14.25h-3.75V18h-2.25V6h6a3.75 3.75 0 010 7.5zm0-5.25h-3.75v3h3.75a1.5 1.5 0 000-3z"
        fill="#242424"
      />
    ),
    crunchbase: (
      <path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm1.2 14.2h-2.4v-1.1c-1.5.2-2.7 1-2.7 2.4H6.3c0-2.1 1.5-3.3 3.5-3.6V12H6.8V9.8h2.9V7.2h2.5v2.6h2.2L15 12h-1.8v4.2z"
        fill="#242424"
      />
    ),
  }

  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={profile.label}
      className="w-6 h-6 relative overflow-hidden flex items-center justify-center hover:opacity-70 transition-opacity"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {paths[profile.id]}
      </svg>
    </a>
  )
}

const linkClass =
  "text-[#242424] text-sm font-normal leading-5 font-sans hover:text-[#242424] transition-colors"

export default function FooterSection() {
  const socials = getActiveSocialProfiles()

  return (
    <div className="w-full bg-[#EFEFEF] rounded-[6px] px-2 sm:px-6 pt-4 pb-2 flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch h-auto flex flex-col md:flex-row justify-between items-stretch pr-0 pb-8 pt-0">
        <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
          <div className="self-stretch flex justify-start items-center gap-3">
            <JennaWordmark logoSize={32} textClassName="text-xl leading-4" />
          </div>
          <div className="text-[rgba(36, 36, 36,0.90)] text-sm font-medium leading-[18px] font-sans">
            The AI hostess for every restaurant.
          </div>

          {socials.length > 0 && (
            <div className="flex justify-start items-start gap-4">
              {socials.map((profile) => (
                <SocialIcon key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>

        <div className="self-stretch p-4 md:p-8 flex flex-col sm:flex-row flex-wrap justify-start sm:justify-between items-start gap-6 md:gap-8">
          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="self-stretch text-[rgba(36, 36, 36,0.50)] text-sm font-medium leading-5 font-sans">
              Product
            </div>
            <div className="flex flex-col justify-end items-start gap-2">
              <Link href="/#features" className={linkClass}>
                Features
              </Link>
              <Link href="/#pricing" className={linkClass}>
                Pricing
              </Link>
              <Link href="/integrations" className={linkClass}>
                Integrations
              </Link>
              <Link href="/#how-it-works" className={linkClass}>
                How it works
              </Link>
              <Link href="/book-demo" className={linkClass}>
                Book a demo
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="self-stretch text-[rgba(36, 36, 36,0.50)] text-sm font-medium leading-5 font-sans">
              Solutions
            </div>
            <div className="flex flex-col justify-end items-start gap-2">
              <Link href="/voice-ai-for-restaurants" className={linkClass}>
                Voice AI for Restaurants
              </Link>
              <Link href="/ai-phone-answering" className={linkClass}>
                AI Phone Answering
              </Link>
              <Link href="/restaurant-answering-service" className={linkClass}>
                Answering Service
              </Link>
              <Link href="/ai-hostess" className={linkClass}>
                AI Hostess
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(36, 36, 36,0.50)] text-sm font-medium leading-5 font-sans">Company</div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Link href="/about" className={linkClass}>
                About
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
              <Link href="/blog" className={linkClass}>
                Blog
              </Link>
              <Link href="/partners" className={linkClass}>
                Partners
              </Link>
              <Link href="/press" className={linkClass}>
                Press
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(36, 36, 36,0.50)] text-sm font-medium leading-5 font-sans">Resources</div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Link href="/blog/what-is-jenna-ai" className={linkClass}>
                What is Jenna AI?
              </Link>
              <Link href="/blog" className={linkClass}>
                Help & guides
              </Link>
              <Link href="/privacy" className={linkClass}>
                Privacy policy
              </Link>
              <Link href="/terms" className={linkClass}>
                Terms of use
              </Link>
              <Link href="/sitemap.xml" className={linkClass}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch px-2 sm:px-2 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-[rgba(36, 36, 36,0.55)] text-xs font-medium leading-5 font-sans">
          © {new Date().getFullYear()} Jenna. All rights reserved.
        </div>
        <div className="text-[rgba(36, 36, 36,0.45)] text-xs font-medium leading-5 font-sans">
          Meet Jenna — the AI hostess for every restaurant.
        </div>
      </div>
    </div>
  )
}
