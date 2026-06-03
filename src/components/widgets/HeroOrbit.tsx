import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'

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

export function HeroOrbit() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(reduceMotion ? PHASE_MS.length - 1 : 0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduceMotion) return
    timer.current = window.setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_MS.length),
      PHASE_MS[phase],
    )
    return () => window.clearTimeout(timer.current)
  }, [phase, reduceMotion])

  // Visible once the thread has advanced to (or past) the given phase.
  const at = (p: number) => reduceMotion || phase >= p

  return (
    <div className="hero-orbit" aria-hidden="true">
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

      <OrbitItem className="orbit-pos" visible={at(3)} floatVariant="c">
        <span className="orbit-toast">
          <img src="/assets/logos/pos/toast.png" alt="" width={72} height={72} />
        </span>
      </OrbitItem>

      <OrbitItem className="orbit-chip orbit-chip-order" visible={at(3)} floatVariant="b">
        <span className="orbit-chip-inner">+1 order</span>
      </OrbitItem>
      <OrbitItem className="orbit-chip orbit-chip-rating" visible={at(3)} floatVariant="a">
        <span className="orbit-chip-inner">
          <Star className="orbit-chip-star" /> 4.9
        </span>
      </OrbitItem>
    </div>
  )
}

type FloatVariant = 'a' | 'b' | 'c'

function OrbitItem({
  className,
  visible,
  floatVariant,
  children,
}: {
  className: string
  visible: boolean
  floatVariant: FloatVariant
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={`orbit-item ${className}`}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        scale: visible ? 1 : 0.92,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <div className={`orbit-float orbit-float-${floatVariant}`}>{children}</div>
    </motion.div>
  )
}
