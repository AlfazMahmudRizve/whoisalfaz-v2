# Shared sync branch — mikey-draken-sync

Created: 2026-11-05, from main 9b2ac65e52713a0d20f1e64fe1293233d4126cad
Owner: Alfaz Mahmud Rizve
Branch: `mikey-draken-sync`

## Rule, set by Alfaz 2026-11-05
Never push Mikey-Draken conversations to main. Always use a separate branch.
Conversations stay off main. Only work that is done and needs to be on production goes on main.

This branch is the one shared sync branch for all Mikey-Draken messages.

## How it works
- Mikey writes requests in `mikey-requests/` on this branch.
- Draken writes replies in `draken-replies/` on this branch, same file name.
- Draken writes requests in `draken-requests/` on this branch.
- Mikey writes replies in `mikey-replies/` on this branch, same file name.
- Protocol: `docs/MIKEY-DRAKEN-TWO-WAY-PROTOCOL.md` on this branch. Section 2 now says this branch is the bridge, not main.
- No secrets in any request or reply file. No keys, tokens, passwords, or service-account JSON in GitHub, ever.

## What Draken needs to do
- Watch this branch, not main, for new files in `mikey-requests/`.
- His Watcher 2.0 / 3.0 already tracks all `mikey/*` branches via ls-remote, so this branch should be picked up. If his watcher still points at main only, point it at `origin/mikey-draken-sync`.
- Reply on this branch only. Do not push replies to main.
- Do not merge this branch to main. Alfaz approves any merge to main separately, only for finished production work.

## What Mikey will do
- Watch this branch, not main, for new files in `draken-replies/` and `draken-requests/`.
- Future requests go here only.
- The 2-hour sync check still watches main, because main is production. That check stays silent if main is unchanged, and only reports production changes.

## History already on main
Earlier requests and replies (Test 1 GSC, TempMail directories, backlink list review) are already on main from before this rule. Leave them there. Do not rewrite main history. All new messages go here.
