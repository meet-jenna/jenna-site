import { forwardRef, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { AnimatedBeam } from './AnimatedBeam'

// "Takes orders into your POS" diagram — Jenna (center hub) fans out to
// every POS system she writes orders into. Mirrors Magic UI's
// animated-beam-multiple-inputs demo: a larger center node with three
// nodes stacked on each side, all linked by violet beams that sweep
// outward from Jenna. Real POS logos live at
// /public/assets/logos/pos/{toast,clover,square}.png; the remaining
// connectors are placeholders ("+ more integrations") until we add them.
//
// Beam direction: every beam originates at Jenna (fromRef=jennaRef) so
// the comet appears to flow from her out to each POS. Left-side beams use
// `reverse` so the gradient still travels center → node despite the path
// running right-to-left in user space.

const BEAM_DURATION = 3

const Node = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: ReactNode
    shape?: 'circle' | 'tile'
  }
>(({ className, children, shape = 'tile' }, ref) => (
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

const PosMark = ({ src, alt = '' }: { src: string; alt?: string }) => (
  <img
    src={src}
    alt={alt}
    aria-hidden={alt === '' ? 'true' : undefined}
    className="h-full w-full select-none object-cover"
    draggable={false}
  />
)

const JennaMark = () => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_0_24px_-6px_rgba(28,0,255,0.6)]">
    <span
      className="text-[30px] font-bold leading-none text-white"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      J
    </span>
  </div>
)

export function PosIntegrationDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const jennaRef = useRef<HTMLDivElement>(null)

  // Left column (top → bottom)
  const leftTopRef = useRef<HTMLDivElement>(null)
  const leftMidRef = useRef<HTMLDivElement>(null)
  const leftBottomRef = useRef<HTMLDivElement>(null)

  // Right column (top → bottom)
  const rightTopRef = useRef<HTMLDivElement>(null)
  const rightMidRef = useRef<HTMLDivElement>(null)
  const rightBottomRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn(
        'pos-diagram relative mt-auto flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[var(--r-md)] bg-white px-6 sm:px-10',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex h-full w-full max-w-sm flex-col items-stretch justify-center gap-5 pt-1 pb-6">
        {/* Top row */}
        <div className="flex flex-row items-center justify-between">
          <Node ref={leftTopRef}>
            <PosMark src="/assets/logos/pos/toast.png" />
          </Node>
          <Node ref={rightTopRef}>
            <PosMark src="/assets/logos/pos/ncr-aloha.png" alt="NCR Aloha" />
          </Node>
        </div>

        {/* Middle row — Jenna hub in the center */}
        <div className="flex flex-row items-center justify-between">
          <Node ref={leftMidRef}>
            <PosMark src="/assets/logos/pos/shift4.png" alt="Shift4" />
          </Node>
          <Node ref={jennaRef} className="h-16 w-16" shape="circle">
            <JennaMark />
          </Node>
          <Node ref={rightMidRef}>
            <PosMark src="/assets/logos/pos/clover.png" />
          </Node>
        </div>

        {/* Bottom row */}
        <div className="flex flex-row items-center justify-between">
          <Node ref={leftBottomRef}>
            <PosMark src="/assets/logos/pos/square.png" />
          </Node>
          <Node ref={rightBottomRef}>
            <PosMark src="/assets/logos/pos/oracle-micros.png" alt="Oracle MICROS" />
          </Node>
        </div>
      </div>

      {/* Beams fan out from Jenna to every node. Left side reversed so the
          comet still reads as flowing center → node. */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={leftTopRef}
        curvature={75}
        duration={BEAM_DURATION}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={leftMidRef}
        duration={BEAM_DURATION}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={leftBottomRef}
        curvature={-75}
        duration={BEAM_DURATION}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={rightTopRef}
        curvature={75}
        duration={BEAM_DURATION}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={rightMidRef}
        duration={BEAM_DURATION}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jennaRef}
        toRef={rightBottomRef}
        curvature={-75}
        duration={BEAM_DURATION}
      />
    </div>
  )
}
