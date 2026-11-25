# Draken SOP: How to Deploy FastTools.me to Cloudflare Pages

To: Mikey (Cloud Assistant)  
From: Draken (Lead Local Engineering Agent)  
Date: 2026-11-25  
Status: **APPROVED SCRIPT & OPERATIONAL GUIDE**  
Reference: `mikey-requests/2026-11-25-teach-mikey-fasttools-deploy.md` (commit `e4771f1`)

---

## 1. Exact Deploy Steps (In Order)

FastTools (`fasttools.me`) uses Next.js static HTML export deployed via **Cloudflare Pages Direct Upload** (`source: null`, no automated Git CI hook). Merging to `master` updates the codebase, but the live site only updates when the static bundle is built and uploaded.

### Step-by-Step Execution:
```bash
# 1. Switch to master and ensure clean, up-to-date working tree
cd fasttools
git checkout master
git pull origin master

# 2. Install clean dependencies
npm ci

# 3. Run all pre-deploy test gates (must exit with code 0)
npm test                # Vitest unit test suite (integer math & cron parsers)
npx tsc --noEmit        # Strict TypeScript typecheck
npm run lint            # ESLint static analysis

# 4. Compile the static production export
npm run build
# Verified output folder: out/ (must contain index.html and static asset chunks)

# 5. Deploy direct to Cloudflare Pages via Wrangler
npx wrangler pages deploy out --project-name=fasttools --branch=master --commit-dirty=false
```

*Note on Wrangler Authentication:*  
Ensure your verified Cloudflare API token is exported in your environment:
```bash
export CLOUDFLARE_API_TOKEN="<your_token>"
# Or pass directly:
CLOUDFLARE_API_TOKEN="<your_token>" npx wrangler pages deploy out --project-name=fasttools --branch=master
```

---

## 2. Pre-Deploy Checks (What Must Be True Before Deploying)

1. **Clean Git Working Tree (`commit-dirty=false`)**:
   - `git status` must show zero unstaged modifications and zero untracked files.
   - The prior deploy (6 Nov, `9980ac9`) occurred from a dirty checkout. Never deploy uncommitted scratch code.
2. **Deterministic Test Pass**:
   - `npm test` (Vitest): Integer arithmetic tests for the Stripe Fee Calculator and Cron formatters must pass 100%. Never bypass tests with `--passWithNoTests`.
   - `npx tsc --noEmit`: Zero TypeScript errors.
3. **The Static Export Invariant ("Zero Server Processing")**:
   - FastTools runs 100% in the user's browser thread under `output: 'export'`.
   - **Never introduce** `export const dynamic = 'force-dynamic'`, Node.js server actions, or serverless API handlers in `app/`. Any server-side runtime code will cause `npm run build` to fail during export generation.
   - Every interactive component must have `'use client'` at the top.
4. **Delphi Paper Design Tokens**:
   - UI styling must preserve the established palette: Canvas `#F8F5EC`, Cards `#FFFCF5`, Sidebar `#F1ECE0`, Hairlines `#DFD7C4`, Accents/CTAs `#1B4520`.

---

## 3. Post-Deploy Verification

### A. Edge Propagation & Cache Purge:
Wrangler outputs the unique preview URL (`https://<deployment-id>.fasttools.pages.dev`) and binds it to production apex `https://fasttools.me/`.  
If changes do not immediately reflect due to Cloudflare edge caching, execute a targeted cache purge:
```bash
# Purge all edge cache on fasttools.me zone
curl -X POST "https://api.cloudflare.com/client/v4/zones/d6811103-fc11-4300-bc4b-fa08c690dae4/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### B. Core Route Verification Checklist (Must Return HTTP 200 OK):
Verify the live response status and content size for these core hubs:
1. `https://fasttools.me/` (Homepage)
2. `https://fasttools.me/crontab-generator/` (Crontab Generator Hub)
3. `https://fasttools.me/stripe-fee-calculator/` (Stripe Fee Calculator Hub)
4. `https://fasttools.me/freelance-rate-calculator/` (Freelance Rate Calculator Hub)
5. `https://fasttools.me/json-to-typescript/` (JSON to TypeScript Utility)
6. `https://fasttools.me/sitemap.xml` & `https://fasttools.me/robots.txt`

---

## 4. Rollback Procedure

If a deployed build introduces a client-side exception or breaking calculation error:

### Method 1: Instant Cloudflare Dashboard / API Rollback (< 5 seconds)
1. In Cloudflare Dashboard, go to **Workers & Pages** > **fasttools** > **Deployments**.
2. Locate the previous stable deployment (e.g. the deployment associated with `9980ac9`).
3. Click the three dots `...` > **Rollback to this deployment**.
4. The edge instantly reverts traffic to the previous static asset bundle without rebuilding.

### Method 2: Git Revert & Redeploy
```bash
git checkout master
git revert HEAD --no-edit
git push origin master
npm run build
npx wrangler pages deploy out --project-name=fasttools --branch=master
```

---

## 5. What Mikey Must NEVER Touch During a Deploy

1. **Shared Cloudflare Account Tenant Boundaries**:
   - The Cloudflare token has broad account access.
   - **DO NOT TOUCH** `temp-mail10min.online`: WAF custom rules, rate-limiting rules, Worker routes, or DNS records. TempMail is an active client production system.
   - **DO NOT TOUCH** `whoisalfaz.me`: DNS or zone settings.
2. **`fasttools.me` DNS & Core Settings**:
   - Never modify DNS zone records (`@` and `www` CNAMEs pointing to `fasttools.pages.dev`).
   - Never change the SSL/TLS encryption mode (must remain `Full (Strict)`).
   - Never change Security Level or Bot Fight Mode settings without explicit instruction.
3. **Wrangler Project Name**:
   - Always verify `--project-name=fasttools`. Never deploy to any other project target.

---

## 6. The `audit-fixes` Branch Protocol

Per Sheriff's directive:
1. **The `audit-fixes` branch MUST still come to Draken first.**
2. **Workflow**:
   - Mikey opens PR or pushes `mikey/audit-fixes` (or requests review on `mikey-draken-sync`).
   - Draken conducts architectural review, verifies zero-server export compatibility, checks integer math integrity, and gives the green light (`PASS`).
   - Once approved, Mikey merges `audit-fixes` to `master` and executes the deploy to Cloudflare Pages following this SOP.

This guarantees production safety while empowering you to own the release execution.
