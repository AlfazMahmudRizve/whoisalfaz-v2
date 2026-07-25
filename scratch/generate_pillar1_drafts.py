import json
import re
import os

def count_words(text):
    # Remove HTML tags or Markdown formatting symbols for clean word counting
    clean_text = re.sub(r'<[^>]+>', '', text)
    clean_text = re.sub(r'[*_`#>\[\]]', ' ', clean_text)
    words = clean_text.strip().split()
    return len(words)

def validate_post(post):
    title = post["title"]
    seo_desc = post["seoDescription"]
    body = post["body"]

    # 1. H1 title checks
    if len(title) > 60:
        raise ValueError(f"Title length exceeds 60 chars ({len(title)}): {title}")
    
    # 2. Meta description checks
    if len(seo_desc) < 120 or len(seo_desc) > 160:
        raise ValueError(f"SEO Description length out of range [120-160] ({len(seo_desc)}): {seo_desc}")

    # 3. H2 Heading first paragraph word count check (134 to 167 words)
    # Find all H2 headings and extract the first paragraph after each H2
    h2_sections = re.split(r'\n(?=## )', body)
    for section in h2_sections:
        if section.startswith('## '):
            lines = section.strip().split('\n')
            heading = lines[0]
            # Skip FAQ heading if it has no explanatory paragraph or standard Q&A format
            if "Frequently Asked Questions" in heading:
                continue
            
            # Find the first non-empty paragraph after heading
            body_lines = lines[1:]
            first_para = ""
            for line in body_lines:
                line_str = line.strip()
                if line_str and not line_str.startswith('#') and not line_str.startswith('```') and not line_str.startswith('>') and not line_str.startswith('*') and not line_str.startswith('|') and not line_str.startswith('<table'):
                    first_para = line_str
                    break
            
            wc = count_words(first_para)
            if wc < 134 or wc > 167:
                raise ValueError(f"First paragraph under '{heading}' has {wc} words (must be 134-167 words).\nParagraph snippet: {first_para[:100]}...")

    print(f"✅ PASSED validation: {title}")

print("Validator ready.")
