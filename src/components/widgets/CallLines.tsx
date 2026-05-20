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
          <div className="line-wave">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="line-time">{formatTime(seconds)}</div>
        </div>
      ))}
    </div>
  )
}
