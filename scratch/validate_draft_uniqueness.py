import json
import os
import re

workspace_root = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"
filenames = [
  "draft-unique-17.json",
  "draft-unique-18.json",
  "draft-unique-19.json",
  "draft-unique-20.json"
]

all_bodies = {}
paragraphs_seen = {}
errors = []

for fname in filenames:
  fpath = os.path.join(workspace_root, fname)
  if not os.path.exists(fpath):
    errors.append(f"File missing: {fname}")
    continue
  
  with open(fpath, "r", encoding="utf-8") as f:
    data = json.load(f)

  # Validate required fields
  required_keys = ["_id", "_type", "title", "slug", "description", "date", "seoTitle", "seoDescription", "categories", "affiliates", "body"]
  for k in required_keys:
    if k not in data:
      errors.append(f"{fname}: missing key '{k}'")

  # Validate date
  if data.get("date") != "2026-07-26T21:45:00.000Z":
    errors.append(f"{fname}: date is '{data.get('date')}', expected '2026-07-26T21:45:00.000Z'")

  # Validate clean description (no [BOFU] or [MOFU])
  desc = data.get("description", "")
  seo_desc = data.get("seoDescription", "")
  if "[BOFU]" in desc or "[MOFU]" in desc or "[TOFU]" in desc:
    errors.append(f"{fname}: description contains bracket tag")
  if "[BOFU]" in seo_desc or "[MOFU]" in seo_desc or "[TOFU]" in seo_desc:
    errors.append(f"{fname}: seoDescription contains bracket tag")

  # Validate word count
  body = data.get("body", "")
  words = re.findall(r'\b\w+\b', body)
  word_count = len(words)
  print(f"{fname} word count: {word_count}")
  if word_count < 2000:
    errors.append(f"{fname}: word count is {word_count}, which is less than 2000!")

  all_bodies[fname] = body

  # Check unique paragraphs (> 50 chars)
  paras = [p.strip() for p in body.split("\n\n") if len(p.strip()) > 50 and not p.strip().startswith("```") and not p.strip().startswith("<table")]
  for p in paras:
    if p in paragraphs_seen:
      errors.append(f"Duplicate paragraph found between {paragraphs_seen[p]} and {fname}: '{p[:60]}...'")
    else:
      paragraphs_seen[p] = fname

if errors:
  print("VALIDATION ERRORS FOUND:")
  for err in errors:
    print(f" - {err}")
else:
  print("ALL DRAFT FILES VALIDATED SUCCESSFULLY WITH 100% UNIQUE CONTENT AND WORD COUNT >= 2000!")
