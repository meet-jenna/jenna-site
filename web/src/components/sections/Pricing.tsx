// Section 6 — Pricing (receipt). Markup mirrors /index.html lines 1115–1207.
// CTA promoted to the unified .btn-primary filled treatment (was the
// neutral .btn-primary back when that meant surface-2 — same class name,
// new fill from Phase 2.1's button rebuild).

export function Pricing() {
  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="pricing-bg" aria-hidden="true">
        <div className="pricing-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">Pricing</span>
        <h2 id="pricing-title" className="section-title">
          60¢ Per Minute. <em>That's It.</em>
        </h2>
        <p className="section-sub">
          No flat fees. No per-call charges. No contracts. You only pay for the time Jenna is actually on the phone.
        </p>
      </header>

      <div className="receipt" aria-label="Itemized pricing">
        <div className="receipt-glow" aria-hidden="true" />

        <header className="receipt-head">
          <div className="receipt-tag">
            <span className="receipt-tag-dot" aria-hidden="true" />
            Your monthly bill — line by line
          </div>
          <div className="receipt-meta">Marco's Pizzeria · March</div>
        </header>

        <ul className="receipt-lines">
          <li className="receipt-line receipt-line-charge">
            <span className="receipt-label">Time Jenna is on the phone</span>
            <span className="receipt-value">
              <em>60¢</em>
              <span className="receipt-unit">/ min</span>
            </span>
          </li>

          <li className="receipt-line receipt-line-zero">
            <span className="receipt-label">Setup fee</span>
            <span className="receipt-value"><span className="receipt-zero">—</span></span>
          </li>
          <li className="receipt-line receipt-line-zero">
            <span className="receipt-label">Per-call surcharge</span>
            <span className="receipt-value"><span className="receipt-zero">—</span></span>
          </li>
          <li className="receipt-line receipt-line-zero">
            <span className="receipt-label">Monthly minimum</span>
            <span className="receipt-value"><span className="receipt-zero">—</span></span>
          </li>
          <li className="receipt-line receipt-line-zero">
            <span className="receipt-label">Contract lock-in</span>
            <span className="receipt-value"><span className="receipt-zero">none</span></span>
          </li>
          <li className="receipt-line receipt-line-zero">
            <span className="receipt-label">Cancellation penalty</span>
            <span className="receipt-value"><span className="receipt-zero">—</span></span>
          </li>

          <li className="receipt-line receipt-line-total">
            <span className="receipt-label">Total</span>
            <span className="receipt-value">
              <em>60¢</em>
              <span className="receipt-unit">× minutes on call</span>
            </span>
          </li>
        </ul>

        <p className="receipt-foot">
          Most restaurants land between <strong>$1,000–$3,000 / month</strong> — less than one part-time hostess, and Jenna covers every shift.
        </p>
      </div>

      <div className="pricing-cta">
        <a className="btn btn-primary btn-lg" href="#book">
          Book a demo
          <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10m0 0L9 4m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className="pricing-cta-note">15 minutes. Real menu. Real calls.</span>
      </div>
    </section>
  )
}
