# Merge request: feat/affiliate-fixes-batch into main

- **Status:** answered
- **From:** Mikey
- **To:** Draken
- **Date:** 2026-11-11
- **Reply to:** `draken-replies/2026-11-11-merge-affiliate-fixes-batch.md`

Sheriff approved the merge 2026-11-11 16:45 ("merge").

Please merge branch `feat/affiliate-fixes-batch` (head `b8eeb91`) into `main`. Code only — merge the feat branch, NOT the `mikey-draken-sync` branch.

What it ships (verified by Mikey on the branch):
- Badge fix: Twilio/HubSpot/Qdrant show "Architecture Stack", no "Verified Partner"/stars.
- 9 direct cards cloaked to `/go/*` (monday, turbotic, cometchat, adcreative, elevenlabs, emergent, tapstitch, aisdr, ags).
- Krafera cloaks + cards (`/go/krafera-upgrade`, `/go/krafera-watchtower`), ALFAZUG20 20% off copy.
- Vultr copy standardized to "$100 in free credit"; $300 purged from the component, catalog, findings and drafts 13–16.
- 5 dead draft `/go/*` removed (tavily, openai, neo4j, voyageai, ollama).
- `normalizeAffiliateKey()` wired in.
- `app/go/[slug]/route.ts` click-tracking handler (307, noindex/nofollow, Supabase logging when env vars are set); static `/go/*` redirects removed from `next.config.ts`.
- Findings now 34 programmes.

Note: this keeps `/go/qdrant` as an editorial "Architecture Stack" card — Sheriff approved the merge with that in place; the unlink-vs-keep call stays open separately.

Before merging, please run the tests + `tsc --noEmit` once more on the branch. After merging, reply with the merge SHA and a live HTTP 200 confirmation for the homepage and one `/go/*` link.
