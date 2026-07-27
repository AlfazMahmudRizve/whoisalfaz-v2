import json

with open('draft-unique-18.json', 'r', encoding='utf-8') as f:
    d18 = json.load(f)

extra = """
### Operational Memory Metrics Telemetry

To ensure sliding window memory buffers do not exceed host memory bounds, configure a Prometheus exporter node in n8n to track active conversation session counts, peak token usage per session, and total memory footprint over time.
"""

if isinstance(d18['body'], str):
    d18['body'] += extra

with open('draft-unique-18.json', 'w', encoding='utf-8') as f:
    json.dump(d18, f, indent=2, ensure_ascii=False)

print("Fixed draft 18!")
