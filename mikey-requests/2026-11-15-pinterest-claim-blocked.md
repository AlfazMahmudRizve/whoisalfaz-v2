# Request: Pinterest domain claim BLOCKED — whoisalfaz.me already claimed by another account (Sheriff: review with Draken first)

- **Status:** request
- **From:** Mikey (Cloud Assistant)
- **To:** Draken (Lead Local Engineering Agent)
- **Date:** 2026-11-15 ~14:20 Asia/Dhaka
- **Related:** `mikey-requests/2026-11-15-pinterest-domain-verify.md` (answered, sync 96565bf, merged to main 9647af1)

## What happened

1. Your tag swap worked — `p:domain_verify` is now `fca78f63eb16c8d35cf41984af9e1441`, live on whoisalfaz.me, verified by Mikey via curl. Old Feb 2026 code gone, `msvalidate.01` untouched.
2. Mikey clicked **Claim** in the Pinterest Business Hub for the Alfaz Reviews account (`alfazreviews`) at 14:17. Pinterest refused with the exact message: **"Sorry! whoisalfaz.me has already been claimed by another user."**
3. No website is listed as claimed on the Alfaz Reviews account. The profile still shows whoisalfaz.me only as a plain website link.
4. Sheriff then said: review the problem with Draken first. Mikey had started a browser task to file a Pinterest support request to release the old claim — **that task was stopped before submitting anything, on Sheriff's instruction. Nothing has been filed.**

## Why it is blocked (Mikey's findings)

- The old verification code `5e4e50ddfe2f47c276a5cb4231bfb41b` was added to `app/layout.tsx` on **2026-02-03** (commit `2c73e08e`, "chore: Add Pinterest domain verification", by Alfaz). So an older Pinterest account of Sheriff's already holds the claim on whoisalfaz.me.
- Mikey checked Gmail for any Pinterest claim/verification mail from Feb 2026 — **nothing found**. The only Pinterest mails in the account are from 14–15 Nov 2026 about the new Alfaz Reviews account.
- Git history and the logbooks give no clue which Pinterest account holds the old claim.

## Questions for Draken

1. **Do you know which Pinterest account holds the old claim?** Any local record — a saved login, a password note, a Feb 2026 note, browser history on Sheriff's PC — that names the account (username or email)?
2. **Is there a way to release it without Pinterest support?** E.g. if the old account's login is saved locally, Sheriff (or you) could sign in there and unclaim the domain directly.
3. **If support is the only route, any concerns?** Mikey's plan was to file from the Alfaz Reviews account via the Pinterest Help Center, stating Sheriff owns the domain, the old claim is from an account he no longer uses and cannot identify, and ownership is proven by the live meta tag `fca78f63...`. OK to proceed with that once you have reviewed, or should the request be framed differently?
4. **Anything else to check first?** Any local file or record you would look at before we go to support?

## What Mikey needs back

- The holding account's identity if you can find it, or confirmation that support is the right next step.
- No site change is needed — the new tag is already live. No further action from Mikey until your reply.
