# Logo Library

Brand and integration logos available for use on the site. These are distinct from photos — see `assets/photos/PHOTOS.md` for photographs.

When asking an agent to use these:
> "See `assets/logos/LOGOS.md`. Replace the header logo with `jenna-logo.png` and add Square / Clover / Toast logos to the integrations row."

---

## Logos

### jenna-wordmark.png  ← primary brand mark
- **Path:** `assets/logos/jenna-wordmark.png`
- **Brand:** Jenna AI (this site's own brand)
- **Subject:** "Jenna" wordmark in saturated blue. The "e" is stylized as three horizontal bars (equalizer / audio waveform).
- **Format:** PNG, 1024×365, transparent background
- **Aspect ratio:** ~2.8:1 (wide)
- **Suggested use:**
  - Header logo (currently used in `index.html` `<header>` — replaces the icon + "Jenna AI" text)
  - iPhone hero screen (currently used in `.iphone-jenna`)
  - Anywhere a horizontal wordmark is appropriate
- **Alt text:** "Jenna AI" (or just "Jenna" in decorative contexts)
- **Notes:**
  - Generated from `Jenna_AI__6_-...png` by chroma-keying the solid black background to transparent.
  - Brand blue is approximately `#1F00FF` (pure blue). Tailwind `accent` is currently `#2563eb` — consider matching.

### jenna-logo.png  ← square icon variant
- **Path:** `assets/logos/jenna-logo.png`
- **Brand:** Jenna AI
- **Subject:** Same "Jenna" wordmark, centered on a solid black square (icon-style).
- **Format:** PNG, 1024×1024, square, solid black background
- **Suggested use:**
  - Favicon / app icon source
  - Footer brand mark (currently used in `<footer>` of `index.html`)
  - Social / OG image fallback
- **Alt text:** "Jenna AI"
- **Notes:** Use this where a compact square mark is preferred. For wide placements use `jenna-wordmark.png`.

### square-logo.png
- **Path:** `assets/logos/square-logo.png`
- **Brand:** Square (POS / payments integration)
- **Subject:** Square's white concentric-square mark on a black square background.
- **Format:** PNG, 1024×1024, square
- **Background:** Solid black
- **Suggested use:** "Integrations" / "Works with" row alongside Clover and Toast
- **Alt text:** "Square"
- **Notes:** Black background — consider extracting a transparent version, or display these icon tiles as-is on a dark integrations strip. The three POS logos (Square / Clover / Toast) all have different background colors, so a unified treatment will help (e.g. render each as a rounded tile and let their native colors show).

### clover-logo.png
- **Path:** `assets/logos/clover-logo.png`
- **Brand:** Clover (POS / payments integration)
- **Subject:** Clover's four-leaf mark in white on a green circular background.
- **Format:** PNG, 1024×1024, square (mark is circular within)
- **Background:** White (outside the green circle)
- **Suggested use:** "Integrations" / "Works with" row alongside Square and Toast
- **Alt text:** "Clover"
- **Notes:** Green is Clover's brand green. The white field around the circle means it'll blend on a white site background — fine, the green circle reads as the logo.

### toast-logo.png
- **Path:** `assets/logos/toast-logo.png`
- **Brand:** Toast (restaurant POS integration)
- **Subject:** White bread/toast outline on Toast's orange rounded-square background.
- **Format:** PNG, 1024×1024, square
- **Background:** Toast orange (~ #FF4F1F)
- **Suggested use:** "Integrations" / "Works with" row alongside Square and Clover
- **Alt text:** "Toast"
- **Notes:** Reads well as a rounded app-icon tile.

---

## Suggested integrations row

The three POS logos (Square / Clover / Toast) clearly imply this is a restaurant / hospitality voice-agent product. A typical placement:

> "Connects to your existing POS — Square, Clover, Toast"

Render as a horizontal strip of three rounded tiles (each logo as its native square asset, ~64–80px), centered under a section heading. The Jenna logo replaces the header placeholder.

## Open questions for the user

- Do you want **transparent-background** versions of `jenna-logo.png` and `square-logo.png` for use on the white site? I can either ask you to export them, or attempt background removal in-place.
- Should the site's accent color be updated to match the Jenna blue (~`#1F00FF`)? Current Tailwind `accent` is `#2563eb`.
- Confirm: are Square / Clover / Toast actual integration partners we want to call out by name, or placeholders?
