# Affiliate Master Strategy — Start Earning from Alfaz Reviews

Date: 2026-11-11. Prepared by Mikey from three parallel research agents (setup audit, top-leader strategies, placement map). TempMail excluded — frozen until further notice.

## 1. The model

Review-first affiliate revenue under Alfaz Reviews: honest tool reviews (what worked, what broke, who it is for), with affiliate links placed where the reader is already deciding — inside tutorials and comparisons, not banners. High-ticket agency work comes first; affiliate revenue is the second engine, not a competing one.

Rules that already exist and stay:
- Only link to tools actually used in daily work (editorial policy).
- Disclose near the link, every time.
- All affiliate links cloaked via `/go/*`, tagged `rel="sponsored"`, `noindex, nofollow`.
- No spam bonuses, no gimmicks.

## 2. The honest starting point

**Update 2026-11-11:** inventory is now **31 programmes** — the original 21 + 10 new PartnerStack ones (Vista Social, SoftSync, Runpod, ClickUp, Staytuned Digital/Zenpire, Deel, Plansom, MindStudio, Foxit, CallHippo). Vultr is a separate direct affiliate, not PartnerStack. Two more programmes run on Gumroad: Krafera Upgrade Watch (https://gumroad.com/a/74272099/pbeqo) and Krafera Silent Failure Watch (https://gumroad.com/a/74272099/lltue) — both n8n-related, verified live 2026-11-11. Three PartnerStack applications are still pending (1Password, FreshBooks, Airwallex) and stay out until approved. Earnings to date: **$0**.

- 31 affiliate programmes on file, mostly via PartnerStack. Earnings to date: **$0**.
- The 4 mismatched affiliate IDs are resolved: Draken confirmed the cloak IDs in `next.config.ts` are current, and the cards now point at their `/go/*` cloaks in branch `feat/affiliate-10-partnerstack-sync`. Sheriff approved the merge 2026-11-11; awaiting Draken's merge. The setup is structurally ready but still leaking in the remaining ways below — fixing the leaks comes before driving traffic, or new clicks will split across two IDs or earn nothing.
- Disclosure is sound: it renders automatically on tagged posts.

## 3. Fix first — before any new traffic

In order. Draken does the dashboard checks (local PC only); Mikey/Draken do the code fixes.

1. **Reconcile the 4 mismatched affiliate IDs.** Blog links (`/go/*`) and component cards send clicks to different IDs for the same tool. Confirm the active ID in the PartnerStack / Brevo dashboards, then point the cloak at it and make every card link to its `/go/*` path, never a hardcoded destination.
   - n8n: card `8qovl1a3y7q6` vs cloak `ch585gsqzanp` — unclear which is current.
   - Brevo: card `60gns0w2n9o1` vs cloak `6b88c13841c4` — unclear.
   - Apollo: card `apollo.grsm.io/s3jmtpdx8g1s` (old GrowSumo domain) vs cloak `get.apollo.io/bs1ny1i5eigv` — cloak looks current, confirm.
   - Databox: card `databox.com/?a=AlfazMahmudRizve` vs cloak `join.databox.com/qfzdqmwp7elc` — cloak looks current, confirm.
   - **Status 2026-11-11: resolved.** Draken confirmed the cloak IDs are current; the cards now point at their `/go/*` cloaks in branch `feat/affiliate-10-partnerstack-sync`. Sheriff approved the merge; awaiting Draken.
2. **Qdrant: get a tag or stop promoting it.** `/go/qdrant` points at the plain homepage with no affiliate parameter. Every Qdrant click today earns $0, and ~20 Cluster 2 posts push it.
   - **Status 2026-11-11: no programme exists.** Qdrant runs no public affiliate/referral programme (only a startup discount programme). The link was added 13 Jun 2026 as a plain editorial link in the Pinecone vs Qdrant post and never had a tag. Sheriff's call pending: unlink it, or keep it as a plain editorial link.
3. **Twilio and HubSpot: remove the cards or get tags.** Both link to plain homepages with no affiliate relationship, yet carry a "Verified Partner" badge and 5 stars. Misleading as it stands.
4. **Route every card through `/go/*`.** Only 8 of 23 cards use the cloak; 15 link direct. Add cloaks for AiSDR, AGS, Tapstitch, Emergent (direct-only today). This is how the mismatches happened — one source of truth from here on.
5. **Change `/go/*` redirects from 301 to 302/307.** Permanent redirects get cached; if an ID changes, users keep landing on the old destination.
6. **Fix the tag typos.** `monday.com`, `AdCreative.ai`, `Apollo.io`, `openai`, `tavily`, `neo4j`, `voyageai`, `ollama` never match the component's keys, so those posts silently render no cards. Either fix the tags or the keys.
7. **Create the missing `/go/*` routes or remove the draft references.** `/go/tavily`, `/go/openai`, `/go/neo4j`, `/go/voyageai`, `/go/ollama` do not exist — drafts reference them and would 404 if published.
8. **Verify the two promo claims before using them:** n8n "20% off your first year" and Vultr "$300 in free credit".
9. **Add click tracking to `/go/*`.** There is none in the repo today. Without it, the funnel cannot be measured.
10. **Narrow the cards to tools actually used, or soften the policy line.** The policy says "only tools we use in daily workflows"; the component promotes 23, he uses 8. Also stop the auto-added 3 "Complementary RevOps Toolchain" cards on unrelated posts, and remove the "Verified Partner" badge from untagged cards.

Separate note, not affiliate revenue: the **SearchApi.io ambassador deal** (findings.md §7) was **rejected by Sheriff long ago** — the final offer was only 100k tokens. Not paid, not active, do not chase. It is not in the inventory and should stay out.

## 4. Start with three tools

1. **n8n** — 30% recurring for 12 months, Cloud only (self-hosted earns $0). Starter €20/mo = €6/mo per referral (€72/yr); Pro €50/mo = €15/mo (€180/yr). Reasons: highest demand in his audience, his core niche, the 3.0 upgrade wave is spiking now, and he uses it daily so the review is honest. Play: Cloud-curious readers via the 3.0 guide and "deploy n8n" tutorials.
2. **Brevo** — €100 per paid account + €5 per free signup (after the first paid referral), 90-day cookie. Reasons: fastest path to first dollars (one paid referral clears the €100 payout threshold on its own), and he runs it daily for transactional email. Play: "the email stack I actually run" inside n8n/automation tutorials.
3. **Vultr** — up to $100 per verified referral, one-off, 30-day cookie, referral must stay active 30+ days. Reasons: $100 per referral, and every "self-host n8n on a VPS" guide naturally starts with a Vultr VPS. Play: the Docker/VPS setup guides. (Verify the $100 figure in the Vultr dashboard — older pages show $35.)

Next in line: Apollo (4th, 15–20% recurring, lower audience demand) and ElevenLabs (5th, 22% recurring but small plan values — ~$4.84/mo per Creator referral).

## 5. First five pieces of content

1. **"n8n 3.0 silently breaks 3 things — check yours before December"** — YouTube @alfazreviews + DevTo/Hashnode/Blogger, linking to the live 3.0 guide. Tools: n8n Cloud + Krafera (`ALFAZUG20`). First because the spike is happening now (Trends peak 10 Nov) and stable lands early December for a second wave. Precondition: reconcile the n8n ID first.
2. **"Self-host n8n 3.0 on Vultr: the $5 VPS Docker setup"** — new blog post + YouTube. Tools: Vultr + n8n Cloud. Links to `/services/n8n-automation/` and the 3.0 guide. 3.0 kills npm/npx installs, so every self-hoster must move to Docker on a VPS.
3. **Refresh + video for the Apollo vs Lusha vs AiSDR comparison** — refresh the live comparison post, cut a YouTube comparison video. Tools: Apollo, Lusha, AiSDR. Comparison posts convert best; all three programmes exist. Precondition: reconcile the Apollo ID first.
4. **"Brevo IP warming walkthrough" video** — YouTube + DevTo, linking to the live Brevo IP-warming guide. Tool: Brevo. A walkthrough suits video; the cold-email audience is buyer-intent. Precondition: reconcile the Brevo ID first.
5. **"Pinecone vs Qdrant for n8n RAG" video + Bear Blog/WordPress syndication** — links to the live Pinecone-vs-Qdrant comparison and the 3.0 guide. Tools: Pinecone + Qdrant. RAG/vector is his deepest cluster (20 posts). Precondition: fix `/go/qdrant` — it earns $0 today.

Best existing homes already wired: the Cluster 2 self-hosted AI stack (20 posts), the outbound/RevOps cluster (Apollo, Lusha, AiSDR, Brevo), and the comparison posts. Biggest untapped home: the 30 Days of n8n series (~25 posts, no affiliate tags today) and the ManyChat pricing teardown.

## 6. Where links go — and where they do not

- **Service pages stay clean.** No affiliate links on `/services/*` — nothing competes with the high-ticket CTA. One honest exception: the n8n-automation FAQ ("Do I need to pay for n8n hosting?") can carry plain text links to `/go/n8n` and `/go/vultr`.
- **fasttools.me stays clean.** Its pitch is "no ads, zero tracking, 100% private" — an affiliate link undercuts the trust that makes the tools rank. One honest exception: the freelance rate calculator, one clearly-labelled text link ("freelancers run client work on n8n Cloud", `/go/n8n`). The crontab generator should instead link internally to the 3.0 guide's Schedule Trigger section (Cron/Interval are removed in 3.0).
- **`/audit/` stays clean.** It is the agency lead magnet.
- **`/partners/` sells placements.** It is not a place for outbound affiliate links.

## 7. What to measure (weekly)

1. `/go/*` clicks by destination — the funnel. Does not exist yet; add tracking first (fix #9).
2. PartnerStack clicks → signups → revenue, per programme. Revenue, not clicks, is the verdict.
3. Krafera/Gumroad sales + `ALFAZUG20` redemptions — the 3.0 guide's own monetisation, separate from PartnerStack.
4. 3.0 guide organic clicks (Search Console) — the leading indicator for the December spike.

Do not track as success: pageviews, impressions, likes, subscriber counts. None of them pay.

## 8. Realistic timeline

- First 6 months, 81% of beginners earn $0–$100/month; median time to first commission is 2–6 months; median to $1,000/month is 12–20 months. SaaS click-to-sale is ~1–2%.
- Alfaz is not a cold starter — he has the audience, the blog, and the tools already in use — but the honest 3–6 month target is first commissions, not a salary: a handful of paid referrals across n8n, Brevo and Vultr is roughly $100–$500 total, and the recurring tail only builds from there.
- What separates $0 from revenue: buyer-intent content (not traffic), links where the reader is already deciding, and surviving months 3–8 — 61% quit there and never pass $500/month.

## 9. Decisions needed

- **Sheriff:** approve the fix-first list (§3) and the three starters (§4).
- **Draken:** confirm the 4 active affiliate IDs in the PartnerStack/Brevo dashboards — only he can do this from the local PC. Then the code fixes follow.
- **Mikey:** once the IDs are confirmed, apply the code fixes, add `/go/*` click tracking, and start content piece #1 (n8n 3.0) while the spike is live.

Sources: Draken's affiliate inventory reply (2026-11-11, commit 30a51ea); repo audit of next.config.ts, components/DeployingTheStacks.js, app/editorial-policy/page.js, app/blog/[slug]/page.js; programme commission pages (n8n, Vultr, Brevo, Apollo, ElevenLabs); Google Trends 2026-11-11. Full research notes: workspace/directory-logbooks/affiliate-master-strategy-research-2026-11-11.md.
