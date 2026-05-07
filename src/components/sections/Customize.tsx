import { ConfigPanel } from '@/components/widgets/ConfigPanel'

// Section 4 — Customize. Markup mirrors /index.html lines 540–942.

export function Customize() {
  return (
    <section id="customize" className="customize" aria-labelledby="customize-title">
      <div className="customize-bg" aria-hidden="true">
        <div className="customize-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">Built around your restaurant</span>
        <h2 id="customize-title" className="section-title">
          Fully Customized.<br />
          <em>Fully Yours.</em>
        </h2>
        <p className="section-sub">
          You tell us how Jenna behaves. We build her around your restaurant — not the other way around.
        </p>
      </header>

      <ConfigPanel />

      <div className="promises">
        <article className="promise">
          <div className="promise-head">
            <span className="promise-eyebrow">Setup</span>
            <h3 className="promise-title">
              Live in <em>about two weeks.</em>
            </h3>
          </div>

          <ol className="timeline" aria-label="Setup timeline">
            <li className="timeline-step is-done">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-day">Day 0</span>
                <span className="timeline-text">Kickoff call</span>
              </div>
            </li>
            <li className="timeline-step is-done">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-day">Day 4</span>
                <span className="timeline-text">Menu trained</span>
              </div>
            </li>
            <li className="timeline-step is-done">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-day">Day 9</span>
                <span className="timeline-text">Voice tuned</span>
              </div>
            </li>
            <li className="timeline-step is-current">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-day">Day 14</span>
                <span className="timeline-text">Live on your line</span>
              </div>
            </li>
          </ol>
        </article>

        <article className="promise">
          <div className="promise-head">
            <span className="promise-eyebrow">Integration</span>
            <h3 className="promise-title">
              Plugs into <em>your existing line.</em>
            </h3>
          </div>

          <div className="forward-flow" aria-hidden="true">
            <div className="forward-card">
              <div className="forward-label">Your business line</div>
              <div className="forward-number">(212) 555-0142</div>
            </div>
            <div className="forward-arrow">
              <span />
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <small>Forwarded</small>
            </div>
            <div className="forward-card forward-card-jenna">
              <div className="forward-label">Answers</div>
              <div className="forward-jenna">
                <span className="forward-jenna-avatar">
                  <span className="forward-jenna-dot" />
                </span>
                Jenna
              </div>
            </div>
          </div>

          <p className="promise-note">
            Nothing changes on your end. No hardware. No new number. No retraining your team.
          </p>
        </article>
      </div>
    </section>
  )
}
