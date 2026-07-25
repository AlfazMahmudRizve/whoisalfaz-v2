import os
import sys
import json
import urllib.request
import urllib.parse
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Ensure stdout uses UTF-8 encoding on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

urls_to_index = [
    "https://whoisalfaz.me/blog/",
    "https://whoisalfaz.me/blog/closed-loop-lead-attribution-engine/",
    "https://whoisalfaz.me/blog/databox-revops-dashboard-pipeline-velocity/",
    "https://whoisalfaz.me/blog/turbotic-automation-governance/",
    "https://whoisalfaz.me/blog/whatconverts-vs-callrail-attribution/",
    "https://whoisalfaz.me/blog/monday-crm-advanced-lead-scoring/",
    "https://whoisalfaz.me/blog/apollo-to-brevo-n8n-pipeline-guide/",
    "https://whoisalfaz.me/blog/apollo-vs-lusha-vs-aisdr-comparison/",
    "https://whoisalfaz.me/blog/aisdr-vs-human-sdr-unit-economics-benchmark/",
    "https://whoisalfaz.me/blog/waterfall-data-enrichment-pipeline-n8n-guide/",
    "https://whoisalfaz.me/blog/brevo-cold-email-ip-warming-guide/",
    "https://whoisalfaz.me/blog/elevenlabs-n8n-voice-ai-sales-agent/",
    "https://whoisalfaz.me/blog/dify-vs-n8n-architecture/",
    "https://whoisalfaz.me/blog/manychat-n8n-whatsapp-voice-bot/",
    "https://whoisalfaz.me/blog/cometchat-dify-inapp-voice/",
    "https://whoisalfaz.me/blog/omnichannel-ai-voice-note-handler/",
    "https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/",
    "https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/",
    "https://whoisalfaz.me/blog/corrective-rag-crag-n8n-blueprint/",
    "https://whoisalfaz.me/blog/n8n-multi-tenant-vector-schema/",
    "https://whoisalfaz.me/blog/adcreative-ai-review-n8n-ad-refresh-loop/",
    "https://whoisalfaz.me/blog/trainual-alternatives-active-agency-sop-engine/",
    "https://whoisalfaz.me/blog/emergent-ai-autonomous-gtm-guide/",
    "https://whoisalfaz.me/blog/tapstitch-vs-printful-ecommerce-pipeline/",
    "https://whoisalfaz.me/blog/accelerated-growth-studio-plg-playbook/"
]

key_file_path = "service_account_key.json"

if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print(f"Authenticating with Google Indexing API using {key_file_path}...")
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token
    print("[SUCCESS] Authentication successful!\n")

    success_count = 0
    fail_count = 0

    for idx, url in enumerate(urls_to_index, start=1):
        print(f"[{idx}/{len(urls_to_index)}] Submitting to Google Indexing API: {url}")
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
                print(f"  [OK] Submitted! Notify Time: {notify_time}")
                success_count += 1
        except Exception as e:
            print(f"  [ERROR] Submitting {url}: {e}")
            fail_count += 1

    print(f"\n[DONE] Google Indexing API Batch Submission Complete!")
    print(f"   Success: {success_count}")
    print(f"   Failed: {fail_count}")

except Exception as err:
    print(f"Fatal error authenticating or processing: {err}")
