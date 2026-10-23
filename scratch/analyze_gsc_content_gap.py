import re
import json

queries_file = r"C:\Users\user\.gemini\antigravity\brain\80eec7d8-c70a-4b75-a6bd-88f5a5ec3db3\.system_generated\steps\7921\output.txt"
pages_file = r"C:\Users\user\.gemini\antigravity\brain\80eec7d8-c70a-4b75-a6bd-88f5a5ec3db3\.system_generated\steps\7923\output.txt"
query_page_file = r"C:\Users\user\.gemini\antigravity\brain\80eec7d8-c70a-4b75-a6bd-88f5a5ec3db3\.system_generated\steps\7925\output.txt"

def parse_table(filepath):
    rows = []
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for line in lines[2:]:
        line = line.strip()
        if not line: continue
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 5:
            key = parts[0]
            try:
                clicks = int(parts[1])
                impressions = int(parts[2])
                ctr_str = parts[3].replace('%', '')
                ctr = float(ctr_str)
                pos = float(parts[4])
                rows.append({
                    'key': key,
                    'clicks': clicks,
                    'impressions': impressions,
                    'ctr': ctr,
                    'position': pos
                })
            except ValueError:
                continue
    return rows

queries_data = parse_table(queries_file)
pages_data = parse_table(pages_file)

# Parse query_page mapping
query_page_mapping = {}
with open(query_page_file, 'r', encoding='utf-8') as f:
    for line in f.readlines()[2:]:
        line = line.strip()
        if not line: continue
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 5:
            key_part = parts[0]
            if ' / ' in key_part:
                q, p = key_part.split(' / ', 1)
                q = q.strip()
                p = p.strip()
                if q not in query_page_mapping:
                    query_page_mapping[q] = []
                query_page_mapping[q].append({
                    'page': p,
                    'clicks': int(parts[1]),
                    'impressions': int(parts[2]),
                    'ctr': float(parts[3].replace('%', '')),
                    'position': float(parts[4])
                })

# Filter out branded and <10 impressions
def is_branded(q):
    ql = q.lower()
    return 'alfaz' in ql or 'whoisalfaz' in ql

filtered_queries = [
    q for q in queries_data 
    if q['impressions'] >= 10 and not is_branded(q['key'])
]

# Sort by impressions desc
filtered_queries.sort(key=lambda x: x['impressions'], reverse=True)

print(f"Total non-branded queries with >=10 impressions: {len(filtered_queries)}\n")

for q in filtered_queries:
    pages = query_page_mapping.get(q['key'], [])
    page_urls = [p['page'] for p in pages]
    print(f"Query: {q['key']}")
    print(f"  Impressions: {q['impressions']}, Clicks: {q['clicks']}, CTR: {q['ctr']}%, Pos: {q['position']}")
    print(f"  Pages: {page_urls}")
    print()

# Analyze Pages
print("\n" + "="*50 + "\nTOP PAGES (>=10 impressions):\n" + "="*50)
filtered_pages = [p for p in pages_data if p['impressions'] >= 10 and not is_branded(p['key'])]
filtered_pages.sort(key=lambda x: x['impressions'], reverse=True)
for p in filtered_pages:
    print(f"Page: {p['key']}")
    print(f"  Impressions: {p['impressions']}, Clicks: {p['clicks']}, CTR: {p['ctr']}%, Pos: {p['position']}")
    print()
