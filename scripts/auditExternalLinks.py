import json
import urllib.request
import urllib.parse
import re

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

url_pattern = re.compile(r'https?://[^\s\)\]"]+')
external_links = set()

for p in posts:
    body = p.get('body', '')
    text = body if isinstance(body, str) else json.dumps(body)
    found = url_pattern.findall(text)
    for u in found:
        if not u.startswith('https://whoisalfaz.me') and not u.startswith('http://localhost'):
            # Clean trailing punctuation
            u_clean = u.rstrip('.,;)')
            external_links.add(u_clean)

print(f"Total Unique External Links Found in Sanity Posts: {len(external_links)}")
for el in sorted(list(external_links))[:20]:
    print("  -", el)
