import * as React from 'react'
import { ColorPanels } from '@paper-design/shaders-react'

// "Caller memory" shader visual on the bento memory card.
//
// Configuration mirrors cult-ui's hero-color-panel registry, also
// installed locally at @/components/ui/hero-color-panel.tsx — but
// the visuals it ships there (`HeroColorPanelsVisual` /
// `HeroColorPanelsMobileVisual`) are hero-shaped (fixed-height
// circle on desktop, absolute background blob on mobile) and don't
// fit a bento card. We re-use only the brand-tuned shader props
// here, plus the two pieces that make the canvas behave on iOS:
//   - explicit pixel `width`/`height` (stable canvas resolution)
//   - inline `style: { width: '100%', height: '100%' }`
//     (forces the wrapper to fill the bento parent, regardless of
//     aspect-ratio quirks on iOS Safari/Chrome).
const MemoColorPanels = React.memo(ColorPanels)

const SHADER_PROPS = {
  colors: ['#ed40b3', '#6ef7cc', '#adfa1e', '#b054de'],
  colorBack: '#ffffff00',
  density: 5.03,
  angle1: 0.68,
  angle2: 0.28,
  length: 1.13,
  edges: true,
  blur: 0.25,
  fadeIn: 0.85,
  fadeOut: 0.3,
  gradient: 0.56,
  speed: 4,
  scale: 0.96,
  rotation: 180,
} as const

export function ShaderCard() {
  return (
    <div className="memory-shader" aria-hidden="true">
      <MemoColorPanels
        {...SHADER_PROPS}
        width={1280}
        height={720}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
