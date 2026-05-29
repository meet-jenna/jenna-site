import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

// Hero phone demo — a single restaurant call playing out inside the
// iPhone mockup. Three acts, all visible together once each appears:
//
//   ACT 1 · Call (0–6s)
//     Active-call strip + iMessage-style back-and-forth between
//     caller and Jenna. Bubbles drop in sequentially and STAY visible
//     for the rest of the cycle.
//
//   ACT 2 · Order (6.5–8.4s)
//     Order receipt card fades in BELOW the transcript. Items drop
//     in one by one, total writes in. The transcript stays in view
//     above — owners can see the request AND the result side by side.
//
//   ACT 3 · Handoff (9.3s onward)
//     Toast logo POPS into existence at the bottom (it wasn't there
//     before). A violet packet detaches from the bottom of the
//     receipt and flies down INTO the Toast tile, which lights up.
//     "✓ SENT TO TOAST" pill confirms.
//
// The cycle loops while the phone is in view. We pause off-screen so
// we're not burning frames the user can't see.
//
// TODO(retell): swap this scripted cycle for a real Retell Web Call
//   SDK session — see git history for the previous mic-button entrypoint.

type Bubble = {
  side: 'caller' | 'jenna'
  text: string
}

type Item = {
  emoji: string
  name: string
  price: string
}

const CALLER_NAME = 'Mike'
const ORDER_NUMBER = '#1247'
const ORDER_TOTAL = '$28.40'

const CALLER_AVATAR = '/assets/avatars/caller-avatar.png'

const BUBBLES: Bubble[] = [
  { side: 'caller', text: 'Hi, can I place a pickup order?' },
  { side: 'jenna',  text: 'Of course — can I get a name?' },
  { side: 'caller', text: 'Mike. Pepperoni pie, Caesar, and a water.' },
  { side: 'jenna',  text: 'Got it, Mike. $28.40, ready in 20.' },
]

const ITEMS: Item[] = [
  { emoji: '🍕', name: 'Large Pepperoni', price: '$18.00' },
  { emoji: '🥗', name: 'Caesar Salad',    price: '$ 9.50' },
  { emoji: '💧', name: 'Water',           price: '$ 0.00' },
]

// Timeline (ms) — every milestone of one cycle. Total cycle = LOOP_AT.
//
// PACKET starts the 1.1s order-packet-deliver CSS animation; the
// packet visually lands on the tile at ~82% of that animation
// (~PACKET + 900ms = LAND), when we light the destination and ~200ms
// later show the SENT pill.
const T = {
  STRIP_IN:    150,
  // ACT 1 — conversation
  BUBBLE_1:    700,    // Caller: "Hi, can I place a pickup order?"
  BUBBLE_2:   2000,    // Jenna:  "Of course — can I get a name?"
  BUBBLE_3:   3300,    // Caller: "Mike. Pepperoni pie, Caesar, and a water."
  BUBBLE_4:   5400,    // Jenna:  "Got it, Mike. $28.40, ready in 20."
  // ACT 2 — order draws up below the transcript
  CARD:       6700,
  ITEM_1:     7200,
  ITEM_2:     7600,
  ITEM_3:     8000,
  TOTAL:      8600,
  // ACT 3 — handoff
  DEST_IN:    9500,    // Toast tile pops into existence
  PACKET:    10100,    // packet flies card → tile
  LAND:      11000,    // tile lights up
  SENT:      11200,    // sent pill appears
  // Loop
  LOOP_AT:   13500,
} as const

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

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PhoneScreen() {
  const screenRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const timerIntervalRef = useRef<number | null>(null)
  const inViewRef = useRef(false)

  // cycleKey re-keys the animated children so their CSS entrance
  // animations re-fire on each loop instead of us imperatively
  // resetting every transform/opacity.
  const [cycleKey, setCycleKey] = useState(0)
  const [stripShown,   setStripShown]   = useState(false)
  const [shownBubbles, setShownBubbles] = useState<Set<number>>(new Set())
  const [cardShown,    setCardShown]    = useState(false)
  const [shownItems,   setShownItems]   = useState<Set<number>>(new Set())
  const [totalShown,   setTotalShown]   = useState(false)
  const [destShown,    setDestShown]    = useState(false)
  const [packetFiring, setPacketFiring] = useState(false)
  const [destLit,      setDestLit]      = useState(false)
  const [sentShown,    setSentShown]    = useState(false)
  const [timerSec,     setTimerSec]     = useState(0)

  const clearAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setStripShown(false)
    setShownBubbles(new Set())
    setCardShown(false)
    setShownItems(new Set())
    setTotalShown(false)
    setDestShown(false)
    setPacketFiring(false)
    setDestLit(false)
    setSentShown(false)
    setTimerSec(0)
  }, [clearAll])

  const schedule = useCallback((delay: number, fn: () => void) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
  }, [])

  const play = useCallback(() => {
    reset()
    setCycleKey((k) => k + 1)

    // ACT 1 — call strip + conversation
    schedule(T.STRIP_IN, () => {
      setStripShown(true)
      timerIntervalRef.current = window.setInterval(() => {
        setTimerSec((s) => s + 1)
      }, 1000)
    })

    const bubbleTimes = [T.BUBBLE_1, T.BUBBLE_2, T.BUBBLE_3, T.BUBBLE_4]
    BUBBLES.forEach((_, idx) => {
      schedule(bubbleTimes[idx], () => {
        setShownBubbles((prev) => {
          const next = new Set(prev)
          next.add(idx)
          return next
        })
      })
    })

    // ACT 2 — order composes below the transcript
    schedule(T.CARD, () => setCardShown(true))

    const itemTimes = [T.ITEM_1, T.ITEM_2, T.ITEM_3]
    ITEMS.forEach((_, idx) => {
      schedule(itemTimes[idx], () => {
        setShownItems((prev) => {
          const next = new Set(prev)
          next.add(idx)
          return next
        })
      })
    })

    schedule(T.TOTAL, () => setTotalShown(true))

    // ACT 3 — handoff
    schedule(T.DEST_IN, () => setDestShown(true))
    schedule(T.PACKET,  () => setPacketFiring(true))
    schedule(T.LAND,    () => setDestLit(true))
    schedule(T.SENT,    () => setSentShown(true))

    // Loop
    schedule(T.LOOP_AT, () => {
      if (inViewRef.current) play()
    })
  }, [reset, schedule])

  useEffect(() => {
    const node = screenRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!inViewRef.current) {
              inViewRef.current = true
              play()
            }
          } else {
            inViewRef.current = false
            clearAll()
          }
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      clearAll()
    }
  }, [play, clearAll])

  useEffect(() => () => clearAll(), [clearAll])

  return (
    <div
      ref={screenRef}
      className="phone-screen"
      role="region"
      aria-label="Live call demo — Jenna takes a pickup order and sends it to Toast"
    >
      {/* Active call strip */}
      <div
        key={`strip-${cycleKey}`}
        className={cn('call-strip', !stripShown && 'opacity-0')}
        aria-hidden="true"
      >
        <span className="call-strip-dot" />
        <span className="call-strip-label">Pickup Order</span>
        <span className="call-strip-sep">·</span>
        <span className="call-strip-name">{CALLER_NAME}</span>
        <span className="call-strip-timer">{formatTimer(timerSec)}</span>
      </div>

      {/* ACT 1 — conversation transcript. Stays visible for the rest
          of the cycle so owners can read the request alongside the
          order receipt below. */}
      <div
        key={`transcript-${cycleKey}`}
        className="call-transcript"
      >
        {BUBBLES.map((b, idx) => (
          <div
            key={`bubble-${cycleKey}-${idx}`}
            className={cn('call-row', b.side, shownBubbles.has(idx) && 'show')}
          >
            {b.side === 'caller' ? (
              <img
                className="call-avatar"
                src={CALLER_AVATAR}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
              />
            ) : (
              <div className="call-avatar call-avatar-jenna" aria-hidden="true">
                <span className="call-avatar-j">J</span>
              </div>
            )}
            <div className={cn('call-bubble', b.side)}>{b.text}</div>
          </div>
        ))}
      </div>

      {/* ACT 2 — order receipt card. Fades in BELOW the transcript
          after the convo wraps. Both stay on screen together. */}
      <div
        key={`card-${cycleKey}`}
        className={cn('order-card', cardShown && 'show')}
      >
        <div className="order-card-header">
          <span className="order-card-title">Order</span>
          <span className="order-card-number">{ORDER_NUMBER}</span>
        </div>

        <div className="order-card-rows">
          {ITEMS.map((item, idx) => (
            <div
              key={`item-${cycleKey}-${idx}`}
              className={cn('order-row', shownItems.has(idx) && 'show')}
            >
              <span className="order-row-emoji" aria-hidden="true">{item.emoji}</span>
              <span className="order-row-name">{item.name}</span>
              <span className="order-row-price">{item.price}</span>
            </div>
          ))}
        </div>

        <div className={cn('order-total', totalShown && 'show')}>
          <span className="order-total-label">Total</span>
          <span className="order-total-amount">{ORDER_TOTAL}</span>
        </div>
      </div>

      {/* ACT 3 — flying packet. The order-packet-deliver CSS keyframe
          handles fade-in → travel down → scale-down → fade-out. We
          only toggle the .fire class to trigger it. */}
      <div
        key={`packet-${cycleKey}`}
        className={cn('order-packet', packetFiring && 'fire')}
        aria-hidden="true"
      >
        <CheckIcon />
        Order {ORDER_NUMBER}
      </div>

      {/* ACT 3 — destination. Toast tile + sent pill, both hidden
          until DEST_IN (after the receipt is complete). The tile
          pops in with a spring overshoot, then lights up when the
          packet arrives. */}
      <div className="destination">
        <div
          key={`tile-${cycleKey}`}
          className={cn(
            'destination-tile',
            destShown && 'appeared',
            destLit && 'lit',
          )}
        >
          <img
            src="/assets/logos/pos/toast.png"
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
          />
        </div>
        <div
          key={`sent-${cycleKey}`}
          className={cn('destination-pill', sentShown && 'show')}
        >
          <CheckIcon />
          Sent to Toast
        </div>
      </div>
    </div>
  )
}
