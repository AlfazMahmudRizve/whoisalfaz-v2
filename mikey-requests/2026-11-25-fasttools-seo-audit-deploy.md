# FastTools SEO audit — branch ready for your review and deploy

Date: 25 November 2026
From: Mikey (coordinator, fasttools.me SEO audit)
To: Draken
Branch: `mikey/seo-audit-2026-11-25` in `AlfazMahmudRizve/fasttools`
Commit: `e09806eb0862a9cb9e367a1f733d9eeba1256efb` (pushed and verified live on the branch)
Report: https://app.openseo.so/p/d6811103-fc11-4300-bc4b-fa08c690dae4/reports/002b9051-5b0c-4cdf-9a8a-c620a5d023c4

## What I am asking

Please review this branch and deploy it. Sheriff's instruction on 25 Nov was to send the branch to you before deploying — you know the deploy path. (Mikey holds fasttools merge authority, but the deploy step goes through you per that instruction.)

## Audit verdict (one line)

Crawl is clean with no critical defects; impressions collapsed 99% on 12 Nov (about 170/day to about 1.6/day) with no proven cause — the fall coincides with the Google November 2026 core update rollout, which is a correlation, not a proven cause. The fixes below repair demonstrated gaps that hold the site back whenever visibility returns.

## Fixes on the branch (17 files)

**Freelance benchmarks (Recommendation 1)**
- NEW `src/components/tools/freelance/FreelanceBenchmarkTable.tsx` — sourced table: Junior $20–$50, Mid $40–$90, Senior $75–$150, Staff $120–$220 (Arc 2026 survey, 5,302 freelance developers); Upwork web-dev $15–$50, median $30; BLS May 2025 employed median $65.38/hr labelled as a salary anchor, not a freelance rate. Visible "Rates checked 25 Nov 2026" with named sources. Every figure verified live on 25 Nov; nothing invented.
- `src/app/freelance-rate-calculator/page.tsx` — table added above the SEO content.
- `src/app/freelance-rate-calculator/[slug]/page.tsx` — table rendered on the developer spoke only.
- `src/lib/freelance/spokes-data.ts` — developer FAQ corrected to the Arc bands (it previously asserted unsourced $40–$65 / $75–$110 / $120–$200+); take-home-pay description 162 → 141 chars.
- `src/app/stripe-fee-calculator/[slug]/page.tsx` — visible "Rates checked 25 Nov 2026: standard UK cards 1.5% + 20p" on the UK spoke only.

**On-page fix pass (Recommendation 2)**
- `src/app/page.tsx` — title 62 → 52 chars, description 211 → 138 chars (metadata + OG + Twitter); ItemList `numberOfItems` 7 → 8 with json-to-zod ListItem plus its SoftwareApplication node.
- `src/lib/home/faqs.ts` — FAQ "5 core tool hubs" → "8 core tool hubs", all 8 named.
- `src/components/home/HomeCuratedHub.tsx` — tool-card headings H3 → H2; TS card retitled to TypeScript-only; new standalone JSON-to-Zod card; Developer Ops filter count 2 → 3.
- `src/app/json-to-typescript/page.tsx` — title, description, H1, lead block now TypeScript-only; zero "Zod" mentions left on the page.
- `src/app/invoice-generator/page.tsx` — new page H1 "Free Invoice Generator & PDF Maker" + intro; title 75 → 46 chars in all 3 places; "Subtle" dropped.
- `src/components/tools/invoice/InvoicePaperCanvas.tsx` — paper document title ("INVOICE") demoted H1 → H2, so the page has exactly one H1.
- `src/app/crontab-generator/page.tsx` — "All 25 Cron Schedules" section listing every spoke in the hub body.
- `src/components/global/Sidebar.tsx` — all 16 missing cron spokes added (sidebar now lists hub + 25 spokes).
- `src/app/keyword-gap-analyzer/page.tsx` — title 64 → 52 chars, description 213 → 158 chars; also fixed one pre-existing lint error (unescaped quotes).
- `src/app/terms/page.tsx` — description 54 → 133 chars.
- `src/lib/fees/spokes-data.ts` — Australia title 68 → 60 chars.
- `src/lib/cron/spokes-data.ts` — every-day-at-1am description 162 → 143 chars.

**Deliberately left out:** the developer spoke `comparisonTable` scenario rates (the tool's own sample calculations, not market claims); `JsonToTsSeoContent` body copy still mentions Zod (scope was title/description/H1 only); homepage OG image alt still carries the old long title; regenerated `public/sitemap*.xml` (lastmod timestamps only) and `package.json`/`package-lock.json` excluded from the push. No changes to the six force-dynamic API routes, `next.config.ts`, or the invoice-for-shukhi/shuki dirs.

## Gate proof (honest, including the two failures)

- `npx tsc --noEmit` — PASS, exit 0.
- `npx vitest run` — PASS, 19 files, 236 tests, all passed.
- `npm run build` (plain, no flag) — PASS, exit 0, all pages prerendered. Built HTML verified: benchmark table + "Rates checked 25 Nov 2026" on developer spoke, hub and UK spoke; homepage `numberOfItems":8`, title 52 chars, description 138 chars; invoice H1 present; cron hub links all 25 unique spokes; sidebar lists 25 cron spokes; json-to-zod appears 8 times on the homepage.
- `npm run lint` — FAILS repo-wide at baseline, pre-existing: 67 errors / 1649 warnings in untouched files (API routes, invoice-for-shukhi, pdf-statement, etc.). The 17 changed files: 0 errors, 17 warnings (all pre-existing unused imports). I did not fix the rest — out of scope. Please confirm whether you want those 67 fixed separately.
- `NEXT_STATIC_EXPORT=true npm run build` — FAILS, pre-existing and expected: `export const dynamic = "force-static"... not configured on route "/api/agent/mcp" with "output: export"`. This is the known deployment-model issue (report Row 10): six API routes carry `force-dynamic` and cannot coexist with a static export. **Do not run a static-export build with these routes in place.**

## The decision I need from you (before you deploy)

Deployment model: keep live server Functions (leave the `NEXT_STATIC_EXPORT` flag unset, as the 6 Nov deploy did) or convert all six force-dynamic routes (keyword-gap, bank-statement, crontab, invoice, json-to-zod, mcp) before any static-export build? The repo build is `node scripts/generateSitemaps.mjs && next build` (package.json); what is still unknown is the deploy-time command and env flag used for the 6 Nov direct upload (dirty checkout, no build command stored in the Cloudflare project). Please confirm the reproducible deploy path when you deploy.

## Also on your plate (not this branch)

- www.fasttools.me serves the full site with no redirect to apex (canonical is the only consolidation). A 301 redirect rule is a one-line Cloudflare change; the audit recommends it but it is not in this branch.
- Duplicate DevTo posts for the 25 Nov Stripe piece (`-38c4` vs `-4j78`) — resolved 25 Nov: `-38c4` unpublished to draft, `-4j78` kept live. No action needed.
- MicroLaunch free submission and the free directory batch need Sheriff's Chrome sign-in; they are not code changes.

## Files for reference

- Audit report (saved in OpenSEO): https://app.openseo.so/p/d6811103-fc11-4300-bc4b-fa08c690dae4/reports/002b9051-5b0c-4cdf-9a8a-c620a5d023c4
- Shortlist: `~/workspace/mikey-team/seo-audit-2026-11-25/opportunities.md` (10 rows + appendix)
- Report draft (local copy): `~/workspace/mikey-team/seo-audit-2026-11-25/report-draft.html`
- Local working tree: `~/workspace/fasttools` (branch `mikey/seo-audit-2026-11-25`)
