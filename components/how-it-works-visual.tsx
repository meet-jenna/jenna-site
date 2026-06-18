"use client"

import { Check, Phone, Plug2, Settings2 } from "lucide-react"
import { JennaLogo } from "./jenna-logo"
import { STATUS_LIVE, UI_SURFACE, UI_BORDER } from "@/lib/theme"

const T = {
  textPrimary: "#242424",
  textSecondary: "#6B7280",
  textMuted: "rgba(107, 114, 128,0.85)",
  border: "rgba(36, 36, 36,0.10)",
  borderSoft: "rgba(36, 36, 36,0.06)",
  live: STATUS_LIVE,
  liveBg: UI_SURFACE,
  cardShadow: "0px 1px 2px rgba(36, 36, 36,0.05)",
} as const

function Pill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "neutral" }) {
  const styles =
    tone === "green"
      ? { background: T.liveBg, color: T.live, border: `1px solid ${UI_BORDER}` }
      : { background: "#F4F4F4", color: T.textSecondary, border: `1px solid ${T.borderSoft}` }
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-full font-medium whitespace-nowrap"
      style={{ fontSize: 11, lineHeight: "14px", padding: "3px 9px", ...styles }}
    >
      {children}
    </span>
  )
}

function GreenCheck({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, background: T.liveBg }}
    >
      <Check style={{ width: size * 0.62, height: size * 0.62, color: T.live }} strokeWidth={3} />
    </span>
  )
}

function PanelShell({
  icon,
  title,
  pill,
  children,
}: {
  icon: React.ReactNode
  title: string
  pill: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col bg-white rounded-[6px] overflow-hidden"
      style={{ boxShadow: "0px 8px 30px rgba(36, 36, 36,0.10)" }}
    >
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: "16px 20px", borderBottom: `1px solid ${T.borderSoft}` }}
      >
        <span className="flex items-center" style={{ gap: 10 }}>
          <span
            className="flex items-center justify-center rounded-[8px] shrink-0"
            style={{ width: 30, height: 30, background: "#F4F4F4", border: `1px solid ${T.borderSoft}` }}
          >
            {icon}
          </span>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: T.textPrimary, letterSpacing: "-0.01em" }}>
            {title}
          </span>
        </span>
        {pill}
      </div>
      <div className="flex-1 flex flex-col justify-start" style={{ padding: "20px 22px", gap: 16 }}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ paddingBottom: last ? 0 : 12, borderBottom: last ? "none" : `1px solid ${T.borderSoft}` }}
    >
      <span className="flex items-center" style={{ gap: 10 }}>
        <GreenCheck size={16} />
        <span style={{ fontSize: 13, fontWeight: 500, color: T.textPrimary }}>{label}</span>
      </span>
      <span style={{ fontSize: 12.5, color: T.textSecondary, fontWeight: 500 }}>{value}</span>
    </div>
  )
}

/* Step 1 — Connect your POS */
function ConnectPanel() {
  return (
    <PanelShell
      icon={<Plug2 style={{ width: 16, height: 16, color: T.textPrimary }} strokeWidth={1.9} />}
      title="POS Integration"
      pill={
        <Pill tone="green">
          <Check style={{ width: 11, height: 11 }} strokeWidth={3} />
          Connected
        </Pill>
      }
    >
      <div
        className="flex items-center justify-between rounded-[9px]"
        style={{ padding: "11px 14px", background: "#FAFAFA", border: `1px solid ${T.borderSoft}` }}
      >
        <span className="flex items-center" style={{ gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/integrations/pos/icons/toast-circle.svg"
            alt="Toast"
            style={{ width: 28, height: 28, borderRadius: 999, border: `1px solid ${T.borderSoft}` }}
          />
          <span className="flex flex-col" style={{ gap: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>Toast POS</span>
            <span style={{ fontSize: 11, color: T.textMuted }}>Bella Cucina · San Francisco</span>
          </span>
        </span>
        <Pill tone="green">Live</Pill>
      </div>
      <Row label="Menu items" value="142 synced" />
      <Row label="Pricing" value="Real-time" />
      <Row label="Hours & holidays" value="Updated" last />
    </PanelShell>
  )
}

/* Step 2 — Customize for you */
function CustomizePanel() {
  const bars = [0.4, 0.8, 1, 0.55, 0.85, 0.5, 0.7, 0.95, 0.45]
  return (
    <PanelShell
      icon={<Settings2 style={{ width: 16, height: 16, color: T.textPrimary }} strokeWidth={1.9} />}
      title="Greeting & Voice"
      pill={<Pill tone="neutral">Saved</Pill>}
    >
      <div className="flex flex-col" style={{ gap: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Greeting
        </span>
        <div
          className="rounded-[9px]"
          style={{ padding: "12px 14px", background: "#FAFAFA", border: `1px solid ${T.borderSoft}`, fontSize: 13, lineHeight: "19px", color: T.textPrimary, fontWeight: 500 }}
        >
          “Thanks for calling Bella Cucina — this is Jenna. How can I help you tonight?”
        </div>
      </div>
      <div className="flex items-center justify-between" style={{ marginTop: 2 }}>
        <span className="flex items-center" style={{ gap: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 500, color: T.textSecondary }}>Voice</span>
          <Pill tone="neutral">Warm · Female</Pill>
        </span>
        <span className="flex items-end" style={{ gap: 2.5, height: 22 }}>
          {bars.map((h, i) => (
            <span key={i} style={{ width: 3, height: 22 * h, borderRadius: 3, background: T.live, opacity: 0.55 }} />
          ))}
        </span>
      </div>
    </PanelShell>
  )
}

/* Step 3 — Attach it to your phone */
function ForwardPanel() {
  return (
    <PanelShell
      icon={<Phone style={{ width: 15, height: 15, color: T.textPrimary }} strokeWidth={1.9} />}
      title="Call Forwarding"
      pill={
        <Pill tone="green">
          <span className="relative inline-flex" style={{ width: 6, height: 6 }}>
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: T.live, opacity: 0.5 }} />
            <span className="relative inline-flex rounded-full h-full w-full" style={{ background: T.live }} />
          </span>
          Live
        </Pill>
      }
    >
      <div
        className="flex items-center justify-between rounded-[9px]"
        style={{ padding: "14px", background: "#FAFAFA", border: `1px solid ${T.borderSoft}` }}
      >
        <span className="flex flex-col" style={{ gap: 2 }}>
          <span style={{ fontSize: 11, color: T.textMuted }}>Your restaurant line</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary, letterSpacing: "-0.01em" }}>(415) 555-0132</span>
        </span>
        {/* Toggle (on) — intentionally stays green */}
        <span
          className="relative inline-flex items-center shrink-0"
          style={{ width: 38, height: 22, borderRadius: 999, background: "#16A34A", padding: 2 }}
        >
          <span className="absolute rounded-full bg-white" style={{ width: 18, height: 18, right: 2, boxShadow: "0px 1px 2px rgba(0,0,0,0.2)" }} />
        </span>
      </div>
      <div className="flex items-center" style={{ gap: 10 }}>
        <JennaLogo shape="circle" size={30} />
        <span className="flex flex-col" style={{ gap: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>Forwarding to Jenna</span>
          <span style={{ fontSize: 11.5, color: T.textMuted }}>Answering every call, 24/7</span>
        </span>
      </div>
    </PanelShell>
  )
}

const PANELS = [ConnectPanel, CustomizePanel, ForwardPanel]

export default function HowItWorksVisual({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <div className="relative w-full h-full font-sans">
      {PANELS.map((Panel, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            activeStep === i ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.98] blur-[2px] pointer-events-none"
          }`}
        >
          <Panel />
        </div>
      ))}
    </div>
  )
}
