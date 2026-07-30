import json
import os
import re

print("Starting Phase 1 Execution...")

# 1. draft-adcreative-ai-n8n-ad-refresh.json
file1 = "draft-adcreative-ai-n8n-ad-refresh.json"
if os.path.exists(file1):
    with open(file1, "r", encoding="utf-8") as f:
        content = f.read()
    content_fixed = content.replace('"brand_id":', '\\"brand_id\\":')
    try:
        json.loads(content_fixed)
        with open(file1, "w", encoding="utf-8") as f:
            f.write(content_fixed)
        print(f"[FIXED] {file1}")
    except Exception as e:
        print(f"[ERROR] {file1}: {e}")

# 2. draft-emergent-ai-autonomous-gtm-guide.json
file2 = "draft-emergent-ai-autonomous-gtm-guide.json"
if os.path.exists(file2):
    with open(file2, "r", encoding="utf-8") as f:
        content = f.read()
    content_fixed = content.replace('"icp_criteria":', '\\"icp_criteria\\":')
    try:
        json.loads(content_fixed)
        with open(file2, "w", encoding="utf-8") as f:
            f.write(content_fixed)
        print(f"[FIXED] {file2}")
    except Exception as e:
        print(f"[ERROR] {file2}: {e}")

# 3. draft-manychat-n8n-whatsapp-voice-bot.json
file3 = "draft-manychat-n8n-whatsapp-voice-bot.json"
if os.path.exists(file3):
    with open(file3, "r", encoding="utf-8") as f:
        data = json.load(f)
    body = data.get("body", "")
    if "$env['ELEVENLABS_API_KEY']" in body:
        body_fixed = body.replace("$env['ELEVENLABS_API_KEY']", "process.env.ELEVENLABS_API_KEY")
        data["body"] = body_fixed
        with open(file3, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"[FIXED] {file3}")
    else:
        print(f"[CHECKED] {file3} clean")

# 4. draft-cluster2-19-high-throughput-batch-vector-ingestion-n8n-qdrant.json
file4 = "draft-cluster2-19-high-throughput-batch-vector-ingestion-n8n-qdrant.json"
if os.path.exists(file4):
    with open(file4, "r", encoding="utf-8") as f:
        data = json.load(f)
    body = data.get("body", "")
    if "return output || batchedOutputs;" in body:
        body_fixed = body.replace("return output || batchedOutputs;", "return batchedOutputs;")
        data["body"] = body_fixed
        with open(file4, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"[FIXED] {file4}")
    else:
        print(f"[CHECKED] {file4} clean")

# 5. draft-cluster2-15-semantic-search-api-n8n-qdrant-fastapi-bridge.json
file5 = "draft-cluster2-15-semantic-search-api-n8n-qdrant-fastapi-bridge.json"
if os.path.exists(file5):
    with open(file5, "r", encoding="utf-8") as f:
        data = json.load(f)
    body = data.get("body", "")
    if "[FastAPI](/go/dify)" in body:
        body_fixed = body.replace("[FastAPI](/go/dify)", "[FastAPI](/go/fastapi)")
        data["body"] = body_fixed
        with open(file5, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"[FIXED] {file5}")
    else:
        print(f"[CHECKED] {file5} clean")

# 6. draft-cluster2-11-building-an-enterprise-knowledge-graph-rag-n8n.json
file6 = "draft-cluster2-11-building-an-enterprise-knowledge-graph-rag-n8n.json"
if os.path.exists(file6):
    with open(file6, "r", encoding="utf-8") as f:
        data = json.load(f)
    body = data.get("body", "")
    if "NEO4J_AUTH=neo4j/SuperSecretPassword123!" in body:
        body_fixed = body.replace("NEO4J_AUTH=neo4j/SuperSecretPassword123!", "NEO4J_AUTH=neo4j/${NEO4J_PASSWORD}")
        data["body"] = body_fixed
        with open(file6, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"[FIXED] {file6}")
    else:
        print(f"[CHECKED] {file6} clean")

# 7. draft-cluster2-16-zero-data-retention-enterprise-rag-vultr-vps.json
file7 = "draft-cluster2-16-zero-data-retention-enterprise-rag-vultr-vps.json"
if os.path.exists(file7):
    with open(file7, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    if isinstance(data.get("body"), list):
        blocks = data["body"]
        md_text = []
        for b in blocks:
            if isinstance(b, dict):
                children = b.get("children", [])
                text = "".join([c.get("text", "") for c in children if isinstance(c, dict)])
                style = b.get("style", "normal")
                if style == "h1": md_text.append(f"# {text}")
                elif style == "h2": md_text.append(f"## {text}")
                elif style == "h3": md_text.append(f"### {text}")
                else: md_text.append(text)
            else:
                md_text.append(str(b))
        data["body"] = "\n\n".join(md_text)
    
    if not data.get("seoTitle"):
        data["seoTitle"] = data.get("title", "Zero-Data-Retention Enterprise RAG: Vultr SOP")
    if not data.get("seoDescription"):
        desc = data.get("description", "") or "Zero-data-retention enterprise RAG deployment guide on Vultr VPS with tmpfs vector store memory, Presidio PII scrubbing, and n8n pipelines."
        desc = re.sub(r'\[BOFU[^\]]*\]\s*', '', desc)
        data["seoDescription"] = desc[:160]
        data["description"] = desc[:160]
        
    with open(file7, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[FIXED] {file7}")

print("Phase 1 Execution Completed Successfully!")
