import type React from "react"

interface YourWorkInSyncProps {
  /** Fixed width from Figma: 482px */
  width?: number | string
  /** Fixed height from Figma: 300px */
  height?: number | string
  /** Optional className to pass to root */
  className?: string
  /** Theme palette */
  theme?: "light" | "dark"
}

/**
 * Your work, in sync – Chat conversation UI
 * Generated from Figma via MCP with exact measurements (482×300px)
 * Single-file component following the v0-ready pattern used in this repo.
 */
const YourWorkInSync: React.FC<YourWorkInSyncProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  // Design tokens (derived from Figma local variables)
  const themeVars =
    theme === "light"
      ? {
          "--yws-surface": "#ffffff",
          "--yws-text-primary": "#242424",
          "--yws-text-secondary": "#6b7280",
          "--yws-bubble-light": "#E5E7EB",
          "--yws-bubble-dark": "#101010",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(0,0,0,0.08)",
          "--yws-shadow": "rgba(0,0,0,0.08)",
        }
      : ({
          "--yws-surface": "#1f2937",
          "--yws-text-primary": "#f9fafb",
          "--yws-text-secondary": "#d1d5db",
          "--yws-bubble-light": "#374151",
          "--yws-bubble-dark": "#111827",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(255,255,255,0.12)",
          "--yws-shadow": "rgba(0,0,0,0.24)",
        } as React.CSSProperties)

  // Figma-exported assets
  const imgFrame2147223205 = "/professional-woman-avatar-with-short-brown-hair-an.jpg"
  const imgFrame2147223206 = "/professional-man-avatar-with-beard-and-glasses-loo.jpg"
  const imgFrame2147223207 = "/professional-person-avatar-with-curly-hair-and-war.jpg"

  return (
    <div
      className={className}
      style={
        {
          width,
          height,
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Chat conversation showing team collaboration sync"
    >
      {/* Root frame size 482×300 – content centered */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "356px",
          height: "216px",
        }}
      >
        {/* Remove the flip transformation and position messages normally */}
        <div style={{ width: "356px", height: "216px", position: "relative", transform: "scale(1.1)" }}>
          {/* Message 1: Left side with avatar */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              width: "356px",
              height: "36px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "44px",
                backgroundImage: `url('${imgFrame2147223205}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid var(--yws-border)",
                flexShrink: 0,
              }}
            />
            {/* Message bubble */}
            <div
              style={{
                background: theme === "light" ? "#E5E7EB" : "var(--yws-bubble-light)",
                borderRadius: "999px",
                padding: "0px 12px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "16px",
                  letterSpacing: "-0.4px",
                  color: theme === "light" ? "#242424" : "var(--yws-text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                Hey, can I order 2 pies?
              </span>
            </div>
          </div>

          {/* Message 2: Right side with avatar */}
          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "60px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            {/* Message bubble */}
            <div
              style={{
                background: theme === "light" ? "#101010" : "var(--yws-bubble-dark)",
                borderRadius: "999px",
                padding: "0px 12px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "16px",
                  letterSpacing: "-0.4px",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                Of course! Pickup or delivery?
              </span>
            </div>
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "44px",
                backgroundImage: `url('${imgFrame2147223206}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid var(--yws-border)",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Message 3: Left side with avatar */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "120px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              width: "210px",
              height: "36px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "44px",
                backgroundImage: `url('${imgFrame2147223207}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid var(--yws-border)",
                flexShrink: 0,
              }}
            />
            {/* Message bubble */}
            <div
              style={{
                background: theme === "light" ? "#E5E7EB" : "var(--yws-bubble-light)",
                borderRadius: "999px",
                padding: "0px 12px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "16px",
                  letterSpacing: "-0.4px",
                  color: theme === "light" ? "#242424" : "var(--yws-text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                Pickup please
              </span>
            </div>
          </div>

          {/* Message 4: Center with send button */}
          <div
            style={{
              position: "absolute",
              left: "146px",
              top: "180px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              height: "36px",
            }}
          >
            {/* Message bubble */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "0px 12px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 1px 2px -0.4px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#242424",
                  whiteSpace: "nowrap",
                }}
              >
                Got it — ready in 20!
              </span>
            </div>
            {/* Audio wave indicator */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "44px",
                background: theme === "light" ? "#101010" : "var(--yws-bubble-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.08)",
                flexShrink: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="2.5" height="2" rx="1.25" fill="#ffffff" />
                <rect x="7" y="8" width="2.5" height="8" rx="1.25" fill="#ffffff" />
                <rect x="11" y="5" width="2.5" height="14" rx="1.25" fill="#ffffff" />
                <rect x="15" y="8" width="2.5" height="8" rx="1.25" fill="#ffffff" />
                <rect x="19" y="11" width="2.5" height="2" rx="1.25" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourWorkInSync
