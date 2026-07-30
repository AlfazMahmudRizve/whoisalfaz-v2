import os
import sys
import json
import urllib.request
import urllib.parse
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

c1_slugs = [
    'apollo-to-brevo-n8n-pipeline-guide',
    'apollo-vs-lusha-vs-aisdr-comparison',
    'aisdr-vs-human-sdr-unit-economics-benchmark',
    'waterfall-data-enrichment-pipeline-n8n-guide',
    'brevo-cold-email-ip-warming-guide',
    'accelerated-growth-studio-plg-playbook',
    'adcreative-ai-review-n8n-ad-refresh-loop',
    'closed-loop-lead-attribution-engine',
    'cometchat-dify-inapp-voice',
    'how-to-audit-competitor-seo-no-verification',
    'corrective-rag-crag-n8n-blueprint',
    'databox-revops-dashboard-pipeline-velocity',
    'dify-vs-n8n-architecture',
    'elevenlabs-n8n-voice-ai-sales-agent',
    'emergent-ai-autonomous-gtm-guide',
    'manychat-n8n-whatsapp-voice-bot',
    'monday-crm-advanced-lead-scoring',
    'n8n-multi-tenant-vector-schema',
    'omnichannel-ai-voice-note-handler',
    'pinecone-vs-qdrant-vultr-benchmark',
    'self-hosted-qdrant-docker-vultr',
    'tapstitch-vs-printful-ecommerce-pipeline',
    'trainual-alternatives-active-agency-sop-engine',
    'turbotic-automation-governance'
]

c2_slugs = [
    'self-hosted-qdrant-cluster-vultr-docker-sop',
    'vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide',
    'securing-self-hosted-vector-databases-ssl-vultr-firewall',
    'the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n',
    'pinecone-serverless-vs-qdrant-vultr-latency-benchmark',
    'pinecone-namespaces-vs-qdrant-payload-filters-comparison',
    'hybrid-vector-keyword-search-qdrant-n8n-pipeline',
    'scaling-qdrant-vector-database-to-10-million-embeddings',
    'corrective-rag-crag-blueprint-n8n-tavily-fallback',
    'automated-pdf-document-chunking-vectorization-n8n',
    'building-an-enterprise-knowledge-graph-rag-n8n',
    'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
    'dify-ai-vultr-gpu-docker-deployment-guide',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'semantic-search-api-n8n-qdrant-fastapi-bridge',
    'zero-data-retention-enterprise-rag-vultr-vps',
    'building-multi-tenant-vector-search-n8n-qdrant',
    'n8n-vector-store-memory-management-production-guide',
    'high-throughput-batch-vector-ingestion-n8n-qdrant',
    'n8n-ai-agent-memory-persistence-qdrant-vector-store'
]

# Canonical URL format matching sitemap.ts (without trailing slash)
urls_to_submit = ["https://whoisalfaz.me/blog"] + [f"https://whoisalfaz.me/blog/{s}" for s in c1_slugs + c2_slugs]

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
                slug = url.replace("https://whoisalfaz.me/blog/", "").replace("https://whoisalfaz.me/blog", "blog-index")
                print(f"[{idx}/{len(urls_to_submit)}] ✅ Submitted: {slug:<55} | Notify Time: {notify_time}")
                success_count += 1
        except Exception as e:
            print(f"[{idx}/{len(urls_to_submit)}] ❌ Submitting {url}: {e}")
            fail_count += 1

    print(f"\n🎉 Google Indexing API Batch Submission Complete!")
    print(f"   Successfully Submitted: {success_count}")
    print(f"   Failed: {fail_count}")

except Exception as err:
    print(f"Fatal error authenticating or processing: {err}")
