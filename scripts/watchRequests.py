#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol.
Polls origin/main every 60 seconds when active requests are in-flight.
Exits with code 0 when a new request is detected to wake Draken up.
"""

import subprocess
import time
import sys

def check_for_requests():
    # 1. Fetch latest main without merging
    try:
        subprocess.run(['git', 'fetch', 'origin', 'main'], capture_output=True, check=True)
    except Exception as e:
        print(f"Fetch error: {e}", file=sys.stderr)
        return False

    # 2. Check if there are diffs or new files in mikey-requests/ on origin/main
    try:
        res = subprocess.run(
            ['git', 'diff', '--name-only', 'HEAD', 'origin/main', '--', 'mikey-requests/'],
            capture_output=True,
            text=True,
            check=True
        )
        changed_files = [f.strip() for f in res.stdout.splitlines() if f.strip()]
        if changed_files:
            print(f"⚡ NEW REQUEST DETECTED ON ORIGIN/MAIN: {changed_files}")
            return True
    except Exception as e:
        print(f"Diff error: {e}", file=sys.stderr)

    return False

def main():
    print("Watcher started: polling origin/main every 60 seconds...")
    max_checks = 60 # Run up to 60 minutes
    for i in range(max_checks):
        time.sleep(60)
        if check_for_requests():
            print("Waking up Draken with new request!")
            sys.exit(0) # Exiting cleanly triggers a reactive notification to Draken

    print("Watcher reached max duration without new requests.")

if __name__ == '__main__':
    main()
