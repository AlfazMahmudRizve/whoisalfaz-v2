import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

urls_to_submit = [
    "https://whoisalfaz.me/about/",
    "https://whoisalfaz.me/services/headless-architecture/",
    "https://whoisalfaz.me/blog/category/automation-tools/",
    "https://whoisalfaz.me/contact/",
    "https://whoisalfaz.me/sitemap.xml"
]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("=" * 75)
    print("🚀 Submitting Remediated URLs to Google Indexing API")
    print("=" * 75)
    
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    request = Request()
    credentials.refresh(request)
    token = credentials.token

    success_count = 0
    for url in urls_to_submit:
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(ENDPOINT, data=data, method="POST")
        req.add_header("Content-Type", "application/json; charset=utf-8")
        req.add_header("Authorization", f"Bearer {token}")
        
        try:
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                print(f"✅ [200 OK] {url}")
                success_count += 1
        except urllib.error.HTTPError as e:
            print(f"❌ [HTTP {e.code}] {url}: {e.read().decode('utf-8')}")
        except Exception as e:
            print(f"❌ [ERROR] {url}: {e}")

    print("=" * 75)
    print(f"🎉 Submitted {success_count}/{len(urls_to_submit)} URLs successfully to Google Indexing API.")
    print("=" * 75)

except Exception as e:
    print(f"Fatal error during Google Indexing submission: {e}")
