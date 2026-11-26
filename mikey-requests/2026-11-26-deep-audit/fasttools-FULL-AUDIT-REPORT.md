# FastTools.me — Deep SEO Audit — 26 November 2026

- Domain: fasttools.me
- Audit date: 26 November 2026
- Scope: 8 free tools, 58 sitemap URLs, live checks 26 Nov 2026 ~10:26–10:35 UTC (16:26–16:35 Asia/Dhaka), plus OpenSEO audit 1c7f1650-7152-471a-a82f-4356fc80735e
- Read-only audit. No code changed, no merges, no deploys.

## Verdict

- The site is in better shape than on 25 November: the Phase 2 deploy fixed nearly every on-page and technical defect from the 25 Nov audit, and OpenSEO issues fell from 22 to 12.
- The site still has no independent link profile: 1 independent dofollow link (Viberank) out of 64 verified dofollow links (agent-reported total — 49 as of 25 Nov + 15 from the 26 Nov piece; only Viberank live-verified 26 Nov), and 4 of the 8 tools have no links at all (agent-reported).
- The biggest live risk is a deploy risk, not a live defect: six API routes still carry `force-dynamic`, so a static-export build would break the keyword-gap tool.
- The biggest content risk is new: the freelance developer page now carries a sourced benchmark table, but other numbers on the same page contradict it.
- The 12 November visibility collapse persists: 22 impressions in 13 days after 12 Nov against 2,891 before, a 99.2% fall, with no technical cause in this check. Pages are still indexed and freshly crawled, so this is a ranking loss, not deindexing. The November 2026 core update (started 10 Nov) is the best fit on timing, at medium-low confidence — a date overlap, not proof.

## SEO Health Score: 73 / 100

Weighted from the seven scored categories. Backlinks carry no score: Common Crawl returned no data for this domain, so no backlinks score is given and backlinks are excluded from the total.

| Category | Score | Weight | Weighted points |
|---|---|---|---|
| Technical | 88 | 22% | 88 × 0.22 = 19.36 |
| Content | 70 | 23% | 70 × 0.23 = 16.10 |
| On-Page (SXO + Cluster) | 67 | 20% | 67 × 0.20 = 13.40 |
| Schema | 78 | 10% | 78 × 0.10 = 7.80 |
| Performance | 72 | 10% | 72 × 0.10 = 7.20 |
| AI Search Readiness (GEO + Agentic) | 62 | 10% | 62 × 0.10 = 6.20 |
| Images (Visual) | 62 | 5% | 62 × 0.05 = 3.10 |
| **Total** | | **100%** | **19.36 + 16.10 + 13.40 + 7.80 + 7.20 + 6.20 + 3.10 = 73.16 → 73** |

- Backlinks: no score — insufficient data (Common Crawl timed out twice with empty output; see the Backlinks section below). Counts in this report are the team's own verified links, not a crawl of the web.
- Unmeasured and excluded from every category score, not given numbers: Mobile rendering, Core Web Vitals field data, JS-rendered vs raw-HTML comparison, and live AI-citation checks. No Lighthouse run was possible (PSI rate-limited, no API key, no Chromium in the VM).

## Category breakdown

| Category | Score | What is good | What holds it down |
|---|---|---|---|
| Technical | 88 | Crawl, indexation, canonicals, security headers, host handling all clean; 58/58 sitemap URLs return 200; www → apex 301 live | Force-dynamic API routes vs static export (High); duplicate invoice-for pair with a conflicting robots signal |
| Content | 70 | Sourced freelance benchmark table now live; Stripe rates dated; JSON pages now distinct; no page under 300 words | Freelance page numbers contradict its own table (2 High findings); sources mostly unlinked; readability Flesch 17–25 on sampled intros |
| On-Page (SXO + Cluster) | 67 | Page type matches on all 5 head queries checked; cron and freelance hubs link all spokes in the body; no orphans; no cannibalisation | Stripe hub links 0 of 9 spokes in the body; no blog or guides section; keyword-gap is the thinnest hub and the only server-dependent tool |
| Schema | 78 | Homepage ItemList now 8 with json-to-zod; 0 title/description length issues; FAQPage matches visible text on all 51 pages; 58/58 self-canonical | Freelance family JSON-LD lacks identity nodes (13 pages); identical Stripe-flavoured featureList on 41 pages |
| Performance | 72 | Static assets immutable-cached with edge HITs; no render-blocking scripts; GA4 deferred to first interaction; zero third-party requests on initial load; no images | HTML never edge-cached — every visit pays a full Functions render; JS ~873 KB raw on the homepage |
| AI Search Readiness | 62 | Site readable by AI crawlers without JS; robots.txt blocks nothing; llms.txt lists all 8 tools and 58 spokes; MCP endpoint live with 6 tools | Search-citability crawlers never named in robots.txt; no Content-Signal; MCP endpoint undiscoverable; calculator inputs lack labels agents can read |
| Images (Visual) | 62 | Zero raster images site-wide (0 `<img>` tags); all icons inline SVG; fonts self-hosted and shift-safe; tool-first above-fold order | 74 of 165 buttons below the 24px WCAG 2.2 AA minimum; most tool inputs have no programmatic label; og:image missing on 3 of 5 pages checked |

## Top 5 critical issues

1. **TECH-F1 — Six `force-dynamic` API routes still cannot go into a static-export build.** The deploy-model decision is still unrecorded (25 Nov Row 10, still open). A routine rebuild that flips the flag would kill the keyword-gap tool's data source.
2. **CONT-F01 — Freelance developer page intro says 1,100 hrs / $75–$200, contradicting its own sourced table** ($20–$220, calculator default 1,196 hrs).
3. **CONT-F02 — Freelance FAQ answers state unsourced rates** ($75–$175+/hr; web dev $50–$125) that conflict with the table ($15–$50, median $30).
4. **PERF-F1 — HTML never edge-cached** (`max-age=0, must-revalidate`, `cf-cache-status: DYNAMIC`); every visit pays a full Functions render.
5. **SXO-F1 — Stripe hub links 0 of 9 spokes in the body.** Spokes sit at average positions 9.8–45.6 (25 Nov GSC, agent-reported).

## Top 5 quick wins

1. **Fix the freelance numbers to agree** (CONT-F01 + CONT-F02, copy only, one page).
2. **Link every named source + delete the stale "Rates verified Oct 2026" badge** (CONT-F03 + CONT-F04).
3. **Name the AI search crawlers in robots.txt** — OAI-SearchBot, Claude-SearchBot, Googlebot, Applebot, Perplexity-User (GEO-F01 / TECH-F4).
4. **Add the Stripe spoke list to the hub body**, copying the cron hub pattern (SXO-F1).
5. **Keyword-gap tidy-up:** fix "Targetting", replace dead `/tools/…` example paths with real spoke URLs, rewrite the jargon FAQ in plain words (CONT-F05).

## What changed since the 25 Nov audit

The Phase 2 deploy landed 25 Nov ~10:30 UTC (after the 25 Nov audit crawl at 09:05 UTC) and the www → apex redirect was added 26 Nov 11:06. Status per 25 Nov item, re-verified live 26 Nov:

| 25 Nov item | Status 26 Nov | Evidence |
|---|---|---|
| Row 1 — Freelance benchmarks unsourced | FIXED, with new defects on the same page | Sourced table live on hub + developer spoke (Arc 2026, 5,302 developers; Upwork; BLS OEWS May 2025). New: intro and FAQ numbers contradict the table (CONT-F01, CONT-F02) |
| Row 2 — Homepage tool counts; JSON overlap | PARTIALLY FIXED (one residual) | FAQ reads "8 core tool hubs"; ItemList numberOfItems 8; JSON titles/H1s now distinct. Residual: homepage gives json-to-zod 2 links vs 3 for every other hub — Row 2's proposed change explicitly included giving json-to-zod the same three homepage links, so that part is undone |
| Row 3 — Invoice H1 "INVOICE", 75-char title | PARTIALLY FIXED (two residuals) | H1 "Free Invoice Generator & PDF Maker"; title 46 chars. Residuals: an H2 reading "INVOICE" still exists as the preview heading; "Subtle" still in copy and meta description — Row 3's proposed change explicitly included dropping "Subtle", so that part is undone |
| Row 4 — Cron hub links 0/25 spokes | FIXED | Hub body now has "All 25 Cron Schedules" with 25/25 spoke links; freelance hub links 12/12 |
| Row 5 — Metadata pass (4 titles, 4 descriptions long, 1 short) | FIXED | OpenSEO 26 Nov: 0 title-too-long, 0 description-too-long, 0 description-too-short (was 9 issues) |
| Row 6 — MicroLaunch free submission | STILL OPEN | No submission reported; still 1 independent dofollow link (BACK-F1) |
| Row 7 — Duplicate DevTo posts split equity | FIXED | DevTo -38c4 now 404 (removed 25 Nov, Sheriff approved); -4j78 live with canonical to /stripe-fee-calculator/reverse |
| Row 8 — Aim links at stuck subpages | STILL OPEN | Stripe hub still gives 9 spokes no in-body link; 4 of 8 tools still have zero links and zero GSC queries (agent-reported) |
| Row 9 — www serves full site, no redirect | FIXED | https://www.fasttools.me/ → 301 to https://fasttools.me/, path + query preserved; http variants also 301 |
| Row 10 — Deploy model decision (force-dynamic vs static export) | STILL OPEN | Keyword-gap API still live as a Function (GET 200, real gap data, TTFB 2.42 s); decision still not recorded |
| Row A — Free directory batch (Uneed, SaaSHub, Indie Hackers, Devpost) | STILL OPEN | No submission reported in the 26 Nov findings |
| Row B — Hashnode canonical policy | STILL OPEN | Hashnode still nofollow ugc platform-wide with canonical to the tool page; no written policy reported (BACK-F5) |
| Row C — Owned guide pages (no blog on fasttools.me) | STILL OPEN | /blog and /guides both still 404; 0 article URLs in the 58-URL sitemap; 122 parasite posts still have no owned article page |
| Row D — Pinterest pin + LinkedIn companion for piece 1 | NOT RE-VERIFIED | Not covered by any 26 Nov findings file; no status given here |
| Sitemap lastmod stale (6 Nov) | FIXED (freshness); design note open | All 7 sub-sitemaps lastmod 2026-11-25T10:30:51.085Z. Still a build-time stamp, not per-page change time (TECH-F5) |
| Heading skips on 12 pages | IMPROVED | 11 pages flagged in the 26 Nov audit (was 12); homepage and invoice no longer flagged |
| Freelance hub/spokes lack WebSite/Organization/Person/WebPage schema | STILL OPEN | Live JSON-LD still only WebApplication, HowTo, FAQPage, BreadcrumbList on all 13 freelance pages (SCH-F1) |
| Keyword-gap thinnest hub (663 words) | IMPROVED, still thinnest | 783 words in the 26 Nov audit (was 663); still the thinnest hub (next thinnest hub is invoice at 1,300) |
| Duplicate invoice-for-shukhi / invoice-for-shuki pair | STILL OPEN | Both still 200, near-identical (2-byte size diff), both meta noindex; new detail: sitewide x-robots-tag header says index, follow, contradicting the meta (TECH-F2) |

Summary of the 14 opportunity rows: 5 fixed (Rows 1, 4, 5, 7, 9), 2 partially fixed (Rows 2, 3), 6 still open (Rows 6, 8, 10, A, B, C), 1 not re-verified (Row D).

## Search performance (GSC) — collapse persists

- **Verdict: YES, the collapse persists.** Pulled 26 Nov 2026, data through 24 Nov, property `sc-domain:fasttools.me`, direct GSC Search Analytics API via service account (webmasters.readonly scope).
- 26 Oct–11 Nov (17 days): 2,891 impressions, 9 clicks, 170.1 impressions per day.
- 12–24 Nov (13 days): 22 impressions, 1 click, 1.7 impressions per day.
- Change: impressions −99.2% in total (−99.0% per day). Clicks 9 → 1.
- No recovery signal: 7 of the 13 post-collapse days had 0 impressions; the best day was 17 Nov with 11 impressions, 6 of those from unexplained `site:investing.com` queries at position 1–2, too small a volume to read into.
- Every page that drove traffic before is at 0–3 impressions after. The loss is site-wide, not one page or one tool. Top pages before: freelance developer spoke 215, stripe international 208, crontab every-day-at-1am 189. After: homepage 5 (1 click), crontab every-6-hours 4, every-day-at-noon 4.
- Brand query "fasttools" fell from position 6.0 (34 impressions, 3 clicks) to position 58.0 (1 impression). Even the brand term lost its ranking.
- **Indexation: pages are still indexed.** OpenSEO `inspect_urls`, 26 Nov: 5 of 5 "Submitted and indexed", robots ALLOWED, fetch SUCCESSFUL, canonical matches declared. Last crawls: homepage 19 Nov, json-to-zod 25 Nov, stripe hub 17 Nov, freelance developer 17 Nov, crontab every-day-at-1am 30 Oct. This is a ranking and visibility loss, not deindexing and not a crawl block.
- **Google update correlation:** November 2026 core update started 10 Nov 2026, duration 13 days 20 hours (ends ~24 Nov); December 2026 core update started 24 Nov, duration not yet shown (live check 26 Nov at status.search.google.com). The collapse begins 12 Nov, two days after the core update started. Date overlap only — a hypothesis, never proof of cause. The local ledger (`seo_updates.py`) lists 8 updates since Oct 2026, all documentation updates, last verified 2026-11-10 — it missed the November core update because it was last verified on the day the core update started.
- **Best-evidenced explanation:** the November 2026 core update is the best fit on timing, at medium-low confidence. For it: exact timing; site-wide loss across all three tool families at once; surviving rows fell sharply. Against a simple core-update story: whoisalfaz.me improved over the same window; the drop is near-total (−99%), steeper than a normal core-update slide; pages remain indexed and freshly crawled.
- **What would prove or disprove it:** (1) check GSC Security & Manual Actions in the UI for a manual action (no API path — needs the GSC UI); (2) watch for recovery during or after the December core update; (3) confirm no Cloudflare, DNS, redirect or site change landed 11–12 Nov (the www→apex fix and the 25 Nov audit deploy are both dated after the collapse, so neither explains the start); (4) compare index-coverage counts in GSC before and after 12 Nov.
- **Gaps:** CrUX field data unavailable (`crux_history.py` needs a Google API key, none configured) — no CWV numbers are reported. The direct URL Inspection API call dropped mid-request and was not retried; index status came from OpenSEO `inspect_urls` instead. Row-level dimension totals differ slightly from daily totals (GSC omits anonymised low-volume rows from dimension breakdowns); daily totals are the headline numbers.

## Findings — High (12)

Finding IDs keep the source file's code so each item can be traced back: TECH = technical.md, CONT = content.md, SCH = schema-sitemap.md, PERF = performance.md, VIS = visual.md, GEO = geo-agentic.md, SXO = sxo-cluster.md, BACK = backlinks.md.

### H1 — TECH-F1 — Force-dynamic API routes still cannot go into a static-export build

- **Problem:** Six route files declare `export const dynamic = "force-dynamic"`, and live behaviour proves the deploy is not a static export: the keyword-gap API computes real results on GET and POST, `cf-cache-status: DYNAMIC`, and HTML carries `Cache-Control: public, max-age=0, must-revalidate`.
- **Change:** Before any deploy that changes build mode, decide once and record it — keep Pages Functions (leave the flag unset) or convert/remove all six routes. Do not let a routine rebuild flip the flag by accident.
- **Expected effect:** Prevents a broken deploy that would kill the keyword-gap tool's data source (and the other five API routes) while the static pages still serve. This is a deployment-process risk, not a live defect — the site works today because Functions serve the API routes. Same item as 25 Nov Row 10, still open.

### H2 — CONT-F01 — Freelance developer page: intro numbers disagree with the page's own sourced table

- **Problem:** On /freelance-rate-calculator/developer, the intro says rates come from "1,100 annual billable hours" and "between $75 and $200 per hour". The sourced table on the same page spans $20–$220 (Junior $20–$50, Mid $40–$90, Senior $75–$150, Staff $120–$220). The scenario table lists Senior $165/hr (above the $150 band top) and Staff $225/hr (above the $220 band top). Calculator defaults say "Annual Billable: 1,196 hrs" (26 hrs/wk × 46 weeks), not 1,100.
- **Change:** Pick one set of numbers and use it everywhere on the page. Smallest edit: change the intro to "1,196 annual billable hours" and "$20 to $220 per hour", and cap scenario rates at the table bands (Senior ≤ $150, Staff ≤ $220) or add a line saying scenario rates are worked examples that can sit outside the bands and why.
- **Expected effect:** Protects the sourced table just shipped — it is the page's best trust asset, and numbers elsewhere on the same page that contradict it give a reader (and a quality rater) reason to doubt it. The freelance cluster is the site's largest demonstrated demand cluster (25 Nov GSC, agent-reported: developer spoke 320 impressions, average position 41.7; hub 189 at 34.1).

### H3 — CONT-F02 — Freelance FAQ answers state unsourced rates that conflict with the sourced table

- **Problem:** On the same developer page, one FAQ answer says "Standard US software developer rates per hour range from $75/hr … to $175+/hr" with no source named; $175+ exceeds the table's Senior band ($75–$150). Another says "Web developer freelance rates range between $50/hr and $125/hr" with no source; the table's own web-developer row says $15–$50 (median $30) from Upwork. A third FAQ on the same page correctly quotes the Arc table. Also: "24-26h/wk sustainable focus" (calculator label) vs "20 to 25 billable hours per week" (methodology section).
- **Change:** Rewrite the two unsourced FAQ answers to quote the Arc/Upwork table figures with the source named, or delete the figures and link to the table. Align the hours figure (pick 20–25 or 24–26) in both places.
- **Expected effect:** The two unsourced answers are the exact sentences an AI answer would lift, so fixing them is also the citation-readiness fix. Removes a direct contradiction on the site's most-demanded cluster.

### H4 — PERF-F1 — HTML is never edge-cached; every visit pays a full Functions render

- **Problem:** `Cache-Control: public, max-age=0, must-revalidate` + `cf-cache-status: DYNAMIC` on all 6 pages measured today, same as 25 Nov. Server TTFB 0.25–0.63 s on every hit, even for identical pages.
- **Change:** Set a Cloudflare Cache Rule for the HTML routes with a short `max-age` plus `stale-while-revalidate` (e.g. `max-age=300, stale-while-revalidate=86400`), or split the build so tool pages prerender statically while the force-dynamic API route stays a Function. Do not turn on static export site-wide without that split — it would break the keyword-gap route (see H1).
- **Expected effect:** Repeat visits stop paying a full server render on every hit; server response time drops for cached pages. Static assets are already correct (immutable, 1-year cache, edge HITs), so this is the one caching gap left.

### H5 — VIS-V01 — Most buttons and inputs are far below the 44px site standard

- **Problem:** Estimated heights from Tailwind classes across all `<button>` elements on 5 pages: home 0 of 30 buttons ≥ 44px (max 32px); Stripe 6 of 23; JSON→TS 0 of 20; Crontab 0 of 66; Freelance 0 of 26. Total: 74 of 165 buttons are below even the 24px WCAG 2.2 AA minimum target size. Worst cases: cron preset chips ≈ 22px; cron minute/hour grid cells ≈ 28px; sidebar section toggles ≈ 14px; drawer toggle ≈ 36px; search inputs ≈ 28–40px.
- **Change:** Set `min-h-11` (44px) on primary controls (calculate/copy/export/search), `min-h-6` (24px) as an absolute floor on chips and grid cells, and raise cron preset/grid cells to at least `py-2.5`. Verify the real rendered sizes in a browser afterwards — these are class-based estimates, not measured pixels.
- **Expected effect:** Tool controls become usable by touch and by users with limited fine motor control. Note: heights are estimates from markup; no screenshots or rendered layout were possible in this audit.

### H6 — VIS-V02 — Tool inputs have no programmatic label

- **Problem:** 0 inputs on any page have an `id`; no tool input has `aria-label`. Inputs with no label association at all: home 2/2, Stripe 3/6, JSON→TS 4/8, Crontab 8/8, Freelance 7/7. Both search inputs are placeholder-only on all 5 pages; all 4 Freelance range sliders are unnamed; the 5 cron field inputs and the cron expression input are unnamed; the JSON textareas rely on visible headings only.
- **Change:** Give every input an `id` plus `<label for="…">`, or an `aria-label` where a visible label is not wanted. Start with the search box, the Stripe amount input, all cron fields, and the 4 Freelance sliders.
- **Expected effect:** Screen-reader and agent users can tell what each control does; the same fix is flagged by the agentic audit as a P0-class item (accessible names in the tree). See also GEO-F06, the same gap from the agent side.

### H7 — GEO-F01 — robots.txt never names the search-citability crawlers

- **Problem:** robots.txt has named `Allow: /` groups for GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, `anthropic-ai`, FacebookBot, Amazonbot, Bingbot. It has no group for `OAI-SearchBot` (decides ChatGPT Search citability), `Claude-SearchBot` (decides Claude search citability), `Googlebot`, `Applebot`, `Perplexity-User`, or `cohere-ai`.
- **Change:** Add named `Allow: /` groups for `OAI-SearchBot`, `Claude-SearchBot`, `Googlebot`, `Applebot`, `Perplexity-User`. Drop the `anthropic-ai` group — Anthropic's crawler docs do not list that token.
- **Expected effect:** A future edit that adds a `Disallow` to the `*` group can no longer silently cut off ChatGPT or Claude search citability, and the file's own header claim that "all AI search engines … explicitly allowed" becomes true. Nothing is blocked today — the `User-agent: * / Allow: /` wildcard covers every unnamed crawler — so this is explicitness, not an access fix. Same fix as TECH-F4 (Low).

### H8 — SXO-F1 — Stripe hub links none of its 9 spokes in the body

- **Problem:** 0 of 9 spoke hrefs inside `<main>` on /stripe-fee-calculator; the hub's only in-main internal link is /crontab-generator. The hub is also the thinnest hub editorially: 2 H2s, vs 7 on the freelance hub and a full spoke list on the cron hub. The 9 spokes sit at average positions 9.8–45.6 (25 Nov GSC, agent-reported) and get no hub push in the body.
- **Change:** Add a "Stripe fees by country / by use case" section listing all 9 spokes, copying the cron hub's "All 25 Cron Schedules" pattern.
- **Expected effect:** The hub passes its own standing to the spokes that are nearest the top 10, using a pattern already proven on the cron hub. Same gap as CONT-F08 (Low) from the content side.

### H9 — SXO-F2 — No blog or guides section; article-intent queries have no owned page

- **Problem:** /blog and /guides both 404; 0 article URLs among the 58 sitemap URLs. 25 Nov GSC (agent-reported): "calculate freelance rate" 11 impressions, average position 54.0, 0 clicks — an explainer query the tool page alone does not answer.
- **Change:** Add a /guides/ hub and one owned guide first (freelance rate math, per 25 Nov Row C), then point parasite canonicals and link-backs at it.
- **Expected effect:** An owned page can rank for the article query cluster and collect the parasite links' value in one place, instead of scattering it across tool pages that answer a different question. A new guide page starts with no authority of its own, so ranking is not guaranteed. Same item as 25 Nov Row C, still open.

### H10 — BACK-F1 — Only 1 independent dofollow link in a 64-link profile

- **Problem:** Verified dofollow links: 64 (agent-reported: 49 as of 25 Nov + 15 from the 26 Nov freelance piece). Independent dofollow links: 1 (Viberank, live-verified 26 Nov, 200, no nofollow on page). 63 of 64 dofollow links are self-published. Follow ratio 64/76 = 84% (agent-reported totals).
- **Change:** Submit MicroLaunch free Regular Launch (verified dofollow, Tier 1 research 25 Nov), then the Uneed / SaaSHub / Indie Hackers / Devpost free batch. Needs Sheriff's Chrome sign-in.
- **Expected effect:** First independent link beyond Viberank, plus discovery traffic from the launch cohort. Directional only — no ranking promise. Same item as 25 Nov Row 6, still open. Common Crawl returned no data for this domain, so no third-party count exists to cross-check the team's own verified total.

### H11 — BACK-F2 — All dofollow sits on 7 self-owned platforms

- **Problem:** Live sample of 12 URLs checked 26 Nov (11 live, 1 gone by design): 31 of 34 link instances come from Alfaz's own accounts (DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit, Bear Blog). Hashnode AutoMod already removed one sprint post. One platform policy change or account problem can remove a large share of the profile at once.
- **Change:** Treat independent links as the priority (H10). Keep canonicals set on every parasite post so copies consolidate rather than compete.
- **Expected effect:** Reduces concentration risk. No toxicity found in the sample — no PBN domains, no link farms, no paid footer/sidebar pattern, no exact-match anchor stuffing, no disavow candidates. The risk in this profile is concentration, not toxicity.

### H12 — BACK-F3 — 4 of 8 tools have zero links and zero GSC queries

- **Problem:** Invoice generator, JSON→Zod, bank-statement-to-CSV and keyword-gap analyzer have 0 link instances in the live sample and no GSC queries (agent-reported). All link building to date points at Stripe, freelance and cron. Link targets in the sample: Stripe family 16 instances, freelance 9, cron 4, homepage 1 (Viberank only).
- **Change:** Aim the next parasite round and directory submissions at those 4 tools with tool-named anchors. No new campaign needed — change targets in work already planned.
- **Expected effect:** The four link-less tools get their first inbound support; the nearest pages to the top 10 gain the only link support they have ever had. Same item as 25 Nov Row 8, still open.

## Findings — Medium (24)

### M1 — SCH-F1 — Freelance family JSON-LD graph is missing its identity nodes; publisher @id dangles (13 pages)

- **Problem:** All 13 /freelance-rate-calculator pages have a `@graph` with only WebApplication (+ HowTo on the hub only, BreadcrumbList, FAQPage). No WebSite, Organization, Person or WebPage node on any of them. `WebApplication.publisher` and `.maintainer` point to `https://fasttools.me/#organization`; `author` / `creator` point to `https://whoisalfaz.me/#person`. Neither `@id` has a node in these graphs — dangling references on all 13 pages (0 dangling refs on the other 45 pages). HowTo, FAQPage and BreadcrumbList on freelance pages also carry no `@id`. The 12 freelance spokes have no HowTo at all, while every other tool page has one.
- **Change:** Add the shared WebSite / Organization / Person / WebPage nodes to the freelance template (same block the other families use), give HowTo / FAQPage / BreadcrumbList their `#howto` / `#faq` / `#breadcrumb` ids, and either add HowTo to the 12 spokes or drop it from the hub for consistency.
- **Expected effect:** The freelance family's structured data stops pointing at nodes that do not exist, matching the other families. Same item as the 25 Nov freelance schema gap, still open.

### M2 — SCH-F2 — Identical Stripe-flavoured featureList on 41 WebApplication nodes

- **Problem:** The same 5-item list appears verbatim on 41 pages: "100% Client-side browser execution", "Zero server telemetry or storage", "Minor-unit integer arithmetic (zero float errors)", "Instant one-click clipboard copy", "Multi-region domestic, international, and ACH rate support". Present on stripe (10), cron (26 incl. hub), json (2), invoice, bank-statement, keyword-gap. "Minor-unit integer arithmetic" and "Multi-region domestic, international, and ACH rate support" describe Stripe fee math, not a crontab generator, JSON converter, keyword-gap tool or bank-statement converter. The structured data asserts false features on 31 non-Stripe pages.
- **Change:** Replace the shared constant with per-tool feature lists, or remove `featureList` where no tool-specific list exists. One template constant drives all 41.
- **Expected effect:** Structured data stops asserting features the tools do not have; a reader or system that quotes the data gets true facts.

### M3 — SCH-F3 — Keyword-gap breadcrumb points at a non-page (#seo)

- **Problem:** /keyword-gap-analyzer BreadcrumbList item 2 is `{"name": "SEO & Web Ops", "item": "https://fasttools.me/#seo"}`. Homepage HTML contains zero `id="seo"` anchors. The fragment resolves nowhere; it is also the only dangling `@id` ref outside the freelance family.
- **Change:** Point the crumb at a real page (e.g. the homepage or a tools index) or drop the middle crumb so the trail is Home → Keyword Gap Analyzer.
- **Expected effect:** One dead breadcrumb target removed; the breadcrumb trail describes real pages only.

### M4 — CONT-F03 — Rate sources are named but mostly not linked; Stripe spokes link no source at all

- **Problem:** Freelance developer spoke + hub: only Arc is a hyperlink (`https://arc.dev/employer-blog/freelance-developers-cost/`). "Upwork 2026 rates guide" and "US Bureau of Labor Statistics, OEWS May 2025" are plain text, no link. Stripe UK spoke: 0 occurrences of `stripe.com` in the fetched HTML despite the line "Rates checked 25 Nov 2026 against Stripe's UK pricing". Stripe US spoke: also 0. Stripe hub for contrast cites `https://stripe.com/pricing` and `https://docs.stripe.com/currencies` with `rel="reference citation noopener noreferrer"`.
- **Change:** Add a hyperlink on each source name — Upwork rates guide, BLS OEWS May 2025 table, and `stripe.com/pricing` (or the relevant regional pricing page) next to the "Rates checked" line on every Stripe spoke. One link per source, same pattern as the hub's citation links.
- **Expected effect:** A reader can check the rate against its source in one click, which is what the About page already claims ("Every regional rate schedule is crawl-verified against official payment provider documentation") — a claim that is unverified from the reader's side today.

### M5 — CONT-F04 — Stripe UK carries two different verification dates

- **Problem:** On /stripe-fee-calculator/uk, under the H1: "Rates checked 25 Nov 2026 against Stripe's UK pricing: standard UK cards 1.5% + 20p." Above the fee table, a badge still reads "Rates verified Oct 2026".
- **Change:** Delete the "Rates verified Oct 2026" badge (or update it to the same 25 Nov 2026 date) so the page shows one date. Check the other 8 Stripe spokes for the same stale badge — the UK page is the one verified; the rest are unchecked.
- **Expected effect:** One date on the page, so a reader does not have to guess which check is current. Whether the other 8 spokes carry the stale badge is unverified.

### M6 — CONT-F05 — Keyword-gap page: still thinnest hub, with a typo, a dead example path, and jargon-dense copy

- **Problem:** /keyword-gap-analyzer, 783 words (thinnest hub; next thinnest hub is invoice at 1,300). FAQ answer: "Targetting these gaps allows you to systematically build topical authority…" — "Targetting" (double t) is a typo. H3 "Programmatic Spokes" example: "publish lightweight, highly-targeted programmatic spokes (e.g. */tools/freelance-stripe-calculator*, */tools/agency-rates*)" — no `/tools/` path exists on fasttools.me; both example URLs are dead as written. FAQ answer on how the tool works leans on unexplained jargon: "stateless client-side query fan-out engines (including Google Autocomplete Alphabet-Soup algorithms, preposition mining, and on-page HTML heading extraction)". The cross-link banner to `whoisalfaz.me/audit` is still present (4 links in raw HTML, "Need a full free audit?" heading) — it sends the page's thinnest hub's outbound attention off-site instead of to a fasttools.me page.
- **Change:** Fix the typo; replace the example paths with real fasttools.me spoke URLs (e.g. /freelance-rate-calculator/developer, /stripe-fee-calculator/reverse); rewrite the jargon FAQ answer in plain words ("the tool asks Google's autocomplete for related searches, in your browser, and groups what comes back"); point the audit banner at a fasttools.me page or drop it until the hub has its own supporting content.
- **Expected effect:** The thinnest hub stops looking unfinished; its examples point at pages that exist.

### M7 — CONT-F06 — Readability: sampled intros score Flesch 17–25, sentences average ~25 words

- **Problem:** Computed 26 Nov from live page text (skill target is Flesch 60–70 for a general audience; Flesch is a quality indicator, not a ranking factor): freelance developer intro Flesch 20.0, 51 words / 2 sentences, avg 25.5 words per sentence; keyword-gap H2 intro Flesch 24.7; cron 1 AM analysis Flesch 16.7. Dense noun stacks in live copy: "Deterministic Pricing Expression", "Software Engineering Overhead & Infrastructure Matrix", "SOURCED MARKET BENCHMARKS".
- **Change:** Split the freelance intro into 3–4 short sentences (≤ 20 words each) and add a one-line plain-words gloss the first time "realization factor" and "W-2 parity" appear. No change recommended for cron/JSON, where a technical register is fine.
- **Expected effect:** The freelance and invoice pages — which address non-technical freelancers — become easier to read; the developer-facing pages keep their register.

### M8 — CONT-F07 — E-E-A-T: author is named, but proof is thin

- **Problem:** Present: /about section "Creator & Engineering Attribution" names Alfaz Mahmud Rizve; footer on every page: "Built by Alfaz Mahmud Rizve" linking to `https://whoisalfaz.me/`; pages carry `<meta name="author">`, `<link rel="author">`, and Person schema. Missing: no photo of the author; no credentials, work history, or external profile link on /about (no LinkedIn, GitHub, or publication list); no `datePublished`/`dateModified` on the About page; no contact route beyond footer links to About / Privacy / Terms; no date on the About page at all. Stale date: homepage byline still reads "Updated: October 2026" although the homepage, freelance pages, Stripe spokes and cron hub all changed on 25 Nov 2026.
- **Change:** Add one short bio block to /about (photo, 2–3 lines of background, links to LinkedIn/GitHub/whoisalfaz.me); update the homepage byline to November 2026; add visible `datePublished`/`dateModified` to About. No new pages needed.
- **Expected effect:** The named author becomes a checkable person, which is the part of E-E-A-T the site currently asserts without evidence.

### M9 — CONT-F10 — AI citation readiness: definitions and sourced facts exist, but dates are not in schema and two FAQ answers are unsourced

- **Problem:** Good: freelance table is quotable with named sources and a check date; Stripe spokes open with an answer-first fee statement; keyword-gap, cron and freelance pages all carry definition-style FAQs. Gaps: the two unsourced freelance FAQ answers (H3) are the exact sentences an AI answer would lift; About has no `datePublished`; the keyword-gap tool claim "Expands via Google Autocomplete alphabet soup (a-z)" is stated without a source or a worked example.
- **Change:** Fix H3 first (it is the citation-readiness fix); add `datePublished`/`dateModified` to the About and hub pages' schema; add one worked example to the keyword-gap intro (seed keyword in → 3 sample gaps out).
- **Expected effect:** The site's quotable sentences become quotable with sources and dates attached. No live check of what ChatGPT, Perplexity, or Google AI Mode actually cite for fasttools.me queries was possible — that needs a paid GEO tool (OpenSEO credits = 0) and is not claimed here.

### M10 — PERF-F2 — JS weight: ~873 KB raw / ~244 KB brotli on the homepage

- **Problem:** 9 chunks; three chunks alone are 229 KB + 179 KB + 156 KB raw. First-visit transfer ≈ 333 KB including fonts. Stripe hub loads 10 JS chunks (2 page-specific extras on top of the shared 8).
- **Change:** Code-split below-fold tool code and audit the three largest chunks (`0d66q46efh1wk.js`, `3fwc5j01czd6i.js`, `13gethnskpzmi.js`) for dead or shared code that can load lazily. Verify with a real browser bundle check before cutting.
- **Expected effect:** Smaller first-visit download. The size is a weight note, not a measured user-facing delay — no LCP / INP / CLS was measured in this audit.

### M11 — PERF-F3 — Homepage HTML grew 147,560 → 157,713 B raw since 25 Nov with no deploy

- **Problem:** Raw fetch today vs 25 Nov technical notes. Inline script/RSC payload is 54,481 B of the page. Cron spoke also grew (160,671 → 166,018 B). The growth is in served content (RSC/inline payload), worth a look, not an emergency.
- **Change:** Diff the served HTML against the 6 Nov deploy output and trim what grew — likely RSC payload or duplicated inline data. If the growth is JSON-LD, keep it; if it is duplicated RSC data, drop the duplicate.
- **Expected effect:** Page weight back toward the 25 Nov level if the growth is duplicated data. The cause is not established — this is a check, not a confirmed defect.

### M12 — VIS-V03 — Live results are never announced to screen readers

- **Problem:** `aria-live`, `role="status"` and `role="alert"` counts are 0 on all 5 pages checked. Results update in place (Stripe "Net Payout" sits ~335 characters after the "Amount" input in the DOM — placement is good), but a screen-reader user gets no announcement when a result changes. Same gap for the JSON conversion output and the cron next-runs list.
- **Change:** Add `aria-live="polite"` to the Stripe results container, the JSON output panel, and the cron results area.
- **Expected effect:** Screen-reader users hear the result when it changes, instead of having to hunt for it.

### M13 — VIS-V04 — White text on the mid-green secondary button fails contrast

- **Problem:** Stripe page secondary button (`bg-[#749673]`, white `text-xs` label) = 3.31:1; its hover state (`#658564`) = 4.12:1. AA needs 4.5:1 for normal text. Marginal case in the same family: sidebar section labels #737A6E on #FFFCF5 = 4.33:1 at 10px, just under 4.5:1. Body text mostly passes AA: body #181E17 on #FFFCF5 = 16.57:1; primary green CTA white on #1B4520 = 10.68:1; muted text #60675B on #FFFCF5 = 5.71:1.
- **Change:** Darken the secondary button to at least #4F6B52 (check ≥ 4.5:1 before shipping) or use dark text on it; darken sidebar section labels to #60675B (5.71:1, already used elsewhere).
- **Expected effect:** The one failing control passes AA contrast; the marginal sidebar labels pass too.

### M14 — VIS-V05 — Ad slots have no reserved height

- **Problem:** The "Advertisement" / "Sponsored Developer Space" boxes on /json-to-typescript (`id="ad-json-to-ts-mid"`) and /stripe-fee-calculator (`id="ad-stripe-calc-mid"`) are `p-4 flex items-center justify-center` with no `min-height`. When an ad fills the box, content below it moves.
- **Change:** Give each ad container a `min-height` matching the ad unit it will hold (e.g. `min-h-[250px]`).
- **Expected effect:** Content below the ad stops shifting when the ad loads. No layout shift was measured — this is a markup gap, not a measured CLS number.

### M15 — GEO-F02 — No Content-Signal anywhere

- **Problem:** `grep -c content-signal` on robots.txt = 0; homepage response headers carry no `Content-Signal` header.
- **Change:** Add a `Content-Signal` line to each robots.txt group once Sheriff states the training policy (`search=yes, ai-input=yes, ai-train=yes/no`). Do not pick the training value for him — it is a licensing call, not a technical one.
- **Expected effect:** The site states its AI-training position in the machine-readable form, instead of leaving it unsaid. Training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) are all allowed today; no Content-Signal or RSL states a training preference.

### M16 — GEO-F03 — llms.txt is accurate but undated and carries two defects

- **Problem:** `https://fasttools.me/llms.txt` (14,166 B) lists all 8 tools and 58 spoke pages; spot-checked links all return 200. Defects: (a) line "processing monetary values in integer base units (cents, pence, cents)" repeats "cents" — typo; (b) no last-updated date and no rates-as-of date, while the file and the Stripe page both state specific rates (e.g. US 2.9% + $0.30, UK 1.5% + 20p) — a reader cannot tell if the rates are current; (c) the header claims "<1ms latency, 0ms server RTT" with no measurement shown.
- **Change:** Fix the typo, add `Last updated: 2026-11-26` and a `Rates verified: <date>` line, and either drop the latency claim or back it with a measured figure.
- **Expected effect:** An agent reading llms.txt can tell whether the rates it quotes are current. Per Google's AI optimization guide, llms.txt carries no weight for Google Search; its value here is for non-Google systems only.

### M17 — GEO-F05 — MCP endpoint exists but is undiscoverable

- **Problem:** `GET https://fasttools.me/api/mcp` returns 200 JSON naming server `fasttools-mcp-server`, protocol `2024-11-05`, with 6 tools: `calculate_stripe_fees`, `validate_crontab_expression`, `convert_json_to_zod`, `parse_bank_statement`, `analyze_keyword_gap`, `calculate_invoice`. But `/.well-known/mcp.json` is 404, `/.well-known/agent.json` is 404, `/.well-known/ai-catalog.json` is 404, and no page links to `/api/mcp`. Only 6 of the 8 tools are exposed (no freelance-rate tool; JSON-to-TypeScript is not exposed, only `convert_json_to_zod`).
- **Change:** Publish `/.well-known/mcp.json` (or an MCP Server Card) pointing at `/api/mcp`, link it from llms.txt, and state which tools are exposed and whether calls need confirmation.
- **Expected effect:** Agents can find the MCP endpoint instead of having to know its URL. Note: the GET descriptor was verified; a full MCP session handshake was not tested in this audit.

### M18 — GEO-F06 — Calculator inputs lack labels agents can read

- **Problem:** Raw HTML of /stripe-fee-calculator has 4 `<label>` elements and zero `<label for="…">` associations. The main amount `<input type="number" min="0.5" step="any" …>` has no associated label; its caption ("Invoice / Gross Charge Total $") is plain text, not a label. The homepage search input has placeholder text only and the homepage has 0 `<label>` elements in raw HTML. Positive: a "Skip to content" link is present, and headings are clean (one H1 per page).
- **Change:** Give every calculator input a `<label for>` (or `aria-label`/`aria-labelledby`), starting with the amount, currency, and mode inputs on the Stripe, freelance-rate, and invoice pages. This is a P0-class item in the agentic skill (accessible names in the tree).
- **Expected effect:** Agents that read the accessibility tree can tell what each input does. Same fix as H6 (VIS-V02) from the visual side.

### M19 — GEO-F08 — Cloudflare blocks bare non-browser user agents (403)

- **Problem:** Python `urllib` with its default UA got HTTP 403 on `https://fasttools.me/api/mcp`, while the same URL with a Mozilla UA and with a GPTBot UA returned 200. Homepage fetch with GPTBot UA returned 200. Named AI crawlers get through today, but an unnamed plain fetcher can be refused.
- **Change:** Confirm in the Cloudflare WAF / Bot Fight Mode settings that verified AI crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot) are allow-listed by verified identity (reverse DNS), not just by UA string; re-test with a plain fetcher after any change. Do not probe with spoofed agent UAs — only the checks above were run.
- **Expected effect:** A legitimate agent that fetches with a plain UA stops getting refused, while bot protection stays in place.

### M20 — SXO-F3 — Keyword-gap analyzer is the thinnest hub and the only server-dependent tool

- **Problem:** /keyword-gap-analyzer — 783 words by the OpenSEO whole-page count (thinnest hub; next thinnest hub is invoice at 1,300), 1 H2 ("How to Dominate Search With Gap-Driven Programmatic SEO"), vs bank 2,209 words, JSON pages ~1,700 words. Its result needs a server call (API 200, ~1.2s on 26 Nov); every other tool runs in the browser. 25 Nov GSC (agent-reported): 1 impression in 3 months.
- **Change:** Add a short guide section (how to read a gap table, one worked example) and a plain on-page message if the API call fails, so the page still answers the query when the API is down.
- **Expected effect:** The page answers the query even when its API is down, and gives the thinnest hub some substance. (Counting note: the specialist's own count for the page was ~907 words; the 783 figure used here is the OpenSEO whole-page count, kept as the single headline number so the report quotes one figure.)

### M21 — SXO-F4 — In-body next steps are patchy; the journey stops at the tool

- **Problem:** /keyword-gap-analyzer body links to no tool at all; /stripe-fee-calculator/uk body links /reverse but not invoice or freelance; /invoice-generator body links freelance but not Stripe; /bank-statement-to-csv body links freelance but not invoice. Global nav links all hubs on every page, so this is a body-content gap, not a navigation gap.
- **Change:** Add one "Next step" line in each tool body — e.g. Stripe UK → reverse calculator; invoice → Stripe fee calculator; bank statement → invoice generator; keyword-gap → freelance rate calculator.
- **Expected effect:** A visitor who finishes one tool sees the next tool that fits their job, instead of the journey ending at the tool. The small-business persona is the weakest of the three scored (freelancer strongest, developer good) partly because no in-body path connects Stripe, invoice and bank-statement.

### M22 — SXO-F5 — No author, method, or visible date on most pages

- **Problem:** Only /freelance-rate-calculator/developer ("Rates checked 25 Nov 2026") and /stripe-fee-calculator/uk ("2026 Rate Schedule • Verified UK Schedule") carry a visible check date. Competitor pages in all five SERP snapshots show a named author and a "checked Nov 2026" line.
- **Change:** Add one line under each tool H1 — "Checked <date> · <method/source>" — starting with the Stripe hub and the two JSON pages.
- **Expected effect:** Every tool page shows the same freshness signal competitors show. Same family of gap as M8 (CONT-F07) from the content side.

### M23 — BACK-F4 — WordPress.com and Kit posts are self-canonical (Free plan cannot set a canonical to the tool page)

- **Problem:** Live-verified 26 Nov: WordPress + Kit canonical = own URL on both the 25 Nov and 8 Nov posts. 2 of 6 copies of each piece compete as separate URLs.
- **Change:** Keep the "Originally published at" link-back line on every WordPress/Kit post (already done on some pieces — check each post carries it) and keep DevTo/Hashnode canonicals set.
- **Expected effect:** The copies point back at the tool page even though their canonical cannot, so their value consolidates instead of competing.

### M24 — BACK-F5 — Hashnode passes no equity (nofollow ugc platform-wide) and its canonical points at the tool page

- **Problem:** Live-verified 26 Nov: 3 links on the Hashnode post, all `nofollow ugc`, canonical → /reverse. The post can neither pass value nor rank for itself.
- **Change:** Set a written Hashnode policy: either drop the canonical so the post can rank, or keep it deliberately and count Hashnode as discovery-only. (Already in opportunities.md Row B.)
- **Expected effect:** One clear decision instead of a post that does neither job. Small either way — no link equity is at stake on Hashnode. Same item as 25 Nov Row B, still open.

## Findings — Low (21)

### L1 — TECH-F2 — Duplicate invoice-for pair still live, now with a conflicting robots signal

- **Problem:** Both /invoice-for-shukhi and /invoice-for-shuki still return 200, near-identical (2-byte size diff), both meta `noindex, nofollow, nocache`, neither in any sitemap, zero inbound links. New detail: the sitewide `x-robots-tag` response header says `index, follow` on both pages, contradicting the page meta. Google applies the most restrictive directive, so noindex should still hold — but the site now sends two opposite signals on the same URL.
- **Change:** Delete the /invoice-for-shuki alias route (the `shukhi` dir holds the real app) and let it 404; or add a canonical on the alias pointing at /invoice-for-shukhi. Separately, scope the `x-robots-tag: index, follow` header in `public/_headers` so it does not fire on noindex pages.
- **Expected effect:** One live invoice-for page instead of two, and one robots signal instead of two. Same item as 25 Nov, still open.

### L2 — TECH-F3 — TTFB ~1.0–1.2 s on every fetch today (watch, single-day observation)

- **Problem:** Homepage TTFB 1.02 s then 1.18 s on two fetches (25 Nov warm: 0.36–0.40 s, cold first hit 1.65 s); keyword-gap API GET TTFB 2.42 s, POST 1.08 s; /api/mcp 1.28 s; crontab validate 1.18 s. All responses came from US PoPs (cf-ray ORD/LAX/SEA/SJC) — the VM's egress path, not necessarily what a Dhaka visitor sees. OpenSEO's own crawl measured 19–197 ms response times (median 38 ms) across its 50 pages, so the slow TTFB may be this VM's route, not the site.
- **Change:** None until confirmed — re-measure TTFB from a second vantage point (e.g. a Dhaka-side check or a webpagetest run) before treating it as a site defect. If real, the cause to look at is Functions cold start + `max-age=0, must-revalidate` (HTML is never edge-cached).
- **Expected effect:** A confirmed answer instead of a fix for a problem that may be the probe path. See also PERF-F6 (Info).

### L3 — TECH-F4 — robots.txt names AI training bots but not the AI search bots

- **Problem:** Live robots.txt explicitly Allows GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, Bytespider, CCBot, anthropic-ai, FacebookBot, Amazonbot. It does NOT name `OAI-SearchBot` (ChatGPT Search citability) or `Claude-SearchBot` (Claude search citability). Both are covered by `User-agent: * / Allow: /`, so nothing is blocked — the gap is explicitness, not access.
- **Change:** Add explicit `Allow: /` groups for `OAI-SearchBot` and `Claude-SearchBot` (and `Applebot` for Siri/Spotlight) at the next deploy, so a future restrictive edit to `*` cannot silently cut off AI search citability.
- **Expected effect:** Same fix as H7 (GEO-F01), listed once there as High; this entry records the technical side's view of the same gap.

### L4 — TECH-F5 — Sitemap lastmod is still build time, not per-page change time

- **Problem:** Every sub-sitemap `lastmod` is the identical Phase 2 build stamp `2026-11-25T10:30:51.085Z`. The generator stamps `new Date()` at build (25 Nov repo read). Fresh now, but it will go stale again the moment content changes without a rebuild, and it tells crawlers all 58 pages changed at once when they did not.
- **Change:** When the generator is next touched, stamp each URL with its source file's real change time instead of build time. Low priority — crawlers treat lastmod as a hint.
- **Expected effect:** Crawlers can trust lastmod to signal real change. Same flag as 25 Nov, new date.

### L5 — SCH-F4 — HowTo on 41 pages, FAQPage on 51 pages: no rich-result return

- **Problem:** HowTo rich results were removed Sept 2023; FAQ rich results were retired for all sites 7 May 2026 (per seo-schema skill, current Oct 2026). The site carries HowTo on 41 pages and FAQPage on 51 pages. No rich-result benefit comes from either now. The FAQ content is genuine user Q&A and matches visible text (see Info I4), so keep FAQPage; HowTo is listed as deprecated / never recommend, so dropping it is safe and removes 41 dead blocks.
- **Change (optional):** Remove HowTo blocks, or leave them — decide once, apply sitewide. Do not add HowTo or FAQPage to new pages expecting SERP features.
- **Expected effect:** 41 dead blocks removed if the decision is to drop HowTo; no ranking change either way. This is not a ranking defect.

### L6 — SCH-F5 — Sitemap hygiene: 3 identical index variants, uniform lastmod, ignored tags

- **Problem:** `sitemap.xml`, `sitemap_index.xml` and `sitemap-index.xml` are byte-identical (md5 `5fc30ee4efc9fc1f2d931138341eb688`), all three listed in robots.txt alongside the 7 sub-sitemaps (10 `Sitemap:` lines). All 58 URLs carry the identical `lastmod 2026-11-25T10:30:51.085Z`. Every URL also carries `<priority>` and `<changefreq>`; Google ignores both.
- **Change:** Keep one index URL (`sitemap.xml`), drop the other two variants from robots.txt (keep the files or 301 them if anything links to them); emit per-page lastmod from real content-change dates; drop `priority`/`changefreq` on the next generator run.
- **Expected effect:** One index URL instead of three identical ones; cleaner signals to crawlers. Harmless duplication today. Same point as GEO-F10 (Info) from the agentic side.

### L7 — CONT-F08 — Stripe hub body still lists zero spokes; cron hub now does

- **Problem:** Live 26 Nov: Stripe hub links all 9 spokes (sidebar/nav), and cites Stripe docs — but the body content links no spoke, unlike the cron hub which now lists all 25 in the body under "All 25 Cron Schedules". Freelance hub lists all 12 spokes. No orphan pages result (sidebar + mesh cover it), so this is crawl-clarity polish, not a defect.
- **Change:** Add a short "Fee calculators by region" list to the Stripe hub body linking the 9 spokes, mirroring the cron hub pattern.
- **Expected effect:** Same fix as H8 (SXO-F1), listed there as High; this entry records the content side's view of the same gap.
- **Note:** The 26 Nov audit still flags a heading skip on the Stripe hub. The fetched HTML ships a Next.js `notFound` template inside the flight payload containing an h2 "This page could not be found." — that text is not rendered on the live page, so it may be a crawler artifact of parsing the payload rather than a real heading defect. Not confirmed either way; a rendered-DOM heading check would settle it.

### L8 — CONT-F09 — Invoice page keeps "Subtle" as a descriptor (12 occurrences + meta description)

- **Problem:** Title fixed (see "What changed", Row 3), but body copy and the 152-char meta description still say "Generate subtle, beautiful invoices". "Subtle" describes a design taste, not what a searcher types when they need an invoice PDF.
- **Change:** Replace "subtle" with "clean" or "professional" in the meta description and the first two body uses; leave the rest unless the voice is deliberate.
- **Expected effect:** The snippet and opening copy match what a searcher types. Small wording change, one page.

### L9 — PERF-F4 — 4 font files preloaded (70 KB woff2)

- **Problem:** 4 `<link rel="preload" as="font">` tags on the homepage; 40 KB + 3× ~10 KB files.
- **Change:** Confirm all 4 weights are used above the fold; drop the preload (not the font) for any weight that only appears below the fold or on other pages.
- **Expected effect:** Less preload weight on first visit. Fonts are self-hosted and shift-safe (`font-display: swap`, 48 occurrences in the built CSS), so this is polish.

### L10 — PERF-F5 — 2 JS chunks served gzip instead of brotli on some edge hits

- **Problem:** `43uwp46w22kb8.js` and `17bjncdmp88yk.js` returned `Content-Encoding: gzip` on some fetches, brotli on others — per-edge variant, small effect.
- **Change:** Confirm with repeated fetches from one edge; if it repeats, check the Cloudflare compression setting for those paths. Small effect (a few KB); do not chase before H4, M10 and M11.
- **Expected effect:** A few KB saved on those two chunks, if the pattern repeats.

### L11 — VIS-V06 — og:image missing on 3 of 5 pages

- **Problem:** `og:image` present on home and /freelance-rate-calculator (pointing at `https://fasttools.me/og-image.png`, live, 53 KB) but absent on /stripe-fee-calculator, /json-to-typescript, /crontab-generator — while `twitter:card` is still `summary_large_image` on all 5, so link shares on those three pages show no image.
- **Change:** Add the same `og:image` (1200×630) to every tool page; per-tool images later if wanted.
- **Expected effect:** Link shares on the three pages show an image instead of none. One-line fix per page.

### L12 — VIS-V07 — No dark mode

- **Problem:** 0 `dark:` classes in the HTML of any page; every surface uses explicit light colours (`#FFFCF5`, `#F8F5EC`). Users with a dark preference get a bright page.
- **Change:** Later; low priority next to H5/H6.
- **Expected effect:** Users with a dark preference get a matching page. No defect today, a later feature.

### L13 — VIS-V08 — No theme-color meta

- **Problem:** `theme-color` is absent on all 5 pages, so the mobile browser chrome stays the OS default instead of matching the site.
- **Change:** Add `<meta name="theme-color" content="#FFFCF5">` (or `#1B4520`).
- **Expected effect:** Mobile browser chrome matches the site. One line.

### L14 — VIS-V09 — Much UI copy is 9–12px

- **Problem:** `text-[9px]`, `text-[10px]`, `text-[11px]` and `text-xs` (12px) are used across nav labels, chips, search inputs and tool panels (JSON textareas are `text-xs`); the page base is the Tailwind default 16px, but most of what a visitor reads in the tools is 10–12px.
- **Change:** Raise tool-panel body copy and input text to at least `text-sm` (14px); keep 10–11px only for non-essential labels.
- **Expected effect:** Tool copy becomes easier to read, especially on phones.

### L15 — VIS-V10 — No inputmode on numeric inputs

- **Problem:** The Stripe amount input is `type="number"` with no `inputmode` attribute, so mobile users get a generic keyboard instead of a decimal keypad.
- **Change:** Add `inputmode="decimal"` to the Stripe amount input and any other money/number fields.
- **Expected effect:** Mobile users get a decimal keypad on money fields. One attribute per field.

### L16 — GEO-F04 — llms-full.txt is a near-duplicate of llms.txt

- **Problem:** 14,253 B vs 14,166 B; `diff` shows only a changed title ("FastTools Full Context"), a numbered list in place of bullets, and small wording changes. Same links, same facts.
- **Change:** Either give `llms-full.txt` genuinely fuller content (full page text per the llmstxt.org proposal) or delete it and keep one file.
- **Expected effect:** Two near-identical files no longer risk an agent quoting the stale copy after an edit to only one.

### L17 — GEO-F07 — No Markdown delivery, no RSL, no catalog

- **Problem:** `Accept: text/markdown` returns HTML 200 with no `Vary: Accept`; no `.md` sibling URLs (`/index.md` 404); no RSL 1.0 file (`/.well-known/rsl.txt` 404); no `ai-catalog.json` (404). None of these is confirmed to be read by any named consumer agent, and Google ignores llms.txt-style files for Search — so this is optional polish, not a blocker.
- **Change (optional, P1/P2):** Serve Markdown via content negotiation with `Vary: Accept`, or add `rel="alternate" type="text/markdown"` links; add an RSL file only when Sheriff sets a licensing position.
- **Expected effect:** Agents that prefer Markdown get it. Optional; no named consumer is confirmed to read these.

### L18 — GEO-F09 — Citability is good on the homepage, thin on tool pages

- **Problem (for):** Homepage raw HTML carries a "What is FastTools and what can I use it for?" FAQ (7 Q&A in FAQPage JSON-LD), a self-contained definition, 8× `SoftwareApplication` + `ItemList` + `Organization` + `Person` JSON-LD. Stripe page carries a quotable definition ("To calculate Stripe processing fees on standard US domestic cards, multiply the charge by 2.9% and add $0.30… reverse formula: (Target + $0.30) / (1 - 0.029)") plus `HowTo` (4 steps) and `WebApplication` schema.
- **Problem (against):** The Stripe page labels its rates "2026 VERIFIED RATES" with no source link or verification date shown in the fetched text; no tool page cites an external source for its rates or formulas; no author byline or publish/update date is visible in the fetched page text on tool pages. Brand-mention signals (Wikipedia, Reddit, YouTube, LinkedIn) were not measured in this audit — no tool was available — so no claim is made about them either way.
- **Change:** Add a "Rates as of <date>, source: stripe.com/pricing" line with a link on each Stripe spoke page, and a visible last-updated date on tool pages. Keep the quotable formula sentences — they are the strongest citable asset on the site.
- **Expected effect:** Tool pages become citable with a date and a source, like the homepage already is. Same family as M4 (CONT-F03) and M22 (SXO-F5).

### L19 — SXO-F6 — Freelance hub puts a duplicate H2 before the tool inputs

- **Problem:** On /freelance-rate-calculator the first H2 sits at byte ~550 in `<main>` and the first input at ~1295; the H2 text repeats the H1 ("Freelance Rate Calculator & Billable Hours Math"). 6 of 7 hubs checked put the first input before the first H2.
- **Change:** Move the tool block above that H2 or drop the duplicate H2.
- **Expected effect:** The tool comes first on the freelance hub, as it does on the other six hubs.

### L20 — SXO-F7 — Homepage still gives json-to-zod one fewer link than every other hub

- **Problem:** Homepage anchors: json-to-zod 2, json-to-typescript 3 (the third is a "JSON → TS" chip). Schema and FAQ counts are now correct (8).
- **Change:** Add a matching "JSON → Zod" chip on the homepage.
- **Expected effect:** json-to-zod gets the same three homepage links as every other hub. Residual from 25 Nov Row 2.

### L21 — SXO-F8 — Mild query overlap on reverse netting and invoice wording (watch)

- **Problem:** Stripe hub H1/title covers "Reverse Invoice Netting" while /stripe-fee-calculator/reverse is the dedicated reverse page; /invoice-generator and /freelance-rate-calculator/invoice-generator share the "invoice generator" phrase with different intents (PDF maker vs netting calculator).
- **Change:** None now. Watch GSC for which page Google picks for "reverse stripe fee" and "invoice generator" queries before changing titles.
- **Expected effect:** No change made on a guess; the watch item is recorded so the next audit can act on real query data. Fresh GSC data (see the GSC section above) shows the site-wide collapse is still in force, so watch for any recovery during the December core update.

## Findings — Info (7)

### I1 — TECH-F6 — OpenSEO missed a different set of spokes this run (crawl-order variance, not a site defect)

- The 26 Nov audit crawled 50/50 (page-limit stop, same as 25 Nov) but the 8 sitemap URLs it missed are all freelance spokes this time (billable-hours, consultant, copywriter, day-rate, invoice-generator, retainer, take-home-pay, video-editor); on 25 Nov it missed 8 cron spokes. All 58 sitemap URLs were verified to return 200 at their sitemap URL (parallel curl, zero non-200, zero redirects).
- Fix: none on the site. For future audits, raise the page limit or add a robots.txt group for the OpenSEO-Audit user agent that disallows the noindex client pages, so the limit goes to real pages.

### I2 — TECH-F7 — Homepage bare vs slash both serve 200 (pre-existing, canonical covers it)

- `https://fasttools.me` and `https://fasttools.me/` both return 200; canonical on both is `https://fasttools.me` (no slash). Trailing-slash tool URLs behave correctly: `/stripe-fee-calculator/` → 308 to the slashless URL in one hop.
- Fix: none required; a 301 from the slash variant to the bare URL would remove the duplicate serving, but the canonical already consolidates it. Leave unless a host-consolidation pass is done anyway.

### I3 — SCH-F6 — Vocabulary is WebApplication / SoftwareApplication, not schema.org Tool

- Full census type counts — WebApplication 53, SoftwareApplication 8 (homepage only), BreadcrumbList 56, FAQPage 51, WebSite 44, Organization 44, Person 42, WebPage 42, HowTo 41, AboutPage 1, ItemList 1. No `Tool` type anywhere; no Microdata (`itemscope`) or RDFa (`typeof`) anywhere; all blocks carry `@context https://schema.org`; no relative URLs inside JSON-LD.
- This matches the 25 Nov finding and is correct as-is. No fix.

### I4 — SCH-F7 — FAQPage content matches visible text on all 51 pages

- Every FAQPage question and the first 100 chars of every answer appear verbatim in the page's visible text (entity-unescaped check across the full census; 0 mismatches). Homepage: 7/7 questions, 7/7 answers.
- No hidden-content / markup mismatch risk. No fix. This is a pass, recorded here so the record is complete.

### I5 — PERF-F6 — Fresh-connection TTFB is dominated by TLS on this probe path

- TLS handshake 0.3–1.4 s per fresh curl connection; server-side TTFB after TLS is 0.25–0.63 s. curl here is HTTP/1.1; browsers get H2/H3.
- Fix: none for the site. Re-measure from a real browser / RUM before treating fresh-connection TTFB as a user-facing problem. See also L2 (TECH-F3).

### I6 — GEO-F10 — robots.txt lists 10 sitemap URLs; only 8 distinct files exist

- robots.txt lists `sitemap.xml`, `sitemap_index.xml`, `sitemap-index.xml`, plus 7 sub-sitemaps. `sitemap.xml` is itself the index (7 sub-sitemaps, lastmod 2026-11-25). `sitemap_index.xml` and `sitemap-index.xml` both return 200 with the same 1,013 B body as `sitemap.xml` — duplicate index URLs. Sub-sitemap counts verified live: main 5, stripe 10, cron 26, json 2, freelance 13, banking 1, seo 1 = 58 URLs.
- Fix: list only `sitemap.xml` in robots.txt and drop the duplicate index aliases. Same point as L6 (SCH-F5).

### I7 — VIS-V11 — Tablet breakpoint barely used (verify in browser)

- `md:` classes appear only 2–6 times per page (home 2, Stripe 2, JSON 6, Crontab 5, Freelance 2), while `sm:` appears 28–100 times and `lg:` 6–12 times. The layout jumps from `sm` straight to `lg` in most places. The CSS does define the full breakpoint set (40/48/64/80/96rem), so this is a markup gap, not a missing breakpoint.
- Fix: check the 768px layout in a real browser; add `md:` steps where columns or the tool grid jump awkwardly. Cannot be confirmed from markup alone — no rendered view was possible in this audit.

## Backlinks — no score (insufficient data)

- Common Crawl is the only third-party source attempted and it returned no data: `commoncrawl_graph.py fasttools.me` timed out twice (120 s, then 170 s, empty output). Per the backlinks skill, no numeric score is given; all Common Crawl-dependent values read "Not Assessed".
- Counts below are the team's own verified links, not a crawl of the web. Not measured: third-party backlink counts, DA/PA, spam score, competitor link profiles, link velocity over time — no tool with access exists here (OpenSEO credits 0, no Moz/Bing keys).
- Verified dofollow links: 64 (agent-reported: 49 as of 25 Nov + 15 from the 26 Nov freelance piece, 5 dofollow platforms × 3 links). Verified nofollow placements: 12 (agent-reported: 9 as of 25 Nov + 3 Hashnode, 26 Nov piece).
- Independent dofollow links: 1 (Viberank, live-verified 26 Nov, 200). Self-published dofollow links: 63 of 64. Referring domains (independent): 1. Referring domains (self-published platforms): 7 (DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit, Bear Blog).
- Live link sample, 12 URLs checked 26 Nov: 11 live, 1 gone by design (DevTo -38c4, 404 — duplicate removed 25 Nov on Sheriff's approval; equity now sits on -4j78). Sample totals: 34 link instances to fasttools.me, 31 dofollow, 3 nofollow (Hashnode). Zero lost links in the sample.
- Anchor text in the sample (34 instances): descriptive / tool-named 27 (79%), branded / domain-paired 7 (21%), bare "FastTools" brand anchor 0, exact-match keyword stuffing 0. No over-optimisation signal. Zero bare "FastTools" anchors is correct — it collides with Yokogawa FAST/TOOLS and fasttools.store.
- Toxic / spam signals: none found in the sample. No PBN domains, no link farms, no paid footer/sidebar pattern, no mass directory batch, no deindexed source. No disavow candidates. No disavow file needed.
- Link targets: homepage 1 (Viberank only); Stripe family 16 instances; freelance family 9; cron family 4; invoice, JSON→TypeScript / JSON→Zod, bank-statement, keyword-gap 0 each. Stripe subpages hold 1,710 GSC impressions, 0 clicks (25 Nov, agent-reported); cron long-tail spokes at positions 1–10 in GSC, 0 clicks (25 Nov GSC, agent-reported).
- npm/GitHub READMEs: `posix-cron-parser` (6 distinct fasttools.me URLs) and `stripe-fee-math` (8 distinct URLs; README text re-checked 26 Nov via registry — 10 fasttools.me occurrences). Rendered-HTML nofollow verified 25 Nov. Self-published repos: discovery value only, no PageRank.
- New links: 26 Nov freelance piece — 15 dofollow + 3 nofollow instances across 6 platforms (agent-reported; DevTo -36le re-verified live today). Lost links: none except the deliberate -38c4 removal. Velocity tracking: not possible with free sources; point-in-time only.
- Findings: H10 (only 1 independent dofollow link), H11 (concentration on 7 self-owned platforms), H12 (4 of 8 tools with zero links), M23 (WordPress/Kit self-canonical), M24 (Hashnode nofollow + canonical policy), and one closed item — the duplicate DevTo copy -38c4 (BACK-F6, closed; keep the duplicate check — slug search by title slug — before every publish).

## OpenSEO audit reconciliation

- Audit 1c7f1650-7152-471a-a82f-4356fc80735e, project d6811103-fc11-4300-bc4b-fa08c690dae4: completed 26 Nov 2026 10:27 UTC (started 10:26:26, 52 s), 50/50 pages, crawl stopped early at the free-plan page limit (`crawl-page-limit`), Lighthouse off (0/0).
- Issues: 12 across 2 types (25 Nov audit 14a896bb: 22 across 5 types).
  - Warning: page limit — 1 page (homepage record; 50 crawled, 11 not crawled).
  - Info: heading levels skip — 11 pages: keyword-gap-analyzer, stripe hub, stripe/australia, canada, eu + 6 more (full list in the dashboard; the homepage and invoice page are no longer flagged).
- Gone since 25 Nov: title too long (4 pages), meta description too long (4), meta description too short (1) — all fixed by the Phase 2 metadata pass. Heading skips fell 12 → 11.
- Agreement: live checks confirm zero broken links, zero missing canonicals, zero noindex conflicts, zero non-200 sitemap URLs, exactly 1 H1 on all 50 crawled pages, all 50 indexable, zero images missing alt (0 images counted — the site's pages carry no `<img>` in the crawled HTML; og-image is a meta asset).
- Correction: the audit's 11 "not crawled" are not dead or blocked pages — 8 are live freelance spokes (see I1) and the rest are the noindex client pages + a host variant. Cause is the 50-page cap plus crawl order, not a site defect.
- Thinnest pages by OpenSEO whole-page word count: terms 489, privacy-policy 537, about 693, keyword-gap-analyzer 783, stripe/canada 1,173. No page under 300 words.
- Sitemap census (live, 26 Nov): 58 URLs across 7 sub-sitemaps (main 5, stripe 10, cron 26, json 2, freelance 13, banking 1, seo 1), 0 duplicates, 0 cross-host URLs, all 58 return 200 with self-canonical. All 58 are linked from at least one page; zero live HTML paths linked that are missing from the sitemap. /contact, /sitemap, /blog, /tools, /search all 404 (correct — no hidden live pages found).
- IndexNow: key file `https://fasttools.me/e5b8d27a1c9440f3b892ec674d8102a9.txt` returns 200; key also declared in layout metadata (25 Nov repo read). No submission log exists in this VM to confirm any URL was ever submitted — treat IndexNow as "configured, use unverified".
- Security (live homepage headers): `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (meets preload header requirements), `content-security-policy` present (but allows `'unsafe-inline'` + `'unsafe-eval'` in script-src — broad, worth tightening only if the app allows it), `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`, `Server: cloudflare`. HTTPS enforced on all variants. No mixed-content signal in raw HTML. TLS certificate not re-checked in this pass (Cloudflare edge cert; no expiry warning surfaced in any fetch). Re-check at next audit.
- JS rendering: not measured. The claude-seo render CLI is not set up in this VM (no venv, no Chromium). Raw HTML carries full titles, meta, canonicals, JSON-LD and main content in the initial HTML on every sampled page, so content is server-rendered, not JS-dependent. Rendered-vs-raw comparison was not done — treat any rendering claim as "not measured".
- Core Web Vitals / Mobile: not measured. No Lighthouse run (OpenSEO Lighthouse off in this audit), no CrUX/PSI data pulled. OpenSEO response times 19–197 ms (median 38 ms) are crawler fetch times, not CWV. Homepage raw HTML 157,713 B — inside Googlebot's 2 MB HTML fetch cap. Do not quote CWV numbers for this site from this audit.

## What to do next

1. Fix the freelance numbers to agree with each other (H2 + H3, one page, copy only).
2. Record the deploy-model decision before any build-mode change (H1), and set a short HTML cache rule (H4).
3. Add the Stripe spoke list to the hub body (H8) and start the /guides/ hub with the freelance rate-math guide (H9).
4. Submit MicroLaunch free and point the next parasite round at the 4 link-less tools (H10, H12).
5. Add the named AI search-bot Allow groups to robots.txt (H7) and fix input labels (H6) and button sizes (H5).
6. Check GSC Security & Manual Actions in the UI for a manual action, and watch for recovery during the December core update (started 24 Nov). The 12 November collapse persists — 22 impressions in 13 days against 2,891 before — and the November 2026 core update is the best fit on timing at medium-low confidence. See the GSC section above.

## How this report was made

Generated by the <a href="https://openseo.so/docs/skills/seo-audit" target="_blank" rel="noopener">OpenSEO SEO Audit skill</a>, run by Mikey's audit team on November 26, 2026.

- **Tools:** OpenSEO audit 1c7f1650-7152-471a-a82f-4356fc80735e (50/50 pages, free-plan cap), OpenSEO audit 14a896bb from 25 Nov for comparison, live curl + Python checks on 26 Nov 2026 ~10:26–10:35 UTC, and the 25 Nov audit files (`~/workspace/mikey-team/seo-audit-2026-11-25/` — report-draft.html and opportunities.md).
- **Verified:** Every live URL, title, description, canonical, heading, JSON-LD block, header and link cited here was checked against the live site on 26 Nov by one of eight specialist passes (technical, content, schema + sitemap, performance, visual, GEO + agentic, SXO + cluster, backlinks). The 25 Nov items were each re-checked live and given a status (fixed / still open / improved / not re-verified) in the "What changed" table.
- **Limits:** Fresh Search Console numbers are in this report (see the GSC section above: 2,891 impressions 26 Oct–11 Nov, 22 impressions 12–24 Nov, collapse persists). Common Crawl returned no data for fasttools.me, so no backlinks score is given. No Lighthouse, CrUX/PSI, rendered-DOM, or live AI-citation checks were possible (no Chromium, no PSI key, OpenSEO credits 0). TTFB and tap-target figures are probe/estimate figures from this VM's network path and Tailwind classes, not measured user data. OpenSEO credits = 0, so no paid keyword volumes or ranked-keyword data were used.
- **Sources:** the 8 findings files in `~/workspace/mikey-team/fasttools-audit/findings/` (technical.md, content.md, schema-sitemap.md, performance.md, visual.md, geo-agentic.md, sxo-cluster.md, backlinks.md), the 25 Nov audit report-draft.html and opportunities.md, and OpenSEO audit 1c7f1650-7152-471a-a82f-4356fc80735e.

---
*Prepared with OpenSEO. Data as of November 26, 2026.*
