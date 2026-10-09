import os
import sys
import json
import urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

urls_to_submit = [
    "https://whoisalfaz.me/blog/how-stripe-quietly-takes-more-fees-than-advertised/",
    "https://whoisalfaz.me/blog/",
    "https://whoisalfaz.me/sitemap.xml"
]

key_file_path = "service_account_key.json"
if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    sys.exit(1)

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

try:
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path,
        scopes=["https://www.googleapis.com/auth/indexing"]
    )
    credentials.refresh(Request())
    token = credentials.token

    print(f"Submitting {len(urls_to_submit)} URLs to Google Indexing API...\n")

    for url in urls_to_submit:
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        req = urllib.request.Request(
            ENDPOINT,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}"
            },
            method="POST"
        )
        try:
            with urllib.request.urlopen(req) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                time_notified = result.get("urlNotificationMetadata", {}).get("latestUpdate", {}).get("notifyTime", "OK")
                print(f"✅ {url} -> {time_notified}")
        except Exception as e:
            print(f"❌ {url} -> Error: {e}")

    print("\nGoogle Indexing API submission complete.")

except Exception as e:
    print(f"Authentication/Submission Error: {e}")
