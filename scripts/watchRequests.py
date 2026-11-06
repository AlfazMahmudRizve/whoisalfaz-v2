#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol.
Dedicated to monitoring GitHub branch: origin/mikey-draken-sync.
Polls every 60 seconds when active tasks are in-flight.
Exits cleanly with code 0 when:
  1. origin/mikey-draken-sync advances with new commits from Mikey.
  2. Any request file in mikey-requests/ has Status: open or Status: pending.
Triggers Antigravity reactive agent wake-up.
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

SYNC_BRANCH = "mikey-draken-sync"


def fetch_sync_branch():
    """Fetches origin/mikey-draken-sync from GitHub."""
    try:
        subprocess.run(['git', 'fetch', 'origin', SYNC_BRANCH], capture_output=True, check=True)
        return True
    except Exception as e:
        print(f"[FETCH ERROR] {e}", file=sys.stderr, flush=True)
        return False


def get_remote_sha():
    """Returns the latest SHA of origin/mikey-draken-sync."""
    try:
        res = subprocess.run(
            ['git', 'rev-parse', f'origin/{SYNC_BRANCH}'],
            capture_output=True,
            text=True,
            check=True
        )
        return res.stdout.strip()
    except Exception as e:
        print(f"[REV-PARSE ERROR] {e}", file=sys.stderr, flush=True)
        return None


def get_open_requests():
    """Checks for open/pending requests on origin/mikey-draken-sync."""
    open_reqs = []
    try:
        tree_res = subprocess.run(
            ['git', 'ls-tree', '-r', f'origin/{SYNC_BRANCH}:mikey-requests'],
            capture_output=True,
            text=True,
            check=True
        )
        for line in tree_res.stdout.splitlines():
            line = line.strip()
            if line.endswith('.md') and not line.endswith('.gitkeep'):
                fname = line.split()[-1]
                content_res = subprocess.run(
                    ['git', 'show', f'origin/{SYNC_BRANCH}:mikey-requests/{fname}'],
                    capture_output=True,
                    text=True,
                    check=True
                )
                for cline in content_res.stdout.splitlines()[:20]:
                    clean = cline.strip().lstrip('-* ').replace('**', '').strip()
                    if clean.lower().startswith('status:'):
                        val = clean.split(':', 1)[1].strip().lower()
                        if 'open' in val or 'pending' in val:
                            open_reqs.append((fname, cline))
                        break
    except Exception as e:
        # If folder doesn't exist yet or is empty
        pass
    return open_reqs


def main():
    print(f"Draken Watcher 4.0 active: monitoring origin/{SYNC_BRANCH} every 60s...", flush=True)
    fetch_sync_branch()
    known_sha = get_remote_sha()
    print(f"Baseline origin/{SYNC_BRANCH} commit: {known_sha[:7] if known_sha else 'Unknown'}", flush=True)

    max_checks = 120  # Max 2 hours per session
    for check_num in range(1, max_checks + 1):
        time.sleep(60)
        now_str = datetime.datetime.now().strftime("%H:%M:%S")

        fetched = fetch_sync_branch()
        if not fetched:
            print(f"[{now_str}] Check #{check_num}: network error fetching {SYNC_BRANCH}. Retrying...", flush=True)
            continue

        current_sha = get_remote_sha()

        # Check 1: Did origin/mikey-draken-sync advance?
        if current_sha and known_sha and current_sha != known_sha:
            diff_summary = subprocess.run(
                ['git', 'log', '--oneline', f'{known_sha}..{current_sha}'],
                capture_output=True,
                text=True
            ).stdout.strip()
            changed_files = subprocess.run(
                ['git', 'diff', '--name-only', known_sha, current_sha],
                capture_output=True,
                text=True
            ).stdout.strip().splitlines()

            print(f"[{now_str}] [WAKEUP] New commit(s) detected on {SYNC_BRANCH}!", flush=True)
            print(f"  Commits: {diff_summary}", flush=True)
            print(f"  Files: {changed_files}", flush=True)
            print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
            sys.exit(0)

        # Check 2: Are there any open/pending requests on the branch?
        open_requests = get_open_requests()
        if open_requests:
            print(f"[{now_str}] [WAKEUP] Open request detected on {SYNC_BRANCH}: {open_requests}", flush=True)
            print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
            sys.exit(0)

        print(f"[{now_str}] Check #{check_num}: {SYNC_BRANCH} quiet ({known_sha[:7]} - no new requests).", flush=True)


if __name__ == '__main__':
    main()
