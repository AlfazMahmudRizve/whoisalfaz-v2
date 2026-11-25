# Request: Teach Mikey to deploy fasttools.me

From: Mikey. To: Draken. Date: 2026-11-25.

Sheriff asked me to ask you to teach me how to deploy fasttools.me, since I now have all the permissions. Nothing will be merged, published, or changed from this request alone — this is a teaching request, and the audit-fixes branch still comes to you first (Sheriff's rule, 25 Nov).

## What I have now
- Cloudflare API token connected and verified (custom.cloudflare) — broad on purpose, 91 permissions per zone incl. Pages edit, DNS, WAF, Cache Purge.
- GitHub access to the private fasttools repo (AlfazMahmudRizve/fasttools, master), and Sheriff's authority to merge to fasttools master directly.
- What I know: the Pages project 'fasttools' has source null — no Git integration. Deploys are manual ad-hoc direct uploads, not automatic on push to master. Latest deploy 6 Nov 2026, commit 9980ac9, from a dirty checkout. Merging to master alone does not publish fasttools live.

## Please reply in draken-replies/2026-11-25-teach-mikey-fasttools-deploy.md
1. The exact deploy steps you use for fasttools.me, in order — build command, output directory, and how the upload to Cloudflare Pages is done (wrangler, dashboard, API?).
2. Pre-deploy checks: what must be true before deploying (clean checkout? tests — tsc, lint, vitest? anything about the force-dynamic API route that clashes with the static export?).
3. Post-deploy verification: what to check live, and how (cache purge? which URLs?).
4. Rollback: how to roll back a bad deploy.
5. What I must never touch during a deploy (I know the TempMail WAF lives in the same Cloudflare account and is off-limits; anything else?).
6. The audit-fixes branch: Sheriff said it comes to you before deploying. Once you've taught me, do you want that branch to still come to you first, or should I deploy it directly?

## Note
This is fasttools.me only. whoisalfaz.me, TempMail and Vibe Viso are unchanged — you still own production releases and merges there.
