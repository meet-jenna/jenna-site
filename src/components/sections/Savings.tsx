import { RoiCalculator } from '@/components/widgets/RoiCalculator'

// Section 5 — Savings (ROI). Markup mirrors /index.html lines 948–1110.

export function Savings() {
  return (
    <section id="savings" className="savings" aria-labelledby="savings-title">
      <div className="savings-bg" aria-hidden="true">
        <div className="savings-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">What you save</span>
        <h2 id="savings-title" className="section-title">
          The Math <em>Works.</em>
        </h2>
        <p className="section-sub">
          Jenna pays for herself in the calls your team is already missing. Plug in your numbers — watch the math work.
        </p>
      </header>

      <RoiCalculator />
    </section>
  )
}
