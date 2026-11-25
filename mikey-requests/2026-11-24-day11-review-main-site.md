# Request (Mikey) — Day 11: existence check + ranking queries + main-site posts (2 pieces)

Date: 2026-11-24
From: Mikey. No-wait rule: this carries the existence check AND both drafts together. If a slug already exists in Sanity, skip that post and reply saying which.

## 1. Day 11 drafts — reviewed by Mikey, ready for the main site

Two pieces (last 2-a-day day; piece 1 this morning, piece 2 ~6h later). Both article files are staged in `mikey-requests/` alongside this request (Day 10 lesson — the file is in the push, not just referenced).

**Piece 1 — `article-ai-agents-buy-for-customers-day11.md`**
Title: "AI agents now sign in, book and buy for customers". Slug: `ai-agents-now-buy-for-customers`.
Verified facts — do not change the numbers: Cequence Agentic AI Security Index Report (released 23 Nov 2026, telemetry 16 May – 15 Nov 2026, six industries). Among agents tracked all six months, action-taking visits rose from 1.4% in May to 13% in November; action-taking visits grew 240%; read-only visits fell 73%; sign-in submissions up ~175%. Holiday deals 5–15 Nov: 3% of agent visits ended in a purchase vs a 0.2% baseline; agent purchases up ~1,600% on Prime Day in June. Travel: 59% of agent visits beyond browsing. Telecom sign-ins/account visits up 150% since May; financial services up 220%. Meta's Muse agent: 40% of all agent visits involving a transaction or account action in its first 30 days. Flip side: 63% of visits claiming to be Perplexity agents were probing for config files, keys and admin consoles; Cequence blocked 37,917 such visits. Sources: Cequence GlobeNewswire release + Infosecurity Magazine coverage (URLs in the article file).
Affiliate: /go/n8n — link "n8n" in the "where to run it" line.
Existence pre-check (Mikey): slug returns 404 on whoisalfaz.me/blog/ (curl, 24 Nov ~09:40 Dhaka). Your Sanity check is still the real one.

**Piece 2 — `article-microsoft-agent-framework-pypi-malware-day11.md`**
Title: "Two poisoned releases of Microsoft's agent-framework stole credentials — check your lockfile". Slug: `microsoft-agent-framework-pypi-malware`.
Verified facts — do not change the numbers: Microsoft's `agent-framework` Python SDK; two malicious releases 1.26.1 (17 Nov 20:35 UTC) and 1.26.2 (21:08 UTC), quarantined/removed by ~21:16 UTC — ~40 minutes live. Last clean release 1.26.0 (12 Nov). No CVE. GitHub advisory GHSA-764m-3ppc-5m73 (18 Nov); OpenSSF MAL-2026-20101. Each wheel added a `.pth` startup file (`agent_framework_meta.pth`, renamed `af_runtime_diag.pth` in 1.26.2) — runs at every Python start without an import. Stole env vars naming TOKEN/SECRET/KEY/AZURE/AWS/GITHUB, credential files (`~/.azure`, `.npmrc`, `.netrc`, `.git-credentials`, `.env`), Azure and GitHub Actions identity tokens, Azure managed-identity tokens; forked into a background process; exfiltrated compressed to a webhook.site URL. Package gets ~190,000 downloads/month. Dependency bots opened upgrade PRs within six minutes. How the attacker got publishing access is not explained publicly; JFrog's read is a compromised publishing credential, not a build-pipeline break-in. Fix order: pin `agent-framework==1.26.0`, rebuild from a clean base (do NOT run `pip show`/`pip uninstall` first — both start Python and fire the hook), rotate every credential from a clean machine. Sources: hol.org fix write-up + OpenSSF entry + OSCERD week-in-review (URLs in the article file).
Affiliate: /go/n8n — link "n8n" in the "where this bites agent builders" line.
Existence pre-check (Mikey): slug returns 404 on whoisalfaz.me/blog/ (curl, 24 Nov ~09:40 Dhaka). Your Sanity check is still the real one.

## 2. Existence check + ranking queries — please send both

- Check both slugs in Sanity. If either already exists, skip that post and reply saying which.
- Please also send the current ranking queries (GSC) for whoisalfaz.me and fasttools.me — the queries each site ranks for — so the next drafts can be built on them. If you cannot send them, say so and Sheriff will retrieve them himself.

## 3. Parasites — Mikey is publishing first

Publish-first rule: Mikey publishes both parasite rounds himself first (DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit) WITHOUT canonical and WITHOUT any "originally published" link-back line until your main-site posts are live — then Mikey adds both to each parasite post. Hashnode is IN for both pieces (neither is a deal post, so the deal-post spam wall does not apply). HackerNoon is on hold until the main-site posts are live (its canonical cannot be added later). No disclosure line in any parasite post (Sheriff's rule).

## 4. LinkedIn — no companions for Day 11

Companions stay paused pending Sheriff's spacing/format review (Day 6 incident). Do not post Day 11 companions.

## 5. Covers

Mikey made both covers (whoisalfaz.me only, under the subline, safe zone 10%+ from the left): `day11-piece1-ai-agents-buy-cover-branded.webp` and `day11-piece2-pypi-malware-cover-branded.webp` in `~/workspace/directory-logbooks/content-posting/`. Use them for the main-site posts if they help, or your own call.
