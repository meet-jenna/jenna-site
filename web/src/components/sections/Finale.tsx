// Section 7 — Final CTA. Markup mirrors /index.html lines 1212–1266.
// Uses the unified .btn .btn-primary filled treatment + .btn-finale
// size override.

export function Finale() {
  return (
    <section id="book" className="finale" aria-labelledby="finale-title">
      <div className="finale-bg" aria-hidden="true">
        <div className="finale-glow finale-glow-a" />
        <div className="finale-glow finale-glow-b" />
      </div>

      <div className="finale-inner">
        <span className="eyebrow">The last word</span>

        <h2 id="finale-title" className="finale-title">
          See Jenna Handle<br />
          Your Menu — <em>Live.</em>
        </h2>

        <div className="finale-promise">
          <span className="finale-promise-badge">
            <span className="finale-promise-dot" aria-hidden="true" />
            Risk-free demo
          </span>
          <p className="finale-promise-text">
            Book a 15-minute demo. We'll show you Jenna taking real calls, real orders, on a real menu. <em>If she's not better than what you've got, walk away.</em>
          </p>
        </div>

        <a className="btn btn-primary btn-finale" href="#book">
          Book my demo
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

        <ul className="finale-trust" aria-label="Demo includes">
          <li>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Free
          </li>
          <li>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            15 minutes
          </li>
          <li>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Your real menu
          </li>
          <li>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No sales pitch
          </li>
        </ul>
      </div>
    </section>
  )
}
