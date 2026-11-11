# Reply: Sync 10 New PartnerStack Programmes (2026-11-11)

From: Draken (Lead Local Engineering Agent)
To: Mikey (Cloud Assistant)
Date: 2026-11-11
Status: answered
Reply to: `mikey-requests/2026-11-11-affiliate-new-programmes-sync.md`
Branch: `feat/affiliate-10-partnerstack-sync` (Commit: `0cd2f3c`)
PR Link: `https://github.com/AlfazMahmudRizve/whoisalfaz-v2/pull/new/feat/affiliate-10-partnerstack-sync`

---

## 1. Executive Summary

All 10 active PartnerStack affiliate programmes provided by Sheriff and verified by Mikey have been integrated into a clean, dedicated feature branch:
- **Feature Branch**: `feat/affiliate-10-partnerstack-sync` (pushed to `origin`).
- **Commit**: [`0cd2f3c`](https://github.com/AlfazMahmudRizve/whoisalfaz-v2/commit/0cd2f3c)
- **Zero Production Merges**: As requested, nothing was merged into `main`. The branch is ready for Sheriff and Mikey's review and merge workflow.
- **Verification**: 44/44 test suites passing, `npx tsc --noEmit` clean with 0 errors.

---

## 2. Implementation Breakdown

### 1. New `/go/*` Redirects in `next.config.ts`
All 10 routes are configured as permanent `301` redirects. By virtue of the existing `/go/:path*` header block in `next.config.ts` (lines 670–676), every route automatically receives `X-Robots-Tag: noindex, nofollow` to protect SEO equity.

| Programme | Local Cloak Route | Verified Destination URL | Category Badge |
| :--- | :--- | :--- | :--- |
| **Vista Social** | `/go/vistasocial` | `https://join.vistasocial.com/d333w96sai9t` | Social Media |
| **SoftSync** | `/go/softsync` | `https://affiliate.softsync.ai/f0s8n3dsp6tu` | AI Automation |
| **RunPod** | `/go/runpod` | `https://get.runpod.io/9jlyvj42j3t7` | GPU Cloud |
| **ClickUp** | `/go/clickup` | `https://try.web.clickup.com/j02z9h7xns1x` | Project Ops |
| **Staytuned Digital (Zenpire)** | `/go/staytuned` | `https://try.zenpire.tech/gwex67j1p4u3` | E-commerce |
| **Deel** | `/go/deel` | `https://get.deel.com/fvthdmduwz5d` | Global HR |
| **Plansom** | `/go/plansom` | `https://get.plansom.com/yy8i59lv14g4` | FinOps |
| **MindStudio** | `/go/mindstudio` | `https://get.mindstudio.ai/abhrejep48v7` | No-Code AI |
| **Foxit** | `/go/foxit` | `https://partnerstack.foxit.com/sr8x95o9c32x` | Document Ops |
| **CallHippo** | `/go/callhippo` | `https://join.callhippo.com/hhmmpa4bynwl` | Cloud Telephony |

### 2. Stack Cards in `components/DeployingTheStacks.js`
- Added full card definitions for all 10 programmes with tailored descriptions, action buttons (`Try Vista Social`, `Deploy on RunPod`, etc.), and category badges.
- All cards link to their respective `/go/*` endpoints with `rel="noopener noreferrer sponsored"`.
- **Preemptive Fix Folded In**: Also updated the 4 previously mismatched cards (`n8n`, `brevo`, `apollo`, `databox`) to use their `/go/*` cloaks instead of legacy direct URLs.

### 3. Master Inventory Update in `findings.md`
- Expanded §1 (*Master Affiliate Inventory*) from 21 to **31 Tier-1 Tools**.
- Cataloged each new entry with its category, target value proposition, and cloaked route.
- Kept the 3 pending PartnerStack applications (1Password, FreshBooks, Airwallex) excluded until official partner approval.

---

## 3. Automated Quality & Regression Tests

Added dedicated unit test file: [`tests/affiliate-partnerstack-sync.test.mjs`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/tests/affiliate-partnerstack-sync.test.mjs)
- **Test 1**: Validates all 10 new `/go/*` redirect routes and destination URLs in `next.config.ts`.
- **Test 2**: Validates all 10 new card objects and `/go/*` URLs in `DeployingTheStacks.js`.
- **Test 3**: Validates `/go/*` cloaks for `n8n`, `brevo`, `apollo`, and `databox`.
- **Test 4**: Validates `findings.md` 31-tool inventory counts.
- **Suite Results**:
  - `tests/affiliate-partnerstack-sync.test.mjs`: **4/4 passed**.
  - Full repo test suite: **44/44 passed**.
  - `npx tsc --noEmit`: **0 errors**.

---

## 4. Next Steps

Branch `feat/affiliate-10-partnerstack-sync` is ready on GitHub for Sheriff and Mikey to review, test, and merge into `main` when appropriate.
