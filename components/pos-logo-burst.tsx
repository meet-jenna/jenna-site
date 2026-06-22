"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Clean "profile" POS icons — the burst spits a few of these out. The source
 * art is a circular brand badge; `bg` matches the badge fill so the icon reads
 * as a rounded square (the brand color fills the corners behind the circle).
 */
const BURST_LOGOS = [
  { id: "toast", src: "/integrations/pos/icons/toast-circle.svg", name: "Toast", bg: "#FF4C00", zoom: 1.35 },
  { id: "square", src: "/integrations/pos/icons/square-circle.svg", name: "Square", bg: "#000000", zoom: 1 },
  { id: "clover", src: "/integrations/pos/icons/clover-circle.svg", name: "Clover", bg: "#FFFFFF", zoom: 1.35 },
  { id: "flipdish", src: "/integrations/pos/icons/flipdish-circle.svg", name: "FlipDish", bg: "#FFFFFF", zoom: 1.35 },
] as const

interface ThrownLogo {
  id: string
  src: string
  name: string
  bg: string
  zoom: number
  size: number
  /** Landing offset from top-center of the dashboard, in px. */
  landX: number
  landY: number
  landRot: number
  /** Horizontal launch offset — kept clear of the CTA so the path never crosses it. */
  startX: number
  /** Min |landX| that keeps this logo (incl. drift) clear of the centered CTA. */
  innerX: number
  throwDelay: number
  throwDur: number
  floatDur: number
  /** Negative phase offset so each float starts mid-cycle, never in lockstep. */
  floatDelay: number
  floatX: number
  floatY: number
  floatRot: number
  /** One logo gets a slow continuous turn instead of just a gentle twist. */
  spin: boolean
  spinDur: number
  spinDir: 1 | -1
  /** Two logos get a subtle, bounded "crawl" wander. */
  crawl: boolean
  crawlX: number
  crawlY: number
  crawlDur: number
  crawlDelay: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** The dashboard waits ~1s to reveal — let it settle before it "spits" logos. */
const BASE_DELAY = 0.95

/** Extra breathing room kept between any logo and the CTA button, in px. */
const CTA_GAP = 8

/** Smallest gap between any two logos' guard circles (negative => overlap). */
function minPairSlack(items: ThrownLogo[]): number {
  let slack = Infinity
  for (let a = 0; a < items.length; a++) {
    for (let b = a + 1; b < items.length; b++) {
      const d = Math.hypot(items[b].landX - items[a].landX, items[b].landY - items[a].landY)
      slack = Math.min(slack, d - (guardRadius(items[a]) + guardRadius(items[b])))
    }
  }
  return slack
}

/**
 * Generate a layout. On the tightest viewports the CTA-clearance band can be
 * narrow enough that one random draw won't separate cleanly, so we re-roll a
 * few times and keep the best — guaranteeing (in practice) zero overlap.
 */
function buildThrows(width: number, buttonHalf: number): ThrownLogo[] {
  let best = buildAttempt(width, buttonHalf)
  for (let tries = 0; tries < 16 && minPairSlack(best) < 0; tries++) {
    const next = buildAttempt(width, buttonHalf)
    if (minPairSlack(next) > minPairSlack(best)) best = next
  }
  return best
}

function buildAttempt(width: number, buttonHalf: number): ThrownLogo[] {
  // Scale distances/sizes down on narrow screens so logos stay above the card.
  const k = Math.min(1, Math.max(0.5, width / 760))
  // Shuffle which logo goes to which zone so the layout differs each load.
  const logos = [...BURST_LOGOS].sort(() => Math.random() - 0.5)

  // Spread the four logos across the sides, leaving the center band clear so
  // nothing flies out behind the centered "Book a Demo" button. The two zones
  // on each side keep a gap so same-side logos start well apart.
  const zones = [
    [-0.46, -0.34],
    [-0.28, -0.16],
    [0.16, 0.28],
    [0.34, 0.46],
  ]

  // One random logo gets the slow continuous turn; two get the subtle crawl.
  const order = [...logos.keys()].sort(() => Math.random() - 0.5)
  const spinIndex = order[0]
  const crawlSet = new Set(order.slice(1, 3))

  // Every tile is the same size — only the in-SVG zoom differs per brand.
  // On roomy desktop widths the badges read as oversized, so taper them down a
  // touch past the tablet breakpoint while leaving narrow screens untouched.
  const desktopScale = 1 - 0.28 * Math.min(1, Math.max(0, (width - 1024) / 416))
  const TILE = 50 * k * desktopScale

  // Each logo floats on its own non-overlapping period band so the bobs never
  // line up; assigned by shuffled order so it's not tied to brand.
  const floatBands = [
    [3.0, 3.8],
    [4.2, 5.0],
    [5.4, 6.2],
    [6.6, 7.4],
  ]

  const items = logos.map((logo, i) => {
    const [zMin, zMax] = zones[i % zones.length]
    const spin = i === spinIndex
    const crawlDur = rand(10, 16)
    const [fMin, fMax] = floatBands[order.indexOf(i) % floatBands.length]
    const floatDur = rand(fMin, fMax)
    return {
      ...logo,
      size: TILE,
      landX: rand(zMin, zMax) * width,
      landY: -rand(55, 175) * k,
      landRot: rand(-16, 16),
      startX: 0,
      innerX: 0,
      throwDelay: BASE_DELAY + rand(0, 1.4),
      throwDur: rand(0.72, 1.25),
      // Distinct period band + random negative start phase => never in lockstep.
      floatDur,
      floatDelay: -rand(0, floatDur),
      floatX: rand(-4, 4) * k,
      floatY: rand(4, 7) * k,
      // The spinner keeps its twist at 0 so the slow turn reads cleanly.
      floatRot: spin ? 0 : rand(3, 8) * (Math.random() > 0.5 ? 1 : -1),
      spin,
      spinDur: rand(55, 75),
      spinDir: Math.random() > 0.5 ? 1 : -1,
      crawl: crawlSet.has(i),
      // Tiny amplitudes keep the crawl from ever drifting far.
      crawlX: rand(3, 6) * k * (Math.random() > 0.5 ? 1 : -1),
      crawlY: rand(3, 6) * k * (Math.random() > 0.5 ? 1 : -1),
      crawlDur,
      crawlDelay: -rand(0, crawlDur),
    }
  })

  // Keep every logo horizontally clear of the centered CTA — for its whole
  // flight, not just at rest. Because both the launch point and the landing
  // point sit beyond the button's edge (plus the logo's worst-case reach), the
  // straight throw path can never cross the button.
  const outerX = 0.46 * width
  for (const it of items) {
    const side = it.landX < 0 ? -1 : 1
    it.innerX = Math.max(0.15 * width, buttonHalf + guardRadius(it) + CTA_GAP)
    const hi = Math.max(it.innerX, outerX)
    it.landX = side * Math.min(Math.max(Math.abs(it.landX), it.innerX), hi)
    it.startX = side * it.innerX
  }

  // Keep every logo aware of its neighbors: nudge landing spots apart so that
  // even at the extremes of their float/crawl/spin motion they never overlap.
  resolveCollisions(items, width, k)
  return items
}

/**
 * Worst-case radius of a tile: half its size (the circumscribed circle when a
 * spinning square hits 45°) plus the most its center can drift from float +
 * crawl, plus a small breathing margin.
 */
function guardRadius(it: ThrownLogo): number {
  // Squares reach their circumscribed circle whenever they rotate, so use the
  // half-diagonal for any logo that turns (the spinner) or twists (the rest).
  const base = (it.size / 2) * Math.SQRT2
  const drift = Math.hypot(Math.abs(it.floatX) + Math.abs(it.crawlX), Math.abs(it.floatY) + Math.abs(it.crawlY))
  return base + drift + 6
}

function resolveCollisions(items: ThrownLogo[], width: number, k: number) {
  const xOuter = 0.46 * width
  const yMax = -48 * k
  const yMin = -188 * k
  // Each logo stays on the side it launched toward (indices 0–1 left, 2–3 right)
  // so separation never pushes anything behind the centered CTA button.
  const sides = items.map((it) => (it.landX < 0 ? -1 : 1))

  const clamp = (it: ThrownLogo, side: number) => {
    // it.innerX already guarantees CTA clearance for this logo.
    const ax = Math.min(Math.max(Math.abs(it.landX), it.innerX), Math.max(it.innerX, xOuter))
    it.landX = side * ax
    it.landY = Math.min(Math.max(it.landY, yMin), yMax)
  }

  for (let pass = 0; pass < 200; pass++) {
    let moved = false
    for (let a = 0; a < items.length; a++) {
      for (let b = a + 1; b < items.length; b++) {
        const A = items[a]
        const B = items[b]
        let dx = B.landX - A.landX
        let dy = B.landY - A.landY
        let dist = Math.hypot(dx, dy)
        const minDist = guardRadius(A) + guardRadius(B)
        if (dist >= minDist) continue
        if (dist < 0.001) {
          dx = Math.random() - 0.5
          dy = Math.random() - 0.5
          dist = Math.hypot(dx, dy) || 1
        }
        const push = (minDist - dist) / 2
        const ux = dx / dist
        const uy = dy / dist
        A.landX -= ux * push
        A.landY -= uy * push
        B.landX += ux * push
        B.landY += uy * push
        clamp(A, sides[a])
        clamp(B, sides[b])
        moved = true
      }
    }
    if (!moved) break
  }
}

/**
 * PosLogoBurst — a one-time, on-load flourish. A few clean circular POS logos
 * start hidden behind the hero dashboard's top edge, get "spat" out at random
 * speeds/angles into random spots above the dashboard, then float + twist
 * gently. Renders only after mount (client-only) so the animation always plays
 * fresh on page open and never causes a hydration mismatch.
 */
export default function PosLogoBurst() {
  const ref = useRef<HTMLDivElement>(null)
  const [throws, setThrows] = useState<ThrownLogo[] | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const width = ref.current?.offsetWidth ?? 760
    const btn = document.querySelector<HTMLElement>("[data-hero-cta]")
    // Button shares the hero's horizontal center, so half its layout width is
    // how far it reaches from center on either side.
    const buttonHalf = btn ? btn.offsetWidth / 2 : 0.13 * width
    setThrows(buildThrows(width, buttonHalf))
  }, [])

  if (!throws) return <div ref={ref} className="absolute inset-0 -z-0" aria-hidden />

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <style>{`
        @keyframes pos-throw {
          0% {
            transform: translate(calc(-50% + var(--sx)), 26px) scale(0.32) rotate(0deg);
            opacity: 0;
          }
          14% { opacity: 1; }
          100% {
            transform: translate(calc(-50% + var(--lx)), var(--ly)) scale(1) rotate(var(--lr));
            opacity: 1;
          }
        }
        @keyframes pos-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(var(--fx), calc(var(--fy) * -1)) rotate(var(--fr)); }
        }
        @keyframes pos-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(calc(360deg * var(--dir))); }
        }
        @keyframes pos-crawl {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(var(--cx), calc(var(--cy) * -1)); }
          50% { transform: translate(calc(var(--cx) * -1), var(--cy)); }
          75% { transform: translate(calc(var(--cx) * 0.6), calc(var(--cy) * 0.6)); }
        }
      `}</style>

      {throws.map((t) => (
        <div
          key={t.id}
          className="absolute left-1/2 top-0"
          style={
            {
              "--sx": `${t.startX}px`,
              "--lx": `${t.landX}px`,
              "--ly": `${t.landY}px`,
              "--lr": `${t.landRot}deg`,
              opacity: 0,
              animation: `pos-throw ${t.throwDur}s cubic-bezier(0.16, 0.9, 0.28, 1.12) ${t.throwDelay}s forwards`,
              willChange: "transform, opacity",
            } as React.CSSProperties
          }
        >
          <div
            style={
              {
                "--cx": `${t.crawlX}px`,
                "--cy": `${t.crawlY}px`,
                animation: t.crawl
                  ? `pos-crawl ${t.crawlDur}s ease-in-out ${t.crawlDelay}s infinite`
                  : undefined,
                // Drop-shadow lives on this non-rotating wrapper so the shadow
                // always falls straight down, even while the tile spins/twists.
                filter:
                  "drop-shadow(0px 8px 18px rgba(36,36,36,0.22)) drop-shadow(0px 3px 6px rgba(36,36,36,0.16)) drop-shadow(0px 1px 2px rgba(36,36,36,0.12))",
                willChange: t.crawl ? "transform, filter" : "filter",
              } as React.CSSProperties
            }
          >
          <div
            style={
              {
                "--fx": `${t.floatX}px`,
                "--fy": `${t.floatY}px`,
                "--fr": `${t.floatRot}deg`,
                animation: `pos-float ${t.floatDur}s ease-in-out ${t.floatDelay}s infinite`,
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            <div
              style={
                {
                  "--dir": t.spinDir,
                  animation: t.spin
                    ? `pos-spin ${t.spinDur}s linear ${t.throwDelay + t.throwDur}s infinite`
                    : undefined,
                  willChange: t.spin ? "transform" : undefined,
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  width: t.size,
                  height: t.size,
                  borderRadius: Math.round(t.size * 0.26),
                  background: t.bg,
                  overflow: "hidden",
                }}
              >
                <img
                  src={t.src}
                  alt={t.name}
                  width={t.size}
                  height={t.size}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    transform: `scale(${t.zoom})`,
                  }}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  )
}
