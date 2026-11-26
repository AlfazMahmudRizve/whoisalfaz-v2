# Deep SEO Audit — whoisalfaz.me — 26 November 2026

- Domain: whoisalfaz.me
- Audit date: 2026-11-26
- Scope: read-only audit. No code, content, or settings were changed.
- Sitemap: 136 URLs — 108 blog posts, 8 category pages, 20 other pages.
- OpenSEO audit: 26f52f47-6891-4aec-914c-e8ea0426d6e3, 50/50 pages crawled, 7 issues.

## Verdict

- SEO Health Score: **69 / 100**.
- The site is crawlable, server-rendered, and clean on redirects, HTTPS, and sitemaps.
- The site is not held back by one defect. It is held back by 21 High findings spread across canonicals, sources, internal links, schema, speed, images, and AI-bot access.
- The strongest area is Technical at 82 / 100.
- The weakest scored areas are On-Page at 61 / 100 and Performance at 62 / 100.
- Backlinks have no numeric score. Common Crawl returned no data for this domain, so no backlink score is given here.
- Search performance (Google Search Console): healthy. 12–24 Nov brought 2,694 impressions at 207.2 per day, up 39.6% per day on 26 Oct–11 Nov, with average position improving 17.8 → 14.7. No dip at or after 12 Nov. See the "Search performance (GSC)" section below.

## SEO Health Score — arithmetic

- Technical: 82 x 0.22 = 18.04
- Content: 64 x 0.23 = 14.72
- On-Page (SXO + Cluster): 61 x 0.20 = 12.20
- Schema: 72 x 0.10 = 7.20
- Performance: 62 x 0.10 = 6.20
- AI Search Readiness (GEO + Agentic): 68 x 0.10 = 6.80
- Images (Visual): 74 x 0.05 = 3.70
- Total: 18.04 + 14.72 + 12.20 + 7.20 + 6.20 + 6.80 + 3.70 = **68.86, rounded to 69 / 100**.

## Category breakdown

| Category | Score | Weight | Weighted points | Main driver |
|---|---|---|---|---|
| Technical | 82 / 100 | 22% | 18.04 | Cross-canonical posts, 404 canonical |
| Content | 64 / 100 | 23% | 14.72 | No sources, no updates, no in-body links |
| On-Page (SXO + Cluster) | 61 / 100 | 20% | 12.20 | 30 orphan posts, no pillar, split n8n posts |
| Schema | 72 / 100 | 10% | 7.20 | Hidden FAQ markup, 4 pages missing from sitemap |
| Performance | 62 / 100 | 10% | 6.20 | Slow and unstable TTFB, 494 KB wire JS on homepage |
| AI Search Readiness | 68 / 100 | 10% | 6.80 | Edge 403 to allowed AI bots, missing sources |
| Images (Visual) | 74 / 100 | 5% | 3.70 | Sanity images bypass optimizer, hero ships invisible |
| Backlinks | No score | — | — | Insufficient data — Common Crawl returned no data |

## Top 5 critical issues

1. **T-H1 — Three distinct blog posts canonicalise to different posts.** Three ~3,000-word posts point at other posts as their canonical. They cannot rank on their own until each gets a self-referencing canonical (or a 301 to the target if consolidation was intended).
2. **S-1 — Blog FAQPage markup describes Q&A that is not visible on the page.** 0 of 4 questions and answers visible on the Brevo and malware posts. FAQ rich results were retired for all sites on 2026-05-07, so this carries policy risk with no SERP benefit.
3. **C-F1 — News posts cite zero external sources.** 9 of 10 sampled posts have 0 in-body external links. The PyPI malware, Cequence, Brevo and Google core-update claims carry no primary-source link.
4. **V-H2 — Hero content ships invisible and depends on JS animation to appear.** Homepage has 33 inline `opacity:0` counts, `/blog/` has 125. If the animation JS fails, the first screen is blank.
5. **P-F1 — TTFB slow and unstable on cache HITs.** `/partners/` 0.70–3.25 s, `/audit/` 1.68–2.08 s, homepage 0.67–1.77 s across runs, all on cache HITs.

## Top 5 quick wins

1. **S-2 — Add the 4 missing URLs to sitemap.xml.** dify-vs-n8n-architecture, the two Pinecone posts, and `/blog/category/ai-lead-generation/`, each with its real lastmod.
2. **T-H1 — Self-canonical the 3 cross-canonical posts** (or 301 them if consolidation was intended).
3. **T-H2 — Fix the 404 template.** Drop the homepage canonical, give it its own title.
4. **S-1 — Delete the hidden FAQPage node from the blog post template** (or render each post's FAQ as a visible FAQ section with the same wording).
5. **C-F3 — Add `rel="sponsored"` to in-body `/go/` anchors.** The 3 prose `/go/brevo` anchors on the Brevo post are bare; only the 4 tool-stack card links carry it (verified live 26 Nov, see T-L3).

## Counts

- Pages crawled by OpenSEO: 50 of 50 (crawl stopped at the page limit; 95 URLs not crawled). OpenSEO discovered 145 URLs in total (50 crawled + 95 not crawled) — 9 more than the 136 sitemap URLs. Those 9 are outside the sitemap and were not identified in this audit; they are not counted as missing pages.
- Sitemap URLs: 136.
- Blog posts fetched live by specialists: all 108.
- Findings in this report: 76 in total — 21 High, 31 Medium, 22 Low, 2 Info.
- OpenSEO issues: 7 in total, all info/warning — heading-order skips on 3 pages, meta description too long on 2 pages, title too long on 1 page, plus the crawl-limit warning.

## OpenSEO audit reconciliation

- Audit 26f52f47-6891-4aec-914c-e8ea0426d6e3, project 9e30d12e-4141-4f45-8049-bd8d2769e100: completed, 50/50 pages.
- All 50 crawled pages returned 200, were indexable, and were in the sitemap.
- OpenSEO found no broken links, no redirect chains, and no missing canonicals in its 50-page slice.
- Its 7 issues: heading-order skips on `/blog/ai-agents-now-buy-for-customers/`, `/blog/microsoft-agent-framework-pypi-malware/`, `/store/`; meta description over 160 chars on `/partners/` (190) and `/store/` (185); title over 60 chars on `/store/` (65).
- The cross-canonical posts in finding T-H1 were outside the OpenSEO slice or not flagged as issues, so the live curl evidence stands on its own.
- OpenSEO flags no schema or sitemap defect in the 50 pages it saw. The schema and sitemap findings in this report sit in markup meaning and in the un-crawled tail.
- OpenSEO credits were 0, so no paid OpenSEO tools were called.

## Search performance (GSC) — healthy, no collapse

- **Verdict: HEALTHY.** Pulled 26 Nov 2026, data through 24 Nov. Source: OpenSEO `get_search_console_performance` (free read, same first-party GSC data). The direct service-account pull returned 403 for this property — the service account `indexing@image-generator-472610.iam.gserviceaccount.com` is not added as a GSC user on whoisalfaz.me. Fix: add that service-account email in GSC Settings > Users.
- 26 Oct–11 Nov (17 days): 2,523 impressions, 10 clicks, 148.4 impressions per day, impression-weighted average position 17.8.
- 12–24 Nov (13 days): 2,694 impressions, 2 clicks, 207.2 impressions per day, average position 14.7.
- Change: impressions +6.8% in total, +39.6% per day; average position improved 17.8 → 14.7. No dip at or after 12 Nov — the three best days of the whole window (260, 260, 287 impressions) are 15–18 Nov.
- Clicks are very low on both sides (10 → 2); CTR 0.40% → 0.07%. With single-digit clicks, the CTR move is not meaningful on its own.
- One soft spot: the Screaming Frog page and query cluster weakened (page 1,121 → 577 impressions, position 20.9 → 30.7; query "screaming frog alternative" 579 → 357 impressions, position 20.8 → 30.9), offset by the CashOps case-study page surging to 592 impressions at position 3.1 and the embeddings benchmark improving 21.0 → 13.1. The site is not dependent on one page.
- **Google update correlation:** the site improved through the November 2026 core update window (started 10 Nov, 13 days 20 hours, ends ~24 Nov), so the update did not hurt this site. The December 2026 core update started 24 Nov. A date overlap is a hypothesis, never proof — and here the same update coincides with improvement on this site and collapse on fasttools.me.
- **Gaps:** CrUX field data unavailable (no Google API key configured) — no CWV numbers are reported. No TempMail data was pulled (frozen).

## What is already working — keep

- Redirects are single-hop and clean: http to https is 301, www to apex is 301, trailing-slash fix is 308, no chains found.
- All 136 sitemap URLs return 200.
- HTTPS is enforced, TLS 1.3 in the live handshake, HSTS is preload-ready.
- Raw HTML holds full content, titles, canonicals, and JSON-LD. No JavaScript is needed for SEO elements.
- Crawl depth is 2 at most. The homepage links 10 posts directly, `/blog/` links all 108 sitemap posts. No orphan blog posts by crawl depth.
- Affiliate disclosure is present on 8 of 8 sampled posts that carry `/go/` links, placed at the top before the article body.
- Every post has a byline and an author box with a photo linking to `/about/`.
- Alt text: 0 missing across 115 images checked on 5 pages.
- Brotli compression on HTML, JS, and CSS. Static assets carry a 1-year immutable cache.
- No render-blocking scripts on the homepage. Fonts are self-hosted and preloaded.
- Search citability bots return 200 with full HTML: OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Google-Extended, Applebot, bingbot, DuckAssistBot.
- The `/audit/` tool and `/labs/roi/` calculator are real interactive assets. The case-studies cluster is the only finished cluster: `/case-studies/` links all 6 case-study posts.
- No toxic backlink signal was found in the live sample: no PBN domains, no link farms, no exact-match anchor stuffing, no deindexed source. No disavow file is needed.

---

## High findings (21)

### T-H1 — Three distinct blog posts canonicalise to different posts

- **Problem:** 3 live blog posts, each about 3,000 words, carry a canonical (the tag that tells search engines which URL is the main copy) pointing at a different post. `/blog/dify-vs-n8n-architecture/` points at the Dify vs n8n orchestration post. `/blog/pinecone-namespaces-vs-qdrant-payload-filters-comparison/` and `/blog/pinecone-serverless-vs-qdrant-vultr-latency-benchmark/` both point at `/blog/pinecone-vs-qdrant-vultr-benchmark/`. All 3 are linked from `/blog/` and absent from the sitemap. Word-set overlap with the canonical target is only 0.28–0.30, including shared nav and footer text, so body overlap is lower. These are distinct articles, not near-duplicates.
- **Change:** Decide per post. If the content is meant to stand alone, set a self-referencing canonical and add the URL to the sitemap. If consolidation was intended, return a 301 redirect to the target instead of serving 200 with a cross-canonical and `index, follow`.
- **Expected effect:** Google can treat each post as its own page again, so 3 long posts with distinct titles and angles can rank on their own. Until this changes, each is treated as a duplicate of its target.

### T-H2 — 404 pages carry a canonical to the homepage and the homepage title

- **Problem:** `/blog/nonexistent-post-xyz/` returns 404 with `noindex` (correct) but a canonical to `https://whoisalfaz.me/` and the homepage title "Alfaz Mahmud Rizve | GTM & RevOps Architect". The body is a real "Page Not Found" page. A clean 404 check on `/go/nonexistent-xyz/` returns 404 with a 31-byte body and no canonical.
- **Change:** In the 404 template, remove the canonical tag (or self-canonical the 404 URL) and set a distinct title such as "Page Not Found | whoisalfaz.me".
- **Expected effect:** Error pages stop sending a homepage canonical signal. Small fix, removes a wrong signal on every mistyped URL.

### C-F1 — News posts cite zero external sources

- **Problem:** 9 of 10 sampled posts have 0 in-body external links. The PyPI malware post asserts releases 1.26.1 and 1.26.2 "stole credentials via .pth hooks" with no link to PyPI, Microsoft, or any advisory. The AI-agents post names Cequence Security 6-month data with no link. The Brevo deal post has no link to Brevo's own offer page (only `/go/brevo`). The Google November 2026 core update post has no link to Google's announcement. The only external links in the 10-post sample are two Gumroad affiliate links in the n8n 3.0 guide and two links to the author's own fasttools.me calculator in the Stripe $100 post.
- **Change:** Add a "Sources" block with 2–4 primary links (vendor advisory, vendor pricing or docs, original report) to every news post, starting with the 7 November news posts. Link the claim, not just the vendor homepage.
- **Expected effect:** Claims become checkable, which matches the editorial policy promise that every guide is "fact-checked against official documentation at the time of publishing". AI search cites pages whose claims carry sources, so sourced posts are more citable. Scale is uncertain; no citation rate was measured.

### C-F2 — Zero contextual internal links inside article bodies

- **Problem:** In 15 sampled posts, the about 9 "in-body" blog links per post are all template chrome: breadcrumb, "Back to Library", previous/next post, and 4 latest-post cards. Zero links sit inside article paragraphs. The n8n 3.0 guide (5,784 words) has 17 blog links, all chrome. No post links to its category hub page, and the 30-days series parts do not link to each other in prose.
- **Change:** Add 3–5 contextual in-paragraph links per post, chosen by topic (for example malware post to the n8n security post and the self-hosted Qdrant post; Brevo deal to the Brevo IP-warming guide and the cold-email machine). Add a category link in the byline area.
- **Expected effect:** Topical clusters (n8n, RAG/Qdrant, ManyChat, Brevo) start passing relevance to each other instead of each post ending at the newest-posts widget. This is the same fix as X-F1, counted once in the action plan.

### C-F3 — In-body `/go/` affiliate anchors have no `rel="sponsored"`

- **Problem:** In `/blog/brevo-black-friday-2026-30-off/`, the three prose anchors are bare `<a href="https://whoisalfaz.me/go/brevo">` with no `rel` attribute. The same pattern is in the n8n 3.0 guide and the n8n-cloud-vs-self-hosted post. Only the tool-stack card links carry `rel="noopener noreferrer sponsored"`. The `/go/` URLs themselves are fine (308, robots-disallowed, absent from sitemap).
- **Change:** Add `rel="sponsored"` (keep `noopener noreferrer`) to every in-body `/go/` anchor across all posts. One template or Sanity rich-text change covers the lot if the anchors are rendered from one component; otherwise fix per post.
- **Expected effect:** Affiliate links are marked as paid links in the page code, matching the disclosure already shown to readers and the marking already used on tool-stack cards.

### C-F4 — Nothing is ever updated: 106 of 108 posts have `dateModified == datePublished`

- **Problem:** Full census of 108 posts: 106 show identical publish and modified dates. The oldest post (2024-04-12) was never revised. The flagship n8n intro post (2026-02-25) predates n8n 3.0 breaking changes and was never revised, while the 1 November n8n 3.0 guide documents 37 removed nodes. The ManyChat pricing post (2026-05-12, 4,207 words) is untouched for 6.5 months with no link to ManyChat's pricing page.
- **Change:** Set a real `dateModified` and show a visible "Updated" stamp when a post is revised. First pass: revise the 10 highest-traffic posts (n8n intro, n8n 3.0, ManyChat pricing, Stripe fee posts, n8n cloud vs self-hosted) and record the change.
- **Expected effect:** Pricing, version, and deal posts stop decaying in place, and the editorial policy's "proactive correction and update system" gains visible output. Ranking effect is not measured here.

### S-1 — Blog FAQPage markup describes Q&A that is not visible on the page

- **Problem:** FAQPage structured data (the code that describes questions and answers to search engines) on blog posts lists questions and answers that do not appear in visible page text. On the Brevo post, 0 of 4 questions and 0 of 4 answers appear visibly. On the PyPI malware post, 0 of 4 appear visibly. On the February 2026 what-is-n8n post, 0 of 3 appear visibly. All 5 sampled November 2026 posts carry FAQPage with 3–4 questions each. Service pages and `/audit/` are fine — their FAQPage Q&A is fully visible.
- **Change:** Either render each post's FAQ as a visible FAQ section with the same wording, or delete the FAQPage node from the blog post template. Rendering it visibly is the better fix, since it adds real content.
- **Expected effect:** Removes a policy risk on every post at once. Google's structured-data policy requires markup to match visible page content. FAQ rich results were retired for all sites on 2026-05-07, so this markup brings no search-result benefit and only policy risk.

### S-2 — 4 live indexable pages missing from sitemap.xml

- **Problem:** 4 pages return 200, are self-canonical, and carry `index, follow`, but are absent from the sitemap: `/blog/dify-vs-n8n-architecture/`, `/blog/pinecone-namespaces-vs-qdrant-payload-filters-comparison/`, `/blog/pinecone-serverless-vs-qdrant-vultr-latency-benchmark/`, and `/blog/category/ai-lead-generation/`. Found by comparing all 122 `/blog/` links against the 136 sitemap URLs. `/labs/chat/` is also absent but correctly so — it is `noindex, follow`.
- **Change:** Add the 4 URLs to `sitemap.xml` with their real lastmod, and fix the sitemap generator so new Sanity posts and categories are picked up. These 3 posts date from July 2026, so this is a generator gap, not a delay.
- **Expected effect:** Search engines are told about 4 live pages they currently have to find by links alone. One-line-each data fix.

### P-F1 — TTFB slow and unstable on cache HITs

- **Problem:** Time to first byte (TTFB, the wait before the server starts sending the page) varies 2–3x on the same URL, even on `x-vercel-cache: HIT`. `/partners/` measured 0.70–3.25 s, `/audit/` 1.68–2.08 s, homepage 0.67–1.77 s. After subtracting about 0.7–0.9 s of VM proxy overhead, worst-case server TTFB is still about 2 s or more for prerendered pages. A prerendered page served from cache should not take 2–3 s to first byte.
- **Change:** Check Vercel function and edge timing for `/partners/` and `/audit/` (both are 241 KB HTML pages, likely Sanity fetches at build or revalidation time). Confirm whether the Cloudflare to Vercel hop adds the variance, and re-measure from a clean network (not this VM) before changing code.
- **Expected effect:** Faster and steadier first paint for readers. No Core Web Vitals numbers exist from this pass (no Lighthouse, no PSI, no CrUX data), so the size of the ranking effect is not stated here.

### P-F2 — Homepage ships about 494 KB wire JS, one 229 KB chunk

- **Problem:** Homepage JavaScript is 16 chunks, 1.71 MB uncompressed, 494 KB on the wire. One chunk, `ed9f2dc4`, is 860 KB raw and 229 KB wire. Blog pages load 15 chunks.
- **Change:** Run `next build` bundle analysis, find what is inside `ed9f2dc4` (likely a client-side library pulled into the shared layout), and split it out of the homepage path with dynamic import or move it to the pages that need it.
- **Expected effect:** Less JavaScript to download and parse on the homepage, which is the page every new reader meets first. Exact load-time gain is not measured here.

### V-H1 — Sanity blog images bypass the image optimizer and are served raw at full size

- **Problem:** `/blog/` carries 102 Sanity CDN image references (68 distinct images). A sample tag has no `srcset`, no `/_next/image/` URL, and no Sanity sizing params — 0 of 102 URLs contain `?w=` or `auto=format`. Served sizes probed live: a 1024×1024 JPG at 148 KB, a 1200×630 PNG, a 1376×768 JPG. By contrast, local images through `next/image` are served as AVIF: logo 64w is 1.7 KB, playbook 1080w is 16 KB, profile 384w is 13 KB.
- **Change:** Route Sanity images through `next/image` (add `cdn.sanity.io` to `remotePatterns`) or append Sanity params to each URL, for example `?w=800&auto=format&fit=max`, plus a `srcset` with 400/800/1200w variants.
- **Expected effect:** Blog cards stop downloading full-size images for small displays. Page weight falls; exact saving per page was not measured.

### V-H2 — Hero content ships invisible and depends on JS animation to appear

- **Problem:** Homepage H1 spans carry inline `style="opacity:0;transform:translateY(40px)"`. The subcopy and both hero CTAs carry `style="opacity:0;transform:translateY(20px)"`. Counts of inline `opacity:0` in served HTML: homepage 33, `/blog/` 125, services, blog-post, about, and audit pages 0. If the animation JavaScript fails or is blocked, the H1, subcopy, and CTAs stay invisible — the first screen is blank.
- **Change:** Ship hero text visible by default and add the hidden state via JavaScript (a class added on mount), or add a `<noscript>` style that forces `opacity:1; transform:none`. Apply the same default-visible pattern to the `/blog/` card animations.
- **Expected effect:** The first screen is readable even when JavaScript fails or is blocked. Whether the hero actually animates in on load, and how long the first screen stays blank, was not verifiable from HTML and needs a real browser check.

### V-H3 — First blog card image is lazy-loaded; no image on the site gets load priority

- **Problem:** The first image on `/blog/` — "Start Your AI Automation Today with n8n" (`/playbook.jpg`, `sizes="100vw"`) — has `loading="lazy"`. It sits above the fold on the blog listing. Across all 5 pages checked, `fetchpriority` appears 0 times and `loading="eager"` 0 times. All 103 lazy images on `/blog/` are lazy, including the first card.
- **Change:** Make the first card image on `/blog/` eager with `fetchpriority="high"`. Keep `loading="lazy"` on the remaining cards.
- **Expected effect:** The image a reader sees first on the blog listing loads sooner. Real LCP numbers were not available in this pass, so no time saving is claimed.

### G-F1 — Edge returns 403 to training-bot user-agents that robots.txt explicitly allows

- **Problem:** `curl` with GPTBot, ClaudeBot, ChatGPT-User, and Amazonbot user-agents returns 403 "Access Denied" (13 bytes, `Server: cloudflare`). Robots.txt has explicit `Allow: /` groups for GPTBot, ClaudeBot, ChatGPT-User, anthropic-ai, and Amazonbot, so the edge policy contradicts the published policy for those agents. CCBot and Bytespider also return 403, but they are `Disallow: /` in robots.txt, so their 403 matches intent. Search citability bots all return 200 with full HTML (241,980 bytes).
- **Change:** In Cloudflare, add a skip rule for verified AI bots (or turn off the rule that fires on these user-agents) so the edge matches robots.txt, then re-probe each user-agent and confirm 200. Decide the training policy first: if GPTBot or ClaudeBot training use is not wanted, change robots.txt to `Disallow: /` for them instead of leaving Allow plus edge-block in conflict. ChatGPT-User is user-triggered browsing, not training — blocking it breaks "browse this site for me" requests.
- **Expected effect:** The published policy and the live edge agree, and user-triggered AI browsing can fetch the site. Confidence note: these probes carry bot user-agent strings from a datacenter IP without verified-bot IP ranges, so this is behaviour toward unverified traffic, not proof the real verified bots are blocked. Cloudflare bot management is the likely layer.

### G-F2 — Blog posts cite almost no primary sources by link

- **Problem:** Same evidence as C-F1, counted from the AI-citation side. The n8n cloud-vs-self-hosted post has 6 external hrefs in total, all header or footer (socials, subdomains), and zero links to n8n.io pricing or docs in the body, though the post states prices ($20/month, 2,500-run cap, about $5/month self-hosted). The PyPI malware post has 144 text mentions of PyPI/Microsoft and zero links to pypi.org or microsoft.com. The Brevo post is the exception, with 4 links to brevo.com.
- **Change:** Add 2–4 outbound links per post to the primary source of each key claim (n8n pricing page, PyPI advisory or package page, Microsoft advisory, Brevo offer page). Put the link on the sentence that states the fact, not in a links list at the end.
- **Expected effect:** AI answers can quote the numbers and trace them to a primary source, which weakens citability for the two posts that most need it today (a price comparison and a security incident). This is the same fix as C-F1, counted once in the action plan.

### X-F1 — 30 of 108 posts have zero contextual in-body inlinks; 27 have zero contextual outlinks

- **Problem:** Full 108-post fetch, article-scope links only, with prev/next nav, the latest-posts widget, and category chips excluded. 30 posts receive no in-body link from any other post; 15 more receive exactly one; 24 receive two. Average is 2.6 contextual outlinks per post; 27 posts link out to nothing in body text. Zero-inlink posts include the n8n cloud-vs-self-hosted post, both CRAG posts, both Stripe fee posts, the Brevo and CallHippo deal posts, the Pinecone-vs-Qdrant benchmark, the n8n security post, the core-update post, the OpenAI Agent Builder post, the PyPI malware post, the AI-agents post, the TempMail case study, the competitor-audit post, and the Claude Meetings review.
- **Change:** Add 3–5 in-body links per post to same-cluster posts, starting with the 30 zero-inlink posts. Put the n8n 3.0 upgrade post, the RAG tutorial, and the cold-email-machine post at the centre of their clusters — they already have the most in-body outlinks.
- **Expected effect:** Readers finishing a post get a next step inside its own cluster instead of the same 5 latest posts. This is the same fix as C-F2, counted once in the action plan.

### X-F2 — The 30-days-of-n8n hub is one-way; no cluster has a true pillar page

- **Problem:** `/blog/30-days-of-n8n/` links to 32 posts, but a whole-page grep of the other 107 posts finds zero links back to it. OpenSEO records it at 1,402 words. No other cluster has any hub page at all — no n8n guide, no RAG hub, no outbound or cold-email hub, no ManyChat hub, no Brevo hub.
- **Change:** Link `/blog/30-days-of-n8n/` from the intro of every n8n post, and expand it from a series index into a real pillar (what n8n is, cloud vs self-hosted, first workflow, links to each spoke). Then build one pillar each for RAG/vector and outbound/cold-email — the two clusters with enough depth to carry one.
- **Expected effect:** The site's deepest topic (n8n, about 30 posts) gains one page a searcher or reader can land on for the whole topic, and the hub starts receiving links instead of only sending them.

### X-F3 — "What is n8n / setup / cloud vs self-hosted" is split across three posts

- **Problem:** Three posts split one query set. `/blog/what-is-n8n-by-alfaz-mahmud-rizve/` ("What is n8n? Core Concepts & Guide", about 2,254 words, 1 table), `/blog/what-is-n8n-and-how-to-set-it-up/` (slug still says "what-is-n8n", title now "n8n Cloud vs Self-Hosted Setup Guide", about 3,377 words, 3 tables), `/blog/n8n-cloud-vs-self-hosted/` (about 1,435 words, 0 tables, 8 H2s). Web search for "what is n8n how to set up" returns single guides that combine what-is, setup, first workflow, and cloud-vs-self-host in one page (Dev.to, freeCodeCamp, Codecademy). Search for "n8n cloud vs self-hosted pricing comparison" returns price-table-led comparisons with dated 12-month cost examples and sourced plan prices.
- **Change:** Merge into one flagship guide at `/blog/what-is-n8n-by-alfaz-mahmud-rizve/` (what it is, then cloud vs self-hosted with a dated price table, then first workflow), keep the setup post as the deep setup spoke, and redirect `/blog/n8n-cloud-vs-self-hosted/` to the flagship with its price content folded in.
- **Expected effect:** One page serves the query set instead of three thin slices competing with each other, and the comparison gains the price table its query most wants. SERP checks were two queries with the top 4 results each, so this is page-type shape, not a full SERP audit.

### X-F4 — Duplicate-target pairs with no merge decision (three pairs)

- **Problem:** Three pairs chase one query each with two pages. CRAG pair: `/blog/corrective-rag-crag-blueprint-n8n-tavily-fallback/` (about 3,327 words) vs `/blog/corrective-rag-crag-n8n-blueprint/` (about 2,537 words); neither links to the other in body text. Pinecone-vs-Qdrant pair: `/blog/pinecone-vs-qdrant-n8n-rag-comparison/` (about 3,563 words) vs `/blog/pinecone-vs-qdrant-vultr-benchmark/` (about 2,265 words). Stripe pair: `/blog/what-stripe-takes-from-100-payment/` (about 1,103 words) vs `/blog/how-stripe-quietly-takes-more-fees-than-advertised/` (about 1,855 words); neither links to the other, and both Stripe posts are orphans under X-F1.
- **Change:** Pick one survivor per pair, fold the loser's distinct facts into it, 301 the loser, and add a cross-link in the interim. Stripe pair: merge into the $100-payment post (clearer query match) and use the freed slot for a Stripe-fees pillar or calculator.
- **Expected effect:** Two pages stop splitting clicks and links on one query. The thinnest money cluster on the site (Stripe, 2 posts) stops being its most fragmented one.

### B-W1 — Only 1 independent dofollow link (Viberank to `/audit/`) in the whole profile

- **Problem:** Live-verified 26 November: 1 independent dofollow link, from viberank.dev to `/audit/`. Everything else in the profile is self-published. Referring domains found live: 1 independent (Viberank), 7 self-published platforms (DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit, Bear Blog). The logbook shows no other independent domain.
- **Change:** Do the same directory work as fasttools.me (MicroLaunch plus free batch) plus earned links: pitch the `/audit/` tool and the n8n and Stripe guides, not the homepage.
- **Expected effect:** The profile gains independent citations instead of resting on one listing plus the author's own publishing network. No third-party backlink count, DA/PA, spam score, or competitor link profile was measured — no tool with access exists here.

### B-W2 — Headline count is stale: "13 verified dofollow" is from 9 November, before about 128 sprint parasite posts

- **Problem:** The headline count of 13 verified dofollow links is from 9 November (Draken-confirmed totals, agent-reported). Since then about 128 parasite posts went live (agent-reported, sprint logbook). Each post carries 2–5 links, so the true dofollow count is now well above 13 — but no consolidated recount exists, so the true total is unknown.
- **Change:** Recount from the sheet: count live dofollow links per platform from the whoisalfaz.me tab and record one current total with a date.
- **Expected effect:** One current total replaces a stale headline that understates the profile by a wide margin. The recount itself changes no links.

---

## Medium findings (31)

### T-M1 — Sitemap: 29 of 136 URLs have no `<lastmod>`; one live category page is missing

- **Problem:** 29 sitemap URLs have no `<lastmod>`: all 20 static pages, `/blog/`, `/blog/30-days-of-n8n/`, and the 8 category pages. Newest `<lastmod>` is `2026-11-25T12:49:20.319Z` (fresh); oldest is `2024-04-12`. Missing URL: `/blog/category/ai-lead-generation/` returns 200, is linked from `/blog/`, but is not in the sitemap. (`/blog/category/learn-automation-in-30-days/` is also absent, but it 308-redirects to `/blog/category/30-days-of-n8n-automation/`, which is in the sitemap.)
- **Change:** Emit `<lastmod>` for every sitemap URL from the page's real updated date, and add `/blog/category/ai-lead-generation/` to the sitemap. Same fix as S-6 and part of S-2; counted once in the action plan.
- **Expected effect:** Search engines get a true freshness signal for every URL instead of 29 blanks.

### T-M2 — `/blog/` is a single 943 KB HTML page with no pagination

- **Problem:** `/blog/` is 943,102 bytes, 114 `<article>` cards, 111 post links in raw HTML (all 108 sitemap posts linked). No paginated URLs in raw HTML; "load more" text is present. OpenSEO reports 142 internal links and 4,328 words on the page. Homepage HTML is 241,980 bytes by comparison. `/blog/?page=2` returns 200 with byte-identical content to `/blog/` and canonical to `/blog/`. Robots.txt blocks `/*?*`, and the canonical points at `/blog/`, so Google is protected — but any `?page=N` serves the full 943 KB duplicate.
- **Change:** Paginate the blog index (for example 20 posts per page) with crawlable `<a href>` links to each page and a self-referencing canonical per page. Return 404 (or redirect to `/blog/`) for `?page=` values that do not exist.
- **Expected effect:** The blog listing stops shipping 943 KB on every load, and paginated pages become real crawlable pages instead of identical duplicates behind a query string.

### T-M3 — CSP allows `unsafe-inline` and `unsafe-eval` in `script-src`

- **Problem:** Live header on homepage and blog post: `content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://analytics.ahrefs.com https://static.cloudflareinsights.com; ... object-src 'none'; upgrade-insecure-requests;`. Other headers are strong: HSTS `max-age=63072000; includeSubDomains; preload`, `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy: camera=(), microphone=(), geolocation=()`.
- **Change:** Remove `unsafe-eval` first; move inline scripts to nonces or hashes to drop `unsafe-inline` where Next.js allows it.
- **Expected effect:** Tighter script policy. Security headers are a trust matter, not a confirmed ranking signal, so no ranking gain is claimed.

### C-F5 — Near-duplicate CRAG pair published one day apart

- **Problem:** `/blog/corrective-rag-crag-n8n-blueprint/` (2026-07-25, 2,425 words) and `/blog/corrective-rag-crag-blueprint-n8n-tavily-fallback/` (2026-07-26, 3,214 words). Both cover Corrective RAG in n8n with Qdrant grading and Tavily fallback; H2s overlap on grading, Tavily fallback, context refinement, and deployment. Same narrow topic, adjacent dates, no cross-link distinguishing them.
- **Change:** Merge into one canonical CRAG guide (keep the stronger slug), 301 the other to it, and note the merge in the surviving post. Same pair as X-F4; counted once in the action plan.
- **Expected effect:** One CRAG guide instead of two pages splitting the same narrow query.

### C-F6 — Affiliate disclosure wording is generic and mismatched

- **Problem:** Identical line on every affiliate post: "This technical breakdown contains affiliate links. If you deploy this stack using my links, I earn a commission at no extra cost to you." It appears on a malware news post and on a Black Friday deal post, neither of which is about deploying a stack. Placement is good (top, before the body); wording is not.
- **Change:** Use per-post wording naming the vendor, for example "Links to Brevo in this post are affiliate links — I earn a commission if you buy, at no extra cost to you." Keep the top placement.
- **Expected effect:** The disclosure reads as written for the post in front of the reader, not pasted across posts where it does not fit.

### C-F7 — November news cluster is short and two posts have no H2 sections

- **Problem:** 7 posts from 20–24 November run 617–1,355 article words (about 420–1,150 body words), under the 1,500-word blog floor: n8n security 617, malware 861, AI agents 916, Kotoba 957, Stripe $100 990, Brevo deal 1,014, CallHippo 1,052. The malware post and the AI-agents post have no H2 content sections at all — the only headings are H3 tool-stack cards and the "Ready to automate your agency?" CTA (itself split across two H2s, "Ready to" and "automate your agency?"). Longer guides are well structured (n8n 3.0: 10 H2s).
- **Change:** Give every news post at least 3 H2 sections (what happened, what it means, what to do now) and a short "what to do" checklist. If short news is intentional, label the format so thin news posts are not judged as thin guides.
- **Expected effect:** News posts gain a readable structure and a clear next step for the reader, instead of a flat block with no section headings.

### C-F8 — "1/1/1970" date bug on related-post cards

- **Problem:** `/blog/zero-data-retention-enterprise-rag-vultr-vps/` has no `datePublished` or `dateModified` in its JSON-LD (one of only 2 posts in the census with no dates; the other is the 30-days hub page). Every sampled post's related-posts card for it renders "Zero-Data-Retention Enterprise RAG: Vultr SOP 1/1/1970".
- **Change:** Set the publish date for that post in Sanity. Check the hub page's date handling too. Same fix as X-F7; counted once in the action plan.
- **Expected effect:** The 1970 date stops appearing on every post's related-posts widget. The string `1/1/1970` appears 212 times across the 108 fetched post files today.

### C-F9 — Readability split: July batch sentences run 27–36 words

- **Problem:** Body average sentence length — CRAG SOP 34.5 words, self-hosted Qdrant 36.5, CRAG blueprint 27.1, Pinecone-vs-Qdrant benchmark 27.2. November posts run 16.5–22 words (n8n cloud vs self-hosted 16.5, core update 18.5, malware 19.1). Service pages run 24–28 words (custom-full-stack 27.7, headless 26.3, seo-organic-growth 25.2).
- **Change:** Split long sentences in the July guides and the 5 service pages; aim for 15–20 words average, matching the November batch.
- **Expected effect:** July guides read at the same pace as the November posts. No readability score from a tool is claimed; these are measured sentence lengths.

### C-F10 — Partners page still lists Quora as a live channel; audience stats have no source

- **Problem:** `/partners/` says "Quora (AEO & AI Search Authority) … Top-ranking featured technical answers indexed by ChatGPT, Perplexity, and Google AI Overviews." Per the user's own record, the Quora account was banned 2026-11-08 for spam-policy violations, 0 answers, all deleted, appeal rejected. Same page claims "68% B2B Decision-Makers", "85% Tier-1 Markets" (US 42%, UK & Europe 28%, Canada & Australia 15%), "50+ Deep Playbooks", "Top Google rankings for transactional search queries" — no source, sample size, or date shown for any of them. This audit did not verify them either.
- **Change:** Remove or correct the Quora card after a live check confirms the ban stands; add a source line and date to each audience stat, or soften to what can be shown (for example link the n8n creator profile, which is verifiable).
- **Expected effect:** The media kit stops listing a channel that may no longer exist and stops stating audience numbers no reader can check. Confidence note: the Quora ban is from the user's record, not re-verified live in this audit — confirm before removing the card.

### C-F11 — About page makes big claims with no named proof

- **Problem:** `/about/` (619 words per OpenSEO, 1 H2) calls the author a "certified automation architect" without naming any certification ("Certification details are continuously verified and updated"), claims "over a decade of cumulative engineering experience", and lists client metrics — "VibeViso … 40k search impressions and an 88% organic click acceleration in 90 days", "FlowerShop … 679 search-indexed pages", "Saved clients over $45,000 annually" — with no links, dates, or evidence. No degree, no photo caption details, no physical address. (Education IIUC CSE is in the user's record but not on the page.)
- **Change:** Name the certification(s) or drop the word "certified"; add degree and year; link 2–3 metric claims to their case studies.
- **Expected effect:** The About page's claims become checkable instead of stated without proof. The metrics above are site claims this audit could not verify; do not repeat them as verified facts.

### S-3 — Person and Organization are defined twice per page with conflicting fields

- **Problem:** Every page sampled defines Person and Organization twice with different fields. Block 0 (global array): Person `jobTitle: "GTM & RevOps Architect"`, 8 sameAs including Facebook and Instagram; Organization with `contactPoint.email: contact@whoisalfaz.me`, no `@id`. Blog `@graph`: Person `@id: https://whoisalfaz.me/#author`, `jobTitle: "RevOps Architect & Full Stack Automation Engineer"`, 7 sameAs including `https://n8n.io/creators/whoisalfaz/`, no Facebook or Instagram; Organization `@id: https://whoisalfaz.me/#organization` with logo as ImageObject, no contactPoint. Homepage has a third Person (block 2) with a different `knowsAbout` list and a `worksFor` entry the others lack.
- **Change:** Emit one Person and one Organization per page, both with `@id` (`#author`, `#organization`), one sameAs list, one jobTitle; have every other node reference them by `@id` only. Pick the jobTitle and sameAs set once and use them everywhere.
- **Expected effect:** Search engines and AI systems get one consistent entity for the author and the site instead of two or three conflicting versions.

### S-4 — TechArticle `image` missing on all sampled November 2026 posts

- **Problem:** `image` is absent on the Brevo, PyPI malware, AI-agents, ElevenLabs-Kotoba, and CallHippo posts. Older posts have it — for example the what-is-n8n post has a Sanity CDN `.webp` image. The Brevo post HTML contains no Sanity image at all; its `og:image` falls back to the generic `https://whoisalfaz.me/featured-image.png`.
- **Change:** Add a cover image to each November sprint post in Sanity and emit it as the TechArticle `image` (same URL as the post's `og:image`, not the site default).
- **Expected effect:** Article markup carries a real cover image for each post instead of the site-wide default, and the share image stops being generic.

### S-5 — Homepage has no WebSite/WebPage schema and no `@id` on any entity

- **Problem:** The homepage carries 3 JSON-LD blocks — Person plus Organization array, FAQPage (5 questions), and a second Person. No WebSite, no WebPage, no BreadcrumbList, no `@id` anywhere. WebSite exists only inside blog-post `@graph` blocks.
- **Change:** Add a WebSite node (`@id: https://whoisalfaz.me/#website`) and a WebPage node to the homepage, and give the homepage Person and Organization the same `@id`s used on blog posts.
- **Expected effect:** The homepage gains the same entity anchors the blog posts already use, so the site entity is consistent across page types.

### S-6 — 29 of 136 sitemap URLs (21%) have no `<lastmod>`

- **Problem:** All 21 static and service pages have no lastmod, including `/`, `/about/`, the 5 `/services/*` pages, `/audit/`, `/partners/`, `/labs/roi/`, `/blog/`, `/case-studies/`, `/contact/`, `/store/`, `/portfolio/`, `/terms/`, `/privacy-policy/`, `/editorial-policy/`, plus all 8 `/blog/category/*` pages. All 107 blog-post entries have lastmod, and lastmod matches TechArticle `dateModified` exactly on every sampled post (Brevo 2026-11-23T10:00:00.000Z, MS malware 2026-11-24T16:00:00.000Z, what-is-n8n 2026-02-26T00:00:00.000Z).
- **Change:** Emit lastmod for every sitemap URL from the real last content change of that page. Same fix as T-M1; counted once in the action plan.
- **Expected effect:** Same as T-M1 — a true freshness signal for every URL instead of 29 blanks.

### S-7 — `/partners/` and `/labs/roi/` have no page-specific schema

- **Problem:** Both pages carry only the global Person plus Organization block. `/partners/` is a 2026 Media Kit with a rate card ($100–$180 Contextual Link, $250–$350 Comparison, $450–$650 Sponsored Guide, $950–$1,400 360° Bundle, $1,500+ Enterprise) and no Offer or Service markup; `/labs/roi/` is a calculator tool with no WebApplication markup (contrast `/audit/`, which has WebApplication plus BreadcrumbList plus FAQPage).
- **Change:** Add WebPage plus BreadcrumbList to both; add Offer markup to `/partners/` only if the listed prices are current and bookable, and WebApplication to `/labs/roi/`.
- **Expected effect:** The media kit and the calculator gain page-type markup that describes what each page is, matching the pattern `/audit/` already follows.

### P-F3 — HTML payloads are 176–242 KB raw

- **Problem:** Homepage 242 KB (89.6 KB RSC flight data, 111 Sanity image refs), `/partners/` 241 KB, blog post 176 KB. Brotli hides it on the wire (22–43 KB), but the browser still parses the full document and its inline payloads.
- **Change:** Cut the RSC payload — paginate or trim the homepage and partners card lists (fewer posts per page, smaller per-card data), and drop unused fields from the Sanity queries feeding those pages.
- **Expected effect:** Less document for the browser to parse on the heaviest pages. Exact parse-time saving was not measured.

### P-F4 — Image srcSets run to 3840w for small displays

- **Problem:** Profile photo displayed at 208 px and blog cards at 500 px both carry srcSet entries up to `w=3840`, with `src` defaulting to the 3840 variant. Next.js default `deviceSizes` includes 3840; the site has not trimmed it.
- **Change:** Set `images.deviceSizes` and `images.imageSizes` in `next.config` to cap at the largest real display width (for example 1920 max, smaller imageSizes for thumbs), so browsers stop downloading oversized variants.
- **Expected effect:** Browsers pick a closer-sized image variant instead of the 3840w one for small displays.

### P-F5 — `/go/*` links pay 2 redirect hops

- **Problem:** `/go/brevo` returns 308 to `/go/brevo/` (1.5–1.7 s from this VM) then 307 to brevo.com. The 308 is only a trailing-slash normalisation, and the redirect itself is `max-age=0, must-revalidate`, so no caching helps repeat clicks.
- **Change:** Make the redirect handler accept the bare slug (no trailing-slash 308) and serve the 307 in one hop; add a short browser cache (for example `max-age=3600`) to the 307 since the target rarely changes.
- **Expected effect:** Affiliate clicks take one hop instead of two, and repeat clicks can use the browser cache.

### V-M1 — Nav tap targets are below the 44px site standard

- **Problem:** Nav CTAs "Free Audit" and "Work With Me" use `px-4 py-2 text-xs` — about 32px tall. Theme toggle is `w-8 h-8` (32px). Sound and mute button is `p-2 text-xs` (about 32px). What passes: mobile menu button `w-11 h-11` (44px, `aria-label="Open navigation menu"`), hero CTAs `px-8 py-4` (about 48px tall).
- **Change:** Give nav links and icon buttons `min-h-[44px] min-w-[44px]` (for example change nav CTAs to `py-3`, theme toggle to `w-11 h-11`).
- **Expected effect:** Nav controls meet the site's own 44px tap-target standard on touch screens. Actual tap-target spacing in the mobile menu needs a real browser check.

### V-M2 — Blog post has no in-article images; its share image is a 150 KB PNG

- **Problem:** `/blog/brevo-black-friday-2026-30-off/` contains only 2 images: the 32px logo and the 56px author avatar (`profile.webp`). Zero Sanity images in the article body. `og:image` is `https://whoisalfaz.me/featured-image.png`, probed live at 200, `image/png`, 150,737 bytes.
- **Change:** Add 1–2 in-article images (deal screenshot, pricing table graphic) and replace the share image with a compressed JPG or WebP under 100 KB at 1200×630.
- **Expected effect:** The deal post gains visual content in the body and a lighter share image. Same cover-image fix as S-4 for the November posts; counted once in the action plan where they overlap.

### V-M3 — Homepage FAQ answers are not in the served HTML and buttons lack `aria-expanded`

- **Problem:** Homepage FAQ has 5 `<button>` items ("Who is Alfaz Mahmud Rizve?", "What is workflow automati…", and 3 more) with `aria-expanded` count 0 on the whole page and no answer text in the served HTML after the buttons — answers render only after a JavaScript click. `/services/` does it right: 6 native `<details>` elements. No `<details>` on the homepage at all.
- **Change:** Render FAQ answers in the HTML (as on `/services/`, use `<details>` and `<summary>`) or add `aria-expanded` plus `aria-controls` with the answer present but collapsed in markup.
- **Expected effect:** FAQ answers exist in the served page for readers, crawlers, and assistive tools instead of appearing only after a click. This also bears on S-9, where homepage FAQ answers do not match visible copy.

### G-F3 — llms.txt and llms-full.txt are stale: newest sprint posts missing

- **Problem:** `llms.txt` (200, 3,994 bytes, 17 whoisalfaz.me links) and `llms-full.txt` (200, 18,412 bytes, 77 links) contain none of: `microsoft-agent-framework-pypi-malware`, `ai-agents-now-buy-for-customers`, `brevo-black-friday-2026-30-off`, `google-november-2026-core-update-what-changed`. Only `zero-data-retention-enterprise-rag-vultr-vps` of the recent posts is present. Sitemap lists 136 URLs; llms-full.txt lists 77.
- **Change:** Regenerate both files from the sitemap on every publish (or at least weekly), and add the publish date of the newest post at the top so staleness is visible.
- **Expected effect:** Non-Google agents that read llms.txt see the newest posts instead of a list that stops before the November sprint. Per Google's AI optimization guide, llms.txt carries no weight for Google Search.

### G-F4 — No Content-Signal, no RSL, no security.txt

- **Problem:** No `Content-Signal` response header on the homepage; no `content-signal` line in robots.txt; `/.well-known/rsl.txt` returns 404; `/.well-known/security.txt` returns 404.
- **Change:** Add one `Content-Signal` line per robots.txt group once Sheriff states the training policy (`search=yes, ai-input=yes, ai-train=yes/no`); add `/.well-known/security.txt` with a contact address. Do not add RSL until the licensing choice is made.
- **Expected effect:** The site's licensing preference is stated in a machine-readable place, and a contact address exists for security reports. Content-Signal absence is "info" per the agentic skill, not a defect — it states a licensing preference, it does not change Google Search. Same for RSL (draft standard).

### G-F5 — No Markdown delivery for agents

- **Problem:** `Accept: text/markdown` on the homepage returns 200 `text/html` (241,878 bytes, no `Vary: Accept` for markdown); `/blog/n8n-cloud-vs-self-hosted/index.md` returns 404; no `rel="alternate" type="text/markdown"` link in homepage HTML.
- **Change:** Serve a Markdown version of blog posts at `<slug>.md` (or via content negotiation with `Vary: Accept`) generated from the same Sanity body.
- **Expected effect:** Agents that prefer Markdown get a clean copy instead of parsing HTML. No consumer agent is confirmed to request Markdown; this is a convenience item, not a blocker — plain HTML already parses fine.

### X-F5 — Blog to service conversion path is template chrome, not a designed journey

- **Problem:** Every sampled post carries the same footer CTA card linking `/contact/` and `/services/growth-consulting/`. In body text, only `/services/n8n-automation/` is ever linked — from 13 of 108 posts, with genuine contextual CTAs. Zero posts link in body text to `/services/seo-organic-growth/`, `/services/custom-full-stack/`, `/services/headless-architecture/`, or `/services/growth-consulting/`. Only 9 of 108 posts link to `/audit/` in body text. The n8n service page itself is strong ("Starting at $750", "2–3 days (Simple) / 2–4 weeks (Agency Systems)"), but the blog rarely routes readers to it, and never routes SEO or headless readers to their matching service pages.
- **Change:** Add one contextual service CTA per post matched to its cluster — n8n posts to `/services/n8n-automation/`, SEO and headless posts to `/services/seo-organic-growth/` and `/services/headless-architecture/`, RevOps posts to `/services/growth-consulting/`. Add an in-body audit-tool link on SEO posts and an ROI-calculator link (`/labs/roi/`) on agency and SaaS-ops posts.
- **Expected effect:** The highest-traffic content (n8n tutorials, Stripe fee explainers, SEO posts) ends at a service, the audit tool, or the ROI calculator instead of at the latest-posts widget.

### X-F6 — "Related" reading is the same 5 latest posts on every page, not cluster-aware

- **Problem:** On all 14 sampled posts the end-of-article block shows the same five posts (zero-data-retention-enterprise-rag, microsoft-agent-framework-pypi-malware, ai-agents-now-buy-for-customers, brevo-black-friday, callhippo-black-friday) — date-ordered, not topic-ordered. Only 2 of 14 sampled posts had any "Related" section at all. A reader on the ManyChat pricing post is offered Black Friday phone deals and PyPI malware, not the ManyChat integration post.
- **Change:** Replace the latest-posts block with 3 same-cluster related posts (same category, then same cluster), keeping one latest-post slot at most.
- **Expected effect:** Related reading matches the post the reader just finished, so the next click stays inside the topic.

### X-F7 — A broken date renders on every post: "1/1/1970"

- **Problem:** The latest-posts widget on every sampled post shows "Zero-Data-Retention Enterprise RAG: Vultr SOP1/1/1970". The string `1/1/1970` appears 212 times across the 108 fetched post files. The zero-data-retention post itself carries no usable publish date (epoch fallback).
- **Change:** Set a real publish date on `/blog/zero-data-retention-enterprise-rag-vultr-vps/` in Sanity and re-check the widget. Same fix as C-F8; counted once in the action plan.
- **Expected effect:** A 1970 date stops appearing on every page — a visible trust and freshness defect for readers and for any date shown in search results.

### X-F8 — Time-bound deal posts have no evergreen successor

- **Problem:** `/blog/brevo-black-friday-2026-30-off/` (deal 23–30 November 2026, code BREVOFRIDAY2026) and `/blog/callhippo-black-friday-2026-business-phone-deal/` (20% off annual through 5 December 2026) are both zero-inlink orphans (X-F1). Both go stale within days of this audit, with no evergreen Brevo-pricing or business-phone guide to inherit their links.
- **Change:** Before each deal expires, add a dated "deal ended" note linking to an evergreen successor (Brevo pricing or review post; CallHippo review) — or fold the deal into the review post and redirect.
- **Expected effect:** Deal posts that go stale within days hand their readers to a live guide instead of a dead offer.

### B-W3 — Bare-URL anchors are 54% of the sample

- **Problem:** Live sample of 28 link instances: 15 use the bare URL as anchor text (54%), 8 are descriptive or tool-named (29%), 5 are branded (18%), 0 are exact-match keyword stuffing. Descriptive anchors ("n8n Cloud", "n8n 3.0 upgrade guide") appear only on Mataroa and WordPress in the sample.
- **Change:** In the next parasite round, use descriptive anchors ("n8n Cloud", "n8n 3.0 upgrade guide") on DevTo, Blogger, and Kit too, keeping 1–2 `/go/*` cloak links per post.
- **Expected effect:** More anchor signal from links that already exist, with no new links needed. No over-optimisation signal was found.

### B-W4 — `/go/*` cloaks take 12 of 28 sample links, each a two-hop redirect (308 to 307)

- **Problem:** `/go/*` cloaks are the largest single target group in the live sample: 12 of 28 instances. `/go/n8n` returns 308 to `/go/n8n/` then 307 to the n8n.io affiliate URL. `/go/n8n` appears twice per post by design (affiliate), but that means a large share of the link profile points at redirect pages rather than content pages.
- **Change:** Keep `/go/*` links to 1–2 per post; point the remaining links at the `/blog/*` canonical post. Check whether the trailing-slash hop can be removed at the source. Same redirect fix as P-F5; counted once in the action plan where they overlap.
- **Expected effect:** More of each post's links land on content pages, and the cloak itself takes one hop instead of two.

### B-W5 — WordPress.com and Kit posts are self-canonical, so 2 of 6 copies of each piece compete as separate URLs

- **Problem:** Live-verified 26 November: WordPress.com and Kit posts are self-canonical on the n8n-cloud and Screaming Frog posts. The link-back line is the only consolidation. Mataroa carries the link-back; verify WordPress and Kit do too on every piece.
- **Change:** Audit link-back lines on all WordPress and Kit posts; add where missing.
- **Expected effect:** Each parasite copy points readers and crawlers back to the main-site post even where the platform will not accept a canonical.

**T-M1 / S-6 note:** T-M1 and S-6 describe the same sitemap lastmod gap. They are listed once each above under their own IDs and counted once in the action plan.

---

## Low findings (22)

### T-L1 — OpenSEO info issues (7 total, 50-page slice)

- **Problem:** Heading levels skip on 3 pages: `/blog/ai-agents-now-buy-for-customers/`, `/blog/microsoft-agent-framework-pypi-malware/`, `/store/`. Meta description over 160 chars on 2 pages: `/partners/` (190), `/store/` (185). Title over 60 chars on 1 page: `/store/` (65, "Vault — Turnkey Platforms & Automation Blueprints | whoisalfaz.me").
- **Change:** Fix heading order (H1, then H2, then H3, no skips) on the 3 pages; trim the two descriptions to 70–160 chars; shorten the `/store/` title.
- **Expected effect:** Meta and heading basics match the limits search results display. These are info and warning issues, not ranking blocks.

### T-L2 — Stale internal link to a redirected category slug

- **Problem:** `/blog/` raw HTML links `/blog/category/learn-automation-in-30-days/`, which returns 308 to `https://whoisalfaz.me/blog/category/30-days-of-n8n-automation/`.
- **Change:** Point the link at the final URL.
- **Expected effect:** One less redirect hop for readers and crawlers following the blog index.

### T-L3 — `/go/*` affiliate redirects use 307 Temporary

- **Problem:** `/go/n8n/` returns 307 to `https://n8n.partnerlinks.io/ch585gsqzanp`; `/go/brevo/` returns 307 to `https://get.brevo.com/6b88c13841c4`. Single hop each. `/go/n8n` (no slash) returns 308 to `/go/n8n/`. Robots.txt disallows `/go/`, so there is no indexation risk. On the Brevo post, the 4 tool-stack card links carry `rel="noopener noreferrer sponsored"` — but the 3 prose `/go/brevo` anchors in the article body are bare, with no `rel` attribute at all (re-probed live 26 Nov; see C-F3, which is the correct reading).
- **Change:** None required if the 307 is deliberate (cloak destinations change). If a destination is permanent, a 301 is the cleaner signal. Leave as-is unless the owner wants the change.
- **Expected effect:** None claimed. This finding is recorded so the 307 choice is a deliberate decision, not an oversight.

### T-L4 — IndexNow not implemented

- **Problem:** No IndexNow key file found at the site root; `llms.txt` returns 200 (72 lines). No `Sitemap:` issue — robots.txt does declare `Sitemap: https://whoisalfaz.me/sitemap.xml`.
- **Change:** Optional. Add an IndexNow key and submit new or updated URLs to Bing if Bing traffic matters; Google does not use IndexNow.
- **Expected effect:** Faster Bing discovery of new posts, if Bing traffic matters. No effect on Google is claimed.

### T-L5 — `robots.txt` carries a `Host:` directive

- **Problem:** `Host: https://whoisalfaz.me` at the end of `robots.txt` (246 lines). It is Yandex-only and ignored by Google; harmless.
- **Change:** Remove it for cleanliness when robots.txt is next edited.
- **Expected effect:** None on rankings. Removes a directive only one search engine reads.

### C-F12 — Thin indexed pages: store, labs, contact

- **Problem:** OpenSEO full-page words: `/store/` 197 words — "VAULT // COMING SOON … Access is currently in private staging" — indexed and in the sitemap. `/labs/` 387, `/labs/roi/` 412, `/contact/` 484 words.
- **Change:** `noindex` `/store/` until it sells something, or add real copy; add 200–300 words of useful copy to `/labs/` and `/labs/roi/`.
- **Expected effect:** A "coming soon" page stops sitting in the index as a thin page, and the labs pages gain enough copy to stand as pages.

### C-F13 — Three of five service pages sit under the 800-word floor

- **Problem:** OpenSEO words: `/services/growth-consulting/` 680, `/services/headless-architecture/` 718, `/services/seo-organic-growth/` 785; `/services/n8n-automation/` 804, `/services/custom-full-stack/` 839. All have 5 H2s each and 5–9 internal blog links, but average sentence length 24–28 words.
- **Change:** Add one section per page (process, deliverables, or outcomes with a real example) and split long sentences.
- **Expected effect:** Service pages gain depth for readers weighing a $750-plus service, and the readability split in C-F9 narrows on the same pages.

### C-F14 — Freshness watchlist: deals expire within days, one event post has no date

- **Problem:** Brevo deal "window runs 23–30 November 2026" (code BREVOFRIDAY2026) — 4 days left at audit time, no post-expiry plan visible. CallHippo deal runs "through 5 December 2026". OpenAI Agent Builder "shuts down 30 November" (post dated 21 November). ManyChat Summit post (2026-09-10, 1,863 words) states no event date anywhere in its text and still shows ticket tiers ($20 / $50 / $299 / $699) — check whether the summit already happened and add an expiry note if so.
- **Change:** Add an "offer ends" line and a calendar job to update or retire each deal post the day after expiry; add the event date to the summit post or mark it past.
- **Expected effect:** Deal posts stop going stale silently. Same expiry handling as X-F8; counted once in the action plan where they overlap.

### C-F15 — AI citation readiness: good format, unsourced numbers

- **Problem:** Good format: Direct Answer blocks, FAQ sections (core update, CRAG SOP, CallHippo), clear definitions ("What X actually is" H2s on deal posts), dates on claims. Gaps: n8n 3.0 "37 removed nodes" with no link to n8n's release notes; Stripe fee math ($100 to $96.80) with no link to Stripe pricing — only the author's own fasttools.me calculator; "n8n Cloud costs $20/mo for 2,500 runs" with no link to n8n pricing; no quotable sourced statistics anywhere in the sample.
- **Change:** Source every number to its primary page at first mention; add a short "Key facts" box with dated, sourced figures to the top 10 posts.
- **Expected effect:** Numbers in the top posts become checkable at first mention, which is what AI citation needs. Same source fix as C-F1 and G-F2; counted once in the action plan where they overlap.

### S-8 — Service Offer prices are flat numbers with no qualifiers; truthfulness unverified

- **Problem:** `/services/n8n-automation/` Offer price `750` USD; `/services/seo-organic-growth/` `1500`; `/services/growth-consulting/` `200`; `/services/custom-full-stack/` `2500`; `/services/headless-architecture/` `1500`. Each Offer has price plus currency only — no `availability`, `url`, or `priceValidUntil`. `provider` is a Person, not the Organization. Whether these are fixed prices or "from" prices could not be verified from public sources.
- **Change:** Confirm each price with Sheriff or Draken; if they are starting prices, say so on the page and either drop the Offer price or mark it as a starting price; add `url` to each Offer.
- **Expected effect:** Offer markup stops stating flat prices that may be starting prices. Confidence note: price truthfulness is unverified — confirm before publishing any change.

### S-9 — Homepage FAQPage answers do not match visible copy verbatim

- **Problem:** On the homepage, 4 of 5 FAQ questions appear visibly, but 0 of 5 answers match visible text verbatim (60-char prefix check), and the schema question "What is a headless CMS?" differs from the visible "What is a headless CMS and how do I audit my technical SEO?".
- **Change:** Align the schema Q&A text word-for-word with the visible FAQ section.
- **Expected effect:** Homepage FAQ markup matches the page a reader sees, the same policy rule as S-1. This pairs with V-M3, which puts the answers in the served HTML.

### S-10 — Personal email in public Person schema on every page

- **Problem:** `"email": "a.m.rizve3905@gmail.com"` in the Person block on all 15 pages fetched.
- **Change:** Remove the personal email from schema (keep `contact@whoisalfaz.me` on the Organization contactPoint) unless Sheriff wants it public.
- **Expected effect:** A personal inbox stops being published in the site's public code on every page.

### P-F6 — `/_next/image/` responses are not browser-cached

- **Problem:** `Cache-Control: public, max-age=0, s-maxage=86400` — repeat visits re-download every optimized image; only the edge cache (1 day) helps.
- **Change:** Set `max-age=31536000, immutable` on `/_next/image/` responses (Next.js default is 60 s minimum; raise it via headers config) — safe because the URLs are content-hashed by width and quality.
- **Expected effect:** Repeat visits reuse optimized images from the browser cache instead of re-downloading them.

### P-F7 — PNG covers where WebP would be smaller

- **Problem:** Sampled Sanity covers at 1200×630 served as PNG (54.5 KB) alongside WebP and JPG versions of similar images (25 KB JPG sample).
- **Change:** Convert Sanity cover uploads to WebP at upload time, or request `fm=webp` from the Sanity image pipeline for PNG sources.
- **Expected effect:** Cover images get smaller with no visible change. Same image-pipeline fix as V-H1; counted once in the action plan where they overlap.

### V-L1 — 10px micro-text used heavily for tags and labels

- **Problem:** `text-[10px]` occurrences in served HTML: `/blog/` 529, homepage 56, services 16, blog post 50. `text-[11px]`: `/blog/` 232. Mostly uppercase bold tags and labels (for example `class="text-[10px] font-black uppercase … px-2.5 py-1 rounded-md"`), not body copy — body copy is 16px or more (`text-base`).
- **Change:** Raise tag and label text to at least 11–12px (`text-[11px]` or `text-xs`).
- **Expected effect:** Tags and labels get easier to read, in particular on small screens. Rendered contrast of 10px grey labels needs a real browser check.

### V-L2 — Text-only hero: no hero image or visual anchor above the fold

- **Problem:** Homepage hero is H1 plus paragraph plus 2 CTAs only; first content image is the case-study card below the fold.
- **Change:** Optional — add a small product or dashboard visual or the author portrait beside the hero copy on desktop. Verify in a real browser before and after; do not add a large unoptimized image (see the Sanity finding V-H1).
- **Expected effect:** The first screen gains a visual anchor. Optional; no effect is claimed, and the image must not undo the V-H1 fix.

### G-F6 — No WebMCP tools, no MCP endpoint, no agent discovery files

- **Problem:** `/mcp/` returns 404; `/api/mcp/` returns 405 with empty body; no `modelContext`, `registerTool`, or `webmcp` string in homepage HTML; `/.well-known/ai-catalog.json`, `agent-card.json`, `mcp`, `ucp`, `api-catalog`, `oauth-protected-resource`, `openid-configuration` all return 404.
- **Change:** None needed now. If agent booking of the audit or consultation is ever wanted, add one WebMCP tool bound to the existing contact-form handler, with human confirmation — do not add tools for their own sake.
- **Expected effect:** None claimed. The site has interactive tools (`/audit/` 200, `/labs/roi/` 200) but no transactions, so nothing here blocks agents today. WebMCP is optional per the skill (draft standard, only ChatGPT desktop calls tools by default).

### G-F7 — Newsletter email input has no label, only a placeholder

- **Problem:** Homepage form — 5 inputs, 0 `<label>`; the email input carries only `placeholder="Enter your work email address..."`, no `aria-label`. Same pattern on blog pages (2 inputs, 0 labels). The honeypot input is inside an `aria-hidden` div, so it is not a tree problem. Contact form is fine (4 labels, 1 textarea labelled); ROI calculator sliders have labels and aria-labels (3 labels, 4 aria-labels).
- **Change:** Add `aria-label="Work email address"` (or a visually hidden `<label>`) to the newsletter email input in the shared form component — one change fixes homepage plus all blog pages.
- **Expected effect:** The newsletter field is labelled for assistive tools instead of relying on placeholder text alone.

### G-F8 — Homepage and About carry no dates; some posts lead without a "What is X?" definition

- **Problem:** Homepage HTML has no `datePublished` or `dateModified`; `/about/` likewise. Blog posts that do carry dates are current (Brevo post: published and modified 2026-11-23; n8n-cloud-vs-self-hosted: 2026-11-16; PyPI malware post: 2026-11-24). What works: the n8n post opens with a quotable answer block — "Cloud costs $20 a month and caps you at 2,500 runs. Self-hosted costs about $5 a month for the server and caps you at nothing…" — and the malware post opens with a dated, specific claim (17 November). Both posts carry FAQPage schema (3 and 4 questions). Homepage carries FAQPage plus Person plus Organization schema.
- **Change:** Add a one-sentence "What is [topic]?" definition in the first 60 words of posts that lack one, and add `dateModified` to the homepage and About schema.
- **Expected effect:** Posts that lack a definition gain a quotable opening line, and the homepage and About page carry a date in schema.

### X-F9 — Category taxonomy has drifted from the sitemap; one tool page is unlisted

- **Problem:** Live post pages show 9 category chips; the sitemap lists 8 category URLs and omits `/blog/category/ai-lead-generation/` (returns 200, linked from `/blog/`). `/blog/category/learn-automation-in-30-days/` is NOT a missing live page — it returns 308 to `/blog/category/30-days-of-n8n-automation/` (re-probed live 26 Nov); only the stale link from `/blog/` needs fixing (see T-L2). `/labs/chat/` ("Alfaz AI Assistant", Labs) returns 200 and is linked in site nav, but is not in the sitemap. `/labs/roi/` (ROI calculator) is in the sitemap and works, but no blog post links to it in body text.
- **Change:** Regenerate the sitemap from the live category list, add `/labs/chat/` to it, and link the ROI calculator from agency and SaaS-ops posts. Note: `/labs/chat/` is `noindex, follow` — confirm the noindex choice before adding it to the sitemap; a noindex page does not belong in the sitemap.
- **Expected effect:** The sitemap matches the live category list instead of drifting from it. The `/labs/chat/` step needs a decision first — see the confidence note in the Change line.

### X-F10 — Persona gaps: freelancers have no entry point; founders have no low-friction next step

- **Problem:** Persona scores (relevance, clarity, trust, action, 25 points each, judged from live pages): Agency owner 62/100 — finds the n8n service page with $750 floor and timelines, agency business-model post, ROI calculator, 6 case studies, audit tool; missing an agency-specific package or pricing page and a "done-for-you" path from the ManyChat, WhatsApp, and outbound posts. SaaS founder 58/100 — finds the RevOps stack post, automation OS post, ROI calculator, audit tool, homepage "Book a free strategy call"; missing a founder-priced entry offer below the $750 service floor, and blog posts never route to the ROI calculator or the audit tool in body text. Freelancer 45/100 — finds deep free tutorials (n8n, RAG, ManyChat); missing everything priced for a freelancer — $750 is the floor everywhere, no template, course, or download lead magnet, no "start here" path for a solo operator.
- **Change:** Add one freelancer-priced entry (templates pack or paid audit) and link it from tutorial posts; add ROI-calculator and audit-tool links in body text on founder-facing posts.
- **Expected effect:** Freelancers and founders gain an entry point below the $750 floor instead of hitting the same service price on every path. These are judged persona scores, not measured conversion data.

### B-W6 — Homepage gets almost no direct links (1 bare link in the sample); Viberank points at `/audit/`, not the homepage

- **Problem:** Live sample: homepage gets 1 bare link (Hashnode empty-anchor link). Viberank points at `/audit/`, not the homepage.
- **Change:** One homepage link per directory submission (Viberank-style) is enough; do not redirect parasite links to the homepage — deep links are working as designed.
- **Expected effect:** The homepage gains a small number of direct links without breaking the deep-link pattern that already works.

## Info findings (2)

### S-11 — `<changefreq>` plus `<priority>` on all 136 sitemap entries; sitemap-index redirect

- **Problem:** Every `<url>` carries `<changefreq>` (weekly or monthly) and `<priority>` (1 or 0.8). Google ignores both. `https://whoisalfaz.me/sitemap-index.xml` returns 308 to `https://whoisalfaz.me/sitemap.xml`; it is not declared in robots.txt (only `sitemap.xml` is). Harmless.
- **Change:** Drop changefreq and priority at the next sitemap-template edit; no action needed on the redirect.
- **Expected effect:** None on rankings. Removes two fields Google ignores.

### S-12 — 14 posts share one identical lastmod

- **Problem:** 14 posts share `2026-07-26T21:45:00.000Z`; 10 share `2026-07-25T13:00:00.000Z`. Spot check: `/blog/automated-pdf-document-chunking-vectorization-n8n/` has datePublished equal to dateModified equal to 2026-07-26T21:45:00.000Z, matching its sitemap lastmod — consistent with a bulk publish, not a stale stamp. Newest lastmod in the file is 2026-11-25T12:49:20.319Z.
- **Change:** None, unless the bulk-publish timestamps are wrong; then correct dateModified plus lastmod together.
- **Expected effect:** None claimed. Recorded so the shared timestamps are read as a bulk publish, not as stale dates.

## Confidence notes

- Search Console numbers are in this report. See the "Search performance (GSC)" section above: 26 Oct–11 Nov 2,523 impressions at 148.4 per day, 12–24 Nov 2,694 at 207.2 per day, average position 17.8 → 14.7. Source: OpenSEO `get_search_console_performance` (free read, same first-party GSC data); the direct service-account pull returned 403 for this property.
- Backlinks have no numeric score. Common Crawl returned no data for this domain ("Domain not found in Common Crawl data", cc-main-2026-sep-oct-nov). The backlink counts that are stated are live-verified (9 checks, 26 November 2026) or agent-reported (task brief, sprint logbook, team sheet).
- No Lighthouse, PSI, or CrUX numbers exist from this pass. PSI returned "rate limit exceeded" on the shared keyless quota for mobile and desktop; no Google API key was available. All TTFB figures include about 0.65–0.90 s of VM egress and TLS overhead; the spread between pages and the repeat-run variance are real server and edge effects, not proxy noise.
- No screenshots were possible. The render and screenshot CLI is not set up in this VM (no venv, no Chromium). Visual findings come from live HTML and CSS only. Whether the `opacity:0` hero animates in on load, rendered contrast, horizontal overflow at 375px, tap-target spacing in the mobile menu, and real LCP and CLS numbers all need a real browser check.
- Certificate expiry could not be read from this VM — the egress proxy presents its own certificate and crt.sh timed out — so expiry is not verified here; check it in the dashboard or SSL Labs.
- The "In this Article" table of contents renders its label in server HTML but its section links are not plain anchors in the raw HTML — likely client-rendered. Needs a live-browser check before calling it broken or fine.
- Partners-page audience stats (68%, 85%, 50+) and About-page client metrics (40k impressions, $45,000 saved) are site claims this audit could not verify. Do not repeat them as verified facts.
- The Quora ban is from the user's record (2026-11-08), not re-verified live in this audit.
- The G-F1 edge 403 is behaviour toward unverified bot user-agents from a datacenter IP, not proof the real verified bots are blocked.
- Demand data was unavailable. OpenSEO credits were 0, no keyword volumes were pulled. GSC impressions and positions are in the GSC section above. Cluster sizes are by topic, not by search demand. SERP checks were two queries with the top 4 results each.
- Word counts: OpenSEO counts full-page words. The content specialist's article counts include about 200 words of in-article chrome (byline, newsletter box, tool-stack cards, CTA, related-post cards), so true body text is about article words minus 200.
- TLS certificate expiry, mobile rendering, and Core Web Vitals were not measured in this pass. See the limits above.

## How this report was made

- Generated by the OpenSEO SEO Audit skill, run by the report writer on November 26, 2026, from 8 specialist findings files in `~/workspace/mikey-team/whoisalfaz-audit/findings/`: technical.md (82/100), content.md (64/100), schema-sitemap.md (72/100), performance.md (62/100), visual.md (74/100), geo-agentic.md (68/100), sxo-cluster.md (61/100), backlinks.md (insufficient data).
- Tools: OpenSEO audit 26f52f47-6891-4aec-914c-e8ea0426d6e3 (50/50 pages, 7 issues); live curl and fetched page text on 2026-11-26 for every finding the specialists cite; Common Crawl graph check for backlinks (domain not found in cc-main-2026-sep-oct-nov).
- Verified: every finding above cites live evidence from the findings files — status codes, headers, canonical tags, JSON-LD blocks, sitemap entries, word counts, sentence lengths, link counts, and image tags fetched live on 2026-11-26. No finding in this report adds a claim beyond the findings files, except where a line is marked agent-reported or unverified.
- Not verified: Core Web Vitals, rendered-page behaviour, certificate expiry, partners-page audience stats, About-page client metrics, and the live state of the Quora ban. See the confidence notes above.
- Health score: computed from the 7 category scores with the weights in the arithmetic section above (Technical 22%, Content 23%, On-Page 20%, Schema 10%, Performance 10%, AI Search Readiness 10%, Images 5%). Backlinks carry no weight because no backlink score exists.
