"use client"

import type React from "react"
import {
  ArrowUpDown,
  Bell,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleSlash,
  Clock,
  Link2,
  ListFilter,
  Phone,
  PhoneForwarded,
  Receipt,
  RefreshCw,
  Search,
  Shield,
  User,
  X,
  XCircle,
  Zap,
} from "lucide-react"

/* Light operator-theme tokens (mirrors meet-jenna `.operator-theme-light`) */
export const HD = {
  bg: "#F7F7F7",
  fg: "#101010",
  card: "#FFFFFF",
  muted: "#5F6470",
  secondary: "#EFEFEF",
  border: "#E6E6E6",
  accent: "#157A3A",
  accentFg: "#FFFFFF",
  chart1: "#006FA8",
  chart2: "#157A3A",
  chart3: "#A74B06",
  chart4: "#D31E3F",
  warning: "#A74B06",
  success: "#157A3A",
  destructive: "#D31E3F",
  cardShadow: "0px 1px 2px rgba(36,36,36,0.06)",
} as const

/** Everything the cursor can change. The tour in `hero-dashboard` is the only writer. */
export type StageState = {
  view: "calls" | "settings"
  /** The call that rings in during the tour: not yet in the list, live, then finished with an order. */
  live: "none" | "ongoing" | "done"
  sheetOpen: boolean
  /** How many transcript entries of the live call have been spoken. */
  lines: number
  tab: "profile" | "integrations"
  sync: "idle" | "syncing" | "done"
  /** `data-demo` id of the control under the cursor. */
  hot: string | null
}

export const initialStage: StageState = {
  view: "calls",
  live: "none",
  sheetOpen: false,
  lines: 0,
  tab: "profile",
  sync: "idle",
  hot: null,
}

export function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping"
        style={{ background: HD.success, opacity: 0.6 }}
      />
      <span className="relative inline-flex rounded-full h-full w-full" style={{ background: HD.success }} />
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

function Chip({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md font-medium whitespace-nowrap"
      style={{ fontSize: 11, lineHeight: "14px", padding: "3px 7px", color, background: bg }}
    >
      {children}
    </span>
  )
}

function OngoingChip() {
  return (
    <Chip color={HD.success} bg={`${HD.success}1A`}>
      <LiveDot size={6} />
      Ongoing
    </Chip>
  )
}

function DeliveryTag() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md font-semibold shrink-0"
      style={{ width: 20, height: 20, fontSize: 11, color: HD.warning, background: `${HD.warning}26` }}
    >
      D
    </span>
  )
}

type Outcome = "order" | "transfer" | "no_order"

function OutcomeChip({ outcome, delivery }: { outcome: Outcome; delivery?: boolean }) {
  if (outcome === "transfer") {
    return (
      <Chip color={HD.chart1} bg={`${HD.chart1}1A`}>
        <PhoneForwarded style={{ width: 11, height: 11 }} />
        Transferred
      </Chip>
    )
  }
  if (outcome === "no_order") {
    return (
      <Chip color={HD.muted} bg={HD.secondary}>
        <XCircle style={{ width: 11, height: 11 }} />
        No order
      </Chip>
    )
  }
  return (
    <span className="inline-flex items-center gap-1">
      <Chip color={HD.success} bg={`${HD.success}1A`}>
        <CheckCircle2 style={{ width: 11, height: 11 }} />
        Order placed
      </Chip>
      {delivery ? <DeliveryTag /> : null}
    </span>
  )
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className="relative inline-flex shrink-0 rounded-full transition-colors duration-300"
      style={{ width: 30, height: 17, background: on ? HD.success : HD.destructive }}
    >
      <span
        className="absolute rounded-full bg-white transition-transform duration-300"
        style={{ width: 13, height: 13, top: 2, left: 2, transform: on ? "translateX(13px)" : "translateX(0)" }}
      />
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Calls                                                               */
/* ------------------------------------------------------------------ */

type CallRow = {
  id: string
  name: string
  phone: string
  time: string
  order: string | null
  more?: number
  outcome: Outcome
  delivery?: boolean
  total: string | null
  duration: string
}

const LIVE_CALL = {
  name: "Maria G.",
  phone: "(415) 555-0132",
  time: "7:02 PM",
  order: "1× Classic Lobster Roll",
  more: 2,
  total: "$43.45",
  duration: "0:38",
}

const CALL_ROWS: CallRow[] = [
  {
    id: "daniel",
    name: "Daniel R.",
    phone: "(628) 555-0198",
    time: "6:54 PM",
    order: "2× Fish & Chips",
    more: 1,
    outcome: "order",
    delivery: true,
    total: "$36.20",
    duration: "2:05",
  },
  {
    id: "sofia",
    name: "Sofia L.",
    phone: "(415) 555-0177",
    time: "6:41 PM",
    order: "1× Clam Chowder · Bowl",
    more: 2,
    outcome: "order",
    total: "$28.40",
    duration: "1:18",
  },
  {
    id: "guest-1",
    name: "Guest",
    phone: "(510) 555-0143",
    time: "6:28 PM",
    order: null,
    outcome: "transfer",
    total: null,
    duration: "0:48",
  },
  {
    id: "james",
    name: "James Park",
    phone: "(628) 555-0110",
    time: "6:12 PM",
    order: "1× Lobster Roll Platter",
    more: 3,
    outcome: "order",
    total: "$52.10",
    duration: "1:52",
  },
  {
    id: "guest-2",
    name: "Guest",
    phone: "(415) 555-0199",
    time: "5:58 PM",
    order: null,
    outcome: "no_order",
    total: null,
    duration: "0:22",
  },
  {
    id: "elena",
    name: "Elena Vargas",
    phone: "(415) 555-0188",
    time: "5:40 PM",
    order: "1× Shrimp Po' Boy",
    more: 1,
    outcome: "order",
    delivery: true,
    total: "$31.75",
    duration: "1:36",
  },
  {
    id: "priya",
    name: "Priya Shah",
    phone: "(415) 555-0162",
    time: "5:21 PM",
    order: "1× Fish Tacos",
    more: 2,
    outcome: "order",
    total: "$27.90",
    duration: "1:09",
  },
]

const TABLE_COLS = "minmax(0,1.6fr) 70px minmax(0,1.4fr) 142px 62px 58px 16px"

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex items-center gap-1 uppercase"
      style={{ fontSize: 10.5, fontWeight: 600, color: HD.muted, letterSpacing: "0.06em" }}
    >
      {children}
    </span>
  )
}

function Row({
  name,
  phone,
  time,
  order,
  more,
  outcome,
  total,
  duration,
  hot,
  demo,
}: {
  name: string
  phone: string
  time: string
  order: string | null
  more?: number
  outcome: React.ReactNode
  total: string | null
  duration: string
  hot?: boolean
  demo?: string
}) {
  return (
    <div
      className="grid items-center transition-colors duration-200"
      style={{
        gridTemplateColumns: TABLE_COLS,
        columnGap: 12,
        padding: "11px 14px",
        borderBottom: `1px solid ${HD.border}`,
        background: hot ? `${HD.secondary}B3` : "transparent",
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0" data-demo={demo}>
        <span
          className="rounded-md flex items-center justify-center shrink-0 font-semibold"
          style={{ width: 28, height: 28, background: HD.secondary, color: HD.muted, fontSize: 11 }}
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate" style={{ fontSize: 12.5, fontWeight: 500, color: HD.fg }}>
            {name}
          </span>
          <span className="block truncate" style={{ fontSize: 11, color: HD.muted, fontVariantNumeric: "tabular-nums" }}>
            {phone}
          </span>
        </span>
      </div>
      <span style={{ fontSize: 12, color: HD.fg }}>{time}</span>
      <span className="truncate" style={{ fontSize: 12, color: order ? HD.fg : HD.muted }}>
        {order ?? "—"}
        {order && more ? <span style={{ color: HD.muted }}> +{more} more</span> : null}
      </span>
      <span>{outcome}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: HD.fg, fontVariantNumeric: "tabular-nums" }}>{total ?? "—"}</span>
      <span style={{ fontSize: 12, color: HD.muted, fontVariantNumeric: "tabular-nums" }}>{duration}</span>
      <ChevronRight style={{ width: 14, height: 14, color: HD.muted }} />
    </div>
  )
}

export function CallsPage({ s }: { s: StageState }) {
  const liveDone = s.live === "done"
  const count = CALL_ROWS.length + (s.live === "none" ? 0 : 1)

  return (
    <div className="w-full h-full flex flex-col" style={{ padding: "18px 22px", gap: 14, background: HD.bg }}>
      <div className="flex flex-col shrink-0" style={{ gap: 10 }}>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-md"
            style={{ width: 200, height: 30, padding: "0 10px", border: `1px solid ${HD.border}`, fontSize: 12, color: HD.muted }}
          >
            <Search style={{ width: 13, height: 13 }} />
            Search
          </div>
          {[ListFilter, Calendar].map((Icon, i) => (
            <span
              key={i}
              className="flex items-center justify-center rounded-md"
              style={{ width: 30, height: 30, border: `1px solid ${HD.border}`, background: HD.secondary, color: HD.muted }}
            >
              <Icon style={{ width: 14, height: 14 }} />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {["Answering calls", "Taking delivery"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center rounded-md"
              style={{ height: 30, gap: 9, padding: "0 11px", border: `1px solid ${HD.border}`, background: HD.secondary }}
            >
              <span style={{ fontSize: 11.5, fontWeight: 500, color: HD.fg }}>{label}</span>
              <Switch on />
            </span>
          ))}
          <span
            className="inline-flex items-center rounded-md"
            style={{
              height: 30,
              gap: 6,
              padding: "0 11px",
              border: `1px solid ${HD.border}`,
              background: HD.card,
              fontSize: 11.5,
              fontWeight: 500,
              color: HD.fg,
              boxShadow: HD.cardShadow,
            }}
          >
            <CircleSlash style={{ width: 13, height: 13 }} />
            86 items
          </span>
        </div>
      </div>

      <CardShell className="flex-1 min-h-0 flex flex-col">
        <div
          className="grid items-center shrink-0"
          style={{
            gridTemplateColumns: TABLE_COLS,
            columnGap: 12,
            padding: "10px 14px",
            borderBottom: `1px solid ${HD.border}`,
            background: `${HD.secondary}80`,
          }}
        >
          <HeaderCell>Customer</HeaderCell>
          <HeaderCell>
            Time
            <ArrowUpDown style={{ width: 10, height: 10 }} />
          </HeaderCell>
          <HeaderCell>Order</HeaderCell>
          <HeaderCell>Outcome</HeaderCell>
          <HeaderCell>Total</HeaderCell>
          <HeaderCell>Duration</HeaderCell>
          <span />
        </div>

        <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* The call that rings in: its row opens from zero height so the list slides down. */}
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: s.live === "none" ? "0fr" : "1fr" }}
          >
            <div className="overflow-hidden">
              <div
                className="transition-colors duration-700"
                style={{ background: s.live === "ongoing" ? `${HD.success}0D` : "transparent" }}
              >
                <Row
                  demo="row-live"
                  hot={s.hot === "row-live"}
                  name={LIVE_CALL.name}
                  phone={LIVE_CALL.phone}
                  time={LIVE_CALL.time}
                  order={liveDone ? LIVE_CALL.order : null}
                  more={LIVE_CALL.more}
                  outcome={liveDone ? <OutcomeChip outcome="order" /> : <OngoingChip />}
                  total={liveDone ? LIVE_CALL.total : null}
                  duration={liveDone ? LIVE_CALL.duration : "Live"}
                />
              </div>
            </div>
          </div>
          {CALL_ROWS.map((row) => (
            <Row
              key={row.id}
              name={row.name}
              phone={row.phone}
              time={row.time}
              order={row.order}
              more={row.more}
              outcome={<OutcomeChip outcome={row.outcome} delivery={row.delivery} />}
              total={row.total}
              duration={row.duration}
            />
          ))}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: 56, background: `linear-gradient(to top, ${HD.card}, ${HD.card}00)` }}
          />
        </div>

        <div
          className="shrink-0 flex items-center"
          style={{ padding: "9px 14px", borderTop: `1px solid ${HD.border}`, background: `${HD.secondary}4D` }}
        >
          <span style={{ fontSize: 11.5, color: HD.muted }}>
            Showing {count} of {count + 55} calls
          </span>
        </div>
      </CardShell>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Call detail sheet                                                   */
/* ------------------------------------------------------------------ */

type TranscriptEntry = { role: "agent" | "user"; text: string; t: string } | { role: "order" }

export const TRANSCRIPT: TranscriptEntry[] = [
  { role: "agent", text: "Thanks for calling Harbor House, this is Jenna. Pickup or delivery?", t: "0:01" },
  { role: "user", text: "Pickup — a lobster roll and a bowl of clam chowder.", t: "0:05" },
  { role: "agent", text: "Classic or spicy on the lobster roll?", t: "0:11" },
  { role: "user", text: "Classic. And a lemonade, please.", t: "0:15" },
  { role: "agent", text: "You're all set — $43.45, ready around 7:15. Name for the order?", t: "0:22" },
  { role: "order" },
  { role: "user", text: "Maria. Thank you!", t: "0:29" },
]

/** Spoken entries up to and including the order event. */
export const LINES_TO_ORDER = TRANSCRIPT.findIndex((entry) => entry.role === "order") + 1

const ORDER_ITEMS = ["1× Classic Lobster Roll", "1× Clam Chowder · Bowl", "1× Lemonade"]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="uppercase"
      style={{ fontSize: 10.5, fontWeight: 600, color: HD.muted, letterSpacing: "0.06em", marginBottom: 8 }}
    >
      {children}
    </div>
  )
}

function StatTile({ icon: Icon, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg" style={{ padding: "9px 12px", border: `1px solid ${HD.border}`, background: HD.card }}>
      <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: HD.muted, marginBottom: 3 }}>
        <Icon style={{ width: 12, height: 12 }} />
        {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: HD.fg }}>{children}</div>
    </div>
  )
}

export function CallSheet({ s }: { s: StageState }) {
  const placed = s.lines >= LINES_TO_ORDER
  const done = s.live === "done"

  return (
    <div className="absolute inset-0 z-40" style={{ pointerEvents: "none" }}>
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "rgba(16,16,16,0.32)", opacity: s.sheetOpen ? 1 : 0 }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 flex flex-col"
        style={{
          width: 420,
          background: HD.bg,
          borderLeft: `1px solid ${HD.border}`,
          boxShadow: "-12px 0 40px rgba(16,16,16,0.12)",
          transform: s.sheetOpen ? "translateX(0)" : "translateX(104%)",
          transition: "transform 460ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <span
          data-demo="sheet-close"
          className="absolute flex items-center justify-center rounded-md transition-colors duration-200"
          style={{
            top: 14,
            right: 14,
            width: 24,
            height: 24,
            color: HD.muted,
            background: s.hot === "sheet-close" ? HD.secondary : "transparent",
          }}
        >
          <X style={{ width: 15, height: 15 }} />
        </span>

        <div className="shrink-0" style={{ padding: "16px 48px 14px 18px", borderBottom: `1px solid ${HD.border}` }}>
          <div className="flex flex-wrap items-center gap-2">
            <span style={{ fontSize: 16, fontWeight: 600, color: HD.fg }}>{LIVE_CALL.name}</span>
            {done ? <OutcomeChip outcome="order" /> : <OngoingChip />}
          </div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: HD.muted, marginTop: 4 }}>
            <Phone style={{ width: 12, height: 12 }} />
            {LIVE_CALL.phone}
            <span>·</span>
            Today, {LIVE_CALL.time}
          </div>
        </div>

        <div data-demo="sheet-body" className="flex-1 min-h-0 overflow-hidden" style={{ padding: 18 }}>
          <div className="grid grid-cols-2 gap-2.5" style={{ marginBottom: 18 }}>
            <StatTile icon={Clock} label="Duration">
              {done ? LIVE_CALL.duration : "Live"}
            </StatTile>
            <StatTile icon={Receipt} label="Order total">
              {placed ? LIVE_CALL.total : "—"}
            </StatTile>
          </div>

          <div style={{ marginBottom: 18 }}>
            <SectionLabel>Order</SectionLabel>
            {placed ? (
              <div
                data-demo="sheet-order"
                className="rounded-lg overflow-hidden hd-item-in"
                style={{ border: `1px solid ${HD.border}`, background: HD.card }}
              >
                {ORDER_ITEMS.map((item) => (
                  <div key={item} style={{ padding: "8px 12px", borderBottom: `1px solid ${HD.border}`, fontSize: 12.5, color: HD.fg }}>
                    {item}
                  </div>
                ))}
                <div
                  className="flex items-center justify-between"
                  style={{ padding: "8px 12px", background: `${HD.secondary}66`, fontSize: 12.5, fontWeight: 600, color: HD.fg }}
                >
                  <span>Total</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{LIVE_CALL.total}</span>
                </div>
              </div>
            ) : (
              <div
                className="rounded-lg"
                style={{ padding: "10px 12px", border: `1px solid ${HD.border}`, background: `${HD.secondary}66`, fontSize: 12.5, color: HD.muted }}
              >
                No order placed on this call.
              </div>
            )}
          </div>

          <SectionLabel>Transcript</SectionLabel>
          <div data-demo="sheet-transcript" className="flex flex-col" style={{ gap: 10, paddingBottom: 8 }}>
            {TRANSCRIPT.slice(0, s.lines).map((entry, i) => {
              if (entry.role === "order") {
                return (
                  <div key={i} className="flex justify-center hd-item-in">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full"
                      style={{ padding: "4px 10px", fontSize: 11, fontWeight: 500, background: `${HD.success}1A`, color: HD.success }}
                    >
                      <CheckCircle2 style={{ width: 12, height: 12 }} />
                      Order placed
                    </span>
                  </div>
                )
              }
              const isAgent = entry.role === "agent"
              return (
                <div key={i} className={`flex gap-2 hd-item-in ${isAgent ? "flex-row" : "flex-row-reverse"}`}>
                  <span
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 24,
                      height: 24,
                      background: isAgent ? `${HD.accent}26` : HD.secondary,
                      color: isAgent ? HD.accent : HD.muted,
                    }}
                  >
                    {isAgent ? <Bot style={{ width: 12, height: 12 }} /> : <User style={{ width: 12, height: 12 }} />}
                  </span>
                  <div
                    className="rounded-lg"
                    style={{
                      maxWidth: "80%",
                      padding: "7px 10px",
                      background: isAgent ? HD.card : `${HD.accent}1A`,
                      fontSize: 12.5,
                      lineHeight: "17px",
                      color: HD.fg,
                    }}
                  >
                    <div
                      className={`flex items-baseline gap-2 ${isAgent ? "" : "flex-row-reverse"}`}
                      style={{ fontSize: 11, fontWeight: 500, color: HD.muted, marginBottom: 2 }}
                    >
                      <span>{isAgent ? "Jenna" : "Caller"}</span>
                      <span style={{ opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{entry.t}</span>
                    </div>
                    {entry.text}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Settings → Integrations                                             */
/* ------------------------------------------------------------------ */

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "security", label: "Security", icon: Shield },
] as const

const INTEGRATIONS = [
  { id: "stream", name: "Stream POS", description: "Push confirmed orders to the point of sale", lastSync: "3 mins ago" },
  { id: "retell", name: "Retell", description: "Telephony, speech, and call recordings", lastSync: "Real-time" },
  { id: "nmi", name: "NMI Payments", description: "Card processing for phone orders", lastSync: "1 hour ago" },
  { id: "send", name: "Send v5", description: "Discount codes and coupon redemption", lastSync: "12 mins ago" },
  { id: "slack", name: "Slack", description: "Flag and incident alerts to the team", lastSync: "Real-time" },
  { id: "twilio", name: "Twilio", description: "Phone number provisioning and routing", lastSync: "Real-time" },
]

function ProfileTab() {
  return (
    <CardShell className="hd-item-in" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: HD.fg }}>Personal Information</div>
      <div style={{ fontSize: 12, color: HD.muted, marginTop: 2 }}>Update your personal details and preferences</div>
      <div className="flex items-center gap-4" style={{ marginTop: 16 }}>
        <span
          className="rounded-full flex items-center justify-center font-semibold"
          style={{ width: 56, height: 56, fontSize: 20, background: HD.destructive, color: "#FFFFFF" }}
        >
          D
        </span>
        <span
          className="rounded-md"
          style={{ padding: "6px 10px", fontSize: 12, fontWeight: 500, color: HD.fg, border: `1px solid ${HD.border}` }}
        >
          Change Avatar
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3" style={{ marginTop: 16 }}>
        {[
          ["Full name", "Dana Whitaker"],
          ["Email", "dana@harborhouse.com"],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 12, fontWeight: 500, color: HD.fg, marginBottom: 6 }}>{label}</div>
            <div className="rounded-md" style={{ padding: "8px 10px", fontSize: 12.5, color: HD.fg, border: `1px solid ${HD.border}` }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  )
}

function IntegrationsTab({ s }: { s: StageState }) {
  return (
    <CardShell className="hd-item-in" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: HD.fg }}>Connected Services</div>
      <div style={{ fontSize: 12, color: HD.muted, marginTop: 2 }}>Manage your third-party integrations</div>
      <div className="grid grid-cols-2 gap-3" style={{ marginTop: 14 }}>
        {INTEGRATIONS.map((item) => {
          const isStream = item.id === "stream"
          const syncing = isStream && s.sync === "syncing"
          const fresh = isStream && s.sync === "done"
          return (
            <div
              key={item.id}
              className="rounded-lg transition-colors duration-500"
              style={{
                padding: "12px 14px",
                border: `1px solid ${fresh ? `${HD.accent}80` : HD.border}`,
                background: `${HD.secondary}80`,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="rounded-lg flex items-center justify-center shrink-0"
                    style={{ width: 34, height: 34, background: `${HD.success}33` }}
                  >
                    <Zap style={{ width: 16, height: 16, color: HD.success }} />
                  </span>
                  <div className="min-w-0">
                    <div style={{ fontSize: 13, fontWeight: 500, color: HD.fg }}>{item.name}</div>
                    <div className="truncate" style={{ fontSize: 11.5, color: HD.muted }}>
                      {item.description}
                    </div>
                  </div>
                </div>
                <span
                  className="rounded-md shrink-0"
                  style={{
                    padding: "2px 7px",
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: HD.success,
                    background: `${HD.success}33`,
                    border: `1px solid ${HD.success}4D`,
                  }}
                >
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: 10 }}>
                <span
                  className="transition-colors duration-500"
                  style={{ fontSize: 11, color: fresh ? HD.success : HD.muted, fontWeight: fresh ? 500 : 400 }}
                >
                  Last sync: {syncing ? "Syncing…" : fresh ? "Just now" : item.lastSync}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    data-demo={isStream ? "sync-stream" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-md transition-colors duration-200"
                    style={{
                      padding: "5px 8px",
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: HD.fg,
                      background: isStream && s.hot === "sync-stream" ? HD.secondary : "transparent",
                    }}
                  >
                    <RefreshCw
                      className={syncing ? "animate-spin" : undefined}
                      style={{ width: 12, height: 12 }}
                    />
                    Sync
                  </span>
                  <span style={{ padding: "5px 6px", fontSize: 11.5, fontWeight: 500, color: HD.destructive }}>Disconnect</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </CardShell>
  )
}

export function SettingsPage({ s }: { s: StageState }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ padding: "18px 22px", gap: 16, background: HD.bg }}>
      <div className="shrink-0">
        <div style={{ fontSize: 17, fontWeight: 600, color: HD.fg }}>Settings</div>
        <div style={{ fontSize: 12.5, color: HD.muted, marginTop: 3 }}>Manage your account preferences and integrations</div>
      </div>

      <div
        className="inline-flex self-start items-center rounded-lg shrink-0"
        style={{ padding: 3, gap: 2, background: HD.secondary, border: `1px solid ${HD.border}` }}
      >
        {SETTINGS_TABS.map(({ id, label, icon: Icon }) => {
          const active = s.tab === id
          const hot = s.hot === `tab-${id}`
          return (
            <span
              key={id}
              data-demo={`tab-${id}`}
              className="inline-flex items-center rounded-md transition-all duration-200"
              style={{
                gap: 6,
                padding: "5px 11px",
                fontSize: 12,
                fontWeight: 500,
                color: active || hot ? HD.fg : HD.muted,
                background: active ? HD.card : "transparent",
                boxShadow: active ? HD.cardShadow : "none",
              }}
            >
              <Icon style={{ width: 13, height: 13 }} />
              {label}
            </span>
          )
        })}
      </div>

      <div className="flex-1 min-h-0">{s.tab === "integrations" ? <IntegrationsTab s={s} /> : <ProfileTab />}</div>
    </div>
  )
}
