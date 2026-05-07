import { useEffect, useMemo, useRef, useState } from 'react'

import { fmtTime } from '@/lib/format'
import { cn } from '@/lib/utils'

// Section 3 — Audio Demo Player. Logic ported verbatim from /main.js
// lines 113–302:
//   - 80-bar deterministic envelope waveform
//   - Real <audio> playback when audio/jenna-demo.mp3 is present;
//     simulated 30s playback fallback when missing or 404
//   - Click-anywhere-on-waveform to scrub
//   - Transcript line-by-line highlight via data-time / data-end

const FALLBACK_DURATION = 30
const BAR_COUNT = 80

type TranscriptLine = {
  who: 'Jenna' | 'Caller'
  text: string
  start: number
  end: number
}

const LINES: TranscriptLine[] = [
  { who: 'Jenna',  text: '"Marco\'s Pizzeria, this is Jenna. How can I help?"',                       start: 0,    end: 3.2 },
  { who: 'Caller', text: '"Hey — I\'d like to grab a large pizza for pickup."',                       start: 3.2,  end: 6 },
  { who: 'Jenna',  text: '"Of course. What would you like on it?"',                                   start: 6,    end: 9 },
  { who: 'Caller', text: '"Half pepperoni, half… what\'s the special tonight?"',                      start: 9,    end: 13 },
  { who: 'Jenna',  text: '"Tonight\'s the truffle mushroom — it\'s a fan favorite."',                 start: 13,   end: 17 },
  { who: 'Caller', text: '"Sure. Half pepperoni, half truffle mushroom. And a Caesar."',              start: 17,   end: 21.5 },
  { who: 'Jenna',  text: '"Got it — $34.20. Pickup in 25 minutes, text confirmation on the way."',    start: 21.5, end: 27 },
  { who: 'Caller', text: '"Perfect, thanks."',                                                        start: 27,   end: 30 },
]

// Same deterministic, organic-looking heights as /main.js (sine envelope
// + layered noise so each bar varies but the overall shape reads like
// real speech).
const BAR_HEIGHTS: number[] = (() => {
  const out: number[] = []
  for (let i = 0; i < BAR_COUNT; i++) {
    const t = i / BAR_COUNT
    const env = Math.sin(t * Math.PI)
    const detail = Math.abs(
      Math.sin(i * 0.7) * 0.35 +
        Math.cos(i * 1.3) * 0.4 +
        Math.sin(i * 2.1) * 0.25,
    )
    const h = Math.max(0.18, Math.min(1, env * 0.55 + detail * 0.55))
    out.push(Math.round(h * 100))
  }
  return out
})()

export function AudioDemo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)
  const simRafRef = useRef<number | null>(null)
  const simStartRef = useRef<number>(0)
  const simElapsedRef = useRef<number>(0)

  const [usingRealAudio, setUsingRealAudio] = useState(false)
  const [duration, setDuration] = useState(FALLBACK_DURATION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const playheadIdx = useMemo(() => {
    const progress = Math.min(1, currentTime / duration)
    return Math.floor(progress * BAR_COUNT)
  }, [currentTime, duration])

  const activeLineIdx = useMemo(() => {
    return LINES.findIndex((l) => currentTime >= l.start && currentTime < l.end)
  }, [currentTime])

  // ---------- audio element wiring ----------
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setUsingRealAudio(true)
        setDuration(audio.duration)
      }
    }
    const onTime = () => {
      if (usingRealAudio) setCurrentTime(audio.currentTime)
    }
    const onEnded = () => {
      setIsPlaying(false)
      if (usingRealAudio) setCurrentTime(duration)
    }
    const onError = () => {
      // Audio file missing — fallback to simulation.
      setUsingRealAudio(false)
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [usingRealAudio, duration])

  // ---------- simulated playback rAF loop ----------
  const tickSim = (now: number) => {
    if (!isPlaying) return
    const elapsed = simElapsedRef.current + (now - simStartRef.current) / 1000
    if (elapsed >= duration) {
      simElapsedRef.current = 0
      setIsPlaying(false)
      setCurrentTime(duration)
      return
    }
    setCurrentTime(elapsed)
    simRafRef.current = requestAnimationFrame(tickSim)
  }

  const play = () => {
    const audio = audioRef.current
    if (usingRealAudio && audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked or file 404'd mid-load — fall back to sim.
          setUsingRealAudio(false)
          setIsPlaying(true)
          simStartRef.current = performance.now()
          simRafRef.current = requestAnimationFrame(tickSim)
        })
    } else {
      setIsPlaying(true)
      simStartRef.current = performance.now()
      simRafRef.current = requestAnimationFrame(tickSim)
    }
  }

  const pause = () => {
    const audio = audioRef.current
    if (usingRealAudio && audio) {
      audio.pause()
      setIsPlaying(false)
    } else {
      simElapsedRef.current += (performance.now() - simStartRef.current) / 1000
      if (simRafRef.current !== null) cancelAnimationFrame(simRafRef.current)
      setIsPlaying(false)
    }
  }

  const toggle = () => (isPlaying ? pause() : play())

  // Cleanup rAF on unmount
  useEffect(() => () => {
    if (simRafRef.current !== null) cancelAnimationFrame(simRafRef.current)
  }, [])

  // ---------- scrub by clicking the waveform ----------
  const onScrub: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = waveformRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const target = Math.max(0, Math.min(1, ratio)) * duration
    if (usingRealAudio && audioRef.current) {
      audioRef.current.currentTime = target
    } else {
      simElapsedRef.current = target
      simStartRef.current = performance.now()
      setCurrentTime(target)
    }
  }

  return (
    <figure
      className="audio-demo"
      id="audioDemo"
      data-state={isPlaying ? 'playing' : 'idle'}
      aria-label="30-second audio demo of Jenna taking a real order"
    >
      <audio ref={audioRef} id="demoAudio" preload="metadata" crossOrigin="anonymous">
        <source src="/audio/jenna-demo.mp3" type="audio/mpeg" />
      </audio>

      <div className="audio-glow" aria-hidden="true" />

      <header className="audio-head">
        <div className="audio-meta">
          <div className="audio-avatar" aria-hidden="true">
            <span className="avatar-mark" />
          </div>
          <div>
            <div className="audio-tag">
              <span className="status-dot status-dot-live" aria-hidden="true" />
              Live demo · 30 seconds
            </div>
            <div className="audio-title">Jenna takes a real order at Marco's</div>
          </div>
        </div>
        <div className="audio-time">
          <span id="audioCurrent">{fmtTime(currentTime)}</span>
          <span className="audio-time-divider">/</span>
          <span id="audioDuration">{fmtTime(duration)}</span>
        </div>
      </header>

      <div
        className="audio-waveform"
        id="audioWaveform"
        ref={waveformRef}
        onClick={onScrub}
        aria-hidden="true"
      >
        {BAR_HEIGHTS.map((h, idx) => (
          <div
            key={idx}
            className={cn(
              'bar',
              idx < playheadIdx && 'played',
              idx === playheadIdx && isPlaying && 'playhead',
            )}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="audio-controls">
        <button
          type="button"
          className="audio-play"
          id="audioPlay"
          aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
          aria-pressed={isPlaying}
          onClick={toggle}
        >
          <svg className="ctrl-icon ctrl-icon-play" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
          </svg>
          <svg className="ctrl-icon ctrl-icon-pause" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
          </svg>
          <span className="audio-play-label">{isPlaying ? 'Pause' : 'Play demo'}</span>
        </button>

        <div className="audio-hint">
          Tap play. Most listeners can't tell which voice is the AI.
        </div>
      </div>

      <ol className="audio-transcript" id="audioTranscript">
        {LINES.map((l, idx) => (
          <li
            key={idx}
            data-time={l.start}
            data-end={l.end}
            className={cn(
              currentTime >= l.end && 'read',
              activeLineIdx === idx && 'active',
            )}
          >
            <span className="who">{l.who}</span>
            <span>{l.text}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
