from analyze_gsc_content_gap import pages_data

already_upgraded = [
  'screaming-frog-alternatives-free-seo-audit-tools',
  'manychat-pricing-2026',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'aisdr-vs-human-sdr-performance-teardown',
  'whatconverts-vs-callrail-attribution',
  'manychat-n8n-async-timeout-fix',
  'manychat-alternatives-2026-top-tools-by-use-case',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'elevenlabs-n8n-voice-ai-sales-agent',
  'brevo-cold-email-ip-warming-guide',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'building-multi-tenant-vector-search-n8n-qdrant',
  'automated-pdf-document-chunking-vectorization-n8n'
]

print("=== REMAINING HIGH-IMPRESSION PAGES IN GSC ===\n")

remaining = []
for p in pages_data:
    url = p['key']
    if not url.startswith('https://whoisalfaz.me/blog/'):
        continue
    slug = url.replace('https://whoisalfaz.me/blog/', '').strip('/')
    if slug not in already_upgraded:
        remaining.append({
            'slug': slug,
            'url': url,
            'impressions': p['impressions'],
            'clicks': p['clicks'],
            'ctr': p['ctr'],
            'position': p['position']
        })

remaining.sort(key=lambda x: x['impressions'], reverse=True)

print(f"Total remaining blog pages with impressions: {len(remaining)}\n")
for idx, r in enumerate(remaining[:15], 1):
    print(f"{idx}. [{r['slug']}] -> Imp: {r['impressions']} | Clicks: {r['clicks']} | CTR: {r['ctr']}% | Pos: {r['position']}")
