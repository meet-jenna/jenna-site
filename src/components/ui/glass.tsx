import { cn } from '@/lib/utils'
import { createElement } from 'react'

type GlassElement = 'div' | 'header' | 'nav' | 'section' | 'aside' | 'a' | 'button'

export type GlassProps = {
  as?: GlassElement
  /** `nav` — floating header island. `button` — denser nested glass CTA. `panel` — general surface. */
  variant?: 'nav' | 'panel' | 'button'
  className?: string
  children?: React.ReactNode
} & Record<string, unknown>

/**
 * Frosted glass surface primitive.
 *
 * Glass styling follows Magic UI's dock pattern (backdrop-blur +
 * translucent fill + hairline border) but uses Jenna design tokens so
 * it stays theme-aware. Raycast-style floating navs on Refero use the
 * same recipe: blur, low-opacity fill, specular top edge.
 */
export function Glass({
  as: Tag = 'div',
  variant = 'panel',
  className,
  children,
  ...props
}: GlassProps) {
  return createElement(
    Tag,
    {
      className: cn(
        'glass',
        variant === 'nav' && 'glass-nav',
        variant === 'button' && 'glass-button',
        className,
      ),
      ...props,
    },
    children,
  )
}
