# Request to Draken — fix sameAs schemas, add Alfaz Reviews links
Date: 2026-11-06
From: Mikey
Status: open
Reply to: draken-replies/2026-11-06-sameas-alfaz-reviews.md

## What Alfaz asked
Use both YouTube channels, split as:
- @alfazreviews — tool reviews, affiliate products, TempMail / fasttools / other tools
- @whoisalfazz — GTM & RevOps architect, n8n / automation work
- TikTok @alfaz.tech.product — short-form companion to Alfaz Reviews

Add both new channels to the sameAs schemas on whoisalfaz.me, so Google connects them as the same person.

## Add these two links
- https://www.youtube.com/@alfazreviews
- https://www.tiktok.com/@alfaz.tech.product

Do not remove any existing sameAs link. Do not add any other profile (Medium, Contra, etc.) unless Alfaz confirms it separately.

## Files where sameAs lives (main, head 8c5c438, checked by Mikey 2026-11-06)
1. app/layout.tsx — Person and Organization nodes. Current sameAs: LinkedIn, GitHub, X @whois_alfaz, Facebook alfazmahmudrizve, Instagram whois.alfaz, YouTube @whoisalfazz. Add the two new links here.
2. app/page.js — Person node. Current sameAs: LinkedIn, X, GitHub only. Add the two new links here, and add YouTube @whoisalfazz here too for consistency (it is already in layout.tsx, missing here).
3. app/about/page.js — Person node in ProfilePage. Current sameAs: LinkedIn, X, GitHub, https://n8n.io/creators. Add the two new links here.
4. lib/seo-schema.ts — Person node (line ~400) and Organization node (line ~436). Person current: n8n.io/creators/whoisalfaz/, LinkedIn, GitHub, X. Organization current: LinkedIn, GitHub, X. Add the two new links to both nodes, and add YouTube @whoisalfazz to both for consistency (missing here).

If any other sameAs array exists in the repo, add the two links there too, and list it in your reply.

## Verification, in your reply
- List every file you changed, with the new sameAs list for each.
- Confirm the JSON-LD still parses / the build check you ran, with command and exit code.
- No publish, merge, or deploy from this request alone. Alfaz reviews and merges.

## Context, for accuracy
- YouTube links are nofollow, not dofollow. All external YouTube links (descriptions, comments, channel About) carry rel="nofollow" and route via youtube.com/redirect. Since 2019/2020 Google treats nofollow as a hint, so they can help discovery / entity / traffic, not direct PageRank. sameAs is still worth fixing: it is entity identity, not link equity.
- TempMail route, confirmed by Alfaz 2026-11-06: Mikey will go from Alfaz's own profile for TempMail, labelled exactly "SEO Lead & QA Architect", SEO work only. TempMail about page (verified live 2026-11-06) lists MD Shawn as Founder & Head of Operations and Alfaz as SEO Lead & QA Architect. Do not change that label in any schema.
- Alfaz Reviews channels, verified live 2026-11-06:
  - @alfazreviews — https://www.youtube.com/@alfazreviews — "Welcome to Alfaz Reviews — your ultimate destination for honest product breakdowns, curated tech gear, productivity tools, and software finds."
  - @whoisalfazz — https://www.youtube.com/@whoisalfazz — "Tech & Automation | Alfaz Mahmud Rizve"
  - TikTok — https://www.tiktok.com/@alfaz.tech.product — "Alfaz Tech & Product Reviews", bio "Curated tech, gear & app breakdowns. Collabs/Inquiries: contact@whoisalfaz.me", 0 followers, 0 videos.
