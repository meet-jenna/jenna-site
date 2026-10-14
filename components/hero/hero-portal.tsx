"use client"

import { useEffect, useRef, useState } from "react"
import HeroDashboard, { CHAPTER_MS } from "./hero-dashboard"
import { PORTAL_URL } from "../../lib/portal"

/** The live demo portal, a cursor working it (served by the portal at /embed/demo). */
const EMBED_URL = process.env.NEXT_PUBLIC_DEMO_EMBED_URL ?? `${PORTAL_URL}/embed/demo`
const EMBED_ORIGIN = new URL(EMBED_URL).origin

/** The portal is laid out at a desktop width, then scaled to the hero card; the height follows the card. */
const FRAME_W = 1280

/** If the embed hasn't started its tour by then, show the built-in replica instead. */
const READY_TIMEOUT_MS = 8000

export default function HeroPortal({
  chapter,
  jumpKey,
  onChapter,
}: {
  chapter: number
  jumpKey: number
  onChapter: (chapter: number, durationMs: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [box, setBox] = useState<{ scale: number; height: number } | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading")
  const onChapterRef = useRef(onChapter)
  onChapterRef.current = onChapter
  const visibleRef = useRef(true)

  const post = (message: object) => frameRef.current?.contentWindow?.postMessage(message, EMBED_ORIGIN)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Layout size, not the screen box: the hero card scales in on reveal.
    const update = () => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        const scale = el.offsetWidth / FRAME_W
        setBox({ scale, height: el.offsetHeight / scale })
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        post({ type: "jenna-demo:visible", visible: entry.isIntersecting })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN || event.source !== frameRef.current?.contentWindow) return
      const data = event.data as { type?: string; chapter?: unknown; durationMs?: unknown }
      if (data?.type !== "jenna-demo:chapter" || !Number.isInteger(data.chapter)) return
      setStatus((current) => (current === "failed" ? current : "ready"))
      onChapterRef.current(data.chapter as number, typeof data.durationMs === "number" ? data.durationMs : CHAPTER_MS)
    }
    window.addEventListener("message", onMessage)
    const timeout = window.setTimeout(() => setStatus((current) => (current === "loading" ? "failed" : current)), READY_TIMEOUT_MS)
    return () => {
      window.removeEventListener("message", onMessage)
      window.clearTimeout(timeout)
    }
  }, [])

  const lastJump = useRef(jumpKey)
  useEffect(() => {
    if (lastJump.current === jumpKey) return
    lastJump.current = jumpKey
    post({ type: "jenna-demo:jump", chapter })
  }, [jumpKey, chapter])

  if (status === "failed") {
    return <HeroDashboard chapter={chapter} jumpKey={jumpKey} onChapter={(index) => onChapter(index, CHAPTER_MS)} />
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#101010]">
      {box ? (
        <iframe
          ref={frameRef}
          src={EMBED_URL}
          title="Jenna restaurant portal demo"
          tabIndex={-1}
          aria-hidden
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => post({ type: "jenna-demo:visible", visible: visibleRef.current })}
          className="absolute top-0 left-0 border-0 pointer-events-none transition-opacity duration-500"
          style={{
            width: FRAME_W,
            height: box.height,
            transform: `scale(${box.scale})`,
            transformOrigin: "top left",
            opacity: status === "ready" ? 1 : 0,
          }}
        />
      ) : null}
      <span className="sr-only">
        Jenna&apos;s restaurant portal: the overview, a call with its order and transcript, and the POS integration.
      </span>
    </div>
  )
}
