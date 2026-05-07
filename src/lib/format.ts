// Number formatters matching /main.js fmt() / fmtMoney() / fmt(time).
// Used by the ROI calculator and the audio demo. Centralized so both
// React components agree on rounding + locale.

export const fmt = (n: number): string =>
  Math.max(0, Math.round(n)).toLocaleString('en-US')

export const fmtMoney = (n: number): string => `$${fmt(n)}`

export const fmtTime = (s: number): string => {
  const safe = Math.max(0, Math.floor(s))
  const m = Math.floor(safe / 60)
  const ss = (safe % 60).toString().padStart(2, '0')
  return `${m}:${ss}`
}
