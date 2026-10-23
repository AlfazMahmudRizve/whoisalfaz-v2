import json
from analyze_gsc_content_gap import filtered_queries, filtered_pages, query_page_mapping

print(f"Total non-branded queries (>=10 imp): {len(filtered_queries)}")
for i, q in enumerate(filtered_queries):
    pages = query_page_mapping.get(q['key'], [])
    page_urls = [p['page'] for p in pages]
    print(f"{i+1:2d}. {q['key']} | Imp: {q['impressions']} | Clicks: {q['clicks']} | CTR: {q['ctr']}% | Pos: {q['position']:.1f} | Pages: {len(page_urls)}")

print(f"\nTotal pages (>=10 imp): {len(filtered_pages)}")
for i, p in enumerate(filtered_pages):
    print(f"{i+1:2d}. {p['key']} | Imp: {p['impressions']} | Clicks: {p['clicks']} | CTR: {p['ctr']}% | Pos: {p['position']:.1f}")
