import json
import os
import re

base_dir = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"

# Import expansions from build_expansions
from build_expansions import expansions, count_words, clean_boilerplate

files = [
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

results = []

for fname in files:
    filePath = os.path.join(base_dir, fname)
    if not os.path.exists(filePath):
        print(f"Error: File {fname} not found!")
        continue
    
    with open(filePath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    orig_body = data.get('body', '')
    orig_word_count = count_words(orig_body)
    
    cleaned_body = clean_boilerplate(orig_body)
    
    expansion_content = expansions.get(fname, '')
    
    new_body = cleaned_body + "\n" + expansion_content.strip() + "\n"
    new_word_count = count_words(new_body)
    
    data['body'] = new_body
    
    with open(filePath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    status = "PASSED" if new_word_count >= 2000 else "FAILED"
    results.append({
        'file': fname,
        'original_words': orig_word_count,
        'new_words': new_word_count,
        'status': status
    })
    print(f"[{status}] {fname}: {orig_word_count} -> {new_word_count} words")

print("\n--- Summary ---")
all_passed = all(r['status'] == 'PASSED' for r in results)
print(f"All 12 files >= 2,000 words: {all_passed}")
