import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const demoSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(200),
  restaurant: z.string().trim().min(1).max(200),
})

const TO_EMAIL = process.env.DEMO_TO_EMAIL ?? "mail@meetjenna.ai"
const FROM_EMAIL =
  process.env.DEMO_FROM_EMAIL ?? "Jenna Demo <onboarding@resend.dev>"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured")
    return NextResponse.json(
      { error: "Demo submissions are temporarily unavailable." },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = demoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 })
  }

  const { name, phone, email, restaurant } = parsed.data
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `Demo request — ${restaurant}`,
    text: [
      "New Book a Demo submission",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Restaurant: ${restaurant}`,
    ].join("\n"),
    html: `
      <h2>New Book a Demo submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Restaurant:</strong> ${escapeHtml(restaurant)}</p>
    `,
  })

  if (error) {
    console.error("Failed to send demo email:", error)
    return NextResponse.json(
      { error: "Could not send your request. Please try again." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
