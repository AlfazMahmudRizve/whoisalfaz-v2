import json
import os
import re

files = ["draft-unique-05.json", "draft-unique-06.json", "draft-unique-07.json", "draft-unique-08.json"]
root = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"

for f_name in files:
    path = os.path.join(root, f_name)
    assert os.path.exists(path), f"File missing: {f_name}"
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    assert data["date"] == "2026-07-26T21:45:00.000Z", f"Date mismatch in {f_name}"
    assert "[BOFU]" not in data["description"] and "[MOFU]" not in data["description"], f"Bracket tag found in {f_name}"
    words = len(re.findall(r'\w+', data["body"]))
    assert words >= 2000, f"Word count {words} < 2000 in {f_name}"
    print(f"VERIFIED: {f_name} | Words: {words} | Date: {data['date']} | Title: {data['title']}")

print("ALL VERIFICATIONS PASSED SUCCESSFULLY!")
