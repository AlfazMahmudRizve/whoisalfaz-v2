import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')


def validate_draft(file_path):
    print(f"--- Validating {file_path} ---")
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Title check
    title = data.get("title", "")
    print(f"Title ({len(title)} chars): '{title}'")
    if len(title) > 60:
        print(f"❌ FAIL: Title exceeds 60 chars ({len(title)})")
    else:
        print("✅ PASS: Title length <= 60 chars")

    # 2. Meta description check
    meta = data.get("seoDescription", "")
    print(f"Meta Description ({len(meta)} chars): '{meta}'")
    if not (120 <= len(meta) <= 160):
        print(f"❌ FAIL: Meta description length must be 120-160 chars (got {len(meta)})")
    else:
        print("✅ PASS: Meta description length 120-160 chars")

    # 3. H2 direct answer paragraph check
    body = data.get("body", "")
    # Find all H2 headings with <mark>
    h2_sections = re.split(r'## <mark>.*?</mark>', body)
    headings = re.findall(r'## <mark>(.*?)</mark>', body)
    
    print(f"Found {len(headings)} H2 headings.")
    
    for idx, (heading, text) in enumerate(zip(headings, h2_sections[1:]), 1):
        # Extract first paragraph after heading
        paragraphs = [p.strip() for p in text.strip().split('\n\n') if p.strip()]
        if not paragraphs:
            print(f"❌ FAIL: No text under H2 #{idx}: {heading}")
            continue
        
        first_para = paragraphs[0]
        # Clean markdown formatting for word count (strip *, [, ], `, etc.)
        clean_text = re.sub(r'[*_#`>\[\]\(\)]', '', first_para)
        words = clean_text.split()
        word_count = len(words)
        print(f"H2 #{idx} ('{heading[:30]}...'): First paragraph word count = {word_count}")
        if not (134 <= word_count <= 167):
            print(f"❌ FAIL: H2 #{idx} first paragraph word count ({word_count}) not between 134 and 167 words!")
            print(f"Paragraph snippet: {first_para[:100]}...")
        else:
            print(f"✅ PASS: H2 #{idx} word count {word_count} within 134-167 range")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        validate_draft(sys.argv[1])
