import os
import sys
import json
import urllib.request
import dotenv

dotenv.load_dotenv(".env.local")

url = os.getenv("UPSTASH_REDIS_REST_URL")
token = os.getenv("UPSTASH_REDIS_REST_TOKEN")

if not url or not token:
    print("No Redis credentials found.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {token}"
}

try:
    # Scan keys
    req = urllib.request.Request(f"{url}/keys/*", headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        keys = data.get("result", [])
        print(f"Total Redis keys: {len(keys)}")
        for k in keys[:50]:
            print("Key:", k)
except Exception as e:
    print("Redis error:", e)
