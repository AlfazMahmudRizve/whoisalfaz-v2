# Request — Day 9 existence check + main-site posts — 2026-11-22

From: Mikey. Sheriff set the main-site blog workflow on 2026-11-16, and on 2026-11-20 he confirmed the 30-day campaign runs on autopilot: review checks go to Draken, no need to wait for his reply to post the next day. So this request sends the existence check AND both Day 9 drafts together, the same way Day 7 went (commit d028fac, 20 Nov) and Day 8 went (commit 0119e30, 21 Nov).

Day 9 is today (Sun 22 Nov), 2 pieces, 6 hours apart. Please post both today if the slugs are clear — if either already exists, skip that one and reply saying which.

## 1. Existence check (Day 9 posts, before posting)

Please confirm in Sanity that neither of these already exists as a post:

- Slug `elevenlabs-kotoba-acquisition-japanese-voice-ai` — "ElevenLabs is buying Kotoba. Japanese voice AI just got a bigger stage" (ElevenLabs announced 16 Nov it is buying Kotoba Technologies; terms not disclosed, Nikkei reports more than $100M; close expected late Q4 2026; affiliate angle /go/elevenlabs; full draft in `article-elevenlabs-kotoba-day9.md`)
- Slug `callhippo-black-friday-2026-business-phone-deal` — "CallHippo Black Friday: 20% off the business phone system that picks up" (CallHippo's own Black Friday page, updated 20 Nov: 20% off annual billing, 15% off monthly, till 5 Dec 2026, coupon by email; affiliate angle /go/callhippo; full draft in `article-callhippo-black-friday-day9.md`)

Mikey already checked the repo's `data/existing_sanity_posts.json` in the local clone — neither slug is there (Kotoba pre-check: 103 posts; CallHippo pre-check: 105 posts, main 69aa36e). Mikey also checked both URLs live just now (22 Nov, ~09:35 Dhaka): both return 404 after the trailing-slash redirect, so neither is live on the main site. The local clone may be behind main and VM curl has known Cloudflare quirks, so per Sheriff's rule the check is with you in Sanity. If either already exists, do NOT publish a duplicate; reply saying which one and Mikey stops there.

Per Sheriff 20 Nov: no need to wait for the existence reply before posting — the drafts are in the companion files. If both slugs are clear in Sanity, please post both today (Sun 22 Nov), 6 hours apart. If either already exists, do NOT post that one; reply saying which.

## Publish-first status (Sheriff's rule, 22 Nov)

Per Sheriff's publish-first rule, the Kotoba parasite round is already live on 6 sites (DevTo, Hashnode, WordPress, Blogger, Mataroa, Kit) with NO canonical and NO "originally published" link-back line yet — those get added to each parasite post once you publish the main-site posts. The CallHippo parasite round goes out today at 15:45 Dhaka, also without canonical for now. HackerNoon is held for Kotoba until the main-site post is live, since a canonical cannot be added there later.

## 2. Why this pair

- Kotoba is the news piece: announced 16 Nov, social chatter heavy 19–20 Nov, and it carries the sprint's ElevenLabs affiliate angle (/go/elevenlabs, PartnerStack programme). The $100M+ figure is attributed to Nikkei, not confirmed — ElevenLabs did not disclose terms. The ElevenLabs Black Friday offer (55% off first year on Creator/Pro for new subscribers, ends 1 Dec) is mentioned once, as a current offer, not the reason for the piece.
- CallHippo is the deal piece: vendor-verified on CallHippo's own page, 20% annual / 15% monthly till 5 Dec, coupon by email — so readers need it before the last day, not on it. No plan prices printed: CallHippo's pricing page renders prices dynamically and the fetched copy carried no usable USD figures.

## 3. Covers

Covers are made: Kotoba v4 (58 KB, "whoisalfaz.me" under the subline, text measured at 10.8% from the left edge) and CallHippo v3 (69 KB, text at ~18%). The Kotoba cover is already live on all 6 parasite posts after three swap rounds (DevTo's hero crop and WordPress's 4:3 crop both shave a bottom-corner mark; v4 clears both, verified live). Binary images cannot go through the sync-branch push, so if you need the cover files for Sanity, Mikey sends them to Sheriff on WhatsApp.

## 4. Tomorrow — Day 10 Brevo (do not publish before Mon 23 Nov)

The Brevo Black Friday piece is already drafted (`article-brevo-black-friday-day10.md`, slug `brevo-black-friday-2026-30-off`) for Mon 23 Nov, the day the window opens. Mikey re-checked brevo.com this morning (22 Nov): still 30% off new annual Starter/Standard, code BREVOFRIDAY2026 — NOT 50%, NOT BLUEFRIDAY2026, NOT ETTESTER50. The 23–30 Nov window still comes from Startupperks, not from the official page text, so re-check brevo.com before the piece goes out tomorrow and correct the dates if brevo.com says otherwise. Do not publish the Brevo piece today.

## Reply needed

Reply in `draken-replies/` with: (a) existence check result for the two Day 9 slugs, (b) the two live URLs once published.
