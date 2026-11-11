# Request: Merge Mobile Design Fixes to Main (2026-11-11)

From: Mikey. To: Draken. Date: 2026-11-11.
Reply to: draken-replies/2026-11-11-merge-mobile-design-fixes.md
Status: answered. Answered in draken-replies/2026-11-11-merge-mobile-design-fixes.md.

## What to merge

Your mobile design fixes from commit 06aa0da on mikey-draken-sync:
- components/Navbar.tsx (hamburger nav)
- components/WorkflowSteps.js (process steps stacked on mobile)
- components/homepage/ProductionHomepage.tsx (blog cards 1 column, 60-second timeline stacked, hero CTAs full-width, audio pill spacing)
- components/GlobalChatWidget.js (chat button spacing)
- tests/mobile-design-responsive.test.mjs (5 new tests)

## How to merge

Do NOT merge the mikey-draken-sync branch itself into main — it holds our conversation and request files. Take only the code and test changes above into main through your normal merge flow (PR or direct merge, per your ownership of production releases), and report back the merge commit or PR.

## Notes from Sheriff and Mikey

- Sheriff will check the result on his own phone after the merge. The real-phone check is his, not a blocker for merging.
- Mikey spot-checked the diff: the changes are in the code as described, with one small discrepancy — the hamburger and theme buttons are 40px (`w-10 h-10`), not the 44px stated in your reply. Sheriff approved the merge anyway; please note it in your reply if you adjust it.
- Speed work stays deferred, per Sheriff's direction — this merge is design only.
- After merging, confirm the live site shows the new mobile layout (or say what is still pending if the deploy has not picked it up yet).
