import { User } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { AnimatedBeam } from './AnimatedBeam'

// "Takes orders into your POS" diagram — caller (left) → Jenna (center)
// → three POS systems (right). Mirrors Magic UI's animated-beam-multiple
// -outputs style: white rounded-full nodes, hairline border, soft drop
// shadow. Beams use --accent (#1c00ff). All three POS logos live at
// /public/assets/logos/pos/{toast,clover,square}.png.
//
// Animation: one beam at a time. Both segments (caller→Jenna and
// Jenna→activePOS) sweep in full lockstep over SEGMENT_MS. Because the
// gradient uses userSpaceOnUse coords and both paths run left-to-right,
// the visible "comet" appears to traverse caller → Jenna → POS as one
// continuous beam. Cycle = SEGMENT_MS (no pause, no offset).

const SEGMENT_MS = 1500
const CYCLE_MS = SEGMENT_MS

const Node = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: ReactNode
    shape?: 'circle' | 'tile'
  }
>(({ className, children, shape = 'circle' }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-10 flex h-12 w-12 items-center justify-center overflow-hidden border border-[rgba(31,31,31,0.08)] bg-white shadow-[0_8px_24px_-12px_rgba(31,31,31,0.25)]',
      shape === 'tile' ? 'rounded-2xl' : 'rounded-full p-2',
      className,
    )}
  >
    {children}
  </div>
))
Node.displayName = 'Node'

const ToastMark = () => (
  <img
    src="/assets/logos/pos/toast.png"
    alt=""
    aria-hidden="true"
    className="h-full w-full select-none object-cover"
    draggable={false}
  />
)

// Source PNG has a square black canvas around the green circle. Scaling
// up + object-cover crops the black border out so the green fills the
// rounded tile cleanly. Swap to a transparent-canvas PNG later if needed.
const CloverMark = () => (
  <img
    src="/assets/logos/pos/clover.png"
    alt=""
    aria-hidden="true"
    className="h-full w-full origin-center scale-[1.22] select-none object-cover"
    draggable={false}
  />
)

const SquareMark = () => (
  <img
    src="/assets/logos/pos/square.png"
    alt=""
    aria-hidden="true"
    className="h-full w-full select-none object-cover"
    draggable={false}
  />
)

const JennaMark = () => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_0_24px_-6px_rgba(28,0,255,0.6)]">
    <span
      className="text-[26px] font-bold leading-none text-white"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      J
    </span>
  </div>
)

const CallerMark = () => (
  <div className="flex h-full w-full items-center justify-center rounded-full text-[var(--fg-muted)]">
    <User className="h-6 w-6" strokeWidth={2} />
  </div>
)

export function PosIntegrationDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const callerRef = useRef<HTMLDivElement>(null)
  const jennaRef = useRef<HTMLDivElement>(null)

  const toastRef = useRef<HTMLDivElement>(null)
  const cloverRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)

  const posRefs = [toastRef, cloverRef, squareRef]
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const activeIdx = cycle % posRefs.length

  return (
    <div
      ref={containerRef}
      className={cn(
        'pos-diagram relative mt-auto flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[var(--r-md)] bg-white px-6 sm:px-10',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex h-full max-h-[200px] w-full max-w-xl items-stretch justify-between">
        {/* Caller (left) — circle avatar */}
        <div className="flex flex-col items-center justify-center">
          <Node ref={callerRef}>
            <CallerMark />
          </Node>
        </div>

        {/* Jenna (center) — circle avatar, larger */}
        <div className="flex flex-col items-center justify-center">
          <Node ref={jennaRef} className="h-16 w-16">
            <JennaMark />
          </Node>
        </div>

        {/* POS systems (right) — rounded-square tiles, app-icon style */}
        <div className="flex flex-col items-center justify-between py-2">
          <Node ref={toastRef} shape="tile">
            <ToastMark />
          </Node>
          <Node ref={cloverRef} shape="tile">
            <CloverMark />
          </Node>
          <Node ref={squareRef} shape="tile">
            <SquareMark />
          </Node>
        </div>
      </div>

      {/* Static violet connection lines — always visible. The gradient
          sweep fires on one path at a time, rotating each cycle. Both
          segments animate in lockstep so the comet flows through Jenna
          as one continuous beam (no delay between segments). */}
      <AnimatedBeam
        key={`c2j-${cycle}`}
        containerRef={containerRef}
        fromRef={callerRef}
        toRef={jennaRef}
        duration={SEGMENT_MS / 1000}
        delay={0}
        repeat={0}
      />
      {posRefs.map((ref, idx) => (
        <AnimatedBeam
          key={`j2p-${idx}-${cycle}`}
          containerRef={containerRef}
          fromRef={jennaRef}
          toRef={ref}
          duration={SEGMENT_MS / 1000}
          delay={0}
          repeat={0}
          animate={idx === activeIdx}
        />
      ))}

      {/* "And many more" hint — communicates we support beyond the 3 shown */}
      <span className="pointer-events-none absolute bottom-3 right-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">
        20+
      </span>
    </div>
  )
}
