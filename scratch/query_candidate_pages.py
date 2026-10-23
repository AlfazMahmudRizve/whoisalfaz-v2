from analyze_gsc_content_gap import query_page_mapping, pages_data

candidate_slugs = [
  'manychat-n8n-async-timeout-fix',
  'manychat-alternatives-2026-top-tools-by-use-case',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'elevenlabs-n8n-voice-ai-sales-agent',
  'automate-personal-branding-with-n8n',
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'brevo-cold-email-ip-warming-guide',
  'manychat-whatsapp-b2b-lead-capture-agency',
  'building-multi-tenant-vector-search-n8n-qdrant',
  'automated-pdf-document-chunking-vectorization-n8n',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'adcreative-ai-review-n8n-ad-refresh-loop'
]

print("=== GSC PERFORMANCE & QUERIES FOR CANDIDATE PAGES ===\n")

for slug in candidate_slugs:
    page_url = f"https://whoisalfaz.me/blog/{slug}/"
    # Find page metrics in pages_data
    p_metrics = next((p for p in pages_data if p['key'] == page_url or p['key'] == page_url[:-1]), None)
    
    # Find all queries mapping to this page
    matching_queries = []
    for q, page_list in query_page_mapping.items():
        for p in page_list:
            if p['page'] == page_url or p['page'] == page_url[:-1] or slug in p['page']:
                matching_queries.append({
                    'query': q,
                    'impressions': p['impressions'],
                    'clicks': p['clicks'],
                    'ctr': p['ctr'],
                    'position': p['position']
                })
    
    matching_queries.sort(key=lambda x: x['impressions'], reverse=True)
    
    print(f"Page: {slug}")
    if p_metrics:
        print(f"  Page Total -> Imp: {p_metrics['impressions']}, Clicks: {p_metrics['clicks']}, CTR: {p_metrics['ctr']}%, Pos: {p_metrics['position']}")
    else:
        print("  Page Total -> Not found in pages table")
    print(f"  Mapped Queries ({len(matching_queries)}):")
    for mq in matching_queries[:8]:
        print(f"    - '{mq['query']}': {mq['impressions']} imp, {mq['clicks']} clicks, {mq['ctr']}%, Pos {mq['position']}")
    print("-" * 60)
