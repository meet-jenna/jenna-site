import { CalendarCheck, MessageSquareText, ReceiptText, Star } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { cn } from '@/lib/utils'

import { AnimatedList } from './AnimatedList'

// "Sends automated texts" visual — Jenna-branded notification list.
// Each item gets a category-matched lucide icon and color so the row
// reads at a glance (mirrors Magic UI's reference: distinct rounded
// chips per event type). The AnimatedList loops the four base items
// forever via a windowed cycle, so the card animates as long as it's
// in view.

interface SmsItem {
  name: string
  description: string
  time: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  color: string
}

const items: SmsItem[] = [
  {
    name: 'Order placed',
    description: 'Jenna AI',
    time: 'just now',
    icon: ReceiptText,
    color: '#00C9A7',
  },
  {
    name: 'Review order',
    description: 'Jenna AI',
    time: '2m ago',
    icon: Star,
    color: '#FFB800',
  },
  {
    name: 'Book reservation',
    description: 'Jenna AI',
    time: '5m ago',
    icon: CalendarCheck,
    color: '#1E86FF',
  },
  {
    name: 'Confirmation sent',
    description: 'Jenna AI',
    time: '8m ago',
    icon: MessageSquareText,
    color: '#1c00ff',
  },
]

const Notification = ({ name, description, time, icon: Icon, color }: SmsItem) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] overflow-hidden rounded-[8px] p-4',
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-[var(--fg)]">
            <span className="text-base font-bold leading-none sm:text-lg">{name}</span>
            <span className="mx-1 text-[var(--fg-muted)]">·</span>
            <span className="text-xs text-[var(--fg-muted)]">{time}</span>
          </figcaption>
          <p className="mt-1 text-sm font-medium text-[var(--fg-soft)]">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function SmsAnimatedList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative mt-auto flex h-[300px] w-full flex-col overflow-hidden rounded-[var(--r-md)] bg-white p-4',
        className,
      )}
      aria-hidden="true"
    >
      <AnimatedList delay={1400}>
        {items.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}
