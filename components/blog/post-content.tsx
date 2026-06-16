import type React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ContentBlock } from "../../lib/blog/types"

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g

/** Renders text with markdown-style links: [label](/path) or [label](https://…). */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  INLINE_LINK.lastIndex = 0

  while ((match = INLINE_LINK.exec(text)) !== null) {
    const [full, label, href] = match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const isInternal = href.startsWith("/")
    if (isInternal) {
      nodes.push(
        <Link key={match.index} href={href} className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280] transition-colors">
          {label}
        </Link>,
      )
    } else {
      nodes.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280] transition-colors">
          {label}
        </a>,
      )
    }
    lastIndex = match.index + full.length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

export default function PostContent({ body }: { body: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={index} className="mt-4 text-[#242424] text-2xl sm:text-3xl font-semibold leading-tight font-sans tracking-tight scroll-mt-24">
                {block.text}
              </h2>
            ) : (
              <h3 key={index} className="mt-2 text-[#242424] text-xl sm:text-2xl font-semibold leading-tight font-sans">
                {block.text}
              </h3>
            )
          case "paragraph":
            return (
              <p key={index} className="text-[#374151] text-base md:text-lg font-normal leading-8 font-sans">
                {renderInline(block.text)}
              </p>
            )
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul"
            return (
              <ListTag
                key={index}
                className={`flex flex-col gap-2.5 pl-5 text-[#374151] text-base md:text-lg leading-8 font-sans ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, i) => (
                  <li key={i} className="pl-1.5">
                    {renderInline(item)}
                  </li>
                ))}
              </ListTag>
            )
          }
          case "quote":
            return (
              <blockquote key={index} className="border-l-2 border-[#101010] pl-5 py-1 flex flex-col gap-2">
                <p className="text-[#242424] text-lg md:text-xl font-normal leading-8 font-serif italic">
                  “{renderInline(block.text)}”
                </p>
                {block.cite && (
                  <cite className="text-[#6B7280] text-sm font-medium not-italic font-sans">— {block.cite}</cite>
                )}
              </blockquote>
            )
          case "table":
            return (
              <figure key={index} className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm sm:text-base font-sans">
                  <thead>
                    <tr className="border-b border-[rgba(36,36,36,0.16)]">
                      {block.headers.map((header, i) => (
                        <th key={i} className="py-3 pr-4 text-[#242424] font-semibold align-bottom">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-[rgba(36,36,36,0.08)]">
                        {row.map((cell, c) => (
                          <td key={c} className={`py-3 pr-4 align-top ${c === 0 ? "text-[#242424] font-medium" : "text-[#6B7280]"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.caption && (
                  <figcaption className="mt-2 text-[#9CA3AF] text-xs font-sans">{block.caption}</figcaption>
                )}
              </figure>
            )
          case "cta":
            return (
              <div key={index} className="my-2 bg-[#EFEFEF] rounded-[6px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-[#242424] text-base sm:text-lg font-medium font-sans">{block.text}</p>
                <Link
                  href={block.href}
                  className="shrink-0 h-11 px-6 bg-[#101010] rounded-[6px] flex justify-center items-center hover:bg-[#242424] transition-colors text-white text-[14px] font-medium font-sans gap-1.5"
                >
                  {block.label}
                  <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                </Link>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
