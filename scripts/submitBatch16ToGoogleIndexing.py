import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

batch16_slugs = [
    'outstanding-ideas-for-b2b-lead-generation',
    'manychat-whatsapp-b2b-lead-capture-agency',
    'apollo-brevo-n8n-outbound-pipeline',
    'monday-com-automation-recipes-revops-2026',
    'pinecone-n8n-rag-knowledge-base-blueprint'
]

urls_to_submit = [
    "https://whoisalfaz.me/blog/"
] + [f"https://whoisalfaz.me/blog/{s}/" for s in batch16_slugs]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("=" * 75)
    print("🚀 Submitting Batch 16 Upgraded Articles to Google Indexing API")
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

    print("\n✅ Batch 16 Google Indexing submissions complete.")

except Exception as e:
    print(f"Authentication/Setup Failure: {str(e)}")
    sys.exit(1)
