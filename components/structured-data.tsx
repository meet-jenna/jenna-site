/**
 * Renders one or more JSON-LD objects as <script type="application/ld+json">.
 * Safe to render inside server or client components — the markup is present
 * in the initial server-rendered HTML, which is what crawlers read.
 */
export default function StructuredData({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[]
}) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
