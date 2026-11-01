# TempMail Project Guidelines: Modern Search Optimization Framework

**Target Asset:** `https://temp-mail10min.online`  
**Brand Identity:** TempMail10min  
**Core Framework:** 5 Layers of Search Optimization (SEO, AEO, GEO, AIO, SXO)  
**Mandate:** Every page, article, feature, code change, or UX enhancement MUST be evaluated and executed against all 5 layers before deployment.

---

## The 5-Layer Search Optimization Framework

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MODERN SEARCH FRAMEWORK: 5 LAYERS OF SEO                                               │
├─────────┬──────────────────────────┬─────────────────────────────┬─────────────────────┤
│ Layer   │ Primary Goal             │ Core Focus Areas            │ Key Success Metrics │
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────┤
│ 1. SEO  │ Get Crawled → Indexed →  │ Technical SEO, CWV, Topical │ Rankings, Organic   │
│         │ Ranked                   │ Authority, E-E-A-T, Schemas │ Traffic, Indexation │
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────┤
│ 2. AEO  │ Become the Direct Answer │ AI Overviews, Snippets,     │ Featured Snippets,  │
│         │                          │ Voice Search, PAA FAQs      │ Zero-Click Answers  │
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────┤
│ 3. GEO  │ Get Cited by ChatGPT,    │ Original Research, Data,    │ AI Citations,       │
│         │ Gemini, Claude, Perplex. │ Entity Consistency, Mentions│ AI Brand References │
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────┤
│ 4. AIO  │ Make Content AI-Friendly │ Semantic Entities, llms.txt,│ Entity Recognition, │
│         │ & Machine-Readable       │ Structured Data, Multimedia │ AI Engine Visibility│
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────┤
│ 5. SXO  │ Turn Visitors into Loyal │ Frictionless UX, Speed, CTAs│ Engagement, Tool    │
│         │ Tool Users & Revenue     │ Trust Badges, Readability   │ Use, Ad Impressions │
└─────────┴──────────────────────────┴─────────────────────────────┴─────────────────────┘
```

---

## Layer 1: Search Engine Optimization (SEO)
> **Goal:** Get Crawled &rarr; Indexed &rarr; Ranked by traditional search engines (Google, Bing, Yahoo).

### Mandatory Checklist for Any New Page or Content:
1. **Technical Health:**
   - Every page must return **HTTP 200 OK** directly. Zero broken links (404s) allowed in navigation, body, or sitemap.
   - Clean, canonical URL structure: Self-referential canonical `<link rel="canonical">` matching exact protocol and host.
   - Strict host canonicalization: `https://www.temp-mail10min.online` must 301-redirect to `https://temp-mail10min.online`.
2. **Topical Authority & Content Depth:**
   - Word count calibration: Minimum 1,400+ words for duration tool pages; 2,000+ words for pillar blog articles.
   - Pairwise content uniqueness: Under 5.0% 5-word sentence shingling between any two duration pages to eliminate doorway penalty risks.
3. **Core Web Vitals (CWV) & Performance:**
   - Largest Contentful Paint (LCP) < 2.5s; First Input Delay / INP < 200ms; Cumulative Layout Shift (CLS) = 0.
   - Explicit `width` and `height` attributes on all logo images and media to prevent layout shifts.
   - No render-blocking CSS/JS in `<head>`.
4. **Authentic E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):**
   - Verified author attribution (Alfaz Mahmud Rizve) and technical reviewer (MD Shawn) on all editorial guides.
   - Transparent testing methodology cards detailing real-world delivery benchmarks and blacklist tests.
   - Complete technical disclosure of RAM-only ephemeral storage and zero-log retention policies.
5. **Structured Data / Schema Markup:**
   - Valid JSON-LD `@graph` schema on every page without syntax errors or duplicate schema IDs.
   - Specific entity mapping: `WebApplication` on duration tools, `BlogPosting` on articles, `WebSite` & `Organization` on root.
6. **Sitemap & Crawl Management:**
   - All indexable pages immediately added to `sitemap.xml` with standard namespace and accurate `<lastmod>`.
   - Disallowed or private routes (`/login`, `/register`, `/password/reset`) explicitly tagged with `noindex, nofollow`.

---

## Layer 2: Answer Engine Optimization (AEO)
> **Goal:** Become the direct answer in Google AI Overviews, Featured Snippets, and Voice Search.

### Mandatory Checklist for Any New Page or Content:
1. **Direct-Answer Lead Blocks (The "45-Word Snippet Hook"):**
   - Every major heading (H2/H3) must be immediately followed by a concise, authoritative 40–50 word direct definition answering the query directly before expanding into detailed analysis.
2. **Featured Snippet Engineering:**
   - **Tabular Snippets:** Every comparison or review post MUST include responsive HTML comparison tables with clean `<th>` and `<td>` markup.
   - **Listicle / Process Snippets:** All workflows (e.g., "How to Use Disposable Email") MUST use semantic ordered lists (`<ol>`) or bulleted lists (`<ul>`) with bolded action verbs.
3. **Google AI Overviews & PAA FAQs:**
   - Include 4 to 8 targeted "People Also Ask" FAQ accordions on every page addressing real user search intent.
   - Synchronize all visible FAQs with a valid JSON-LD `FAQPage` schema.
4. **Conversational Natural Language:**
   - Format subheadings as natural conversational search queries: *"Why do websites reject temporary email addresses?"*, *"How long does a 15-minute email last?"*.

---

## Layer 3: Generative Engine Optimization (GEO)
> **Goal:** Get cited, referenced, and recommended by ChatGPT, Gemini, Perplexity, Claude, and Copilot.

### Mandatory Checklist for Any New Page or Content:
1. **Original Research & Empirical Data:**
   - Include verifiable, first-party testing data: e.g., delivery speed benchmarks, spam filter trigger thresholds, blacklist resistance percentages.
   - Avoid generic summaries; cite specific technical mechanisms (e.g., Greylisting 15-minute retry intervals, Postfix RAM queues).
2. **Entity Consistency Across the Web:**
   - Maintain uniform brand naming: **TempMail10min** (Domain: `temp-mail10min.online`).
   - Standardized service description: *"Free anonymous disposable email generator with customizable lifespans (5m to 30m) and zero-log RAM storage."*
3. **Structured Machine-Readable Artifacts:**
   - Accompany major guides with downloadable whitepapers, tables, or structured summaries (e.g. PDF whitepaper, cheatsheets).
4. **Third-Party Citations & Digital PR:**
   - Distribute open-source developer SDKs and syndication listings (FMHY, GitHub awesome-lists, SaaSHub, AlternativeTo).

---

## Layer 4: AI Optimization (AIO)
> **Goal:** Make content deeply understandable, indexable, and extractable by AI crawlers and LLM knowledge graphs.

### Mandatory Checklist for Any New Page or Content:
1. **Semantic NLP Entity Density:**
   - Integrate 25+ domain-specific semantic entities into every major piece of content (e.g., *SMTP handshake, MX record, reverse DNS, greylisting, OTP bypass, throwaway inbox, burner email, cryptographic deletion, RAM disk*).
2. **Machine-Readable Standards (`/llms.txt`):**
   - Host `/llms.txt` and `/llms-full.txt` at the domain root with curated markdown descriptions of all tools, API endpoints, and guides for AI web crawlers.
3. **Explicit AI Crawler Directives in `robots.txt`:**
   - Explicitly permit and manage AI crawlers: `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`.
4. **Knowledge Graph Grounding:**
   - Include Schema.org `about` and `mentions` arrays in JSON-LD referencing authoritative Wikidata and Wikipedia entities (e.g., `https://www.wikidata.org/wiki/Q256728` for Disposable Email).
5. **Multimedia Semantics:**
   - All images in modern `.webp` format with descriptive, keyword-rich `alt` text and descriptive file naming.

---

## Layer 5: Search Experience Optimization (SXO)
> **Goal:** Turn search visitors into active tool users, repeat visitors, and ad revenue.

### Mandatory Checklist for Any New Page or Content:
1. **Above-the-Fold Instant Utility:**
   - The core email generator tool MUST be immediately interactive above the fold on all device viewports.
   - Users should see their generated address and have 1-click clipboard copy without scrolling.
2. **Zero-Friction Conversion Funnel:**
   - No forced account creation, passwords, or captchas required to generate a temporary email.
   - Clear visual countdown timer showing exact seconds remaining before auto-destruction.
3. **Readability & Visual Hierarchy:**
   - Short, punchy paragraphs (maximum 2–3 sentences per block).
   - Strategic typography: High contrast, prominent callout boxes, feature cards, and visual badges.
   - Flesch Reading Ease score calibrated between 50 and 65 (clear, accessible English).
4. **Trust Signals & Privacy Assurance:**
   - Visible "100% Free & Anonymous", "Zero Logs", "RAM-Only Storage" trust badges next to action buttons.
   - Direct, working footer links to Privacy Policy and Terms of Service.
5. **Monetization & Ad Experience Safeguards:**
   - Ad placements must respect UX: Zero intrusive popups, zero interstitial blockers preventing inbox access.
   - Maintain CLS = 0 by reserving fixed CSS container heights for all auto-refreshing ad slots.
6. **Mobile Touch Target Standards:**
   - Minimum button touch targets of 48px × 48px with 8px spacing on mobile devices.
