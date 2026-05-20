import { useEffect, useRef, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

// Section 4 — Configure-Jenna panel.
//   - Tabs: Radix UI (real keyboard a11y; data-state="active" replaces
//     the vanilla aria-selected="true" — CSS already updated in
//     index.css to match Radix's contract).
//   - Switches: native <input type="checkbox"> with the existing
//     adjacent-sibling CSS (works perfectly, no Radix swap needed).
//   - Day pills, voice picker, stepper: small useState + plain buttons
//     using existing class names + .is-on / .is-selected modifiers.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

type DayName = (typeof DAYS)[number]

const VOICES = [
  { id: 'warm',     name: 'Warm',     tag: 'Casual neighborhood spot · Default' },
  { id: 'crisp',    name: 'Crisp',    tag: 'Fine dining · Boutique' },
  { id: 'bright',   name: 'Bright',   tag: 'Brunch spot · Cafe' },
  { id: 'polished', name: 'Polished', tag: 'Hotel · Steakhouse' },
] as const

type VoiceId = (typeof VOICES)[number]['id']

type TabId = 'schedule' | 'upsells' | 'transfers' | 'voice'

const VoiceCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function ConfigPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('schedule')
  const [activeDays, setActiveDays] = useState<Set<DayName>>(
    new Set<DayName>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
  )
  const [is247, setIs247] = useState(false)
  const [rings, setRings] = useState(2)
  const [upsells, setUpsells] = useState({
    special: true,
    addon: true,
    wine: true,
    loyalty: false,
  })
  const [voice, setVoice] = useState<VoiceId>('warm')
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const tabShellRef = useRef<HTMLDivElement | null>(null)

  // On mobile the tab strip turns into a horizontal scroller. When the
  // user activates a tab, center it inside the strip so labels like
  // "Transfer rules" / "Voice & personality" aren't clipped at the
  // right edge. Scroll the tab list directly instead of using
  // scrollIntoView so the page's vertical scroll position isn't
  // affected.
  useEffect(() => {
    const list = tabListRef.current
    if (!list) return
    if (list.scrollWidth <= list.clientWidth) return
    const active = list.querySelector<HTMLElement>('[data-state="active"]')
    if (!active) return
    const listRect = list.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    const delta =
      activeRect.left - listRect.left - (listRect.width - activeRect.width) / 2
    list.scrollTo({ left: list.scrollLeft + delta, behavior: 'smooth' })
  }, [activeTab])

  // Track the scroll position of the mobile tab strip so the CSS edge
  // fade only appears where there's actually more content. This makes
  // the clipped tab labels read as an intentional "scroll for more"
  // affordance instead of a layout bug on first paint.
  useEffect(() => {
    const list = tabListRef.current
    const shell = tabShellRef.current
    if (!list || !shell) return

    const update = () => {
      const max = list.scrollWidth - list.clientWidth
      if (max <= 1) {
        shell.dataset.scroll = 'none'
        return
      }
      const x = list.scrollLeft
      if (x <= 1) shell.dataset.scroll = 'start'
      else if (x >= max - 1) shell.dataset.scroll = 'end'
      else shell.dataset.scroll = 'middle'
    }

    update()
    list.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      list.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const toggleDay = (day: DayName) =>
    setActiveDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })

  const adjustRings = (delta: 1 | -1) =>
    setRings((r) => Math.min(6, Math.max(1, r + delta)))

  return (
    <Tabs.Root
      asChild
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabId)}
      orientation="vertical"
    >
      <div className="config" id="config">
        <div className="config-glow" aria-hidden="true" />

        <div className="config-tabs-shell" ref={tabShellRef}>
          <Tabs.List
            ref={tabListRef}
            className="config-tabs"
            aria-label="Jenna configuration"
          >
            <div className="config-rail-head">
              <span className="config-rail-dot" aria-hidden="true" />
              Configure Jenna
            </div>
            <Tabs.Trigger className="config-tab" value="schedule">
              <span className="tab-num">01</span>
              <span className="tab-meta">
                <span className="tab-name">Schedule</span>
                <span className="tab-hint">When Jenna picks up</span>
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger className="config-tab" value="upsells">
              <span className="tab-num">02</span>
              <span className="tab-meta">
                <span className="tab-name">Upsells</span>
                <span className="tab-hint">Specials, add-ons, promos</span>
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger className="config-tab" value="transfers">
              <span className="tab-num">03</span>
              <span className="tab-meta">
                <span className="tab-name">Transfer rules</span>
                <span className="tab-hint">When, why, to who</span>
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger className="config-tab" value="voice">
              <span className="tab-num">04</span>
              <span className="tab-meta">
                <span className="tab-name">Voice &amp; personality</span>
                <span className="tab-hint">Match your brand</span>
              </span>
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <div className="config-panels">
          <Tabs.Content className="config-panel" value="schedule">
            <div className="panel-head">
              <h3 className="panel-title">Set her schedule.</h3>
              <p className="panel-body">
                24/7, certain days, certain hours, or only after a set number of rings. You decide when Jenna answers.
              </p>
            </div>

            <div className="panel-control">
              <div className="control-label">Available days</div>
              <div className="day-pills">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={cn('day-pill', activeDays.has(day) && 'is-on')}
                    onClick={() => toggleDay(day)}
                    aria-pressed={activeDays.has(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel-control">
              <div className="control-label">Hours</div>
              <div className="hour-row">
                <div className="time-input">
                  <span className="time-input-label">Open</span>
                  <span className="time-input-value">11:00 AM</span>
                </div>
                <span className="hour-divider">→</span>
                <div className="time-input">
                  <span className="time-input-label">Close</span>
                  <span className="time-input-value">11:00 PM</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={is247}
                    onChange={(e) => setIs247(e.target.checked)}
                  />
                  <span className="switch-track"><span className="switch-thumb" /></span>
                  <span className="switch-label">24/7</span>
                </label>
              </div>
            </div>

            <div className="panel-control">
              <div className="control-label">Pick up after</div>
              <div className="stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Decrease"
                  onClick={() => adjustRings(-1)}
                >
                  −
                </button>
                <span className="stepper-value"><span data-stepper-value>{rings}</span> rings</span>
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Increase"
                  onClick={() => adjustRings(1)}
                >
                  +
                </button>
              </div>
              <p className="control-hint">Let your team try first. Jenna catches what they miss.</p>
            </div>
          </Tabs.Content>

          <Tabs.Content className="config-panel" value="upsells">
            <div className="panel-head">
              <h3 className="panel-title">Program her upsells.</h3>
              <p className="panel-body">
                Specials, add-ons, promotions — all on autopilot. Jenna offers them at the right moment in the conversation.
              </p>
            </div>

            <ul className="upsell-list">
              {[
                { key: 'special' as const, tag: "Tonight's special",  text: '"Try the truffle mushroom — it\'s a fan favorite."' },
                { key: 'addon'   as const, tag: 'Add-on prompt',      text: 'Suggest a Caesar or knots when ticket < $25.' },
                { key: 'wine'    as const, tag: 'Wine pairing',       text: 'Mention the house red on entrée orders.' },
                { key: 'loyalty' as const, tag: 'Loyalty',            text: '"Want to join the rewards list? It\'s free."' },
              ].map((row) => (
                <li className="upsell-item" key={row.key}>
                  <div className="upsell-meta">
                    <span className="upsell-tag">{row.tag}</span>
                    <span className="upsell-text">{row.text}</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={upsells[row.key]}
                      onChange={(e) =>
                        setUpsells((prev) => ({ ...prev, [row.key]: e.target.checked }))
                      }
                    />
                    <span className="switch-track"><span className="switch-thumb" /></span>
                  </label>
                </li>
              ))}
            </ul>
          </Tabs.Content>

          <Tabs.Content className="config-panel" value="transfers">
            <div className="panel-head">
              <h3 className="panel-title">Define her transfer rules.</h3>
              <p className="panel-body">
                When, why, and to who. She tells you who's calling and why before handing it over.
              </p>
            </div>

            <ul className="rule-list">
              {[
                { when: 'Caller asks about catering',          initial: 'J', name: 'John Marino',  role: 'General Manager' },
                { when: 'Caller asks about allergies or dietary', initial: 'S', name: 'Sarah Reyes',  role: 'Head Chef' },
                { when: 'Complaint or refund request',         initial: 'M', name: 'Matthew Cole', role: 'Owner' },
              ].map((rule) => (
                <li className="rule" key={rule.when}>
                  <div className="rule-when">
                    <span className="rule-label">When</span>
                    <span className="rule-value">{rule.when}</span>
                  </div>
                  <span className="rule-arrow">→</span>
                  <div className="rule-to">
                    <div className="rule-avatar">{rule.initial}</div>
                    <div className="rule-target">
                      <span>{rule.name}</span>
                      <small>{rule.role}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Tabs.Content>

          <Tabs.Content className="config-panel" value="voice">
            <div className="panel-head">
              <h3 className="panel-title">Choose her voice and personality.</h3>
              <p className="panel-body">
                Match your brand. Warm corner spot or crisp uptown bistro — Jenna sounds like the kind of place yours is.
              </p>
            </div>

            <div className="voice-grid" role="radiogroup" aria-label="Voice options">
              {VOICES.map((v) => {
                const selected = voice === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={cn('voice-card', selected && 'is-selected')}
                    onClick={() => setVoice(v.id)}
                  >
                    <div className="voice-card-head">
                      <span className="voice-name">{v.name}</span>
                      <span className="voice-check" aria-hidden="true">
                        <VoiceCheckIcon />
                      </span>
                    </div>
                    <div className="voice-wave">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} />
                      ))}
                    </div>
                    <div className="voice-tag">{v.tag}</div>
                  </button>
                )
              })}
            </div>
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  )
}
