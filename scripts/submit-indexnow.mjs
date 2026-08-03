#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, etc.) about all public marketing URLs.
 * Run after production deploy: node scripts/submit-indexnow.mjs
 */

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.meetjenna.ai").replace(/\/$/, "")
const KEY = "jenna8f3a91c2e6b047d5a1"

const paths = [
  "/",
  "/about",
  "/contact",
  "/press",
  "/partners",
  "/privacy",
  "/terms",
  "/book-demo",
  "/blog",
  "/integrations",
  "/voice-ai-for-restaurants",
  "/ai-phone-answering",
  "/restaurant-answering-service",
  "/ai-hostess",
  "/blog/what-is-jenna-ai",
  "/blog/jenna-ai-for-restaurants",
  "/blog/jenna-case-study-vitos-northport",
  "/blog/jenna-vs-heytara",
  "/blog/hear-jenna-take-an-order",
  "/blog/best-voice-ai-for-restaurants-2026",
  "/blog/jenna-vs-slang-vs-loman",
  "/blog/ai-phone-answering-service-cost",
  "/blog/stop-missing-restaurant-calls",
  "/integrations/toast",
  "/integrations/square",
  "/integrations/clover",
  "/integrations/oracle-micros",
  "/integrations/ncr-aloha",
  "/integrations/lightspeed",
  "/integrations/shift4",
  "/integrations/flipdish",
  "/integrations/dripos",
  "/integrations/gotab",
]

const urlList = paths.map((p) => `${SITE}${p === "/" ? "/" : p}`)
const host = new URL(SITE).host

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
})

const text = await res.text()
console.log(`IndexNow status=${res.status} urls=${urlList.length}`)
if (text) console.log(text)
if (![200, 202].includes(res.status)) process.exit(1)
