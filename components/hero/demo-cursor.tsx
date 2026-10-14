export type DemoCursor = { x: number; y: number; down: boolean; show: boolean }

export type SetCursor = (value: DemoCursor | ((current: DemoCursor) => DemoCursor)) => void

export function abortError() {
  return new DOMException("The demo stopped.", "AbortError")
}

export function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError"
}

export function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(abortError())
      return
    }
    const id = window.setTimeout(() => {
      signal.removeEventListener("abort", stop)
      resolve()
    }, ms)
    const stop = () => {
      window.clearTimeout(id)
      reject(abortError())
    }
    signal.addEventListener("abort", stop, { once: true })
  })
}

/** Ease a scroller to `to`. */
export function easeScroll(scroller: HTMLElement, to: number, signal: AbortSignal, duration = 600) {
  const from = scroller.scrollTop
  const distance = to - from
  if (Math.abs(distance) < 1) return Promise.resolve()
  const start = performance.now()
  return new Promise<void>((resolve, reject) => {
    let frame = 0
    const stop = () => {
      cancelAnimationFrame(frame)
      reject(abortError())
    }
    if (signal.aborted) {
      stop()
      return
    }
    signal.addEventListener("abort", stop, { once: true })
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      scroller.scrollTop = from + distance * eased
      if (t < 1) frame = requestAnimationFrame(step)
      else {
        signal.removeEventListener("abort", stop)
        resolve()
      }
    }
    frame = requestAnimationFrame(step)
  })
}

/** Where `el` sits inside `root`, in the stage's own unscaled pixels. Screen boxes are scaled; the pointer's own coordinates are not. */
export function offsetIn(root: HTMLElement, el: HTMLElement) {
  const box = el.getBoundingClientRect()
  const frame = root.getBoundingClientRect()
  const scale = root.offsetWidth ? frame.width / root.offsetWidth : 1
  return {
    x: (box.left - frame.left) / scale,
    y: (box.top - frame.top) / scale,
    width: box.width / scale,
    height: box.height / scale,
  }
}

export function DemoPointer({ cursor }: { cursor: DemoCursor }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute z-50 text-[#101010] drop-shadow-[0_2px_3px_rgba(16,16,16,0.25)]"
      style={{
        left: cursor.x,
        top: cursor.y,
        opacity: cursor.show ? 1 : 0,
        transition:
          "left 560ms cubic-bezier(0.22, 1, 0.36, 1), top 560ms cubic-bezier(0.22, 1, 0.36, 1), transform 100ms ease, opacity 300ms ease",
        transform: cursor.down ? "scale(0.86)" : "scale(1)",
        transformOrigin: "3px 2px",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 18 18" fill="none">
        <path d="M3 2.2 14.2 8.1 8.6 9.4 7.1 14.8 3 2.2Z" fill="currentColor" stroke="white" strokeWidth="1.2" />
      </svg>
    </span>
  )
}
