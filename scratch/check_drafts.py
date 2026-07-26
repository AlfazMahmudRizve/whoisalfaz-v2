import json
import re
import os

def count_words(text):
    return len(re.findall(r'\b\w+\b', text))

def check_draft(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    body = data['body']
    total_words = count_words(body)
    
    sections = re.split(r'\n##\s+', body)
    h2_stats = []
    for idx, sec in enumerate(sections[1:], 1):
        lines = sec.strip().split('\n')
        h2_title = lines[0]
        # First paragraph immediately following H2
        para_lines = []
        for line in lines[1:]:
            line_s = line.strip()
            if not line_s:
                if para_lines:
                    break
                continue
            if line_s.startswith('<table') or line_s.startswith('```') or line_s.startswith('---') or line_s.startswith('#'):
                if para_lines:
                    break
                else:
                    continue
            para_lines.append(line_s)
        para_text = " ".join(para_lines)
        w_count = count_words(para_text)
        h2_stats.append((idx, h2_title[:40], w_count, 134 <= w_count <= 167))

    print(f"=== {os.path.basename(filepath)} ===")
    print(f"Total Body Words: {total_words} (Pass >= 2000: {total_words >= 2000})")
    print(f"Description Clean: {'[BOFU]' not in data['description'] and '[MOFU]' not in data['description']}")
    print(f"Date Valid: {data['date'] == '2026-07-26T21:45:00.000Z'}")
    print("H2 Direct Answer Paragraphs:")
    for idx, title, wc, valid in h2_stats:
        status = "OK" if valid else f"FAIL ({wc} w)"
        print(f"  H2 #{idx} [{status}]: {wc} words | {title}")
    print()

if __name__ == '__main__':
    for i in range(5, 9):
        fn = f"draft-cluster2-0{i}.json"
        if os.path.exists(fn):
            check_draft(fn)
