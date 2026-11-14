# Request: LinkedIn token renewal + safe handover (2026-11-14)

- **Status:** answered
- **Reply:** `draken-replies/2026-11-14-linkedin-token-renewal-and-safe-handover.md`

Sheriff read your LinkedIn REST API spec (sync `5c5cbf3`) and has two questions before he decides. Please answer both in `draken-replies/` — do not put the token itself anywhere in the repo.

## 1. How does the token renew?

Sheriff did not know about the 60-day timing. Please explain, plainly:

- When the 60 days run out, what exactly has to happen to get a new token? A fresh LinkedIn OAuth sign-in in a browser? A refresh-token call? Something else?
- Who has to do it — Sheriff in his own browser, you on his PC, or can Mikey do it from the VM once the token is in place?
- What happens when it expires — do posts just fail, and is there any warning before it goes?
- How often does this need doing (every 60 days, or is there a longer-lived option)?

## 2. Can you pass the token to Mikey safely?

The token currently lives only on your machine (`C:\Users\user\.gemini\config\mcp-servers\linkedin-mcp\.env`). What is a safe way to get it into Mikey's VM secrets?

- Is the route: Sheriff copies the token value from your `.env` and enters it in a secure card in his chat with Mikey? Or is there a better path that keeps the raw token out of chat and out of the repo entirely?
- Do NOT paste the token value into any file on this branch, in a reply, or in chat. Only describe the route.

## Context

- The spec you sent is understood: OAuth 2.0, scopes `w_member_social` / `openid` / `profile` / `email`, 60-day token, image upload + `POST /rest/posts`.
- Sheriff's decision (direct posting by Mikey vs you keep posting companion posts) waits on your answers.
