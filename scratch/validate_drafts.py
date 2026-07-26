import json
import re
import os

def count_words(text):
    clean_text = re.sub(r'<[^>]+>', '', text)
    words = re.findall(r'\b[\w\'-]+\b', clean_text)
    return len(words)

def validate_article(draft_data, draft_num):
    print(f"\n--- Validating Draft Cluster2-{draft_num} ---")
    body = draft_data.get("body", "")
    total_words = count_words(body)
    print(f"Total Body Word Count: {total_words}")
    
    if total_words < 2000:
        print(f"[FAIL] Total word count is {total_words}, which is < 2000!")
    else:
        print(f"[PASS] Total word count >= 2000 ({total_words} words).")
        
    desc = draft_data.get("description", "")
    seo_desc = draft_data.get("seoDescription", "")
    if re.search(r'\[.*?\]', desc) or re.search(r'\[.*?\]', seo_desc):
        print(f"[FAIL] Description contains bracket tags! Desc: {desc}")
    else:
        print(f"[PASS] Description is clean.")
        
    date_val = draft_data.get("date", "")
    pub_val = draft_data.get("publishedAt", "")
    if date_val != "2026-07-26T21:45:00.000Z":
        print(f"[FAIL] Date is {date_val}, expected '2026-07-26T21:45:00.000Z'")
    else:
        print(f"[PASS] Date is correct.")

    h2_sections = re.split(r'\n##\s+<mark>.*?</mark>|\n##\s+.*?\n', body)
    h2_titles = re.findall(r'##\s+<mark>(.*?)</mark>|##\s+(.*?)\n', body)
    
    print(f"Found {len(h2_titles)} H2 sections.")
    
    all_h2_pass = True
    for idx, sec in enumerate(h2_sections[1:]):
        h2_title = h2_titles[idx][0] if h2_titles[idx][0] else h2_titles[idx][1]
        lines = sec.strip().split('\n')
        para_lines = []
        for line in lines:
            line_str = line.strip()
            if not line_str:
                if para_lines:
                    break
                continue
            if line_str.startswith('```') or line_str.startswith('⚡') or line_str.startswith('|-') or line_str.startswith('|'):
                if para_lines:
                    break
                continue
            para_lines.append(line_str)
        
        first_para = " ".join(para_lines)
        w_count = count_words(first_para)
        if 134 <= w_count <= 167:
            print(f"  [PASS] H2 [{idx+1}]: '{h2_title[:40]}...' -> First Para Word Count = {w_count}")
        else:
            all_h2_pass = False
            print(f"  [FAIL] H2 [{idx+1}]: '{h2_title[:40]}...' -> First Para Word Count = {w_count} (MUST BE 134-167!)")
    
    if all_h2_pass and total_words >= 2000:
        print(f"===> Draft Cluster2-{draft_num} SUCCESSFUL VALIDATION <===")

print("Validator ready.")
