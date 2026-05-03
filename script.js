// ===== ElevenLabs agents page recreation — interactivity =====

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const heroRequestActions = [
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

      if (!animated || prefersReducedMotion) {
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
      }, 180);
    }

    textEl.textContent = "";
    textEl.classList.add("is-waiting");

    return {
      start(initialDelay = 900) {
        if (startTimer || timer || prefersReducedMotion) return;
        startTimer = window.setTimeout(() => {
          startTimer = null;
          render(index, true);
          timer = window.setInterval(() => {
            index = (index + 1) % actions.length;
            render(index, true);
          }, 3400);
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

    if (!hero || !layer || !phone || !window.CallerCard) {
      finish();
      return;
    }

    if (prefersReducedMotion || !("animate" in layer)) {
      finish();
      return;
    }

    // Tight central pile — pixel offsets from cluster center.
    const clusterOffsets = [
      { dx: -10, dy: -95, r: -6 },
      { dx: 80, dy: -55, r: 4 },
      { dx: -90, dy: -25, r: -3 },
      { dx: 50, dy: -10, r: 5 },
      { dx: -50, dy: 25, r: 6 },
      { dx: 95, dy: 35, r: -4 },
      { dx: -100, dy: 65, r: 3 },
    ];

    // Decelerating gaps between cards (ms): 1500, 1300, 1000, then continuing
    // down. 6 gaps for 7 cards — last card lands at ~5.2s.
    const cardGaps = [1500, 1300, 1000, 700, 500, 300];

    function shuffle(items) {
      const copy = items.slice();
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    const shuffledRequests = shuffle(
      Array.from(
        { length: clusterOffsets.length },
        (_, i) => heroRequestActions[i % heroRequestActions.length]
      )
    );
    const shuffledOffsets = shuffle(clusterOffsets);
    const actionTicker = createIphoneActionTicker(
      shuffledRequests.map((request) => request.action)
    );

    const layerRect = layer.getBoundingClientRect();
    const visibleHeight = Math.min(window.innerHeight - layerRect.top, 760);
    const centerX = layerRect.width / 2;
    const centerY = visibleHeight * 0.5;

    const cards = shuffledOffsets.map((offset, index) => {
      const shell = document.createElement("div");
      shell.className = "hero-intro-card";
      shell.append(
        window.CallerCard({
          avatarUrl: `https://i.pravatar.cc/64?img=${index + 12}`,
          quote: shuffledRequests[index].quote,
        })
      );
      layer.append(shell);

      return {
        el: shell,
        tx: centerX + offset.dx,
        ty: centerY + offset.dy,
        r: offset.r,
      };
    });

    let aborted = false;
    const liveAnimations = new Set();

    function track(animation) {
      liveAnimations.add(animation);
      animation.finished
        .catch(() => {})
        .finally(() => liveAnimations.delete(animation));
      return animation;
    }

    function wait(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    }

    function emitPosLogos() {
      const logoShell = document.getElementById("hero-pos-logos");
      const logos = logoShell
        ? Array.from(logoShell.querySelectorAll("[data-pos-logo]"))
        : [];

      if (!logoShell || !logos.length) return Promise.resolve();

      document.body.classList.add("hero-pos-complete");

      const shellRect = logoShell.getBoundingClientRect();
      const phoneRect = phone.getBoundingClientRect();
      const sourceX =
        phoneRect.left - shellRect.left + phoneRect.width / 2;
      const sourceY =
        phoneRect.top - shellRect.top + phoneRect.height * 0.72;

      const phoneLeftInShell = phoneRect.left - shellRect.left;
      const phoneRightInShell = phoneLeftInShell + phoneRect.width;
      const phoneBottomInShell = Math.max(
        0,
        phoneRect.bottom - shellRect.top
      );

      const sampleRect = logos[0].getBoundingClientRect();
      const sideMargin = 12;
      const leftZoneWidth = phoneLeftInShell - sideMargin;
      const rightZoneWidth =
        shellRect.width - (phoneRightInShell + sideMargin);
      const sidesFitLogo =
        leftZoneWidth > sampleRect.width + 8 &&
        rightZoneWidth > sampleRect.width + 8;

      function shuffleArr(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      }

      let spots;
      if (sidesFitLogo) {
        // A handful of intentional layouts that flank the iPhone column and
        // stay above the headline. Each combo is 3 anchor centers expressed
        // as fractions of the shell box.
        const combos = [
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
        const combo = combos[Math.floor(Math.random() * combos.length)];
        spots = shuffleArr(combo).map((anchor) => ({
          left: anchor.xPct * shellRect.width - sampleRect.width / 2,
          top: anchor.yPct * shellRect.height - sampleRect.height / 2,
        }));
      } else {
        // Narrow viewports: drop into a row just under the phone.
        const yBase = phoneBottomInShell + 12;
        const rowCombos = [
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
        spots = shuffleArr(
          rowCombos[Math.floor(Math.random() * rowCombos.length)]
        );
      }

      const logoAnimations = logos.map((logo, index) => {
        const rect = logo.getBoundingClientRect();
        let { left, top } = spots[index];

        const overlapsPhoneX =
          left + rect.width > phoneLeftInShell - sideMargin &&
          left < phoneRightInShell + sideMargin;
        const overlapsPhoneY =
          top + rect.height > -sideMargin &&
          top < phoneBottomInShell + sideMargin;

        if (overlapsPhoneX && overlapsPhoneY) {
          const center = left + rect.width / 2;
          if (
            center < shellRect.width / 2 &&
            leftZoneWidth > rect.width
          ) {
            left = phoneLeftInShell - sideMargin - rect.width;
          } else if (
            center >= shellRect.width / 2 &&
            rightZoneWidth > rect.width
          ) {
            left = phoneRightInShell + sideMargin;
          } else {
            top = phoneBottomInShell + sideMargin;
          }
        }

        left = Math.max(
          4,
          Math.min(shellRect.width - rect.width - 4, left)
        );
        top = Math.max(
          4,
          Math.min(shellRect.height - rect.height - 4, top)
        );

        logo.style.left = `${left}px`;
        logo.style.top = `${top}px`;

        const logoCenterX = left + rect.width / 2;
        const logoCenterY = top + rect.height / 2;
        const fromX = sourceX - logoCenterX;
        const fromY = sourceY - logoCenterY;
        const tilt = (Math.random() * 16 - 8).toFixed(2);

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
            delay: index * 200,
            duration: 720,
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          }
        );

        track(animation);
        return animation.finished;
      });

      return Promise.all(logoAnimations);
    }

    function revealPage() {
      if (aborted) throw new Error("aborted");
      // Header and hero content reveal only after the requests have been
      // absorbed and the iPhone has started thinking.
      document.body.classList.remove("hero-intro-active");
      document.body.classList.add("hero-intro-complete");

      const layerOut = layer.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: 200,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      track(layerOut);
      layerOut.finished
        .then(() => {
          if (layer.parentNode) layer.remove();
        })
        .catch(() => {});

      revealEls.forEach((el, index) => {
        const anim = el.animate(
          [
            { opacity: 0, transform: "translateY(18px) scale(.985)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            delay: 120 + index * 110,
            duration: 620,
            easing: "cubic-bezier(.22, .8, .28, 1)",
            fill: "both",
          }
        );
        track(anim);
      });

      return wait(850);
    }

    function abort() {
      if (aborted) return;
      aborted = true;
      liveAnimations.forEach((animation) => {
        try {
          animation.cancel();
        } catch (_) {
          // ignore
        }
      });
      actionTicker.stop();
      finish();
    }

    ["scroll", "wheel", "touchmove", "keydown"].forEach((evt) => {
      window.addEventListener(evt, abort, { once: true, passive: true });
    });

    function abortGuard(err) {
      if (err && err.message === "aborted") return;
      console.error(err);
      finish();
    }

    let cumulativeDelay = 0;
    const entrancePromises = cards.map((card, index) => {
      if (index > 0) cumulativeDelay += cardGaps[index - 1] || 50;
      const { el, tx, ty, r } = card;
      const base = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;

      const animation = el.animate(
        [
          {
            opacity: 0,
            transform: `${base} rotate(${r - 8}deg) scale(.7)`,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            transform: `${base} rotate(${r}deg) scale(1.08)`,
            filter: "blur(0)",
            offset: 0.7,
          },
          {
            opacity: 1,
            transform: `${base} rotate(${r}deg) scale(1)`,
            filter: "blur(0)",
          },
        ],
        {
          delay: cumulativeDelay,
          duration: 360,
          easing: "cubic-bezier(.16, 1, .3, 1)",
          fill: "both",
        }
      );
      track(animation);
      return animation.finished;
    });

    Promise.all(entrancePromises)
      .then(() => {
        if (aborted) throw new Error("aborted");
        // iPhone slides down from behind the header into its resting position.
        const phoneAnim = phone.animate(
          [
            {
              opacity: 0.75,
              transform: "translateX(-50%) translateY(-100%)",
            },
            {
              opacity: 0.75,
              transform: "translateX(-50%) translateY(0)",
            },
          ],
          {
            duration: 720,
            easing: "cubic-bezier(.22, 1, .36, 1)",
            fill: "both",
          }
        );
        track(phoneAnim);
        return phoneAnim.finished;
      })
      .then(
        () =>
          new Promise((resolve) => {
            // Brief beat so the user registers "Jenna".
            window.setTimeout(resolve, 500);
          })
      )
      .then(() => {
        if (aborted) throw new Error("aborted");
        // Absorption: all cards fly into the visible center of the iPhone
        // (the iPhone is mostly hidden behind the header, so we target the
        // midpoint of the visible portion below the header).
        const layerRect2 = layer.getBoundingClientRect();
        const phoneRect = phone.getBoundingClientRect();
        const phoneTopInLayer = phoneRect.top - layerRect2.top;
        const phoneBottomInLayer = phoneRect.bottom - layerRect2.top;
        const visibleTop = Math.max(0, phoneTopInLayer);
        const targetX =
          phoneRect.left - layerRect2.left + phoneRect.width / 2;
        const targetY = (visibleTop + phoneBottomInLayer) / 2;

        const absorptions = cards.map(({ el, tx, ty, r }, index) => {
          const base = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
          const midX = tx + (targetX - tx) * 0.4;
          const midY = ty + (targetY - ty) * 0.28;
          const mid = `translate(${midX}px, ${midY}px) translate(-50%, -50%)`;
          const target = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

          const animation = el.animate(
            [
              {
                opacity: 1,
                transform: `${base} rotate(${r}deg) scale(1)`,
              },
              {
                opacity: 0.78,
                transform: `${mid} rotate(${r * 0.3}deg) scale(.34)`,
                offset: 0.42,
              },
              {
                opacity: 0,
                transform: `${target} rotate(0deg) scale(.06)`,
              },
            ],
            {
              delay: index * 28,
              duration: 700,
              easing: "cubic-bezier(.7, 0, .95, .35)",
              fill: "both",
            }
          );
          track(animation);
          return animation.finished;
        });

        return Promise.all(absorptions).then(() => {
          actionTicker.start(0);
          return wait(450);
        });
      })
      .then(revealPage)
      .then(() => {
        if (aborted) throw new Error("aborted");
        return emitPosLogos();
      })
      .catch(abortGuard);
  }

  runHeroIntro();

  const faqs = document.querySelectorAll("#faq details.faq");
  faqs.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) {
        faqs.forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });

  const header = document.getElementById("site-header");
  let last = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      header.classList.toggle("shadow-sm", y > 8);
      last = y;
    },
    { passive: true }
  );

  const voiceBtn = document.getElementById("voice-chat");
  if (voiceBtn) {
    voiceBtn.addEventListener("click", (e) => {
      e.preventDefault();
      voiceBtn.classList.toggle("bg-emerald-600");
      const label = voiceBtn.querySelector("span:nth-child(2)");
      if (label) {
        label.textContent =
          label.textContent.trim() === "Voice chat"
            ? "Listening…"
            : "Voice chat";
      }
    });
  }

  // Feature carousel: auto-cycle, mouse-tracking gradient, click-to-advance
  const fcCard = document.getElementById("fc-card");
  if (fcCard) {
    const TOTAL = 4;
    const INTERVAL_MS = 3000;
    const pills = fcCard.querySelectorAll(".fc-pill");
    const texts = fcCard.querySelectorAll(".fc-text");
    const visuals = fcCard.querySelectorAll(".fc-visual");
    let step = 0;
    let timer = null;

    function render() {
      pills.forEach((p, i) => {
        p.dataset.active = i === step ? "true" : "false";
        p.dataset.completed = i < step ? "true" : "false";
      });
      texts.forEach((t, i) => t.classList.toggle("active", i === step));
      visuals.forEach((v, i) => v.classList.toggle("active", i === step));
    }

    function advance() {
      step = (step + 1) % TOTAL;
      render();
    }

    function setStep(i) {
      step = ((i % TOTAL) + TOTAL) % TOTAL;
      render();
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(advance, INTERVAL_MS);
    }
    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    pills.forEach((p, i) => {
      p.addEventListener("click", (e) => {
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

    fcCard.addEventListener("mousemove", (e) => {
      const rect = fcCard.getBoundingClientRect();
      fcCard.style.setProperty("--x", `${e.clientX - rect.left}px`);
      fcCard.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });

    if (prefersReducedMotion) {
      render();
    } else {
      render();
      startTimer();
      // pause when tab is hidden
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopTimer();
        else startTimer();
      });
    }
  }

  const reveal = document.querySelectorAll(
    "section:not(#hero) h1, section:not(#hero) h2, section:not(#hero) h3, section:not(#hero) .rounded-3xl"
  );
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition =
              "opacity 600ms ease, transform 600ms ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    reveal.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      io.observe(el);
    });
  }
})();
