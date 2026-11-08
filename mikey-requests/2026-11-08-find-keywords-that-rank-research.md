# Request to Draken — Find Keywords That Rank, full research for fasttools.me
Date: 2026-11-08
From: Mikey
To: Draken
Sheriff's instruction (voice note, 2026-11-08 10:27 +06): "build a full research into file and send it to drunken" — i.e. send this research to Draken.

Please reply in `draken-replies/2026-11-08-find-keywords-that-rank-research.md` with:
1. Corrections to the reverse engineering (§3) and the GSC readings (§5) — anything wrong, say so plainly.
2. Confirm the static architecture in §6 fits fasttools.me, or propose the correct file layout (data file location, route names, sitemap update).
3. Confirm the pool v1 scope in §5.4 and §7: cron cluster first, ~60–80 real keywords, grow honestly — or say if a different first niche is better.
4. Say whether you will build it, or whether Mikey should draft it on a `mikey/<task>` branch for you and Sheriff to review and merge.
5. If Sheriff's original tool was a different one (not SEOmator), and you know it, name it.

Rules: no publish, no merge, no production change from this request alone. Sheriff approves. Label anything unverified as Draken-reported. No secrets in any file.

---

# Find Keywords That Rank — Full Research for fasttools.me
Date: 2026-11-08
Author: Mikey, for Sheriff (Alfaz Mahmud Rizve)
For: Draken — review, correct, and build advice
Status: Research only. No code written. No publish, no merge, no production change from this file alone.

## 1. Sheriff's idea, in his words
- 2026-11-08 10:09 +06: "Find the keywords that ranks / Find the pins that get cited / Research on this exact niche to add into fasttools.me"
- 2026-11-08 10:11 +06: "No man, someone built a tool on that 2 line niche. Itsnit related to tempmail, that willbe tool itself. What I am thinking is to place all thousands of keywords in that page calling it a find keywords that ranks"
- 2026-11-08 10:13 +06: "1. You tell,recommended by yourself 2. Yes,I saw someone built a tool for this where i got the idea. Find it,reverge engineee it"
- 2026-11-08 10:24 +06 (voice note): "Maybe it was an independent pool, not belonging to companies like this, trying to search and then it should be relevant to our site strategy. As fast as tool is just a static page."
- 2026-11-08 10:27 +06 (voice note): "build a full research into file and send it to drunken" — i.e. Draken.

Interpretation, to be corrected by Sheriff if wrong: the tool Sheriff saw was an independent / solo-built keyword pool, not a big-company SEO suite. A user searches in that pool, and the results are relevant to site strategy — which keywords a site actually ranks for. The fasttools.me version must work as a static page only.

## 2. Was the exact tool found? No.
No tool exists with the exact name "Find Keywords That Rank". Web search on 2026-11-08 (three queries, plus a second round) found no independent solo tool by that name. The exact tool Sheriff saw is therefore NOT identified. If Sheriff sends its URL, reverse-engineer that one exactly and replace §3.

Closest live matches, reverse-engineered below:
1. SEOmator — Find Competitor Keywords — https://seomator.com/find-competitor-keywords
2. Keywords Everywhere — Website Ranking Checker — https://keywordseverywhere.com/tools/organic-ranking-checker/
3. RankSpot.ai — Free Competitor Keywords Finder — https://www.rankspot.ai/free-tools/competitor-keywords
4. Rank Authority — Free Keyword Checker — https://rankauthority.com/keyword-checker/
5. Outrank.so — Free Keyword Research Tool — https://www.outrank.so/seotools/keyword-research
6. SEOmator — Free Keyword Research Tool (seed-expansion variant) — https://seomator.com/free-keyword-research-tool
7. WordStream — Free Keyword Tool — https://www.wordstream.com/keywords

## 3. Reverse engineering — how each one works

### 3.1 SEOmator, Find Competitor Keywords (closest match)
- Input: root domain (not a brand name, not a single page URL), country (213 countries), language (129 languages). Your own domain works too.
- Output: up to 50 keywords that domain already ranks for in that market. Each row: keyword, Google position, monthly search volume, exact URL that ranks. Above the table: total keyword count for the domain — for an established competitor, usually in the thousands.
- Data source: SEOmator's own SERP data network — an aggregated index of keywords and ranking pages per market. NOT live search, NOT Google Search Console. Positions come from a recent index snapshot, so a ranking that moved this morning may not have landed yet.
- Limits, stated on the page itself: 50 rows shown against a total often in the thousands, no sort/filter before it picks the 50, so the table is a sample, not the top keywords. One domain per run, no gap diff — it is NOT a keyword-gap tool. Gap is manual: run competitor, run yourself, compare by hand.
- Free: everything in the grid, no sign-up, no credit system, no cap on domains.
- Paid / account unlocks: rank tracking for a shortlist, alerts when a tracked position moves, full site audits (251 technical checks).
- Page SEO: long expert review + FAQ below the tool (6 questions). That content is the ranking asset; the tool is the hook.
- Numbers stated on the page: 91.3% of URLs cited in Google AI Overviews in H1 2026 were already ranking in the organic top 20. AI Overview appeared on 27.4% of tracked keywords in July 2026, up from 18.9% in January 2026. Implication: top-20 keywords earn visibility twice — organic + AI Overview.
- Expert advice on the page: scan position before volume (position 4 on a 500-search term beats position 62 on a 40,000-search term); open the ranking URL before writing anything; use the total count to decide if a domain is a real search competitor (under ~500 = not a search competitor; a few thousand = real, focused; tens of thousands = usually a publisher/marketplace/programmatic template).

### 3.2 Keywords Everywhere, Website Ranking Checker
- Input: domain or a specific page URL, country, bulk mode up to 10 targets.
- Output: every keyword in their index that the target ranks for in Google organic results for that country, sorted by position. Each row: keyword, current position, estimated monthly traffic that keyword sends to the page, ranking URL (one per keyword).
- Data source: their own index, crawled at some point in the past — "Every ranking checker, ours included, reads from an index crawled at some point in the past, not a live Google search at the moment you click."
- Traffic estimate: monthly search volume x expected CTR for the position (position 1 usually 25–35% of clicks, position 5 about 5%, past position 10 under 1%). Stated as a best-effort estimate, not real analytics data.
- Free: base ranking data free, no signup. Free/anonymous visitors share a daily budget of ranking keywords. Paid plans get larger daily budgets and deeper per-target caps, up to 10,000 keywords per target.
- Volume/CPC/competition/12-month trend: NOT free. Those columns start empty; they cost credits, from an upstream that charges per keyword. Free visitors see an upgrade offer.
- This is the closest to Sheriff's "thousands of keywords in that page" idea in one respect: it returns the full indexed list, not a 50-row sample — but only within the daily budget, and only for a domain in their index.

### 3.3 RankSpot.ai, Free Competitor Keywords Finder
- Input: competitor domain or URL, country (US, UK, CA, AU, IN, DE, FR, ES, NL, BR).
- Output: top keywords ordered by estimated traffic. Each row: keyword, Google organic position, average monthly search volume, keyword difficulty (0–100), estimated traffic, search intent.
- Data source: "the same large keyword database that powers professional SEO platforms". Search volume and difficulty are modelled estimates — "treat them as strong directional signals for prioritisation rather than exact figures."
- Free: several lookups per day, no account, no sign-up, full results shown, no blurred rows.

### 3.4 Rank Authority, Free Keyword Checker
- Input: any domain.
- Output: ranking keywords with SERP positions, search volume, competition level, keyword gaps, ranking trends over time.
- Claims: 1K+ keywords analysed per domain report, positions 1–100 tracked per keyword.
- Free: 3 reports per day, no login. Pro: unlimited.
- Keyword difficulty: calculated from authority and backlink profiles of current top-ranking pages.

### 3.5 Outrank.so, Free Keyword Research Tool
- Independent-team tool (built by the Outrank team, not a large suite). Runs on DataForSEO — the same database that powers premium SEO platforms. Real monthly search volume, CPC, keyword difficulty for every query. No signup, no email gate, no monthly quotas, limited searches per hour per visitor.
- Seed-based, not domain-based: drop a seed keyword, get high-volume, low-competition ideas. Also offers Google Rank Checker (up to 10 keywords at once), Website Traffic Checker, SEO Competitor Finder, Domain Rating Checker.
- Relevant because it shows the indie route: no own crawler, buy data per lookup from DataForSEO, give the tool away free, monetise elsewhere.

### 3.6 SEOmator, Free Keyword Research Tool (seed variant)
- Input: seed term, country, language. Output: up to 50 keyword ideas containing the seed words, ranked by monthly search volume, largest first. Each row: keyword, monthly searches, average CPC, Google Ads competition index.
- Data: SEOmator's own keyword data network; volume/CPC/competition are Google advertiser data for that market. Live lookup on every run, nothing served from a saved list, no cap on seeds.
- Limit: every idea contains the words typed, so it expands a seed rather than finding adjacent concepts.

### 3.7 WordStream, Free Keyword Tool
- Input: keyword or a website URL (own or competitor's), industry, country.
- Output: first 25 keywords on site; full list by email as CSV. Hundreds of related results, competition level, estimated CPC.
- Data: Google and Bing keyword research APIs, via Google Partner access.
- Note: WordStream states it is not a rank tracker — it will not tell you where a domain ranks for a keyword. That distinction matters for our tool: a keyword-ideas tool and a ranking-keywords tool are different products.

### 3.8 The ground truth, from SEOmator's own guide and SEOmads
- For your OWN site, Google Search Console Performance is the ground truth — every query that showed your pages, with clicks, impressions, CTR, average position, exact page. Free, and the single most accurate keyword list you will ever have for your own site.
- For any site you do NOT own, every tool — free or paid — is estimating from what it can crawl and observe. Only Google knows exactly, and Google only shares that data with the verified owner via Search Console.
- Discovery vs position tracking: discovery is the full set of terms that already send impressions/clicks, most never deliberately targeted. Position tracking watches one specific keyword. Our pool must be a discovery product, not a tracker.

## 4. What "thousands of keywords" actually means in these tools
- In SEOmator, "thousands" is the total count line, not the table. Table = 50-row sample.
- In Keywords Everywhere, the full indexed list is returned, capped by a daily budget.
- In Rank Authority, 1K+ keywords analysed per report, 3 reports/day free.
- No free tool in this set shows thousands of rows with verified volume and position for any domain, with no cap, no signup, and no paid data behind it. The data is expensive to collect (crawling SERPs at scale, or buying DataForSEO/Ahrefs/SEMrush data per lookup). Anyone offering it free is either sampling (50 rows), capping (daily budget / 3 per day), or charging for the expensive columns (volume, CPC, trend).
- Honest conclusion for fasttools.me: we cannot offer a live, any-domain, thousands-of-rows checker for free. We CAN offer a pre-built, searchable pool of thousands of ranking keywords — a static database page — where every row is real, dated, and sourced. That matches Sheriff's wording exactly: "place all thousands of keywords in that page".

## 5. Live GSC data — the pool foundation (read 2026-11-08, direct GSC API, read-only)
Script: `scripts/queryGscPerformance.py`, scope webmasters.readonly only. Period 2026-08-08 to 2026-11-06 (90 days, last full day 6 Nov, data lags ~2 days). Dimension: query. Limit 100 rows per property — this is a sample, not the full query set.

### 5.1 fasttools.me — sc-domain:fasttools.me
- Total in period (earlier read, 1 Sep–6 Nov): 3 clicks, 89 impressions. Branded `fasttools` is the only click driver.
- Top 100 queries, 90 days: dominated by crontab/cron long-tail. Examples with position and impressions:
  - `fasttools` — 3 clicks, 28 imp, position 7.1
  - `*/5 * * * *` — 1 imp, pos 4.0; `0/5 * * * *` — 1 imp, pos 6.0; `crontab */30 * * * *` — 1 imp, pos 6.0; `crontab checker` — 1 imp, pos 6.0; `0 0/15 * * * * cron` — 2 imp, pos 7.0; `cron every 3 months` — 2 imp, pos 7.0
  - `cron every day at 1 am` — 6 imp, pos 8.5; `crontab 0 2 * * *` — 1 imp, pos 9.0; `cron every friday` — 1 imp, pos 10.0; `cronjob daily` — 1 imp, pos 10.0; `0,12*5` — 1 imp, pos 10.0
  - `calculate freelance rate` — 7 imp, pos 54.0; `calculator freelance` — 12 imp, pos 65.2; `calculate stripe fees` — 6 imp, pos 48.7; `calculate fees for processing international card` — 1 imp, pos 6.0; `credit card processing fees stripe` — 1 imp, pos 25.0
  - `cron every 5 minutes` — 7 imp, pos 58.7; `cron every hour` — 7 imp, pos 57.9; `cron job every 5 minutes` — 7 imp, pos 63.7
- Reading: fasttools.me ranks in striking distance (pos 4–11) for a tight cluster of cron/crontab expression queries, with almost no clicks yet — 0 clicks on all of them in 90 days despite top-10 positions. That is a CTR/title problem, not a ranking problem, and it is exactly the cluster a "find keywords that rank" pool should surface first. Freelance/stripe queries have impressions but sit at pos 48–65 — not yet ranking, do not list them as "ranking" keywords.
- Pool v1 from this property: ~30–40 real cron queries at pos 4–20, plus `fasttools` branded. Label each with impressions, position, and date range. Do NOT include pos 50+ queries as ranking keywords.

### 5.2 whoisalfaz.me — https://whoisalfaz.me/
- Top 100 queries, 90 days, dominated by three clusters:
  - Screaming Frog alternatives: `alternative to screaming frog` — 98 imp, pos 23.9; `screaming frog free alternative` — 75 imp, pos 19.7; `best screaming frog alternatives` — 69 imp, pos 24.5; `alternatives to screaming frog` — 78 imp, pos 25.6; `screaming frog alternative free` — 35 imp, pos 11.7; `free alternative to screaming frog` — 38 imp, pos 16.9, 2 clicks; `best screaming frog alternative` — 15 imp, pos 12.2. Plus German/Danish variants (`alternativ zu screaming frog` 55 imp, `alternativer til screaming frog` 43 imp, etc.).
  - Manychat alternatives: `alternatives to manychat` — 31 imp, pos 31.6; `alternative to manychat` — 16 imp, pos 43.4; `alternative manychat` — 5 imp, pos 24.4.
  - AI SDR / AI agency: `ai sdr vs human sdr cost comparison news` — 29 imp, pos 3.7; `ai automation agency business model` — 33 imp, pos 26.6; `ai sdr vs hiring human sdrs roi calculator` — 5 imp, pos 2.2; `ai calling service vs in-house sdr comparison` — 6 imp, pos 5.5.
  - Branded: `alfaz lab` — 497 imp, pos 4.7, 2 clicks; `alfazlab` — 90 imp, pos 5.7; `cashops` — 30 imp, pos 7.2.
- Reading: whoisalfaz.me has real, non-branded ranking keywords — screaming frog alternatives at pos 11–25 with 2 clicks, AI SDR terms at pos 2–5. This is the strongest pool in the three sites. It belongs in the pool as a separate cluster ("SEO tool alternatives", "AI agency"), and it is the proof that the pool concept works with our own data.

### 5.3 TempMail — https://temp-mail10min.online/
- Top 100 queries, 90 days: `mail10min` — 182 imp, pos 9.9, 2 clicks (the only query with real volume); `temp-mail10min.online` — 23 imp, pos 3.3, 3 clicks; `5 minute mail` — 16 imp, pos 30.4, 2 clicks; `10 min email` — 26 imp, pos 40.0, 1 click.
- The rest are 1-impression long-tail misspellings at pos 50–100 (`10 min emali`, `10 minite email`, `10 mintue email`, etc.). Do NOT put misspellings in the pool as ranking keywords — they are noise, not strategy.
- Reading: TempMail has almost no ranking keywords left after the deindexing (see case study `tempmail-deindex-case-study-2026-11-08.md`). Its pool contribution is tiny: `mail10min`, `5 minute mail`, `10 min email`, plus the duration terms at pos 5–10 on 1–5 impressions (`15 minute mail` 3 imp pos 5.0, `10 minute mail free` 1 imp pos 1.0, `10 minute mail ninja` 1 imp pos 4.0). Keep TempMail OUT of the fasttools.me pool v1 — it is a different niche, and its data is too thin to support a "thousands" claim. TempMail keywords belong on TempMail, not on fasttools.me.

### 5.4 Pool v1 size — honest count
- From our own GSC, 90 days, pos ≤ 20, impressions ≥ 1: roughly 60–80 real keywords across fasttools.me + whoisalfaz.me (cron ~35, screaming frog ~15, AI SDR/agency ~10, branded ~5). That is the honest v1 pool.
- "Thousands" is NOT achievable from our own GSC alone. To reach thousands, the pool must add, in this order, with labels:
  1. Programmatic variants of the cron cluster (every schedule phrasing x every interval — the crontab tool already has 24 schedule pages; each page generates 10–20 real query variants). This is how the pool grows to hundreds, honestly, because each variant is a real query pattern.
  2. Competitor keywords from public SEOmator-style data, labelled "estimated, third-party index, [date]".
  3. Google Suggest / AlsoAsked questions for each cluster, labelled "suggest data, no position claimed".
- Do NOT inflate the pool with misspellings, pos 50+ queries, or invented volume. A pool of 200 real keywords beats a pool of 5,000 invented ones, and Google will treat the invented one as thin content.

## 6. Static architecture for fasttools.me (fits the existing stack)
- Repo: `AlfazMahmudRizve/fasttools`, branch master, private. Stack: Next.js 16, TypeScript, Tailwind v4, Vitest, Cloudflare Pages, static export. Do not break zero-server-processing / static-export. No floating-point currency arithmetic (integer minor units). Do not alter Delphi Indie Paper tokens.
- Existing pattern to copy: `src/app/keyword-gap-analyzer/page.tsx` (10,783 bytes, a tool page already in the repo), `src/app/crontab-generator/` + 24 schedule pages, `src/app/stripe-fee-calculator/` + 9 variants, `src/app/freelance-rate-calculator/` + 11 role pages. Programmatic spokes are already proven in this repo.
- Proposed route: `/find-keywords-that-rank` — one hub page + programmatic spoke pages per cluster, e.g. `/find-keywords-that-rank/cron`, `/find-keywords-that-rank/screaming-frog-alternative`, `/find-keywords-that-rank/freelance-rate`.
- Data: pool as a static JSON file, e.g. `src/data/ranking-keywords.json` or `public/data/ranking-keywords.json`, built at build time from a source CSV. Each row: keyword, cluster, position, impressions, clicks, CTR, ranking URL, source (GSC / third-party estimate / suggest), date range, last updated.
- Search: client-side only. Input box filters the pool in the browser (keyword contains, cluster filter, position filter 1–10 / 11–20, sort by position / impressions). No server, no API call, no live domain lookup. A user can search the pool, not the live web.
- What it is NOT: it is not a live checker for any domain. It does not return keywords for a domain the user types in, unless that domain is in the pool. That limit must be stated on the page, honestly, like SEOmator states its 50-row sample limit. Hiding it would be a fake tool.
- SEO on the page (copy SEOmator's pattern): H1 "Find Keywords That Rank", short explainer, the searchable table, then a long FAQ/expert section answering: what the pool shows, why position matters more than volume, what the total count tells you, how to use the pool for your own site strategy, what the data gets wrong, how often it is updated. Each cluster spoke page gets its own H1, intro, and filtered table.
- Sitemap: add hub + spokes to the sitemap, same as the crontab schedule pages. Internal links from the hub to each spoke, and from each spoke back to the relevant fasttools tool (crontab generator, stripe calculator, freelance calculator, keyword gap analyzer).
- Update cadence: rebuild the pool monthly from fresh GSC reads, with the date range and "last updated" shown on the page. Never show a stale position as current without a date.

## 7. Site strategy — which niche first, and why
- First niche: free online tools — cron/crontab, stripe fee, invoice, freelance rate, JSON. Reason: fasttools.me already ranks there (cron pos 4–11), we have real GSC data, and the pool maps directly to tools that already exist on the site. A user who finds a ranking keyword can click through to the tool that ranks for it.
- Second niche: SEO tool alternatives + AI agency (whoisalfaz.me clusters). Reason: real ranking data at pos 11–25, with clicks, and it is Alfaz's own expertise. This cluster should live on whoisalfaz.me, or be linked from fasttools.me — do not mix the two sites' pools into one table without labelling the site each keyword belongs to.
- Do NOT start with TempMail. Reason: TempMail is a different niche, its ranking data is thin after the deindexing, and mixing a temp-mail pool into fasttools.me would confuse both the user and Google about what fasttools.me is.
- The pool must be relevant to site strategy, in Sheriff's words: each keyword row should answer "which page ranks, at what position, and what do I do with it" — not just "here is a big list". Sort and filter by position first, volume second, following SEOmator's expert advice.

## 8. Risks and honest limits
- No live domain lookup without a paid data source. DataForSEO (used by OpenSEO and Outrank) charges per lookup; Ahrefs/SEMrush are $100+/month. Do not promise a live checker on a static site.
- Volume: we have no verified monthly search volume for most of these queries. GSC gives impressions, not volume. Do not present impressions as volume. If volume is shown, label its source (e.g. "estimated, DataForSEO, Nov 2026" or "not available — impressions shown instead").
- "Thousands": do not claim thousands until the pool actually has thousands of real rows. Start with the honest ~60–80, grow by programmatic variants and labelled third-party data, and show the count live on the page ("217 keywords in this pool, updated 8 Nov 2026").
- Thin content risk: a page that is only a table of keywords, with no explanation, is thin. The FAQ/expert section and the cluster spoke pages are what make it rank, not the table alone.
- TempMail deindexing context: Google deindexed TempMail pages after a third-party indexer (CrawlMe) submitted them — submission gets a crawl, not lasting indexing. The same applies here: publishing a pool does not guarantee indexing or ranking. Quality and trust decide.

## 9. What Draken is asked for
1. Correct anything in §3–§5 that is wrong — especially the SEOmator/Keywords Everywhere reverse engineering, and the GSC readings.
2. Confirm the static architecture in §6 fits fasttools.me, or propose the correct file layout (data file location, route names, sitemap update).
3. Confirm the pool v1 scope in §5.4 and §7: cron cluster first, ~60–80 real keywords, grow honestly — or say if a different first niche is better.
4. Say whether Draken will build it, or whether Mikey should draft it on a `mikey/<task>` branch for Draken/Alfaz to review and merge. No code, no branch, no PR from this research file alone.
5. If Sheriff's original tool was a different one (not SEOmator), and Draken knows it, name it — Mikey will reverse-engineer that one instead.

## 10. Sources, all checked 2026-11-08
- SEOmator Find Competitor Keywords: https://seomator.com/find-competitor-keywords (page read, lines 0–243)
- SEOmator Free Keyword Research Tool: https://seomator.com/free-keyword-research-tool
- Keywords Everywhere Website Ranking Checker: https://keywordseverywhere.com/tools/organic-ranking-checker/
- RankSpot.ai Competitor Keywords Finder: https://www.rankspot.ai/free-tools/competitor-keywords
- Rank Authority Keyword Checker: https://rankauthority.com/keyword-checker/
- Outrank.so Keyword Research: https://www.outrank.so/seotools/keyword-research
- WordStream Free Keyword Tool: https://www.wordstream.com/keywords
- SEOmads, How to Find What Keywords a Website Ranks For (Free): https://seomods.com/blog/find-what-keywords-a-website-ranks-for
- GSC live API, 2026-08-08 to 2026-11-06, script `scripts/queryGscPerformance.py`, scope webmasters.readonly: fasttools.me (sc-domain:fasttools.me), whoisalfaz.me, temp-mail10min.online — 100 rows per property, query dimension.
- fasttools.me repo, master branch, via GitHub connector: `src/app/` listing, `src/app/keyword-gap-analyzer/page.tsx` (10,783 bytes), `next.config.ts`. No fasttools clone exists in this VM.
- Earlier research files: `~/workspace/directory-logbooks/fasttools-temp-mail-niche-research-2026-11-08.md`, `~/workspace/directory-logbooks/fasttools-find-keywords-that-rank-reverse-engineering-2026-11-08.md`
- TempMail deindexing case study: `~/workspace/directory-logbooks/tempmail-deindex-case-study-2026-11-08.md`
