# Affiliate Roadmap — December 2026 (DRAFT)

Status: **DRAFT — not approved, nothing published from it.** Prepared 2026-11-11 by Mikey.
Goal: turn the affiliate setup into a working revenue channel. December is build-and-publish month; first commissions are the 3–6 month target ($100–500), not a December promise.
Source: `affiliate-master-strategy-2026-11-11.md` (same folder). TempMail is FROZEN and excluded from everything here.

## Starting position (2026-11-11)

- **31 programmes**: 21 original + 10 new PartnerStack (Vista Social, SoftSync, Runpod, ClickUp, Staytuned/Zenpire, Deel, Plansom, MindStudio, Foxit, CallHippo). Merge of `feat/affiliate-10-partnerstack-sync` approved by Sheriff, awaiting Draken. The merge also ships the 4 fixed card IDs (n8n, Brevo, Apollo, Databox → `/go/*` cloaks).
- **Vultr**: separate direct affiliate. **Two Gumroad programmes**: Krafera Upgrade Watch + Krafera Silent Failure Watch (both n8n-related, verified live 2026-11-11).
- **Earnings to date: $0.** No `/go/*` click tracking exists yet.
- **n8n 3.0**: beta since 27 Oct, stable planned early December (no exact day), one-way upgrade, 1.x support ends **31 Dec 2026**. The stable launch and the 31 Dec deadline are December's two hard dates.
- **Live parasite sites**: DevTo, Hashnode, Blogger, WordPress.com, Bear Blog, Peerlist, Indie Hackers, Contra. Not yet started: Mataroa, GitBook, GitLab. Telegraph researched 2026-11-11: SKIP (all links nofollow). Medium blocked (Turnstile). Quora dropped (banned). Substack: Sheriff signing in himself, status unconfirmed. X @alfazreviews: login retry set for 2026-11-11 21:00; YouTube @alfazreviews + TikTok @alfaz.tech.product are the review channels.

## Rules that do not change

- `/go/*` cloaks only, `rel="sponsored"`, `noindex, nofollow`, FTC disclosure near every link.
- High-ticket agency first: no affiliate links on `/services/*`, `/audit/`, or `/partners/`; fasttools.me stays clean (one labelled exception only: freelance rate calculator → `/go/n8n`).
- Reviews first: honest verdicts (what worked, what broke, who it is for), only tools actually used. No spam bonuses.
- Merges always need Sheriff's say; Draken does all merges. Mikey works on `mikey/<task>` branches, never main.
- Banned words on pages: comprehensive, innovative, transformative, revolutionary, leverage, utilize, robust, seamless, holistic, landscape, crucial, pivotal.

## Week 1 — Dec 1–6 (Tue–Sun): Fix the leaks, ride the stable launch

Theme: make every click count before driving traffic.

- Confirm Draken's merge landed on main; verify all 10 new `/go/*` redirects live (curl, HTTP 200, exact destinations) and the 4 fixed cards.
- Click tracking: send Draken the request to add `/go/*` click tracking (or a minimal count fallback if a full build is too big for December). No tracking = no funnel numbers.
- **Piece 1 — n8n 3.0 stable review** (review-first): "n8n 3.0 stable is out — what actually changed for your workflows." Publish within 24h of the stable announcement (exact day unknown — watch the n8n blog + X trend check). Home: whoisalfaz.me blog. Parasites: DevTo, Hashnode, Blogger, WordPress.com, Bear Blog. Tools: n8n Cloud (`/go/n8n`).
- Parasite expansion: open **HackerNoon** and **Mataroa** accounts (free, instant, pre-check sign-in terms live first). Post Piece 1 there too if live in time. (Telegraph researched 2026-11-11: SKIP — all links nofollow.)
- Sheet: add an **Affiliate** tab (Programme | /go/* | Status | Link type | Date | Note) and log all 31 programmes + the 10 new links.

Targets: merge verified live; tracking requested; Piece 1 live on blog + ≥5 parasites; HackerNoon + Mataroa accounts live; Affiliate tab filled (31 rows).

## Week 2 — Dec 7–13: Brevo (fastest first dollars)

Theme: the email stack he actually runs.

- **Piece 2 — Brevo review**: "The email stack I actually run: Brevo for n8n + transactional mail." Home: whoisalfaz.me blog. Parasites: DevTo, Hashnode, Blogger, WordPress.com, Bear Blog, HackerNoon, Mataroa. Tool: Brevo (`/go/brevo`, €100 per paid account).
- **Piece 2b — Brevo IP warming walkthrough** (video script + DevTo companion): links to the live IP-warming guide. YouTube @alfazreviews.
- Parasite expansion: start **GitBook** (docs-style home for the 3.0 guide) and **GitLab** (mirror of key guides).
- Check PartnerStack dashboard via Draken: any clicks/signups on n8n + Brevo from Week 1? Log in sheet.

Targets: Pieces 2 + 2b live; GitBook + GitLab live; first PartnerStack click count recorded (even if 0 — log it, don't skip it).

## Week 3 — Dec 14–20: Vultr (self-host wave)

Theme: 3.0 kills npm/npx installs — every self-hoster needs a VPS.

- **Piece 3 — Vultr review + setup guide**: "Self-host n8n 3.0 on Vultr: the $5 VPS Docker setup." Home: whoisalfaz.me blog + YouTube. Tools: Vultr (`/go/vultr`) + n8n Cloud. Flag: verify the real Vultr CPA in the Vultr dashboard first (Draken reported $35 to Alfaz vs $100 credit to the reader; older pages say $100) — do not print a figure until confirmed.
- **Piece 3b — 1.x countdown post**: "n8n 1.x support ends 31 Dec — the 3 checks before you upgrade." Parasites only, links to the 3.0 guide.
- Qdrant: still pending Sheriff's call (unlink vs keep as editorial). If he picks, send the fix to Draken the same day; do not assume either outcome in any piece.

Targets: Piece 3 + 3b live; Vultr CPA confirmed and logged; Qdrant call chased once (not nagged).

## Week 4 — Dec 21–27: Comparisons (best converters) + first numbers

Theme: comparison posts convert best — ship one, then count.

- **Piece 4 — Apollo vs Lusha vs AiSDR comparison refresh**: refresh the live comparison post, cut a YouTube comparison video. Tools: Apollo, Lusha, AiSDR (`/go/apollo`, `/go/lusha`, AiSDR direct link until cloaked).
- **Piece 5 — ElevenLabs review** (short): voice AI for agency content, 22% recurring. Home: blog + DevTo/Hashnode.
- December numbers review: `/go/*` clicks (tracking or PartnerStack dashboard), signups, revenue ($0 is a valid number — report it plainly), best/worst piece by clicks. Send Sheriff the weekly update with the numbers.

Targets: Pieces 4 + 5 live; first numbers review sent; every live piece logged in the sheet with its parasite URLs.

## Week 5 — Dec 28–31 (Mon–Thu): Close-out

Theme: end the year with the 1.x deadline, not a new launch.

- **Piece 6 — final 1.x push**: "Last 3 days of n8n 1.x support — upgrade checklist." Parasites + X (if the account is live). Links to the 3.0 guide.
- December close-out: full month numbers (pieces live, clicks, signups, revenue), what worked, what did not, and the January plan draft (next tools: Runpod, ClickUp, Deel from the new 10 — pick by December click data, not by guess).
- Ops log: close out every open issue with its fix (see below).

Targets: Piece 6 live; December close-out + January draft sent to Sheriff by 31 Dec.

## Content pieces at a glance

| # | Piece | Tool(s) | Home | Parasites | Week |
|---|-------|---------|------|-----------|------|
| 1 | n8n 3.0 stable review | n8n Cloud | whoisalfaz.me blog | DevTo, Hashnode, Blogger, WordPress, Bear, HackerNoon, Mataroa | 1 |
| 2 | Brevo review — the email stack I run | Brevo | blog | DevTo, Hashnode, Blogger, WordPress, Bear, HackerNoon, Mataroa | 2 |
| 2b | Brevo IP warming walkthrough (video) | Brevo | YouTube @alfazreviews | DevTo companion | 2 |
| 3 | Self-host n8n 3.0 on Vultr (Docker VPS) | Vultr + n8n | blog + YouTube | DevTo, Hashnode, Blogger, WordPress, Bear | 3 |
| 3b | 1.x countdown — 3 checks before you upgrade | n8n | parasites only | DevTo, Hashnode, Blogger, WordPress | 3 |
| 4 | Apollo vs Lusha vs AiSDR refresh + video | Apollo, Lusha, AiSDR | blog + YouTube | DevTo, Hashnode, Blogger | 4 |
| 5 | ElevenLabs review (short) | ElevenLabs | blog | DevTo, Hashnode | 4 |
| 6 | Last 3 days of n8n 1.x — upgrade checklist | n8n | parasites + X (if live) | DevTo, Hashnode, Blogger, WordPress, X | 5 |

## What is autonomous vs what needs a person

**Autonomous (Mikey + standing subagent team — no Sheriff needed):** drafting pieces, parasite posts, sheet updates, ops log, trend checks, link verification, weekly updates to Sheriff, opening new free parasite accounts (after live pre-check), chasing Draken replies via the sync branch.

**Needs Sheriff:** any merge (his say, every time), the Qdrant call, joining any new programme, any paid spend (none planned), posting anything that names a client, X bio/tweet approval.

**Needs Draken:** all merges to main, all code changes (`/go/*`, cards, tracking), dashboard checks (PartnerStack/Brevo/Vultr), test + tsc runs. Draken replies only when his PC is on — requests go on `mikey-draken-sync`, never by DM.

## Measurable targets

December (month): 6 pieces live (5 reviews + 1 countdown); 4 new parasite sites live (HackerNoon, Mataroa, GitBook, GitLab); click tracking live or fallback count in place; Affiliate tab in sheet complete and current; 1 numbers review + 1 close-out sent.
Weekly: pieces live per the table above; `/go/*` clicks counted (tracking or dashboard); sheet updated the same day a piece goes live; one update to Sheriff per week (WhatsApp + main chat), even if the news is "0 clicks, 0 signups".
Revenue: December target is **pipeline, not dollars** — clicks and signups. First commissions target stays $100–500 across Jan–Apr 2027. Report revenue as $0 until a dashboard shows otherwise; never project a commission that has not landed.

## Open items (do not guess — ask or leave open)

- Gumroad programmes — names confirmed 2026-11-11; commission rate unknown.
- Qdrant: unlink vs keep as editorial — Sheriff's call.
- 1Password, FreshBooks, Airwallex: pending PartnerStack approval — check status in Week 2, sync if approved.
- Substack sign-in: unconfirmed — if Sheriff confirms it, add as a parasite in Week 2.
- X @alfazreviews: login retry 2026-11-11 21:00 — if live, add X to Piece 6 distribution; if not, leave X out of December.
- Twilio/HubSpot cards + "Verified Partner" badge, 5 `/go/*` draft removals (tavily, openai, neo4j, voyageai, ollama), tag typos, 301→302 switch: remaining fix-list items — send to Draken as one batch request in Week 1, after the merge lands.

## Ops log (issue → solution)

Keep a running log in `~/workspace/goals/affiliate-revenue-strategy/hidden_files/ops-log.md`: date, issue, cause, fix, result. Rule: when something stalls, log it the same day and work the fix — never leave a blocker silent. Nothing stalls without a written entry.

## Sheet

Google Sheet "Directory Listings — Alfaz Mahmud Rizve" (ID `13idEkZ4awtTQkEvvEURVXBElOLozA6BZeRn3shrsihM`): new **Affiliate** tab, 6 columns only (Programme | /go/* | Status | Link type | Date | Note), one-line notes. Repo logbooks stay source of truth for code; the sheet is the working record for links and earnings.
