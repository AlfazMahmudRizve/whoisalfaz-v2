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

# Canonical URL format matching sitemap.ts
all_urls = [f"https://whoisalfaz.me/blog/{s}" for s in c1_slugs + c2_slugs]

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
    print("✅ Authentication successful!\n")

    print(f"{'#':<3} | {'Cluster':<10} | {'URL Slug':<55} | {'Google Notification Time':<25} | {'Type':<12}")
    print("-" * 115)

    submitted_count = 0
    pending_count = 0

    for idx, url in enumerate(all_urls, start=1):
        cluster_label = "Cluster 1" if idx <= 24 else "Cluster 2"
        slug = url.replace("https://whoisalfaz.me/blog/", "")
        encoded_url = urllib.parse.quote(url, safe='')
        req_url = f"{GET_ENDPOINT}?url={encoded_url}"

        req = urllib.request.Request(
            req_url,
            headers={"Authorization": f"Bearer {access_token}"},
            method="GET"
        )

        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)

                latest_update = res_json.get("latestUpdate", {})
                notify_time = latest_update.get("notifyTime", "Submitted")
                notification_type = latest_update.get("type", "URL_UPDATED")
                
                if "T" in notify_time:
                    notify_time = notify_time.split(".")[0].replace("T", " ")

                print(f"{idx:<3} | {cluster_label:<10} | {slug:<55} | {notify_time:<25} | {notification_type:<12}")
                submitted_count += 1
        except urllib.error.HTTPError as http_err:
            if http_err.code == 404:
                print(f"{idx:<3} | {cluster_label:<10} | {slug:<55} | {'Pending Initial Crawl':<25} | {'URL_UPDATED':<12}")
                pending_count += 1
            else:
                print(f"{idx:<3} | {cluster_label:<10} | {slug:<55} | {f'HTTP {http_err.code}':<25} | {'ERROR':<12}")
        except Exception as e:
            print(f"{idx:<3} | {cluster_label:<10} | {slug:<55} | {f'Error: {e}':<25} | {'ERROR':<12}")

    print("\n" + "=" * 115)
    print(f"📊 Summary: Total URLs: {len(all_urls)} | Verified Submissions in Google Indexing API: {submitted_count} | Pending: {pending_count}")

except Exception as err:
    print(f"Fatal error authenticating or processing: {err}")
