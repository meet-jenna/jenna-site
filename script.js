// ===== ElevenLabs agents page recreation — interactivity =====

(function () {
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    "section h1, section h2, section h3, section .rounded-3xl"
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
