#!/usr/bin/env python3
"""
Direct Google Search Console Read-Only Query Script
Uses Google Service Account credentials directly (zero third-party MCP dependencies).
Scope: https://www.googleapis.com/auth/webmasters.readonly (100% read-only).
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.parse
from datetime import datetime, timedelta
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def get_credentials():
    # 1. Check for environment variable with raw JSON
    env_json = os.environ.get('GSC_SERVICE_ACCOUNT_JSON')
    if env_json:
        try:
            info = json.loads(env_json)
            return service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
        except Exception as e:
            print(f"Warning: Could not parse GSC_SERVICE_ACCOUNT_JSON env var: {e}", file=sys.stderr)

    # 2. Check for local key file
    key_path = os.environ.get('GSC_KEY_PATH', 'service_account_key.json')
    if os.path.exists(key_path):
        return service_account.Credentials.from_service_account_file(key_path, scopes=SCOPES)

    print("Error: No service account credentials found.", file=sys.stderr)
    print("Provide either 'service_account_key.json' in working directory or set GSC_SERVICE_ACCOUNT_JSON env var.", file=sys.stderr)
    sys.exit(1)

def query_gsc(site_url, start_date, end_date, dimension='query', limit=25):
    creds = get_credentials()
    creds.refresh(Request())
    token = creds.token

    encoded_site = urllib.parse.quote(site_url, safe='')
    api_url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query"

    payload = {
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': [dimension],
        'rowLimit': limit
    }

    req = urllib.request.Request(
        api_url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            rows = data.get('rows', [])
            print(f"\n📊 Google Search Console: {site_url}")
            print(f"📅 Period: {start_date} to {end_date} | Dimension: {dimension} | Rows: {len(rows)}\n")
            print(f"{'Key':<50} | {'Clicks':<8} | {'Impressions':<12} | {'CTR':<8} | {'Position':<8}")
            print("-" * 95)
            for r in rows:
                key = r.get('keys', [''])[0]
                clicks = r.get('clicks', 0)
                impressions = r.get('impressions', 0)
                ctr = f"{r.get('ctr', 0)*100:.1f}%"
                position = f"{r.get('position', 0):.1f}"
                print(f"{key[:48]:<50} | {clicks:<8} | {impressions:<12} | {ctr:<8} | {position:<8}")
            return rows
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.reason}", file=sys.stderr)
        print(e.read().decode('utf-8'), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ Request failed: {e}", file=sys.stderr)
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Query Google Search Console search performance (read-only).")
    parser.add_argument('--site', default='https://whoisalfaz.me/', help='Property URL or sc-domain (default: https://whoisalfaz.me/)')
    parser.add_argument('--days', type=int, default=7, help='Number of past days to query (default: 7)')
    parser.add_argument('--dimension', choices=['query', 'page', 'country', 'device'], default='query', help='Dimension to break down by')
    parser.add_argument('--limit', type=int, default=20, help='Max rows to return (default: 20)')
    args = parser.parse_args()

    end_date = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=2 + args.days)).strftime('%Y-%m-%d')

    query_gsc(args.site, start_date, end_date, args.dimension, args.limit)

if __name__ == '__main__':
    main()
