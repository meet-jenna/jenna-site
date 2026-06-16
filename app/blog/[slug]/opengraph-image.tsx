import { ImageResponse } from "next/og"
import { getPost, getAllPostSlugs } from "../../../lib/blog"

export const alt = "Jenna Blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export default function BlogOgImage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const title = post?.title ?? "Jenna Blog"
  const category = post?.category ?? "Restaurant Voice AI"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#EFEFEF",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#101010",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            J
          </div>
          <div style={{ color: "#6B7280", fontSize: "28px", fontWeight: 500 }}>{category}</div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#242424",
            fontSize: "62px",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: "#242424", fontSize: "28px", fontWeight: 500 }}>meetjenna.ai/blog</div>
          <div style={{ color: "#6B7280", fontSize: "24px", fontWeight: 400 }}>The Jenna Blog</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
