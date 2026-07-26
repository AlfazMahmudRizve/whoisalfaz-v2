import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

cluster2_urls = [
    "https://whoisalfaz.me/blog/self-hosted-qdrant-cluster-vultr-docker-sop/",
    "https://whoisalfaz.me/blog/vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide/",
    "https://whoisalfaz.me/blog/securing-self-hosted-vector-databases-ssl-vultr-firewall/",
    "https://whoisalfaz.me/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n/",
    "https://whoisalfaz.me/blog/pinecone-serverless-vs-qdrant-vultr-latency-benchmark/",
    "https://whoisalfaz.me/blog/pinecone-namespaces-vs-qdrant-payload-filters-comparison/",
    "https://whoisalfaz.me/blog/hybrid-vector-keyword-search-qdrant-n8n-pipeline/",
    "https://whoisalfaz.me/blog/scaling-qdrant-vector-database-to-10-million-embeddings/",
    "https://whoisalfaz.me/blog/corrective-rag-crag-blueprint-n8n-tavily-fallback/",
    "https://whoisalfaz.me/blog/automated-pdf-document-chunking-vectorization-n8n/",
    "https://whoisalfaz.me/blog/building-an-enterprise-knowledge-graph-rag-n8n/",
    "https://whoisalfaz.me/blog/open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark/",
    "https://whoisalfaz.me/blog/dify-ai-vultr-gpu-docker-deployment-guide/",
    "https://whoisalfaz.me/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/",
    "https://whoisalfaz.me/blog/semantic-search-api-n8n-qdrant-fastapi-bridge/",
    "https://whoisalfaz.me/blog/zero-data-retention-enterprise-rag-vultr-vps/",
    "https://whoisalfaz.me/blog/building-multi-tenant-vector-search-n8n-qdrant/",
    "https://whoisalfaz.me/blog/n8n-vector-store-memory-management-production-guide/",
    "https://whoisalfaz.me/blog/high-throughput-batch-vector-ingestion-n8n-qdrant/",
    "https://whoisalfaz.me/blog/n8n-ai-agent-memory-persistence-qdrant-vector-store/"
]

key_file_path = "service_account_key.json"

if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/indexing"]
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

try:
    print(f"Authenticating with Google Indexing API using {key_file_path}...")
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token
    print("[SUCCESS] Authentication successful!\n")

    print(f"🚀 Submitting {len(cluster2_urls)} Cluster #2 URLs to Google Indexing API...\n")

    success_count = 0
    for idx, url in enumerate(cluster2_urls, start=1):
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
                slug = url.replace("https://whoisalfaz.me/blog/", "").rstrip("/")
                print(f"[{idx}/{len(cluster2_urls)}] ✅ Submitted: {slug}")
                success_count += 1
        except Exception as e:
            slug = url.replace("https://whoisalfaz.me/blog/", "").rstrip("/")
            print(f"[{idx}/{len(cluster2_urls)}] ❌ Error submitting {slug}: {e}")

    print(f"\n[DONE] Google Indexing API Batch Complete: {success_count}/{len(cluster2_urls)} URLs Successfully Pushed!")

except Exception as err:
    print(f"Fatal error: {err}")
