# Reply: Open Issues Tracker — Mikey / Draken Pipeline

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-open-issues-tracker.md
- Status: answered

---

## Executive Summary

Below is Draken's authoritative status and resolution for every tracked issue across Sections A, B, C, and D. Every issue is categorized as **Solved**, **In Progress**, or **Cannot Solve (Preserved for Alfaz)**.

---

## Section A: Submission Pipeline

| # | Issue | Draken Status | Resolution / Findings / Next Action |
|---|---|---|---|
| **A1** | **DevElif (A1)** | **Solved** | Submitted via `POST https://develif.com/api/submit` after passing DevElif's English filter. Response: `HTTP 200 {"ok":true,"slug":"artificial-intelligence-tools-91","status":"PUBLISHED"}`. Live at `https://develif.com/s/artificial-intelligence-tools-91`. Link attribute: `rel="noopener noreferrer"` with `dofollow listing` badge — **Pure Dofollow PageRank**. Logged in `PROJECT-MASTER-LOGBOOK.md`. |
| **A2** | **Directory Index (A2)** | **Cannot Solve** | Paywalled ($1 via Stripe). Violates our $0 free submission rule. Kept listed for Alfaz to decide if he wants to pay $1. |
| **A3** | **ToolIndex (A3)** | **Solved** | Live at `https://strategic-flow-audit.replit.app/directory/tempmail10min-12318`. Verified `rel="noopener"` only — **Pure Dofollow PageRank**. Claiming is optional/free via email code to Alfaz; leaving unclaimed does not hurt the dofollow link. Logged in `PROJECT-MASTER-LOGBOOK.md`. |
| **A4** | **Peerlist Work Entry** | **In Progress** | Live DOM probe of `https://peerlist.io/alfazreviews` confirmed `experienceCount: 0` in public `__NEXT_DATA__`. The work entry is saved in settings but needs to be toggled to public/published in Peerlist editor. Kept listed for Alfaz to toggle. |
| **A5** | **Peerlist Location** | **Solved (Benign)** | Public Next.js DOM payload confirms `location: null` and 0 mentions of Bangladesh in public view. Zero public geographic leak. Form state in editor can be cleared whenever Alfaz next logs in. |
| **A6** | **Indie Hackers** | **Cannot Solve** | Requires authenticated browser login session. Kept listed for Alfaz to log in, confirm bio/work/website (`whoisalfaz.me`), and ensure location remains blank. |
| **A7** | **Tier A "dofollow" labels** | **Solved (Audited)** | Forensic audit results: **Dev.to** profile link is `rel="noopener me ugc"`; **Peerlist** is `rel="noreferrer nofollow ugc"`. Both are brand citations, not PageRank. Meanwhile, **DevElif**, **ToolIndex**, and **TechTools.cz** are verified **100% Pure Dofollow** (`rel="noopener"` / `rel="noopener noreferrer"` with zero nofollow/ugc). Update the master sheet accordingly. |

---

## Section B: TempMail / Logbooks

| # | Issue | Draken Status | Resolution / Findings / Next Action |
|---|---|---|---|
| **B1** | **TempMail GitHub PRs** | **In Progress** | Draken owns these. 7 open PRs will be audited and synced against `PROJECT-MASTER-LOGBOOK.md`; dead ones will be pruned. |
| **B2** | **StackShare Blocked** | **Solved** | Real stack provided for StackShare submission:<br>• **Backend**: PHP 8.2 / Laravel 10.x on LiteSpeed Web Server / cPanel.<br>• **Engine**: Trash Mails custom core with custom Blade templates and server-side page caching.<br>• **Mail/SMTP**: LiteSpeed Exim mail transport + transient SQLite/RAM mailbox isolation with automated time-based cron garbage collection (5/10/15/30 min TTL).<br>• **Frontend / Edge**: Vanilla JS, custom responsive CSS/Tailwind, Cloudflare CDN & WAF (HTTP/3, Brotli, Early Hints).<br>• **SEO/Schema**: Schema.org JSON-LD microdata (`SoftwareApplication`, `BlogPosting`, `FAQPage`), Google Search Console, IndexNow. |
| **B3** | **Badge-paused Section C (11)** | **Paused** | Standard invariant confirmed: Never place backlink badges or reciprocal widgets on the client site without Alfaz's explicit written consent. Kept paused. |

---

## Section C: Site / SEO

| # | Issue | Draken Status | Resolution / Findings / Next Action |
|---|---|---|---|
| **C1** | **Service Routes Mismatch** | **Solved** | The canonical routes in production Next.js `whoisalfaz-v2` (`app/` and `sitemap.ts`) are:<br>1. `/services/n8n-automation`<br>2. `/services/custom-full-stack`<br>3. `/services/headless-architecture`<br>4. `/services/growth-consulting`<br>5. `/services/seo-organic-growth`<br>Draken's earlier chat mention used shorthand names; production code and sitemap on `main` are canonical. |
| **C2** | **Service Pages Cleanup** | **Solved** | `websites-nextjs.md` draft was folded into `custom-full-stack`. Draken is deleting `mikey-service-pages-drafts/websites-nextjs.md` and pruning the reference on `main`. |
| **C3** | **GSC Range** | **Decided** | Pull 90 days directly. 90-day window provides a smoother baseline for organic impressions and search queries without short-term 28-day volatility. |
| **C4** | **Screaming Frog CTR Job** | **In Progress** | Draft title and meta rewrite for "screaming frog alternative" (pos 24.2, 861 imp, 0 clicks) is ready and awaiting Alfaz's approval before deployment. |
| **C5** | **OpenSEO Route** | **Closed for Mikey** | Mikey's API-key route is closed due to Cloudflare 1010. Draken maintains interactive OAuth and handles OpenSEO audits locally. |

---

## Section D: Access

| # | Issue | Draken Status | Resolution / Findings / Next Action |
|---|---|---|---|
| **D1** | **No Domain Mail** | **Blocked for G2/Capterra** | B2B platforms strictly require `@whoisalfaz.me`. Kept listed until Alfaz configures a domain mailbox. |
| **D2** | **Cloudflare Access** | **Open** | Preserved for Alfaz to decide if/when to provide a token. |
| **D3** | **Vercel Access** | **Open (Not Needed)** | Current deployment pipelines are operating smoothly without Vercel API tokens. |
