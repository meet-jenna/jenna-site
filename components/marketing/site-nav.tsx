"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PORTAL_URL } from "../../lib/portal"

/**
 * Top navigation shared across all pages. Matches the home page header:
 * transparent at the top of the page, then a blurred pill on scroll.
 * Uses real <Link> elements (good for crawlability/internal linking).
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-[720px] xl:max-w-[800px] h-12 py-2 pl-4 pr-2 rounded-[6px] flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "bg-[#F4F4F5]/90 backdrop-blur-md shadow-[0px_2px_8px_rgba(36,36,36,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-center items-center">
          <Link href="/" className="text-[#242424] text-lg sm:text-xl font-semibold leading-5 font-sans">
            Jenna
          </Link>
          <nav className="pl-4 sm:pl-5 hidden sm:flex flex-row gap-3 sm:gap-4">
            <Link
              href="/#features"
              className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex justify-end items-center gap-2 sm:gap-3">
          <a
            href={PORTAL_URL}
            className="flex items-center text-[rgba(36,36,36,0.75)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[#242424] transition-colors px-2"
          >
            Sign in
          </a>
          <Link
            href="/book-demo"
            className="px-3 md:px-[14px] py-[7px] bg-[#101010] overflow-hidden rounded-[6px] flex justify-center items-center gap-1 hover:bg-[#242424] transition-colors"
          >
            <span className="text-white text-xs md:text-[13px] font-medium leading-5 font-sans">Demo</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </header>
  )
}
