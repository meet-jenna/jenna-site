import { useCallback, useEffect, useRef, useState } from 'react'

import { fmtTime } from '@/lib/format'
import { cn } from '@/lib/utils'

// Hero "live call" card. Logic ported from /main.js (21–110):
//   - On viewport entry (IntersectionObserver, threshold 0.4): auto-play
//     a scripted call animation once.
//   - Tap-to-Call button replays the animation on click. On mobile the
//     <a href="tel:..."> handoff still fires (we never preventDefault).
//   - Transcript bubbles & POS/SMS events fade in at scripted delays.
//   - Timer ticks 1s while playing; resets on each replay.
//   - Stops 7.5s after start to match the hand-built bubble timeline.
//
// Phase 2 hook (Retell Web Call SDK):
//   import { RetellWebClient } from "retell-client-js-sdk"
//   ...replace the body of `play()` with a fetch to your token endpoint
//   + client.startCall({ accessToken }). The DOM hooks below stay the
//   same — bubbles + events + timer keep working.

const BUBBLES = [
  { who: 'Caller', text: 'Hey, do you guys deliver to the Heights tonight?',  delay: 200,  side: 'caller' as const },
  { who: 'Jenna',  text: 'We sure do — until 11pm. Want me to start an order?', delay: 1400, side: 'jenna'  as const },
  { who: 'Caller', text: 'Yeah — large pepperoni and a Caesar.',                delay: 2800, side: 'caller' as const },
  { who: 'Jenna',  text: "Got it. That's $28.40 — text confirmation on the way.", delay: 4400, side: 'jenna'  as const },
]

const EVENTS = [
  { text: 'Order pushed to POS',     delay: 5200 },
]

const STOP_AFTER_MS = 7500

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function CallCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const tickIntervalRef = useRef<number | null>(null)
  const autoplayedRef = useRef(false)

  const [state, setState] = useState<'idle' | 'playing'>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [shownBubbles, setShownBubbles] = useState<Set<number>>(new Set())
  const [shownEvents, setShownEvents] = useState<Set<number>>(new Set())

  const reset = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (tickIntervalRef.current !== null) {
      clearInterval(tickIntervalRef.current)
      tickIntervalRef.current = null
    }
    setElapsed(0)
    setShownBubbles(new Set())
    setShownEvents(new Set())
  }, [])

  const stop = useCallback(() => {
    setState('idle')
    if (tickIntervalRef.current !== null) {
      clearInterval(tickIntervalRef.current)
      tickIntervalRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    reset()
    setState('playing')

    tickIntervalRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)

    BUBBLES.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setShownBubbles((prev) => new Set(prev).add(idx))
      }, BUBBLES[idx].delay)
      timersRef.current.push(t)
    })

    EVENTS.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setShownEvents((prev) => new Set(prev).add(idx))
      }, EVENTS[idx].delay)
      timersRef.current.push(t)
    })

    const stopT = window.setTimeout(stop, STOP_AFTER_MS)
    timersRef.current.push(stopT)
  }, [reset, stop])

  // Auto-play once when card enters viewport.
  useEffect(() => {
    const node = cardRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !autoplayedRef.current) {
            autoplayedRef.current = true
            play()
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [play])

  // Cleanup any pending timers on unmount.
  useEffect(() => () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    if (tickIntervalRef.current !== null) clearInterval(tickIntervalRef.current)
  }, [])

  return (
    <div
      ref={cardRef}
      className="call-card"
      id="callCard"
      data-state={state}
      role="region"
      aria-label="Live call demo"
    >
      <div className="call-card-glow" aria-hidden="true" />

      {/* Phone interface */}
      <div className="call-phone">
        <div className="call-phone-header">
          <div className="call-meta">
            <div className="call-name" aria-label="Jenna">
              <img
                className="call-name-logo call-name-logo-light"
                src="/assets/logos/jenna-logo-blue.png"
                alt="Jenna"
                width={1024}
                height={300}
              />
              <img
                className="call-name-logo call-name-logo-dark"
                src="/assets/logos/jenna-logo-white.png"
                alt=""
                aria-hidden="true"
                width={1024}
                height={300}
              />
            </div>
            <div className="call-time" id="callTime">{fmtTime(elapsed)}</div>
          </div>
          <div className="call-status call-status-ready">
            <span className="status-dot" aria-hidden="true" />
            <span>Ready</span>
          </div>
        </div>

        <div className="waveform" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="call-cta-row">
          <a
            className="rainbow-btn"
            id="callJennaBtn"
            href="tel:+16318007774"
            data-phone="+16318007774"
            aria-label="Tap to call Jenna at (631) 800-7774"
            onClick={() => {
              // Don't preventDefault — on mobile we want the tel: handoff to fire.
              play()
            }}
          >
            <span className="rainbow-btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 4h3l2 5-2.5 1.5a11 11 0 005.5 5.5L14.5 13.5 19.5 16v3a2 2 0 01-2 2A14 14 0 014 6.5a2 2 0 012-2.5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Tap to Call Jenna
          </a>
          <a className="call-cta-phone" href="tel:+16318007774">(631) 800-7774</a>
        </div>
      </div>

      {/* Transcript */}
      <div className="call-transcript" id="transcript">
        {BUBBLES.map((b, idx) => (
          <div
            key={idx}
            className={cn('transcript-bubble', b.side, shownBubbles.has(idx) && 'show')}
            data-delay={b.delay}
          >
            <span className="bubble-who">{b.who}</span>
            <span className="bubble-text">{b.text}</span>
          </div>
        ))}

        <div className="transcript-events">
          {EVENTS.map((e, idx) => (
            <div
              key={idx}
              className={cn('event', shownEvents.has(idx) && 'show')}
              data-delay={e.delay}
            >
              <CheckIcon />
              {e.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
