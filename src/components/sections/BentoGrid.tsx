import { PosIntegrationDiagram } from '@/components/widgets/PosIntegrationDiagram'
import { ShaderCard } from '@/components/widgets/ShaderCard'
import { SmsAnimatedList } from '@/components/widgets/SmsAnimatedList'

// Section 2 — "What Jenna does" bento grid. Markup mirrors
// /index.html lines 206–420. The memory card's WebGL shader mounts
// via <ShaderCard /> (Phase 2.10); the CSS conic-gradient fallback
// shows briefly before the shader's `data-mounted="true"` fades it.

export function BentoGrid() {
  return (
    <section id="how" className="features" aria-labelledby="features-title">
      <div className="features-bg" aria-hidden="true">
        <div className="features-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">What Jenna does</span>
        <h2 id="features-title" className="section-title">
          One Hostess. Every Call.<br />
          <em>Every Hour.</em>
        </h2>
        <p className="section-sub">
          Jenna handles the entire phone experience your restaurant can't afford to drop.
        </p>
      </header>

      <div className="bento" role="list">
        {/* Row 1 */}
        <article className="bento-card bento-4x bento-feature" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="8" y="6" width="8" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 14.5h8M8 17.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="card-title">Takes orders straight into your POS.</h3>
          <p className="card-body">No manual entry. No missed tickets. Orders land hot and ready, the moment Jenna hangs up.</p>

          <PosIntegrationDiagram />
        </article>

        {/* Row 2 */}
        <article className="bento-card bento-2x bento-feature" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6.5 14.5c-1.94 0-3.5-1.57-3.5-3.5s1.56-3.5 3.5-3.5c2.83 0 5.67 7 8.5 7 1.94 0 3.5-1.57 3.5-3.5s-1.56-3.5-3.5-3.5c-2.83 0-5.67 7-8.5 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="card-title">Handles unlimited calls at once.</h3>
          <p className="card-body">Friday rush, holiday weekend, brunch. Every line is Jenna. Every caller gets answered.</p>

          {/* Multi-line visualization */}
          <div className="lines" aria-hidden="true">
            <div className="line">
              <div className="line-name">Line 01</div>
              <div className="line-wave">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="line-time">0:42</div>
            </div>
            <div className="line">
              <div className="line-name">Line 02</div>
              <div className="line-wave">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="line-time">1:18</div>
            </div>
            <div className="line">
              <div className="line-name">Line 03</div>
              <div className="line-wave">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="line-time">0:09</div>
            </div>
            <div className="line line-more">
              <div className="line-name">Line 04 — 12</div>
              <div className="line-wave">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="line-time">+9</div>
            </div>
          </div>
        </article>

        {/* Row 3 — Memory card (shader stubbed; real mount lands in 2.10) */}
        <article className="bento-card bento-2x bento-memory bento-feature" role="listitem">
          <div className="card-icon memory-folder-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7.5a2 2 0 0 1 2-2h4.2a1.5 1.5 0 0 1 1.05.43l1.5 1.45a1.5 1.5 0 0 0 1.05.43H19a2 2 0 0 1 2 2v8.7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M3.5 11h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="card-title">Remembers every caller.</h3>
          <p className="card-body">Their name. Their orders. Their preferences. Year after year.</p>

          <div className="memory-split">
            <div className="memory-visual" aria-hidden="true">
              <ShaderCard />
              <div className="memory-visual-fallback" />
              <div className="memory-visual-vignette" />
              <div className="memory-visual-label">
                <span className="memory-visual-dot" />
                <span>Caller memory · live</span>
              </div>
            </div>

            <ul className="memory-profiles" aria-label="Returning callers">
              <li className="memory-profile">
                <div className="memory-profile-avatar" data-tone="pink">M</div>
                <div className="memory-profile-meta">
                  <div className="memory-profile-name">Mark Devlin</div>
                  <div className="memory-profile-note">4th visit · large pepperoni · no olives</div>
                </div>
                <span className="memory-profile-pulse" aria-hidden="true" />
              </li>
              <li className="memory-profile">
                <div className="memory-profile-avatar" data-tone="teal">S</div>
                <div className="memory-profile-meta">
                  <div className="memory-profile-name">Sara Patel</div>
                  <div className="memory-profile-note">12th visit · vegan · usually Sunday 6pm</div>
                </div>
              </li>
              <li className="memory-profile">
                <div className="memory-profile-avatar" data-tone="lime">T</div>
                <div className="memory-profile-meta">
                  <div className="memory-profile-name">Tom Russo</div>
                  <div className="memory-profile-note">birthday Aug 14 · prefers booth · party of 6</div>
                </div>
              </li>
            </ul>
          </div>
        </article>

        <article className="bento-card bento-2x" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 10h7M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="card-title">Sends automated texts.</h3>
          <p className="card-body">Order review, confirmations, reservations and more.</p>

          <SmsAnimatedList />
        </article>

        <article className="bento-card bento-2x" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12h12m0 0l-4-4m4 4l-4 4M16 6h4v12h-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="card-title">Transfers calls the right way.</h3>
          <p className="card-body">She tells you who's calling and why before handing it over.</p>

          <div className="handoff-card" aria-hidden="true">
            <div className="handoff-call">
              <div className="handoff-avatar">V</div>
              <div className="handoff-meta">
                <div className="handoff-label">Incoming call</div>
                <div className="handoff-name">Vendor: Friday delivery</div>
              </div>
              <div className="handoff-status">
                <span className="status-dot status-dot-live" />
                Screened
              </div>
            </div>

            <div className="handoff-summary">
              <div className="handoff-summary-label">Jenna brief</div>
              <p>"Asking if the manager can confirm tomorrow's produce drop."</p>
              <div className="handoff-tags">
                <span>Vendor</span>
                <span>Delivery</span>
                <span>Needs manager</span>
              </div>
            </div>

            <div className="handoff-route">
              <span className="handoff-route-from">Jenna</span>
              <span className="handoff-route-line" />
              <span className="handoff-route-to">Manager ready</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
