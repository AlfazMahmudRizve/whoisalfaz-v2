import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

key_file = "service_account_key.json"
SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly"
]

try:
    creds = service_account.Credentials.from_service_account_file(key_file, scopes=SCOPES)
    creds.refresh(Request())
    token = creds.token
    print("Token acquired successfully.")
except Exception as e:
    print(f"Error acquiring token: {e}")
    sys.exit(1)

# Test Search Console sites list
try:
    req = urllib.request.Request(
        "https://www.googleapis.com/webmasters/v3/sites",
        headers={"Authorization": f"Bearer {token}"}
    )
    with urllib.request.urlopen(req) as resp:
        sites_data = json.loads(resp.read().decode('utf-8'))
        print("Search Console Sites:", json.dumps(sites_data, indent=2))
except Exception as e:
    print(f"Search Console sites list error: {e}")

# Test GA4 properties list or run report
# GA Property ID from NEXT_PUBLIC_GA_ID: G-FS0GW17YB2
# Note: GA4 API uses numerical property ID, e.g. properties/123456789
try:
    req = urllib.request.Request(
        "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
        headers={"Authorization": f"Bearer {token}"}
    )
    with urllib.request.urlopen(req) as resp:
        ga_data = json.loads(resp.read().decode('utf-8'))
        print("GA Account Summaries:", json.dumps(ga_data, indent=2))
except Exception as e:
    print(f"GA Account summaries error: {e}")
