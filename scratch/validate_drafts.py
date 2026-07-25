import json
import re
import sys

# Ensure UTF-8 output encoding for Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

def count_words(text):
    clean_text = re.sub(r'[\*\_\`\#\[\]\(\)\<\>]', ' ', text)
    words = clean_text.split()
    return len(words)

def validate_draft(filepath):
    print(f"\n--- Validating {filepath} ---")
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    title = data.get("title", "")
    print(f"Title ({len(title)} chars): {title}")
    if len(title) > 60:
        print(f"  ❌ ERROR: Title length is {len(title)} chars (must be <= 60)")
    else:
        print("  ✅ Title length OK")
        
    seo_desc = data.get("seoDescription", "")
    print(f"SEO Description ({len(seo_desc)} chars): {seo_desc}")
    if not (120 <= len(seo_desc) <= 160):
        print(f"  ❌ ERROR: Meta description length is {len(seo_desc)} chars (must be 120-160)")
    else:
        print("  ✅ Meta description length OK")

    body = data.get("body", "")
    
    # Check code blocks
    has_json_code = "```json" in body
    has_js_code = "```javascript" in body or "```js" in body
    print(f"JSON Blueprint Code Block: {'✅ YES' if has_json_code else '❌ NO'}")
    print(f"JS Code Block: {'✅ YES' if has_js_code else '❌ NO'}")
    
    # Check H2 headings and first paragraphs
    lines = body.splitlines()
    h2_indices = []
    for idx, line in enumerate(lines):
        if line.strip().startswith("## "):
            h2_indices.append(idx)
            
    print(f"Found {len(h2_indices)} H2 headings.")
    
    errors = 0
    for i, h2_idx in enumerate(h2_indices):
        h2_title = lines[h2_idx].strip()
        p_lines = []
        in_p = False
        for j in range(h2_idx + 1, len(lines)):
            line = lines[j].strip()
            if line.startswith("## ") or line.startswith("# ") or line.startswith("### "):
                break
            if not in_p:
                if line != "" and not line.startswith("<img") and not line.startswith("```") and not line.startswith("*") and not line.startswith("-") and not line.startswith("<table") and not line.startswith("<!--"):
                    in_p = True
                    p_lines.append(line)
            else:
                if line == "" or line.startswith("<img") or line.startswith("```") or line.startswith("*") or line.startswith("-") or line.startswith("### ") or line.startswith("<table") or line.startswith("<!--"):
                    break
                p_lines.append(line)
                
        first_p = " ".join(p_lines)
        w_count = count_words(first_p)
        print(f"H2 #{i+1}: {h2_title[:45]}... -> First paragraph word count: {w_count}")
        if not (134 <= w_count <= 167):
            print(f"  ❌ ERROR: Paragraph word count is {w_count} (must be 134-167)")
            print(f"  Snippet ({w_count} words): {first_p[:100]}...")
            errors += 1
        else:
            print("  ✅ First paragraph word count OK")

    if errors > 0:
        print(f"FAILED validation with {errors} errors.")
        sys.exit(1)
    else:
        print("ALL QUALITY RULES PASSED! Perfect draft!")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for path in sys.argv[1:]:
            validate_draft(path)
