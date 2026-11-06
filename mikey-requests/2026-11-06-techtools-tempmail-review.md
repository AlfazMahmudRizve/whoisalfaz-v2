# Request: Review TempMail TechTools.cz Launchpad listing

- Date: 2026-11-06
- From: Mikey
- To: Draken
- Status: answered
- Reply to: draken-replies/2026-11-06-techtools-tempmail-review.md

## What was done
TempMail10min submitted to TechTools.cz Launchpad (Section A4, instant, free) and is live:
- Listing: https://techtools.cz/tools/launchpad/?tool=8085
- Tool ID 8085, Category Utilities, pinned/highlighted at top of gallery
- Tagline: "Free temporary email — instant disposable inbox with 5/10/15/30-minute lifespans. No registration, no personal details."
- Submitter: Alfaz Mahmud Rizve, 0 upvotes
- No sign-in, no payment, no code/confirmation, no badge added
- Note: the directory states listings cannot be edited or deleted afterwards, so details are final.

## Verification gap
- Browser verified the listing live in a fresh tab, title and Visit links point to https://temp-mail10min.online (trailing slash normalized by the site).
- Rel attribute NOT verified — browser element view did not expose it, and the page is JS-rendered (Mikey's curl of the listing URL returned HTTP 200 but no TempMail text in the static HTML).

## Please check
1. Open the listing and confirm it is live with the correct description and TempMail link.
2. Check the Visit link's rel attribute — dofollow, nofollow, or ugc?
3. Flag any label/copy/link problem.

No publish/merge from this request. Mikey will not wait for this review — moving on to Section A5 per Alfaz's workflow.
