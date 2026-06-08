import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// HeroOrbit — floating call "conversation" that lives in the negative
// space around the hero iPhone. Two large chat bubbles play out one
// inbound order call (caller asks → Jenna answers), surrounded by a few
// floating accents (a Toast POS confirmation badge + two stat chips).
//
//   1 · CALLER   avatar + neutral bubble: "Hey, um, can I get 2 pizzas…"
//   2 · JENNA    accent bubble + brand "J": "Got it, placing your order now."
//   3 · POS      "Sent to Toast" badge (floats by Jenna) + chips
//
// Reveal is a phase machine (caller → jenna → pos/chips → hold → loop)
// so the thread reads in order; ambient drift is CSS (.orbit-float, see
// index.css) on an inner wrapper so it never fights the reveal transform.
// The layer is decorative — aria-hidden + pointer-events:none — since the
// hero headline/sub carry the meaning. Honors prefers-reduced-motion by
// rendering everything in its final revealed state.

// Phase durations in ms — index = phase. Phase 0 is the empty beat
// between loops (kept long so the scene replays only occasionally); the
// last entry is the "hold" where the full scene sits revealed (kept long
// so the conversation lingers on screen well after it finishes typing).
const PHASE_MS = [3200, 3200, 3200, 9000]

// Tracks a media query so reveals can branch on breakpoint — the Toast and
// the food emojis are tossed in different directions depending on which side
// of the phone the Toast rests on (top-right on phone/tablet, left on desktop).
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])
  return matches
}

export function HeroOrbit() {
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  const isDesktop = useMediaQuery('(min-width: 960px)')
  const [phase, setPhase] = useState(reduceMotion ? PHASE_MS.length - 1 : 0)
  const timer = useRef<number | undefined>(undefined)

  // Each time the Toast is thrown (phase advances to 1), bump a counter to
  // (re)fire the food-emoji burst that follows it.
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    timer.current = window.setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_MS.length),
      PHASE_MS[phase],
    )
    return () => window.clearTimeout(timer.current)
  }, [phase, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    if (phase === 1) setBurst((b) => b + 1)
  }, [phase, reduceMotion])

  // Visible once the thread has advanced to (or past) the given phase.
  const at = (p: number) => reduceMotion || phase >= p

  // Which side of the phone the Toast rests on — drives the toss origin for
  // both the Toast and the food emojis.
  const side: 'left' | 'right' = isDesktop ? 'left' : 'right'

  return (
    <div className="hero-orbit" aria-hidden="true">
      {/* STORED — conversation bubbles (caller + Jenna). Uncomment this
          block to restore the "Hey, um, can I get 2 pizzas and knots?" /
          "Got it, placing your order now." thread.
      <OrbitItem className="orbit-caller" visible={at(1)} floatVariant="a">
        <div className="orbit-turn">
          <span className="orbit-pfp">
            <img src="/assets/avatars/caller-avatar.png" alt="" width={88} height={88} />
          </span>
          <p className="orbit-msg orbit-msg-caller">Hey, um, can I get 2 pizzas and knots?</p>
        </div>
      </OrbitItem>

      <OrbitItem className="orbit-jenna" visible={at(2)} floatVariant="b">
        <div className="orbit-turn orbit-turn-jenna">
          <p className="orbit-msg orbit-msg-jenna">Got it, placing your order now.</p>
          <span className="orbit-pfp orbit-pfp-jenna">J</span>
        </div>
      </OrbitItem>
      */}

      <OrbitItem
        className="orbit-pos"
        visible={at(1)}
        floatVariant="c"
        reveal="swing"
        swingFrom={isMobile ? { x: -64, y: 72 } : undefined}
      >
        <span className="orbit-toast">
          <img src="/assets/logos/pos/toast.png" alt="" width={72} height={72} />
        </span>
      </OrbitItem>

      {/* Food emojis — anchored at the Toast's resting spot, tossed out from
          behind the phone 1s / 2s after the Toast, flying back into the logo
          and shrinking away as if eaten. */}
      {!reduceMotion && (
        <div className="orbit-item orbit-emoji-anchor">
          <ThrownEmoji char="🍕" label="pizza" burst={burst} delay={1} side={side} />
          <ThrownEmoji char="🍔" label="hamburger" burst={burst} delay={2} side={side} />
        </div>
      )}
    </div>
  )
}

// A food emoji flung out from behind the phone that flies into the Toast logo
// (the anchor's origin, i.e. x/y = 0) and shrinks away — like the logo eats
// it. `burst` (re)triggers the flight via key remount; `delay` staggers the
// two emojis; `side` flips the toss direction to come from the phone.
function ThrownEmoji({
  char,
  label,
  burst,
  delay,
  side,
}: {
  char: string
  label: string
  burst: number
  delay: number
  side: 'left' | 'right'
}) {
  // `from` = tucked behind the phone; `out` = the thrown-out apex (past the
  // logo, away from the phone); both legs resolve back to 0,0 = the Toast.
  const from = side === 'left' ? { x: 66, y: 28 } : { x: -62, y: 64 }
  const out = side === 'left' ? { x: -30, y: -18 } : { x: 28, y: -30 }

  return (
    <motion.span
      key={burst}
      className="orbit-emoji"
      role="img"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.2, x: from.x, y: from.y, rotate: -40 }}
      animate={
        burst > 0
          ? {
              x: [from.x, out.x, 0, 0],
              y: [from.y, out.y, 0, 0],
              scale: [0.2, 1, 1, 0],
              opacity: [0, 1, 1, 0],
              rotate: [-40, 8, 0, 0],
            }
          : { opacity: 0 }
      }
      transition={
        burst > 0
          ? { duration: 1.5, delay, times: [0, 0.4, 0.85, 1], ease: 'easeInOut' }
          : { duration: 0 }
      }
    >
      {char}
    </motion.span>
  )
}

type FloatVariant = 'a' | 'b' | 'c'
type Reveal = 'rise' | 'swing'

function OrbitItem({
  className,
  visible,
  floatVariant,
  reveal = 'rise',
  swingFrom,
  children,
}: {
  className: string
  visible: boolean
  floatVariant: FloatVariant
  reveal?: Reveal
  swingFrom?: { x: number; y: number }
  children: React.ReactNode
}) {
  // `swing` is the Toast logo's "thrown out from behind the phone" reveal:
  // it starts tucked + tiny + rotated (occluded behind the device since the
  // orbit layer sits below it), then a low-damping spring flings it out to
  // its resting spot. `swingFrom` adds a translate so the logo actually
  // travels along an arc (used on mobile to toss it up to the top-right);
  // without it the reveal pivots in place via the CSS transform-origin.
  // `rise` is the original gentle fade-up for the (disabled) chat bubbles.
  const hidden =
    reveal === 'swing'
      ? { opacity: 0, scale: 0.3, rotate: -75, x: swingFrom?.x ?? 0, y: swingFrom?.y ?? 0 }
      : { opacity: 0, y: 16, scale: 0.92 }
  const shown =
    reveal === 'swing'
      ? { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }
      : { opacity: 1, y: 0, scale: 1 }
  const transition =
    reveal === 'swing'
      ? { type: 'spring' as const, stiffness: 200, damping: 12, mass: 1 }
      : { type: 'spring' as const, stiffness: 320, damping: 28 }

  return (
    <motion.div
      className={`orbit-item ${className}`}
      initial={false}
      animate={visible ? shown : hidden}
      transition={transition}
    >
      <div className={`orbit-float orbit-float-${floatVariant}`}>{children}</div>
    </motion.div>
  )
}
