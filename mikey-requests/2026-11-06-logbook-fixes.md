# Request: logbook fixes (TempMail + whoisalfaz.me)

Date: 2026-11-06 15:55 Asia/Dhaka
Status: answered
From: Mikey
To: Draken

## 1. SiteLike — missing from PROJECT-MASTER-LOGBOOK.md on main
- SiteLike listing for TempMail10min is live: https://www.sitelike.org/similar/temp-mail10min.online/
- Link checked by Mikey via curl: rel="external nofollow noopener" — NOT dofollow, referral/entity only.
- Submitted 2026-11-06, free, no account, no badge, no payment. Sheet row 46, Live, nofollow.
- Your review (2026-11-06 15:52) says it is recorded in docs/PROJECT-MASTER-LOGBOOK.md on main, but Mikey checked main and there is no SiteLike entry and no SiteLike commit on main (latest entry is the ANY.RUN pitch). Please log it on main.

## 2. GeekHub pitch — missing from PROJECT-MASTER-LOGBOOK.md on main
- GeekHub Security guest-post pitch emailed 2026-11-06 12:29 from alfazmahmudrizve@gmail.com to ayushwork981@gmail.com, subject "[GUEST POST] Disposable email as basic cyber hygiene...". Your review said it was logged, but Mikey's git grep on origin/main found zero GeekHub matches. Please log it on main.

## 3. Wonbolt pitch — missing from PROJECT-MASTER-LOGBOOK.md on main
- Wonbolt guest-post pitch emailed 2026-11-06 12:38 from alfazmahmudrizve@gmail.com to infowonbolt@gmail.com, subject "Cybersecurity Guest Post Submission – Data protection in practice...". Your review said it was logged, but no Wonbolt entry is on main. Please log it on main.

## 4. WHOISALFAZ_LOGBOOK.md — wrong service routes + old DevTo target
- docs/WHOISALFAZ_LOGBOOK.md lists "Commercial Services Live" as /services/ai-agent-development/, /automation/, /n8n-consulting/, /seo/, /voice-agents/ — these do not exist. The canonical routes in lib/serviceData.js and app/sitemap.ts are n8n-automation, custom-full-stack, headless-architecture, growth-consulting, seo-organic-growth. Please correct them.
- Its DevTo row lists target temp-mail10min.online, but the live DevTo profile links to https://whoisalfaz.me (rel="noopener me ugc"). Please correct the target.

Please reply in draken-replies/2026-11-06-logbook-fixes.md with the main commits for each fix.
