import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// Section 6 — FAQ accordion. Centered single-column accordion, first
// item open. Token-driven styling so it inherits the site palette.

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: 'What exactly does Jenna do?',
    a: "Jenna is an AI phone hostess for your restaurant. She answers every call, takes orders and reservations, sends confirmation texts, answers questions about your menu and hours, and transfers calls to your team when a human is needed — 24/7, on every line at once.",
  },
  {
    q: 'Will callers know they’re talking to an AI?',
    a: 'Jenna sounds natural, warm, and on-brand for your restaurant. Most callers simply feel like they reached a friendly, knowledgeable hostess. You decide how she introduces herself.',
  },
  {
    q: 'Does Jenna connect to my POS?',
    a: 'Yes. Jenna integrates directly with your point-of-sale to pull live menu, pricing, and availability and to push orders — exactly like a team member tapping on your tablet, just faster and never off-shift.',
  },
  {
    q: 'Can Jenna handle more than one call at a time?',
    a: 'Always. Friday rush, holiday weekend, or brunch — every incoming line is Jenna, so no caller hits a busy signal or voicemail again.',
  },
  {
    q: 'How does Jenna transfer calls to my staff?',
    a: 'When a call needs a human, Jenna screens it first and hands it over with a short brief — who’s calling and why — so your team is never caught off guard.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="faq-bg" aria-hidden="true">
        <div className="faq-glow" />
      </div>

      <header className="section-head">
        <span className="eyebrow">FAQ</span>
        <h2 id="faq-title" className="section-title">
          Frequently Asked <em>Questions.</em>
        </h2>
        <p className="section-sub">
          Everything you need to know about Jenna. Can’t find what you’re looking for? Book a demo and we’ll walk you through it.
        </p>
      </header>

      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`faq-item${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq-question-text">{item.q}</span>
                <ChevronDown className="faq-chevron" aria-hidden="true" />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
