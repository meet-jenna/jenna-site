// Reusable CallerCard component for the Jenna hero intro.
//
// Renders a glassy caller pill with an avatar and a quoted question.
// Falls back to a soft tinted block if the avatar URL fails to load,
// so a third-party outage (e.g. i.pravatar.cc) never leaves a broken
// image icon hanging in the hero animation.
(function () {
  const FALLBACK_AVATAR_BG = "#eeeef1";

  function CallerCard({ avatarUrl, quote }) {
    const card = document.createElement("article");
    card.className = "caller-card";

    const avatar = document.createElement("img");
    avatar.className = "caller-card__avatar";
    avatar.src = avatarUrl;
    avatar.alt = "";
    avatar.width = 42;
    avatar.height = 42;
    avatar.loading = "lazy";
    avatar.decoding = "async";
    avatar.addEventListener("error", () => {
      avatar.removeAttribute("src");
      avatar.style.background = FALLBACK_AVATAR_BG;
    }, { once: true });

    const text = document.createElement("p");
    text.className = "caller-card__quote";
    text.textContent = quote;

    card.append(avatar, text);

    return card;
  }

  window.CallerCard = CallerCard;
})();
