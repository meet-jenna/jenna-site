import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// "Handles unlimited calls at once" visual — four concurrent lines
// with real, ticking timers. Each line owns its own anchor timestamp
// (with a sub-second phase offset) and per-line duration cap between
// 2:30 and 5:00, so the timers don't share a single global tick:
// each line crosses its own one-second boundary at a different
// moment, which is what real concurrent calls would look like. When
// a line hits its cap it loops back to 0:00 with a fresh cap.

const LINE_COUNT = 4
const MIN_CAP_SECONDS = 150 // 2:30
const MAX_CAP_SECONDS = 300 // 5:00
const SAMPLE_MS = 50
const PHASE_BUCKET_MS = 1000 / LINE_COUNT // 250ms — one bucket per line
const PHASE_BUCKET_MARGIN_MS = 30 // keep adjacent buckets visibly distinct

// Waveform — a synthetic but organic voice meter. Each line renders a
// row of thin bars that grow from a centerline (the classic Audacity /
// Siri look) instead of bouncing off the floor. Heights are driven by
// layered sine oscillators per bar plus a slow per-line "speech energy"
// pulse, so each lane reads like a different person talking — bars rise
// and fall with syllable-like swells and quiet dips rather than a
// uniform mechanical bounce. Animated via requestAnimationFrame and
// written straight to the DOM (transform: scaleY) so the parent's
// timer re-renders never thrash it.
const BAR_COUNT = 30
const WAVE_MIN_SCALE = 0.12

// Deterministic pseudo-random so a given line always animates the same
// way across mounts (mulberry32).
function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface BarParams {
  envelope: number // static center-weighted weight (voice sits mid-band)
  freqA: number
  freqB: number
  phaseA: number
  phaseB: number
}

function LineWave({ seed }: { seed: number }) {
  const barsRef = useRef<Array<HTMLSpanElement | null>>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const rng = makeRng(seed * 9176 + 13)
    const bars: BarParams[] = Array.from({ length: BAR_COUNT }, (_, i) => {
      // Raised-cosine window keeps the band fuller in the middle and
      // tapered at the edges, like a real voice spectrum, with a touch
      // of jitter so it never looks perfectly symmetrical.
      const window = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (BAR_COUNT - 1))
      const envelope = 0.45 + 0.55 * window * (0.75 + 0.5 * rng())
      return {
        envelope,
        freqA: 2.2 + rng() * 3.6,
        freqB: 5.5 + rng() * 6.0,
        phaseA: rng() * Math.PI * 2,
        phaseB: rng() * Math.PI * 2,
      }
    })

    // Per-line speech cadence — a slow swell plus a slower one so the
    // overall energy ebbs and flows (talking, then a short breath).
    const energyFreqA = 1.1 + rng() * 0.9
    const energyFreqB = 0.35 + rng() * 0.4
    const energyPhaseA = rng() * Math.PI * 2
    const energyPhaseB = rng() * Math.PI * 2
    const speed = 0.85 + rng() * 0.5

    // Reduced motion: paint a single frozen, organically-varied frame
    // (a still waveform) instead of an animated meter.
    if (reduceMotion) {
      for (let i = 0; i < BAR_COUNT; i++) {
        const el = barsRef.current[i]
        if (!el) continue
        const amp = bars[i].envelope * (0.55 + 0.45 * rng())
        const scale = WAVE_MIN_SCALE + (1 - WAVE_MIN_SCALE) * amp
        el.style.transform = `scaleY(${scale.toFixed(3)})`
      }
      return
    }

    let raf = 0
    const start = performance.now()

    const loop = (now: number) => {
      const t = ((now - start) / 1000) * speed
      const swell = 0.5 + 0.5 * Math.sin(t * energyFreqA + energyPhaseA)
      const breath = 0.5 + 0.5 * Math.sin(t * energyFreqB + energyPhaseB)
      const energy = 0.35 + 0.65 * swell * (0.55 + 0.45 * breath)

      for (let i = 0; i < BAR_COUNT; i++) {
        const el = barsRef.current[i]
        if (!el) continue
        const b = bars[i]
        const osc =
          0.5 + 0.5 * (0.62 * Math.sin(t * b.freqA + b.phaseA) + 0.38 * Math.sin(t * b.freqB + b.phaseB))
        const amp = b.envelope * energy * osc
        const scale = WAVE_MIN_SCALE + (1 - WAVE_MIN_SCALE) * amp
        el.style.transform = `scaleY(${scale.toFixed(3)})`
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [seed, reduceMotion])

  return (
    <div className="line-wave">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barsRef.current[i] = el
          }}
        />
      ))}
    </div>
  )
}

interface LineState {
  anchorMs: number
  capSeconds: number
}

function randomCapSeconds(): number {
  const range = MAX_CAP_SECONDS - MIN_CAP_SECONDS + 1
  return Math.floor(MIN_CAP_SECONDS + Math.random() * range)
}

// Pick a sub-second phase inside a specific bucket, with margin so
// neighbouring buckets can't collide.
function phaseInBucketMs(bucketIndex: number): number {
  const span = PHASE_BUCKET_MS - PHASE_BUCKET_MARGIN_MS * 2
  return bucketIndex * PHASE_BUCKET_MS + PHASE_BUCKET_MARGIN_MS + Math.random() * span
}

function shuffledBuckets(): number[] {
  const buckets = Array.from({ length: LINE_COUNT }, (_, i) => i)
  for (let i = buckets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[buckets[i], buckets[j]] = [buckets[j], buckets[i]]
  }
  return buckets
}

function makeInitialLines(nowMs: number): LineState[] {
  const buckets = shuffledBuckets()
  return buckets.map((bucket) => {
    const capSeconds = randomCapSeconds()
    // Random head start so callers don't all read 0:00, plus a
    // stratified sub-second phase so every line rolls over at a
    // visibly distinct moment.
    const headStartSeconds = Math.floor(Math.random() * capSeconds)
    const phaseMs = phaseInBucketMs(bucket)
    return {
      anchorMs: nowMs - headStartSeconds * 1000 - phaseMs,
      capSeconds,
    }
  })
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function CallLines() {
  const linesRef = useRef<LineState[]>(makeInitialLines(Date.now()))
  const [displaySeconds, setDisplaySeconds] = useState<number[]>(() =>
    linesRef.current.map(() => 0),
  )

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const next: number[] = []
      for (let i = 0; i < linesRef.current.length; i++) {
        const line = linesRef.current[i]
        const elapsed = Math.floor((now - line.anchorMs) / 1000)
        if (elapsed >= line.capSeconds) {
          // Loop with a fresh cap and a fresh phase pulled from a
          // bucket the other lines aren't currently sitting in, so
          // the line keeps drifting against its neighbours instead
          // of re-locking onto one of them.
          const occupied = new Set<number>()
          for (let j = 0; j < linesRef.current.length; j++) {
            if (j === i) continue
            const otherPhase = ((now - linesRef.current[j].anchorMs) % 1000 + 1000) % 1000
            occupied.add(Math.floor(otherPhase / PHASE_BUCKET_MS))
          }
          const free: number[] = []
          for (let b = 0; b < LINE_COUNT; b++) {
            if (!occupied.has(b)) free.push(b)
          }
          const bucket = free.length > 0
            ? free[Math.floor(Math.random() * free.length)]
            : Math.floor(Math.random() * LINE_COUNT)
          linesRef.current[i] = {
            anchorMs: now - phaseInBucketMs(bucket),
            capSeconds: randomCapSeconds(),
          }
          next.push(0)
        } else {
          next.push(elapsed)
        }
      }
      setDisplaySeconds(next)
    }

    tick()
    const id = window.setInterval(tick, SAMPLE_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="lines" aria-hidden="true">
      {displaySeconds.map((seconds, index) => (
        <div className="line" key={index}>
          <div className="line-name">{`Line 0${index + 1}`}</div>
          <LineWave seed={index + 1} />
          <div className="line-time">{formatTime(seconds)}</div>
        </div>
      ))}
    </div>
  )
}
