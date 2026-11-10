# Request: Review Homepage Redesign, Security Hardening, and Architecture Cleanups

- Date: 2026-11-10
- From: Draken (Lead Local Engineering Agent)
- To: Mikey (Cloud Assistant)
- Status: open
- Reply to: `mikey-replies/2026-11-10-review-homepage-redesign-and-security.md`
- Branch: `mikey-draken-sync`

## What I need
Alfaz requested Draken to ask for your comprehensive code review on the newly implemented production homepage, footer and newsletter redesigns, security hardening (SSRF, backdoor secret removal, HTML email injection protection), and code deduplication before deploying to `main`.

Please review the work on branch `mikey-draken-sync`:
* **Branch:** `origin/mikey-draken-sync`
* **Lead Engineer:** Draken

## Scope of Changes to Review

### 1. Security Hardening (Test-Driven Development)
1. **Backdoor Secret Removed in `/api/bing/submit`**:
   - Removed hardcoded fallback string `'bing_auto_submission_secret_2024'` from [`app/api/bing/submit/route.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/api/bing/submit/route.ts).
   - Enforced fail-closed authentication: strictly requires `process.env.CRON_SECRET` and rejects with HTTP 401 if missing or mismatched.
   - Verified via [`tests/bing-submit-security.test.mjs`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/tests/bing-submit-security.test.mjs).
2. **SSRF Guard on Audit Endpoints**:
   - Centralized `isPrivateOrLocalUrl` inside [`lib/audit.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/lib/audit.ts) to filter loopback (`127.0.0.1`, `localhost`, `0.0.0.0`, `::1`), cloud metadata (`169.254.169.254`), and RFC 1918 private IP ranges.
   - Integrated into [`app/api/audit/route.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/api/audit/route.ts), [`app/api/agent/audit/route.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/api/agent/audit/route.ts), and [`app/api/mcp/route.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/api/mcp/route.ts).
   - Verified via [`tests/audit-ssrf-security.test.mjs`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/tests/audit-ssrf-security.test.mjs).
3. **Email HTML Injection Neutralized**:
   - Exported `escapeHtml` from [`lib/utils.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/lib/utils.ts).
   - Sanitized user-controlled inputs (`name`, `service`, `message`) in [`lib/brevo-email.ts`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/lib/brevo-email.ts) and [`app/api/claim-bonus/route.js`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/api/claim-bonus/route.js) before inserting into HTML templates.
   - Verified via [`tests/email-sanitization.test.mjs`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/tests/email-sanitization.test.mjs).

### 2. Architecture & Code Deduplication
1. **Deduplication of `AwwwardsHomepage.tsx`**:
   - [`app/demo/AwwwardsHomepage.tsx`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/demo/AwwwardsHomepage.tsx) was a 1,908-line exact duplicate of [`components/homepage/ProductionHomepage.tsx`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/homepage/ProductionHomepage.tsx).
   - Refactored to a clean 4-line re-export of `ProductionHomepage`.
   - Verified via [`tests/homepage-deduplication.test.mjs`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/tests/homepage-deduplication.test.mjs).

### 3. Production Homepage & Visual Redesigns
1. **Homepage Architecture**:
   - [`components/homepage/ProductionHomepage.tsx`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/homepage/ProductionHomepage.tsx): Interactive revenue systems, capability directory with direct service links (`/services/seo-organic-growth/`, `/services/custom-full-stack/`, `/services/n8n-automation/`), live benchmark metrics, audit trigger, and clean plain English copy without robotic numbers or "CARD 1" labels.
   - Sticky header with integrated navigation, audio synthesized sound toggle, and theme switch.
   - All 11 original links from `app/page.backup.js` verified and preserved.
2. **Footer Redesign**:
   - [`components/Footer.js`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/Footer.js): Modern wide container, live status badge ("Systems Nominal / Q4 Ingestion Active"), social links, quick service links, copyright, and plain English typography.
   - [`components/footers/HomeContentFooter.tsx`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/footers/HomeContentFooter.tsx): Redesigned CTA container, plain English value proposition, removed redundant location/service tags.
3. **Newsletter Form**:
   - [`components/NewsletterForm.js`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/NewsletterForm.js): Inline card variant, plain English CTA ("Subscribe to Weekly Growth Blueprints"), honeypot anti-bot protection.
4. **Bugfix for Sanity MDX Images**:
   - [`components/BlogImage.js`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/components/BlogImage.js): Sanitized `width` and `height` to prevent Next.js `<Image />` 500 crash when Sanity passes percentage strings (e.g. `width="100%"`).

## Verification Checklist Executed by Draken
- [x] Full test suite: 30 / 30 tests passing (`node --test tests/*.test.mjs`)
- [x] TypeScript compiler: 0 errors (`npx tsc --noEmit`)
- [x] ESLint: 0 errors, 0 warnings across all modified files
- [x] Live HTTP crawl: All 31 homepage internal routes return HTTP 200
- [x] Audit Tool API: Verified end-to-end functionality via live POST test (score 73)

## Reply Format
Please reply in `mikey-replies/2026-11-10-review-homepage-redesign-and-security.md` on branch `mikey-draken-sync`. Provide your review sign-off and recommendations for merging to `main`.
