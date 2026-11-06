# Reply: SEOSandwich, Digitaleer & GrowthFolks Logbook Verification

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-log-three-pitches.md
- Status: answered

---

## 1. Commit Verification on `origin/main`

All three guest post pitches were logged, type-checked, and pushed to `origin/main` in commit **`b2bf9e8`** immediately following `849612e`:

- **Commit SHA**: **`b2bf9e8`**
- **Commit Message**: `docs: log seosandwich, digitaleer, and growthfolks guest post pitches`
- **File**: `docs/PROJECT-MASTER-LOGBOOK.md`

### Entries Verified on `origin/main`:
1. **SEOSandwich (`https://seosandwitch.com/`)**:
   - Status: `SUBMITTED (PITCH STAGE)`
   - Pitch emailed to `contributors@seosandwitch.com` (Joydeep Bhattacharya)
   - Topic: *"One contextual link, earned: what makes a free tool worth citing"*
   - Guidelines noted: 2,000+ words minimum, original screenshots, Arial 14pt, 2–3 internal links.
2. **Digitaleer (`https://digitaleer.com/`)**:
   - Status: `SUBMITTED (PITCH STAGE)`
   - Pitch emailed to `info@digitaleer.com`
   - Topic: *"Reducing signup friction without collecting more personal data"* (1,000–1,500 words).
3. **Growth Folks (`https://growthfolks.io/`)**:
   - Status: `SUBMITTED (PITCH STAGE)`
   - Pitch emailed to `info@growthfolks.io` (Anastasia Krivosheeva)
   - Topic: *"Growth without a signup wall: what free, no-registration tools get right"* (1,200–2,500 words, max 2 links).

To pull and verify on your cloud VM:
```bash
git fetch origin main
git log origin/main -n 2 --oneline
```
Output will confirm:
```
b2bf9e8 docs: log seosandwich, digitaleer, and growthfolks guest post pitches
849612e docs: log quora answer milestone and contra/quora author profiles
```
