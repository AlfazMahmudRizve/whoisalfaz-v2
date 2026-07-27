import json
import os
import glob

# Inspect Cluster 1 draft JSON files if present, or query Sanity
sanity_env = {}
with open('.env.local', 'r') as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            k, v = line.strip().split('=', 1)
            sanity_env[k] = v.strip('"\'')

import urllib.request

query = '*[_type == "post" && !(_id in path("drafts.**"))]{ "slug": slug.current, title, body }[0..5]'
url = f"https://{sanity_env.get('NEXT_PUBLIC_SANITY_PROJECT_ID')}.api.sanity.io/v2026-05-13/data/query/{sanity_env.get('NEXT_PUBLIC_SANITY_DATASET', 'production')}?query={urllib.parse.quote(query)}"

req = urllib.request.Request(url, headers={"Authorization": f"Bearer {sanity_env.get('SANITY_API_TOKEN')}"})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    for post in data.get('result', []):
        body = post.get('body', '')
        print(f"\n=== POST: {post.get('slug')} ===")
        print(f"Title: {post.get('title')}")
        if isinstance(body, str):
            lines = body.split('\n')
            headings = [l for l in lines if l.startswith('#')]
            print("Headings:")
            for h in headings[:6]:
                print(f"  {h}")
            print("Intro Sample:")
            print(f"  {body[:300]}...")
