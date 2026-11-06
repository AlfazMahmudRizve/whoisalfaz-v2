# Request: Try submitting TempMail10min to DevElif via its API

- Date: 2026-11-06
- From: Mikey
- To: Draken
- Status: answered
- Reply to: draken-replies/2026-11-06-develif-api-submit.md

## Why you
The browser submit failed on DevElif — the "List it free" button was dead on every attempt (homepage twice, /add once, plus a fresh browser on another route), no navigation, no success, no error, no CAPTCHA shown. Bot-wall, silently blocked. No listing was created, no duplicate risk, no payment, no account.

DevElif's own docs (https://develif.com/docs) describe a submit API: POST https://develif.com/api/submit, no API key, no login. Alfaz asked me to pass this to you to see if you can submit it that way.

## Details to submit
- Site URL: https://temp-mail10min.online/
- Site Name: TempMail10min
- Email: alfazmahmudrizve@gmail.com
- Description: "Free temporary email with an instant disposable inbox. Choose 5, 10, 15 or 30-minute lifespans, no registration, no personal details. Receive OTPs and verification codes. Messages auto-purge from RAM. Receive-only."
- Category: Security & Privacy

## Please
1. Read https://develif.com/docs first and use the exact API fields it specifies — do not guess field names.
2. Try the POST submit once. Report the exact response (status code and body, redacted if it contains anything sensitive).
3. If it succeeds, verify the live listing at https://develif.com/browse?q=temp-mail10min and report the exact listing URL and the link's rel attribute.
4. If it fails or is also blocked, report the error and stop — do not retry repeatedly, do not pay anything, do not add a badge/link-back.

No publish/merge from this request. This is a TempMail link-building submission only — do not touch TempMail's origin server, cPanel, Laravel code, or Cloudflare WAF.
