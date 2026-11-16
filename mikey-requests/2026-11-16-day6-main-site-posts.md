# Request — Day 6 main-site posts (publish to Sanity) — 2026-11-16

From: Mikey. Sheriff asked on 2026-11-16 for new blogs on the MAIN site, not just the parasite sites. Please publish both posts below to the whoisalfaz.me blog (Sanity), L first, then K. Both are originals — no canonical override.

## Post 1 — publish first (L, Stripe)

- **Title:** What Stripe actually takes from a $100 payment
- **Slug:** what-stripe-takes-from-100-payment
- **URL (expected):** https://whoisalfaz.me/blog/what-stripe-takes-from-100-payment
- **Description:** A $100 sale on Stripe puts $96.80 in your account — and an international card takes another $1.50 on top. The exact math, and the three fees that catch people out.
- **Cover:** sent to Sheriff on WhatsApp with this request ("$100 → $96.80", verified correct) — binary images cannot go through the sync-branch push, so Mikey sends them that way
- **Links in body:** https://fasttools.me/stripe-fee-calculator (free tool, no affiliate link in this piece)
- **Facts:** all Stripe US figures verified live on stripe.com/pricing 2026-11-16 (2.9% + 30c, +1.5% international, +1% conversion, 3.4% + 30c manual entry, $15 dispute, Billing 0.7%, ACH 0.8% capped $5).

### Body (L)

A $100 sale on Stripe does not put $100 in your account. On the standard US rate it puts $96.80 there. The gap is small on one sale and large across a year of them, so it is worth knowing the exact numbers before you set a price.

## The $100 math

Stripe's standard US rate for an online card payment is 2.9% plus 30 cents per successful charge, with no setup or monthly fee on the standard plan. Rates checked against Stripe's published US pricing in October–November 2026; Stripe sets rates country by country, so check your own country's page before you quote a number to a client.

On $100, domestic US card:

- 2.9% of $100 = $2.90
- Plus the fixed 30 cents = **$3.20 fee**
- You keep **$96.80**

The same rate on other amounts:

- $10 sale: $0.29 + $0.30 = $0.59 fee, keep $9.41
- $50 sale: $1.45 + $0.30 = $1.75 fee, keep $48.25
- $1,000 sale: $29.00 + $0.30 = $29.30 fee, keep $970.70

The fixed 30 cents is why small sales hurt more: on a $10 sale the fee is 5.9% of the price, on a $100 sale it is 3.2%, on a $1,000 sale it is 2.93%. If you sell $5 downloads, the fixed fee is the whole story.

## The three fees that catch people out

**International cards add 1.5%.** A $100 payment from an international card costs 4.4% + 30 cents = $4.70, and you keep $95.30. If currency conversion is also needed, add another 1%: 5.4% + 30 cents = $5.70, and you keep $94.30. A shop with mostly overseas buyers is not paying 2.9% — it is paying 4.4% or 5.4%.

**Manually entered cards add 0.5%.** A card keyed in by hand instead of taken through Checkout costs 3.4% + 30 cents. On $100 that is $3.70, and you keep $96.30.

**A dispute costs $15.** Stripe charges $15 to receive a dispute, plus another $15 if you respond to it — the second $15 comes back if you win. A refund does not return the original processing fee. One dispute wipes out the margin on roughly five $100 sales.

Subscriptions add their own layer on top of the card fee: Stripe Billing is 0.7% of billing volume, so a $50-a-month US subscription paid by a domestic card costs $1.75 in card fees plus 35 cents for Billing — about 4.2% all in, before Stripe Tax at 0.5% if you use it.

## What worked

**The calculator keeps the math honest.** The free tool at https://fasttools.me/stripe-fee-calculator runs the same numbers for any amount, with country pages for the US, UK, EU, Canada, Australia and international cards — no login, no tracking, your numbers stay in your browser.

**No monthly fee means the rate is the whole cost.** On the standard plan there is no setup, monthly or closure fee. You pay only when money moves, which makes Stripe easy to price against: the fee is a percentage of what you take, not a bill that arrives in a slow month.

**ACH is the cheap escape for big invoices.** ACH Direct Debit is 0.8%, capped at $5. On a $1,000 invoice that is $5 instead of $29.30. It is slower and it does not fit a checkout page, but for a $1,000 client invoice it is the right call.

## What broke — or rather, what is hard

**The headline rate is only the first layer.** Card processing, Billing, Tax and Radar are each charged separately. A subscription quoted at "2.9%" is really 4.2% once Billing is on, and more again with Tax — and none of that shows in the headline.

**Small sales carry the fixed fee.** The 30 cents never shrinks. A $5 sale loses 8.8% to fees, a $10 sale loses 5.9%. If your price is under $10, either raise it, bundle, or take the payment another way.

**International buyers quietly cost more.** The 1.5% international surcharge and the 1% conversion fee are easy to miss in a price list, and they land on exactly the sales you were happiest to get.

## Who it is for

This fits if you sell online and you set prices by gut feel — run your real average sale through the calculator once and the fee stops being a surprise at payout time. It fits less if you only take bank transfers or cash, where none of this applies. It does not fit if you need a quote for high-volume custom pricing — Stripe negotiates that directly, and the standard rate is not your rate at that size.

## The deal, plainly

The calculator is free: https://fasttools.me/stripe-fee-calculator — no login, no tracking. Run your own price through it before you set it, not after the first payout.

Price for what you keep, not what you charge. The 3.2% was never yours.

## Post 2 — publish second (K, n8n Cloud vs self-hosted)

- **Title:** n8n Cloud vs self-hosted: where your workflows should live
- **Slug:** n8n-cloud-vs-self-hosted
- **URL (expected):** https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted
- **Description:** Cloud costs $20 a month and caps you at 2,500 runs. Self-hosted costs about $5 a month and caps you at nothing — except your own time. Count your runs, then pick a side.
- **Cover:** sent to Sheriff on WhatsApp with this request ("$20/mo" cloud vs "$5/mo" self-hosted, verified correct) — binary images cannot go through the sync-branch push, so Mikey sends them that way
- **Links in body:** https://whoisalfaz.me/go/n8n (Cloud only), https://whoisalfaz.me/go/vultr, https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/
- **Facts:** n8n prices verified live on n8n.io/pricing 2026-11-16 — US dollars, NOT euros (draft corrected): Starter $20/mo annual ($24 monthly), Pro $50/mo annual ($60 monthly), Pro 50K $120/mo annual. Frankfurt hosting CONFIRMED (n8n FAQ: hosted data stored in the EU, Frankfurt, Germany). /go/vultr redirects to https://www.vultr.com/?ref=9849830-9J — confirmed in the browser; the Vultr homepage itself only fails to render in the VM because Cloudflare blocks the VM egress IP (known issue, link itself is fine).

### Body (K)

Cloud costs $20 a month and caps you at 2,500 runs. Self-hosted costs about $5 a month for the server and caps you at nothing — except your own time. The right choice is a math problem, and most people solve it with the wrong numbers, because they count the server bill and forget the execution count.

## The Cloud prices, as they stand

n8n prices Cloud in US dollars, and one execution is one full run of a workflow, however many steps it has. A 3-node workflow and a 50-node workflow both cost one execution. Prices below are from n8n's pricing page as checked live on 16 November 2026; n8n changes packaging, so check the page before you buy.

- **Starter — $20 a month on annual billing ($24 month to month).** 2,500 executions a month, 5 concurrent executions, 1 shared project, single runs capped at 5 minutes.
- **Pro — $50 a month on annual billing ($60 month to month).** 10,000 executions a month, 20 concurrent executions, 3 shared projects, single runs capped at 40 minutes.
- **Pro 50K — $120 a month on annual billing.** 50,000 executions a month.

Every Cloud plan includes unlimited users and unlimited workflows — only execution volume changes the bill. Cloud data is hosted in Frankfurt, and n8n patches, backs up and keeps the service up for you.

## The execution math that decides it

Count runs per month, not workflows. A schedule that fires every 5 minutes lands at roughly 8,600 to 8,900 executions a month for one workflow alone.

- **1 workflow, hourly:** 720–744 runs a month. Starter covers it, with room to spare.
- **3 workflows, hourly:** 2,160–2,232 runs a month. Still Starter.
- **1 workflow, every 15 minutes:** 2,880–2,976 runs a month. Starter is out — Pro, at $60 a month.
- **1 workflow, every 5 minutes:** 8,640–8,928 runs a month. Pro, nearly full.
- **2 workflows, every 5 minutes:** over 17,000 runs a month. Above the 10,000 Pro tier — a bigger Pro size, or self-hosted.

Polling is what eats the budget. A workflow that checks an inbox every 5 minutes costs more in a month than a workflow that runs a hundred times a day on webhooks, because webhooks only fire when something happens.

## The self-hosted side

The Community edition is free software with no execution cap — you pay only for the server. A small VPS runs about $5–6 a month, and the setup runs n8n 3.0 in Docker on Vultr: 3.0 killed npm installs, so Docker is the way in.

What you pay for in Cloud, you do yourself here: you patch n8n when a release lands, you back up the database, you watch the disk fill up, you restart the container at 2 a.m. when a workflow dies. That is the real price, and it is paid in your evenings, not on a card. For client work, there is one more line: run it on the client's Cloud account, not yours — https://whoisalfaz.me/go/n8n — so the executions, support and uptime belong to the business that depends on them, and your fee stays a fee for the build.

## What worked

**Cloud is the right default for client work.** No server to keep alive, no patch night, no 2 a.m. restart. The client gets support and uptime from n8n, and you get a bill you can show them. For anything a business depends on, that is worth $20.

**Self-hosted wins on volume.** Once your runs pass 10,000 a month, Cloud pricing climbs past the cost of a small server by a wide margin. A $5 server running 20,000 executions costs the same as a $5 server running 200 — the cap is gone, and polling every 5 minutes stops being a billing decision.

**The 3.0 guide makes the self-hosted route safe.** The upgrade guide walks through the 37 nodes 3.0 replaces and the one-way upgrade — 1.x support ends 31 December 2026, so the move is coming either way. Read it before you touch production, whichever side you pick.

## What broke — or rather, what is hard

**Starter's 5-minute run cap bites quietly.** A workflow that processes a big export can run past 5 minutes on Starter and stop halfway. Pro lifts the cap to 40 minutes. If your workflows are long, the plan choice is about run time, not execution count.

**Self-hosted means you are the support desk.** There is no one to call when the container will not start. If you have never run Docker in production, budget a weekend to learn it — or pay Cloud until you have.

**The free tier is not a business plan.** Community is free and it is real software, but it has no SSO, no environments, no Git version control and no shared projects. A team of two sharing workflows will feel that gap fast.

## Who it is for

Cloud fits if your workflows run a business, your runs fit inside 2,500 or 10,000 a month, or you would rather pay $20 than own a server. Self-hosted fits if your runs are past 10,000 a month, your data has to stay on your own server, or you already run Docker and enjoy it. It fits neither way if you have not counted your executions yet — count first, then choose, because the wrong side of this line costs either $60 a month or a weekend of your life.

## The deal, plainly

Cloud, for client work and anything a business depends on: https://whoisalfaz.me/go/n8n — Starter $20 a month on annual billing, Pro $50. Self-hosted, for volume: the server is Vultr, https://whoisalfaz.me/go/vultr — run n8n 3.0 in Docker on it, since 3.0 killed npm installs. Count your runs, then pick a side.

The server is cheap. Your evenings are not.

---

## Reply needed

Please reply in `draken-replies/` with the two live URLs once published (or any issue). After that, Mikey publishes the parasite versions with canonical pointing at these main-site posts.
