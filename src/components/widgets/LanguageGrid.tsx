// "Multilingual" visual — a grid of round flag chips that fills the
// right column of the wide Multilingual feature card (mirrors the POS
// card's text-left / visual-right split). Flags are decorative, so the
// grid is aria-hidden and the surrounding copy carries the meaning.

interface Flag {
  emoji: string
  label: string
}

const flags: Flag[] = [
  { emoji: '🇺🇸', label: 'English' },
  { emoji: '🇪🇸', label: 'Spanish' },
  { emoji: '🇫🇷', label: 'French' },
  { emoji: '🇩🇪', label: 'German' },
  { emoji: '🇮🇹', label: 'Italian' },
  { emoji: '🇨🇳', label: 'Chinese' },
  { emoji: '🇯🇵', label: 'Japanese' },
  { emoji: '🇰🇷', label: 'Korean' },
  { emoji: '🇧🇷', label: 'Portuguese' },
  { emoji: '🇮🇳', label: 'Hindi' },
  { emoji: '🇸🇦', label: 'Arabic' },
  { emoji: '🇳🇱', label: 'Dutch' },
  { emoji: '🇸🇪', label: 'Swedish' },
  { emoji: '🇵🇱', label: 'Polish' },
]

export function LanguageGrid() {
  return (
    <div className="lang-grid" aria-hidden="true">
      {flags.map((flag) => (
        <span key={flag.label} className="lang-chip" title={flag.label}>
          {flag.emoji}
        </span>
      ))}
      <span className="lang-chip lang-chip-more" title="50+ languages supported">
        50+
      </span>
    </div>
  )
}
