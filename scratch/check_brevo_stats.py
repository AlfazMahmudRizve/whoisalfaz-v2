import os
import sys
import json
import urllib.request
import dotenv

dotenv.load_dotenv(".env.local")

api_key = os.getenv("BREVO_API_KEY")
if not api_key:
    print("No BREVO_API_KEY found.")
    sys.exit(1)

headers = {
    "api-key": api_key,
    "Content-Type": "application/json"
}

# 1. Query Brevo Account Info
try:
    req = urllib.request.Request("https://api.brevo.com/v3/account", headers=headers)
    with urllib.request.urlopen(req) as resp:
        account_data = json.loads(resp.read().decode('utf-8'))
        print("Brevo Account Email:", account_data.get("email"))
        print("Plan:", account_data.get("plan"))
except Exception as e:
    print("Brevo account error:", e)

# 2. Query Brevo Contacts (filter or list recent)
try:
    req = urllib.request.Request("https://api.brevo.com/v3/contacts?limit=50&sort=desc", headers=headers)
    with urllib.request.urlopen(req) as resp:
        contacts_data = json.loads(resp.read().decode('utf-8'))
        contacts = contacts_data.get("contacts", [])
        print(f"Total contacts retrieved: {len(contacts)} (out of {contacts_data.get('count', 0)})")
        
        summit_buyers = []
        for c in contacts:
            attrs = c.get("attributes", {})
            if attrs.get("MANYCHAT_SUMMIT_BUYER") or attrs.get("MANYCHAT_ORDER_ID"):
                summit_buyers.append(c)
        
        print(f"Summit Buyers found in CRM: {len(summit_buyers)}")
        for b in summit_buyers:
            print(" -", b.get("email"), b.get("attributes"))
except Exception as e:
    print("Brevo contacts error:", e)

# 3. Query Transactional Email Stats
try:
    req = urllib.request.Request("https://api.brevo.com/v3/smtp/statistics/reports?limit=10", headers=headers)
    with urllib.request.urlopen(req) as resp:
        stats_data = json.loads(resp.read().decode('utf-8'))
        print("Transactional Email Reports:", json.dumps(stats_data, indent=2))
except Exception as e:
    print("Transactional stats error:", e)
