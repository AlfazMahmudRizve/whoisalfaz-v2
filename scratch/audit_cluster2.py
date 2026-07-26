import json
import re
import os

files = [f"draft-cluster2-{i:02d}.json" for i in range(1, 21)]

WIKI_ENTITIES = [
    "Qdrant", "Vultr", "Docker", "Docker Compose", "Vector Database", "Pinecone",
    "Dify", "n8n", "RAG", "Retrieval-Augmented Generation", "Python", "FastAPI",
    "JavaScript", "PostgreSQL", "HNSW", "Hierarchical Navigable Small World",
    "Cosine Similarity", "Embedding", "LLM", "Large Language Model", "Kubernetes",
    "Reverse Proxy", "Caddy", "Nginx", "SSL/TLS", "Let's Encrypt", "Tavily",
    "Voyage AI", "BGE", "Graph RAG", "Knowledge Graph", "B2B", "SOP",
    "API", "JSON", "YAML", "Vector Search", "Hybrid Search", "Payload Filtering",
    "Semantic Search", "Latency", "Throughput", "Cloud Computing", "AWS EC2"
]

def body_to_text(body_data):
    if isinstance(body_data, str):
        return body_data
    elif isinstance(body_data, list):
        text_parts = []
        for block in body_data:
            if isinstance(block, str):
                text_parts.append(block)
            elif isinstance(block, dict):
                if block.get('_type') == 'block':
                    children = block.get('children', [])
                    mark_defs = {m.get('_key'): m.get('href', '') for m in block.get('markDefs', []) if isinstance(m, dict)}
                    
                    block_spans = []
                    for c in children:
                        t = c.get('text', '')
                        marks = c.get('marks', [])
                        link_href = None
                        for mk in marks:
                            if mk in mark_defs:
                                link_href = mark_defs[mk]
                                break
                        if link_href:
                            block_spans.append(f"[{t}]({link_href})")
                        else:
                            block_spans.append(t)
                    
                    block_text = "".join(block_spans)
                    style = block.get('style', 'normal')
                    if style.startswith('h'):
                        level = style[1]
                        text_parts.append(f"\n{'#' * int(level)} {block_text}\n")
                    else:
                        text_parts.append(block_text)
                elif block.get('_type') == 'code':
                    text_parts.append(f"\n```{block.get('language', '')}\n{block.get('code', '')}\n```\n")
                else:
                    text_parts.append(str(block))
        return "\n\n".join(text_parts)
    return str(body_data)

def audit_file(filepath):
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    title = data.get('seoTitle') or data.get('title') or ''
    seo_desc = data.get('seoDescription') or data.get('description') or ''
    body = body_to_text(data.get('body') or '')
    slug = data.get('slug') or ''
    affiliates_meta = data.get('affiliates') or []
    
    # 1. Search Intent & Funnel Stage
    lower_title = title.lower()
    if any(k in lower_title for k in ['vs', 'comparison', 'benchmark', 'cost', 'teardown']):
        funnel_stage = "MOFU (Middle of Funnel - Evaluation/Comparison)"
    else:
        funnel_stage = "BOFU (Bottom of Funnel - Implementation SOP/Blueprint)"
    
    intent_score = 20
    
    # 2. CTR & Title Tag Optimization
    title_len = len(title)
    title_len_pass = title_len <= 60
    
    found_entities = [e for e in WIKI_ENTITIES if re.search(r'\b' + re.escape(e) + r'\b', body, re.IGNORECASE)]
    found_entities_unique = list(set(found_entities))
    entity_pass = len(found_entities_unique) >= 3
    
    title_score = 20
    if not title_len_pass: title_score -= 5
    if not entity_pass: title_score -= 5
    
    # 3. Direct AEO/GEO Answer Optimization
    h2_sections = re.split(r'\n(?=##\s)', body)
    aeo_details = []
    out_of_range_count = 0
    total_h2s = 0
    
    for sec in h2_sections:
        if sec.startswith('## '):
            total_h2s += 1
            lines = sec.strip().split('\n')
            h2_heading = lines[0].replace('## ', '').strip()
            para_lines = []
            for line in lines[1:]:
                l = line.strip()
                if l.startswith('#') or l.startswith('```') or l.startswith('-') or l.startswith('1.') or l.startswith('*'):
                    if para_lines:
                        break
                    continue
                if l == '':
                    if para_lines:
                        break
                    continue
                para_lines.append(l)
            para_text = ' '.join(para_lines)
            word_cnt = len(para_text.split())
            is_valid = (134 <= word_cnt <= 167)
            if not is_valid:
                out_of_range_count += 1
            aeo_details.append({
                "h2": h2_heading,
                "word_count": word_cnt,
                "in_target_range": is_valid
            })
            
    aeo_score = 20
    if total_h2s > 0:
        pct_valid = (total_h2s - out_of_range_count) / total_h2s
        aeo_score = round(20 * pct_valid, 1)
        
    # 4. Code & Blueprint Completeness
    code_blocks = re.findall(r'```(\w+)?\n(.*?)```', body, re.DOTALL)
    code_languages = list(set([cb[0] for cb in code_blocks if cb[0]]))
    
    code_score = 20
    if len(code_blocks) == 0:
        code_score = 10
        
    # 5. Affiliate Monetization
    vultr_links = re.findall(r'/go/vultr[^\s\)"\']*', body)
    qdrant_links = re.findall(r'/go/qdrant[^\s\)"\']*', body)
    pinecone_links = re.findall(r'/go/pinecone[^\s\)"\']*', body)
    dify_links = re.findall(r'/go/dify[^\s\)"\']*', body)
    n8n_links = re.findall(r'/go/n8n[^\s\)"\']*', body)
    
    has_300_credit = ("$300" in body) or ("300 credit" in body.lower()) or ("300$" in body) or ("300 dollars" in body.lower())
    
    total_aff_links = len(vultr_links) + len(qdrant_links) + len(pinecone_links) + len(dify_links) + len(n8n_links)
    
    aff_score = 20
    if total_aff_links == 0:
        aff_score = 12
    elif not has_300_credit and len(vultr_links) > 0:
        aff_score = 17
        
    total_score = intent_score + title_score + aeo_score + code_score + aff_score
    
    return {
        "filename": os.path.basename(filepath),
        "title": title,
        "title_len": title_len,
        "funnel_stage": funnel_stage,
        "total_words": len(body.split()),
        "found_entities_count": len(found_entities_unique),
        "found_entities": found_entities_unique,
        "h2_count": total_h2s,
        "aeo_details": aeo_details,
        "aeo_pass_rate": f"{(total_h2s - out_of_range_count)}/{total_h2s}",
        "code_blocks_count": len(code_blocks),
        "code_languages": code_languages,
        "affiliates": {
            "vultr": len(vultr_links),
            "qdrant": len(qdrant_links),
            "pinecone": len(pinecone_links),
            "dify": len(dify_links),
            "n8n": len(n8n_links),
            "has_300_credit": has_300_credit,
            "metadata_affiliates": affiliates_meta
        },
        "scores": {
            "intent": intent_score,
            "title_ctr": title_score,
            "aeo_geo": aeo_score,
            "code_blueprint": code_score,
            "affiliate_monetization": aff_score,
            "final_score": round(total_score, 1)
        }
    }

results = [audit_file(f) for f in files if audit_file(f)]

with open("scratch/cluster2_audit_full.json", "w", encoding="utf-8") as out:
    json.dump(results, out, indent=2)

avg_score = sum(r['scores']['final_score'] for r in results) / len(results)
print(f"Overall Cluster #2 Average SEO Approval Score: {avg_score:.2f} / 100\n")

for r in results:
    s = r['scores']
    print(f"{r['filename']} | Score: {s['final_score']}/100 | Title: {r['title_len']}c | AEO: {r['aeo_pass_rate']} | Code: {r['code_blocks_count']} ({','.join(r['code_languages'])}) | AffLinks: V:{r['affiliates']['vultr']} Q:{r['affiliates']['qdrant']} P:{r['affiliates']['pinecone']} D:{r['affiliates']['dify']} N:{r['affiliates']['n8n']} ($300: {r['affiliates']['has_300_credit']})")
