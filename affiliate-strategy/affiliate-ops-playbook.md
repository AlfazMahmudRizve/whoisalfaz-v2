# Affiliate Ops Playbook — Alfaz Reviews

Last updated: 2026-11-11. Owner: Mikey. Mandate from Sheriff (2026-11-11): work continuously even without him, send regular updates, expand the parasite list, build a monthly roadmap and execute it autonomously, keep an issue→solution log so nothing stalls, maintain the sheet, keep a standing subagent team.

Companion doc: `~/workspace/your_files/affiliate-master-strategy-2026-11-11.md` (strategy, starters, content plan). This playbook is the operations manual — how the work runs week to week.

## 1. Inventory snapshot (2026-11-11)

- **31 programmes on file** — 21 original (PartnerStack ~14, plus direct/Rewardful) + 10 new PartnerStack ones synced 2026-11-11 (Vista Social, SoftSync, Runpod, ClickUp, Staytuned Digital/Zenpire, Deel, Plansom, MindStudio, Foxit, CallHippo).
- **Vultr** — separate direct affiliate (not PartnerStack).
- **2 Gumroad programmes** — Krafera Upgrade Watch (https://gumroad.com/a/74272099/pbeqo) and Krafera Silent Failure Watch (https://gumroad.com/a/74272099/lltue), both n8n-related, verified live 2026-11-11.
- **3 pending PartnerStack applications** — 1Password, FreshBooks, Airwallex. Nothing to sync until approved.
- **Earnings to date: $0.** No clicks tracked yet — `/go/*` click tracking does not exist in the repo; add it before judging any programme.
- **Merge pending:** branch `feat/affiliate-10-partnerstack-sync` (0cd2f3c) holds the 10 new redirects + cards + the 4 fixed card IDs. Sheriff approved the merge 2026-11-11; merge request sent to Draken (a264080). Nothing is live until Draken merges and Mikey verifies on main.
- **Starters:** n8n (30% recurring, Cloud only), Brevo (€100 per paid), Vultr (up to $100 one-off). Realistic 3–6 month target: $100–500 in first commissions.

## 2. Weekly cycle

One cycle per week, same order every time. Do not skip verification — nothing is "done" until a live check proves it.

1. **Research (Scout).** Morning trend check (cron `x-trend-morning-check`, daily 09:00 Asia/Dhaka, web search only, silent when nothing new). Watch: n8n / n8n 3.0, agentic workflows, AI tools, SaaS/free tools, SEO, freelance tools + affiliate programmes in the inventory (price changes, launches, deals). Pick one lead topic per week.
2. **Draft (Writer).** One review/tutorial per week, review-first: what worked, what broke, who it is for. Link only to tools actually used. Drafts on `mikey/<task>` branches, never direct to main. FTC disclosure near every affiliate link.
3. **Publish (Publisher).** Blog post on whoisalfaz.me (via Draken review/merge), then parasite round: DevTo, Hashnode, Blogger, WordPress.com, Bear Blog (+ new sites as the parasite list expands). Canonical to the original post where accepted. Deep links, not homepage only. No TempMail anywhere (frozen).
4. **Verify (Verifier).** Every published link checked live: HTTP status, final destination, `rel` attribute (dofollow vs nofollow vs ugc), canonical present where set. Log the result the same day. If a link is dead or wrong, it goes in the issue log and gets fixed before the next cycle.
5. **Report (Tracker).** Sheet + logbooks updated, then a short update to Sheriff (main chat + WhatsApp): what shipped, what earned (if anything), what is blocked, what is next. Short and specific — his format: (1) submitted sites + status, (2) sites needing a badge, (3) blocked sites + why in one-liners, (4) total preview.

## 3. Monthly roadmap

- First roadmap: **December 2026**. Built in the last week of the previous month, executed autonomously through the month.
- Each roadmap: 4 weekly topics (one per cycle), the programmes each one monetises, the parasite sites each round hits, and the one fix/expansion task for the month (e.g. add a new parasite site, fix a leak, add click tracking).
- December context: n8n 3.0 stable lands early December (second wave after the beta spike); the 3.0 guide's node list needs a re-check against stable. Agentic workflows: Ignite 17–20 Nov.
- Roadmap lives here in the goal files; progress is tracked in the weekly reports, not in a separate system.

## 4. Standing subagent team

Spawned in parallel, one per role, per cycle. Roles stay fixed so nothing gets dropped.

| Role | Job | Never does |
| :--- | :--- | :--- |
| **Scout** | Trend + programme research; finds the week's topic, price/launch changes, new programmes worth joining | Never publishes, never guesses a price — live sources only |
| **Writer** | Review/tutorial drafts from the research; honest, specific, no hype words (banned: comprehensive, innovative, transformative, revolutionary, leverage, utilize, robust, seamless, holistic, landscape, crucial, pivotal) | Never invents a claim, a price, or a result; every fact needs a source |
| **Publisher** | Posts copy to parasite sites (standing approval from Sheriff — no per-post approval needed); sets canonicals; records live URLs; notifies Sheriff on WhatsApp for each work item | Never posts on a banned/blocked account; never posts anything naming a client without Sheriff's say |
| **Verifier** | Live-checks every link after publishing (status, destination, rel, canonical); checks `/go/*` redirects after any Draken merge | Never declares "live" from a screenshot or a claim — curl/browser evidence only |
| **Tracker** | Sheet + logbooks + this playbook's issue log; keeps counts honest | Never edits the sheet format; never marks anything done without Verifier evidence |

Mikey coordinates, reviews, and is the only one who talks to Draken (via `mikey-draken-sync`) and to Sheriff.

## 5. Sheet maintenance rules

- Sheet: "Directory Listings — Alfaz Mahmud Rizve" (ID `13idEkZ4awtTQkEvvEURVXBElOLozA6BZeRn3shrsihM`). 3 tabs: TempMail, fasttools.me, whoisalfaz.me. Do not share publicly. Repo logbooks are source of truth; the sheet is the reusable index.
- **6 columns only: Site | Link | Status | Link type | Date | Note.** No Account or Anchor columns. Notes are one short line.
- Update the sheet the same day a link goes live. Never batch a week's links into one late update.
- TempMail tab is frozen — no new rows until Sheriff unfreezes TempMail.

## 6. Parasite list (current)

Live: DevTo, Hashnode, Blogger, WordPress.com, Bear Blog, Contra, Peerlist, Indie Hackers. Not yet started: Mataroa, GitBook, GitLab, Telegraph. Blocked/out: Medium (Turnstile loop), Substack (sign-in blocked), Quora (banned — dropped by Sheriff, do not revisit unless he raises it). X @alfazreviews: account created 2026-11-11, first sign-in blocked by temporary limit, retry scheduled 2026-11-11 21:00; no tweet until the account is verified live.

Expansion rule (Sheriff, 2026-11-11): keep adding sites to this list. Before opening any new site, research it live first — price, badge, sign-in terms — per the pre-check rule. Free only, no paid plans.

## 7. Guardrails (non-negotiable)

- **Nothing merges to main without Sheriff's say.** Draken merges; Mikey never merges. Work on `mikey/<task>` branches; Mikey–Draken conversations only on `mikey-draken-sync`; GitHub pushes only via the connector, never plain `git push`.
- **TempMail is FROZEN** (2026-11-10, until further notice). No TempMail submissions, posts, outreach, restore work, or follow-ups. Work on whoisalfaz.me / fasttools.me instead.
- **FTC disclosure** on every affiliate post, near the link, every time. `/go/*` cloaking with `rel="sponsored"` + `noindex, nofollow` on every affiliate link.
- **Never buy links, PBNs, or brokers. Never automate comment spam.** Anchors 70%+ brand/URL, 20% topical, <10% exact match. Never submit identical copy across directories.
- **Never guess.** Verify live or ask. Never report Search Console figures from memory — live reads only. Label Draken-reported data as such until verified live.
- **Never ask Sheriff for a login** or send secure entry cards in chat. Continue with Google where offered, otherwise browser-generated password saved in the browser. If a sign-in truly cannot proceed without him, say so in one short line and stop.
- **No Bangladesh** in any bio or Location field. Personal profile website is always https://whoisalfaz.me. Ask before using his photo anywhere; never reuse the same photo across services/covers.
- **SearchApi.io ambassador deal: rejected long ago, do not chase.** Final offer was only 100k tokens; not paid, not active.

## 8. Issue → solution log

Format per entry: **Date — Issue — What happened — Fix — Status.** New entries go at the top. When an issue is found, tell Sheriff, then immediately research why it happened and the solution — do not wait to be asked (issue rule, 2026-11-08).

### Seeded entries (solved)

- **2026-11-11 — Qdrant has no affiliate programme —** `/go/qdrant` pointed at plain cloud.qdrant.io with no tag, earning $0. Sheriff thought the link came from PartnerStack. Checked git history: the redirect was added 13 Jun 2026 (commit b460146) as a plain editorial link in the Pinecone vs Qdrant blog post; it never had a tag and never came from PartnerStack — Pinecone is the PartnerStack one in that pair. Two web searches found no public Qdrant affiliate/referral programme (only a startup discount programme). **Fix:** none available from PartnerStack. Open call for Sheriff: unlink `/go/qdrant`, or keep it as a plain editorial link. If it should ever earn, the only route is asking Qdrant directly about a partnership. **Status: awaiting Sheriff's call.**
- **2026-11-11 — 4 mismatched affiliate IDs —** DeployingTheStacks.js cards and `/go/*` cloaks sent clicks to different IDs for n8n, Brevo, Apollo, Databox; the old card IDs were 404s. Draken confirmed the cloak IDs in `next.config.ts` are current (n8n `ch585gsqzanp`, Brevo `6b88c13841c4`, Apollo `get.apollo.io/bs1ny1i5eigv`, Databox `join.databox.com/qfzdqmwp7elc`). **Fix:** cards re-pointed to their `/go/*` cloaks in branch `feat/affiliate-10-partnerstack-sync`; merge approved by Sheriff, merge request sent to Draken (a264080), awaiting merge. **Status: fixed on branch, pending merge.**
- **2026-11-11 — WordPress Stripe post nofollow duplicate links —** "What Stripe Actually Takes From a $100 Payment" had each dofollow anchor followed by a bare-URL nofollow duplicate of the same link. **Fix:** removed the 3 bare parenthetical URLs; exactly 3 proper dofollow anchor links remain; verified on the live page; logbook updated. **Status: solved.**
- **2026-11-11 — Bear Blog links posted as plain text —** the cron article's links were pasted as plain text and not clickable. **Fix:** edited the post to real links, verified clickable live. Note: the post has no cover image; a free Bear account cannot upload one. **Status: solved.**
- **2026-11-11 — X sign-in temporary limit —** first login attempt for new @alfazreviews account blocked by X ("temporarily limited your login"); password step never reached. X's help says the lock clears on its own in about an hour after failed sign-in attempts. **Fix:** stop all sign-in attempts, do not request password resets while waiting, retry once after ~1 hour. Retry scheduled 2026-11-11 21:00. **Status: retry pending.**
- **2026-11-11 — Substack sign-in blocked —** sign-in page has no Continue with Google; entering the email fails with "Something went wrong". Worth 3 links per site, 9 total, if it unblocks. **Fix:** Sheriff is attempting the sign-in himself in the VM browser; completion unconfirmed. No workaround found yet. **Status: open, with Sheriff.**
- **2026-11-07 — Medium Turnstile loop —** Medium sign-in shows a Cloudflare Turnstile "Verifying…" box that loops/reloads in the VM browser; Alfaz tried it multiple times and is still blocked. WARP is not a workaround (cannot connect in this VM). **Fix:** none yet; Alfaz keeps trying the box himself or hands the browser back. **Status: open, blocked.**
- **2026-11-08 — Quora banned, appeal rejected —** account banned for "multiple violations of Quora's spam policies"; 0 answers, all deleted. Appeal rejected 2026-11-08 as final; reply invites a fresh account. **Fix:** none — Sheriff decided 2026-11-11 to DROP Quora for now: no fresh account, no asking Quora what was flagged. Revisit only if he raises it. **Status: closed by Sheriff's decision.**
- **2026-11-06/07 — Dofollow.Tools daily quota —** submission blocked twice by a site-wide daily quota (6 and 7 Nov). Free listing is dofollow only while the badge stays on temp-mail10min.online; badge pending via Draken/Alfaz. **Fix:** retry later, early in the day. Currently moot — TempMail is frozen. **Status: open, frozen.**
- **2026-11-09 — TopTechNews pitch delivery failed —** pitch sent 2026-11-06 to write@toptechnews.in; Gmail DSN 2026-11-09: recipient server timed out on all four addresses, retries exhausted; the 5–10 business day review clock never started. Logbook/sheet still say SUBMITTED (stale). **Fix:** decision needed from Sheriff — resend once, drop it and mark failed, or hold. Currently frozen with TempMail. Do not resend or edit logbook/sheet until he chooses. **Status: open, frozen, awaiting Sheriff.**

### Open decisions (not issues — need Sheriff)

- Qdrant: unlink vs keep as editorial.
- Gumroad programmes — names confirmed 2026-11-11 (Krafera Upgrade Watch + Krafera Silent Failure Watch). Commission rate unknown — check the Gumroad dashboard.
- 1Password / FreshBooks / Airwallex — sync when PartnerStack approves them.
- Draken's merge of `feat/affiliate-10-partnerstack-sync` — approved, awaiting Draken.
- Twilio / HubSpot cards: no affiliate relationship, "Verified Partner" badge hardcoded on all cards — remove the cards or fix the badge (part of the affiliate-fixes package, not yet done).
- Vultr copy: $35 CPA to Alfaz vs $100 credit to the reader; "$300 promo" not standard. n8n "20% off first year" unverified.
- 5 `/go/*` in drafts with no programmes (tavily, openai, neo4j, voyageai, ollama) — remove from drafts, link direct.
