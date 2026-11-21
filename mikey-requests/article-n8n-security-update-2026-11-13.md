# Article — n8n security update, 13 Nov 2026: patch self-hosted now

**Title:** n8n patched 5 vulnerabilities on 13 November. Self-hosters need to upgrade now.
**Prepared:** 2026-11-19 ~09:45 Asia/Dhaka, by Mikey (research stage, not published).
**Home angle:** whoisalfaz.me — original advisory write-up. No live whoisalfaz.me post on this update exists yet.
**Canonical URL:** none — original, not a republication.
**Links used:**
- n8n 3.0 upgrade guide: https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/
- Day 6 self-hosted comparison: https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted/
- Source: n8n community forum, "Security update — 13 November 2026": https://community.n8n.io/t/security-update-13-november-2026/328485
**Parasites:** DevTo, Hashnode, Blogger, WordPress.com, Mataroa. HackerNoon only if the queue allows — Day 6 n8n piece is already submitted there.
**Affiliate link:** none in this piece, by choice. A security advisory is not the place to sell a plan. The Cloud link lives in the Day 6 piece and the 3.0 guide it points to.
**Proposed slug:** `n8n-security-update-november-2026-patch-now` — Draken must run the Sanity existence check first, per Sheriff's 16 Nov duplicate rule. Do not publish before that check.
**Style checks:** no dollar figures, no banned words, no disclosure line (parasite rule, 15 Nov).

**Caption / hook:** n8n published five security advisories on 13 November. Two are High. Cloud is already patched. If you self-host, the fix is an upgrade — check your version against the list below.

---

n8n published a security update on 13 November 2026 covering five advisories. Two are rated High. If you run n8n Cloud, your instance is already patched and there is nothing to do. If you self-host, you need to upgrade to a fixed version on your own line.

## The two High advisories

**A member could take over a pending invited account — GHSA-m7qq-gm3x-v79g, High (7.7).** The invitation acceptance endpoint let a member set the password on a pending invited account and then log in as it.

**A custom role with user management could take over the owner account — GHSA-q8rc-7m84-mfvj, High.** A custom instance role with user-management permissions gave control of the owner account.

Both need an authenticated user with some access already. Neither is a remote, unauthenticated break-in. Both are still worth patching this week, because the accounts they hand over are the ones that run your workflows and hold your credentials.

## The three Moderate advisories

**Workflow activation could use another user's credential — GHSA-h59h-rf6m-7jp5, Moderate (5.3).** Activating a workflow could let a trigger node use a credential its publisher cannot access.

**AWS Bedrock nodes skipped SSRF protection for custom endpoints — GHSA-g333-hr44-g82p, Moderate (5.3).** Custom runtime endpoints bypassed the SSRF check the standard endpoints get.

**Unencoded IDs in node parameters could redirect authenticated API calls — GHSA-c772-hjfp-gfc2, Moderate (5.3).** Integration nodes could send authenticated requests to endpoints the user did not intend.

## Which version fixes it

Upgrade to at least the fixed version on your line, or anything newer on the same line:

- v1 line: **1.123.96**
- Stable (2.x): **2.47.6**
- Beta (2.x): **2.48.3**
- v3 line: **3.2.2**

Check your version first, then upgrade using n8n's own update guide. If you are on 3.x, read the 3.0 upgrade guide before you move — the upgrade is one-way, and the Cron node your workflows use today is gone in 3.0: https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/

## Cloud vs self-hosted, again

This is the part of self-hosting the Day 6 comparison priced in evenings, not on a card: https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted/

Cloud patched itself. Self-hosted instances do not patch themselves, and n8n says so plainly in the advisory: if you run below the fixed versions, upgrade at your earliest convenience. That is the whole job here — check the version, run the upgrade, move on.

No evidence of exploitation in the wild was stated in the advisory. Patch anyway. The two High flaws hand over accounts, and accounts are what your credentials hang off.

---

*Alfaz Mahmud Rizve — GTM & RevOps Architect. I build autonomous revenue systems for scaling agencies and SaaS: SEO & organic growth, high-speed Next.js apps, and self-healing n8n workflows. whoisalfaz.me*
