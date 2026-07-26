import json
import os

def word_count(text):
    return len(text.strip().split())

def validate_article(data):
    title = data.get("title", "")
    desc = data.get("description", "")
    seo_desc = data.get("seoDescription", "")
    date_str = data.get("date", "")
    pub_date = data.get("publishedAt", "")
    body = data.get("body", "")

    total_words = word_count(body)
    has_bofu_desc = "[BOFU]" in desc or "[MOFU]" in desc or "[" in desc[:5]
    has_bofu_seo = "[BOFU]" in seo_desc or "[MOFU]" in seo_desc or "[" in seo_desc[:5]
    
    valid_dates = (date_str == "2026-07-26T21:45:00.000Z") and (pub_date == "2026-07-26T21:45:00.000Z")

    lines = body.split("\n")
    h2_checks = []
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
                wc = word_count(para)
                is_valid = 134 <= wc <= 167
                h2_checks.append((h2_title, wc, is_valid))
            i = j
        else:
            i += 1

    return {
        "title": title,
        "total_words": total_words,
        "words_valid": total_words >= 2000,
        "clean_desc": not has_bofu_desc and not has_bofu_seo,
        "valid_dates": valid_dates,
        "h2_checks": h2_checks,
        "all_h2_valid": all(c[2] for c in h2_checks) and len(h2_checks) > 0
    }

print("Validator function defined.")
