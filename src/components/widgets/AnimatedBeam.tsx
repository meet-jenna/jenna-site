import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useState, type RefObject } from 'react'

import { cn } from '@/lib/utils'

// Animated SVG beam between two refs inside a positioned container.
// Port of Magic UI's animated-beam — adapted to brand violet defaults
// (var(--accent) → hex fallbacks since SVG stop-color can't resolve
// CSS vars across all browsers reliably). Honors prefers-reduced-motion
// by rendering the static path with no gradient sweep.

interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  // Loop count for the gradient sweep. Defaults to Infinity (continuous).
  // Set 0 for a single one-shot pass.
  repeat?: number
  // When false, only the dim static path renders (no gradient sweep).
  // Default true. Useful for keeping connection lines visible while
  // animating only one path at a time.
  animate?: boolean
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  repeat = Infinity,
  animate = true,
  pathColor = '#868a92',
  pathWidth = 2,
  pathOpacity = 0.18,
  gradientStartColor = '#565961',
  gradientStopColor = '#9aa0a8',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId()
  const reduced = useReducedMotion()
  const [pathD, setPathD] = useState('')
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  const gradientCoordinates = reverse
    ? { x1: ['90%', '-10%'], x2: ['100%', '0%'], y1: ['0%', '0%'], y2: ['0%', '0%'] }
    : { x1: ['10%', '110%'], x2: ['0%', '100%'], y1: ['0%', '0%'], y2: ['0%', '0%'] }

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const rectA = fromRef.current.getBoundingClientRect()
      const rectB = toRef.current.getBoundingClientRect()

      const svgWidth = containerRect.width
      const svgHeight = containerRect.height
      setSvgDimensions({ width: svgWidth, height: svgHeight })

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset

      const controlY = startY - curvature
      const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
      setPathD(d)
    }

    const ro = new ResizeObserver(() => updatePath())
    if (containerRef.current) ro.observe(containerRef.current)
    updatePath()

    return () => ro.disconnect()
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'pointer-events-none absolute left-0 top-0 transform-gpu',
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      aria-hidden="true"
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {!reduced && animate && (
        <>
          <path
            d={pathD}
            strokeWidth={pathWidth}
            stroke={`url(#${id})`}
            strokeOpacity="1"
            strokeLinecap="round"
          />
          <defs>
            <motion.linearGradient
              className="transform-gpu"
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
              animate={{
                x1: gradientCoordinates.x1,
                x2: gradientCoordinates.x2,
                y1: gradientCoordinates.y1,
                y2: gradientCoordinates.y2,
              }}
              transition={{
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1],
                repeat,
                repeatDelay: 0,
              }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop
                offset="100%"
                stopColor={gradientStopColor}
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  )
}
