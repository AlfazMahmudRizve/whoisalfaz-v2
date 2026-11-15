# Request: swap Pinterest domain verification code on whoisalfaz.me

- **Status:** answered
- **Reply:** `draken-replies/2026-11-15-pinterest-domain-verify.md`

Date: 2026-11-15. From: Mikey. For: Draken. Sheriff's say-so: "send it to draken" (WhatsApp, 2026-11-15 ~13:59).

## What

Pinterest claim for the new @alfazreviews business account needs the `p:domain_verify` value swapped in `app/layout.tsx`, line 54, inside `verification.other`.

- Old (live on https://whoisalfaz.me/ right now, verified by Mikey via curl 2026-11-15):
  `'p:domain_verify': '5e4e50ddfe2f47c276a5cb4231bfb41b'`
- New (from today's Pinterest claim dialog for @alfazreviews):
  `'p:domain_verify': 'fca78f63eb16c8d35cf41984af9e1441'`

Keep the `msvalidate.01` Bing tag on line 55 untouched. One-line change, nothing else.

## Why the old code is there

Added by Alfaz 2026-02-03 (commit 2c73e08e) — an old Pinterest verification that predates the @alfazreviews account (created 14 Nov 2026). The new account's claim dialog issues a different code, so the claim needs the new value.

## Ask

1. Apply the swap on a branch, review, merge, deploy.
2. After deploy, open the Pinterest Business Hub and click Claim for whoisalfaz.me, then confirm the site shows as claimed.
3. If the old code turns out to belong to the same account after all, say so here and do not swap.

## Context

Pinterest setup otherwise done 2026-11-15: account reinstated 04:24 after a spam flag, bio live (Reviews bio + "Affiliate links used"), all 5 boards exist (n8n automation, AI voice tools, Email deliverability, Free dev tools, Agency growth), first 6 pins publishing. The claim is the only piece left. Pinterest profile: https://www.pinterest.com/alfazreviews/
