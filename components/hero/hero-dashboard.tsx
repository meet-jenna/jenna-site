"use client"

import { useEffect, useRef, useState } from "react"
import {
  Bell,
  ChevronLeft,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Moon,
  PhoneCall,
  Settings,
  UtensilsCrossed,
} from "lucide-react"
import { CallSheet, CallsPage, HD, initialStage, LINES_TO_ORDER, SettingsPage, TRANSCRIPT, type StageState } from "./hero-views"
import { DemoPointer, easeScroll, isAbort, offsetIn, sleep, type DemoCursor } from "./demo-cursor"
import { JennaLogo } from "../jenna-logo"

/** Laid out at this width, then scaled to the hero card; the height follows the card. */
const CANVAS_W = 960
const SIDEBAR_W = 200
const TOPBAR_H = 52

/** Every chapter of the tour lasts exactly this long, so the feature cards' progress bars can follow it. */
export const CHAPTER_MS = 7500
export const CHAPTER_COUNT = 3

const NAV_ITEMS = [
  { label: "Calls", icon: PhoneCall, view: "calls" },
  { label: "Overview", icon: LayoutDashboard },
  { label: "Menu", icon: UtensilsCrossed },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings, view: "settings" },
  { label: "Help", icon: HelpCircle },
] as const

const REST: DemoCursor = { x: 640, y: 380, down: false, show: false }

/** The state a chapter opens on, used when a feature card jumps straight to it. */
function opening(chapter: number): StageState {
  if (chapter === 1) return { ...initialStage, live: "ongoing", sheetOpen: true, lines: 2 }
  if (chapter === 2) return { ...initialStage, live: "done", lines: TRANSCRIPT.length }
  return initialStage
}

/** Where a chapter ends; with reduced motion the stage shows only these. */
function closing(chapter: number): StageState {
  if (chapter === 2) return { ...opening(2), view: "settings", tab: "integrations", sync: "done" }
  return opening(chapter + 1)
}

function Sidebar({ s }: { s: StageState }) {
  return (
    <div
      className="h-full flex flex-col shrink-0"
      style={{ width: SIDEBAR_W, background: HD.card, borderRight: `1px solid ${HD.border}` }}
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
            const view = "view" in item ? item.view : null
            const isActive = view === s.view
            const hot = view !== null && s.hot === `nav-${view}`
            const Icon = item.icon
            return (
              <div
                key={item.label}
                data-demo={view ? `nav-${view}` : undefined}
                className="relative flex items-center rounded-lg transition-colors duration-300"
                style={{
                  gap: 10,
                  padding: "8px 10px",
                  background: isActive ? HD.secondary : hot ? `${HD.secondary}99` : "transparent",
                  color: isActive || hot ? HD.fg : HD.muted,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-opacity duration-300"
                  style={{ width: 3, height: 18, background: HD.accent, opacity: isActive ? 1 : 0 }}
                />
                <Icon
                  style={{ width: 16, height: 16, color: isActive ? HD.accent : "currentColor" }}
                  strokeWidth={isActive ? 2.1 : 1.85}
                />
                <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: "15px" }}>{item.label}</span>
              </div>
            )
          })}
        </div>
      </nav>

      <div className="shrink-0" style={{ padding: 10, borderTop: `1px solid ${HD.border}` }}>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ gap: 6, padding: "7px 10px", fontSize: 12.5, color: HD.muted }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
          Collapse
        </div>
      </div>
    </div>
  )
}

function Topbar({ s }: { s: StageState }) {
  return (
    <div
      className="w-full flex items-center justify-between shrink-0"
      style={{
        height: TOPBAR_H,
        borderBottom: `1px solid ${HD.border}`,
        padding: "0 18px",
        background: "rgba(247,247,247,0.88)",
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600, color: HD.fg, letterSpacing: "-0.01em" }}>
        {s.view === "settings" ? "Settings" : "Calls"}
      </span>
      <div className="flex items-center" style={{ gap: 6 }}>
        <span className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, color: HD.muted }}>
          <Moon style={{ width: 15, height: 15 }} strokeWidth={1.9} />
        </span>
        <span className="relative flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, color: HD.muted }}>
          <Bell style={{ width: 15, height: 15 }} strokeWidth={1.9} />
          <span
            className="absolute rounded-full animate-pulse"
            style={{ width: 6, height: 6, background: HD.accent, top: 6, right: 6 }}
          />
        </span>
        <span
          className="rounded-lg flex items-center justify-center font-semibold"
          style={{ width: 30, height: 30, fontSize: 11, background: HD.destructive, color: "#FFFFFF" }}
        >
          D
        </span>
        <span className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, color: HD.muted }}>
          <LogOut style={{ width: 15, height: 15 }} strokeWidth={1.9} />
        </span>
      </div>
    </div>
  )
}

/**
 * HeroDashboard — the Harbor House operator portal, frozen, with a cursor that works it:
 * a call rings in and gets opened, Jenna takes the order, then the order syncs to the POS.
 * Each chapter matches a feature card under the hero.
 */
export default function HeroDashboard({
  chapter,
  jumpKey,
  onChapter,
}: {
  /** Chapter to start from whenever `jumpKey` changes. */
  chapter: number
  jumpKey: number
  onChapter?: (chapter: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ scale: number; height: number } | null>(null)
  const [stage, setStage] = useState<StageState>(initialStage)
  const stageRef = useRef(stage)
  const [cursor, setCursor] = useState<DemoCursor>(REST)
  const [visible, setVisible] = useState(false)
  const [reduce, setReduce] = useState(false)
  const onChapterRef = useRef(onChapter)
  onChapterRef.current = onChapter
  const chapterRef = useRef(chapter)
  const jumpRef = useRef(jumpKey)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Layout size, not the screen box: the hero card scales in on reveal.
    const update = () => {
      const width = el.offsetWidth
      const height = el.offsetHeight
      if (width > 0 && height > 0) {
        const scale = width / CANVAS_W
        setBox({ scale, height: height / scale })
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const frame = canvasRef.current
    if (!visible || !frame) return
    const controller = new AbortController()
    const { signal } = controller

    // A jump starts where the card asked; coming back on screen resumes the chapter that was playing.
    let current = chapterRef.current
    if (jumpRef.current !== jumpKey) {
      jumpRef.current = jumpKey
      current = chapter
    }

    const set = (patch: Partial<StageState>) => {
      stageRef.current = { ...stageRef.current, ...patch }
      setStage(stageRef.current)
    }

    const find = (id: string) => frame.querySelector<HTMLElement>(`[data-demo="${id}"]`)

    /** Move onto a control, the arrow's tip a little inside its left edge. */
    const glide = async (id: string) => {
      const el = find(id)
      if (!el) return false
      const target = offsetIn(frame, el)
      set({ hot: null })
      setCursor({
        x: target.x + Math.min(26, target.width * 0.45) - 5,
        y: target.y + target.height / 2 - 4,
        down: false,
        show: true,
      })
      await sleep(520, signal)
      set({ hot: id })
      await sleep(120, signal)
      return true
    }

    /** Acts out a press; the stage changes its own state at the moment the button goes down. */
    const press = async (atDown: () => void) => {
      setCursor((c) => ({ ...c, down: true }))
      atDown()
      await sleep(140, signal)
      setCursor((c) => ({ ...c, down: false }))
      await sleep(180, signal)
    }

    const tap = async (id: string, atDown: () => void) => {
      if (await glide(id)) await press(atDown)
      else atDown()
    }

    const scrollSheet = async (edge: "top" | "bottom") => {
      await sleep(40, signal)
      const body = find("sheet-body")
      if (!body) return
      await easeScroll(body, edge === "top" ? 0 : body.scrollHeight - body.clientHeight, signal, 520)
    }

    const chapters: (() => Promise<void>)[] = [
      // Answers every call: a call rings in and the cursor opens it.
      async () => {
        const s = stageRef.current
        if (s.view !== "calls") await tap("nav-calls", () => set({ ...initialStage }))
        else if (s.sheetOpen || s.live !== "none") set({ ...initialStage })
        setCursor((c) => ({ ...c, show: true }))
        await sleep(700, signal)
        set({ live: "ongoing" })
        await sleep(1100, signal)
        await tap("row-live", () => set({ sheetOpen: true, hot: null }))
        await sleep(300, signal)
        set({ lines: 1 })
        await glide("sheet-transcript")
        await sleep(1300, signal)
        set({ lines: 2 })
      },
      // Takes the whole order: the transcript runs to the order, then the cursor closes the call.
      async () => {
        for (let lines = 3; lines <= LINES_TO_ORDER; lines++) {
          await sleep(750, signal)
          set({ lines })
          await scrollSheet("bottom")
        }
        await sleep(400, signal)
        await scrollSheet("top")
        await glide("sheet-order")
        await sleep(600, signal)
        set({ live: "done", lines: TRANSCRIPT.length })
        await sleep(500, signal)
        await tap("sheet-close", () => set({ sheetOpen: false, hot: null }))
      },
      // Syncs to your POS: Settings → Integrations → Sync on Stream POS.
      async () => {
        await tap("nav-settings", () => set({ view: "settings", tab: "profile", sync: "idle" }))
        await sleep(650, signal)
        await tap("tab-integrations", () => set({ tab: "integrations" }))
        await sleep(700, signal)
        await tap("sync-stream", () => set({ sync: "syncing" }))
        await sleep(1200, signal)
        set({ sync: "done" })
      },
    ]

    const run = async () => {
      if (reduce) {
        setCursor((c) => ({ ...c, show: false }))
        set({ ...opening(current) })
      } else if (current !== 0) {
        set({ ...opening(current) })
      }
      while (!signal.aborted) {
        const started = performance.now()
        chapterRef.current = current
        onChapterRef.current?.(current)
        if (reduce) set({ ...closing(current) })
        else await chapters[current]()
        await sleep(Math.max(0, CHAPTER_MS - (performance.now() - started)), signal)
        current = (current + 1) % CHAPTER_COUNT
        if (reduce) set({ ...opening(current) })
      }
    }

    run().catch((error: unknown) => {
      if (!isAbort(error)) throw error
    })
    return () => {
      controller.abort()
      set({ hot: null })
    }
  }, [visible, jumpKey, chapter, reduce])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: HD.bg }}>
      <style>{`
        @keyframes hd-fade-up {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hd-item-in {
          animation: hd-fade-up 0.45s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hd-item-in { animation: none; }
        }
      `}</style>

      <div
        ref={canvasRef}
        aria-hidden
        className="absolute flex font-sans text-left select-none pointer-events-none overflow-hidden"
        style={{
          width: CANVAS_W,
          height: box?.height ?? 640,
          left: 0,
          top: 0,
          transform: `scale(${box?.scale ?? 1})`,
          transformOrigin: "top left",
          opacity: box === null ? 0 : 1,
          background: HD.bg,
          color: HD.fg,
        }}
      >
        <Sidebar s={stage} />
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <Topbar s={stage} />
          <div className="flex-1 relative min-w-0 min-h-0 overflow-hidden">
            {(["calls", "settings"] as const).map((view) => (
              <div
                key={view}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  stage.view === view ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.98] blur-sm"
                }`}
              >
                {view === "calls" ? <CallsPage s={stage} /> : <SettingsPage s={stage} />}
              </div>
            ))}
          </div>
        </div>
        <CallSheet s={stage} />
        <DemoPointer cursor={cursor} />
      </div>

      <span className="sr-only">
        Harbor House demo dashboard: a call comes in, Jenna takes the order, and the order syncs to the POS.
      </span>
    </div>
  )
}
