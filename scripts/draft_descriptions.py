import json

with open('all_sanity_posts_full.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

cluster2_slugs = [
    "self-hosted-qdrant-docker-vultr",
    "pinecone-vs-qdrant-vultr-benchmark",
    "emergent-ai-autonomous-gtm-guide",
    "adcreative-ai-review-n8n-ad-refresh-loop",
    "cometchat-dify-inapp-voice",
    "omnichannel-ai-voice-note-handler",
    "elevenlabs-n8n-voice-ai-sales-agent",
    "corrective-rag-crag-n8n-blueprint",
    "dify-vs-n8n-architecture",
    "tapstitch-vs-printful-ecommerce-pipeline",
    "trainual-alternatives-active-agency-sop-engine",
    "headless-wordpress-vs-monolithic",
    "manychat-to-n8n-integration-lead-scoring",
    "n8n-multi-tenant-vector-schema",
    "pinecone-n8n-rag-knowledge-base-blueprint",
    "aisdr-vs-human-sdr-unit-economics-benchmark",
    "apollo-vs-lusha-vs-aisdr-comparison",
    "brevo-cold-email-ip-warming-guide",
    "accelerated-growth-studio-plg-playbook",
    "waterfall-data-enrichment-pipeline-n8n-guide",
    "closed-loop-lead-attribution-engine"
]

print("=== CLUSTER 2 POSTS CURRENT DETAILS ===")
for slug in cluster2_slugs:
    p = next((item for item in posts if item.get('slug') == slug), None)
    if p:
        title = p.get('title', '')
        s_desc = p.get('seoDescription') or ''
        desc = p.get('description') or ''
        print(f"Slug: {slug}")
        print(f"  Title: {title}")
        print(f"  Current seoDesc ({len(s_desc)} chars): {s_desc}")
        print(f"  Current desc    ({len(desc)} chars): {desc}\n")
