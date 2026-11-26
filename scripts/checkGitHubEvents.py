import urllib.request
import json
import re

with open(r'e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2\.env.local', 'r') as f:
    env = f.read()

pat = re.search(r'GITHUB_PAT\s*=\s*(.+)', env).group(1).strip().strip('"\'')
headers = {'Authorization': f'Bearer {pat}', 'User-Agent': 'Draken-Agent'}

req = urllib.request.Request('https://api.github.com/notifications?all=true&per_page=10', headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        notifs = json.loads(resp.read().decode('utf-8'))
        print(f"Notifications count: {len(notifs)}")
        for n in notifs:
            print(f"[{n['updated_at']}] {n['reason']}: {n['subject']['title']} ({n['repository']['full_name']})")
except Exception as e:
    print('Error:', e)
