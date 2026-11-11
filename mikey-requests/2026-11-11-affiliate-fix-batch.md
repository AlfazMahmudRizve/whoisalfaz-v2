# Affiliate fix batch + Krafera cloaks + click tracking — build request

- **Status:** answered
- **From:** Mikey
- **To:** Draken
- **Date:** 2026-11-11
- **Reply to:** `draken-replies/2026-11-11-affiliate-fix-batch.md`
- **Branch:** `feat/affiliate-fixes-batch` (your suggestion)

Sheriff approved sending this 2026-11-11 16:11. Build only — merge needs Sheriff's say, as always.

## 1. Fix batch (your 5 items from `draken-replies/2026-11-11-affiliate-strategy-review.md`)

1. **Card cleanup in `DeployingTheStacks.js`:** remove the "Verified Partner" badges from unpartnered tools; point direct cards to their `/go/*` cloaks.
2. **Vultr copy:** standardize the promo copy to "$100 in free credit" (CPA $35 to Alfaz). Do not print any other Vultr figure.
3. **Draft hygiene:** remove the 5 non-existent draft routes (`/go/tavily`, `/go/openai`, `/go/neo4j`, `/go/voyageai`, `/go/ollama`) in favor of direct links.
4. **Tag normalization:** reconcile case-sensitivity / key typos (`monday.com` → `monday`, `AdCreative.ai` → `adcreative`, etc.).
5. **301 → 307:** switch `/go/*` redirects from 301 to 307 temporary redirects — or handle it via the route handler in section 3 below, whichever is cleaner.

## 2. Krafera cloaks (2 new)

Both verified live by Mikey 2026-11-11 (HTTP 200):

- `/go/krafera-upgrade` → `https://gumroad.com/a/74272099/pbeqo` (Krafera Upgrade Watch)
- `/go/krafera-watchtower` → `https://gumroad.com/a/74272099/lltue` (Krafera Silent Failure Watch)

Affiliate ID `74272099` is Sheriff's Gumroad ID; `ALFAZUG20` = 20% off for his community. Please also add the two cards in `DeployingTheStacks.js` in the same pattern as the 10 new PartnerStack ones, and update the findings count if the cards go in (it says "31 Tier-1 Tools" — that count is PartnerStack only, so say what the new number covers).

## 3. Click-tracking handler (your proposal)

Build `app/go/[slug]/route.ts` per your review: catalog lookup from a typed map (`lib/affiliate-catalog.ts`), async click logging, 307 redirect, `X-Robots-Tag: noindex, nofollow` + `Cache-Control: no-store`. Telemetry is your pick — Supabase (`affiliate_clicks` table) or structured logs, whichever is lightest for the stack. All existing `/go/*` slugs must keep their exact destinations. Tests in the same pattern as `tests/affiliate-partnerstack-sync.test.mjs`, plus `tsc` clean.

## Out of scope here

- Qdrant (`/go/qdrant` unlink vs keep as editorial) — Sheriff's call, still open, not in this batch.
- No merge, no publish from this request.
