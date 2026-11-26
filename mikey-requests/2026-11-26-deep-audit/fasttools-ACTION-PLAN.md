# FastTools.me — Action Plan — 26 November 2026

Prioritised from the deep audit of 26 Nov 2026 (FULL-AUDIT-REPORT.md). Every item maps to a finding ID in that report. No new claims beyond the findings files.

## Quick wins — do first (smallest effort, copy or one-line changes)

| # | Finding | Exact fix | Expected effect |
|---|---|---|---|
| Q1 | CONT-F01 + CONT-F02 (H2, H3) | On /freelance-rate-calculator/developer only: change the intro to "1,196 annual billable hours" and "$20 to $220 per hour"; cap scenario rates at the table bands (Senior ≤ $150, Staff ≤ $220) or add a line saying scenario rates are worked examples that can sit outside the bands and why; rewrite the two unsourced FAQ answers to quote the Arc/Upwork table figures with the source named; align the hours figure (pick 20–25 or 24–26) in both places. | Protects the sourced table just shipped; removes contradictions on the site's most-demanded cluster and fixes the exact sentences an AI answer would lift. |
| Q2 | CONT-F03 + CONT-F04 (M4, M5) | Hyperlink Upwork rates guide and BLS OEWS May 2025 on the freelance pages; add `stripe.com/pricing` (or the relevant regional pricing page) next to the "Rates checked" line on every Stripe spoke; delete the stale "Rates verified Oct 2026" badge on the UK spoke and check the other 8 spokes for it too. | Every named source becomes checkable in one click; one verification date per Stripe page. |
| Q3 | GEO-F01 / TECH-F4 (H7, L3) | Add named `Allow: /` groups to robots.txt for `OAI-SearchBot`, `Claude-SearchBot`, `Googlebot`, `Applebot`, `Perplexity-User`; drop the `anthropic-ai` group. | A future restrictive edit to the `*` group can no longer silently cut off ChatGPT or Claude search citability. |
| Q4 | SXO-F1 / CONT-F08 (H8, L7) | Add a "Stripe fees by country / by use case" section to the /stripe-fee-calculator body listing all 9 spokes, copying the cron hub's "All 25 Cron Schedules" pattern. | The hub passes its own standing to the spokes nearest the top 10. |
| Q5 | CONT-F05 (M6) | On /keyword-gap-analyzer: fix "Targetting" → "Targeting"; replace the dead `/tools/…` example paths with real fasttools.me spoke URLs (e.g. /freelance-rate-calculator/developer, /stripe-fee-calculator/reverse); rewrite the jargon FAQ answer in plain words; point the audit banner at a fasttools.me page or drop it. | The thinnest hub stops looking unfinished; its examples point at pages that exist. |
| Q6 | VIS-V06 + VIS-V08 (L11, L13) | Add the same `og:image` (1200×630, `https://fasttools.me/og-image.png`) to /stripe-fee-calculator, /json-to-typescript and /crontab-generator; add `<meta name="theme-color" content="#FFFCF5">` (or `#1B4520`) to every page. | Link shares on the three pages show an image; mobile browser chrome matches the site. |
| Q7 | SCH-F3 (M3) | Point the keyword-gap breadcrumb crumb at a real page (e.g. the homepage) or drop the middle crumb so the trail is Home → Keyword Gap Analyzer. | One dead breadcrumb target removed. |
| Q8 | SXO-F7 (L20) | Add a matching "JSON → Zod" chip on the homepage. | json-to-zod gets the same three homepage links as every other hub. |
| Q9 | CONT-F09 (L8) | Replace "subtle" with "clean" or "professional" in the invoice meta description ("Generate subtle, beautiful invoices", 152 chars) and the first two body uses. | The snippet and opening copy match what a searcher types. |
| Q10 | GEO-F03 (M16) | In llms.txt: fix the "cents, pence, cents" typo; add `Last updated: 2026-11-26` and a `Rates verified: <date>` line; drop the "<1ms latency, 0ms server RTT" claim or back it with a measured figure. | An agent reading llms.txt can tell whether the rates it quotes are current. |

## High-priority fixes

| # | Finding | Exact fix | Expected effect |
|---|---|---|---|
| P1 | TECH-F1 (H1) | Before any deploy that changes build mode, decide once and record it — keep Pages Functions (leave the flag unset) or convert/remove all six `force-dynamic` routes. Do not let a routine rebuild flip the flag by accident. | Prevents a broken deploy that would kill the keyword-gap tool's data source (and the other five API routes) while static pages still serve. |
| P2 | PERF-F1 (H4) | Set a Cloudflare Cache Rule for the HTML routes with a short `max-age` plus `stale-while-revalidate` (e.g. `max-age=300, stale-while-revalidate=86400`), or split the build so tool pages prerender statically while the force-dynamic API route stays a Function. Do not turn on static export site-wide without that split. | Repeat visits stop paying a full server render on every hit. |
| P3 | VIS-V01 (H5) | Set `min-h-11` (44px) on primary controls (calculate/copy/export/search), `min-h-6` (24px) as an absolute floor on chips and grid cells, and raise cron preset/grid cells to at least `py-2.5`. Verify the real rendered sizes in a browser afterwards — the audit figures are class-based estimates. | Tool controls become usable by touch and by users with limited fine motor control. |
| P4 | VIS-V02 / GEO-F06 (H6, M18) | Give every input an `id` plus `<label for="…">`, or an `aria-label` where a visible label is not wanted. Start with the search box, the Stripe amount input, all cron fields, and the 4 Freelance sliders. | Screen-reader and agent users can tell what each control does. |
| P5 | SXO-F2 (H9) | Add a /guides/ hub and one owned guide first (freelance rate math), then point parasite canonicals and link-backs at it. | An owned page can rank for the article query cluster and collect the parasite links' value in one place. A new page starts with no authority, so ranking is not guaranteed. |
| P6 | BACK-F1 (H10) | Submit MicroLaunch free Regular Launch (verified dofollow, Tier 1 research 25 Nov), then the Uneed / SaaSHub / Indie Hackers / Devpost free batch. Needs Sheriff's Chrome sign-in. | First independent link beyond Viberank, plus discovery traffic. Directional only — no ranking promise. |
| P7 | BACK-F3 (H12) | Aim the next parasite round and directory submissions at the 4 link-less tools (invoice, JSON→Zod, bank-statement, keyword-gap) with tool-named anchors. No new campaign needed — change targets in work already planned. | The four link-less tools get their first inbound support. |
| P8 | SCH-F1 (M1) | Add the shared WebSite / Organization / Person / WebPage nodes to the freelance template (same block the other families use), give HowTo / FAQPage / BreadcrumbList their `#howto` / `#faq` / `#breadcrumb` ids, and either add HowTo to the 12 spokes or drop it from the hub for consistency. | The freelance family's structured data stops pointing at nodes that do not exist (13 pages). |
| P9 | SCH-F2 (M2) | Replace the shared `featureList` constant with per-tool feature lists, or remove `featureList` where no tool-specific list exists. One template constant drives all 41 pages. | Structured data stops asserting Stripe fee-math features on 31 non-Stripe pages. |
| P10 | BACK-F2 (H11) | Treat independent links as the priority (P6). Keep canonicals set on every parasite post so copies consolidate rather than compete. | Reduces concentration risk: 63 of 64 dofollow links are self-published today. |

## Medium

| # | Finding | Exact fix | Expected effect |
|---|---|---|---|
| M-A | CONT-F06 (M7) | Split the freelance intro into 3–4 short sentences (≤ 20 words each) and add a one-line plain-words gloss the first time "realization factor" and "W-2 parity" appear. No change for cron/JSON. | Freelance and invoice pages become easier to read for non-technical users. |
| M-B | CONT-F07 (M8) | Add one short bio block to /about (photo, 2–3 lines of background, links to LinkedIn/GitHub/whoisalfaz.me); update the homepage byline to November 2026; add visible `datePublished`/`dateModified` to About. No new pages needed. | The named author becomes a checkable person. |
| M-C | CONT-F10 (M9) | Fix H3 first; add `datePublished`/`dateModified` to the About and hub pages' schema; add one worked example to the keyword-gap intro (seed keyword in → 3 sample gaps out). | The site's quotable sentences become quotable with sources and dates attached. |
| M-D | SXO-F3 (M20) | Add a short guide section to /keyword-gap-analyzer (how to read a gap table, one worked example) and a plain on-page message if the API call fails, so the page still answers the query when the API is down. | The page answers the query even when its API is down; the thinnest hub gains substance. |
| M-E | SXO-F4 (M21) | Add one "Next step" line in each tool body — e.g. Stripe UK → reverse calculator; invoice → Stripe fee calculator; bank statement → invoice generator; keyword-gap → freelance rate calculator. | A visitor who finishes one tool sees the next tool that fits their job. |
| M-F | SXO-F5 (M22) | Add one line under each tool H1 — "Checked <date> · <method/source>" — starting with the Stripe hub and the two JSON pages. | Every tool page shows the freshness signal competitors show. |
| M-G | PERF-F2 (M10) | Code-split below-fold tool code and audit the three largest chunks (`0d66q46efh1wk.js`, `3fwc5j01czd6i.js`, `13gethnskpzmi.js`) for dead or shared code that can load lazily. Verify with a real browser bundle check before cutting. | Smaller first-visit download (~873 KB raw / ~244 KB brotli on the homepage today). |
| M-H | PERF-F3 (M11) | Diff the served homepage HTML against the 6 Nov deploy output and trim what grew — likely RSC payload or duplicated inline data. If the growth is JSON-LD, keep it; if it is duplicated RSC data, drop the duplicate. | Page weight back toward the 25 Nov level if the growth is duplicated data. Cause not yet established. |
| M-I | VIS-V03 (M12) | Add `aria-live="polite"` to the Stripe results container, the JSON output panel, and the cron results area. | Screen-reader users hear the result when it changes. |
| M-J | VIS-V04 (M13) | Darken the secondary button to at least #4F6B52 (check ≥ 4.5:1 before shipping) or use dark text on it; darken sidebar section labels to #60675B (5.71:1, already used elsewhere). | The one failing control and the marginal sidebar labels pass AA contrast. |
| M-K | VIS-V05 (M14) | Give each ad container a `min-height` matching the ad unit it will hold (e.g. `min-h-[250px]`) on /json-to-typescript (`ad-json-to-ts-mid`) and /stripe-fee-calculator (`ad-stripe-calc-mid`). | Content below the ad stops shifting when the ad loads. |
| M-L | GEO-F02 (M15) | Add a `Content-Signal` line to each robots.txt group once Sheriff states the training policy (`search=yes, ai-input=yes, ai-train=yes/no`). Do not pick the training value for him — it is a licensing call, not a technical one. | The site states its AI-training position in machine-readable form. |
| M-M | GEO-F05 (M17) | Publish `/.well-known/mcp.json` (or an MCP Server Card) pointing at `/api/mcp`, link it from llms.txt, and state which tools are exposed and whether calls need confirmation. | Agents can find the MCP endpoint instead of having to know its URL. |
| M-N | GEO-F08 (M19) | Confirm in the Cloudflare WAF / Bot Fight Mode settings that verified AI crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot) are allow-listed by verified identity (reverse DNS), not just by UA string; re-test with a plain fetcher after any change. | A legitimate agent that fetches with a plain UA stops getting refused. |
| M-O | BACK-F4 (M23) | Keep the "Originally published at" link-back line on every WordPress/Kit post (already done on some pieces — check each post carries it) and keep DevTo/Hashnode canonicals set. | Copies point back at the tool page even though their canonical cannot. |
| M-P | BACK-F5 (M24) | Set a written Hashnode policy: either drop the canonical so the post can rank, or keep it deliberately and count Hashnode as discovery-only. | One clear decision instead of a post that does neither job. |

## Low / optional

| # | Finding | Exact fix | Expected effect |
|---|---|---|---|
| L-A | TECH-F2 (L1) | Delete the /invoice-for-shuki alias route (the `shukhi` dir holds the real app) and let it 404; or add a canonical on the alias pointing at /invoice-for-shukhi. Separately, scope the `x-robots-tag: index, follow` header in `public/_headers` so it does not fire on noindex pages. | One live invoice-for page instead of two, and one robots signal instead of two. |
| L-B | TECH-F5 (L4) | When the sitemap generator is next touched, stamp each URL with its source file's real change time instead of build time. | Crawlers can trust lastmod to signal real change. |
| L-C | SCH-F5 (L6) | Keep one index URL (`sitemap.xml`), drop the other two variants from robots.txt (keep the files or 301 them if anything links to them); drop `priority`/`changefreq` on the next generator run. | One index URL instead of three identical ones. |
| L-D | SCH-F4 (L5) | Decide once, sitewide: remove HowTo blocks, or leave them. Do not add HowTo or FAQPage to new pages expecting SERP features. | 41 dead blocks removed if the decision is to drop HowTo; no ranking change either way. |
| L-E | VIS-V07 (L12) | Add dark mode later; low priority next to P3/P4. | Users with a dark preference get a matching page. |
| L-F | VIS-V09 (L14) | Raise tool-panel body copy and input text to at least `text-sm` (14px); keep 10–11px only for non-essential labels. | Tool copy becomes easier to read, especially on phones. |
| L-G | VIS-V10 (L15) | Add `inputmode="decimal"` to the Stripe amount input and any other money/number fields. | Mobile users get a decimal keypad on money fields. |
| L-H | PERF-F4 (L9) | Confirm all 4 font weights are used above the fold; drop the preload (not the font) for any weight that only appears below the fold or on other pages. | Less preload weight on first visit. |
| L-I | PERF-F5 (L10) | Confirm with repeated fetches from one edge; if it repeats, check the Cloudflare compression setting for those paths. Do not chase before P2, M-G and M-H. | A few KB saved on two JS chunks, if the pattern repeats. |
| L-J | GEO-F04 (L16) | Either give `llms-full.txt` genuinely fuller content (full page text per the llmstxt.org proposal) or delete it and keep one file. | No stale second copy for an agent to quote after an edit to only one. |
| L-K | GEO-F07 (L17) | Optional: serve Markdown via content negotiation with `Vary: Accept`, or add `rel="alternate" type="text/markdown"` links; add an RSL file only when Sheriff sets a licensing position. | Agents that prefer Markdown get it. No named consumer confirmed to read these. |
| L-L | SXO-F6 (L19) | Move the freelance hub tool block above the duplicate H2 or drop the duplicate H2. | The tool comes first on the freelance hub, as on the other six hubs. |
| L-M | TECH-F3 (L2) | No fix until confirmed — re-measure TTFB from a second vantage point (e.g. a Dhaka-side check or a webpagetest run) before treating it as a site defect. | A confirmed answer instead of a fix for a problem that may be the probe path. |
| L-N | SXO-F8 (L21) | No change now. Watch GSC for which page Google picks for "reverse stripe fee" and "invoice generator" queries before changing titles. | No change made on a guess; the next audit acts on real query data. |

## Watch / verify in browser (no fix until confirmed)

- TECH-F6 (I1): OpenSEO missed a different set of spokes this run — crawl-order variance, not a site defect. For future audits, raise the page limit or add a robots.txt group for the OpenSEO-Audit user agent that disallows the noindex client pages.
- TECH-F7 (I2): Homepage bare vs slash both serve 200; canonical covers it. No fix required.
- VIS-V11 (I7): Check the 768px layout in a real browser; add `md:` steps where columns or the tool grid jump awkwardly.
- CONT-F08 note: whether the Stripe hub heading-skip flag is the `notFound`-template artifact needs a rendered-DOM heading check, not a raw-HTML read.
- Whether the other 8 Stripe spokes carry the stale "Rates verified Oct 2026" badge (only UK checked live).
- Whether `datePublished`/`dateModified` exist in hub/spoke schema (only About checked: absent).
- GSC: the 12 November collapse persists (22 impressions 12–24 Nov vs 2,891 before; see the GSC section in FULL-AUDIT-REPORT.md). Action: check GSC Security & Manual Actions in the UI for a manual action, and watch for recovery during the December core update (started 24 Nov).

## Order of work (recommended)

1. Q1–Q5 (copy-only fixes, one page each, same day).
2. P1 (record the deploy decision) + P2 (HTML cache rule) — before any next deploy.
3. P3 + P4 (controls and labels) — the two High visual fixes.
4. Q6–Q10 + P8 + P9 (schema and share fixes).
5. P5 (guides hub) + P6 + P7 (independent links, aimed at the 4 link-less tools).
6. Medium items M-A to M-P, then Low / optional.
