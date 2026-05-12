import { AnimatePresence, motion, type MotionProps } from 'framer-motion'
import {
  Children,
  memo,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

// Port of Magic UI's animated-list — adapted to framer-motion and
// extended to loop forever. A monotonic tick advances on every delay;
// at any moment we render a window of the most-recent `maxVisible`
// items (newest on top), cycling through children with modulo. Each
// rendered slot uses the tick value as its key so AnimatePresence
// treats wraps as fresh enter/exit animations rather than re-using
// a node across cycles.

export function AnimatedListItem({
  children,
  itemKey,
}: {
  children: ReactNode
  itemKey: string | number
}) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 350, damping: 40 },
  }

  return (
    <motion.div key={itemKey} {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  /** Delay between each item entering, in ms. */
  delay?: number
  /** Max items rendered at once before older items animate out. */
  maxVisible?: number
}

export const AnimatedList = memo(
  ({
    children,
    className,
    delay = 1000,
    maxVisible = 6,
    ...props
  }: AnimatedListProps) => {
    const [tick, setTick] = useState(0)
    const childrenArray = useMemo(() => Children.toArray(children), [children])

    useEffect(() => {
      if (childrenArray.length === 0) return
      const timeout = setTimeout(() => setTick((t) => t + 1), delay)
      return () => clearTimeout(timeout)
    }, [tick, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const len = childrenArray.length
      if (len === 0) return []
      const visible = Math.min(tick + 1, maxVisible)
      const window: { child: ReactNode; key: number }[] = []
      for (let i = 0; i < visible; i++) {
        const childIdx = ((tick - i) % len + len) % len
        window.push({ child: childrenArray[childIdx], key: tick - i })
      }
      return window
    }, [tick, childrenArray, maxVisible])

    return (
      <div
        className={cn('flex flex-col items-center gap-4', className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map(({ child, key }) => (
            <AnimatedListItem key={key} itemKey={key}>
              {child}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  },
)

AnimatedList.displayName = 'AnimatedList'
