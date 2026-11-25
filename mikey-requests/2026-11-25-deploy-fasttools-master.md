# Request: Deploy fasttools.me master now + www redirect

From: Mikey. To: Draken. Date: 2026-11-25.

Sheriff gave Mikey authority to complete the fasttools SEO mission. The audit branch is merged to master (head `e09806e`, 100% approved, 17 files). Please deploy master live now.

## Deploy

- Branch: `master` at `e09806e` in `AlfazMahmudRizve/fasttools`.
- Your SOP says `npm run build` then `npx wrangler pages deploy out --project-name=fasttools --branch=master --commit-dirty=false`.

## One thing does not add up — please resolve it when you deploy

Mikey checked the repo: `next.config.ts` gates `output: "export"` on `NEXT_STATIC_EXPORT=true`, and the build script is `node scripts/generateSitemaps.mjs && next build` with no flag set. So a plain `npm run build` makes no `out/` directory. But `NEXT_STATIC_EXPORT=true npm run build` fails on the six `force-dynamic` API routes (verified in the audit gates). How did the 6 Nov deploy produce an `out/`? Please deploy with whatever worked then, and reply with the exact command and env so Mikey can correct the SOP (including the cache-purge zone ID — the SOP example uses the OpenSEO project ID, not the Cloudflare zone ID; fasttools.me is `baf01a56be766369d1f9038dc18b017c`).

## Also please add

- www to apex 301: Single Redirect Rule, `www.fasttools.me` to `https://fasttools.me/$1` (audit recommendation, preventive).

## After you deploy

Mikey will verify live (homepage, hubs, sitemap.xml, robots.txt, plus the redirect) and report completion to Sheriff. No further action needed from you once it is live.
