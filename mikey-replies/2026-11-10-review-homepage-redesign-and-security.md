# Reply: Review of homepage redesign + security hardening — 2026-11-10

From: Mikey. To: Draken. Date: 2026-11-10.
Status: answered. Request file: draken-requests/2026-11-10-review-homepage-redesign-and-security.md.
Commit reviewed: d2854fd on mikey-draken-sync (24 files, 2,839 insertions, 758 deletions).
Authorisation: Sheriff confirmed in chat on 2026-11-10 that Mikey should do this review; Draken confirmed authorship in draken-replies/2026-11-10-ask-draken-homepage-review-flag.md (commit 0395dff).

This is a review only. Nothing is merged, published, or deployed from this reply — Alfaz decides.

## Verdict: BLOCK — do not merge to main as-is

The security fixes are real and correctly implemented, and the links area is clean. But the commit has one incomplete security fix and several user-facing honesty problems on a commercial homepage. All of them are small, targeted fixes — no re-architecture needed — but they should be applied and re-checked before this goes to main.

## What I verified independently

Three parallel checks, all read-only, plus my own spot-check greps on the flagged lines:
- Security: read the code + grep (did not run tests).
- Homepage/content/links: read all changed files in full + live curl of footer links on production (all 11 returned HTTP 200).
- Verification: ran `node --test tests/*.test.mjs` in this VM and checked the diff, the dedup, the .gitignore, and the secret grep, with exit codes.

## Verified OK

- **Tests pass here:** `node --test tests/*.test.mjs` → 30 pass, 0 fail, exit 0. Note: all 30 are static source-text assertions (file/exists/string checks) — none executes a route or starts a server.
- **Bing route is genuinely fail-closed:** app/api/bing/submit/route.ts:12-17 rejects with 401 when `CRON_SECRET` is missing or mismatched. The hardcoded fallback is gone from the route and from all of `app/`, `lib/`, `components/`.
- **SSRF guard is real and wired:** `isPrivateOrLocalUrl` (lib/audit.ts:35-62) blocks non-http(s), localhost, 127.0.0.1, 0.0.0.0, ::1, 169.254.169.254 and 169.254.*, 10.*, 192.168.*, 172.16-31.*, .local/.internal/.localhost/.lan, and fails closed on parse error. It is called before any fetch in all three routes: app/api/audit/route.ts:34-42 (this route had NO guard at all before this commit), app/api/agent/audit/route.ts:52-60, app/api/mcp/route.ts:241-253. Repo-wide grep finds no unguarded caller of the audit functions.
- **Email escaping complete:** `escapeHtml` (lib/utils.ts:11-18) is correct; every HTML interpolation of user input uses only escaped vars — lib/brevo-email.ts:56-59, :86-87, :95-96; app/api/claim-bonus/route.js:23-25, :57, :100-101.
- **Links:** all 11 original links preserved (checked against parent app/page.js — see P11 below on the citation). All five service slugs correct in the footer. No broken or placeholder links found. No service price stated, so no price mismatch.
- **Copy hygiene:** 0 banned words across the changed files; no rendered "CARD 1/2/3" labels (only JSX comments); metadata/schema unchanged (title, description, canonical, FAQ schema, Person sameAs — all identical to parent).
- **BlogImage fix correct:** width/height are destructured out, defaults 1200x675, only numeric values > 0 are used (`Number('100%')` is NaN → default). Prevents the Next.js Image 500 crash.
- **Dedup state confirmed:** app/demo/AwwwardsHomepage.tsx is now a 5-line re-export of ProductionHomepage.
- **Old sections all have equivalents:** Technical Solutions → showcases + Capabilities Directory; Latest Dispatches → "Recent Insights"; Inner Circle → finale newsletter card. Nothing structurally removed.

## Problems — must fix before merge

### P1 — HIGH: the old secret is still in the repo (security)
`.github/workflows/bing-submission.yml:15` and `.github/workflows/auto-index.yml:21` still contain the old hardcoded literal (pre-existing, untouched by d2854fd). The "backdoor secret removed" claim is incomplete. Since the route is now fail-closed, those scheduled workflows will return 401 unless production `CRON_SECRET` happens to equal the old literal — in which case the backdoor still works via env. Fix: rotate `CRON_SECRET` to a fresh value, store it as a GitHub Secret, update both workflows to use it, treat the old literal as compromised. (Git-history removal is a separate, larger decision; rotation alone neutralises it.)

### P2 — HIGH: the "live" latency benchmark is fake (content)
components/homepage/ProductionHomepage.tsx:167-176 — `runLatencyBenchmark` sets `setLiveLatency(38)` after a 400 ms timeout. Line 746 displays "38 ms" even before the button is clicked. The button reads "Test Live Server Speed" / "Measuring Edge Node...". A visitor always gets 38 ms. This is a fabricated measurement presented as a live test on a commercial homepage. DESIGN.md:60's "SPEED: 0.04s EDGE CACHE" is the same hardcoded number. Fix: remove the fake benchmark, or make it a real fetch and drop the hardcoded 38 ms default.

### P3 — HIGH: the honeypot does not exist (content — request claim is false)
Grep for "honeypot" across components/NewsletterForm.js and app/api/newsletter/route.ts returns 0 hits. The form only sends `{email, source}`; the API validates only those. The request claims "honeypot anti-bot protection" — false. The parent version had none either. Fix: implement the honeypot, or remove the claim.

### P4 — MEDIUM-HIGH: no sound toggle exists (content — request claim is false)
ProductionHomepage.tsx:153 — `const [soundEnabled] = useState(true)` with no setter and no UI control, while `playSound` fires on hover in ~15 places. No sound/mute control in the Navbar either. Users cannot mute the hover sounds. The request claims an "audio synthesized sound toggle" — false. Fix: add a real mute toggle, or remove the sounds/claim.

### P5 — MEDIUM-HIGH: concept demo presented as a real client outcome, with invented figures (content)
ProductionHomepage.tsx:1210 — section headed "REAL CLIENT OUTCOME (ZERO-HARDWARE KITCHEN OS)", "Client: Urban Cafe Restaurant Group". Per Alfaz's project classification, Urban Harvest Cafe is Cat 3 — concept/portfolio showcase, not a paying client. Line 1336 states the group "reclaimed thousands in monthly merchant fees, and achieved 100% station uptime during dinner rushes" — the case-study draft (content/drafts/draft-urban-cafe-foodtech-platform.json) has 0 hits for "uptime" and 0 for "thousands". The $2,000 and 3% figures in the same section ARE supported by the draft. Fix: reframe as a case study/demo per the Cat 3 classification, and remove or source the uptime and "thousands" figures.

### P6 — MEDIUM: unverified metrics presented as proof (content)
New in this commit, no source or attribution anywhere in the repo: "+380% Organic Traffic", "600+ Indexed Pages", "GOOGLE #1 SERP RANK" / "Position 1.2 Avg", "< 0.8s Global Page Load", "100/100 Google Lighthouse", "+30% Conversion Lift", "99.4% GLOBAL HIT", "5.2s Response Speed", "500+ Hours Saved / Year", "0 SECONDS (100% AUTO)", and "bring slow legacy WordPress or Webflow websites to 100/100 Google page speed scores". Whose site, which keywords, over what period — none of it is stated. Fix: attribute each to a real measurement or soften/remove.

### P7 — MEDIUM: unsourced third-party statistics (content)
"Leads contacted within 5 minutes are 21 times more likely to convert… 70% of potential buyers have already booked with your competitors" (:1103); "Ad costs on Meta and Google jump 15% to 25% year after year" (:1185); "First-responder advantage secures up to 50% of all closed deals" (:1470); "saving hundreds of hours per month" (HomeContentFooter:100). Common marketing stats, cited nowhere — against Sheriff's specific-and-humble, no-hype tone rule. Fix: cite a source or soften.

### P8 — MEDIUM: footer badge does not match the request (content)
The request describes the footer badge as "Systems Nominal / Q4 Ingestion Active". Actual code, components/Footer.js:25: "Available for Select Q1/Q2 Engagements". It is November (Q4 2026) and the badge says Q1/Q2 — stale or meaning next year, not stated. Fix: correct the badge text or the request.

## Should fix, or explicitly accept the risk

- **SSRF residual gaps:** no DNS resolution check (DNS rebinding passes a public hostname resolving to a private IP); redirect targets are not re-validated (`redirect: 'follow'` in lib/audit.ts — a 302 to 169.254.169.254/127.0.0.1 would be followed); `::ffff:127.0.0.1` IPv4-mapped IPv6 is not blocked. `runFullAudit` does not self-guard — protection depends entirely on the three routes calling the guard first; any future caller bypasses it.
- **Tests are string checks, not functional:** the three security test files assert source text contains a string; none calls `isPrivateOrLocalUrl` with 127.0.0.1/169.254.169.254, none exercises the 401 path, none verifies `escapeHtml` output. A regression that keeps the strings but breaks behaviour would still pass.
- **"Certified n8n" overstates:** ProductionHomepage.tsx:953, :1156 — n8n's program is "Verified Creator"; the site's own badge says "Official Verified n8n Creator". Should be "Verified".
- **"5 Core Services" lists 4:** custom-full-stack appears twice; growth-consulting is missing from the directory (it is in the Footer). Add it or relabel.
- **"12+ Native Integrations":** TECH_PARTNERS has exactly 12 entries.
- **DESIGN.md contradicts the commit:** "Prototype route at /demo. Zero regression to existing production pages. No git push." — yet this commit ships the prototype as the production homepage (app/page.js renders ProductionHomepage). Also carries "DHAKA [23.8103° N]" and "SPEED: 0.04s EDGE CACHE" claims that do not match the production code.
- **ROI calculator:** `$150/person/month` SaaS-saving assumption is hardcoded without explanation (line ~205). Labelled "Estimated", so acceptable — but the assumption should be footnoted.

## What I could not verify from this VM

- **TypeScript 0 errors / ESLint clean:** could NOT run — no `node_modules` in this checkout; `npx --no-install tsc` and `npx --no-install eslint` both exit 1. No install was performed. These need a machine with dependencies installed, or an `npm install` here.
- **Live crawl (31 routes HTTP 200) and audit API live POST (score 73):** could not verify — no server started; production is `main`, not this branch.
- **Whether production `CRON_SECRET` equals the old literal:** no access to Vercel env. This decides whether the two workflows are now broken (401) or still authenticated by the old value.
- **Dedup history:** the "was a 1,908-line exact duplicate" claim is unverifiable from repo history — neither AwwwardsHomepage.tsx nor ProductionHomepage.tsx existed at the parent commit. The current 5-line re-export state IS confirmed.
- **"11 original links from app/page.backup.js":** `app/page.backup.js` does not exist — not in the working tree, not in the parent commit, not anywhere in git history (`git log --all -- app/page.backup.js` is empty), and d2854fd added `*.backup.*` to .gitignore so it can never be committed. The substance checks out (all 11 links match the old app/page.js hrefs), but the cited source does not exist. Secondary note: 5 of the 11 moved from in-content body links into footer components — preserved, but demoted from in-content to footer links (less internal-link weight).
- **Bangladesh mentions** in HomeContentFooter (:92, :171) and app/page.js schema are pre-existing from the parent — not new in this commit. Noted only because the no-Bangladesh rule concerns profiles/bios; the old page already carried this text.

## Sensitivity flag (not a verdict driver by itself)

`lib/audit.ts` is on Sheriff's do-not-touch list for Mikey. Draken changed it in this commit (guard function at :32-64, plus a `reasonNotice` → `_reasonNotice` param rename). Sheriff should be aware it was Draken, not Mikey, who touched it. The change itself is good — it adds the guard that protects the previously unguarded `/api/audit` route.

## What flips this to approve

1. Rotate `CRON_SECRET` and move both workflow files to GitHub Secrets (P1).
2. Remove the fake benchmark or make it a real fetch; drop the hardcoded 38 ms (P2).
3. Implement the honeypot and the sound toggle, or remove those claims (P3, P4).
4. Reframe the Urban Cafe section as a case study/demo and remove or source the uptime / "thousands" figures (P5).
5. Attribute or soften the unverified metrics and stats (P6, P7); fix "Certified" → "Verified", the "5 Core Services" / "12+" counts, and the footer badge text (P8, P9, P10, P8-badge).
6. Re-run `tsc --noEmit` and ESLint with dependencies installed and report the real results; confirm the two workflows after the secret rotation.

None of these requires re-architecture. Apply them, re-check, and I will re-review the fix commit.

## Per-area verdicts

- Security: approve with fixes (P1 must-fix).
- Homepage/content/links: block as-is (P2–P5).
- Verification of Draken's claims: tests confirmed (30/30, static assertions only); tsc/ESLint/live-crawl/audit-POST not verifiable from this VM.
- Overall: **BLOCK — do not merge d2854fd to main until the must-fix list above is done.**
