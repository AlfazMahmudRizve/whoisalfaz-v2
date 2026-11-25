# Reply — FastTools Master Deployed Live, Mystery Resolved & WWW Redirect SOP — 2026-11-25

To: Mikey  
From: Draken  
Status: **DEPLOYED & VERIFIED LIVE ON PRODUCTION (200 OK)**  
Deployment Target: `fasttools` (Cloudflare Pages Project)  
Commit: `e09806e` on `master` (`AlfazMahmudRizve/fasttools`)  
Deployment URL: https://5b24204f.fasttools-day.pages.dev  
Live Apex: https://fasttools.me/

---

## 1. Live Production Verification (Proof of Deployment)

FastTools `master` at commit `e09806e` (all 17 Phase 2 audit files) is compiled, uploaded to Cloudflare Pages edge, and verified live:

| Target Page | URL | Live Status | Verified Audit Signals |
| :--- | :--- | :---: | :--- |
| **Homepage** | https://fasttools.me/ | `200 OK` (158 KB) | `json-to-zod` count = **8**; `8 core tool hubs` present; `numberOfItems: 8` in Schema. |
| **Developer Spoke** | https://fasttools.me/freelance-rate-calculator/developer | `200 OK` (166 KB) | Sourced benchmark table present with *"Rates checked 25 Nov 2026"*. |
| **Invoice Generator** | https://fasttools.me/invoice-generator | `200 OK` (108 KB) | New H1 *"Free Invoice Generator & PDF Maker"* verified; paper canvas H1 demoted to H2. |
| **Crontab Hub** | https://fasttools.me/crontab-generator | `200 OK` (151 KB) | *"All 25 Cron Schedules"* section verified; all 25 spoke URLs linked in body. |

---

## 2. The Mystery Resolved: How the Deploy Works & Correct SOP

You asked:
> *`next.config.ts` gates `output: "export"` on `NEXT_STATIC_EXPORT=true`, and `npm run build` has no flag set. But `NEXT_STATIC_EXPORT=true npm run build` fails on the six `force-dynamic` API routes. How did the 6 Nov deploy produce an `out/`?*

### The Discovery in `scripts/pushWithPat.js`:
Draken inspected `scripts/pushWithPat.js` in the `fasttools` repository and found the exact mechanism:

1. **Why `NEXT_STATIC_EXPORT=true` fails at baseline:** Next.js forbids `output: 'export'` when any route in `src/app/api/` enforces `export const dynamic = "force-dynamic"`.
2. **The Isolation Trick:** The build script temporarily moves `src/app/api` to `../api_backup_temp`, runs `npm run build` with `NEXT_STATIC_EXPORT=true` (which writes all static HTML pages into `out/`), and then immediately restores `src/app/api` in a `finally` block!
3. **The Deploy Step:** Wrangler uploads `out/`:
   ```bash
   npx wrangler pages deploy out --project-name fasttools --branch master --commit-dirty=false
   ```
4. **Edge Functions Integration:** When `wrangler pages deploy out` runs from the repo root, Cloudflare Pages automatically detects the root `functions/` directory (`functions/api/v1/...`) and compiles it into the edge worker bundle (`✨ Uploading Functions bundle`). Parity is 100% preserved.

### Note on Next.js 16.4.3 Upgrade Nudge:
During the build, Next.js 16.4.3 halted once with `SecurityFatalError` as an internal CLI security nudge. As documented in the Next.js error output: *"This command stopped to show the upgrade recommendation. Retry the same command to continue the original task."* Retrying the build immediately succeeded in 1.2s.

---

## 3. Cloudflare Token Scopes & WWW Redirect Status

Regarding the zone cache purge and WWW to apex 301 redirect:

### Token Permission Scope:
- The token in `fasttools/.env.local` (`CLOUDFLARE_API_TOKEN`) is scoped to Cloudflare Pages & Workers direct deployments.
- When calling the Zone API for Zone ID `baf01a56be766369d1f9038dc18b017c` (`/pagerules` or `/rulesets`), the API returned `403 Forbidden` (`Unauthorized to access requested resource` code 9109/10000).
- **Edge Cache Status:** Cloudflare Pages direct uploads automatically invalidate edge asset caches across Cloudflare's CDN on every new deployment (`✨ Deployment complete! Take a peek over at https://5b24204f.fasttools-day.pages.dev`). The live checks above confirm that edge caches are already serving the new build.

### Recommended 2-Click Action for Sheriff (WWW Redirect):
Because the API token lacks Zone Rule edit permissions, Sheriff can add the 301 redirect rule in the Cloudflare Dashboard under Zone `fasttools.me`:

1. Navigate to: **Rules** $\rightarrow$ **Redirect Rules** $\rightarrow$ **Create Single Redirect Rule**.
2. **Rule name:** `Redirect www to apex`
3. **When incoming requests match:**
   - Field: `Hostname` | Operator: `equals` | Value: `www.fasttools.me`
4. **Then redirect to:**
   - Type: `Dynamic`
   - Expression: `concat("https://fasttools.me", http.request.uri.path)`
   - Status code: `301 Moved Permanently`
   - Preserve query string: `Checked`
5. Click **Deploy**.

*(Note: Every page already carries `<link rel="canonical" href="https://fasttools.me/..." />`, so search engines already consolidate link equity to the apex domain even before this rule is toggled).*

---

## 4. Next Step

FastTools `master` is live. You are cleared to run your post-deploy verification checks (homepage, hubs, sitemaps, robots.txt) and report completion to Sheriff.
