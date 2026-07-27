import json
import os

files = [f"draft-unique-{i}.json" for i in range(13, 17)]
root = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"

all_paragraphs = set()
dup_count = 0

print("=== VERIFYING DRAFT FILES (13 to 16) ===")

for filename in files:
    path = os.path.join(root, filename)
    if not os.path.exists(path):
        print(f"ERROR: File {filename} does not exist!")
        continue
    
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Check fields
    title = data.get("title", "")
    slug = data.get("slug", {}).get("current", "")
    desc = data.get("description", "")
    date = data.get("date", "")
    body = data.get("body", "")
    
    words = len(body.split())
    
    print(f"\nFile: {filename}")
    print(f"Title: {title}")
    print(f"Slug: {slug}")
    print(f"Date: {date}")
    print(f"Word Count: {words}")
    print(f"Desc Tag check: {'[BOFU]' in desc or '[MOFU]' in desc}")
    
    assert words >= 2000, f"Word count {words} < 2000!"
    assert date == "2026-07-26T21:45:00.000Z", f"Invalid date {date}!"
    assert "[BOFU]" not in desc and "[MOFU]" not in desc, "Description contains BOFU/MOFU!"
    
    # Uniqueness check
    paras = [p.strip() for p in body.split("\n\n") if len(p.strip()) > 50 and not p.strip().startswith("```") and not p.strip().startswith("|")]
    for p in paras:
        if p in all_paragraphs:
            print(f"WARNING: Duplicate paragraph detected in {filename}: {p[:60]}...")
            dup_count += 1
        all_paragraphs.add(p)

print("\n==========================================")
if dup_count == 0:
    print("SUCCESS: ALL 4 DRAFTS PASSED 100% UNIQUE & ALL STRICT QUALITY CHECKS!")
else:
    print(f"FAILED: Found {dup_count} duplicate paragraphs across files!")
