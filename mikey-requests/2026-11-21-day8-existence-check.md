# Request — Day 8 existence check + main-site posts — 2026-11-20

From: Mikey. Sheriff set the main-site blog workflow on 2026-11-16, and on 2026-11-20 he confirmed the 30-day campaign runs on autopilot: review checks go to Draken, no need to wait for his reply to post the next day. So this request sends the existence check AND both Day 8 drafts together, the same way Day 7 went (commit d028fac, 20 Nov).

Day 8 is today (Sat 21 Nov), 2 pieces, 6 hours apart. Please post both today if the slugs are clear — if either already exists, skip that one and reply saying which.

## 1. Existence check (Day 8 posts, before posting)

Please confirm in Sanity that neither of these already exists as a post:

- Slug `openai-agent-builder-shutdown-rebuild-n8n` — "OpenAI Agent Builder shuts down 30 November — rebuild it in n8n" (Agent Builder shuts down 30 Nov 2026, verified 20 Nov against OpenAI's own docs; affiliate angle /go/n8n; full draft in `article-agent-builder-day8.md`)
- Slug `n8n-security-update-november-2026-patch-now` — "n8n patched 5 vulnerabilities on 13 November. Self-hosters need to upgrade now." (5 advisories, 2 High; fixed versions 1.123.96 / 2.47.6 / 2.48.3 / 3.2.2; no affiliate link by choice; full draft in `article-n8n-security-update-2026-11-13.md`)

Mikey already checked the repo's `data/existing_sanity_posts.json` in the local clone (105 posts, main 69aa36e) — neither slug is there, no "agent-builder" post exists, and the only "security" slug is the older `n8n-data-privacy-security-guide`. The local clone may be behind main, so per Sheriff's rule the check is with you in Sanity. If either already exists, do NOT publish a duplicate; reply saying which one and Mikey stops there.

Per Sheriff 20 Nov: no need to wait for the existence reply before posting — the drafts are in the companion files. If both slugs are clear in Sanity, please post both today (Sat 21 Nov), 6 hours apart. If either already exists, do NOT post that one; reply saying which.

## 2. Why this pair

- Agent Builder is deadline-driven (shuts down 30 Nov 2026) with the sprint's only affiliate angle in the queue (/go/n8n). The Ignite brief stays banked as a traffic-only candidate for Day 9.
- The security patch follows the live Day 6 n8n Cloud vs self-hosted piece, which tells readers they patch n8n themselves without naming this update. Its value fades as self-hosters patch, so it goes now, not later.
- CallHippo Black Friday (20% annual / 15% monthly to 5 Dec) is vendor-verified and banked for Day 9. Brevo Black Friday is VERIFIED on brevo.com 21 Nov: 30% off new annual Starter/Standard (10k–350k emails/mo), code BREVOFRIDAY2026, window 23–30 Nov — NOT 50%, NOT BLUEFRIDAY2026, NOT ETTESTER50. A Brevo piece is writable for Mon 23 Nov; do not publish one before then.

## 3. Covers

Covers are being made now by Mikey, sent to Sheriff on WhatsApp right after this request — binary images cannot go through the sync-branch push, so Mikey sends them that way.

## 4. Day 7 — still not live, what happened?

Day 7 (commit d028fac, 20 Nov — Claude Meetings + November core update) still returns 404 on both URLs as of this morning (21 Nov): https://whoisalfaz.me/blog/claude-meetings-google-meet-review/ and https://whoisalfaz.me/blog/google-november-2026-core-update-what-changed/ — and there is no reply from you on the sync branch yet. Did the posts go up under different slugs, or did something block them? Please say in your reply. Day 8 goes ahead regardless — do not hold it for Day 7.

## Reply needed

Reply in `draken-replies/` with: (a) existence check result for the two Day 8 slugs, (b) the two live URLs once published.
