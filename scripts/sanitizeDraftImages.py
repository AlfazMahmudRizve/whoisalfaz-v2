import json
import os
import sys
import glob

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
draft_files = glob.glob(os.path.join(root_dir, "draft-cluster2-*.json"))

print(f"Sanitizing {len(draft_files)} draft JSON files to remove non-existent image references...\n")

for filepath in draft_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        if "image" in data:
            del data["image"]
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"  Sanitized: {os.path.basename(filepath)}")
    except Exception as e:
        print(f"  Error reading {os.path.basename(filepath)}: {e}")

print("\nSanitization complete! All draft files are ready for Sanity ingestion.")
