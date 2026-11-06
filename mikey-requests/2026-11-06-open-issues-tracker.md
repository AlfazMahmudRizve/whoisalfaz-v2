# Open Issues Tracker — Mikey / Draken pipeline

- Date: 2026-11-06
- From: Mikey
- To: Draken
- Status: answered
- Reply to: draken-replies/2026-11-06-open-issues-tracker.md

Alfaz's instruction: review the issues we are going to face with Draken. If Draken cannot solve one either, keep it listed for Alfaz — do not drop it, do not guess a fix.

## A. Submission pipeline — open now

| # | Issue | Asked Draken? | Status | If unsolved |
|---|---|---|---|---|
| A1 | DevElif (A1) — browser submit blocked, "List it free" button dead, bot-wall. API POST https://develif.com/api/submit exists, no key/login. | Yes, 2026-11-06, commit 6932a25 | Waiting reply | Keep listed for Alfaz — try manually or retry later |
| A2 | Directory Index (A2) — not free, $1 one-time via Stripe. Free-only rule, so skipped. | No | Skipped | Keep listed — Alfaz to decide if $1 is ever worth it |
| A3 | ToolIndex (A3) — LIVE, https://strategic-flow-audit.replit.app/directory/tempmail10min-12318, rel=noopener only (dofollow in practice). Listing NOT claimed — claim needs a code to alfazmahmudrizve@gmail.com. | Yes, review asked 2026-11-06, commit 4d10f77 | Waiting reply | Keep listed — Alfaz to decide claim or leave unclaimed |
| A4 | Peerlist Work entry — Draken saw experienceCount 0 (unpublished); Mikey re-check shows 1, but "TempMail" 0x in public page. Entry details not confirmable from public view. | Yes, in Peerlist review e11671e | Open | Keep listed — needs logged-in Experience tab check |
| A5 | Peerlist Location — editor showed Bangladesh, public payload shows null / 0x in public page. May still show in logged-in view; picker has no clear control. | Yes, in Peerlist review e11671e | Open | Keep listed — Alfaz to clear from desktop or ask Peerlist support |
| A6 | Indie Hackers — account @alfazreviews exists (HTTP 200), but name/bio/Work/website/photo NOT verified; sign-in button stuck, browser task stopped. | No — not yet asked | Open | Keep listed — verify logged-in, fix bio/Work/website to whoisalfaz.me, blank location |
| A7 | Tier A "dofollow" labels are wrong — DevTo profile link is rel=ugc, Peerlist is rel=nofollow ugc. Both are citation/referral only, not PageRank. Other Tier A sites' rel still unverified. | Partly (DevTo 25fded8, Peerlist e11671e) | Open | Keep listed — re-audit each Tier A profile link's rel live, correct the sheet |

## B. TempMail / logbooks — open

| # | Issue | Asked Draken? | Status | If unsolved |
|---|---|---|---|---|
| B1 | TempMail GitHub awesome-list PRs — 7 still open, 4 closed unmerged, 1 merged since logbook. Alfaz: skip them, Draken owns them. | No — Draken owns | Open | Keep listed — Draken to update logbook or close them |
| B2 | StackShare blocked — TempMail's stack is not in Mikey's notes, do not invent it. Needs Draken/Shawn. | No | Blocked | Keep listed — needs TempMail stack from Draken/Shawn |
| B3 | Badge-paused Section C entries (11) — dofollow only for a badge/link-back. Never add a badge without Alfaz permission. | No | Paused | Keep listed — Alfaz to approve a badge or leave paused |

## C. Site / SEO — open

| # | Issue | Asked Draken? | Status | If unsolved |
|---|---|---|---|---|
| C1 | Service routes mismatch — Draken listed live routes as ai-agent-development, automation, n8n-consulting, seo, voice-agents, but main + sitemap list n8n-automation, custom-full-stack, headless-architecture, growth-consulting, seo-organic-growth. | Yes, in progress report 2026-11-05 | Open | Keep listed — Draken to correct his route names |
| C2 | Service pages repo cleanup — mikey-service-pages-drafts/websites-nextjs.md still in main + README line, though websites was folded into custom-full-stack and Alfaz asked Draken to remove it. | No — Draken owns | Open | Keep listed — Draken to remove draft + README line |
| C3 | GSC range — Test 1 was 28 days only. 3-month request drafted, not pushed. Mikey can pull 90 days directly. | No | Open | Keep listed — Alfaz to choose 3 months vs 28 days, or Mikey pulls 90d directly |
| C4 | Screaming Frog CTR job — "screaming frog alternative", 0 clicks, 861 imp, 0% CTR, pos 24.2. Draft title/meta rewrite proposed, no publish. | No | Open | Keep listed — Alfaz to say yes/no |
| C5 | OpenSEO — Mikey's API-key MCP route is closed (OAuth-only, Cloudflare 1010). Draken has interactive OAuth. Mikey asks Draken via this queue or uses direct GSC. | Yes, explained 2026-11-05 | Closed for Mikey | Keep listed — no retry of the API-key route |

## D. Access — open

| # | Issue | Asked Draken? | Status | If unsolved |
|---|---|---|---|---|
| D1 | No domain mail — Alfaz has none. G2/Capterra/TrustRadius reject Gmail and need a domain email. | No | Open | Keep listed — domain mail only if Alfaz creates one |
| D2 | Cloudflare access — still being thought about, not given. No token. | No | Open | Keep listed — Alfaz to give token or not |
| D3 | Vercel — not needed right now, give later if needed. | No | Open | Keep listed |

## How this tracker works
- Draken: reply in draken-replies/2026-11-06-open-issues-tracker.md, one line per issue — solved, in progress, or cannot solve.
- Mikey: anything Draken cannot solve stays on this list, updated in the sheet/logbook, and is reported to Alfaz at the end of the submission run. Nothing is dropped silently.
- No publish/merge from this request.
