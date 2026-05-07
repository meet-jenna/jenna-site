import { useEffect, useRef } from 'react'

import {
  ShaderMount,
  colorPanelsFragmentShader,
  getShaderColorFromString,
} from '@paper-design/shaders'

// "Caller memory" shader visual on the bento memory card.
// Uniforms ported 1:1 from the cult-ui HeroColorPanels demo
// (also documented in /index.html lines 1314–1370). The CSS fallback
// (.memory-visual-fallback) renders behind this; once `data-mounted`
// flips to "true", the existing CSS rule fades the fallback out.

export function ShaderCard() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let mount: ShaderMount | undefined

    try {
      mount = new ShaderMount(
        host,
        colorPanelsFragmentShader,
        {
          u_colors: [
            getShaderColorFromString('#ed40b3'),
            getShaderColorFromString('#6ef7cc'),
            getShaderColorFromString('#adfa1e'),
            getShaderColorFromString('#b054de'),
          ],
          u_colorsCount: 4,
          u_colorBack: getShaderColorFromString('#ffffff00'),
          u_density: 5.03,
          u_angle1: 0.68,
          u_angle2: 0.28,
          u_length: 1.13,
          u_edges: true,
          u_blur: 0.25,
          u_fadeIn: 0.85,
          u_fadeOut: 0.3,
          u_gradient: 0.56,
          u_fit: 1, // contain
          u_scale: 0.96,
          u_rotation: 180,
          u_offsetX: 0,
          u_offsetY: 0,
          u_originX: 0.5,
          u_originY: 0.5,
          u_worldWidth: 0,
          u_worldHeight: 0,
        },
        undefined,
        4, // speed — matches demo
        0, // start frame
      )
      host.dataset.mounted = 'true'
    } catch (err) {
      host.dataset.unsupported = 'true'
      console.warn('[memory-shader] failed to mount', err)
    }

    return () => {
      mount?.dispose()
      delete host.dataset.mounted
    }
  }, [])

  return <div ref={hostRef} className="memory-shader" id="memoryShader" />
}
