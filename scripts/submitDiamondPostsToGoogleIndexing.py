import os
import sys
import json
import urllib.request
import urllib.parse
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

diamond_slugs = [
    'screaming-frog-alternatives-free-seo-audit-tools',
    'manychat-pricing-2026',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'ai-automation-agency-business-model',
    'pinecone-vs-qdrant-vultr-benchmark'
]

# Canonical URLs with trailing slashes matching Next.js App Router config & sitemap.ts
urls_to_submit = [
    "https://whoisalfaz.me/sitemap.xml",
    "https://whoisalfaz.me/blog/"
] + [f"https://whoisalfaz.me/blog/{s}/" for s in diamond_slugs]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("=" * 75)
    print("💎 Submitting 5 Diamond Posts & Sitemap to Google Indexing API")
    print("=" * 75)
    print(f"Authenticating with Google Indexing API using {key_file_path}...")
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token
    print("✅ Authentication successful!\n")

    success_count = 0
    fail_count = 0

    for idx, url in enumerate(urls_to_submit, start=1):
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            ENDPOINT,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                notify_time = res_json.get("urlNotificationMetadata", {}).get("latestUpdate", {}).get("notifyTime", "N/A")
                label = url.replace("https://whoisalfaz.me/blog/", "").replace("https://whoisalfaz.me/", "").rstrip("/")
                if not label:
                    label = "root"
                print(f"[{idx}/{len(urls_to_submit)}] ✅ Submitted: {label:<55} | Notify: {notify_time}")
                success_count += 1
        except Exception as e:
            print(f"[{idx}/{len(urls_to_submit)}] ❌ Submitting {url}: {e}")
            fail_count += 1

    print(f"\n🎉 Google Indexing API Diamond Submission Complete!")
    print(f"   Successfully Submitted: {success_count}/{len(urls_to_submit)}")
    print(f"   Failed: {fail_count}")

except Exception as err:
    print(f"Fatal error authenticating or processing: {err}")
