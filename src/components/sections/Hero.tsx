import { ArrowUpRight } from 'lucide-react'
import { Iphone } from '@/components/ui/iphone'
import { HeroOrbit } from '@/components/widgets/HeroOrbit'
import { PhoneScreen } from '@/components/widgets/PhoneScreen'

// Hero — split layout. Desktop puts the copy column (title, sub, CTA,
// trust row) left and the iPhone mockup with the live PhoneScreen demo
// right. Below the lg breakpoint the layout collapses to a single column
// so the iPhone sits below the copy on tablet / mobile.
//
// The iPhone graphic is the Magic UI mockup (src/components/ui/iphone.tsx),
// extended with a `children` slot so the PhoneScreen widget renders inside
// the screen-punch area in the same coordinates the image/video overlay
// uses. The bezel + dynamic island stay above the screen content via the
// SVG layer for that real-iPhone "island floats over the app" feel.
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-backdrop-glow" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1
            id="hero-title"
            className="hero-title animate-fade-in motion-reduce:animate-none"
            style={{ animationDelay: '0ms' }}
          >
            The <em>AI Hostess</em><br />
            for Every Restaurant.
          </h1>

          <p
            className="hero-sub animate-fade-in motion-reduce:animate-none"
            style={{ animationDelay: '80ms' }}
          >
            Jenna connects to your phone and
            <br />
            handles every call, start to finish.
          </p>

          <div
            className="hero-cta animate-fade-in motion-reduce:animate-none"
            style={{ animationDelay: '160ms' }}
          >
            <a className="btn btn-primary nav-cta" href="#book">
              Book a demo
              <ArrowUpRight className="nav-cta-icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          className="hero-phone animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '240ms' }}
        >
          <Iphone className="hero-phone-iphone">
            <PhoneScreen />
          </Iphone>
          <HeroOrbit />
        </div>
      </div>
    </section>
  )
}
