from analyze_gsc_content_gap import query_page_mapping

target_slugs = [
  'automate-personal-branding-with-n8n',
  'manychat-whatsapp-b2b-lead-capture-agency',
  'case-study-cashops-financial-dashboard',
  'manychat-to-n8n-integration-lead-scoring',
  'self-hosted-qdrant-docker-vultr',
  'apollo-brevo-n8n-outbound-pipeline',
  'n8n-debugging-error-handling-basics',
  'apollo-vs-lusha-vs-aisdr-comparison',
  'automated-youtube-shorts-generator',
  'headless-wordpress-seo-nextjs-guide'
]

print("=== QUERIES MAPPING TO TARGET SLUGS ===\n")

for slug in target_slugs:
    print(f"Slug: {slug}")
    found = False
    for q, plist in query_page_mapping.items():
        for p in plist:
            if slug in p['page']:
                found = True
                print(f"  - '{q}': {p['impressions']} imp, {p['clicks']} clicks, Pos {p['position']}")
    if not found:
        print("  - No direct exact query matches in mapping table (generic rankings)")
    print()
