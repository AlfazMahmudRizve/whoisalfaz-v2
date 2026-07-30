import json
import os
import re

print("Ensuring 100% 44/44 internal link coverage...")

c1_files = [
    'draft-2-1-apollo-brevo-n8n-pipeline.json',
    'draft-2-2-apollo-vs-lusha-vs-aisdr.json',
    'draft-2-3-aisdr-vs-human-sdr-unit-economics.json',
    'draft-2-4-waterfall-data-enrichment-pipeline.json',
    'draft-2-5-brevo-cold-email-ip-warming-guide.json',
    'draft-accelerated-growth-studio-plg-playbook.json',
    'draft-adcreative-ai-n8n-ad-refresh.json',
    'draft-closed-loop-lead-attribution-engine.json',
    'draft-cometchat-dify-inapp-voice.json',
    'draft-competitor-seo-audit.json',
    'draft-corrective-rag-crag-n8n.json',
    'draft-databox-revops-dashboard-pipeline-velocity.json',
    'draft-dify-vs-n8n-architecture.json',
    'draft-elevenlabs-n8n-voice-ai-sales-agent.json',
    'draft-emergent-ai-autonomous-gtm-guide.json',
    'draft-manychat-n8n-whatsapp-voice-bot.json',
    'draft-monday-crm-advanced-lead-scoring.json',
    'draft-n8n-multi-tenant-vector-schema.json',
    'draft-omnichannel-ai-voice-note-handler.json',
    'draft-pinecone-vs-qdrant-vultr-benchmark.json',
    'draft-self-hosted-qdrant-docker-vultr.json',
    'draft-tapstitch-vs-printful-ecommerce-pipeline.json',
    'draft-trainual-alternatives-active-agency-sop.json',
    'draft-turbotic-automation-governance.json'
]

c2_files = [
    'draft-cluster2-01-self-hosted-qdrant-cluster-vultr-docker-sop.json',
    'draft-cluster2-02-vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide.json',
    'draft-cluster2-03-securing-self-hosted-vector-databases-ssl-vultr-firewall.json',
    'draft-cluster2-04-the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n.json',
    'draft-cluster2-05-pinecone-serverless-vs-qdrant-vultr-latency-benchmark.json',
    'draft-cluster2-06-pinecone-namespaces-vs-qdrant-payload-filters-comparison.json',
    'draft-cluster2-07-hybrid-vector-keyword-search-qdrant-n8n-pipeline.json',
    'draft-cluster2-08-scaling-qdrant-vector-database-to-10-million-embeddings.json',
    'draft-cluster2-09-corrective-rag-crag-blueprint-n8n-tavily-fallback.json',
    'draft-cluster2-10-automated-pdf-document-chunking-vectorization-n8n.json',
    'draft-cluster2-11-building-an-enterprise-knowledge-graph-rag-n8n.json',
    'draft-cluster2-12-open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark.json',
    'draft-cluster2-13-dify-ai-vultr-gpu-docker-deployment-guide.json',
    'draft-cluster2-14-dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes.json',
    'draft-cluster2-15-semantic-search-api-n8n-qdrant-fastapi-bridge.json',
    'draft-cluster2-16-zero-data-retention-enterprise-rag-vultr-vps.json',
    'draft-cluster2-17-building-multi-tenant-vector-search-n8n-qdrant.json',
    'draft-cluster2-18-n8n-vector-store-memory-management-production-guide.json',
    'draft-cluster2-19-high-throughput-batch-vector-ingestion-n8n-qdrant.json',
    'draft-cluster2-20-n8n-ai-agent-memory-persistence-qdrant-vector-store.json'
]

all_files = c1_files + c2_files

def get_slug(data):
    s = data.get('slug')
    if isinstance(s, dict): return s.get('current')
    return s or ''

slug_registry = []
for fpath in all_files:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            d = json.load(f)
            slug_registry.append({
                'slug': get_slug(d),
                'title': d.get('title', '')
            })

for i, fpath in enumerate(all_files):
    if not os.path.exists(fpath): continue
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    body = str(data.get('body', ''))
    slug = get_slug(data)
    
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', body)
    int_links = [l for l in links if l[1].startswith('/') or 'whoisalfaz.me' in l[1]]
    
    if len(int_links) < 3:
        needed = 3 - len(int_links)
        other_posts = [p for p in slug_registry if p['slug'] != slug]
        
        rel_items = []
        for n in range(needed):
            idx = (i * 7 + n * 11) % len(other_posts)
            p = other_posts[idx]
            rel_items.append(f"- Read our technical guide on [{p['title']}](/blog/{p['slug']}) for further architecture details.")
            
        rel_block = "\n\n### Additional System Architecture Reading\n" + "\n".join(rel_items)
        data['body'] = body + rel_block
        
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

print("Link injection check complete!")
