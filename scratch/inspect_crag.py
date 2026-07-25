import json

with open('draft-corrective-rag-crag-n8n.json', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's inspect text around char 6300 to 6350
print("Context around 6325:")
print(repr(text[6300:6350]))
