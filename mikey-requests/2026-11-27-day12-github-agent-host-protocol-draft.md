# Day 12 — Piece draft (26 Nov 2026, afternoon)

## Title
GitHub's Agent Host Protocol: your coding agent finally outlives the editor window

## Slug (checked 26 Nov ~15:36 Dhaka — returns 404, not live)
`github-agent-host-protocol`
Main-site URL when published: https://whoisalfaz.me/blog/github-agent-host-protocol/

## Sources (verified live 26 Nov)
- GitHub Engineering, Connor Peet and Rob Lourens, "Building the Agent Host Protocol for sessions that continue across devices", published 17 Nov 2026: https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/
- AHP specification published 18 Nov 2026 (per 24 Nov trend-check notes; spec link inside the GitHub post).

## Verified facts used (do not change the numbers)
- AHP is an open standard, built first in VS Code and adopted across GitHub. It lets a Copilot agent session start in one place and continue in another — phone, laptop, cloud sandbox.
- Problem it solves: Copilot began as a VS Code extension with its own bundled harness, tied to one editor window. Close the window and the agent is gone; update VS Code and every agent stops as the app restarts.
- Building started in early 2026, on the Copilot SDK as the foundation. The old Copilot Chat extension had grown to over 400,000 lines of TypeScript across three years.
- Two independent host implementations: VS Code's in TypeScript (~369,000 lines) and GitHub's in Rust (~305,000 lines). GitHub's host runs in the cloud; VS Code's runs locally and can move over SSH, containers, WSL or Dev Tunnels, and ships in the VS Code Server bundle.
- Design: URI-identified "channels" are the unit of functionality. Every server must implement root, session and chat channels; optional channels add terminal support, MCP additions or OpenTelemetry reporting.
- Inside each channel is a reducer-based state object. The server owns the state; each client sends a sequence of actions that mutate state or trigger side effects (for example, sending a chat message). Reconnection and replay are the payoff: a client sends queued actions, shows the loading state, and waits for the server to reconcile and acknowledge before confirming.
- AHP describes how you interact with an agent, not how the agent works inside. That is deliberate: agent design changes fast, so the protocol stays out of agent behaviour — the same reason it is compared with MCP, which also has escape hatches (custom methods, `_meta` data).
- Client libraries exist in Rust, TypeScript, Kotlin, Swift, .NET and Go. People have already built a macropad showing live agent state, smart-watch apps and Kanban-style tools against it.
- Practical entry points from the post: connect in the Copilot app (Experimental > Direct Connections, then Environments > Add Agent Host Protocol Host); in VS Code via "Add Remote Agent Host" in the Agents window; spawn VS Code's standalone host with `code agent host`; list endpoints with `code agent endpoints`.
- Example from the post: one session, "Fix the flaky login test" — started from the Copilot app at 9:02, a tool call approved from a phone at 9:40, the diff reviewed in VS Code at 11:15, a cloud agent landing the pull request at 11:32.
- Why it matters here: pairs with the 24 Nov items — the Agentic AI Foundation opening agent protocols, and the Day 11 Cequence piece on agents that now sign in, book and buy. AHP is the session layer underneath that shift: an agent that works for hours needs to survive a closed window.

## Links in the piece
- GitHub Engineering post (URL above) as the source link.
- /go/n8n — in the "where to run it" line: the workflow layer that also needs sessions with checks, not a chat prompt. (Cloak re-verified live in the 22 Nov weekly cycle.)
- Internal link: Day 11 piece, /blog/ai-agents-now-buy-for-customers/ — agents that transact need sessions that persist.
- No canonical and no "originally published" link-back line at publish time — draft-and-approve rule: nothing publishes without Sheriff's go; add canonical + link-back only after Draken publishes the main-site post.

## Draft

Your coding agent used to die when you closed the editor.

GitHub Copilot began as a VS Code extension with its own bundled harness. That gave you agents inside VS Code, but it tied their lifetime to one editor window. Close the window and the agent is gone. Update VS Code and every agent stops as the application restarts. GitHub explained the fix on 17 November: the Agent Host Protocol (AHP), an open standard that lets a session start in one place and continue in another.

The idea is simple to state and hard to build. A session should survive a closed window, a switched device and a dropped connection. Start a session in the cloud from your phone, then continue it from your laptop. That is what AHP does for Copilot sessions across VS Code, the Copilot app, mobile apps and cloud sandboxes.

Building it took most of 2026. GitHub started on AHP in early 2026, using the Copilot SDK as the foundation for a new agentic stack underneath VS Code. The old Copilot Chat extension had grown to over 400,000 lines of TypeScript in three years, and it was structured around the lifetime of a VS Code window — the exact lifetime AHP had to escape.

The result is two hosts, written by two teams in two languages: VS Code's in TypeScript, about 369,000 lines, and GitHub's in Rust, about 305,000 lines. VS Code's host runs locally and can move to other machines over SSH, containers, WSL or Dev Tunnels; it ships as part of the VS Code Server bundle. GitHub's host runs in the cloud, across a much wider range of infrastructure. Having two independent implementations turned out to be a useful test of the protocol itself — a protocol with only one implementation is not truly portable, and writing the second one exposed gaps, such as early versions that could not represent shell output without a PTY.

AHP is organised around URI-identified channels. Every server must implement three: root, session and chat. Optional channels add terminal support, MCP additions or OpenTelemetry reporting. Inside each channel sits a reducer-based state object, and the server owns that state. Each client sends a sequence of actions that either change the state or trigger a side effect, such as sending a chat message.

That shape is what makes reconnection work. A client that loses its connection sends its queued actions, shows the correct loading state, and waits for the server to reconcile and acknowledge them before confirming anything. State changes flow through an ordered log of actions, so what happened — and in what order — can be inspected afterwards. The same reducer shape fits UI frameworks such as React.

One thing AHP deliberately does not do: it does not describe how an agent works inside. Agent design changes too fast for that. Like MCP, it provides escape hatches — custom methods and `_meta` data — for out-of-band signalling. The protocol covers how you interact with an agent, and leaves the agent's behaviour alone.

GitHub's example makes the point concrete. One session, "Fix the flaky login test": started from the Copilot app at 9:02, a tool call approved from a phone at 9:40, the diff reviewed in VS Code at 11:15, and a cloud agent landing the pull request at 11:32. No single client owns that session.

This is the session layer under the shift covered in the Day 11 piece, where agents now sign in, book and buy for customers. An agent that works for hours and handles real actions needs to survive a closed window — and needs its approvals to survive with it. The same applies to the workflow layer around it: agent work that books and buys needs a workflow with checks, not a chat prompt, and that is where n8n sits.

If you want to try AHP yourself, the entry points are in GitHub's post. Connect a host in the Copilot app under Experimental > Direct Connections, then Environments > Add Agent Host Protocol Host. In VS Code, use "Add Remote Agent Host" in the Agents window. You can spawn VS Code's standalone host with `code agent host`, or list the endpoints for the one in your editor with `code agent endpoints`. Client libraries exist in Rust, TypeScript, Kotlin, Swift, .NET and Go — and people have already built a macropad showing live agent state, smart-watch apps and Kanban-style tools against it.

The protocol is open, and the spec is public. For anyone building agent workflows, the question it answers is a practical one: what should live in the agent runtime, and what should be a portable protocol boundary? AHP puts session state, channel routing, actions and replay at the boundary — and leaves the model and the agent's behaviour outside it.

## FAQ (for the main-site post)
- **What is the Agent Host Protocol?** An open standard from GitHub that lets a Copilot agent session start on one device and continue on another — VS Code, the Copilot app, mobile apps and cloud sandboxes.
- **Why did agents need it?** Copilot began as a VS Code extension tied to one editor window. Closing the window ended the agent; updating VS Code stopped every agent.
- **How does it keep sessions in step?** URI-identified channels (root, session, chat, plus optional ones) hold reducer-based state owned by the server. Clients send ordered actions; on reconnection they replay queued actions and wait for the server to reconcile them.
- **Does it describe how agents think?** No. It covers how you interact with an agent, not how the agent works inside — deliberately, because agent design changes fast.
- **Which languages have client libraries?** Rust, TypeScript, Kotlin, Swift, .NET and Go.

## Cover note
Mikey makes the cover. Branding: only "whoisalfaz.me", placed directly under the subline on the left, never in a bottom corner. Text block inset 10%+ from the left edge; inside DevTo's 18–82% vertical hero band.

## Status
Draft only. Not published anywhere. Slug existence checked by curl 26 Nov (~15:36 Dhaka): `github-agent-host-protocol` returns 404 on whoisalfaz.me/blog/ and on dev.to/alfazreviews/. Draken's existence + ranking-query check still to run with the draft, per the no-wait rule — send check and draft together; if the slug already exists in Sanity, Draken skips it. Under the 26 Nov production-mode rule, Sheriff approves this draft first; nothing publishes on his go alone.
