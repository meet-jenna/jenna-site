import * as React from 'react'
import { ColorPanels } from '@paper-design/shaders-react'

// "Caller memory" shader visual on the bento memory card.
//
// Brand-tuned shader props mirror cult-ui's hero-color-panel
// registry (also installed at @/components/ui/hero-color-panel.tsx).
// The cult-ui *mobile* variant is the right reference for a
// free-form container like a bento card:
//   - no explicit `width`/`height` props (those get applied as CSS
//     on the wrapper and force the canvas to overflow narrow
//     parents)
//   - inline `style: { width: '100%', height: '100%' }` so the
//     wrapper fills its parent on every device
//   - `fit="contain"` so the panels scale to the canvas box
//     regardless of its aspect ratio.
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
  fit: 'contain',
} as const

export function ShaderCard() {
  return (
    <div className="memory-shader" aria-hidden="true">
      <MemoColorPanels
        {...SHADER_PROPS}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
