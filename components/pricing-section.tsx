"use client"

import type React from "react"
import Link from "next/link"
import { STATUS_SUCCESS } from "@/lib/theme"

export default function PricingSection() {
  const plans = {
    starter: {
      name: "Starter",
      price: 500,
      description: "For single-location restaurants getting off the phone and back on the floor.",
      features: [
        "750 minutes included per month",
        "$0.65 per minute for every minute over",
        "24/7 AI phone answering",
        "Menu, hours & FAQ handling",
        "Table reservations",
        "Staff call transfers",
        "Call recordings & dashboard",
        "Unlimited concurrent calls",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: 999,
      description: "Multi-location build for groups and operators who need scale, control, and dedicated support.",
      features: [
        "Everything in Starter",
        "Multi-location dashboard",
        "Dedicated account manager",
        "Custom voice & greeting",
        "SSO & enterprise security",
        "Volume pricing (5+ locations)",
        "Custom integrations & API access",
        "SLA-backed uptime & support",
      ],
    },
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 sm:gap-10 pt-6 sm:pt-10">
      {/* Header Section */}
      <div data-reveal className="w-full max-w-[586px] flex flex-col justify-start items-center gap-3 text-center">
          {/* Pricing Badge */}
          <div className="px-[12px] py-[5px] bg-white overflow-hidden rounded-[6px] flex justify-start items-center gap-[8px] shadow-[0px_1px_1px_rgba(36, 36, 36,0.04)]">
            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11M8.5 3H4.75C4.28587 3 3.84075 3.18437 3.51256 3.51256C3.18437 3.84075 3 4.28587 3 4.75C3 5.21413 3.18437 5.65925 3.51256 5.98744C3.84075 6.31563 4.28587 6.5 4.75 6.5H7.25C7.71413 6.5 8.15925 6.68437 8.48744 7.01256C8.81563 7.34075 9 7.78587 9 8.25C9 8.71413 8.81563 9.15925 8.48744 9.48744C8.15925 9.81563 7.71413 10 7.25 10H3.5"
                  stroke="#242424"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center flex justify-center flex-col text-[#242424] text-xs font-medium leading-3 font-sans">
              Plans & Pricing
            </div>
          </div>

          {/* Title */}
          <div className="self-stretch text-center flex justify-center flex-col text-[#242424] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Simple Pricing
          </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-center items-start w-full">
          {/* Pricing Cards Container */}
          <div className="flex-1 flex flex-col md:flex-row justify-center items-stretch gap-4 sm:gap-5 xl:gap-6">
            {/* Starter Plan */}
            <div data-reveal="scale" className="flex-1 max-w-full md:max-w-none self-stretch px-6 py-7 lg:px-9 lg:py-9 xl:px-10 xl:py-10 overflow-hidden flex flex-col gap-8 bg-[#EFEFEF] rounded-[6px]">
              {/* Plan info + CTA */}
              <div className="w-full flex flex-col justify-start items-start gap-7">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="text-[rgba(36, 36, 36,0.90)] text-lg xl:text-xl font-medium leading-7 font-sans">{plans.starter.name}</div>
                  <div className="w-full max-w-[340px] text-[rgba(36, 36, 36,0.70)] text-sm font-normal leading-6 font-sans">
                    {plans.starter.description}
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="flex items-center text-[#242424] text-5xl xl:text-6xl font-medium leading-none font-serif">
                    ${plans.starter.price}
                  </div>
                  <div className="text-[#898989] text-sm font-medium font-sans">per location, per month.</div>
                </div>

                <Link href="/book-demo" className="btn-cta self-stretch px-4 py-[10px] relative bg-[#101010] shadow-[0px_2px_4px_rgba(36, 36, 36,0.12)] overflow-hidden rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#242424] transition-colors">
                  <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <div className="flex justify-center flex-col text-white text-[13px] font-medium leading-5 font-sans">
                    Book a Demo
                  </div>
                </Link>
              </div>

              {/* Features */}
              <div className="w-full flex flex-col items-start gap-3.5 pt-8 border-t border-[rgba(0,0,0,0.10)]">
                {plans.starter.features.map((feature, index) => (
                  <div key={index} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-[rgba(36, 36, 36,0.80)] text-[13px] xl:text-sm font-normal leading-6 font-sans">
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Plan (Featured) */}
            <div data-reveal="scale" style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="flex-1 max-w-full md:max-w-none self-stretch px-6 py-7 lg:px-9 lg:py-9 xl:px-10 xl:py-10 bg-[#1A1815] overflow-hidden flex flex-col gap-8 rounded-[6px]">
              {/* Plan info + CTA */}
              <div className="w-full flex flex-col justify-start items-start gap-7">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="text-white text-lg xl:text-xl font-medium leading-7 font-sans">{plans.enterprise.name}</div>
                  <div className="w-full max-w-[340px] text-[#A3A3A3] text-sm font-normal leading-6 font-sans">
                    {plans.enterprise.description}
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="flex items-center text-[#E5E7EB] text-5xl xl:text-6xl font-medium leading-none font-serif">
                    ${plans.enterprise.price}
                  </div>
                  <div className="text-[#9CA3AF] text-sm font-medium font-sans">per location, per month.</div>
                </div>

                <Link href="/book-demo" className="btn-cta self-stretch px-4 py-[10px] relative bg-white shadow-[0px_2px_4px_rgba(36, 36, 36,0.12)] overflow-hidden rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#EFEFEF] transition-colors">
                  <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <div className="flex justify-center flex-col text-[#242424] text-[13px] font-medium leading-5 font-sans">
                    Book a Demo
                  </div>
                </Link>
              </div>

              {/* Features */}
              <div className="w-full flex flex-col items-start gap-3.5 pt-8 border-t border-[rgba(255,255,255,0.14)]">
                {plans.enterprise.features.map((feature, index) => (
                  <div key={index} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke={STATUS_SUCCESS}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-[#E5E7EB] text-[13px] xl:text-sm font-normal leading-6 font-sans">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
