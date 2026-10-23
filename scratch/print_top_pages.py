from analyze_gsc_content_gap import pages_data

print("=== TOP 30 PAGES BY IMPRESSIONS ===")
valid_pages = [p for p in pages_data if p['impressions'] >= 10]
valid_pages.sort(key=lambda x: x['impressions'], reverse=True)
for i in range(min(30, len(valid_pages))):
    p = valid_pages[i]
    print(f"{i+1:2d}. {p['key']} | Imp: {p['impressions']} | Clicks: {p['clicks']} | CTR: {p['ctr']}% | Pos: {p['position']:.1f}")
