"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function CTASection() {
  return (
    <div className="w-full px-6 py-10 sm:py-14 md:py-16 flex flex-col justify-center items-center gap-2 overflow-hidden">
      {/* Content */}
      <div className="self-stretch flex justify-center items-center gap-6 relative z-10">
        <div className="w-full max-w-[586px] overflow-hidden flex flex-col justify-start items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch text-center flex justify-center flex-col text-[#242424] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              Ready to stop missing calls?
            </div>
            <div className="self-stretch text-center text-[#6B7280] text-base leading-7 font-sans font-medium">
              See Jenna answer your phones, take orders, and book tables.
              <br />
              Book a quick demo and hear her live.
            </div>
          </div>
          <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-12">
            <div className="flex justify-start items-center gap-4">
              <Link href="/book-demo" className="h-11 px-12 py-[6px] relative bg-[#101010] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#242424] transition-colors">
                <div className="w-44 h-[41px] absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="flex flex-row items-center justify-center gap-1.5 text-white text-[13px] font-medium leading-5 font-sans">
                  Book a Demo
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
