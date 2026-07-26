import json
import re
import os

def count_words(text):
    # Strip markdown syntax markers lightly if needed, or split on whitespace
    # standard word count counts words separated by whitespace
    words = re.findall(r'\b\w+(?:-\w+)*\b', text)
    return len(words)

def validate_article(article_json):
    body = article_json['body']
    total_words = count_words(body)
    print(f"Article ID: {article_json['_id']} | Total Words: {total_words}")
    
    if total_words < 2000:
        raise ValueError(f"Total word count {total_words} is under 2000 words!")

    if "[BOFU]" in article_json['description'] or "[MOFU]" in article_json['description']:
        raise ValueError("Description contains bracket tags!")
        
    if "[BOFU]" in article_json['seoDescription'] or "[MOFU]" in article_json['seoDescription']:
        raise ValueError("SEO Description contains bracket tags!")
        
    if article_json['date'] != "2026-07-26T21:45:00.000Z":
        raise ValueError("Invalid date!")

    # Check H2 answer paragraphs
    h2_sections = re.split(r'(## <mark>.*?</mark>)', body)
    # h2_sections[0] is preamble before first H2
    # then pairs of (heading, content)
    for i in range(1, len(h2_sections), 2):
        heading = h2_sections[i]
        content = h2_sections[i+1]
        
        # Get first paragraph under H2
        paragraphs = [p.strip() for p in content.strip().split('\n\n') if p.strip()]
        if not paragraphs:
            raise ValueError(f"No answer paragraph found under heading {heading}")
        
        first_p = paragraphs[0]
        # Remove mermaid or code blocks if any accidentally touched, but first p should be text
        p_words = count_words(first_p)
        print(f"Heading: {heading[:40]}... -> Answer P Words: {p_words}")
        if not (134 <= p_words <= 167):
            raise ValueError(f"Heading '{heading}' first paragraph word count is {p_words}, expected 134-167 words!")

    print("VALIDATION SUCCESSFUL!\n")

print("Validation helper ready.")
