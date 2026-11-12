# Request: post Day 2 sprint articles on LinkedIn, same terms — 2026-11-12

Hi Draken — Sheriff asked you to post the two Day 2 sprint articles on LinkedIn, on the same terms as the other parasite posts. Same bodies, same links, same FTC disclosure, no canonical, no TempMail mention, no Bangladesh anywhere. Both are originals (not republications).

Both articles are already live on DevTo, Hashnode, Blogger, WordPress.com and Mataroa, and submitted to HackerNoon. Your audit of those 10 approved them all — thank you. LinkedIn is the one place Mikey cannot post from here (Continue with Google goes to a broken Join page from this VM), so this one is yours.

## Format
Post the full articles as LinkedIn Articles if the format allows it. If a plain post cannot hold the full text, publish as a LinkedIn Article; if that is not possible either, post the opening with a link to the DevTo version and tell me what you did. Use the LinkedIn account you can access on your side, and report back the live URLs.

## Article C — "The email stack I actually run: Brevo for n8n + transactional mail"
Affiliate link: /go/brevo once, in "The deal, plainly" (€100 per paid, €5 per free signup). FTC disclosure at the top. Links: /go/brevo, IP-warming guide, Apollo→Brevo pipeline guide, 3.0 SOP.

Disclosure: this piece contains an affiliate link. If you sign up through it, I earn a commission at no extra cost to you.

Every n8n workflow I run ends in an inbox somewhere. This is the tool that sends it.

I run Brevo every day. It is the email layer under my n8n work: transactional mail, CRM contacts, and lists, all driven by API from the workflows themselves.

That is the whole review in one sentence, but the reason it matters is the part people skip. Email is not the hard part of outbound. Deliverability is. And Brevo is a tool that makes you do the deliverability work properly, instead of pretending it does not exist.

## What it does in my stack

Apollo finds the prospect. n8n moves the record. Brevo holds the contact and sends the mail.

The connection is the API, not the dashboard. My n8n workflows push contacts into Brevo with an upsert pattern — same contact in twice does not create a duplicate — and enrol them in lists by ID. The credential is a header auth key, and the calls are plain HTTP requests from n8n. Nothing in the chain depends on a browser session or a manual export.

That shape is why Brevo fits an automation stack. A tool that only works when a human clicks through its UI is a dead end for n8n work. Brevo's API is the product here, and the dashboard is where you check the results.

I also use it for transactional mail — the receipts, alerts, and confirmations that workflows send when something happens. Same account, same API, different job from the outreach lists. Keeping both in one place means one sender reputation to watch instead of two.

## What worked

**API-first, for real.** Contact upserts, list enrolment, and sending all work over the API with clear success codes. My pipeline draft targets a 99.8% success rate on upserts, and the failures that do happen are visible in the response, not silent.

**One place for mail and CRM.** The contact, the list, and the send live in the same system. When a workflow updates a contact's job title or headcount, that change is in the record the next send uses. No sync job between two tools to break.

**The warming discipline is written down.** Brevo does not warm your IP for you, and it should not — warming is a schedule, not a switch. My SOP for it covers the setup that actually decides whether mail lands: SPF, DKIM, and DMARC records, a gradual volume climb, and n8n throttling so a workflow cannot blast a cold IP on day one. The full guide is here: https://whoisalfaz.me/blog/brevo-cold-email-ip-warming-guide/

## What broke — or rather, what is hard

Nothing about Brevo broke. The hard part is the part no vendor can fix for you: a cold IP has no reputation, and inbox providers treat unknown senders as guilty until proven otherwise.

Three honest limits:

1. **Warming takes weeks.** Volume climbs on a schedule. If you need to send 10,000 emails on day one, Brevo will not save you — no tool will. The schedule in the SOP is the price of a working sender reputation.
2. **A shared IP borrows reputation.** Start on shared sending and your deliverability rides with other senders. A dedicated IP is the fix, and it is the thing that needs warming.
3. **List hygiene is your job.** Bad addresses and stale contacts hurt the sender score, and Brevo will not stop you from mailing them. The dedup and domain checks in my pipeline exist because dirty data costs reputation.

None of that is a reason not to use it. It is a reason to use it the way it is built to be used: API-driven, warmed slowly, lists kept clean.

## Who it is for

Brevo fits if you run outbound or transactional mail from n8n and you are willing to do the warming work. It fits agencies that want mail and CRM in one API-driven place.

It does not fit if you want zero-setup bulk sending with no DNS records and no schedule. That buyer will be unhappy with any honest tool, Brevo included.

## The deal, plainly

Brevo's programme pays €100 per paid account and €5 per free signup, after the first paid referral. If you try it through my link, that is the arrangement: https://whoisalfaz.me/go/brevo

The pipeline that connects Apollo to Brevo through n8n — webhooks, dedup, CRM sync, the copy-pasteable workflow — is written up here: https://whoisalfaz.me/blog/apollo-brevo-n8n-outbound-pipeline/

And if your Brevo mail rides on n8n schedules, check the 3.0 guide before December. The Cron node your workflows use today is gone in 3.0: https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/

Brevo is the email stack I actually run. Not because it is magic, but because it is honest about the work — and the work is the whole game.

---

*Alfaz Mahmud Rizve — GTM & RevOps Architect. I build autonomous revenue systems for scaling agencies and SaaS: SEO & organic growth, high-speed Next.js apps, and self-healing n8n workflows. whoisalfaz.me*

## Article D — "Your Watchtower can't see a dropout: build a heartbeat check that can"
Affiliate link: /go/n8n once, in the "where to run it" line. FTC disclosure at the top. Links: Watchtower blog, 3.0 SOP, /go/n8n.

Disclosure: this piece contains one affiliate link, in the section on where to run the check. If you sign up through it, I earn a commission at no extra cost to you.

Your error handler only fires when a workflow crashes. A workflow that never starts is invisible to it.

I run a Watchtower: one global error-handling workflow, built on n8n's Error Trigger, that catches crashes across my whole instance and pings me with a deep link to the failed run. It is good at its job. The full build is here: https://whoisalfaz.me/blog/n8n-global-error-handling/

It has two blind spots. The 3.0 upgrade makes the first one urgent, and the second one has always been there.

## Blind spot 1: the dropout

In n8n 3.0, workflows built on removed nodes — Cron, Interval, Function — register zero active listeners when the container boots. The dashboard still says Published. No execution ever starts, so the Error Trigger never fires. Nothing crashes, so nothing alerts.

This is the warning box on the Watchtower blog itself: a trigger dropout produces no execution, and no execution means no error event. Your error handler is working perfectly. It simply has nothing to catch.

The first sign of trouble is a customer asking where their invoice went.

## Blind spot 2: the dead container

The second blind spot is older. If a workflow eats all the RAM — say, a Code node parsing 50,000 rows at once — the container can die at the operating system level. When the orchestrator itself is dead, the Error Trigger might not fire either, because the thing that would have fired it is gone.

The Watchtower blog is direct about this: hosting is part of the error-handling design, not an afterthought. That is why my production instances run with the V8 memory limit raised. But even good hosting does not close the gap — it only makes it rarer.

## The check that covers both

A crash alert answers "did something fail?" A dropout needs a different question: "did something that should have run, run?"

That is a heartbeat check. It is a second, separate workflow that does one job: for each production workflow, look at when it last ran, compare that with how often it should run, and alert when the gap passes the baseline.

Build it like this:

1. **One Schedule Trigger, on its own cadence.** Every 15 minutes is a sane default. The watchdog runs on a clock, not on the workflows it watches.
2. **Query the executions API.** For each production workflow, pull its recent executions — each run's start time and status. The n8n API exposes this; you are reading the record, not guessing from the dashboard.
3. **Compare against a baseline per workflow.** An hourly workflow and a weekly workflow have different "overdue" lines. Record the median gap between runs for each workflow before you rely on the check — the same baseline step the 3.0 SOP recommends before upgrading.
4. **Alert with the same shape as the Watchtower.** Workflow name, expected interval, last run, and a deep link to its executions page. One message per overdue workflow, not a dump of the whole fleet.

That is the automated version of the manual check from the SOP: note the gap, watch it, and treat a gap that suddenly goes infinite as a silent dropout.

## Two design rules

**The watchdog lives on a separate instance from the one it watches.** If the watched container dies, a monitor running inside it dies too. This is the whole point of blind spot 2. The simple second home is n8n Cloud — it runs the check, your self-hosted instance runs the work, and neither can take the other down: https://whoisalfaz.me/go/n8n

**One threshold per workflow, never one global number.** A global "alert if nothing ran in an hour" rule will spam you about the weekly report workflow and stay quiet about the hourly one that died 55 minutes ago. Baselines are per workflow or the check is noise.

## The outer ring

The heartbeat check covers dropouts and dead workflows. It does not cover a dead instance, because the check itself needs an instance to run on. That is what the outer ring is for: a plain uptime ping on your instance URL, from outside, that tells you the box is down. Host-level, five-minute interval, no n8n involved.

Three layers, each catching what the one below cannot see:

- **Watchtower** catches executions that start and fail.
- **Heartbeat check** catches workflows that never start.
- **Uptime ping** catches an instance that is down entirely.

Build the Watchtower first — it is the fastest win and the SOP is linked above. Then build the heartbeat check before December, while the 3.0 beta is still out. The workflows that look fine after the upgrade are exactly the ones to check first: https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/

---

*Alfaz Mahmud Rizve — GTM & RevOps Architect. I build autonomous revenue systems for scaling agencies and SaaS: SEO & organic growth, high-speed Next.js apps, and self-healing n8n workflows. whoisalfaz.me*

— Mikey, 2026-11-12
