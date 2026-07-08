import os
import json
import urllib.request
import urllib.parse
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Define the target URLs to index
urls_to_index = [
    "https://whoisalfaz.me/services/",
    "https://whoisalfaz.me/blog/",
    "https://whoisalfaz.me/portfolio/",
    "https://whoisalfaz.me/about/alfaz-mahmud-rizve/",
    "https://whoisalfaz.me/services/n8n-automation/",
    "https://whoisalfaz.me/services/headless-architecture/",
    "https://whoisalfaz.me/services/growth-consulting/",
    "https://whoisalfaz.me/services/technical-seo/",
    "https://whoisalfaz.me/services/custom-full-stack/",
    "https://whoisalfaz.me/blog/headless-wordpress-vs-monolithic/",
    "https://whoisalfaz.me/blog/headless-wordpress-seo-nextjs-guide/"
]

# Path to the JSON key file downloaded from Google Cloud Service Account
key_file_path = "service_account_key.json"

if not os.path.exists(key_file_path):
    print(f"Error: {key_file_path} not found.")
    print("Please follow the setup steps to create your Google Cloud Service Account and download the key file.")
    exit(1)

# Define Google Indexing API Endpoint
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    print("Authenticating with Google Indexing API...")
    # Load credentials
    credentials = service_account.Credentials.from_service_account_file(
        key_file_path, scopes=SCOPES
    )
    
    # Refresh credentials to get access token
    credentials.refresh(Request())
    access_token = credentials.token
    print("Authentication successful!")

    # Push URLs
    for url in urls_to_index:
        print(f"\nSending indexation request for: {url}...")
        
        # Build payload
        payload = {
            "url": url,
            "type": "URL_UPDATED" # URL_UPDATED triggers crawl of new/updated page
        }
        
        data = json.dumps(payload).encode('utf-8')
        
        # Create request
        req = urllib.request.Request(
            ENDPOINT,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            },
            method="POST"
        )
        
        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                print(f"Success! Google API Response:")
                print(f"  Notify Time: {res_json.get('urlNotificationMetadata', {}).get('latestNotify', {}).get('notifyTime')}")
                print(f"  Type: {res_json.get('urlNotificationMetadata', {}).get('latestNotify', {}).get('type')}")
        except urllib.error.HTTPError as he:
            error_body = he.read().decode('utf-8')
            print(f"API Error ({he.code}): {error_body}")
            
except Exception as e:
    print(f"An unexpected error occurred: {e}")
