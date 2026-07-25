import json, os, re

target_24_files = [
    # Pillar 1
    'draft-closed-loop-lead-attribution-engine.json',
    'draft-competitor-seo-audit.json',
    'draft-databox-revops-dashboard-pipeline-velocity.json',
    'draft-monday-crm-advanced-lead-scoring.json',
    'draft-turbotic-automation-governance.json',
    # Pillar 2
    'draft-2-1-apollo-brevo-n8n-pipeline.json',
    'draft-2-2-apollo-vs-lusha-vs-aisdr.json',
    'draft-2-3-aisdr-vs-human-sdr-unit-economics.json',
    'draft-2-4-waterfall-data-enrichment-pipeline.json',
    'draft-2-5-brevo-cold-email-ip-warming-guide.json',
    # Pillar 3
    'draft-cometchat-dify-inapp-voice.json',
    'draft-dify-vs-n8n-architecture.json',
    'draft-elevenlabs-n8n-voice-ai-sales-agent.json',
    'draft-manychat-n8n-whatsapp-voice-bot.json',
    'draft-omnichannel-ai-voice-note-handler.json',
    # Pillar 4
    'draft-corrective-rag-crag-n8n.json',
    'draft-n8n-multi-tenant-vector-schema.json',
    'draft-pinecone-vs-qdrant-vultr-benchmark.json',
    'draft-self-hosted-qdrant-docker-vultr.json',
    # Pillar 5
    'draft-accelerated-growth-studio-plg-playbook.json',
    'draft-adcreative-ai-n8n-ad-refresh.json',
    'draft-emergent-ai-autonomous-gtm-guide.json',
    'draft-tapstitch-vs-printful-ecommerce-pipeline.json',
    'draft-trainual-alternatives-active-agency-sop.json'
]

with open('scratch/audit_results.json', 'r', encoding='utf-8') as f:
    all_audits = json.load(f)

audits_24 = [a for a in all_audits if a['filepath'] in target_24_files]

print(f"Total target files found in audit: {len(audits_24)}")

by_pillar = {}
for a in audits_24:
    p = a['pillar']
    by_pillar.setdefault(p, []).append(a)

full_report = {}

for pillar, items in by_pillar.items():
    print(f"\n==================== {pillar} ({len(items)} Drafts) ====================")
    p_scores = []
    pillar_details = []
    
    for item in items:
        # Score calculation for each file out of 100
        # 1. Title <= 60 chars (15 pts)
        s_title_len = 15 if item['title_pass'] else max(0, 15 - (item['title_len'] - 60))
        # 2. Focus Keyword at start (15 pts)
        s_kw_start = 15 if item['keyword_at_start'] else 5
        # 3. Entity Density (20 pts - 10+ entities = 20 pts)
        s_entities = min(20, item['entity_count'] * 2)
        # 4. AEO/GEO Direct Answer 134-167 words (25 pts - 5/5 H2s = 25 pts)
        s_aeo = int((item['aeo_exact_matches'] / item['tot_h2s']) * 25) if item['tot_h2s'] > 0 else 0
        # 5. Executable Code Snippets & Schema (25 pts - Code 15 pts, Schema 10 pts)
        s_code = 15 if item['has_code'] else 0
        s_schema = 10 if item['has_schema'] else 0
        
        file_score = s_title_len + s_kw_start + s_entities + s_aeo + s_code + s_schema
        p_scores.append(file_score)
        
        detail = {
            'filepath': item['filepath'],
            'title': item['title'],
            'title_len': item['title_len'],
            'title_pass': item['title_pass'],
            'search_intent': item['search_intent'],
            'keyword_at_start': item['keyword_at_start'],
            'entity_count': item['entity_count'],
            'aeo_compliance': f"{item['aeo_exact_matches']}/{item['tot_h2s']}",
            'avg_h2_p1_words': item['avg_h2_p1_len'],
            'h2_p1_counts': item['h2_p1_counts'],
            'code_blocks': item['code_block_count'],
            'schema_present': item['has_schema'],
            'score': file_score
        }
        pillar_details.append(detail)
        
        print(f"File: {item['filepath']}")
        print(f"  Title ({item['title_len']} chars): '{item['title']}' | Score: {file_score}/100")
        print(f"  Intent: {item['search_intent']} | KW Start: {item['keyword_at_start']} | Entities: {item['entity_count']}")
        print(f"  AEO Sweetspot (134-167 words): {item['aeo_exact_matches']}/{item['tot_h2s']} H2s | Code Blocks: {item['code_block_count']} | Schema: {item['has_schema']}")
    
    avg_pillar_score = sum(p_scores) / len(p_scores) if p_scores else 0
    full_report[pillar] = {
        'avg_score': round(avg_pillar_score, 1),
        'items': pillar_details
    }

print("\n==================== SUMMARY OVERALL SCORE ====================")
all_scores = [d['score'] for p in full_report.values() for d in p['items']]
final_score = sum(all_scores) / len(all_scores) if all_scores else 0
print(f"Final SEO Quality Approval Score: {round(final_score, 1)} / 100")

with open('scratch/pillar_audit_summary.json', 'w', encoding='utf-8') as out:
    json.dump({'pillars': full_report, 'overall_score': round(final_score, 1)}, out, indent=2)
