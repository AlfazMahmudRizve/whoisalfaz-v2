import urllib.request
import json
import re

with open(r'e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2\.env.local', 'r') as f:
    env = f.read()

pat = re.search(r'GITHUB_PAT\s*=\s*(.+)', env).group(1).strip().strip('"\'')
headers = {'Authorization': f'Bearer {pat}', 'User-Agent': 'Draken-Agent'}

try:
    req = urllib.request.Request('https://api.github.com/repos/Whois-Alfaz/whoisalfazv2/branches', headers=headers)
    with urllib.request.urlopen(req) as resp:
        branches = json.loads(resp.read().decode('utf-8'))
        print(f"Whois-Alfaz/whoisalfazv2 branches ({len(branches)}):")
        for b in branches:
            print(" ", b['name'])
except Exception as e:
    print('Error on Whois-Alfaz/whoisalfazv2:', e)
