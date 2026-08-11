"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Bell,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Moon,
  PhoneCall,
  Settings,
  UtensilsCrossed,
} from "lucide-react"
import { CallsView, IntegrationsView, OverviewView, HD } from "./hero-views"
import { JennaLogo } from "../jenna-logo"

/** Fixed design canvas — scaled to fit the hero card like an object-cover image */
const CANVAS_W = 960
const CANVAS_H = 696
const SIDEBAR_W = 200
const TOPBAR_H = 52

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, activeForView: 0 },
  { label: "Calls", icon: PhoneCall, activeForView: 1 },
  { label: "Menu", icon: UtensilsCrossed },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings, activeForView: 2 },
  { label: "Help", icon: HelpCircle },
]

const VIEW_TITLES = ["Overview", "Calls", "Settings"] as const

function Sidebar({ activeView }: { activeView: number }) {
  return (
    <div
      className="h-full flex flex-col shrink-0"
      style={{
        width: SIDEBAR_W,
        background: HD.card,
        borderRight: `1px solid ${HD.border}`,
      }}
    >
      <div
        className="flex items-center gap-2.5 shrink-0"
        style={{ height: TOPBAR_H, padding: "0 14px", borderBottom: `1px solid ${HD.border}` }}
      >
        <JennaLogo shape="app" size={28} />
        <span style={{ fontSize: 15, fontWeight: 600, color: HD.fg }}>Jenna</span>
      </div>

      <nav className="flex-1 overflow-hidden" style={{ padding: "12px 10px" }}>
        <div className="flex flex-col" style={{ gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.activeForView === activeView
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="relative flex items-center rounded-lg transition-colors duration-500"
                style={{
                  gap: 10,
                  padding: "8px 10px",
                  background: isActive ? HD.secondary : "transparent",
                  color: isActive ? HD.fg : HD.muted,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-opacity duration-500"
                  style={{
                    width: 3,
                    height: 18,
                    background: HD.accent,
                    opacity: isActive ? 1 : 0,
                  }}
                />
                <Icon
                  style={{
                    width: 16,
                    height: 16,
                    color: isActive ? HD.accent : HD.muted,
                  }}
                  strokeWidth={isActive ? 2.1 : 1.85}
                />
                <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: "15px" }}>{item.label}</span>
              </div>
            )
          })}
        </div>
      </nav>

      <div
        className="shrink-0 flex items-center gap-2.5"
        style={{ padding: "12px 12px", borderTop: `1px solid ${HD.border}` }}
      >
        <span
          className="rounded-lg flex items-center justify-center shrink-0 font-semibold"
          style={{
            width: 28,
            height: 28,
            fontSize: 10,
            background: HD.secondary,
            color: HD.fg,
            border: `1px solid ${HD.border}`,
          }}
        >
          HH
        </span>
        <span className="flex flex-col min-w-0">
          <span style={{ fontSize: 11.5, fontWeight: 600, color: HD.fg, lineHeight: "14px" }}>Harbor House</span>
          <span style={{ fontSize: 10, color: HD.muted, lineHeight: "12px" }}>Demo restaurant</span>
        </span>
      </div>
    </div>
  )
}

function Topbar({ activeView }: { activeView: number }) {
  return (
    <div
      className="w-full flex items-center justify-between shrink-0"
      style={{
        height: TOPBAR_H,
        borderBottom: `1px solid ${HD.border}`,
        padding: "0 18px",
        background: "rgba(247, 247, 249, 0.88)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600, color: HD.fg, letterSpacing: "-0.01em" }}>
        {VIEW_TITLES[activeView] ?? "Overview"}
      </span>
      <div className="flex items-center" style={{ gap: 8 }}>
        <span
          className="flex items-center justify-center rounded-lg"
          style={{ width: 30, height: 30, color: HD.muted }}
        >
          <Moon style={{ width: 15, height: 15 }} strokeWidth={1.9} />
        </span>
        <span className="relative flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, color: HD.muted }}>
          <Bell style={{ width: 15, height: 15 }} strokeWidth={1.9} />
          <span
            className="absolute rounded-full"
            style={{ width: 6, height: 6, background: HD.accent, top: 6, right: 6 }}
          />
        </span>
        <span
          className="rounded-lg flex items-center justify-center font-semibold"
          style={{
            width: 30,
            height: 30,
            fontSize: 11,
            background: HD.card,
            color: HD.fg,
            border: `1px solid ${HD.border}`,
          }}
        >
          D
        </span>
      </div>
    </div>
  )
}

/**
 * HeroDashboard — scaled replica of the meet-jenna Harbor House operator portal.
 * Main content crossfades Overview → Calls → Integrations with the feature tabs.
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
        setScale(Math.max(width / CANVAS_W, height / CANVAS_H))
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const views = [OverviewView, CallsView, IntegrationsView]

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: HD.bg }}>
      <style>{`
        @keyframes hd-fade-up {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hd-item-in {
          animation: hd-fade-up 0.5s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hd-item-in { animation: none; }
        }
      `}</style>

      <div
        className="absolute flex font-sans"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          left: "50%",
          top: 0,
          transform: `translateX(-50%) scale(${scale ?? 1})`,
          transformOrigin: "top center",
          opacity: scale === null ? 0 : 1,
          background: HD.bg,
          color: HD.fg,
        }}
      >
        <Sidebar activeView={activeView} />
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <Topbar activeView={activeView} />
          <div className="flex-1 relative min-w-0 min-h-0 overflow-hidden">
            {views.map((View, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  activeView === i
                    ? "opacity-100 scale-100 blur-0"
                    : "opacity-0 scale-[0.97] blur-sm pointer-events-none"
                }`}
              >
                <View isActive={activeView === i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">Harbor House demo dashboard — {VIEW_TITLES[activeView]}</span>
    </div>
  )
}
