import { motion, useReducedMotion } from 'framer-motion'
import { memo, useMemo } from 'react'

// Background Paths — animated SVG ribbons used as the hero wallpaper.
// Adapted from kokonutui.com (MIT, @dorianbaffier, 2025-06-26):
//   - ported from `motion/react` to the `framer-motion` we already ship
//   - title/wrapper stripped so this is a pure absolute-positioned backdrop
//     (Hero owns its own copy + container)
//   - gradient retuned from purple/pink/blue to brand violet via design
//     tokens (--accent / --accent-bright / --accent-deep)
//   - dark: variants dropped (light-only theme post-Shares revamp)
//   - useReducedMotion() suppresses the infinite y-bob to honor the same
//     contract the rest of the site does for prefers-reduced-motion users
type WaveType = 'primary' | 'secondary' | 'accent'

interface Point {
  x: number
  y: number
}

interface PathData {
  id: string
  d: string
  opacity: number
  width: number
}

function generateAestheticPath(index: number, position: number, type: WaveType): string {
  const baseAmplitude = type === 'primary' ? 150 : type === 'secondary' ? 100 : 60
  const phase = index * 0.2
  const points: Point[] = []
  const segments = type === 'primary' ? 10 : type === 'secondary' ? 8 : 6

  const startX = 2400
  const startY = 800
  const endX = -2400
  const endY = -800 + index * 25

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments
    const eased = 1 - (1 - progress) ** 2

    const baseX = startX + (endX - startX) * eased
    const baseY = startY + (endY - startY) * eased

    const amplitudeFactor = 1 - eased * 0.3
    const wave1 = Math.sin(progress * Math.PI * 3 + phase) * (baseAmplitude * 0.7 * amplitudeFactor)
    const wave2 = Math.cos(progress * Math.PI * 4 + phase) * (baseAmplitude * 0.3 * amplitudeFactor)
    const wave3 = Math.sin(progress * Math.PI * 2 + phase) * (baseAmplitude * 0.2 * amplitudeFactor)

    points.push({
      x: baseX * position,
      y: baseY + wave1 + wave2 + wave3,
    })
  }

  return points
    .map((point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`
      const prevPoint = points[i - 1]
      const tension = 0.4
      const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension
      const cp1y = prevPoint.y
      const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension)
      const cp2y = point.y
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`
    })
    .join(' ')
}

const generateUniqueId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 11)}`

const FloatingPaths = memo(function FloatingPaths({ position }: { position: number }) {
  const reduceMotion = useReducedMotion()

  const primaryPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: generateUniqueId('primary'),
        d: generateAestheticPath(i, position, 'primary'),
        opacity: 0.15 + i * 0.02,
        width: 4 + i * 0.3,
      })),
    [position],
  )

  const secondaryPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: generateUniqueId('secondary'),
        d: generateAestheticPath(i, position, 'secondary'),
        opacity: 0.12 + i * 0.015,
        width: 3 + i * 0.25,
      })),
    [position],
  )

  const accentPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: generateUniqueId('accent'),
        d: generateAestheticPath(i, position, 'accent'),
        opacity: 0.08 + i * 0.12,
        width: 2 + i * 0.2,
      })),
    [position],
  )

  const enterTransition = { opacity: { duration: 1 }, scale: { duration: 1 } } as const

  const bobProps = (peak: number, duration: number) =>
    reduceMotion
      ? {
          animate: { opacity: 1, scale: 1 },
          transition: enterTransition,
        }
      : {
          animate: { opacity: 1, scale: 1, y: [0, peak, 0] },
          transition: {
            ...enterTransition,
            y: {
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut' as const,
              repeatType: 'reverse' as const,
            },
          },
        }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="-2400 -800 4800 1600"
      >
        <title>Background Paths</title>
        <defs>
          <linearGradient id="brandPathsGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.55 }} />
            <stop offset="50%" style={{ stopColor: 'var(--accent-bright)', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent-deep)', stopOpacity: 0.55 }} />
          </linearGradient>
        </defs>

        <g className="primary-waves">
          {primaryPaths.map((path) => {
            const { animate, transition } = bobProps(-15, 8)
            return (
              <motion.path
                key={path.id}
                d={path.d}
                stroke="url(#brandPathsGradient)"
                strokeLinecap="round"
                strokeWidth={path.width}
                style={{ opacity: path.opacity }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={animate}
                transition={transition}
              />
            )
          })}
        </g>

        <g className="secondary-waves" style={{ opacity: 0.8 }}>
          {secondaryPaths.map((path) => {
            const { animate, transition } = bobProps(-10, 6)
            return (
              <motion.path
                key={path.id}
                d={path.d}
                stroke="url(#brandPathsGradient)"
                strokeLinecap="round"
                strokeWidth={path.width}
                style={{ opacity: path.opacity }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={animate}
                transition={transition}
              />
            )
          })}
        </g>

        <g className="accent-waves" style={{ opacity: 0.6 }}>
          {accentPaths.map((path) => {
            const { animate, transition } = bobProps(-5, 4)
            return (
              <motion.path
                key={path.id}
                d={path.d}
                stroke="url(#brandPathsGradient)"
                strokeLinecap="round"
                strokeWidth={path.width}
                style={{ opacity: path.opacity }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={animate}
                transition={transition}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
})

export const BackgroundPaths = memo(function BackgroundPaths() {
  return <FloatingPaths position={1} />
})
