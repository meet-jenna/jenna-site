import { TrendingUp } from 'lucide-react'

// Hero phone content — Jenna activity dashboard.
//
// Three stacked sections inside the iPhone screen:
//
//   1 · HEADER         app eyebrow + screen title + brand avatar
//   2 · STAT CARDS     Calls Handled (count + trend + area sparkline)
//                      Orders Taken  (count + revenue + mini bar chart)
//   3 · RECENT ORDERS  feed of recent order rows
//
// All values are placeholders — no real data. The two mini charts are
// inline SVG (no chart dependency); they paint in `currentColor` so the
// card sets the brand tint, and stretch to fill the card via
// preserveAspectRatio="none". Sizing uses container-query units (see
// .phone-screen in index.css) so the whole UI scales with the iPhone's
// rendered width on every breakpoint.

type Order = {
  avatar: string
  name: string
  ref: string
  time: string
  amount: string
}

const ORDERS: Order[] = [
  { avatar: '/assets/avatars/order-mike.png',  name: 'Mike Reyes',     ref: '#1247', time: '2 min ago',  amount: '$28.40' },
  { avatar: '/assets/avatars/order-sarah.png', name: 'Sarah Klein',    ref: '#1246', time: '14 min ago', amount: '$52.10' },
  { avatar: '/assets/avatars/order-james.png', name: 'James Tran',     ref: '#1245', time: '31 min ago', amount: '$19.75' },
  { avatar: '/assets/avatars/order-lena.png',  name: 'Lena Morales',   ref: '#1244', time: '48 min ago', amount: '$41.20' },
  { avatar: '/assets/avatars/order-david.png', name: 'David Okafor',   ref: '#1243', time: '1 hr ago',   amount: '$33.60' },
  { avatar: '/assets/avatars/order-priya.png', name: 'Priya Sharma',   ref: '#1242', time: '1 hr ago',   amount: '$24.90' },
  { avatar: '/assets/avatars/order-tom.png',   name: 'Tom Becker',     ref: '#1241', time: '2 hr ago',   amount: '$67.30' },
  { avatar: '/assets/avatars/order-grace.png', name: 'Grace Lee',      ref: '#1240', time: '2 hr ago',   amount: '$15.50' },
]

// Calls — rising area sparkline. Placeholder shape suggesting call
// volume climbing through the day.
function CallsSparkline() {
  const line = 'M0,27 L14,22 L29,25 L43,16 L57,19 L71,10 L86,12 L100,5'
  return (
    <svg
      className="ps-chart-svg"
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="psCallsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L100,32 L0,32 Z`} fill="url(#psCallsFill)" />
      <path
        className="ps-chart-line"
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Orders — mini bar chart, one bar per recent day, the latest bar
// emphasized. Placeholder heights.
function OrdersBars() {
  const bars = [40, 58, 34, 70, 52, 78, 100]
  const slot = 100 / bars.length
  const barW = slot * 0.56
  return (
    <svg
      className="ps-chart-svg"
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bars.map((pct, i) => {
        const h = (pct / 100) * 32
        const x = i * slot + (slot - barW) / 2
        const last = i === bars.length - 1
        return (
          <rect
            key={i}
            x={x}
            y={32 - h}
            width={barW}
            height={h}
            rx="1.4"
            fill="currentColor"
            opacity={last ? 1 : 0.26}
          />
        )
      })}
    </svg>
  )
}

export function PhoneScreen() {
  return (
    <div
      className="phone-screen"
      role="img"
      aria-label="Jenna dashboard — 127 calls handled, 48 orders taken for $1,284 in revenue, and a feed of recent orders"
    >
      {/* 1 · Header */}
      <div className="ps-header">
        <div className="ps-header-titles">
          <span className="ps-eyebrow">Today</span>
          <span className="ps-title">Dashboard</span>
        </div>
        <div className="ps-avatar ps-avatar-brand" aria-hidden="true">J</div>
      </div>

      {/* 2 · Stat cards — Calls Handled · Orders Taken */}
      <div className="ps-stats">
        <div className="ps-stat">
          <div className="ps-stat-top">
            <span className="ps-stat-label">Calls Handled</span>
            <span className="ps-stat-value">127</span>
            <span className="ps-stat-trend">
              <TrendingUp className="ps-trend-icon" aria-hidden="true" />
              12%
              <span className="ps-stat-trend-meta">vs yesterday</span>
            </span>
          </div>
          <div className="ps-stat-chart">
            <CallsSparkline />
          </div>
        </div>

        <div className="ps-stat">
          <div className="ps-stat-top">
            <span className="ps-stat-label">Orders Taken</span>
            <span className="ps-stat-value">48</span>
            <span className="ps-stat-revenue">
              <span className="ps-stat-revenue-amt">$1,284</span> revenue
            </span>
          </div>
          <div className="ps-stat-chart">
            <OrdersBars />
          </div>
        </div>
      </div>

      {/* 3 · Recent orders feed */}
      <div className="ps-orders">
        <div className="ps-orders-head">
          <span className="ps-orders-title">Recent Orders</span>
          <span className="ps-orders-link">View all</span>
        </div>

        <div className="ps-orders-list">
          {ORDERS.map((order) => (
            <div className="ps-order" key={order.ref}>
              <img
                className="ps-order-avatar"
                src={order.avatar}
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
              />
              <div className="ps-order-main">
                <span className="ps-order-name">{order.name}</span>
                <span className="ps-order-meta">{order.ref} · {order.time}</span>
              </div>
              <span className="ps-order-amt">{order.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
