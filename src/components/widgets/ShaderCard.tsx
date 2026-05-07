import { useEffect, useRef } from 'react'

import type { PaperShaderElement } from '@paper-design/shaders'
import { ColorPanels } from '@paper-design/shaders-react'

// "Caller memory" shader visual on the bento memory card.
// Uses the official @paper-design/shaders-react <ColorPanels /> wrapper
// (same component cult-ui's hero-color-panel registry uses) so the RAF
// loop, ResizeObserver, and visibility handling are managed for us —
// fixes the stuttery/frozen animation we hit when driving ShaderMount
// directly inside an `isolate; overflow:hidden` parent.
//
// Props mirror the cult-ui HeroColorPanels desktop preset 1:1.

export function ShaderCard() {
  const hostRef = useRef<PaperShaderElement>(null)

  // Flip data-mounted="true" after the wrapper renders so the existing
  // CSS rule (.memory-shader[data-mounted="true"] ~ .memory-visual-fallback)
  // fades the conic-gradient fallback out. If WebGL fails on the device
  // the canvas is missing and the fallback stays visible.
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const id = window.requestAnimationFrame(() => {
      if (host.querySelector('canvas')) {
        host.dataset.mounted = 'true'
      }
    })
    return () => {
      window.cancelAnimationFrame(id)
      delete host.dataset.mounted
    }
  }, [])

  return (
    <ColorPanels
      ref={hostRef}
      id="memoryShader"
      className="memory-shader"
      colors={['#ed40b3', '#6ef7cc', '#adfa1e', '#b054de']}
      colorBack="#ffffff00"
      density={5.03}
      angle1={0.68}
      angle2={0.28}
      length={1.13}
      edges
      blur={0.25}
      fadeIn={0.85}
      fadeOut={0.3}
      gradient={0.56}
      speed={4}
      fit="contain"
      scale={0.96}
      rotation={180}
    />
  )
}
