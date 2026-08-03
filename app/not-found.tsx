import Link from "next/link"
import SiteNav from "../components/marketing/site-nav"
import FooterSection from "../components/footer-section"

export default function NotFound() {
  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <SiteNav />
      <main className="w-full max-w-[720px] px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 pb-16 flex flex-col items-center text-center gap-6">
        <p className="text-[#9CA3AF] text-sm font-medium font-sans">404</p>
        <h1 className="text-[#242424] text-3xl sm:text-4xl font-semibold leading-tight font-sans tracking-tight">
          Page not found
        </h1>
        <p className="text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans max-w-[480px]">
          That URL doesn&apos;t exist on Meet Jenna. Try the homepage, or learn what Jenna AI is.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/"
            className="h-11 px-6 bg-[#101010] rounded-[6px] flex items-center text-white text-sm font-medium hover:bg-[#242424] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="h-11 px-6 bg-[#EFEFEF] rounded-[6px] flex items-center text-[#242424] text-sm font-medium hover:bg-[#E6E6E6] transition-colors"
          >
            About Jenna
          </Link>
          <Link
            href="/blog"
            className="h-11 px-6 bg-[#EFEFEF] rounded-[6px] flex items-center text-[#242424] text-sm font-medium hover:bg-[#E6E6E6] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/book-demo"
            className="h-11 px-6 bg-[#EFEFEF] rounded-[6px] flex items-center text-[#242424] text-sm font-medium hover:bg-[#E6E6E6] transition-colors"
          >
            Book a demo
          </Link>
        </div>
      </main>
      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
