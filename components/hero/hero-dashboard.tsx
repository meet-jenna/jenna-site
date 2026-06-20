"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  BarChart3,
  Bell,
  CalendarDays,
  Home,
  Phone,
  Plug2,
  ReceiptText,
  Search,
  Settings,
  UtensilsCrossed,
} from "lucide-react"
import { CallsView, OrderView, PosSyncView, HD, LiveDot } from "./hero-views"
import { JennaLogo } from "../jenna-logo"

/** Fixed design canvas — scaled to fit the hero card like an object-cover image */
const CANVAS_W = 960
const CANVAS_H = 696
const SIDEBAR_W = 198
const TOPBAR_H = 52

const NAV_ITEMS = [
  { label: "Overview", icon: Home },
  { label: "Calls", icon: Phone, activeForView: 0, badge: "Live" },
  { label: "Orders", icon: ReceiptText, activeForView: 1, badge: "12" },
  { label: "Reservations", icon: CalendarDays },
  { label: "Menu", icon: UtensilsCrossed },
  { label: "Integrations", icon: Plug2, activeForView: 2 },
  { label: "Analytics", icon: BarChart3 },
]

function JennaMark({ size = 18 }: { size?: number }) {
  return <JennaLogo shape="app" size={size} />
}

function Sidebar({ activeView }: { activeView: number }) {
  return (
    <div
      className="h-full flex flex-col shrink-0"
      style={{ width: SIDEBAR_W, background: "#EFEFEF", borderRight: `1px solid ${HD.borderSoft}`, padding: "14px 10px" }}
    >
      <div className="flex flex-col" style={{ gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.activeForView === activeView
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-[7px] transition-colors duration-500"
              style={{
                padding: "7.5px 10px",
                background: isActive ? "#ffffff" : "transparent",
                border: `1px solid ${isActive ? HD.border : "transparent"}`,
                boxShadow: isActive ? HD.cardShadow : "none",
              }}
            >
              <span className="flex items-center" style={{ gap: 9 }}>
                <Icon
                  style={{ width: 14.5, height: 14.5, color: isActive ? HD.textPrimary : HD.textMuted }}
                  strokeWidth={isActive ? 2.1 : 1.8}
                />
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: isActive ? HD.textPrimary : HD.textSecondary,
                    lineHeight: "15px",
                  }}
                >
                  {item.label}
                </span>
              </span>
              {item.badge && isActive && (
                <span
                  className="flex items-center rounded-full"
                  style={{
                    gap: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 7px",
                    background: item.badge === "Live" ? HD.liveBg : "#F4F4F4",
                    color: item.badge === "Live" ? HD.live : HD.textSecondary,
                  }}
                >
                  {item.badge === "Live" && <LiveDot size={5} />}
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col" style={{ gap: 2 }}>
        <div className="flex items-center" style={{ gap: 9, padding: "7.5px 10px" }}>
          <Settings style={{ width: 14.5, height: 14.5, color: HD.textMuted }} strokeWidth={1.8} />
          <span style={{ fontSize: 12.5, fontWeight: 500, color: HD.textSecondary }}>Settings</span>
        </div>
        <div
          className="flex items-center rounded-[7px] bg-white"
          style={{ gap: 9, padding: "8px 10px", border: `1px solid ${HD.borderSoft}` }}
        >
          <span
            className="rounded-full flex items-center justify-center shrink-0 text-white font-semibold"
            style={{ width: 22, height: 22, background: "#242424", fontSize: 9.5 }}
          >
            BC
          </span>
          <span className="flex flex-col" style={{ gap: 1 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: HD.textPrimary, lineHeight: "13px" }}>
              Bella Cucina
            </span>
            <span style={{ fontSize: 10, color: HD.textMuted, lineHeight: "12px" }}>San Francisco</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function Topbar() {
  return (
    <div
      className="w-full flex items-center justify-between shrink-0 bg-white"
      style={{ height: TOPBAR_H, borderBottom: `1px solid ${HD.borderSoft}`, padding: "0 18px" }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        <JennaMark size={20} />
        <span style={{ fontSize: 14.5, fontWeight: 600, color: HD.textPrimary, letterSpacing: "-0.01em" }}>Jenna</span>
        <span style={{ color: HD.border, fontSize: 13 }}>/</span>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: HD.textSecondary }}>Bella Cucina</span>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <div
          className="flex items-center rounded-full"
          style={{ gap: 7, padding: "5.5px 12px", background: "#F4F4F4", border: `1px solid ${HD.borderSoft}`, width: 170 }}
        >
          <Search style={{ width: 12.5, height: 12.5, color: HD.textMuted }} strokeWidth={2} />
          <span style={{ fontSize: 11.5, color: HD.textMuted }}>Search</span>
        </div>
        <span className="relative inline-flex">
          <Bell style={{ width: 15, height: 15, color: HD.textSecondary }} strokeWidth={1.9} />
          <span
            className="absolute rounded-full"
            style={{ width: 6, height: 6, background: HD.live, top: -1, right: -1, border: "1.5px solid #ffffff" }}
          />
        </span>
      </div>
    </div>
  )
}

/**
 * HeroDashboard — the hero card visual.
 * One cohesive Jenna dashboard; the main content crossfades between three
 * views in sync with the feature tabs (answers calls / takes orders / POS sync).
 */
export default function HeroDashboard({ activeView }: { activeView: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width > 0 && height > 0) {
        // Emulate object-cover: fill the card, crop the bottom edge if needed
        setScale(Math.max(width / CANVAS_W, height / CANVAS_H))
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const views = [CallsView, OrderView, PosSyncView]

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-white">
      <style>{`
        @keyframes hd-wave {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        .hd-wave-bar {
          animation: hd-wave 1.1s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes hd-fade-up {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hd-item-in {
          animation: hd-fade-up 0.5s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hd-wave-bar, .hd-item-in { animation: none; }
        }
      `}</style>

      <div
        className="absolute flex flex-col font-sans"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          left: "50%",
          top: 0,
          transform: `translateX(-50%) scale(${scale ?? 1})`,
          transformOrigin: "top center",
          opacity: scale === null ? 0 : 1,
        }}
      >
        <Topbar />
        <div className="flex-1 flex min-h-0">
          <Sidebar activeView={activeView} />
          <div className="flex-1 relative min-w-0" style={{ background: "#EFEFEF" }}>
            {views.map((View, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  activeView === i ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.97] blur-sm pointer-events-none"
                }`}
              >
                <View isActive={activeView === i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
