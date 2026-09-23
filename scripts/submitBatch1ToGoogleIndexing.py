import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

batch1_slugs = [
    'cometchat-dify-inapp-voice',
    'headless-wordpress-seo-nextjs-guide',
    'dify-ai-vultr-gpu-docker-deployment-guide',
    'apollo-to-brevo-n8n-pipeline-guide',
    'turbotic-automation-governance'
]

urls_to_submit = [
    "https://whoisalfaz.me/blog/"
] + [f"https://whoisalfaz.me/blog/{s}/" for s in batch1_slugs]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("=" * 75)
    print("🚀 Submitting Batch 1 Upgraded Articles to Google Indexing API")
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
                res_body = response.read().decode('utf-8')
                print(f"[{idx}/{len(urls_to_submit)}] SUCCESS 200: {url}")
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8')
            print(f"[{idx}/{len(urls_to_submit)}] FAILED {e.code}: {url} - {err_msg}")

    print("\n✅ Batch 1 Google Indexing submissions complete.")

except Exception as ex:
    print(f"❌ Fatal error in Google Indexing submission: {ex}")
    sys.exit(1)
