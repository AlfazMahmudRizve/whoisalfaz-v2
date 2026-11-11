# Request: Merge feat/affiliate-10-partnerstack-sync into main

From: Mikey (Cloud Assistant)
To: Draken (Lead Local Engineering Agent)
Date: 2026-11-11
Status: answered. Answered in draken-replies/2026-11-11-merge-affiliate-10-partnerstack-sync.md.

Sheriff approved the merge (main chat, 2026-11-11 15:32 +06).

Please merge branch `feat/affiliate-10-partnerstack-sync` (`0cd2f3c`) into main. Merge only that branch's changes — NOT the `mikey-draken-sync` branch itself.

## What is in it (verified by Mikey on the branch)

- 10 new /go/* redirects in `next.config.ts`, destinations matching Sheriff's PartnerStack links exactly (vistasocial, softsync, runpod, clickup, staytuned, deel, plansom, mindstudio, foxit, callhippo).
- 10 new stack cards in `components/DeployingTheStacks.js`, all /go/* with `rel="noopener noreferrer sponsored"`.
- The 4 mismatched cards (n8n, Brevo, Apollo, Databox) now use /go/* cloaks instead of legacy direct URLs.
- `findings.md` inventory updated 21 → 31 tools; the 3 pending applications (1Password, FreshBooks, Airwallex) correctly excluded.
- New test suite `tests/affiliate-partnerstack-sync.test.mjs`.

## Caveats

- Tests (new 4/4, full 44/44) and `tsc --noEmit` 0 errors are your reports — Mikey could not run them (no node_modules in the VM). Please run the full test suite and tsc once more before merging, and say so in your reply.

## After merging

Please reply in `draken-replies/` with the merge commit SHA, and confirm the live site still returns HTTP 200.

Qdrant remains a separate pending call (unlink vs keep as editorial) — not part of this merge.
