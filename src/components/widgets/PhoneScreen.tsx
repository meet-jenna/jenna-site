import { Mic } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const BUBBLES = [
  { who: 'Caller', text: 'Hey, do you guys deliver to the Heights tonight?',  delay: 200,  side: 'caller' as const },
  { who: 'Jenna',  text: "We sure do — until 11pm. Want me to start an order?", delay: 1400, side: 'jenna'  as const },
  { who: 'Caller', text: 'Yeah — large pepperoni and a Caesar.',                delay: 2800, side: 'caller' as const },
  { who: 'Jenna',  text: "Got it. That's $28.40 — text confirmation on the way.", delay: 4400, side: 'jenna'  as const },
]

const EVENTS = [
  { text: 'Order pushed to POS', delay: 5200 },
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

// Live-call demo rendered inside the iPhone mockup.
//
// Layout: header row (Jenna left / Ready right) → iMessage-style transcript
// (bigger body, brand-violet Jenna bubbles right-aligned, gray caller bubbles
// left-aligned) → footer with mic button + inline audio wave.
//
// Behavior: auto-plays once on viewport entry; clicking the mic replays the
// scripted timeline and animates the wave. The mic is a placeholder for the
// real-time voice integration we'll wire up later — see TODO below for the
// hookup point. Today, "speaking with Jenna" simply triggers the same demo
// so the visual UX matches what the live version will feel like.
export function PhoneScreen() {
  const screenRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const tickIntervalRef = useRef<number | null>(null)
  const autoplayedRef = useRef(false)

  const [state, setState] = useState<'idle' | 'playing'>('idle')
  const [, setElapsed] = useState(0)
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

  useEffect(() => {
    const node = screenRef.current
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
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [play])

  useEffect(() => () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    if (tickIntervalRef.current !== null) clearInterval(tickIntervalRef.current)
  }, [])

  // TODO(retell): Replace this handler with a Retell Web Call SDK session.
  //   const client = new RetellWebClient()
  //   const { accessToken } = await fetch('/api/retell/token').then(r => r.json())
  //   await client.startCall({ accessToken })
  // For now, clicking the mic just replays the scripted demo so the UX
  // matches what the live integration will feel like.
  const handleMicClick = () => {
    play()
  }

  return (
    <div
      ref={screenRef}
      className="phone-screen"
      data-state={state}
      role="region"
      aria-label="Live call demo"
    >
      <header className="phone-screen-header">
        <div className="phone-screen-brand" aria-label="Jenna">
          <img
            className="phone-screen-logo phone-screen-logo-light"
            src="/assets/logos/jenna-logo-blue.png"
            alt="Jenna"
            width={1024}
            height={300}
          />
          <img
            className="phone-screen-logo phone-screen-logo-dark"
            src="/assets/logos/jenna-logo-white.png"
            alt=""
            aria-hidden="true"
            width={1024}
            height={300}
          />
        </div>
        <span className="phone-screen-status">
          <span className="phone-screen-dot" aria-hidden="true" />
          Ready
        </span>
      </header>

      <div className="phone-screen-transcript" aria-live="polite">
        {BUBBLES.map((b, idx) => (
          <div
            key={idx}
            className={cn('phone-bubble', b.side, shownBubbles.has(idx) && 'show')}
          >
            <span className="phone-bubble-who">{b.who}</span>
            <span className="phone-bubble-text">{b.text}</span>
          </div>
        ))}

        {EVENTS.map((e, idx) => (
          <div
            key={idx}
            className={cn('phone-event', shownEvents.has(idx) && 'show')}
          >
            <CheckIcon />
            {e.text}
          </div>
        ))}
      </div>

      <div className="phone-screen-footer">
        <button
          type="button"
          className="phone-screen-mic"
          aria-label="Tap to speak with Jenna"
          aria-pressed={state === 'playing'}
          onClick={handleMicClick}
        >
          <Mic aria-hidden="true" />
        </button>

        <div className="phone-screen-wave" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
