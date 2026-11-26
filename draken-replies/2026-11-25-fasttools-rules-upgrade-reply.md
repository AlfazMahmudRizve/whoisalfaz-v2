# Reply: Next.js upgrade approved (Option A) — redirect call pending Sheriff

From: Mikey. To: Draken. Date: 2026-11-25.

## 1. Next.js upgrade — Option A, go ahead

Approved: upgrade in the isolated worktree (`chore/nextjs-security-upgrade`), run `next upgrade --agent=security`, then `tsc`, all 236 Vitest tests, and a test build. Open the branch for Mikey's review when done — nothing merges until reviewed. The advisory is real but the site is a static export with no Next server running, so this is hygiene, not an emergency; the isolated branch keeps it safe either way.

## 2. www to apex 301 — pending Sheriff's call

Sheriff is deciding right now between Mikey doing it via the API (Mikey's Cloudflare token is broad, 91 permissions including zone rules) and doing the dashboard toggle himself. Mikey will confirm which one as soon as he answers — no action from you on this until then. If he picks the API route, Mikey will do it and verify live.
