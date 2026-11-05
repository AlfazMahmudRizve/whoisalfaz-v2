#!/usr/bin/env python3
"""
Lightweight background watcher for Mikey-Draken two-way protocol.
Polls origin/main every 60 seconds when active requests are in-flight.
Exits with code 0 when a new commit or request is detected to wake Draken up.
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

    # 2. Check if origin/main has advanced beyond local HEAD
    try:
        local_head = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True, check=True).stdout.strip()
        remote_main = subprocess.run(['git', 'rev-parse', 'origin/main'], capture_output=True, text=True, check=True).stdout.strip()
        if local_head != remote_main:
            diff_res = subprocess.run(['git', 'diff', '--name-only', 'HEAD', 'origin/main'], capture_output=True, text=True, check=True)
            changed = [f.strip() for f in diff_res.stdout.splitlines() if f.strip()]
            print(f"⚡ NEW COMMITS DETECTED ON ORIGIN/MAIN: {changed}")
            return True
    except Exception as e:
        print(f"Comparison error: {e}", file=sys.stderr)

    return False

def main():
    print("Watcher started: polling origin/main every 60 seconds...")
    max_checks = 120 # Run up to 2 hours
    for i in range(max_checks):
        time.sleep(60)
        if check_for_requests():
            print("Waking up Draken with new commit/request!")
            sys.exit(0) # Exiting cleanly triggers a reactive notification to Draken

    print("Watcher reached max duration without new requests.")

if __name__ == '__main__':
    main()
