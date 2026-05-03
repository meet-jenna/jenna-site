// Reusable CallerCard component for the Jenna hero intro.
(function () {
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

    const text = document.createElement("p");
    text.className = "caller-card__quote";
    text.textContent = quote;

    card.append(avatar, text);

    return card;
  }

  window.CallerCard = CallerCard;
})();
