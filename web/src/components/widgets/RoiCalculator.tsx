import { useMemo, useState } from 'react'

import { fmt, fmtMoney } from '@/lib/format'

// Section 5 — ROI calculator widget. Logic ported verbatim from
// /main.js (lines 392–477):
//   recovered = calls × missed% × ticket × CONVERT × DAYS
//   labor     = calls × CALL_MIN × DAYS × ($/hr ÷ 60)
//   jenna     = calls × CALL_MIN × DAYS × $0.60
//   net       = recovered + labor − jenna
//
// Native <input type="range"> kept for verbatim visual parity with
// the existing custom thumb/track CSS (.calc-range). Track fill
// percentage is driven via the --p custom property set inline.
//
// Migration plan §5 said this should be a shadcn Slider; staying
// native is a deliberate speed-vs-parity call — flagged in the
// Phase 2.6 commit message.

const DAYS = 30
const CALL_MIN = 2.5
const CONVERT = 0.5
const LABOR_HR = 20
const JENNA_RATE = 0.6

type RangeKey = 'calls' | 'missed' | 'ticket'

type RangeMeta = {
  min: number
  max: number
  step: number
}

const RANGES: Record<RangeKey, RangeMeta> = {
  calls:  { min: 10, max: 300, step: 5 },
  missed: { min: 5,  max: 60,  step: 1 },
  ticket: { min: 12, max: 120, step: 1 },
}

const pct = (key: RangeKey, value: number): string => {
  const r = RANGES[key]
  return `${((value - r.min) / (r.max - r.min)) * 100}%`
}

export function RoiCalculator() {
  const [calls, setCalls] = useState(50)
  const [missed, setMissed] = useState(22)
  const [ticket, setTicket] = useState(32)

  const compute = useMemo(() => {
    const m = missed / 100
    const recovered = calls * m * ticket * CONVERT * DAYS
    const labor = calls * CALL_MIN * DAYS * (LABOR_HR / 60)
    const jenna = calls * CALL_MIN * DAYS * JENNA_RATE
    const net = recovered + labor - jenna
    return { recovered, labor, jenna, net }
  }, [calls, missed, ticket])

  return (
    <div className="calc" id="calc">
      <div className="calc-glow" aria-hidden="true" />

      <div className="calc-result">
        <span className="calc-result-eyebrow">Estimated net savings</span>
        <div className="calc-figure" aria-live="polite">
          <span className="calc-currency">$</span>
          <span className="calc-amount" id="calcAmount">{fmt(compute.net)}</span>
          <span className="calc-period">/ mo</span>
        </div>
        <span className="calc-result-sub">based on the inputs below</span>
      </div>

      <div className="calc-inputs">
        <div className="calc-row" data-input="calls">
          <div className="calc-row-head">
            <label className="calc-row-label" htmlFor="rangeCalls">Calls per day</label>
            <span className="calc-row-value">{fmt(calls)}</span>
          </div>
          <input
            type="range"
            id="rangeCalls"
            className="calc-range"
            style={{ ['--p' as string]: pct('calls', calls) }}
            min={RANGES.calls.min}
            max={RANGES.calls.max}
            step={RANGES.calls.step}
            value={calls}
            onChange={(e) => setCalls(parseFloat(e.target.value))}
          />
          <div className="calc-row-foot">
            <span>{RANGES.calls.min}</span><span>{RANGES.calls.max}</span>
          </div>
        </div>

        <div className="calc-row" data-input="missed">
          <div className="calc-row-head">
            <label className="calc-row-label" htmlFor="rangeMissed">% of calls currently missed</label>
            <span className="calc-row-value"><span>{fmt(missed)}</span>%</span>
          </div>
          <input
            type="range"
            id="rangeMissed"
            className="calc-range"
            style={{ ['--p' as string]: pct('missed', missed) }}
            min={RANGES.missed.min}
            max={RANGES.missed.max}
            step={RANGES.missed.step}
            value={missed}
            onChange={(e) => setMissed(parseFloat(e.target.value))}
          />
          <div className="calc-row-foot">
            <span>{RANGES.missed.min}%</span><span>{RANGES.missed.max}%</span>
          </div>
        </div>

        <div className="calc-row" data-input="ticket">
          <div className="calc-row-head">
            <label className="calc-row-label" htmlFor="rangeTicket">Average order ticket</label>
            <span className="calc-row-value">$<span>{fmt(ticket)}</span></span>
          </div>
          <input
            type="range"
            id="rangeTicket"
            className="calc-range"
            style={{ ['--p' as string]: pct('ticket', ticket) }}
            min={RANGES.ticket.min}
            max={RANGES.ticket.max}
            step={RANGES.ticket.step}
            value={ticket}
            onChange={(e) => setTicket(parseFloat(e.target.value))}
          />
          <div className="calc-row-foot">
            <span>${RANGES.ticket.min}</span><span>${RANGES.ticket.max}</span>
          </div>
        </div>
      </div>

      <div className="calc-breakdown" aria-label="Math breakdown">
        <div className="calc-line">
          <span className="calc-line-label">
            <span className="calc-line-sign sign-pos">+</span>
            Missed orders recovered
          </span>
          <span className="calc-line-amount">{fmtMoney(compute.recovered)}</span>
        </div>
        <div className="calc-line">
          <span className="calc-line-label">
            <span className="calc-line-sign sign-pos">+</span>
            Front-desk hours returned
          </span>
          <span className="calc-line-amount">{fmtMoney(compute.labor)}</span>
        </div>
        <div className="calc-line">
          <span className="calc-line-label">
            <span className="calc-line-sign sign-neg">−</span>
            Jenna runtime · 60¢/min
          </span>
          <span className="calc-line-amount">{fmtMoney(compute.jenna)}</span>
        </div>
        <div className="calc-line calc-line-total">
          <span className="calc-line-label">
            <span className="calc-line-sign">=</span>
            Net savings per month
          </span>
          <span className="calc-line-amount calc-line-amount-total">{fmtMoney(compute.net)}</span>
        </div>
      </div>

      <p className="calc-note">
        Assumes ~2.5 min average call, 50% of missed callers convert to an order when answered, and $20/hr loaded labor cost. Adjust the sliders — Jenna's cost adjusts with you.
      </p>
    </div>
  )
}
