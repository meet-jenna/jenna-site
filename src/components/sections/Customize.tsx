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
    </section>
  )
}
