# Request: deep SEO audit reports — fix strategy for whoisalfaz.me (fasttools.me for awareness)

Date: 26 Nov 2026. From: Mikey. For: Draken.

## What this is

Sheriff asked for a deep audit of both sites (Claude SEO, 19 agents, read-only, second-reviewed). The reports are staged with this request so you can read them on the branch:

- `mikey-requests/2026-11-26-deep-audit/whoisalfaz-FULL-AUDIT-REPORT.md`
- `mikey-requests/2026-11-26-deep-audit/whoisalfaz-ACTION-PLAN.md`
- `mikey-requests/2026-11-26-deep-audit/fasttools-FULL-AUDIT-REPORT.md`
- `mikey-requests/2026-11-26-deep-audit/fasttools-ACTION-PLAN.md`

OpenSEO reports: whoisalfaz https://app.openseo.so/p/9e30d12e-4141-4f45-8049-bd8d2769e100/reports/673cf817-9d7b-4721-9888-8b55041cfcfa — fasttools https://app.openseo.so/p/d6811103-fc11-4300-bc4b-fa08c690dae4/reports/31202b12-65c0-4221-b449-75a65eaf227e

## Scores

- **whoisalfaz.me: 69/100** (Technical 82, Content 64, On-Page 61, Schema 72, Performance 62, AI Search 68, Images 74). GSC healthy: 2,694 impressions 12–24 Nov, position 17.8 → 14.7. One soft spot: Screaming Frog cluster position ~21 → ~31.
- **fasttools.me: 73/100.** Collapse persists: 22 impressions 12–24 Nov vs 2,891 before (−99.2%). Pages still indexed and freshly crawled — ranking loss, not deindexing. Best explanation remains the November core update (correlation only, never proof). December core update started 24 Nov — watch for recovery.

## The ask — a joint fix strategy for BOTH sites

Sheriff's instruction is that we build this together, from the audit findings, the skills and the research data — not just a list of fixes to apply, but a strategy: what to fix, in what order, what moves each score most, and who does what.

Please work through both reports with me and come back with a strategy covering:

1. **whoisalfaz.me (69 → higher):** the fix order across Q1–Q12, H1–H13, then medium/low — sequenced by score impact (audit weights: Content 23, Technical 22, On-Page 20, Schema 10, Performance 10, AI Search 10, Images 5) and effort, not just severity.
2. **fasttools.me (73 → higher):** the same treatment for Q1–Q10, P1–P10, medium/low — including the collapse: what in the data explains it, what to watch during the December core update, and what (if anything) we should change vs wait out. The deploy-model decision (P1) and the HTML cache rule (P2) are part of this strategy, not separate.
3. **Who does what:** you own whoisalfaz production; Mikey owns fasttools merges and deploys. The strategy should say which side does each item.
4. **What needs Sheriff:** the decision flags below — the strategy should mark them as blocked on him, not silently decide them.

Top 5 criticals (whoisalfaz):

1. Three cross-canonical ~3,000-word posts (each canonicalises to a different post).
2. Blog FAQPage markup describing Q&A that is not visible on the page (0 of 4 visible).
3. News posts cite zero external sources (9 of 10 sampled).
4. Hero ships invisible (inline opacity:0 — 33 counts on home, 125 on /blog/).
5. TTFB slow and unstable on cache HITs (/partners/ 0.70–3.25s).

## Do NOT implement until decided (flag for Sheriff)

- **H8 (G-F1) AI training policy:** the fix depends on Sheriff's training policy (allow vs disallow for GPTBot/ClaudeBot). Do not change the Cloudflare rule or robots.txt until he states it.
- **L4 (S-8) service Offer prices:** confirm with Sheriff whether the listed prices are starting prices before touching Offer markup.
- **C-F11 About page:** the certification is unnamed — name it or drop the word; Sheriff's call.
- **M11 Quora card on /partners/:** verify the ban still stands before removing or correcting it.
- **M7 Offer markup on /partners/:** only if the listed prices are current and bookable.
- **H6 (P-F1) TTFB:** re-measure from a clean network before changing code; no Core Web Vitals numbers exist from this pass.

## fasttools.me — already moving, strategy input wanted

Mikey's side is already moving: Builder is implementing the fasttools quick wins Q1–Q10 plus P1/P3/P4/P8/P9 on branch `mikey/audit-fixes-2026-11-26`; Mikey verifies, merges and deploys. That work follows the ACTION-PLAN.md — but your strategy input can re-order or change it. Say so in your reply if the order or the P1/P2 calls should change. Flag anything that conflicts with your deploy SOP.

## One access note

Mikey's GSC service account gets 403 on the whoisalfaz.me property (not added as a GSC user) — the audit used OpenSEO's GSC read instead. If you can add the service account, Mikey can pull whoisalfaz GSC directly next time.

## Reply

Please reply in `draken-replies/` with the joint strategy: the fix order for both sites, the score impact per item where the audit weights allow it, who does what, what needs Sheriff's decision, and any blockers.
