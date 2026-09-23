import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

batch5_slugs = [
    'automated-pdf-document-chunking-vectorization-n8n',
    'semantic-search-api-n8n-qdrant-fastapi-bridge',
    'closed-loop-lead-attribution-engine',
    'databox-revops-dashboard-pipeline-velocity',
    'whatconverts-vs-callrail-attribution'
]

urls_to_submit = [
    "https://whoisalfaz.me/blog/"
] + [f"https://whoisalfaz.me/blog/{s}/" for s in batch5_slugs]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("=" * 75)
    print("🚀 Submitting Batch 5 Upgraded Articles to Google Indexing API")
    print("=" * 75)
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token
    print("✅ Google Indexing Authentication successful!\n")

    for idx, url in enumerate(urls_to_submit, start=1):
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        json_data = json.dumps(payload).encode('utf-8')

        req = urllib.request.Request(
            ENDPOINT,
            data=json_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as response:
                status_code = response.getcode()
                response_body = response.read().decode('utf-8')
                print(f"[{idx}/{len(urls_to_submit)}] SUCCESS {status_code}: {url}")
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8')
            print(f"[{idx}/{len(urls_to_submit)}] HTTP Error {e.code} for {url}: {err_msg}")
        except Exception as e:
            print(f"[{idx}/{len(urls_to_submit)}] General Error for {url}: {str(e)}")

    print("\n✅ Batch 5 Google Indexing submissions complete.")

except Exception as e:
    print(f"Authentication/Setup Failure: {str(e)}")
    sys.exit(1)
