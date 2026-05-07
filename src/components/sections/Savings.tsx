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

      <div className="benefits">
        <article className="benefit">
          <div className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h3 className="benefit-title">Cut front-desk labor costs.</h3>
          <p className="benefit-body">Phones don't need a person anymore. Your team works the room.</p>
        </article>

        <article className="benefit">
          <div className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7l8 6 8-6M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l8-4 8 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="benefit-title">Recover missed orders.</h3>
          <p className="benefit-body">Every unanswered call is lost revenue. Jenna catches them all.</p>
        </article>

        <article className="benefit">
          <div className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M3 19a6 6 0 0112 0M14 19a5 5 0 017-4.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="benefit-title">Free up your staff.</h3>
          <p className="benefit-body">Less interruption. More attention on the guests in front of them.</p>
        </article>
      </div>
    </section>
  )
}
