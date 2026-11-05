#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol (Draken PC side).
Runs continuously on Alfaz's PC, polling GitHub origin every 60 seconds.
Checks actual ground truth state:
  1. Any unmerged commits on any origin/mikey/* branch relative to origin/main.
  2. Any remote origin/main advance beyond local HEAD.
  3. Any unhandled requests in mikey-requests/ (Status: open/pending).

Exits cleanly with code 0 as soon as work from Mikey is detected, triggering
Antigravity reactive agent wake-up.
"""

import subprocess
import time
import sys
import os
import glob
import datetime

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass


def check_unhandled_local_requests():
    """Checks if any request file in mikey-requests/ is open or pending."""
    try:
        for fpath in glob.glob("mikey-requests/*.md"):
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "Status: open" in content or "Status: pending" in content:
                    return os.path.basename(fpath)
    except Exception:
        pass
    return None


def fetch_origin():
    """Fetches all branches and refs from origin."""
    try:
        subprocess.run(['git', 'fetch', 'origin'], capture_output=True, check=True)
        return True
    except Exception as e:
        print(f"[FETCH ERROR] {e}", file=sys.stderr, flush=True)
        return False


def check_unmerged_mikey_branches():
    """Checks if any origin/mikey/* branch has commits not yet merged into origin/main."""
    try:
        branches_res = subprocess.run(['git', 'branch', '-r'], capture_output=True, text=True, check=True)
        unmerged = []
        for line in branches_res.stdout.splitlines():
            b = line.strip()
            # Skip HEAD pointer or non-mikey branches
            if 'origin/mikey/' in b and '->' not in b:
                # Compare against origin/main
                commits_res = subprocess.run(
                    ['git', 'log', f'origin/main..{b}', '--oneline'],
                    capture_output=True,
                    text=True,
                    check=True
                )
                commits = commits_res.stdout.strip()
                if commits:
                    branch_name = b.replace('origin/', '')
                    unmerged.append((branch_name, commits))
        return unmerged
    except Exception as e:
        print(f"[BRANCH CHECK ERROR] {e}", file=sys.stderr, flush=True)
        return []


def check_remote_main_advance():
    """Checks if origin/main has advanced beyond local HEAD."""
    try:
        local_head = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True, check=True).stdout.strip()
        remote_main = subprocess.run(['git', 'rev-parse', 'origin/main'], capture_output=True, text=True, check=True).stdout.strip()
        if local_head != remote_main:
            diff_res = subprocess.run(['git', 'diff', '--name-only', 'HEAD', 'origin/main'], capture_output=True, text=True, check=True)
            changed = [f.strip() for f in diff_res.stdout.splitlines() if f.strip()]
            return changed
    except Exception as e:
        print(f"[MAIN CHECK ERROR] {e}", file=sys.stderr, flush=True)
    return None


def main():
    print("Draken Ground-Truth Watcher 3.0 active.", flush=True)
    print("Monitoring origin/mikey/* branches, origin/main, and mikey-requests/ every 60s...", flush=True)

    max_checks = 120  # Run for up to 2 hours
    for check_num in range(1, max_checks + 1):
        now_str = datetime.datetime.now().strftime("%H:%M:%S")

        # 1. Fetch remote origin
        fetched = fetch_origin()

        if fetched:
            # 2. Check for unmerged Mikey feature branches
            unmerged = check_unmerged_mikey_branches()
            if unmerged:
                print(f"[{now_str}] [WAKEUP] Unmerged Mikey branch work detected!", flush=True)
                for b_name, commits in unmerged:
                    print(f"  Branch {b_name}: {commits}", flush=True)
                print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
                sys.exit(0)

            # 3. Check for remote main advance
            main_changed = check_remote_main_advance()
            if main_changed:
                print(f"[{now_str}] [WAKEUP] New commits on origin/main: {main_changed}", flush=True)
                print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
                sys.exit(0)

        # 4. Check for unhandled local request files
        unhandled_file = check_unhandled_local_requests()
        if unhandled_file:
            print(f"[{now_str}] [WAKEUP] Unhandled request found: {unhandled_file}", flush=True)
            print("Exiting cleanly with code 0 to wake Draken immediately.", flush=True)
            sys.exit(0)

        print(f"[{now_str}] Check #{check_num}: origin quiet (no unmerged Mikey work).", flush=True)
        time.sleep(60)

    print("Watcher completed 2-hour duration without unhandled work.", flush=True)


if __name__ == '__main__':
    main()
