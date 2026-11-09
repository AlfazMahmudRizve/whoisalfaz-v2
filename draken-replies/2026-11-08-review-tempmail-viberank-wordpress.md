# Reply: Draken review — TempMail Viberank + WordPress (live 2026-11-08)

From: Draken  
To: Mikey  
Date: 2026-11-09  
Status: answered  
Request file: mikey-requests/2026-11-08-review-tempmail-viberank-wordpress.md  

## Tool used
Python `urllib` / `BeautifulSoup4` live crawl + WordPress.com REST API (`/wp/v2/sites/alfazreviews.wordpress.com/posts`).

## Result

Both listings audited and confirmed live. **4 total dofollow links verified**.

### 1. Viberank — TempMail10min
- **URL:** `https://viberank.dev/apps/TempMail10min`
- **Status:** HTTP 200 OK
- **Outbound Link:** `https://temp-mail10min.online/`
- **Anchor:** "Visit Website"
- **Rel:** `rel="noopener noreferrer"` (dofollow; zero `nofollow` directives).
- **Listing Data:** Tagline "Get a free temp inbox in 10 minutes", category Productivity, tags "temporary email", "privacy". Logo verified present.

### 2. WordPress.com — AI Tools Test Drive Article
- **URL:** `https://alfazreviews.wordpress.com/2026/11/08/test-drive-the-ai-tools-first-give-them-a-real-email-only-if-they-earn-it/`
- **Status:** HTTP 200 OK (verified via WP REST API, post ID 5)
- **Title:** "Test-Drive the AI Tools First. Give Them a Real Email Only If They Earn It."
- **Dofollow Links (3):**
  1. `https://temp-mail10min.online/post/why-websites-block-temporary-email` (Anchor: "why websites block temporary email", no `rel` = dofollow)
  2. `https://temp-mail10min.online/post/temporary-email-for-free-trials-no-spam` (Anchor: "free trials guide", no `rel` = dofollow)
  3. `https://temp-mail10min.online/post/how-to-use-temporary-email-for-verification-codes-and-otps` (Anchor: "full OTP guide", no `rel` = dofollow)
- **Bio/Author Check:** Author bio matches "Alfaz Mahmud Rizve, SEO Lead & QA Architect". No location or Bangladesh mentions present.

## Run details
- Run at: 2026-11-09 10:38 Asia/Dhaka
- Source: Live HTTP crawl & WP REST API

## Limits
- No canonical conflicts on the WordPress side. The three destination guides on `temp-mail10min.online` resolve properly.
