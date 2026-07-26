import os
import sys
import json
import urllib.request
import urllib.parse
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

urls_to_check = [
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

SCOPES = ["https://www.googleapis.com/auth/indexing"]
GET_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:getMetadata"

try:
    print(f"Authenticating with Google Indexing API using {key_file_path}...")
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token
    print("[SUCCESS] Authentication successful!\n")

    print(f"{'#':<3} | {'URL Slug':<55} | {'Latest Notification Time':<25} | {'Type':<12}")
    print("-" * 105)

    for idx, url in enumerate(urls_to_check, start=1):
        encoded_url = urllib.parse.quote(url, safe='')
        req_url = f"{GET_ENDPOINT}?url={encoded_url}"

        req = urllib.request.Request(
            req_url,
            headers={
                "Authorization": f"Bearer {access_token}"
            },
            method="GET"
        )

        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)

                latest_update = res_json.get("latestUpdate", {})
                notify_time = latest_update.get("notifyTime", "Submitted")
                notification_type = latest_update.get("type", "URL_UPDATED")

                slug = url.replace("https://whoisalfaz.me/blog/", "").rstrip("/")
                print(f"{idx:<3} | {slug:<55} | {notify_time:<25} | {notification_type:<12}")
        except urllib.error.HTTPError as http_err:
            slug = url.replace("https://whoisalfaz.me/blog/", "").rstrip("/")
            if http_err.code == 404:
                print(f"{idx:<3} | {slug:<55} | {'Pending Initial Crawl':<25} | {'URL_UPDATED':<12}")
            else:
                print(f"{idx:<3} | {slug:<55} | {f'HTTP {http_err.code}':<25} | {'ERROR':<12}")
        except Exception as e:
            slug = url.replace("https://whoisalfaz.me/blog/", "").rstrip("/")
            print(f"{idx:<3} | {slug:<55} | {f'Error: {e}':<25} | {'ERROR':<12}")

    print("\n[DONE] Google Indexing Status Check Complete!")

except Exception as err:
    print(f"Fatal error authenticating or processing: {err}")
