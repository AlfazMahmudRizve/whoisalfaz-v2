from analyze_gsc_content_gap import filtered_queries

print("=== TOP 25 QUERIES BY IMPRESSIONS ===")
for i in range(min(25, len(filtered_queries))):
    q = filtered_queries[i]
    print(f"{i+1:2d}. {q['key']} | Imp: {q['impressions']} | Clicks: {q['clicks']} | CTR: {q['ctr']}% | Pos: {q['position']:.1f}")
