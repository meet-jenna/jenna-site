"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRight, Check } from "lucide-react"

type FormState = {
  name: string
  phone: string
  email: string
  restaurant: string
}

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  email: "",
  restaurant: "",
}

export default function DemoForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="w-full max-w-[460px] bg-white rounded-[6px] border border-[rgba(36, 36, 36,0.10)] shadow-[0px_8px_24px_rgba(36, 36, 36,0.06)] p-8 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
          <Check className="w-6 h-6 text-[#16A34A]" strokeWidth={2.5} />
        </div>
        <div className="text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
          You&apos;re all set, {values.name.split(" ")[0] || "thanks"}!
        </div>
        <p className="text-[#6B7280] text-[15px] leading-7 font-sans">
          We&apos;ll reach out shortly to schedule your live demo and show you how Jenna handles every call for{" "}
          <span className="text-[#242424] font-medium">{values.restaurant || "your restaurant"}</span>.
        </p>
      </div>
    )
  }

  return (
    <div
      id="demo-form"
      className="w-full max-w-[460px] bg-white rounded-[6px] border border-[rgba(36, 36, 36,0.10)] shadow-[0px_8px_24px_rgba(36, 36, 36,0.06)] p-6 sm:p-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1">
        <div className="text-[#242424] text-lg font-semibold leading-tight font-sans tracking-tight">
          Book your demo
        </div>
        <p className="text-[#6B7280] text-[13px] leading-5 font-sans">
          Tell us where to reach you and we&apos;ll set up a live walkthrough.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Name" required>
          <input
            type="text"
            required
            value={values.name}
            onChange={handleChange("name")}
            placeholder="Jamie Rivera"
            className="demo-input"
          />
        </Field>

        <Field label="Phone number" required>
          <input
            type="tel"
            required
            value={values.phone}
            onChange={handleChange("phone")}
            placeholder="(555) 123-4567"
            className="demo-input"
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            required
            value={values.email}
            onChange={handleChange("email")}
            placeholder="you@restaurant.com"
            className="demo-input"
          />
        </Field>

        <Field label="Restaurant" required>
          <input
            type="text"
            required
            value={values.restaurant}
            onChange={handleChange("restaurant")}
            placeholder="The Corner Bistro"
            className="demo-input"
          />
        </Field>

        <button
          type="submit"
          className="mt-1 h-11 px-6 relative bg-[#101010] shadow-[0px_2px_4px_rgba(36, 36, 36,0.12)] overflow-hidden rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#242424] transition-colors"
        >
          <div className="w-full h-[41px] absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply" />
          <div className="flex flex-row items-center justify-center gap-1.5 text-white text-[15px] font-medium leading-5 font-sans">
            Book a Demo
            <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
          </div>
        </button>

        <p className="text-[#6B7280] text-[11px] leading-4 font-sans text-center">
          By submitting this form, you agree to be contacted by Jenna about a demo.
        </p>
      </form>

      <style jsx>{`
        :global(.demo-input) {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 6px;
          border: 1px solid rgba(36, 36, 36, 0.12);
          background: #faf9fb;
          color: #242424;
          font-size: 14px;
          font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        :global(.demo-input::placeholder) {
          color: #6B7280;
        }
        :global(.demo-input:focus) {
          border-color: rgba(36, 36, 36, 0.4);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(36, 36, 36, 0.06);
        }
      `}</style>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[#242424] text-[13px] font-medium leading-4 font-sans">
        {label}
        {required && <span className="text-[#6B7280]"> *</span>}
      </span>
      {children}
    </label>
  )
}
