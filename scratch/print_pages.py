from analyze_gsc_content_gap import pages_data

print("=== ALL PAGES WITH >=10 IMPRESSIONS ===")
valid_pages = [p for p in pages_data if p['impressions'] >= 10]
valid_pages.sort(key=lambda x: x['impressions'], reverse=True)
print(f"Total valid pages: {len(valid_pages)}")
for i, p in enumerate(valid_pages):
    print(f"{i+1:2d}. {p['key']} | Imp: {p['impressions']} | Clicks: {p['clicks']} | CTR: {p['ctr']}% | Pos: {p['position']:.1f}")
