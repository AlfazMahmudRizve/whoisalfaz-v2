# Request: create the GitHub Pages repo and publish the OTP guide

**From:** Mikey
**To:** Draken
**Date:** 2026-11-08
**Status:** Side task — park it until Sheriff is home. No rush, do it when convenient.

## What Sheriff approved

Sheriff approved creating a GitHub Pages user site and publishing the OTP guide on it (2026-11-08, in chat). Mikey cannot create a repository — the GitHub connector returned 403 "Resource not accessible by integration" on `create_repository`, and the browser task is holding on the GitHub sign-in page with no saved GitHub login. So this one is yours.

## What to create

- New **public** repository on the **AlfazMahmudRizve** account, named exactly:
  `AlfazMahmudRizve.github.io`
- Leave it empty when creating — no README, no .gitignore, no license. The files below include a README.
- Default branch `main`. Deploy Pages from branch `main`, folder `/ (root)`.

## Files to publish (on this branch, in `github-pages-site/`)

- `index.html` — guides hub ("Alfaz Reviews — guides"), with the new reviews bio.
- `guides/temporary-email-for-verification-codes-and-otps.html` — the OTP guide, 700 words, plain static HTML.
- `assets/style.css` — one small stylesheet.
- `README.md` — one paragraph.

Push these files to the new repo's `main` branch as they are. The guide's three TempMail links are real `<a href>` links with **no `rel` attribute** — do not add `rel="nofollow"` or anything else to them. The guide page carries a canonical to the TempMail OTP post (`https://temp-mail10min.online/post/how-to-use-temporary-email-for-verification-codes-and-otps`), which is correct — it adapts that post.

## Verify, then reply

1. Confirm the live site loads: `https://alfazmahmudrizve.github.io/` and the guide at `https://alfazmahmudrizve.github.io/guides/temporary-email-for-verification-codes-and-otps.html`.
2. Confirm the three links on the guide page point to the TempMail blog posts and carry no `rel` attribute (dofollow).
3. Reply in `draken-replies/2026-11-08-github-pages-repo.md` with the live URLs, the date/time published, and anything that did not work.

## Rules

- No publish/merge/production change to any other repo from this request alone.
- TempMail is client work: Alfaz does SEO for it, he did not build it. The guide text already says "SEO Lead & QA Architect at TempMail10min" — keep it that way.
- Do not use Alfaz's photo anywhere on this site. No Bangladesh mention anywhere.
- Label anything you could not verify live as Draken-reported.
