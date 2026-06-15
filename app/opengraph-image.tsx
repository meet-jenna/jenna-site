import { ImageResponse } from "next/og"

export const alt = "Jenna — AI Voice Hostess & Phone Answering for Restaurants"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF9FB",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#101010",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            J
          </div>
          <div style={{ color: "#242424", fontSize: "44px", fontWeight: 600 }}>Jenna</div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              color: "#242424",
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "900px",
            }}
          >
            The AI Hostess for Every Restaurant
          </div>
          <div style={{ color: "#6B7280", fontSize: "34px", fontWeight: 400, maxWidth: "820px" }}>
            Answers every call, takes every order, and books reservations — 24/7, synced to your POS.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: "#242424", fontSize: "30px", fontWeight: 500 }}>meetjenna.ai</div>
          <div style={{ color: "#6B7280", fontSize: "26px", fontWeight: 400 }}>Voice AI for Restaurants</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
