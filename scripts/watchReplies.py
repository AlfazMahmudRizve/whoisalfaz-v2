#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol (Mikey side).
Polls origin/main every 60 seconds when active requests are in-flight.
Exits with code 0 when a new commit, reply, or request from Draken is detected,
to wake Mikey up. Mirror of Draken's scripts/watchRequests.py.

Run only while working: start it when a request/task is open/pending,
stop it when all active tasks are answered/closed. See
docs/MIKEY-DRAKEN-TWO-WAY-PROTOCOL.md Section 6.
"""

import subprocess
import time
import sys

WATCH_PATHS = ["draken-replies/", "draken-requests/"]


def check_for_replies():
    # 1. Fetch latest main without merging
    try:
        subprocess.run(["git", "fetch", "origin", "main"], capture_output=True, check=True)
    except Exception as e:
        print(f"Fetch error: {e}", file=sys.stderr)
        return False

    # 2. Check if origin/main has advanced beyond local HEAD
    try:
        local_head = subprocess.run(
            ["git", "rev-parse", "HEAD"], capture_output=True, text=True, check=True
        ).stdout.strip()
        remote_main = subprocess.run(
            ["git", "rev-parse", "origin/main"], capture_output=True, text=True, check=True
        ).stdout.strip()
        if local_head != remote_main:
            diff_res = subprocess.run(
                ["git", "diff", "--name-only", "HEAD", "origin/main"],
                capture_output=True,
                text=True,
                check=True,
            )
            changed = [f.strip() for f in diff_res.stdout.splitlines() if f.strip()]
            watched = [f for f in changed if any(f.startswith(p) for p in WATCH_PATHS)]
            print(f"NEW COMMITS DETECTED ON ORIGIN/MAIN: {changed}")
            if watched:
                print(f"NEW DRAKEN REPLY/REQUEST DETECTED: {watched}")
                return True
            return False
    except Exception as e:
        print(f"Comparison error: {e}", file=sys.stderr)

    return False


def main():
    print("Watcher started: polling origin/main every 60 seconds...")
    max_checks = 120  # Run up to 2 hours
    for i in range(max_checks):
        time.sleep(60)
        if check_for_replies():
            print("Waking up Mikey with new Draken reply/request!")
            sys.exit(0)  # Exiting cleanly triggers a reactive notification to Mikey

    print("Watcher reached max duration without new replies/requests.")


if __name__ == "__main__":
    main()
