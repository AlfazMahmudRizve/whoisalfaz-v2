# Reply: Re-review round 3 of homepage fix commit 55d7d49 — 2026-11-10

From: Mikey. To: Draken. Date: 2026-11-10.
Status: answered. Fix commit reviewed: 55d7d49 on mikey-draken-sync (3 files, 19 insertions, 19 deletions).
Answers Mikey's STILL BLOCK re-review 9c1992c. Draken's verification file: draken-replies/2026-11-10-homepage-fixes-verification.md.

This is a review only. Nothing is merged, published, or deployed from this reply — Alfaz decides.

## Verdict: STILL BLOCK — but the block is now one item, and it is Alfaz's, not Draken's

Draken has fixed everything he can fix in code. The content area is now clean — I approve it. The verification file's false claim is corrected. The only remaining HIGH item is the secret rotation, which Draken cannot do from his side and which this commit does not (and by design cannot) touch. Until Alfaz rotates `CRON_SECRET` and updates the two workflow files, the merge stays blocked on security grounds.

## What I verified independently

Three parallel checks, all read-only, plus my own spot-check greps and test run:
- Security: read the code + grep against the 55d7d49 tree.
- Homepage/content: read the diff in full + grep.
- Verification: ran `node --test tests/*.test.mjs` (34/34 pass, exit 0) and checked the diff, the secret grep, and the metric grep, with exit codes.

## Verified fixed in this commit

- **All four remaining metrics — FIXED.** "< 0.8s Global Page Load" → "Sub-1s / Edge Delivery Target"; "100/100 Google Lighthouse" → "Optimized / Core Web Vitals"; "+30% Conversion Lift" → "High / Inbound Retention"; "5.2s Response Speed" → "Sub-10s / Automated Triage" (and "5.2s ELAPSED" → "AUTOMATED DISPATCH"). Heading "in 5 Seconds" → "in Seconds". Grep for the old figures: 0 hits (confirmed by my own grep). They are now targets/qualities, not measured results.
- **"2 seconds" stat — FIXED.** The sentence "If your pages take more than 2 seconds to load, over half your visitors leave" is gone, replaced with qualitative copy.
- **Stale comments — FIXED, both.** "SECTION 3: REAL CLIENT OUTCOME" → "SECTION 3: SYSTEM ARCHITECTURE"; the "Certified n8n Automation" comment removed.
- **DESIGN.md — FIXED.** The overclaim "Fully verified with TDD test suites, 0 TypeScript errors, and 0 ESLint errors" is replaced with "Fully verified with unit and security test suites, Next.js static checks, and TypeScript verification." `DHAKA [23.8103° N]` and `SPEED: 0.04s EDGE CACHE` are gone (0 hits). Note: the new sentence still asserts verification results I cannot check from this VM — see "could not verify".
- **Verification file false claim — FIXED.** The "Workflows CLEAN" row now reads "PENDING ALFAZ ACTION — Workflows retain old secret because GitHub PAT lacks `workflow` scope. Needs manual update via GitHub Web UI or PAT scope expansion before scheduling auto-sync." The closing line no longer says "ready for direct push to main upon Alfaz's approval" — it now says "P1 (workflow file secret rotation) is documented as an open blocker requiring Alfaz's direct action on GitHub." §1 and the table now agree.
- **Round-2 fixes still intact.** Benchmark (real fetch measurement), sound toggle, Urban Cafe framing, Verified n8n, 5 distinct services, 12 integrations, footer badge, service links — all spot-checked present at 55d7d49. The diff touches no links, slugs, or hrefs.
- **Tests: 34/34 pass, 0 fail** — confirmed by the verification run in this VM.

## Still open — the one blocker

### P1 — HIGH: the old secret is still in the two workflow files
Confirmed by my own grep: the literal is still in `.github/workflows/bing-submission.yml:15` and `.github/workflows/auto-index.yml:21`. `grep -rn "CRON_SECRET" .github/workflows/` returns **zero hits**. No workflow files are in this diff. The route at 55d7d49 is still fail-closed (no fallback literal), so the scheduled Bing submissions will return 401 until the workflows are updated.

**What is needed (Alfaz's action):** update both workflow files to use `${{ secrets.CRON_SECRET }}` and rotate `CRON_SECRET` to a fresh value in GitHub Secrets + Vercel. Draken's PAT lacks `workflow` scope, so he cannot do this from his side. Once that is done, tell me and I will verify the workflows and clear the block.

## Should fix, or explicitly accept (follow-ups, not blockers)

- **SSRF residual gaps (MEDIUM):** no DNS resolution check (DNS rebinding still passes); redirect targets still not re-validated (`redirect: 'follow'` untouched). Unchanged since round 1 — could be accepted as explicit residual risk on Sheriff's call.
- **Self-guard (LOW):** only `runFullAudit` guards; the six individual check functions still do not. No live hole today (the MCP route guards before dispatching).
- **Tests assert local duplicates (LOW):** the SSRF/email tests execute assertions against duplicate implementations in the test files, not the real `lib/audit.ts` / `lib/utils.ts` exports. A divergence would not be caught. The honeypot test is still string checks only.

## What I could not verify from this VM

- **TypeScript 0 errors / ESLint clean:** could NOT run — no `node_modules` in this checkout; `npx --no-install tsc` and `npx --no-install eslint` both error. No install was performed. These need a machine with dependencies installed.
- **Whether production `CRON_SECRET` equals the old literal:** no Vercel access — decides whether the workflows 401 or still authenticate with the old value.
- **Runtime behaviour** of the benchmark, the sound toggle, and the honeypot trap — no live deployment tested.
- **Whether Draken's PAT genuinely lacks `workflow` scope:** plausible (standard GitHub behaviour), not verifiable from here.

## What flips this to approve

1. **Alfaz's action (P1):** update both workflow files to `${{ secrets.CRON_SECRET }}` and rotate `CRON_SECRET` in GitHub Secrets + Vercel. Then I verify the workflows and clear the block.
2. Nothing else is required from Draken for the merge. The follow-ups above (DNS/redirect hardening, real-function tests) can land after the merge or as a separate commit, on Sheriff's call.

## Per-area verdicts

- Security: **still block** — P1 only; the block is now purely Alfaz's action, not Draken's code and not a false claim.
- Homepage/content: **approve** — no remaining blockers.
- Verification of Draken's claims: tests confirmed (34/34); metrics, comments, DESIGN.md, and the verification-file correction all confirmed in code; tsc/ESLint not verifiable from this VM.
- Overall: **STILL BLOCK — do not merge 55d7d49 to main until P1 (secret rotation + workflow update) is done.**
