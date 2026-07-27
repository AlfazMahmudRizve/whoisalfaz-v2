import json
import urllib.request
import urllib.parse

# 1. Update draft-unique-13.json
with open('draft-unique-13.json', 'r', encoding='utf-8') as f:
    content = f.read()

cleaned_content = content.replace('SecureRedisPass2026!VultrGPU', '<YOUR_REDIS_PASSWORD>')
cleaned_content = cleaned_content.replace('DifyRedisPass2026!', '<YOUR_REDIS_PASSWORD>')
cleaned_content = cleaned_content.replace('DifyPostgresPass2026!', '<YOUR_POSTGRES_PASSWORD>')

with open('draft-unique-13.json', 'w', encoding='utf-8') as f:
    f.write(cleaned_content)

print("[1/2] Patched draft-unique-13.json")

# 2. Update Sanity CMS post document
sanity_env = {}
with open('.env.local', 'r') as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            k, v = line.strip().split('=', 1)
            sanity_env[k] = v.strip('"\'')

post_id = 'dify-ai-vultr-gpu-docker-deployment-guide'
url = f"https://{sanity_env.get('NEXT_PUBLIC_SANITY_PROJECT_ID')}.api.sanity.io/v2026-05-13/data/mutate/{sanity_env.get('NEXT_PUBLIC_SANITY_DATASET', 'production')}"

mutations = {
    "mutations": [
        {
            "patch": {
                "id": post_id,
                "set": {
                    "body": json.loads(cleaned_content)["body"]
                }
            }
        }
    ]
}

req = urllib.request.Request(
    url,
    data=json.dumps(mutations).encode('utf-8'),
    headers={
        "Authorization": f"Bearer {sanity_env.get('SANITY_API_TOKEN')}",
        "Content-Type": "application/json"
    },
    method="POST"
)

with urllib.request.urlopen(req) as resp:
    print("[2/2] Sanity CMS document patched cleanly!")
