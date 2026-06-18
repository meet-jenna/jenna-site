"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Global scroll-reveal controller.
 *
 * Watches every `[data-reveal]` element on the page and adds `.is-visible`
 * once it scrolls into view, which triggers the CSS transition defined in
 * globals.css. A single IntersectionObserver is reused for performance, and a
 * MutationObserver keeps it in sync with elements added on client-side route
 * changes. Respects `prefers-reduced-motion` (reveals everything immediately).
 */
export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      document.documentElement.classList.remove("reveal-enabled")
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el)
      })
    }

    observe(document)

    // Catch elements added later (client-side navigations, lazy content).
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as HTMLElement
          if (el.matches?.("[data-reveal]") && !el.classList.contains("is-visible")) {
            observer.observe(el)
          }
          observe(el)
        })
      }
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}
