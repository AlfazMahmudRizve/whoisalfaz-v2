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
external_links = {}

for p in posts:
    body = p.get('body', '')
    text = body if isinstance(body, str) else json.dumps(body)
    found = url_pattern.findall(text)
    for u in found:
        u_clean = u.rstrip('.,;)\'"\\')
        if not u_clean.startswith('https://whoisalfaz.me') and not u_clean.startswith('http://localhost') and not 'qdrant:' in u_clean and not '127.0.0.1' in u_clean and not '10.13.0' in u_clean and not 'dify_api' in u_clean:
            if u_clean not in external_links:
                external_links[u_clean] = 0
            external_links[u_clean] += 1

print(f"Total Unique Public Outbound Links Found: {len(external_links)}")
for el, count in sorted(external_links.items(), key=lambda x: x[1], reverse=True):
    print(f"  [{count} occurrences] {el}")
