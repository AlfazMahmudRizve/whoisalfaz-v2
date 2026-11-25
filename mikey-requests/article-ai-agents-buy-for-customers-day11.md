# Article — AI agents now sign in, book and buy for customers — Day 11 (piece 1)

**Title:** AI agents now sign in, book and buy for customers
**Slug:** ai-agents-now-buy-for-customers
**Home angle:** whoisalfaz.me — original piece; affiliate link to n8n (/go/n8n, PartnerStack programme)
**Canonical URL:** none — original material.
**Links used:**
- Source: Cequence Agentic AI Security Index Report, released 23 Nov 2026 — https://www.globenewswire.com/news-release/2026/11/23/3408504/0/en/ai-agents-now-sign-in-book-and-buy-for-customers-while-bots-posing-as-agents-probe-for-secrets-based-on-cequence-agentic-ai-security-index-report.html
- Source: https://www.infosecurity-magazine.com/news/secrethunting-trafficai-agent/
- Affiliate: https://whoisalfaz.me/go/n8n — link "n8n" in the "where to run it" line ("The tools for this are the same ones used for any automation work: n8n for the workflow...")
**Parasites:** DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit — NO canonical and NO "originally published" link-back line until the main-site post is live. HackerNoon: hold until the main-site post is live. Bear Blog: skip unless Sheriff's Chrome (Turnstile still blocks the VM).
**Pinterest:** 1/day max, Sheriff's browser/phone only.
**LinkedIn:** PAUSED — no companions until Sheriff decides (Day 6 companions deleted).
**Disclosure line:** none — Sheriff's rule 2026-11-15: no disclosure line in parasite posts.
**Status:** DRAFT — written 24 Nov 2026, for Day 11 (Mon 24 Nov, piece 1). Per Sheriff 20 Nov: autopilot, no waiting for the existence reply — send the check AND the drafts together; if the slug already exists Draken skips that post and replies. Existence pre-checked by Mikey: slug 404 on whoisalfaz.me/blog/ (curl, 24 Nov ~09:40 Dhaka); Draken's Sanity check is still the real check.
**Style checks:** no banned words, no disclosure line. All numbers from the Cequence release / Infosecurity coverage.
**Caption / hook:** AI agents stopped just reading pages. They now sign in, book and buy. Cequence tracked six months of agent traffic — action-taking visits rose from 1.4% in May to 13% in November.

---

AI agents stopped just reading pages. They now sign in, book and buy.

Cequence Security tracked six months of agent traffic on the sites it protects — 16 May to 15 November 2026 — and published the first Agentic AI Security Index on 23 November. The headline number: among agents present for the whole six months, the share of visits where the agent took action rose from 1.4% in May to 13% in November. Taking action means signing in, booking, buying, managing an account or paying.

That is a change in what agents do, not just how many of them show up. Action-taking visits grew 240% over the six months. Read-only visits fell 73%. Sign-in submissions rose about 175%. The shift is clearest at sign-in, account and checkout pages — the pages where a customer used to do the work themselves.

The holiday numbers make it concrete. During early holiday deals from 5 to 15 November, 3% of agent visits ended in a purchase, against a 0.2% baseline earlier in the year. At the same retailers, agent purchases were up about 1,600% on Prime Day in June.

Travel leads the shift: 59% of agent visits went beyond browsing, mostly to book a trip. Telecom is next in line — agent sign-ins and account visits up 150% since May, with 16% of visits going beyond browsing. Financial services moved too, with sign-ins up 220%, though nearly two-thirds of agent visits there were still informational — terms and help pages.

Not all agents act the same way. Meta's Muse agent accounted for 40% of all agent visits that involved a transaction or account action in its first 30 days, and about half of Muse visits involved signing in, booking, buying or managing an account. Amazon's shopping agent did the same in about 1% of its visits. Six new types of consumer agent appeared between late September and early October, as the fall wave of consumer agents arrived.

There is a second half to this story, and it matters for anyone building with agents. As agents gained enough trust to log in and pay, their names became worth stealing. Cequence found bots using AI agent names as cover to probe for secrets: 63% of visits claiming to be Perplexity agents were probing for configuration files, keys and admin consoles. Cequence blocked 37,917 such visits in the study window. Agent names are self-reported, so any bot can claim one.

What to do with this, if you run agent workflows for clients:

1. Treat agent checkouts as a workflow with checks, not a chat prompt. An agent that can pay needs spending limits, an approval step for anything above a set amount, and a receipt check after the purchase.
2. Give each agent its own credentials, scoped to what it needs. A shared login that can also change account settings is the credential a bot will try to copy.
3. Watch sign-in and checkout pages the way you watch uptime. That is where agents now work — and where bots pretending to be agents now probe.

The tools for this are the same ones used for any automation work: n8n for the workflow, with the agent's steps, limits and checks written down where they can be reviewed. The Cequence index will be updated after Black Friday and Cyber Monday, with a year-end review and a 2027 forecast in January — worth a second look then, once the holiday traffic is in.

## FAQ (for the main-site post)
- **Did AI agents really start buying things?** Yes, for customers, on sites that allow it. Cequence measured agent visits that signed in, booked, bought or managed an account rising from 1.4% to 13% between May and November 2026.
- **Which industry moved first?** Travel: 59% of agent visits went beyond browsing, mostly to book a trip.
- **What is the risk?** Bots use trusted agent names as a disguise to probe for secrets. 63% of visits claiming to be Perplexity agents were probing for configuration files, keys and admin consoles.
- **What should an agency change first?** Spending limits, an approval step above a set amount, and separate scoped credentials per agent.
