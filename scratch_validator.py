import json
import os

def count_words(text):
    return len(text.strip().split())

def verify_h2_paragraphs(body_text):
    lines = body_text.split('\n')
    h2_results = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith('## '):
            h2_title = line
            # Find next non-empty line
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines):
                para = lines[j].strip()
                wc = count_words(para)
                h2_results.append((h2_title, wc, 134 <= wc <= 167, para[:60] + "..."))
            i = j
        else:
            i += 1
    return h2_results

print("Helper loaded successfully.")
