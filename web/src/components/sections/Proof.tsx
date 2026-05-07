import { AudioDemo } from '@/components/widgets/AudioDemo'

// Section 3 — Proof. Markup mirrors /index.html lines 425–535.

export function Proof() {
  return (
    <section id="proof" className="proof" aria-labelledby="proof-title">
      <div className="proof-bg" aria-hidden="true">
        <div className="proof-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">Trained on your menu</span>
        <h2 id="proof-title" className="section-title">
          Trained On Your Menu.<br />
          <em>Built To Win.</em>
        </h2>
        <p className="section-sub">
          Jenna is trained on the exact menu in your POS — so she knows it better than the person you hired last month.
        </p>
      </header>

      <AudioDemo />

      <div className="stats" role="list">
        <div className="stat" role="listitem">
          <div className="stat-num"><em>95</em><span className="stat-unit">%</span></div>
          <div className="stat-label">Order accuracy</div>
          <p className="stat-detail">
            Tickets land in the POS as Jenna heard them — names, modifiers, sides, allergies.
          </p>
        </div>

        <div className="stat" role="listitem">
          <div className="stat-num"><em>99</em><span className="stat-unit">%</span></div>
          <div className="stat-label">Reservations · transfers · questions</div>
          <p className="stat-detail">
            First-try resolution. No "let me put you on hold." No misroutes.
          </p>
        </div>

        <div className="stat stat-feature" role="listitem">
          <div className="stat-num"><em>17</em><span className="stat-unit">%</span></div>
          <div className="stat-label">Of callers can spot the AI</div>
          <p className="stat-detail">
            Most have a full conversation thinking they're talking to your hostess. They aren't.
          </p>
        </div>
      </div>

      <p className="manifesto">
        Never sick. <em>Never on break.</em> Never misses a call.
      </p>
    </section>
  )
}
