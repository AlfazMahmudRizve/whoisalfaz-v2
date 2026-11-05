#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol (Draken PC side).
Monitors GitHub origin every 60 seconds using git ls-remote.
Tracks both origin/main and all origin/mikey/* feature branches.
Exits cleanly with code 0 when ANY change is detected from Mikey, triggering
Antigravity reactive agent wakeup.
"""

import subprocess
import time
import sys
import datetime

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass


def get_remote_state():
    try:
        res = subprocess.run(
            ['git', 'ls-remote', '--heads', 'origin'],
            capture_output=True,
            text=True,
            check=True
        )
        state = {}
        for line in res.stdout.splitlines():
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            if len(parts) >= 2:
                sha, ref = parts[0], parts[1]
                if ref.startswith('refs/heads/'):
                    branch = ref[len('refs/heads/'):]
                    if branch == 'main' or branch.startswith('mikey/'):
                        state[branch] = sha
        return state
    except Exception as e:
        print(f"[ERROR] Failed to query remote: {e}", file=sys.stderr, flush=True)
        return None


def get_local_head():
    try:
        return subprocess.run(
            ['git', 'rev-parse', 'HEAD'],
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip()
    except Exception:
        return ""


def main():
    print("Draken Watcher 2.1 started: monitoring origin/main & origin/mikey/* every 60s...", flush=True)
    initial_state = get_remote_state()
    if initial_state is None:
        print("[WARN] Could not retrieve initial remote state. Retrying in 10s...", flush=True)
        time.sleep(10)
        initial_state = get_remote_state() or {}

    print(f"Tracking {len(initial_state)} active branches: {list(initial_state.keys())}", flush=True)

    max_checks = 120  # Max 2 hours per session
    for check_num in range(1, max_checks + 1):
        time.sleep(60)
        now_str = datetime.datetime.now().strftime("%H:%M:%S")
        current_state = get_remote_state()
        local_head = get_local_head()

        if current_state is None:
            print(f"[{now_str}] Check #{check_num}: network error querying origin. Will retry.", flush=True)
            continue

        changes = []
        for branch, sha in current_state.items():
            if branch == 'main' and sha == local_head:
                # Up to date with our local HEAD
                initial_state['main'] = sha
                continue

            if branch not in initial_state:
                changes.append(f"NEW MIKEY BRANCH: {branch} ({sha[:7]})")
            elif initial_state[branch] != sha:
                changes.append(f"UPDATED BRANCH: {branch} ({initial_state[branch][:7]} -> {sha[:7]})")

        if changes:
            print(f"[{now_str}] [WAKEUP] Mikey changes detected: {', '.join(changes)}", flush=True)
            try:
                subprocess.run(['git', 'fetch', 'origin'], capture_output=True, check=True)
            except Exception:
                pass
            print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
            sys.exit(0)

        # Update initial_state to track any branches that may have been deleted remotely
        initial_state = current_state
        print(f"[{now_str}] Check #{check_num}: origin quiet (no new work from Mikey).", flush=True)

    print("Watcher completed 2-hour duration without changes.", flush=True)


if __name__ == '__main__':
    main()
