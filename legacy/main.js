// Jenna AI — Hero call card interactions
//
// Today (scaffolding): plays a scripted "live call" animation in the call
// card — timer ticks, transcript bubbles type in, POS / SMS events fire.
// Auto-plays once when the card enters the viewport. Replays whenever the
// visitor taps the "Tap to Call Jenna" button.
//
// On mobile the button is an <a href="tel:..."> so the OS dial pad opens
// and actually rings (631) 800-7774. On desktop tel: is a no-op for most
// browsers — the visual still replays so the page feels alive.
//
// Phase 2 (real live transcript via Retell Web Call SDK):
//   import { RetellWebClient } from "retell-client-js-sdk";
//   const client = new RetellWebClient();
//   client.on("update", ({ transcript }) => renderLiveTranscript(transcript));
//   client.on("agent_start_talking", () => card.dataset.state = "playing");
//   client.on("call_ended", () => stop());
// Replace the body of `startCall()` below with a fetch to your token
// endpoint + client.startCall({ accessToken }). The DOM hooks
// (#callCard, #transcript, #callTime, #callJennaBtn) stay the same.
(function () {
  const card = document.getElementById("callCard");
  const transcript = document.getElementById("transcript");
  const callTime = document.getElementById("callTime");
  const callBtn = document.getElementById("callJennaBtn");

  if (!card || !transcript || !callTime) return;

  const bubbles = transcript.querySelectorAll(".transcript-bubble");
  const events = transcript.querySelectorAll(".event");

  let timers = [];
  let tickInterval = null;
  let elapsed = 0;
  let playing = false;

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  const reset = () => {
    timers.forEach(clearTimeout);
    timers = [];
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = null;
    elapsed = 0;
    callTime.textContent = "00:00";
    bubbles.forEach((b) => b.classList.remove("show"));
    events.forEach((e) => e.classList.remove("show"));
  };

  const stop = () => {
    playing = false;
    card.dataset.state = "idle";
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = null;
  };

  const play = () => {
    reset();
    playing = true;
    card.dataset.state = "playing";

    tickInterval = setInterval(() => {
      elapsed += 1;
      callTime.textContent = fmt(elapsed);
    }, 1000);

    bubbles.forEach((bubble) => {
      const delay = parseInt(bubble.dataset.delay || "0", 10);
      timers.push(setTimeout(() => bubble.classList.add("show"), delay));
    });

    events.forEach((event) => {
      const delay = parseInt(event.dataset.delay || "0", 10);
      timers.push(setTimeout(() => event.classList.add("show"), delay));
    });

    timers.push(setTimeout(() => stop(), 7500));
  };

  // Phase 2 hook: replace the body of this function with the Retell Web
  // Call SDK flow described at the top of this file. Keep the visual
  // replay as a fallback for desktop until the SDK path is wired up.
  const startCall = () => {
    play();
  };

  if (callBtn) {
    callBtn.addEventListener("click", () => {
      // Don't preventDefault — on mobile we want the tel: handoff to fire.
      startCall();
    });
  }

  // Auto-play once when the card enters the viewport (subtle "wow" moment).
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !playing && elapsed === 0) {
          play();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(card);
})();

// ============================================================
// Section 3 — Audio Demo Player
// Plays a real <audio> file if one is at audio/jenna-demo.mp3.
// Falls back to a 30-second simulated playback if the file is
// missing or fails to load. Either way the waveform fills in,
// the transcript highlights line-by-line, and the timer ticks.
// ============================================================
(function () {
  const demo = document.getElementById("audioDemo");
  if (!demo) return;

  const audio = document.getElementById("demoAudio");
  const playBtn = document.getElementById("audioPlay");
  const waveform = document.getElementById("audioWaveform");
  const transcript = document.getElementById("audioTranscript");
  const currentEl = document.getElementById("audioCurrent");
  const durationEl = document.getElementById("audioDuration");

  const TRANSCRIPT_LINES = transcript.querySelectorAll("li");
  const FALLBACK_DURATION = 30; // seconds — matches the transcript span
  const BAR_COUNT = 80;

  // ---- Build waveform bars ----
  // Deterministic, organic-looking pattern. Heights are a sine envelope
  // (quiet at edges, busy in middle) plus layered noise so each bar
  // varies but the overall shape reads like real speech.
  const bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const t = i / BAR_COUNT;
    const env = Math.sin(t * Math.PI); // 0..1 envelope
    const detail =
      Math.abs(
        Math.sin(i * 0.7) * 0.35 +
          Math.cos(i * 1.3) * 0.4 +
          Math.sin(i * 2.1) * 0.25
      );
    const h = Math.max(0.18, Math.min(1, env * 0.55 + detail * 0.55));
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.round(h * 100)}%`;
    waveform.appendChild(bar);
    bars.push(bar);
  }

  // ---- State ----
  let usingRealAudio = false;
  let duration = FALLBACK_DURATION;
  let isPlaying = false;
  let simStart = 0;
  let simRaf = null;
  let lastActiveLine = -1;

  const fmt = (s) => {
    s = Math.max(0, Math.floor(s));
    const m = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  const updateUI = (currentTime) => {
    currentEl.textContent = fmt(currentTime);
    const progress = Math.min(1, currentTime / duration);
    const playheadIdx = Math.floor(progress * BAR_COUNT);

    bars.forEach((bar, idx) => {
      bar.classList.toggle("played", idx < playheadIdx);
      bar.classList.toggle("playhead", idx === playheadIdx && isPlaying);
    });

    // Highlight the currently-spoken transcript line
    let activeIdx = -1;
    TRANSCRIPT_LINES.forEach((li, idx) => {
      const start = parseFloat(li.dataset.time);
      const end = parseFloat(li.dataset.end);
      if (currentTime >= start && currentTime < end) {
        activeIdx = idx;
      }
      li.classList.toggle("read", currentTime >= end);
    });

    if (activeIdx !== lastActiveLine) {
      TRANSCRIPT_LINES.forEach((li, idx) =>
        li.classList.toggle("active", idx === activeIdx)
      );
      lastActiveLine = activeIdx;
    }
  };

  const playLabel = playBtn.querySelector(".audio-play-label");

  const setPlayingState = (state) => {
    isPlaying = state;
    demo.dataset.state = state ? "playing" : "idle";
    playBtn.setAttribute("aria-pressed", state ? "true" : "false");
    playBtn.setAttribute("aria-label", state ? "Pause demo" : "Play demo");
    if (playLabel) playLabel.textContent = state ? "Pause" : "Play demo";
  };

  // ---- Real-audio mode ----
  const enableRealAudio = () => {
    usingRealAudio = true;
    duration = audio.duration;
    durationEl.textContent = fmt(duration);
  };

  audio.addEventListener("loadedmetadata", () => {
    if (audio.duration && Number.isFinite(audio.duration)) {
      enableRealAudio();
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (usingRealAudio) updateUI(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    setPlayingState(false);
    if (usingRealAudio) updateUI(duration);
  });

  audio.addEventListener("error", () => {
    // Audio file missing — fallback handles play/pause via simulation.
    usingRealAudio = false;
  });

  // ---- Simulated playback (no audio file) ----
  let simElapsed = 0;
  const tickSim = (now) => {
    if (!isPlaying) return;
    const elapsed = simElapsed + (now - simStart) / 1000;
    if (elapsed >= duration) {
      simElapsed = 0;
      setPlayingState(false);
      updateUI(duration);
      return;
    }
    updateUI(elapsed);
    simRaf = requestAnimationFrame(tickSim);
  };

  // ---- Play / pause ----
  const play = () => {
    if (usingRealAudio) {
      audio
        .play()
        .then(() => setPlayingState(true))
        .catch(() => {
          // Autoplay blocked or file 404'd mid-load — fall back to sim.
          usingRealAudio = false;
          play();
        });
    } else {
      setPlayingState(true);
      simStart = performance.now();
      simRaf = requestAnimationFrame(tickSim);
    }
  };

  const pause = () => {
    if (usingRealAudio) {
      audio.pause();
      setPlayingState(false);
    } else {
      simElapsed = simElapsed + (performance.now() - simStart) / 1000;
      cancelAnimationFrame(simRaf);
      setPlayingState(false);
    }
  };

  const toggle = () => (isPlaying ? pause() : play());

  playBtn.addEventListener("click", toggle);

  // ---- Scrub by clicking the waveform ----
  waveform.addEventListener("click", (e) => {
    const rect = waveform.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const target = Math.max(0, Math.min(1, ratio)) * duration;
    if (usingRealAudio) {
      audio.currentTime = target;
    } else {
      simElapsed = target;
      simStart = performance.now();
      updateUI(target);
    }
  });

  // ---- Initial paint ----
  updateUI(0);
})();

// ============================================================
// Section 4 — Config panel: tabs, switches, day pills, stepper, voice picker
// All interactive purely for marketing-demo "feel" — nothing persists.
// ============================================================
(function () {
  const config = document.getElementById("config");
  if (!config) return;

  // --- Tab switcher (ARIA-compliant w/ arrow keys) ---
  const tabs = config.querySelectorAll('[role="tab"]');
  const panels = config.querySelectorAll('[role="tabpanel"]');

  const activate = (target) => {
    tabs.forEach((t) => {
      const isActive = t === target;
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.tabIndex = isActive ? 0 : -1;
    });
    const id = target.dataset.tab;
    panels.forEach((p) => {
      const match = p.dataset.panel === id;
      p.classList.toggle("is-active", match);
      if (match) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        next = tabs[(idx + 1) % tabs.length];
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        next = tabs[(idx - 1 + tabs.length) % tabs.length];
      } else if (e.key === "Home") {
        next = tabs[0];
      } else if (e.key === "End") {
        next = tabs[tabs.length - 1];
      }
      if (next) {
        e.preventDefault();
        activate(next);
        next.focus();
      }
    });
  });

  // --- Day pills toggle ---
  config.querySelectorAll(".day-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      pill.classList.toggle("is-on");
    });
  });

  // --- Stepper ---
  config.querySelectorAll("[data-stepper]").forEach((stepper) => {
    const min = parseInt(stepper.dataset.min || "0", 10);
    const max = parseInt(stepper.dataset.max || "10", 10);
    let value = parseInt(stepper.dataset.value || "1", 10);
    const valueEl = stepper.querySelector("[data-stepper-value]");
    const update = () => {
      valueEl.textContent = value;
    };
    stepper.addEventListener("click", (e) => {
      const action = e.target.closest("[data-action]")?.dataset.action;
      if (!action) return;
      if (action === "inc" && value < max) value += 1;
      if (action === "dec" && value > min) value -= 1;
      update();
    });
    update();
  });

  // --- Voice picker (radio behavior) ---
  const voiceCards = config.querySelectorAll("[data-voice]");
  voiceCards.forEach((card) => {
    card.addEventListener("click", () => {
      voiceCards.forEach((c) => {
        c.classList.remove("is-selected");
        c.setAttribute("aria-checked", "false");
      });
      card.classList.add("is-selected");
      card.setAttribute("aria-checked", "true");
    });
  });
})();

// ============================================================
// Section 5 — ROI Calculator
// Formula:
//   recovered = calls × missed% × ticket × CONVERT × DAYS
//   labor     = calls × CALL_MIN × DAYS × ($/hr ÷ 60)
//   jenna     = calls × CALL_MIN × DAYS × $0.60
//   net       = recovered + labor − jenna
// ============================================================
(function () {
  const calc = document.getElementById("calc");
  if (!calc) return;

  // Constants
  const DAYS = 30;
  const CALL_MIN = 2.5; // average call length
  const CONVERT = 0.5;  // % of missed calls that would have placed an order
  const LABOR_HR = 20;  // loaded hourly cost of the staff member who would otherwise answer
  const JENNA_RATE = 0.6; // $/min

  // Range inputs
  const ranges = {
    calls:  document.getElementById("rangeCalls"),
    missed: document.getElementById("rangeMissed"),
    ticket: document.getElementById("rangeTicket"),
  };

  // Value readouts
  const vals = {
    calls:  document.getElementById("valCalls"),
    missed: document.getElementById("valMissed"),
    ticket: document.getElementById("valTicket"),
  };

  // Output cells
  const out = {
    amount:    document.getElementById("calcAmount"),
    recovered: document.getElementById("lineRecovered"),
    labor:     document.getElementById("lineLabor"),
    jenna:     document.getElementById("lineJenna"),
    net:       document.getElementById("lineNet"),
  };

  const fmt = (n) => {
    const rounded = Math.max(0, Math.round(n));
    return rounded.toLocaleString("en-US");
  };

  const fmtMoney = (n) => `$${fmt(n)}`;

  const updateRangeFill = (input) => {
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const val = parseFloat(input.value);
    const p = ((val - min) / (max - min)) * 100;
    input.style.setProperty("--p", `${p}%`);
  };

  const compute = () => {
    const calls  = parseFloat(ranges.calls.value);
    const missed = parseFloat(ranges.missed.value) / 100;
    const ticket = parseFloat(ranges.ticket.value);

    const recovered = calls * missed * ticket * CONVERT * DAYS;
    const labor     = calls * CALL_MIN * DAYS * (LABOR_HR / 60);
    const jenna     = calls * CALL_MIN * DAYS * JENNA_RATE;
    const net       = recovered + labor - jenna;

    vals.calls.textContent  = fmt(calls);
    vals.missed.textContent = fmt(missed * 100);
    vals.ticket.textContent = fmt(ticket);

    out.recovered.textContent = fmtMoney(recovered);
    out.labor.textContent     = fmtMoney(labor);
    out.jenna.textContent     = fmtMoney(jenna);
    out.net.textContent       = fmtMoney(net);
    out.amount.textContent    = fmt(net);

    Object.values(ranges).forEach(updateRangeFill);
  };

  Object.values(ranges).forEach((input) => {
    input.addEventListener("input", compute);
  });

  compute();
})();

// ============================================================
// Theme toggle — Cool Porcelain (light, default) ⇄ Cool Carbon (dark)
//
// The initial theme attribute is set by an inline script in <head>
// before paint to avoid a flash of the wrong theme. This module only
// handles the runtime toggle: click → flip → persist.
// ============================================================
(function () {
  const STORAGE_KEY = "jenna-theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  const apply = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    btn.setAttribute("title", btn.getAttribute("aria-label"));
  };

  const current = () =>
    root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  apply(current());

  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  });
})();


// ============================================================
// Ripple buttons — port of magicui's RippleButton.
// Any element with `.btn-ripple` spawns a circular ripple at the click
// point that animates via the `btn-rippling` keyframe in styles.css.
// Override the color per-button with `data-ripple-color="#ADD8E6"`.
// ============================================================
(function () {
  const DEFAULT_COLOR = "#ffffff";
  const DURATION_MS = 600;

  function spawnRipple(host, event) {
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    // For mouse/touch we have client coords; for keyboard activation
    // (Enter/Space) clientX/Y are 0 — center the ripple in that case.
    let x;
    let y;
    if (event && event.detail !== 0 && event.clientX !== undefined) {
      x = event.clientX - rect.left - size / 2;
      y = event.clientY - rect.top - size / 2;
    } else {
      x = rect.width / 2 - size / 2;
      y = rect.height / 2 - size / 2;
    }

    const ripple = document.createElement("span");
    ripple.className = "btn-ripple-effect";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor =
      host.dataset.rippleColor || DEFAULT_COLOR;

    host.appendChild(ripple);
    setTimeout(() => ripple.remove(), DURATION_MS);
  }

  document.querySelectorAll(".btn-ripple").forEach((host) => {
    host.addEventListener("click", (event) => spawnRipple(host, event));
  });
})();



