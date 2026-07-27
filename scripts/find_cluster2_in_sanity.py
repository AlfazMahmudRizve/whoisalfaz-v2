import json

with open('all_sanity_posts_full.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# List of requested Cluster #2 / target post slugs from prompt & previous tasks
requested_slugs = [
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
    "accelerated-growth-studio-plg-playbook"
]

print(f"Total posts in Sanity: {len(posts)}")

matched_posts = []
unmatched_requested = list(requested_slugs)

for p in posts:
    slug = p.get('slug')
    _id = p.get('_id')
    title = p.get('title')
    seo_desc = p.get('seoDescription')
    desc = p.get('description')
    
    # Check exact match
    if slug in requested_slugs:
        matched_posts.append((slug, _id, title, seo_desc, desc))
        if slug in unmatched_requested:
            unmatched_requested.remove(slug)

print(f"\nExact matches found: {len(matched_posts)} / {len(requested_slugs)}")
for m in matched_posts:
    print(f"SLUG: {m[0]} | ID: {m[1]}")
    print(f"  Title: {m[2]}")
    print(f"  seoDesc ({len(m[3]) if m[3] else 0}): {m[3]}")
    print(f"  desc ({len(m[4]) if m[4] else 0}): {m[4]}\n")

if unmatched_requested:
    print(f"Unmatched requested slugs ({len(unmatched_requested)}):")
    for u in unmatched_requested:
        print(f"  - {u}")
        # Search for partial matches in all posts
        partials = [p for p in posts if p.get('slug') and (u[:10] in p.get('slug') or p.get('slug')[:10] in u)]
        for part in partials:
            print(f"      -> Potential match in Sanity: slug={part.get('slug')}, id={part.get('_id')}")
