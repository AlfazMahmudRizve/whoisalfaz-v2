import glob, json, os, re

def fix_json_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        data = json.loads(content)
        return data, None
    except Exception as e:
        # Try manual string repair for unescaped newlines in body
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            raw = f.read()
        
        # Look for "body": "..."
        idx = raw.find('"body": "')
        if idx != -1:
            start_body = idx + len('"body": "')
            # find next field like '",\n  "schema'
            end_body = raw.find('",\n  "', start_body)
            if end_body == -1:
                end_body = raw.find('",\n"', start_body)
            if end_body != -1:
                body_val = raw[start_body:end_body]
                # Replace literal unescaped newlines with \n
                fixed_body = body_val.replace('\r\n', '\\n').replace('\n', '\\n')
                fixed_raw = raw[:start_body] + fixed_body + raw[end_body:]
                try:
                    data = json.loads(fixed_raw)
                    with open(filepath, 'w', encoding='utf-8') as out:
                        json.dump(data, out, indent=2)
                    print(f"Fixed {filepath} successfully!")
                    return data, None
                except Exception as e2:
                    return None, f"Fix failed: {e2}"
        return None, str(e)

files = sorted(glob.glob('draft-*.json'))
print(f"Found {len(files)} draft files in total.")

pillar_mapping = {
    'Pillar 1: RevOps Analytics & Lead Attribution': [
        'draft-closed-loop-lead-attribution-engine.json',
        'draft-competitor-seo-audit.json',
        'draft-databox-revops-dashboard-pipeline-velocity.json',
        'draft-monday-crm-advanced-lead-scoring.json',
        'draft-monday-recipes.json',
        'draft-revops-definition.json',
        'draft-revops-stack.json',
        'draft-screaming-frog-alternatives.json',
        'draft-turbotic-automation-governance.json',
        'draft-whatconverts-vs-callrail-attribution.json'
    ],
    'Pillar 2: Outbound Sales & B2B Prospecting': [
        'draft-2-1-apollo-brevo-n8n-pipeline.json',
        'draft-2-2-apollo-vs-lusha-vs-aisdr.json',
        'draft-2-3-aisdr-vs-human-sdr-unit-economics.json',
        'draft-2-4-waterfall-data-enrichment-pipeline.json',
        'draft-2-5-brevo-cold-email-ip-warming-guide.json',
        'draft-aisdr-vs-human.json',
        'draft-apollo-brevo-n8n.json',
        'draft-cold-email-machine.json',
        'draft-n8n-apollo.json'
    ],
    'Pillar 3: Voice & Conversational AI': [
        'draft-cometchat-dify-inapp-voice.json',
        'draft-dify-vs-n8n-architecture.json',
        'draft-elevenlabs-n8n-voice-ai-sales-agent.json',
        'draft-manychat-n8n-whatsapp-voice-bot.json',
        'draft-manychat-n8n.json',
        'draft-manychat-whatsapp-b2b-lead-capture-agency.json',
        'draft-omnichannel-ai-voice-note-handler.json'
    ],
    'Pillar 4: Vector DB & RAG Infrastructure': [
        'draft-corrective-rag-crag-n8n.json',
        'draft-n8n-multi-tenant-vector-schema.json',
        'draft-pinecone-n8n-rag.json',
        'draft-pinecone-vs-qdrant-vultr-benchmark.json',
        'draft-pinecone-vs-qdrant.json',
        'draft-self-hosted-qdrant-docker-vultr.json'
    ],
    'Pillar 5: Growth Operations, Ad AI & SOP Systems': [
        'draft-accelerated-growth-studio-plg-playbook.json',
        'draft-adcreative-ai-n8n-ad-refresh.json',
        'draft-emergent-ai-autonomous-gtm-guide.json',
        'draft-headless-wordpress-seo-nextjs-guide.json',
        'draft-headless-wordpress-vs-monolithic.json',
        'draft-tapstitch-vs-printful-ecommerce-pipeline.json',
        'draft-trainual-alternatives-active-agency-sop.json',
        'draft-urban-cafe-foodtech-platform.json'
    ]
}

# Wikipedia / Named Entity dictionary for checking entity density
KNOWN_ENTITIES = [
    'n8n', 'Apollo.io', 'Brevo', 'AiSDR', 'Lusha', 'monday.com', 'Databox', 'WhatConverts', 'CallRail',
    'Turbotic', 'Pinecone', 'Qdrant', 'Vultr', 'Docker', 'ElevenLabs', 'ManyChat', 'CometChat', 'Dify.ai',
    'AdCreative.ai', 'Trainual', 'Emergent', 'Tapstitch', 'Accelerated Growth Studio', 'Next.js', 'WordPress',
    'OpenAI', 'Whisper', 'Tavily', 'LangChain', 'SaaS', 'RevOps', 'B2B', 'CRM', 'API', 'RAG', 'Vector Database',
    'JSON-LD', 'Schema.org', 'Webhooks', 'SMTP', 'REST API', 'PostgreSQL', 'Python', 'JavaScript', 'TypeScript'
]

audits = []

for pillar_name, p_files in pillar_mapping.items():
    print(f"\n==================== {pillar_name} ====================")
    for fname in p_files:
        if not os.path.exists(fname):
            print(f"File not found: {fname}")
            continue
        
        data, err = fix_json_file(fname)
        if err:
            print(f"ERROR loading {fname}: {err}")
            audits.append({'filepath': fname, 'pillar': pillar_name, 'error': err})
            continue
        
        title = data.get('title') or ''
        if isinstance(title, dict):
            title = title.get('current') or str(title)
        slug = data.get('slug') or ''
        if isinstance(slug, dict):
            slug = slug.get('current') or str(slug)
        desc = data.get('description') or data.get('seo_description') or ''
        if isinstance(desc, dict):
            desc = desc.get('current') or str(desc)
        body = data.get('body') or ''
        if isinstance(body, list):
            body_str = ''
            for block in body:
                if isinstance(block, dict) and block.get('_type') == 'block':
                    children = block.get('children', [])
                    body_str += ' '.join([c.get('text', '') for c in children if isinstance(c, dict)]) + '\n'
                elif isinstance(block, str):
                    body_str += block + '\n'
                else:
                    body_str += str(block) + '\n'
            body = body_str
        elif isinstance(body, dict):
            body = str(body)
            
        title_len = len(title)
        
        # 1. Search Intent Alignment
        t_lower = (str(title) + ' ' + str(slug)).lower()
        if any(k in t_lower for k in ['vs', 'comparison', 'alternative', 'pricing', 'benchmark', 'review', 'best']):
            search_intent = 'Commercial / Comparison'
        elif any(k in t_lower for k in ['buy', 'pricing', 'checkout', 'cost', 'quote']):
            search_intent = 'Transactional'
        else:
            search_intent = 'Technical / Informational'
            
        # 2. CTR & Title Tag Optimization
        title_pass = title_len <= 60
        # Check focus keyword at start (first 3 words)
        words = title.split()
        first_3 = ' '.join(words[:3]).lower() if len(words) >= 3 else title.lower()
        keyword_at_start = any(e.lower() in first_3 for e in ['n8n', 'apollo', 'revops', 'aisdr', 'pinecone', 'qdrant', 'elevenlabs', 'manychat', 'dify', 'monday', 'databox', 'headless', 'adcreative', 'trainual', 'whatconverts', 'waterfall', 'brevo', 'closed-loop', 'turbotic', 'screaming', 'tapstitch', 'cometchat', 'emergent', 'urban', 'accelerated', '5 best'])
        
        # Entities in title
        title_entities = [e for e in KNOWN_ENTITIES if e.lower() in title.lower()]
        
        # 3. Semantic SEO & Entity Density
        body_entities = [e for e in KNOWN_ENTITIES if re.search(r'\b' + re.escape(e) + r'\b', body, re.IGNORECASE)]
        entity_count = len(set(body_entities))
        
        # 4. AEO/GEO Direct Answer Optimization under H2s (134 - 167 words)
        h2_blocks = re.split(r'##\s+', body)
        h2_p1_word_counts = []
        for block in h2_blocks[1:]:
            lines = [l.strip() for l in block.split('\n') if l.strip()]
            if len(lines) > 1:
                # first non-heading paragraph
                p1_text = lines[1]
                # remove Markdown formatting for clean word count
                p1_clean = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', p1_text)
                p1_clean = re.sub(r'[*`_#]', '', p1_clean)
                w_count = len(p1_clean.split())
                h2_p1_word_counts.append(w_count)
        
        aeo_exact_matches = sum(1 for w in h2_p1_word_counts if 134 <= w <= 167)
        tot_h2s = len(h2_p1_word_counts)
        avg_h2_p1_len = sum(h2_p1_word_counts) / tot_h2s if tot_h2s > 0 else 0
        
        # 5. E-E-A-T & Quality Gates
        code_blocks = re.findall(r'```[a-zA-Z0-9]*\n[\s\S]*?```', body)
        has_code = len(code_blocks) > 0
        
        # Schema
        has_schema = bool(data.get('schema') or data.get('schemaMarkup') or data.get('json_ld')) or ('schema.org' in body.lower() or 'blogposting' in body.lower())
        
        audit_record = {
            'filepath': fname,
            'pillar': pillar_name,
            'title': title,
            'title_len': title_len,
            'title_pass': title_pass,
            'keyword_at_start': keyword_at_start,
            'title_entities': title_entities,
            'search_intent': search_intent,
            'entity_count': entity_count,
            'tot_h2s': tot_h2s,
            'aeo_exact_matches': aeo_exact_matches,
            'avg_h2_p1_len': round(avg_h2_p1_len, 1),
            'h2_p1_counts': h2_p1_word_counts,
            'has_code': has_code,
            'code_block_count': len(code_blocks),
            'has_schema': has_schema
        }
        audits.append(audit_record)
        print(f"File: {fname}")
        print(f"  Title ({title_len} chars): '{title}' | Pass <= 60: {title_pass} | Focus KW Start: {keyword_at_start}")
        print(f"  Search Intent: {search_intent} | Entities: {entity_count} | Code Blocks: {len(code_blocks)} | Schema: {has_schema}")
        print(f"  H2 Direct Answer Compliance: {aeo_exact_matches}/{tot_h2s} H2s in 134-167 word sweet spot (Avg H2 P1: {round(avg_h2_p1_len, 1)} words)")

with open('scratch/audit_results.json', 'w', encoding='utf-8') as out:
    json.dump(audits, out, indent=2)

print("\nAudit completed! Saved to scratch/audit_results.json")
