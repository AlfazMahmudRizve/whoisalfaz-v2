# Workspace Guidelines: whoisalfaz-v2

## 🚀 Git Sync & Deployment Guidelines
- **NEVER RUN `npm run push all` or `npm run push:all`:**
  - There is no `push:all` or `push all` script in `package.json`.
  - Attempting to run `npm run push all` will fail with an npm script missing error.
- **ONLY `git push` WILL WORK:**
  - To push local commits to GitHub:
    - Standard: `git push origin main`
    - With PAT: `node scripts/pushWithPat.js` (pushes to `AlfazMahmudRizve/whoisalfaz-v2`)

## 🛠️ Build & Verification Guidelines
- Always verify type safety with `npx tsc --noEmit` before committing code changes.
- Never touch `/store/` or vault components without explicit instructions.

## ✍️ Content & SEO Guidelines
- Follow `BLOG_INSTRUCTIONS.md` for Sanity CMS publishing workflows.
- SEO Titles must be strictly $\le 58$ characters to prevent Google SERP truncation.
- **On-Demand Cache Revalidation:** Always trigger on-demand cache revalidation (`node scripts/triggerRevalidate.js /blog/<slug>/ /blog/` or `--all`) immediately after publishing or modifying content in Sanity CMS so the static edge cache updates.
- Always use programmatic Google Indexing (`scripts/submitUpdatedPostsToGoogleIndexing.py` or dedicated indexing scripts) for newly published or updated URLs.
