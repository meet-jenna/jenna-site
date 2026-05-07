// Section 2 — "What Jenna does" bento grid. Markup mirrors
// /index.html lines 206–420. The memory card's WebGL shader is
// stubbed for now (only the CSS conic-gradient fallback renders);
// the real <ShaderCard> mounts in Phase 2.10.

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
        <article className="bento-card bento-1x" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4h3l2 5-2.5 1.5a11 11 0 005.5 5.5L14.5 13.5 19.5 16v3a2 2 0 01-2 2A14 14 0 014 6.5a2 2 0 012-2.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="card-title">Answers every call</h3>
          <p className="card-body">Day, night, weekends, holidays. Jenna picks up before the second ring — every time.</p>
          <div className="card-clock" aria-hidden="true">
            <span>24</span>
            <span className="card-clock-divider">/</span>
            <span>7</span>
          </div>
        </article>

        <article className="bento-card bento-3x bento-feature" role="listitem">
          <div className="card-tag">
            <span className="card-tag-dot" />
            POS Integration
          </div>
          <h3 className="card-title">Takes orders straight into your POS.</h3>
          <p className="card-body">No manual entry. No missed tickets. Orders land hot and ready, the moment Jenna hangs up.</p>

          {/* Mini POS ticket */}
          <div className="pos-ticket" aria-hidden="true">
            <div className="pos-head">
              <span className="pos-store">MARCO'S · Order #4421</span>
              <span className="pos-time">7:42 PM</span>
            </div>
            <ul className="pos-items">
              <li><span>1 ×</span><span>Large Pepperoni</span><span>$18.00</span></li>
              <li><span>1 ×</span><span>Caesar Salad</span><span>$10.40</span></li>
              <li className="pos-typing">
                <span>1 ×</span>
                <span>Garlic Knots <i className="cursor-blink" /></span>
                <span className="pos-pending">…</span>
              </li>
            </ul>
            <div className="pos-foot">
              <span className="pos-status">
                <span className="status-dot status-dot-live" aria-hidden="true" />
                Live · Pushing to Toast
              </span>
              <span className="pos-total">$28.40</span>
            </div>
          </div>
        </article>

        {/* Row 2 */}
        <article className="bento-card bento-2x bento-feature" role="listitem">
          <div className="card-tag">
            <span className="card-tag-dot" />
            No busy signal — ever
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
              {/* Phase 2.10 mounts the @paper-design/shaders canvas here. */}
              <div className="memory-shader" id="memoryShader" />
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
              <li className="memory-profile">
                <div className="memory-profile-avatar" data-tone="violet">J</div>
                <div className="memory-profile-meta">
                  <div className="memory-profile-name">Jenna Kim</div>
                  <div className="memory-profile-note">gluten-free · always orders tiramisu · tips 22%</div>
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
          <h3 className="card-title">Sends SMS confirmations.</h3>
          <p className="card-body">Every order, every time. Callers get a text the moment they hang up.</p>

          <figure className="sms-screenshot" aria-hidden="true">
            <img
              src="/assets/screenshots/sms-confirmation.png"
              alt="Text from Jenna: Hi Anthony, here's your order at Vito's Northport — Chicken Marsala with mixed vegetables, 6 garlic knots, Round pepperoni pie. — Jenna"
              width={901}
              height={621}
              decoding="async"
            />
          </figure>
        </article>

        <article className="bento-card bento-2x" role="listitem">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.5" />
              <rect x="6.5" y="13" width="3" height="2" rx="0.5" fill="currentColor" />
            </svg>
          </div>
          <h3 className="card-title">Processes payments by phone.</h3>
          <p className="card-body">Securely, hands-off. Your team never touches a card.</p>

          <div className="pay-row" aria-hidden="true">
            <div className="pay-card">
              <div className="pay-card-num">•••• 4242</div>
              <div className="pay-card-tag">VISA</div>
            </div>
            <div className="pay-status">
              <span className="status-dot status-dot-live" aria-hidden="true" />
              Encrypted
            </div>
          </div>
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

          <div className="transfer-chip" aria-hidden="true">
            <span className="transfer-from">Caller</span>
            <span className="transfer-arrow">→</span>
            <span className="transfer-msg">"Vendor about Friday delivery"</span>
            <span className="transfer-arrow">→</span>
            <span className="transfer-to">Manager</span>
          </div>
        </article>
      </div>
    </section>
  )
}
