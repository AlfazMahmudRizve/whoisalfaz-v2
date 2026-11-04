# Note for Alfaz's local agent — verify and build for production

To: Alfaz's local / main agent
From: Mikey (Muse, cloud assistant)
Date: 2026-11-04
For: Alfaz Mahmud Rizve — whoisalfaz.me service commercial pages

Please verify this work before you build it for production. Do not merge
on Mikey's say-so. Alfaz reviews and merges. Mikey does not merge.

## 1. Where the work is

Repo: AlfazMahmudRizve/whoisalfaz-v2
Branch: mikey/service-commercial-pages
Base: main at 9cbb93cd58cec37ed07e8c8eff5b3355c1ba070a
Commits on this branch, in order:
- 7580ea554376234ad6354676892afde39f43e5bc — 6 drafts, verified starting prices, no publish
- de2d520ae2b596cd65208b651cce5085da1160c0 — websites page priced at $2,500

Branch folder:
mikey-service-pages-drafts/
- README.md
- n8n-automation.md — starting at $750
- seo-organic-growth.md — starting at $1,500
- custom-full-stack.md — starting at $2,500
- headless-architecture.md — starting at $1,500
- growth-consulting.md — $200/hr
- websites-nextjs.md — NEW, starting at $2,500

No PR is open for this branch as of this note. Nothing is merged.
Nothing is published. The live site is unchanged.

## 2. What Mikey did, and what Mikey did NOT do

Did:
- Audited the 5 live service routes in the sitemap on 2026-11-04. Each live
  page was about 3 paragraphs, with no who-it-is-for, deliverables, process,
  price, timeline, service FAQ, or service CTA on the page itself.
- Wrote one commercial draft per service, plus one new websites draft, in
  the same structure: who it is for, problem, deliverables, 4-step process,
  what the buyer must provide, timeline, price, 4-question FAQ, CTA to
  /contact/.
- Took prices from the /services/ list and confirmed them in repo code:
  app/services/page.js and lib/serviceData.js. See section 4.
- Ran a banned-words check. Zero matches for: comprehensive, innovative,
  transformative, revolutionary, leverage, utilize, robust, seamless,
  holistic, landscape, crucial, pivotal.
- Labelled VibeViso and FlowerShop work as SEO work only, not site building,
  and labelled the 40,000+ impressions and 679 pages figures as
  self-published, not independently verified.
- Reviewed the drafts as an SEO expert on 2026-11-04. Full review is in the
  file Alfaz received separately: service-pages-seo-review-2026-11-04.txt.
  It is not on this branch unless you add it.

Did NOT do:
- No code change to lib/serviceData.js, app/services/, or any live route.
- No Sanity edit, no direct edit to a live page.
- No merge, no deploy, no DNS, no Vercel, no Cloudflare change.
- No timeline, payment terms, timezone, or package tiers invented.
  Timeline is TODO on all 6 drafts, deferred by Alfaz on 2026-11-04.
- No ranking, traffic, Search Console, or GA4 numbers reported. OpenSEO /
  GSC / GA4 live reads remain unverified, so none are used here.

## 3. Verify first — checklist

Run these checks on the branch before you build. Report the output, exit
codes, and any failure to Alfaz. Do not declare it verified without them.

1. Fetch and check the branch head:
   git fetch origin mikey/service-commercial-pages
   git log --oneline origin/mikey/service-commercial-pages -5
   Confirm the head is de2d520ae2b596cd65208b651cce5085da1160c0, or a later
   commit you have reviewed. If the head differs, stop and reconcile before
   building.

2. Diff against main, files only:
   git diff --stat main...mikey/service-commercial-pages
   Expected: only mikey-service-pages-drafts/ files. No other file should
   be changed. If any other file appears, stop and ask Alfaz.

3. Prices — check every draft price against lib/serviceData.js and
   app/services/page.js on main:
   - n8n-automation: $750
   - headless-architecture: $1,500
   - growth-consulting: $200/hr
   - seo-organic-growth: $1,500
   - custom-full-stack: $2,500
   - websites-nextjs: $2,500, applied from custom-full-stack, because a
     Next.js website build is Custom Full-Stack work. This was confirmed
     by Alfaz on 2026-11-04. There is no separate websites price in
     lib/serviceData.js or on /services/.
   Do NOT use the $1,500-$5,000/mo range from the /services/ FAQ as a
   service price. It is general agency pricing information only.

4. Claims — check these lines by hand, do not trust Mikey's summary:
   - seo-organic-growth.md: VibeViso and FlowerShop are SEO work, not
     built sites. 40,000+ impressions and 679 pages are self-published,
     no date range, source, or client detail added.
   - websites-nextjs.md: own built work is whoisalfaz.me and fasttools.me
     only. Portfolio demos are showcase work, not paying clients, per
     Alfaz's 2026-11-01 project classification.
   - No draft promises a ranking, traffic, or impression result. No draft
     adds a testimonial, client name, or invented result.
   - No banned words (list in section 2). Re-run the grep on the branch
     copy before you build.

5. Overlap — websites vs custom-full-stack vs headless:
   - websites-nextjs = marketing / company website.
   - custom-full-stack = app, portal, dashboard, data pipeline.
   - headless-architecture = infrastructure, edge caching, Core Web Vitals.
   If the converted titles or first paragraphs blur those three, fix the
   copy before publishing, or the pages will cannibalise each other at
   the same $2,500 starting price for websites and custom-full-stack.

## 4. Build for production — decisions you need from Alfaz first

Do not guess these. Get them from Alfaz in writing before you publish:

a. Timeline for each of the 6 services. Currently TODO on all 6.
   Do not copy a timeline from another service.
b. Payment terms. Not stated in any draft. Do not invent them.
c. Timezone / working hours. Not stated in any draft.
d. Websites route. No live route exists. Decide it first, for example
   /services/websites-nextjs/ or another slug Alfaz chooses, then set its
   canonical to that exact route. Do not publish under two slugs.
e. Whether to open a PR for this branch, or to build the live pages
   directly from the drafts in your own branch. Mikey left this as branch
   only, per Alfaz. If you open a PR, Alfaz reviews and merges it.

## 5. Conversion — how to turn drafts into live pages

The drafts are markdown review copies. They are NOT publishable as-is.
Live service pages in this repo are code-driven:

- Data: lib/serviceData.js
- Page: app/services/[slug]/page.js
- Index: app/services/page.js

On conversion, for each of the 5 existing services:
1. Put the draft copy into the service data / page code for that slug,
   keeping the price in section 3 exactly in sync with lib/serviceData.js.
   The slug page already renders "Starting at <price>" and Service schema
   from that file. If draft price and serviceData price disagree, the page
   copy and the schema will disagree. Fix that before publishing.
2. Add a unique meta title and meta description per page. The drafts have
   no meta fields. Do not copy one description across pages.
3. Keep canonical at https://whoisalfaz.me/services/<slug>/ for the 5
   existing services, as already set in the slug page code.
4. Add FAQPage schema for the 4 FAQs on each page. The slug page currently
   outputs Service schema only, no FAQPage schema.
5. Add 2-3 relevant internal links per page, for example to /portfolio/,
   /case-studies/, /audit/, or a relevant blog post. Most drafts link only
   to /services/ and /contact/ today.
6. For websites-nextjs, create its serviceData entry and route only after
   decision (d) above, then do steps 1-5 for it, and add it to the sitemap
   only after the route is live.

Do NOT touch:
- lib/audit.ts
- lib/audit-email.ts
- Pricing / plan IDs or checkout links in data/vaultWorkflows.ts
- Root proxy.ts
- TempMail, FlowerShop, Xprt2nd, or Vibe Viso code. Alfaz's work on those
  sites was SEO only. He did not build them. Do not present him as their
  builder on any new page.

## 6. Build and post-build verification

1. Build locally / in your usual pipeline and record the exit code.
   If the build fails, stop, report the failure and the log to Alfaz,
   and do not deploy.
2. After a staging or production deploy, check with curl / browser:
   - Each of the 5 existing routes returns HTTP 200, and the new websites
     route returns HTTP 200 only if it was decided and built.
   - Canonical on each page matches its own URL.
   - Service schema price matches the draft price in section 3.
   - FAQPage schema is present and valid for the 4 FAQs.
   - No page links to a 404. Check /contact/, /portfolio/, and any new
     internal links you added.
   - Sitemap lists the new websites route only after it is live, and
     lists no route that 404s.
3. Send Alfaz the build log, the deploy URL or commit, and the check
   results above. That is the proof for merge, not this note.

## 7. If anything above does not check out

Stop that page, not necessarily the whole set. Report the exact file,
line, and conflicting source to Alfaz, and wait for his correction.
Do not fix a price, timeline, claim, or route by guessing, and do not
publish a page with a TODO-Alfaz line still in it.

— End of note. Questions go to Alfaz first, not to Mikey's branch.
