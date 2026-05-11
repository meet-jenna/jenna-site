import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const BUBBLES = [
  { who: 'Caller', text: 'Hi, can I place an order?',                                       delay:   300, side: 'caller' as const },
  { who: 'Jenna',  text: 'Sure! Can I get a name? And is it pickup or delivery?',           delay:  1700, side: 'jenna'  as const },
  { who: 'Caller', text: 'Mike. Pickup, please.',                                           delay:  3100, side: 'caller' as const },
  { who: 'Jenna',  text: 'Got it, Mike. What can I get started for you?',                   delay:  4400, side: 'jenna'  as const },
  { who: 'Caller', text: 'Large pepperoni and a Caesar salad.',                             delay:  5700, side: 'caller' as const },
  { who: 'Jenna',  text: 'Anything to drink with that?',                                    delay:  7000, side: 'jenna'  as const },
  { who: 'Caller', text: 'Just water, thanks.',                                             delay:  8200, side: 'caller' as const },
  { who: 'Jenna',  text: "Perfect. $28.40 — ready in 20. I'll text your receipt now.",      delay:  9500, side: 'jenna'  as const },
]

const EVENTS = [
  { text: 'Order sent to POS', delay: 11000 },
]

const STOP_AFTER_MS = 12500

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

// Bell-curve voice wave — taller in the middle, shorter at the edges,
// matching the iOS Siri/voice-assistant convention. Driven by
// framer-motion so each bar gets its own slightly randomised
// oscillation, which reads as a "live voice" rather than a fixed pulse.
const WAVE_BAR_COUNT = 13

function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="phone-voice-wave" aria-hidden="true">
      {Array.from({ length: WAVE_BAR_COUNT }).map((_, i) => {
        const center = (WAVE_BAR_COUNT - 1) / 2
        const distance = Math.abs(i - center)
        // Bell envelope — outer bars stay shorter so the wave reads
        // as a centered pulse rather than a flat block.
        const envelope = 1 - distance * 0.09
        return (
          <motion.span
            key={i}
            animate={
              active
                ? {
                    scaleY: [
                      0.3 * envelope,
                      1.0 * envelope,
                      0.45 * envelope,
                      0.85 * envelope,
                      0.3 * envelope,
                    ],
                  }
                : { scaleY: 0.25 * envelope }
            }
            transition={{
              duration: 1.1 + (i % 3) * 0.18,
              repeat: active ? Infinity : 0,
              ease: 'easeInOut',
              delay: (i * 0.05) % 0.35,
            }}
          />
        )
      })}
    </div>
  )
}

// Live-call demo rendered inside the iPhone mockup.
//
// Layout: BIG centered mic at the top → tight bell-curve voice wave directly
// under the mic → iMessage-style transcript that fills the remaining screen
// height. The transcript auto-scrolls to keep the newest bubble in view as
// the scripted timeline plays.
//
// Behavior: auto-plays once on viewport entry; clicking the mic replays the
// scripted timeline. The mic is a placeholder for the real-time voice
// integration we'll wire up later — see TODO in handleMicClick.
export function PhoneScreen() {
  const screenRef = useRef<HTMLDivElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const autoplayedRef = useRef(false)

  const [state, setState] = useState<'idle' | 'playing'>('idle')
  const [shownBubbles, setShownBubbles] = useState<Set<number>>(new Set())
  const [shownEvents, setShownEvents] = useState<Set<number>>(new Set())

  const reset = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    setShownBubbles(new Set())
    setShownEvents(new Set())
  }, [])

  const stop = useCallback(() => {
    setState('idle')
  }, [])

  const play = useCallback(() => {
    reset()
    setState('playing')

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

  // Keep the latest bubble in view as the timeline drops messages in.
  useEffect(() => {
    const el = transcriptRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [shownBubbles, shownEvents])

  useEffect(() => () => {
    timersRef.current.forEach((t) => clearTimeout(t))
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

  const isPlaying = state === 'playing'

  return (
    <div
      ref={screenRef}
      className="phone-screen"
      data-state={state}
      role="region"
      aria-label="Live call demo"
    >
      <span className="phone-screen-mark" aria-label="Jenna">
        <img
          className="phone-screen-mark-img phone-screen-mark-light"
          src="/assets/logos/jenna-logo-blue.png"
          alt="Jenna"
          width={1024}
          height={300}
        />
        <img
          className="phone-screen-mark-img phone-screen-mark-dark"
          src="/assets/logos/jenna-logo-white.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={300}
        />
      </span>

      <div className="phone-screen-stage">
        <button
          type="button"
          className="phone-screen-mic"
          aria-label="Tap to speak with Jenna"
          aria-pressed={isPlaying}
          onClick={handleMicClick}
        >
          <Mic aria-hidden="true" />
        </button>

        <VoiceWave active={isPlaying} />
      </div>

      <div
        ref={transcriptRef}
        className="phone-screen-transcript"
        aria-live="polite"
      >
        {BUBBLES.map((b, idx) => (
          shownBubbles.has(idx) ? (
            <div
              key={idx}
              className={cn('phone-bubble', b.side, 'show')}
            >
              <span className="phone-bubble-text">{b.text}</span>
            </div>
          ) : null
        ))}

        {EVENTS.map((e, idx) => (
          shownEvents.has(idx) ? (
            <div
              key={idx}
              className="phone-event show"
            >
              <CheckIcon />
              {e.text}
            </div>
          ) : null
        ))}
      </div>
    </div>
  )
}
