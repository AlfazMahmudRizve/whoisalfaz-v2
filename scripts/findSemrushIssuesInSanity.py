import json
import os
import urllib.request
import urllib.parse

sanity_env = {}
with open('.env.local', 'r') as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            k, v = line.strip().split('=', 1)
            sanity_env[k] = v.strip('"\'')

query = '*[_type == "post"]{ "slug": slug.current, title, body }'
url = f"https://{sanity_env.get('NEXT_PUBLIC_SANITY_PROJECT_ID')}.api.sanity.io/v2026-05-13/data/query/{sanity_env.get('NEXT_PUBLIC_SANITY_DATASET', 'production')}?query={urllib.parse.quote(query)}"

req = urllib.request.Request(url, headers={"Authorization": f"Bearer {sanity_env.get('SANITY_API_TOKEN')}"})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    posts = data.get('result', [])

print(f"Total posts checked in Sanity: {len(posts)}")

matches = []
for p in posts:
    body = p.get('body', '')
    if isinstance(body, str):
        text = body
    else:
        text = json.dumps(body)

    for target in ['abu-testimonial', 'capture-n8n-lead-data', 'automated-facebook-leads-n8n', '-from-wordpress-elementor']:
        if target in text:
            matches.append({
                "slug": p.get('slug'),
                "title": p.get('title'),
                "matched_target": target
            })

print("\n--- MATCHES FOUND IN SANITY POSTS ---")
print(json.dumps(matches, indent=2))
