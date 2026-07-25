import json, re

with open('draft-corrective-rag-crag-n8n.json', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Replace unescaped double quotes inside body text
# Body starts at "body": " and ends before "schemaMarkup":
body_start = text.find('"body": "') + len('"body": "')
schema_start = text.find('",\n  "schemaMarkup":')
if schema_start == -1:
    schema_start = text.find('",\r\n  "schemaMarkup":')

pre = text[:body_start]
post = text[schema_start:]
body_content = text[body_start:schema_start]

# Escape unescaped double quotes inside body_content
# A double quote is unescaped if it is not preceded by a backslash
# But wait, in python re, lookbehind for non-backslash:
clean_body = body_content.replace('\r\n', '\n')

# Let's fix quotes inside JS/JSON code blocks in clean_body
lines = clean_body.split('\n')
new_lines = []
for line in lines:
    # If line has unescaped quotes, escape them
    # Simple strategy: replace unescaped " with \"
    # We can use regex re.sub(r'(?<!\\)"', r'\"', line)
    fixed_line = re.sub(r'(?<!\\)"', r'\"', line)
    new_lines.append(fixed_line)

final_body = '\\n'.join(new_lines)
reconstructed = pre + final_body + post

try:
    data = json.loads(reconstructed)
    with open('draft-corrective-rag-crag-n8n.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, indent=2)
    print("Successfully repaired draft-corrective-rag-crag-n8n.json!")
except Exception as e:
    print("Repair failed:", e)
