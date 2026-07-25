import json

with open('draft-corrective-rag-crag-n8n.json', 'rb') as f:
    raw_bytes = f.read()

body_tag = b'"body": "'
schema_tag = b'",\r\n  "schemaMarkup":'
if schema_tag not in raw_bytes:
    schema_tag = b'",\n  "schemaMarkup":'

b_start = raw_bytes.find(body_tag) + len(body_tag)
b_end = raw_bytes.find(schema_tag)

body_bytes = raw_bytes[b_start:b_end]
clean_body = body_bytes.replace(b'\r\n', b'\\n').replace(b'\n', b'\\n').replace(b'\r', b'\\n')

new_raw = raw_bytes[:b_start] + clean_body + raw_bytes[b_end:]

try:
    data = json.loads(new_raw.decode('utf-8'))
    with open('draft-corrective-rag-crag-n8n.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, indent=2)
    print('Successfully repaired and formatted draft-corrective-rag-crag-n8n.json!')
except Exception as e:
    print('Error parsing repaired JSON:', e)
