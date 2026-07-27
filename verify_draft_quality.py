import json
import os
import re

def count_words(text):
    return len(text.strip().split())

def check_h2_paragraphs(body):
    lines = body.split('\n')
    results = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("## "):
            h2_title = line
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines):
                para = lines[j].strip()
                wc = count_words(para)
                results.append((h2_title, wc, 134 <= wc <= 167))
            i = j
        else:
            i += 1
    return results

files = [
    "draft-unique-01.json",
    "draft-unique-02.json",
    "draft-unique-03.json",
    "draft-unique-04.json"
]

all_passed = True
paragraphs_seen = set()

print("=== STARTING DRAFT QUALITY VERIFICATION ===\n")

for fname in files:
    if not os.path.exists(fname):
        print(f"[-] ERROR: File {fname} does not exist.")
        all_passed = False
        continue

    with open(fname, "r", encoding="utf-8") as f:
        data = json.load(f)

    title = data.get("title", "")
    desc = data.get("description", "")
    seo_desc = data.get("seoDescription", "")
    date_str = data.get("date", "")
    pub_date = data.get("publishedAt", "")
    body = data.get("body", "")

    wc = count_words(body)
    words_valid = wc >= 2000

    clean_desc = not ("[BOFU]" in desc or "[MOFU]" in desc or "[" in desc[:5])
    clean_seo_desc = not ("[BOFU]" in seo_desc or "[MOFU]" in seo_desc or "[" in seo_desc[:5])

    valid_dates = (date_str == "2026-07-26T21:45:00.000Z") and (pub_date == "2026-07-26T21:45:00.000Z")

    h2_checks = check_h2_paragraphs(body)
    h2_valid = all(c[2] for c in h2_checks) and len(h2_checks) > 0

    # Uniqueness check (check paragraphs > 20 words for duplication across files)
    paras = [p.strip() for p in body.split("\n\n") if len(p.strip().split()) > 20 and not p.strip().startswith("```") and not p.strip().startswith("#")]
    file_unique = True
    for p in paras:
        if p in paragraphs_seen:
            print(f"[-] DUPLICATE PARAGRAPH DETECTED in {fname}: {p[:60]}...")
            file_unique = False
            all_passed = False
        else:
            paragraphs_seen.add(p)

    print(f"File: {fname}")
    print(f"  Title: '{title}'")
    print(f"  Word Count: {wc} (>= 2000: {words_valid})")
    print(f"  Clean Description: {clean_desc and clean_seo_desc}")
    print(f"  Valid Dates (2026-07-26T21:45:00.000Z): {valid_dates}")
    print(f"  All H2 Paragraphs Valid (134-167 words): {h2_valid} ({len(h2_checks)} H2s checked)")
    print(f"  Uniqueness: {file_unique}")
    
    if not (words_valid and clean_desc and clean_seo_desc and valid_dates and h2_valid and file_unique):
        all_passed = False
        for title_h2, count_h2, is_v in h2_checks:
            if not is_v:
                print(f"    [-] Failed H2: {title_h2} -> {count_h2} words")
    print()

if all_passed:
    print("=== FINAL RESULT: ALL 4 DRAFTS PASSED 100% VERIFICATION ===")
else:
    print("=== FINAL RESULT: VERIFICATION FAILED FOR SOME DRAFTS ===")
