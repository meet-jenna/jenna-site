"use client"

import type React from "react"
import { Check } from "lucide-react"

/* Shared design tokens for the hero dashboard views */
export const HD = {
  textPrimary: "#242424",
  textSecondary: "#6B7280",
  textMuted: "rgba(107, 114, 128,0.8)",
  border: "rgba(36, 36, 36,0.10)",
  borderSoft: "rgba(36, 36, 36,0.06)",
  green: "#16A34A",
  greenBg: "rgba(22, 163, 74,0.10)",
  cardShadow: "0px 1px 2px rgba(36, 36, 36,0.05)",
} as const

export function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping"
        style={{ background: HD.green, opacity: 0.5 }}
      />
      <span className="relative inline-flex rounded-full h-full w-full" style={{ background: HD.green }} />
    </span>
  )
}

export function Waveform({ color = "#ffffff", barWidth = 2.5, height = 14 }: { color?: string; barWidth?: number; height?: number }) {
  const bars = [0.35, 0.7, 1, 0.6, 0.85, 0.45, 0.75]
  return (
    <span className="flex items-center" style={{ gap: barWidth * 0.9, height }}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="hd-wave-bar"
          style={{
            width: barWidth,
            height: height * h,
            borderRadius: barWidth,
            background: color,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </span>
  )
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "neutral" | "green" | "dark"
}) {
  const styles =
    tone === "green"
      ? { background: HD.greenBg, color: HD.green, border: "1px solid rgba(22, 163, 74,0.18)" }
      : tone === "dark"
        ? { background: "#242424", color: "#ffffff", border: "1px solid #242424" }
        : { background: "#F4F4F4", color: HD.textSecondary, border: `1px solid ${HD.borderSoft}` }
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-full font-medium whitespace-nowrap"
      style={{ fontSize: 11.5, lineHeight: "14px", padding: "3px 9px", ...styles }}
    >
      {children}
    </span>
  )
}

function GreenCheck({ size = 14 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, background: HD.greenBg }}
    >
      <Check style={{ width: size * 0.62, height: size * 0.62, color: HD.green }} strokeWidth={3} />
    </span>
  )
}

function StatCard({ label, value, sub }: { label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div
      className="flex-1 bg-white rounded-[8px] flex flex-col justify-center gap-[6px]"
      style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow, padding: "16px 18px" }}
    >
      <div style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500, lineHeight: "16px" }}>{label}</div>
      <div className="flex items-baseline gap-2">
        <span style={{ fontSize: 24, color: HD.textPrimary, fontWeight: 600, lineHeight: "28px", letterSpacing: "-0.02em" }}>
          {value}
        </span>
        {sub}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 1 — Answers every call                                         */
/* ------------------------------------------------------------------ */

const CALL_ROWS = [
  {
    caller: "(415) 555-0132",
    intent: "Pickup",
    outcome: "Taking the order…",
    duration: "0:42",
    time: "Now",
    live: true,
  },
  { caller: "Maria G.", intent: "Reservation", outcome: "Booked · party of 4", duration: "1:18", time: "6:54 PM" },
  { caller: "(628) 555-0198", intent: "Delivery", outcome: "Order sent to POS", duration: "2:05", time: "6:47 PM" },
  { caller: "Daniel R.", intent: "Pickup", outcome: "Order sent to POS", duration: "1:32", time: "6:41 PM" },
  { caller: "(415) 555-0177", intent: "Question", outcome: "Answered · hours", duration: "0:38", time: "6:36 PM" },
  { caller: "Sofia L.", intent: "Reservation", outcome: "Booked · party of 2", duration: "1:04", time: "6:28 PM" },
  { caller: "(510) 555-0143", intent: "Delivery", outcome: "Order sent to POS", duration: "2:21", time: "6:19 PM" },
]

export function CallsView({ isActive }: { isActive: boolean }) {
  const cols = "minmax(0,1.35fr) minmax(0,1fr) minmax(0,1.5fr) minmax(0,0.6fr) minmax(0,0.6fr)"
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: "26px 30px", gap: 18 }} role="img" aria-label="Jenna dashboard answering every restaurant call live">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 19, fontWeight: 600, color: HD.textPrimary, letterSpacing: "-0.02em" }}>Calls</span>
          <Pill tone="green">
            <LiveDot size={6} />
            Live · answering
          </Pill>
        </div>
        <span style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>Today · Friday</span>
      </div>

      {/* Stats */}
      <div className="flex gap-3.5">
        <StatCard label="Calls answered" value="47" sub={<Pill tone="green">100%</Pill>} />
        <StatCard label="Missed calls" value="0" sub={<span style={{ fontSize: 12, color: HD.textMuted }}>24/7 coverage</span>} />
        <StatCard label="Answered on" value="1st ring" sub={<span style={{ fontSize: 12, color: HD.textMuted }}>avg</span>} />
      </div>

      {/* Call table */}
      <div className="flex-1 bg-white rounded-[8px] overflow-hidden flex flex-col" style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow }}>
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: cols,
            padding: "10px 18px",
            borderBottom: `1px solid ${HD.borderSoft}`,
            fontSize: 11.5,
            fontWeight: 500,
            color: HD.textMuted,
          }}
        >
          <span>Caller</span>
          <span>Intent</span>
          <span>Outcome</span>
          <span>Duration</span>
          <span className="text-right">Time</span>
        </div>
        {CALL_ROWS.map((row, i) => (
          <div
            key={row.caller}
            className={`grid items-center ${isActive ? "hd-item-in" : ""}`}
            style={{
              gridTemplateColumns: cols,
              padding: "11.5px 18px",
              borderBottom: i < CALL_ROWS.length - 1 ? `1px solid ${HD.borderSoft}` : "none",
              background: row.live ? "rgba(22, 163, 74,0.04)" : "transparent",
              fontSize: 13,
              animationDelay: `${i * 70}ms`,
            }}
          >
            <span className="flex items-center gap-2" style={{ color: HD.textPrimary, fontWeight: 500 }}>
              {row.live && <LiveDot size={6} />}
              {row.caller}
            </span>
            <span>
              <Pill>{row.intent}</Pill>
            </span>
            <span className="flex items-center gap-1.5" style={{ color: row.live ? HD.green : HD.textSecondary, fontWeight: row.live ? 500 : 400 }}>
              {row.live ? <Waveform color={HD.green} barWidth={2} height={11} /> : <GreenCheck size={13} />}
              {row.outcome}
            </span>
            <span style={{ color: HD.textSecondary }}>{row.duration}</span>
            <span className="text-right" style={{ color: row.live ? HD.green : HD.textMuted, fontWeight: row.live ? 500 : 400 }}>
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 2 — Takes the whole order                                      */
/* ------------------------------------------------------------------ */

const TRANSCRIPT: { from: "caller" | "jenna"; text: string }[] = [
  { from: "caller", text: "Hi, can I get a large margherita and two tiramisu?" },
  { from: "jenna", text: "Absolutely — anything to drink with that?" },
  { from: "caller", text: "Two cokes, and that's it." },
  { from: "jenna", text: "Got it. Pickup or delivery?" },
  { from: "caller", text: "Pickup, around 7:15 please." },
  { from: "jenna", text: "Perfect — that's $41.83. See you at 7:15!" },
]

const TICKET_ITEMS = [
  { qty: "1×", name: "Margherita", note: "Large · wood-fired", price: "$19.50" },
  { qty: "2×", name: "Tiramisu", note: "", price: "$14.00" },
  { qty: "2×", name: "Coke", note: "12 oz can", price: "$4.50" },
]

export function OrderView({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: "26px 30px", gap: 18 }} role="img" aria-label="Jenna taking a full pickup order on a live call">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 19, fontWeight: 600, color: HD.textPrimary, letterSpacing: "-0.02em" }}>Live call</span>
          <Pill tone="green">
            <LiveDot size={6} />
            (415) 555-0132
          </Pill>
        </div>
        <span className="flex items-center gap-2" style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>
          <Waveform color={HD.textSecondary} barWidth={2} height={11} />
          01:24
        </span>
      </div>

      <div className="flex-1 flex gap-3.5 min-h-0">
        {/* Transcript */}
        <div
          className="flex-[1.4] bg-white rounded-[8px] flex flex-col min-h-0"
          style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow, overflow: "hidden" }}
        >
          <div
            className="flex items-center justify-between shrink-0"
            style={{ padding: "14px 20px", borderBottom: `1px solid ${HD.borderSoft}` }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: HD.textPrimary }}>Transcript</span>
            <span className="flex items-center gap-2" style={{ fontSize: 11.5, color: HD.textMuted }}>
              <LiveDot size={5} />
              Jenna speaking
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-end min-h-0" style={{ padding: "20px 20px", gap: 12 }}>
          {TRANSCRIPT.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2.5 ${msg.from === "jenna" ? "justify-end" : "justify-start"} ${isActive ? "hd-item-in" : ""}`}
              style={{ animationDelay: `${i * 110}ms` }}
            >
              {msg.from === "jenna" && (
                <span style={{ fontSize: 10.5, color: HD.textMuted, fontWeight: 500 }}>Jenna</span>
              )}
              <span
                className="rounded-full"
                style={{
                  padding: "8px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: "16px",
                  letterSpacing: "-0.2px",
                  background: msg.from === "jenna" ? "#242424" : "#EDEDED",
                  color: msg.from === "jenna" ? "#ffffff" : HD.textPrimary,
                  maxWidth: "85%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          </div>
        </div>

        {/* Order ticket */}
        <div
          className="flex-1 bg-white rounded-[8px] flex flex-col"
          style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow }}
        >
          <div className="flex items-center justify-between" style={{ padding: "14px 18px", borderBottom: `1px solid ${HD.borderSoft}` }}>
            <div className="flex flex-col gap-[3px]">
              <span style={{ fontSize: 13.5, fontWeight: 600, color: HD.textPrimary }}>Order #1042</span>
              <span style={{ fontSize: 11.5, color: HD.textSecondary }}>Pickup · 7:15 PM</span>
            </div>
            <Pill tone="green">
              <LiveDot size={5} />
              Building
            </Pill>
          </div>

          <div className="flex-1 flex flex-col" style={{ padding: "14px 18px", gap: 13 }}>
            {TICKET_ITEMS.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-start justify-between gap-2 ${isActive ? "hd-item-in" : ""}`}
                style={{ animationDelay: `${350 + i * 200}ms` }}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span style={{ fontSize: 12.5, color: HD.textMuted, fontWeight: 500, marginTop: 0.5 }}>{item.qty}</span>
                  <div className="flex flex-col gap-[2px] min-w-0">
                    <span style={{ fontSize: 13, fontWeight: 500, color: HD.textPrimary, lineHeight: "16px" }}>{item.name}</span>
                    {item.note && (
                      <span style={{ fontSize: 11, color: HD.textMuted, lineHeight: "13px" }}>{item.note}</span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>{item.price}</span>
              </div>
            ))}
            <div
              className={`flex items-center gap-2 ${isActive ? "hd-item-in" : ""}`}
              style={{ animationDelay: "1000ms", fontSize: 11.5, color: HD.textMuted }}
            >
              <LiveDot size={5} />
              Listening for more items…
            </div>
          </div>

          <div className="flex flex-col" style={{ padding: "13px 18px", borderTop: `1px solid ${HD.borderSoft}`, gap: 7 }}>
            <div className="flex justify-between" style={{ fontSize: 12, color: HD.textSecondary }}>
              <span>Subtotal</span>
              <span>$38.00</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: 12, color: HD.textSecondary }}>
              <span>Tax</span>
              <span>$3.83</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: 14, fontWeight: 600, color: HD.textPrimary }}>
              <span>Total</span>
              <span>$41.83</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 3 — Syncs to your POS                                          */
/* ------------------------------------------------------------------ */

const SYNC_STEPS = [
  { label: "Call completed", detail: "Order confirmed with caller", time: "7:02 PM" },
  { label: "Order created in Toast", detail: "Items, modifiers & pickup time", time: "7:02 PM", logo: "/integrations/pos/icons/toast-circle.svg" },
  { label: "Sent to kitchen printer", detail: "Ticket #1042 · Station 2", time: "7:02 PM" },
  { label: "Confirmation text sent", detail: "“Ready at 7:15 PM”", time: "7:03 PM" },
]

const POS_ROW = [
  { src: "/integrations/pos/icons/toast-circle.svg", name: "Toast" },
  { src: "/integrations/pos/icons/square-circle.svg", name: "Square" },
  { src: "/integrations/pos/icons/clover-circle.svg", name: "Clover" },
  { src: "/integrations/pos/icons/shift4-circle.svg", name: "Shift4" },
  { src: "/integrations/pos/icons/ncr-aloha-circle.svg", name: "NCR Aloha" },
  { src: "/integrations/pos/icons/oracle-micros-circle.svg", name: "Oracle MICROS" },
]

export function PosSyncView({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: "26px 30px", gap: 18 }} role="img" aria-label="Order from Jenna syncing directly into the restaurant POS">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 19, fontWeight: 600, color: HD.textPrimary, letterSpacing: "-0.02em" }}>Order #1042</span>
          <Pill tone="green">
            <Check style={{ width: 11, height: 11 }} strokeWidth={3} />
            Synced to POS
          </Pill>
        </div>
        <span style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>Pickup · 7:15 PM</span>
      </div>

      <div className="flex-1 flex gap-3.5 min-h-0">
        {/* Ticket recap */}
        <div className="flex-1 bg-white rounded-[8px] flex flex-col" style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow }}>
          <div className="flex items-center justify-between" style={{ padding: "14px 18px", borderBottom: `1px solid ${HD.borderSoft}` }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: HD.textPrimary }}>Ticket</span>
            <span style={{ fontSize: 11.5, color: HD.textMuted }}>(415) 555-0132</span>
          </div>
          <div className="flex-1 flex flex-col" style={{ padding: "14px 18px", gap: 12 }}>
            {TICKET_ITEMS.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2" style={{ fontSize: 13, color: HD.textPrimary, fontWeight: 500 }}>
                  <GreenCheck size={14} />
                  {item.qty} {item.name}
                </span>
                <span style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between" style={{ padding: "13px 18px", borderTop: `1px solid ${HD.borderSoft}` }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: HD.textPrimary }}>Total</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: HD.textPrimary }}>$41.83</span>
          </div>
        </div>

        {/* Sync timeline */}
        <div className="flex-[1.4] bg-white rounded-[8px] flex flex-col" style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow, padding: "18px 20px" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: HD.textPrimary }}>Sync activity</span>
            <span style={{ fontSize: 11.5, color: HD.textMuted }}>No new hardware</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {SYNC_STEPS.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-start gap-3 relative ${isActive ? "hd-item-in" : ""}`}
                style={{ animationDelay: `${200 + i * 180}ms`, paddingBottom: i < SYNC_STEPS.length - 1 ? 38 : 0 }}
              >
                {/* Connector line */}
                {i < SYNC_STEPS.length - 1 && (
                  <span
                    className="absolute"
                    style={{ left: 10.5, top: 26, bottom: 4, width: 1, background: HD.border }}
                  />
                )}
                {step.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={step.logo} alt="" className="rounded-full shrink-0 relative" style={{ width: 22, height: 22, border: `1px solid ${HD.borderSoft}` }} />
                ) : (
                  <span className="relative shrink-0 flex items-center justify-center" style={{ width: 22, height: 22 }}>
                    <GreenCheck size={18} />
                  </span>
                )}
                <div className="flex-1 flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-[2px]">
                    <span style={{ fontSize: 13, fontWeight: 500, color: HD.textPrimary, lineHeight: "16px" }}>{step.label}</span>
                    <span style={{ fontSize: 11.5, color: HD.textMuted, lineHeight: "14px" }}>{step.detail}</span>
                  </div>
                  <span style={{ fontSize: 11, color: HD.textMuted, fontWeight: 500, whiteSpace: "nowrap" }}>{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POS strip */}
      <div
        className="bg-white rounded-[8px] flex items-center justify-between"
        style={{ border: `1px solid ${HD.border}`, boxShadow: HD.cardShadow, padding: "12px 18px" }}
      >
        <span style={{ fontSize: 12.5, color: HD.textSecondary, fontWeight: 500 }}>Works with your POS</span>
        <div className="flex items-center" style={{ gap: 10 }}>
          {POS_ROW.map((pos) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={pos.name}
              src={pos.src}
              alt={pos.name}
              title={pos.name}
              className="rounded-full"
              style={{ width: 24, height: 24, border: `1px solid ${HD.borderSoft}` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
