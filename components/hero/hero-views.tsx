"use client"

import type React from "react"
import {
  ArrowUpRight,
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Link2,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Receipt,
  Search,
  Trophy,
  User,
  Voicemail,
  type LucideIcon,
} from "lucide-react"

/* Light operator-theme tokens (mirrors meet-jenna `.operator-theme-light`) */
export const HD = {
  bg: "#F7F7F9",
  fg: "#2A2A30",
  card: "#FFFFFF",
  muted: "#737380",
  secondary: "#F1F1F4",
  border: "#E2E2E6",
  accent: "#2DB86A",
  accentFg: "#FFFFFF",
  chart1: "#3B9FD9",
  chart2: "#2DB86A",
  chart3: "#E5A23B",
  chart4: "#E05A3C",
  warning: "#E5A23B",
  success: "#2DB86A",
  destructive: "#D94A3D",
  cardShadow: "0px 1px 2px rgba(36, 36, 36, 0.04)",
} as const

export function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping"
        style={{ background: HD.accent, opacity: 0.55 }}
      />
      <span className="relative inline-flex rounded-full h-full w-full" style={{ background: HD.accent }} />
    </span>
  )
}

function CardShell({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: HD.card,
        border: `1px solid ${HD.border}`,
        boxShadow: HD.cardShadow,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Badge({
  children,
  color,
  bg,
}: {
  children: React.ReactNode
  color: string
  bg: string
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md font-medium whitespace-nowrap"
      style={{ fontSize: 11, lineHeight: "14px", padding: "3px 7px", color, background: bg }}
    >
      {children}
    </span>
  )
}

function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg"
      style={{
        padding: "7px 11px",
        background: HD.card,
        border: `1px solid ${HD.border}`,
        fontSize: 12,
      }}
    >
      <Calendar style={{ width: 13, height: 13, color: HD.muted }} />
      <span style={{ color: HD.muted }}>{label}</span>
      <span style={{ color: HD.fg, fontWeight: 500 }}>{value}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 0 — Overview (Answers every call)                              */
/* ------------------------------------------------------------------ */

const HOURLY = [
  { label: "11a", calls: 4, orders: 2 },
  { label: "12p", calls: 9, orders: 6 },
  { label: "1p", calls: 11, orders: 8 },
  { label: "2p", calls: 7, orders: 4 },
  { label: "3p", calls: 5, orders: 3 },
  { label: "4p", calls: 6, orders: 4 },
  { label: "5p", calls: 12, orders: 9 },
  { label: "6p", calls: 18, orders: 14 },
  { label: "7p", calls: 15, orders: 11 },
]

const OUTCOMES = [
  { label: "Order placed", count: 38, value: 61, color: HD.chart2 },
  { label: "Transferred", count: 9, value: 15, color: HD.chart1 },
  { label: "Agent hangup", count: 4, value: 6, color: HD.chart4 },
  { label: "Caller hangup", count: 11, value: 18, color: HD.chart3 },
]

const RECENT_CALLS = [
  {
    name: "Maria G.",
    phone: "(415) 555-0132",
    time: "Just now",
    amount: null as string | null,
    ongoing: true,
  },
  {
    name: "Daniel R.",
    phone: "(628) 555-0198",
    time: "6:54 PM",
    amount: "$41.83",
    ongoing: false,
    outcome: "order" as const,
  },
  {
    name: "Sofia L.",
    phone: "(415) 555-0177",
    time: "6:41 PM",
    amount: "$28.40",
    ongoing: false,
    outcome: "order" as const,
  },
]

const TOP_CUSTOMERS = [
  { name: "Elena Vargas", phone: "(415) 555-0188", calls: 47 },
  { name: "James Park", phone: "(628) 555-0110", calls: 39 },
  { name: "Priya Shah", phone: "(415) 555-0162", calls: 31 },
]

function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string
  value: string
  color: string
  icon: LucideIcon
}) {
  return (
    <CardShell style={{ padding: "14px 16px" }}>
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontSize: 12, color: HD.muted, lineHeight: "15px" }}>{label}</p>
          <p style={{ fontSize: 22, fontWeight: 600, color, marginTop: 4, letterSpacing: "-0.02em", lineHeight: "26px" }}>
            {value}
          </p>
        </div>
        <Icon style={{ width: 28, height: 28, color, opacity: 0.45 }} />
      </div>
    </CardShell>
  )
}

function MiniAreaChart() {
  const max = Math.max(...HOURLY.map((p) => Math.max(p.calls, p.orders)))
  const w = 420
  const h = 140
  const padX = 8
  const padY = 10
  const step = (w - padX * 2) / (HOURLY.length - 1)

  const toPath = (key: "calls" | "orders") => {
    const pts = HOURLY.map((p, i) => {
      const x = padX + i * step
      const y = padY + (1 - p[key] / max) * (h - padY * 2)
      return `${x},${y}`
    })
    const line = pts.map((p, i) => (i === 0 ? `M ${p}` : `L ${p}`)).join(" ")
    const area = `${line} L ${padX + (HOURLY.length - 1) * step},${h - padY} L ${padX},${h - padY} Z`
    return { line, area }
  }

  const calls = toPath("calls")
  const orders = toPath("orders")

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="hd-calls-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HD.chart1} stopOpacity={0.28} />
          <stop offset="100%" stopColor={HD.chart1} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="hd-orders-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HD.chart2} stopOpacity={0.32} />
          <stop offset="100%" stopColor={HD.chart2} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={w - padX}
          y1={padY + t * (h - padY * 2)}
          y2={padY + t * (h - padY * 2)}
          stroke={HD.border}
          strokeDasharray="3 3"
        />
      ))}
      <path d={calls.area} fill="url(#hd-calls-grad)" />
      <path d={orders.area} fill="url(#hd-orders-grad)" />
      <path d={calls.line} fill="none" stroke={HD.chart1} strokeWidth={2} />
      <path d={orders.line} fill="none" stroke={HD.chart2} strokeWidth={2} />
    </svg>
  )
}

export function OverviewView({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ padding: "16px 20px", gap: 12, background: HD.bg }}
      role="img"
      aria-label="Harbor House overview — calls answered, orders, and live activity"
    >
      <FilterChip label="Date range" value="Today" />

      <div className="grid grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Calls" value="62" color={HD.fg} icon={PhoneCall} />
        <StatCard label="Orders" value="41" color={HD.success} icon={CheckCircle2} />
        <StatCard label="Transferred" value="9" color={HD.chart1} icon={PhoneForwarded} />
        <StatCard label="Revenue" value="$1,842" color={HD.accent} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-3 gap-2.5 min-h-0 flex-1">
        <CardShell className="col-span-2 flex flex-col min-h-0" style={{ padding: "12px 14px" }}>
          <div className="flex items-center justify-between mb-2 shrink-0">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Calls vs Orders</div>
              <div style={{ fontSize: 11, color: HD.muted, marginTop: 1 }}>Hourly calls and orders placed</div>
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: 11, color: HD.muted }}>
              <span className="flex items-center gap-1.5">
                <span className="rounded-full" style={{ width: 8, height: 8, background: HD.chart1 }} />
                Calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="rounded-full" style={{ width: 8, height: 8, background: HD.chart2 }} />
                Orders
              </span>
            </div>
          </div>
          <div className={`flex-1 min-h-0 ${isActive ? "hd-item-in" : ""}`}>
            <MiniAreaChart />
          </div>
        </CardShell>

        <CardShell className="flex flex-col min-h-0" style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Call Outcomes</div>
          <div style={{ fontSize: 11, color: HD.muted, marginTop: 1, marginBottom: 10 }}>Distribution by outcome</div>
          <div className="flex flex-col gap-3 flex-1">
            {OUTCOMES.map((stage, i) => (
              <div key={stage.label} className={isActive ? "hd-item-in" : ""} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 11.5, fontWeight: 500, color: HD.fg }}>{stage.label}</span>
                  <span className="flex items-center gap-1.5">
                    <span style={{ fontSize: 11, color: HD.muted }}>{stage.count}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: HD.fg }}>{stage.value}%</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: HD.secondary }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: isActive ? `${stage.value}%` : "0%",
                      background: stage.color,
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-between pt-2.5 mt-auto shrink-0"
            style={{ borderTop: `1px solid ${HD.border}` }}
          >
            <span style={{ fontSize: 11.5, color: HD.muted }}>Total Calls</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: HD.fg }}>62</span>
          </div>
        </CardShell>
      </div>

      <div className="grid grid-cols-2 gap-2.5 shrink-0">
        <CardShell style={{ padding: "12px 14px" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Recent Calls</div>
              <div style={{ fontSize: 11, color: HD.muted, marginTop: 1 }}>Latest activity</div>
            </div>
            <span className="flex items-center gap-0.5" style={{ fontSize: 11.5, color: HD.accent, fontWeight: 500 }}>
              View all
              <ArrowUpRight style={{ width: 12, height: 12 }} />
            </span>
          </div>
          <div className="flex flex-col">
            {RECENT_CALLS.map((call, i) => (
              <div
                key={call.phone}
                className={`flex items-center gap-2 rounded-lg ${isActive ? "hd-item-in" : ""}`}
                style={{ padding: "6px 6px", animationDelay: `${i * 70}ms` }}
              >
                <span
                  className="rounded-lg flex items-center justify-center shrink-0 font-semibold"
                  style={{ width: 28, height: 28, background: HD.secondary, color: HD.muted, fontSize: 11 }}
                >
                  {call.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span style={{ fontSize: 12, fontWeight: 500, color: HD.fg }}>{call.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: HD.fg, fontVariantNumeric: "tabular-nums" }}>
                      {call.amount ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span style={{ fontSize: 10.5, color: HD.muted }}>
                      {call.phone} · {call.time}
                    </span>
                    {call.ongoing ? (
                      <Badge color={HD.accent} bg={`${HD.accent}18`}>
                        <LiveDot size={5} />
                        Ongoing
                      </Badge>
                    ) : (
                      <Badge color={HD.success} bg={`${HD.success}14`}>
                        <CheckCircle2 style={{ width: 10, height: 10 }} />
                        Order placed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardShell>

        <CardShell style={{ padding: "12px 14px" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Top Customers</div>
              <div style={{ fontSize: 11, color: HD.muted, marginTop: 1 }}>By lifetime calls</div>
            </div>
            <Trophy style={{ width: 15, height: 15, color: HD.warning }} />
          </div>
          <div className="flex flex-col">
            {TOP_CUSTOMERS.map((c, i) => (
              <div
                key={c.name}
                className={`flex items-center justify-between rounded-lg ${isActive ? "hd-item-in" : ""}`}
                style={{ padding: "6px 6px", animationDelay: `${200 + i * 80}ms` }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative shrink-0">
                    <span
                      className="rounded-full flex items-center justify-center font-semibold text-white"
                      style={{
                        width: 28,
                        height: 28,
                        fontSize: 10,
                        background: `linear-gradient(135deg, ${HD.accent}, ${HD.chart1})`,
                      }}
                    >
                      {c.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                    <span
                      className="absolute -top-1 -right-1 rounded-full flex items-center justify-center font-bold"
                      style={{ width: 14, height: 14, fontSize: 8, background: HD.warning, color: HD.fg }}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <div style={{ fontSize: 12, fontWeight: 500, color: HD.fg }}>{c.name}</div>
                    <div className="flex items-center gap-1" style={{ fontSize: 10.5, color: HD.muted }}>
                      <Phone style={{ width: 9, height: 9 }} />
                      {c.phone}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: HD.fg }}>{c.calls} calls</span>
              </div>
            ))}
          </div>
        </CardShell>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 1 — Calls + order detail (Takes the whole order)               */
/* ------------------------------------------------------------------ */

const CALL_ROWS = [
  {
    name: "Maria G.",
    phone: "(415) 555-0132",
    time: "Just now",
    duration: "1:24",
    amount: "$41.83",
    ongoing: true,
    selected: true,
  },
  {
    name: "Daniel R.",
    phone: "(628) 555-0198",
    time: "6:54 PM",
    duration: "2:05",
    amount: "$36.20",
    ongoing: false,
    outcome: "order" as const,
  },
  {
    name: "Sofia L.",
    phone: "(415) 555-0177",
    time: "6:41 PM",
    duration: "1:18",
    amount: "$28.40",
    ongoing: false,
    outcome: "order" as const,
  },
  {
    name: "Guest",
    phone: "(510) 555-0143",
    time: "6:28 PM",
    duration: "0:48",
    amount: "—",
    ongoing: false,
    outcome: "transfer" as const,
  },
  {
    name: "James Park",
    phone: "(628) 555-0110",
    time: "6:12 PM",
    duration: "1:52",
    amount: "$52.10",
    ongoing: false,
    outcome: "order" as const,
  },
  {
    name: "Guest",
    phone: "(415) 555-0199",
    time: "5:58 PM",
    duration: "0:22",
    amount: "—",
    ongoing: false,
    outcome: "voicemail" as const,
  },
]

const TRANSCRIPT: { role: "agent" | "user"; text: string; t: string }[] = [
  { role: "user", text: "Hi — can I get a lobster roll and clam chowder for pickup?", t: "0:08" },
  { role: "agent", text: "Absolutely. Would you like the classic or spicy lobster roll?", t: "0:14" },
  { role: "user", text: "Classic, please. And a lemonade.", t: "0:22" },
  { role: "agent", text: "Got it — pickup around 7:15?", t: "0:28" },
  { role: "user", text: "Yes, perfect.", t: "0:32" },
]

const ORDER_ITEMS = [
  { qty: "1×", name: "Classic Lobster Roll", price: "$24.00" },
  { qty: "1×", name: "Clam Chowder", note: "Cup", price: "$8.50" },
  { qty: "1×", name: "Lemonade", price: "$4.00" },
]

export function CallsView({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ padding: "18px 22px", gap: 12, background: HD.bg }}
      role="img"
      aria-label="Harbor House calls — Jenna taking a full pickup order"
    >
      <div className="flex items-center gap-2">
        <FilterChip label="Date range" value="Today" />
        <div
          className="inline-flex items-center gap-2 rounded-lg flex-1 max-w-[220px]"
          style={{ padding: "7px 11px", background: HD.card, border: `1px solid ${HD.border}`, fontSize: 12, color: HD.muted }}
        >
          <Search style={{ width: 13, height: 13 }} />
          Search calls
        </div>
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        {/* Call list */}
        <CardShell className="flex-[1.05] flex flex-col min-w-0">
          <div
            className="flex items-center justify-between shrink-0"
            style={{ padding: "12px 14px", borderBottom: `1px solid ${HD.border}` }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Calls</span>
            <span style={{ fontSize: 11.5, color: HD.muted }}>Showing 6 of 62</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {CALL_ROWS.map((row, i) => (
              <div
                key={row.phone + row.time}
                className={`flex items-center gap-2.5 ${isActive ? "hd-item-in" : ""}`}
                style={{
                  padding: "10px 14px",
                  borderBottom: i < CALL_ROWS.length - 1 ? `1px solid ${HD.border}` : "none",
                  background: row.selected ? `${HD.accent}0D` : "transparent",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <span
                  className="rounded-lg flex items-center justify-center shrink-0 font-semibold"
                  style={{ width: 30, height: 30, background: HD.secondary, color: HD.muted, fontSize: 11 }}
                >
                  {row.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: HD.fg }}>{row.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: HD.fg }}>{row.amount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span style={{ fontSize: 11, color: HD.muted }}>
                      {row.phone} · {row.duration}
                    </span>
                    {row.ongoing ? (
                      <Badge color={HD.accent} bg={`${HD.accent}18`}>
                        <LiveDot size={5} />
                        Ongoing
                      </Badge>
                    ) : row.outcome === "order" ? (
                      <Badge color={HD.success} bg={`${HD.success}14`}>
                        <CheckCircle2 style={{ width: 10, height: 10 }} />
                        Order placed
                      </Badge>
                    ) : row.outcome === "transfer" ? (
                      <Badge color={HD.chart1} bg={`${HD.chart1}14`}>
                        <Clock style={{ width: 10, height: 10 }} />
                        Transferred
                      </Badge>
                    ) : (
                      <Badge color={HD.muted} bg={HD.secondary}>
                        <Voicemail style={{ width: 10, height: 10 }} />
                        Voicemail
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: HD.muted, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </CardShell>

        {/* Call detail panel */}
        <CardShell className="flex-1 flex flex-col min-w-0">
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${HD.border}` }}>
            <div className="flex flex-wrap items-center gap-2">
              <span style={{ fontSize: 15, fontWeight: 600, color: HD.fg }}>Maria G.</span>
              <Badge color={HD.accent} bg={`${HD.accent}18`}>
                <LiveDot size={5} />
                Ongoing
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-1" style={{ fontSize: 12, color: HD.muted }}>
              <Phone style={{ width: 12, height: 12 }} />
              (415) 555-0132
              <span>·</span>
              Just now
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2" style={{ padding: "12px 16px" }}>
            <div className="rounded-lg" style={{ padding: "10px 12px", border: `1px solid ${HD.border}`, background: HD.card }}>
              <div className="flex items-center gap-1.5 mb-1" style={{ fontSize: 11, color: HD.muted }}>
                <Clock style={{ width: 12, height: 12 }} />
                Duration
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>Live · 1:24</div>
            </div>
            <div className="rounded-lg" style={{ padding: "10px 12px", border: `1px solid ${HD.border}`, background: HD.card }}>
              <div className="flex items-center gap-1.5 mb-1" style={{ fontSize: 11, color: HD.muted }}>
                <Receipt style={{ width: 12, height: 12 }} />
                Order total
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>$41.83</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0" style={{ padding: "0 16px 14px", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: HD.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Transcript
            </div>
            <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
              {TRANSCRIPT.map((msg, i) => {
                const isAgent = msg.role === "agent"
                return (
                  <div
                    key={i}
                    className={`flex gap-2 ${isAgent ? "flex-row" : "flex-row-reverse"} ${isActive ? "hd-item-in" : ""}`}
                    style={{ animationDelay: `${150 + i * 90}ms` }}
                  >
                    <span
                      className="rounded-full flex items-center justify-center shrink-0"
                      style={{
                        width: 24,
                        height: 24,
                        background: isAgent ? `${HD.accent}22` : HD.secondary,
                        color: isAgent ? HD.accent : HD.muted,
                      }}
                    >
                      {isAgent ? <Bot style={{ width: 12, height: 12 }} /> : <User style={{ width: 12, height: 12 }} />}
                    </span>
                    <div
                      className="rounded-lg max-w-[82%]"
                      style={{
                        padding: "8px 10px",
                        background: isAgent ? HD.card : `${HD.accent}12`,
                        border: `1px solid ${isAgent ? HD.border : "transparent"}`,
                        fontSize: 12,
                        color: HD.fg,
                        lineHeight: "16px",
                      }}
                    >
                      <div
                        className={`flex items-baseline gap-2 mb-0.5 ${isAgent ? "" : "flex-row-reverse"}`}
                        style={{ fontSize: 10.5, fontWeight: 500, color: HD.muted }}
                      >
                        <span>{isAgent ? "Jenna" : "Caller"}</span>
                        <span style={{ opacity: 0.7, fontVariantNumeric: "tabular-nums" }}>{msg.t}</span>
                      </div>
                      {msg.text}
                    </div>
                  </div>
                )
              })}
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full ${isActive ? "hd-item-in" : ""}`}
                  style={{
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 500,
                    background: `${HD.success}14`,
                    color: HD.success,
                    animationDelay: "700ms",
                  }}
                >
                  <CheckCircle2 style={{ width: 12, height: 12 }} />
                  Building order…
                </span>
              </div>
            </div>

            <div className="rounded-lg" style={{ padding: "10px 12px", border: `1px solid ${HD.border}`, background: HD.secondary }}>
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center justify-between" style={{ padding: "3px 0" }}>
                  <span style={{ fontSize: 12, color: HD.fg }}>
                    <span style={{ color: HD.muted, marginRight: 6 }}>{item.qty}</span>
                    {item.name}
                    {item.note ? <span style={{ color: HD.muted }}> · {item.note}</span> : null}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: HD.fg }}>{item.price}</span>
                </div>
              ))}
              <div
                className="flex items-center justify-between mt-1.5 pt-1.5"
                style={{ borderTop: `1px solid ${HD.border}`, fontSize: 12.5, fontWeight: 600, color: HD.fg }}
              >
                <span>Total</span>
                <span>$41.83</span>
              </div>
            </div>
          </div>
        </CardShell>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* View 2 — Settings / integrations (Syncs to your POS)                */
/* ------------------------------------------------------------------ */

const INTEGRATIONS = [
  {
    id: "stream",
    name: "Stream POS",
    description: "Push confirmed orders to the point of sale",
    lastSync: "Just now",
    highlight: true,
  },
  {
    id: "retell",
    name: "Retell",
    description: "Telephony, speech, and call recordings",
    lastSync: "Real-time",
  },
  {
    id: "nmi",
    name: "NMI Payments",
    description: "Card processing for phone orders",
    lastSync: "3 mins ago",
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Phone number provisioning and routing",
    lastSync: "Real-time",
  },
]

const SYNC_STEPS = [
  { label: "Call completed", detail: "Order confirmed with Maria G.", time: "7:02 PM" },
  { label: "Order created in Stream POS", detail: "Items, modifiers & pickup time", time: "7:02 PM" },
  { label: "Sent to kitchen", detail: "Ticket #1042 · Harbor House", time: "7:02 PM" },
  { label: "Confirmation text sent", detail: "“Ready at 7:15 PM”", time: "7:03 PM" },
]

export function IntegrationsView({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ padding: "18px 22px", gap: 14, background: HD.bg }}
      role="img"
      aria-label="Harbor House settings — order synced to Stream POS"
    >
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: HD.fg }}>Settings</div>
        <div style={{ fontSize: 12, color: HD.muted, marginTop: 2 }}>Manage your account preferences and integrations</div>
      </div>

      <div className="flex items-center gap-1" style={{ borderBottom: `1px solid ${HD.border}` }}>
        {["Profile", "Integrations", "Notifications"].map((tab) => (
          <span
            key={tab}
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              padding: "8px 12px",
              color: tab === "Integrations" ? HD.fg : HD.muted,
              borderBottom: tab === "Integrations" ? `2px solid ${HD.accent}` : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          <div style={{ fontSize: 12.5, fontWeight: 600, color: HD.fg }}>Integrations</div>
          <div style={{ fontSize: 11.5, color: HD.muted, marginBottom: 2 }}>Manage your third-party integrations</div>
          {INTEGRATIONS.map((item, i) => (
            <CardShell
              key={item.id}
              className={isActive ? "hd-item-in" : ""}
              style={{
                padding: "12px 14px",
                animationDelay: `${i * 70}ms`,
                borderColor: item.highlight ? `${HD.accent}55` : HD.border,
                boxShadow: item.highlight ? `0 0 0 1px ${HD.accent}22` : HD.cardShadow,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: item.highlight ? `${HD.accent}18` : HD.secondary,
                    color: item.highlight ? HD.accent : HD.muted,
                  }}
                >
                  <Link2 style={{ width: 16, height: 16 }} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>{item.name}</span>
                    <Badge color={HD.success} bg={`${HD.success}14`}>
                      <Check style={{ width: 10, height: 10 }} strokeWidth={3} />
                      Connected
                    </Badge>
                  </div>
                  <div style={{ fontSize: 11.5, color: HD.muted, marginTop: 2 }}>{item.description}</div>
                  <div style={{ fontSize: 11, color: HD.muted, marginTop: 4 }}>Last sync: {item.lastSync}</div>
                </div>
              </div>
            </CardShell>
          ))}
        </div>

        <CardShell className="flex-[1.05] flex flex-col" style={{ padding: "16px 18px" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: HD.fg }}>Order #1042</div>
              <div style={{ fontSize: 11.5, color: HD.muted, marginTop: 2 }}>Synced to Stream POS</div>
            </div>
            <Badge color={HD.success} bg={`${HD.success}14`}>
              <CheckCircle2 style={{ width: 11, height: 11 }} />
              Synced
            </Badge>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {SYNC_STEPS.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-start gap-3 relative ${isActive ? "hd-item-in" : ""}`}
                style={{ animationDelay: `${200 + i * 140}ms`, paddingBottom: i < SYNC_STEPS.length - 1 ? 28 : 0 }}
              >
                {i < SYNC_STEPS.length - 1 && (
                  <span
                    className="absolute"
                    style={{ left: 11, top: 24, bottom: 2, width: 1, background: HD.border }}
                  />
                )}
                <span
                  className="relative shrink-0 flex items-center justify-center rounded-full"
                  style={{ width: 22, height: 22, background: `${HD.success}18` }}
                >
                  <Check style={{ width: 12, height: 12, color: HD.success }} strokeWidth={3} />
                </span>
                <div className="flex-1 flex items-start justify-between gap-2">
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: HD.fg, lineHeight: "16px" }}>{step.label}</div>
                    <div style={{ fontSize: 11.5, color: HD.muted, lineHeight: "14px", marginTop: 1 }}>{step.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, color: HD.muted, fontWeight: 500, whiteSpace: "nowrap" }}>{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 flex items-center justify-between rounded-lg"
            style={{ padding: "10px 12px", background: HD.secondary, border: `1px solid ${HD.border}` }}
          >
            <span style={{ fontSize: 12, color: HD.muted, fontWeight: 500 }}>Works with your POS</span>
            <div className="flex items-center gap-1.5">
              {["toast", "square", "clover", "shift4"].map((id) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={id}
                  src={`/integrations/pos/icons/${id}-circle.svg`}
                  alt=""
                  className="rounded-full"
                  style={{ width: 22, height: 22, border: `1px solid ${HD.border}` }}
                />
              ))}
            </div>
          </div>
        </CardShell>
      </div>
    </div>
  )
}
