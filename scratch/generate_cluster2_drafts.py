import json
import re
import os

def count_words(text):
    words = re.findall(r'\b\w+(?:-\w+)*\b', text)
    return len(words)

def validate_article(article):
    body = article['body']
    total_words = count_words(body)
    print(f"Validation for '{article['_id']}': Total Body Words = {total_words}")
    
    if total_words < 2000:
        raise ValueError(f"Total word count {total_words} is under 2000 words!")

    if "[BOFU]" in article['description'] or "[MOFU]" in article['description']:
        raise ValueError(f"Description in {article['_id']} contains bracket tags!")
        
    if "[BOFU]" in article['seoDescription'] or "[MOFU]" in article['seoDescription']:
        raise ValueError(f"SEO Description in {article['_id']} contains bracket tags!")
        
    if article['date'] != "2026-07-26T21:45:00.000Z":
        raise ValueError(f"Invalid date in {article['_id']}!")

    h2_sections = re.split(r'(## <mark>.*?</mark>)', body)
    if len(h2_sections) < 3:
        raise ValueError("Not enough H2 sections found!")

    for i in range(1, len(h2_sections), 2):
        heading = h2_sections[i]
        content = h2_sections[i+1]
        
        paragraphs = [p.strip() for p in content.strip().split('\n\n') if p.strip()]
        if not paragraphs:
            raise ValueError(f"No answer paragraph found under heading {heading}")
        
        first_p = paragraphs[0]
        p_words = count_words(first_p)
        print(f"  Heading: {heading[:45]}... -> Answer P Words: {p_words}")
        if not (134 <= p_words <= 167):
            raise ValueError(f"Heading '{heading}' first paragraph word count is {p_words}, expected 134-167 words!")

    print(f"✓ '{article['_id']}' passed all checks successfully!\n")

print("Validation script imported.")
