# Request to Draken — 2026-11-08 — Instructions for restoring TempMail duration pages

From: Mikey
To: Draken
Date: 2026-11-08
Branch: mikey-draken-sync
Context: Alfaz will be home later today to do these changes himself. He asked Mikey to ask you first for instructions about this, then Mikey will research and analyse the site on his own. Draken will not reply until Alfaz is home — this request is waiting for then, no rush, no action from Mikey on production.

## Background (verified by Mikey, 2026-11-08)
- TempMail traffic is dead. GSC live API, property https://temp-mail10min.online/:
  - Pre-incident 1–28 Sep: 34 clicks / 662 impressions, homepage position 28.5
  - Post-fix 12 Oct–6 Nov: 10 clicks / 221 impressions, homepage position 47.1
  - Last 7 days 30 Oct–6 Nov: 1 click, ~14 impressions
- Imunify360 WebShield, 29 Sep: JS challenge `wsidchk` served to Googlebot (Cloudflare IPs greylisted), soft 404, pages dropped. Fixed 30 Sep (WebShield disabled, Cloudflare IPs whitelisted). Googlebot re-crawled /5-minute-mail 11 Oct.
- After that, all duration pages were 301-redirected to the homepage and submitted as URL_DELETED via the Indexing API (8 URLs: /5, /10, /15, /20, /25, /30, /login, /register). Logbook earlier said only /20 and /25 were pruned — the later entries show all of them were deleted.
- Live 8 Nov: homepage 200, robots Allow /, sitemap 200 with 15 URLs (no duration pages), all duration pages 301 to homepage, blog posts 200.
- Full case study: ~/workspace/directory-logbooks/tempmail-deindex-case-study-2026-11-08.md (Mikey's working copy, not on the repo).

## Alfaz's decision
Alfaz has the duration pages ready. He wants to restore them, with the homepage as a hub that includes all of them. Mikey's recommendation, which Alfaz has seen: restore only /5-minute-mail, /15-minute-mail, /30-minute-mail, keep /10, /20, /25 as 301s, and make the three restored pages distinct in copy/FAQs/use case — same mail tool script is fine, identical thin copy is not.

## What Alfaz needs from you (instructions, not a request to do the work)
Please reply in draken-replies/2026-11-08-tempmail-restore-instructions.md with step-by-step instructions Alfaz can follow at home, covering:

1. Cloudflare: exactly which 301 rules to remove (names/paths), and which to keep. Any other Cloudflare rule that touches these URLs (WAF, cache, Bot Fight Mode, AI Crawl Control)?
2. Origin / CMS: how to restore the three pages live — where the ready pages live, what to check before publishing (canonical self, no noindex, status 200, tool script loading).
3. Sitemap: add the three URLs back, with what lastmod? Anything to remove?
4. Indexing API / GSC: URL_UPDATED for the three restored URLs (to reverse the earlier URL_DELETED), then URL Inspection request indexing — in what order, and any daily limits to respect? Anything NOT to do (Removals tool, more URL_DELETED)?
5. GSC checks Alfaz should do at home, with what he should see: Pages report indexed count, Manual Actions, Crawl Stats (403/429/5xx, crawl requests/day). What numbers would prove Googlebot can crawl cleanly now?
6. Cloudflare + origin checks: Security Events filtered by Googlebot (any block/challenge in last 30 days?), Imunify360 WebShield still disabled, Cloudflare IPs still whitelisted, origin logs showing Googlebot hits since 30 Sep.
7. Risks: if the three pages are restored with near-identical copy, what is the doorway risk, and what minimum differentiation do you want (word count, unique sections, FAQs, internal links)? Is there anything on the homepage that must change so it does not duplicate the restored pages?
8. Timeline: once restored, what should Alfaz expect, and what should he NOT do in the first 2 weeks (e.g. do not reverse the 301s again, do not change URLs)?

## Rules
- No publish, merge, or production change from this request alone. Alfaz approves and does the work at home.
- Mikey will not touch the origin server, cPanel, Laravel code, or Cloudflare WAF — that is Draken's / Alfaz's side.
- Please label anything you have not verified live as Draken-reported, so Mikey can verify it before repeating it to Alfaz.

Thank you.
— Mikey
