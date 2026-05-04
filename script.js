// ===== Jenna AI marketing site — interactivity =====
//
// Sections, in order:
//   1. Configuration constants
//   2. Pure utilities (shuffle, wait, animation tracker)
//   3. iPhone action ticker (the "Pulling hours…" shimmer text)
//   4. Hero intro animation (cards rain in, get absorbed, page reveals)
//   5. POS logo emission (Toast / Square / Clover float out of the phone)
//   6. FAQ accordion (single-open)
//   7. Header shadow on scroll
//   8. Feature carousel (auto-cycle + click + mouse-tracked gradient)
//   9. Section reveal on intersection
//   10. Book demo form (submit feedback)
//   11. Init

(function () {
  "use strict";

  // ----------------------------------------------------------------
  // 1. Configuration
  // ----------------------------------------------------------------

  const PREFERS_REDUCED_MOTION = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const HERO_REQUESTS = [
    { quote: "Are you open on Sunday?", action: "Pulling hours" },
    { quote: "I want to book a table for 6", action: "Booking table" },
    { quote: "Can I get a chicken parm?", action: "Placing order" },
    {
      quote: "I'd like a large pepperoni for pickup",
      action: "Building pickup",
    },
    { quote: "Do you deliver to 11743?", action: "Checking delivery" },
    { quote: "What's tonight's special?", action: "Reading specials" },
    { quote: "Is there outdoor seating tonight?", action: "Checking patio" },
    { quote: "Do you have any gluten-free options?", action: "Filtering menu" },
  ];

  // Pixel offsets from the cluster center for each hero card.
  const CARD_CLUSTER_OFFSETS = [
    { dx: -10, dy: -95, rotation: -6 },
    { dx: 80, dy: -55, rotation: 4 },
    { dx: -90, dy: -25, rotation: -3 },
    { dx: 50, dy: -10, rotation: 5 },
    { dx: -50, dy: 25, rotation: 6 },
    { dx: 95, dy: 35, rotation: -4 },
    { dx: -100, dy: 65, rotation: 3 },
  ];

  // Decelerating gaps (ms) between successive card entrances.
  // 6 gaps for 7 cards — last card lands at ~5.3s.
  const CARD_GAPS_MS = [1500, 1300, 1000, 700, 500, 300];

  const HERO_DURATIONS_MS = {
    cardEntrance: 360,
    phoneSlide: 720,
    postPhoneBeat: 500,
    cardAbsorb: 700,
    cardAbsorbStagger: 28,
    postAbsorbBeat: 450,
    layerFade: 200,
    pageRevealDelay: 120,
    pageRevealStagger: 110,
    pageReveal: 620,
    postRevealBeat: 850,
    posLogoEntrance: 720,
    posLogoStagger: 200,
  };

  const HERO_LAYOUT = {
    visibleHeightCap: 760,
    posLogoSideMargin: 12,
    posLogoEdgeClamp: 4,
  };

  const ACTION_TICKER = {
    initialDelayMs: 900,
    intervalMs: 3400,
    fadeOutMs: 180,
  };

  const CAROUSEL = {
    autoAdvanceMs: 3000,
  };

  const HEADER_SHADOW_AT_PX = 8;
  const SECTION_REVEAL_THRESHOLD = 0.08;
  const ABORT_EVENTS = ["scroll", "wheel", "touchmove", "keydown"];

  // Sentinel error type used to short-circuit the hero-intro promise chain
  // when the user scrolls / interacts before the animation completes.
  class HeroIntroAborted extends Error {
    constructor() {
      super("hero-intro-aborted");
      this.name = "HeroIntroAborted";
    }
  }

  // ----------------------------------------------------------------
  // 2. Utilities
  // ----------------------------------------------------------------

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  // Wraps WAAPI animations so we can cancel everything in flight at once.
  function createAnimationTracker() {
    const live = new Set();
    return {
      track(animation) {
        live.add(animation);
        animation.finished
          .catch(() => {})
          .finally(() => live.delete(animation));
        return animation;
      },
      cancelAll() {
        live.forEach((animation) => {
          try {
            animation.cancel();
          } catch (_) {
            // animation already finished — ignore
          }
        });
        live.clear();
      },
    };
  }

  // ----------------------------------------------------------------
  // 3. iPhone action ticker
  // ----------------------------------------------------------------

  function createIphoneActionTicker(actions) {
    const textEl = document.getElementById("iphone-action-text");
    if (!textEl || !actions.length) {
      return { start() {}, stop() {} };
    }

    let index = 0;
    let startTimer = null;
    let timer = null;
    let changeTimer = null;

    function render(nextIndex, animated) {
      const nextText = actions[nextIndex % actions.length];
      if (changeTimer) {
        window.clearTimeout(changeTimer);
        changeTimer = null;
      }

      if (!animated || PREFERS_REDUCED_MOTION) {
        textEl.textContent = nextText;
        textEl.classList.remove("is-waiting", "is-changing");
        return;
      }

      textEl.classList.remove("is-waiting");
      textEl.classList.add("is-changing");
      changeTimer = window.setTimeout(() => {
        textEl.textContent = nextText;
        textEl.classList.remove("is-changing");
        changeTimer = null;
      }, ACTION_TICKER.fadeOutMs);
    }

    textEl.textContent = "";
    textEl.classList.add("is-waiting");

    return {
      start(initialDelay = ACTION_TICKER.initialDelayMs) {
        if (startTimer || timer || PREFERS_REDUCED_MOTION) return;
        startTimer = window.setTimeout(() => {
          startTimer = null;
          render(index, true);
          timer = window.setInterval(() => {
            index = (index + 1) % actions.length;
            render(index, true);
          }, ACTION_TICKER.intervalMs);
        }, initialDelay);
      },
      stop() {
        if (startTimer) {
          window.clearTimeout(startTimer);
          startTimer = null;
        }
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
        if (changeTimer) {
          window.clearTimeout(changeTimer);
          changeTimer = null;
        }
      },
    };
  }

  // ----------------------------------------------------------------
  // 4. Hero intro animation
  // ----------------------------------------------------------------

  function runHeroIntro() {
    const hero = document.getElementById("hero");
    const layer = document.getElementById("hero-intro-layer");
    const phone = hero ? hero.querySelector(".iphone-lift") : null;
    const revealEls = hero ? hero.querySelectorAll(".hero-reveal") : [];

    function finish() {
      document.body.classList.remove("hero-intro-active");
      document.body.classList.add("hero-intro-complete");
      document.body.classList.add("hero-pos-complete");
      if (layer && layer.parentNode) layer.remove();
    }

    const canAnimate =
      hero &&
      layer &&
      phone &&
      window.CallerCard &&
      !PREFERS_REDUCED_MOTION &&
      "animate" in layer;

    if (!canAnimate) {
      finish();
      return;
    }

    const tracker = createAnimationTracker();

    const requests = shuffle(
      Array.from(
        { length: CARD_CLUSTER_OFFSETS.length },
        (_, i) => HERO_REQUESTS[i % HERO_REQUESTS.length]
      )
    );
    const offsets = shuffle(CARD_CLUSTER_OFFSETS);
    const ticker = createIphoneActionTicker(requests.map((r) => r.action));

    const cards = createHeroCards({ layer, requests, offsets });

    let aborted = false;
    function abort() {
      if (aborted) return;
      aborted = true;
      tracker.cancelAll();
      ticker.stop();
      finish();
    }
    ABORT_EVENTS.forEach((evt) => {
      window.addEventListener(evt, abort, { once: true, passive: true });
    });

    function checkAborted() {
      if (aborted) throw new HeroIntroAborted();
    }

    animateCardEntrances(cards, tracker)
      .then(() => {
        checkAborted();
        return animatePhoneSlide(phone, tracker);
      })
      .then(() => wait(HERO_DURATIONS_MS.postPhoneBeat))
      .then(() => {
        checkAborted();
        return absorbCardsIntoPhone({ layer, phone, cards, tracker });
      })
      .then(() => {
        ticker.start(0);
        return wait(HERO_DURATIONS_MS.postAbsorbBeat);
      })
      .then(() => {
        checkAborted();
        return revealPage({ layer, revealEls, tracker });
      })
      .then(() => {
        checkAborted();
        return emitPosLogos({ phone, tracker });
      })
      .catch((err) => {
        if (!(err instanceof HeroIntroAborted)) console.error(err);
        finish();
      });
  }

  function createHeroCards({ layer, requests, offsets }) {
    const layerRect = layer.getBoundingClientRect();
    const visibleHeight = Math.min(
      window.innerHeight - layerRect.top,
      HERO_LAYOUT.visibleHeightCap
    );
    const centerX = layerRect.width / 2;
    const centerY = visibleHeight * 0.5;

    return offsets.map((offset, index) => {
      const shell = document.createElement("div");
      shell.className = "hero-intro-card";
      shell.append(
        window.CallerCard({
          avatarUrl: `https://i.pravatar.cc/64?img=${index + 12}`,
          quote: requests[index].quote,
        })
      );
      layer.append(shell);

      return {
        el: shell,
        targetX: centerX + offset.dx,
        targetY: centerY + offset.dy,
        rotation: offset.rotation,
      };
    });
  }

  function animateCardEntrances(cards, tracker) {
    let cumulativeDelay = 0;
    const finished = cards.map((card, index) => {
      if (index > 0) cumulativeDelay += CARD_GAPS_MS[index - 1] || 50;
      const { el, targetX, targetY, rotation } = card;
      const base = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

      const animation = el.animate(
        [
          {
            opacity: 0,
            transform: `${base} rotate(${rotation - 8}deg) scale(.7)`,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            transform: `${base} rotate(${rotation}deg) scale(1.08)`,
            filter: "blur(0)",
            offset: 0.7,
          },
          {
            opacity: 1,
            transform: `${base} rotate(${rotation}deg) scale(1)`,
            filter: "blur(0)",
          },
        ],
        {
          delay: cumulativeDelay,
          duration: HERO_DURATIONS_MS.cardEntrance,
          easing: "cubic-bezier(.16, 1, .3, 1)",
          fill: "both",
        }
      );
      tracker.track(animation);
      return animation.finished;
    });

    return Promise.all(finished);
  }

  function animatePhoneSlide(phone, tracker) {
    const animation = phone.animate(
      [
        { opacity: 0.75, transform: "translateX(-50%) translateY(-100%)" },
        { opacity: 0.75, transform: "translateX(-50%) translateY(0)" },
      ],
      {
        duration: HERO_DURATIONS_MS.phoneSlide,
        easing: "cubic-bezier(.22, 1, .36, 1)",
        fill: "both",
      }
    );
    tracker.track(animation);
    return animation.finished;
  }

  function absorbCardsIntoPhone({ layer, phone, cards, tracker }) {
    // Cards fly into the visible center of the iPhone — the iPhone's top is
    // hidden behind the sticky header, so we target the midpoint of the
    // visible portion below the header.
    const layerRect = layer.getBoundingClientRect();
    const phoneRect = phone.getBoundingClientRect();
    const phoneTopInLayer = phoneRect.top - layerRect.top;
    const phoneBottomInLayer = phoneRect.bottom - layerRect.top;
    const visibleTop = Math.max(0, phoneTopInLayer);
    const targetX = phoneRect.left - layerRect.left + phoneRect.width / 2;
    const targetY = (visibleTop + phoneBottomInLayer) / 2;

    const finished = cards.map(
      ({ el, targetX: tx, targetY: ty, rotation }, index) => {
        const base = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
        const midX = tx + (targetX - tx) * 0.4;
        const midY = ty + (targetY - ty) * 0.28;
        const mid = `translate(${midX}px, ${midY}px) translate(-50%, -50%)`;
        const target = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

        const animation = el.animate(
          [
            { opacity: 1, transform: `${base} rotate(${rotation}deg) scale(1)` },
            {
              opacity: 0.78,
              transform: `${mid} rotate(${rotation * 0.3}deg) scale(.34)`,
              offset: 0.42,
            },
            { opacity: 0, transform: `${target} rotate(0deg) scale(.06)` },
          ],
          {
            delay: index * HERO_DURATIONS_MS.cardAbsorbStagger,
            duration: HERO_DURATIONS_MS.cardAbsorb,
            easing: "cubic-bezier(.7, 0, .95, .35)",
            fill: "both",
          }
        );
        tracker.track(animation);
        return animation.finished;
      }
    );

    return Promise.all(finished);
  }

  function revealPage({ layer, revealEls, tracker }) {
    document.body.classList.remove("hero-intro-active");
    document.body.classList.add("hero-intro-complete");

    const layerOut = layer.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: HERO_DURATIONS_MS.layerFade,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    tracker.track(layerOut);
    layerOut.finished
      .then(() => {
        if (layer.parentNode) layer.remove();
      })
      .catch(() => {});

    revealEls.forEach((el, index) => {
      const animation = el.animate(
        [
          { opacity: 0, transform: "translateY(18px) scale(.985)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          delay:
            HERO_DURATIONS_MS.pageRevealDelay +
            index * HERO_DURATIONS_MS.pageRevealStagger,
          duration: HERO_DURATIONS_MS.pageReveal,
          easing: "cubic-bezier(.22, .8, .28, 1)",
          fill: "both",
        }
      );
      tracker.track(animation);
    });

    return wait(HERO_DURATIONS_MS.postRevealBeat);
  }

  // ----------------------------------------------------------------
  // 5. POS logo emission
  // ----------------------------------------------------------------

  function emitPosLogos({ phone, tracker }) {
    const logoShell = document.getElementById("hero-pos-logos");
    const logos = logoShell
      ? Array.from(logoShell.querySelectorAll("[data-pos-logo]"))
      : [];

    if (!logoShell || !logos.length) return Promise.resolve();

    document.body.classList.add("hero-pos-complete");

    const placements = computePosLogoPlacements({ logoShell, phone, logos });

    const finished = placements.map(
      ({ logo, left, top, fromX, fromY, tilt, delayMs }) => {
        logo.style.left = `${left}px`;
        logo.style.top = `${top}px`;

        const animation = logo.animate(
          [
            {
              opacity: 0,
              transform: `translate(${fromX}px, ${fromY}px) scale(.18) rotate(0deg)`,
              filter: "blur(8px)",
            },
            {
              opacity: 0.92,
              transform: `translate(${fromX * 0.28}px, ${fromY * 0.2}px) scale(1.12) rotate(${tilt}deg)`,
              filter: "blur(0)",
              offset: 0.72,
            },
            {
              opacity: 1,
              transform: `translate(0, 0) scale(1) rotate(${tilt}deg)`,
              filter: "blur(0)",
            },
          ],
          {
            delay: delayMs,
            duration: HERO_DURATIONS_MS.posLogoEntrance,
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          }
        );
        tracker.track(animation);
        return animation.finished;
      }
    );

    return Promise.all(finished);
  }

  function computePosLogoPlacements({ logoShell, phone, logos }) {
    const shellRect = logoShell.getBoundingClientRect();
    const phoneRect = phone.getBoundingClientRect();

    const sourceX = phoneRect.left - shellRect.left + phoneRect.width / 2;
    const sourceY = phoneRect.top - shellRect.top + phoneRect.height * 0.72;
    const phoneLeftInShell = phoneRect.left - shellRect.left;
    const phoneRightInShell = phoneLeftInShell + phoneRect.width;
    const phoneBottomInShell = Math.max(0, phoneRect.bottom - shellRect.top);

    const sampleRect = logos[0].getBoundingClientRect();
    const margin = HERO_LAYOUT.posLogoSideMargin;
    const leftZoneWidth = phoneLeftInShell - margin;
    const rightZoneWidth = shellRect.width - (phoneRightInShell + margin);
    const sidesFitLogo =
      leftZoneWidth > sampleRect.width + 8 &&
      rightZoneWidth > sampleRect.width + 8;

    const spots = sidesFitLogo
      ? pickFlankingSpots({ shellRect, sampleRect })
      : pickRowSpots({
          shellRect,
          sampleRect,
          yBase: phoneBottomInShell + 12,
        });

    return logos.map((logo, index) => {
      const rect = logo.getBoundingClientRect();
      let { left, top } = spots[index];

      ({ left, top } = nudgeOffPhone({
        left,
        top,
        rect,
        phoneLeftInShell,
        phoneRightInShell,
        phoneBottomInShell,
        leftZoneWidth,
        rightZoneWidth,
        shellWidth: shellRect.width,
        margin,
      }));

      left = clamp(
        left,
        HERO_LAYOUT.posLogoEdgeClamp,
        shellRect.width - rect.width - HERO_LAYOUT.posLogoEdgeClamp
      );
      top = clamp(
        top,
        HERO_LAYOUT.posLogoEdgeClamp,
        shellRect.height - rect.height - HERO_LAYOUT.posLogoEdgeClamp
      );

      const logoCenterX = left + rect.width / 2;
      const logoCenterY = top + rect.height / 2;
      const fromX = sourceX - logoCenterX;
      const fromY = sourceY - logoCenterY;
      const tilt = Number((Math.random() * 16 - 8).toFixed(2));

      return {
        logo,
        left,
        top,
        fromX,
        fromY,
        tilt,
        delayMs: index * HERO_DURATIONS_MS.posLogoStagger,
      };
    });
  }

  function clamp(value, min, max) {
    if (max < min) return min;
    return Math.max(min, Math.min(max, value));
  }

  // Layouts that flank the iPhone column (kept above the headline). Each
  // combo is 3 anchor centers expressed as fractions of the shell box.
  function pickFlankingSpots({ shellRect, sampleRect }) {
    const COMBOS = [
      [
        { xPct: 0.08, yPct: 0.18 },
        { xPct: 0.18, yPct: 0.74 },
        { xPct: 0.92, yPct: 0.30 },
      ],
      [
        { xPct: 0.10, yPct: 0.42 },
        { xPct: 0.86, yPct: 0.18 },
        { xPct: 0.94, yPct: 0.72 },
      ],
      [
        { xPct: 0.10, yPct: 0.22 },
        { xPct: 0.92, yPct: 0.20 },
        { xPct: 0.20, yPct: 0.78 },
      ],
      [
        { xPct: 0.18, yPct: 0.40 },
        { xPct: 0.84, yPct: 0.66 },
        { xPct: 0.92, yPct: 0.16 },
      ],
    ];
    const combo = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    return shuffle(combo).map((anchor) => ({
      left: anchor.xPct * shellRect.width - sampleRect.width / 2,
      top: anchor.yPct * shellRect.height - sampleRect.height / 2,
    }));
  }

  // Narrow viewports: drop logos into a row just under the phone.
  function pickRowSpots({ shellRect, sampleRect, yBase }) {
    const COMBOS = [
      [
        { left: shellRect.width * 0.18 - sampleRect.width / 2, top: yBase + 14 },
        { left: shellRect.width * 0.50 - sampleRect.width / 2, top: yBase },
        { left: shellRect.width * 0.82 - sampleRect.width / 2, top: yBase + 8 },
      ],
      [
        { left: shellRect.width * 0.16 - sampleRect.width / 2, top: yBase + 6 },
        { left: shellRect.width * 0.48 - sampleRect.width / 2, top: yBase + 18 },
        { left: shellRect.width * 0.80 - sampleRect.width / 2, top: yBase + 2 },
      ],
    ];
    return shuffle(COMBOS[Math.floor(Math.random() * COMBOS.length)]);
  }

  function nudgeOffPhone({
    left,
    top,
    rect,
    phoneLeftInShell,
    phoneRightInShell,
    phoneBottomInShell,
    leftZoneWidth,
    rightZoneWidth,
    shellWidth,
    margin,
  }) {
    const overlapsX =
      left + rect.width > phoneLeftInShell - margin &&
      left < phoneRightInShell + margin;
    const overlapsY =
      top + rect.height > -margin && top < phoneBottomInShell + margin;

    if (!overlapsX || !overlapsY) return { left, top };

    const center = left + rect.width / 2;
    if (center < shellWidth / 2 && leftZoneWidth > rect.width) {
      return { left: phoneLeftInShell - margin - rect.width, top };
    }
    if (center >= shellWidth / 2 && rightZoneWidth > rect.width) {
      return { left: phoneRightInShell + margin, top };
    }
    return { left, top: phoneBottomInShell + margin };
  }

  // ----------------------------------------------------------------
  // 6. FAQ accordion (single-open)
  // ----------------------------------------------------------------

  function setupFaqAccordion() {
    const faqs = document.querySelectorAll("#faq details.faq");
    faqs.forEach((current) => {
      current.addEventListener("toggle", () => {
        if (!current.open) return;
        faqs.forEach((other) => {
          if (other !== current) other.open = false;
        });
      });
    });
  }

  // ----------------------------------------------------------------
  // 7. Header shadow on scroll
  // ----------------------------------------------------------------

  function setupHeaderShadow() {
    const header = document.getElementById("site-header");
    if (!header) return;
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle(
          "shadow-sm",
          window.scrollY > HEADER_SHADOW_AT_PX
        );
      },
      { passive: true }
    );
  }

  // ----------------------------------------------------------------
  // 8. Feature carousel
  // ----------------------------------------------------------------

  function setupFeatureCarousel() {
    const card = document.getElementById("fc-card");
    if (!card) return;

    const pills = card.querySelectorAll(".fc-pill");
    const texts = card.querySelectorAll(".fc-text");
    const visuals = card.querySelectorAll(".fc-visual");
    const totalSteps = pills.length;
    if (totalSteps === 0) return;

    let step = 0;
    let timer = null;

    function render() {
      pills.forEach((p, i) => {
        p.dataset.active = i === step ? "true" : "false";
      });
      texts.forEach((t, i) => t.classList.toggle("active", i === step));
      visuals.forEach((v, i) => v.classList.toggle("active", i === step));
    }

    function advance() {
      step = (step + 1) % totalSteps;
      render();
    }

    function setStep(i) {
      step = ((i % totalSteps) + totalSteps) % totalSteps;
      render();
    }

    function startTimer() {
      stopTimer();
      timer = window.setInterval(advance, CAROUSEL.autoAdvanceMs);
    }
    function stopTimer() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    pills.forEach((pill, i) => {
      pill.addEventListener("click", (e) => {
        e.stopPropagation();
        setStep(i);
        startTimer();
      });
    });

    const advanceBtn = document.getElementById("fc-advance");
    if (advanceBtn) {
      advanceBtn.addEventListener("click", () => {
        advance();
        startTimer();
      });
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });

    render();
    if (PREFERS_REDUCED_MOTION) return;

    startTimer();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });
  }

  // ----------------------------------------------------------------
  // 9. Section reveal on intersection
  // ----------------------------------------------------------------

  function setupSectionReveal() {
    if (!("IntersectionObserver" in window)) return;

    const reveal = document.querySelectorAll(
      "section:not(#hero) h1, section:not(#hero) h2, section:not(#hero) h3, section:not(#hero) .rounded-3xl"
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.transition =
            "opacity 600ms ease, transform 600ms ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        });
      },
      { threshold: SECTION_REVEAL_THRESHOLD }
    );

    reveal.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      io.observe(el);
    });
  }

  // ----------------------------------------------------------------
  // 10. Book demo form
  // ----------------------------------------------------------------

  function setupBookDemoForm() {
    const form = document.querySelector(".signup-card form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector(".form-submit");
      if (!button) return;

      const originalHtml = button.innerHTML;
      button.disabled = true;
      button.textContent = "Thanks — we'll be in touch.";

      window.setTimeout(() => {
        button.innerHTML = originalHtml;
        button.disabled = false;
        form.reset();
      }, 4200);
    });
  }

  // ----------------------------------------------------------------
  // 11. Init
  // ----------------------------------------------------------------

  runHeroIntro();
  setupFaqAccordion();
  setupHeaderShadow();
  setupFeatureCarousel();
  setupSectionReveal();
  setupBookDemoForm();
})();
