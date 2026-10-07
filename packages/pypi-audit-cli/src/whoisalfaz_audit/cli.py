#!/usr/bin/env python3
"""
WhoisAlfaz Website & Technical SEO Audit Engine CLI.
Zero-dependency CLI tool for inspecting Core Web Vitals, SSL, DNS, and security headers.
Interactive Web Audit: https://whoisalfaz.me/audit/
"""

import sys
import json
import base64
import time
import urllib.request
import urllib.error
import argparse

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

RESET = "\033[0m"
BOLD = "\033[1m"
CYAN = "\033[36m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"

def run_audit(target_url: str):
    if not target_url.startswith(("http://", "https://")):
        target_url = "https://" + target_url

    print(f"\n[*] {CYAN}Running full technical audit on:{RESET} {BOLD}{target_url}{RESET}")
    print(f"[-] Evaluating Core Web Vitals, SSL, DNS, Meta Tags & Security Headers...\n")

    api_endpoint = "https://whoisalfaz.me/api/audit/"
    payload = json.dumps({"url": target_url}).encode("utf-8")

    req = urllib.request.Request(
        api_endpoint,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "User-Agent": "WhoisAlfaz-Audit-Python-CLI/1.0",
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"{RED}[!] HTTP Error {e.code}:{RESET} {e.reason}")
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"{RED}[!] Connection error:{RESET} {e.reason}")
        sys.exit(1)
    except Exception as e:
        print(f"{RED}[!] Unexpected error:{RESET} {str(e)}")
        sys.exit(1)

    if data.get("error"):
        print(f"{RED}[!] Error:{RESET} {data['error']}")
        sys.exit(1)

    results = data.get("results") or data

    grade = results.get("grade", "N/A")
    score = results.get("overallScore", 0)
    grade_color = GREEN if grade == "A" else CYAN if grade == "B" else YELLOW

    print("=" * 65)
    print(f"[#] {BOLD}OVERALL AUDIT SCORE:{RESET} {grade_color}{BOLD}{score}/100 (Grade {grade}){RESET}")
    print("=" * 65)

    checks = results.get("checks", [])
    for check in checks:
        status = check.get("status", "")
        icon = f"{GREEN}[PASS]{RESET}" if status == "pass" else f"{YELLOW}[WARN]{RESET}" if status == "warn" else f"{RED}[FAIL]{RESET}"
        name = check.get("name", "Unknown Check")
        chk_score = check.get("score", 0)
        summary = check.get("summary", "")

        print(f"\n{icon} {BOLD}{name}{RESET} - Score: {chk_score}/100")
        print(f"   {summary}")

    print("\n" + "=" * 65)
    try:
        share_data = {
            "u": results.get("url", target_url),
            "o": score,
            "g": grade,
            "c": [{"n": c.get("name"), "s": c.get("score"), "st": c.get("status"), "sm": c.get("summary")} for c in checks],
            "t": int(time.time() * 1000)
        }
        share_json = json.dumps(share_data).encode("utf-8")
        share_hash = base64.b64encode(share_json).decode("utf-8").replace("+", "-").replace("/", "_").rstrip("=")
        print(f"[*] {BOLD}View Full Interactive Report:{RESET} {CYAN}https://whoisalfaz.me/audit/results/{share_hash}/{RESET}")
    except Exception:
        print(f"[*] {BOLD}Run unlimited free browser audits at:{RESET} {CYAN}https://whoisalfaz.me/audit/{RESET}")

    print(f"[*] {BOLD}Engineered by Alfaz Mahmud Rizve:{RESET} {CYAN}https://whoisalfaz.me/{RESET}")
    print("=" * 65 + "\n")

def main():
    parser = argparse.ArgumentParser(
        description="WhoisAlfaz Website & Technical SEO Audit Engine CLI"
    )
    parser.add_argument("url", nargs="?", help="Target website URL to audit (e.g., https://example.com)")
    args = parser.parse_args()

    if not args.url:
        print(f"""
{BOLD}{CYAN}WhoisAlfaz Website & Technical SEO Auditor (Python CLI){RESET}
Fast, frictionless web audit for Performance, SSL, DNS, and Security Headers.

{BOLD}Usage:{RESET}
  whoisalfaz-audit https://example.com
  python -m whoisalfaz_audit.cli https://example.com

{BOLD}Full Interactive Web Audit:{RESET}
  https://whoisalfaz.me/audit/
""")
        sys.exit(0)

    run_audit(args.url)

if __name__ == "__main__":
    main()
