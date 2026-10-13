import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

if len(sys.argv) < 2:
    print("Usage: python scripts/submitUrlToGoogleIndexing.py <url1> [url2 ...]")
    sys.exit(1)

urls = sys.argv[1:]
key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    credentials.refresh(Request())
    access_token = credentials.token

    for url in urls:
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            ENDPOINT,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            }
        )
        try:
            with urllib.request.urlopen(req) as resp:
                res_body = resp.read().decode("utf-8")
                print(f"✅ Submitted to Google Indexing: {url} -> {resp.status}")
        except Exception as e:
            print(f"❌ Failed to submit {url}: {e}")

except Exception as e:
    print(f"Error authenticating: {e}")
