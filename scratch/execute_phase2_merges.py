import json
import os

print("Executing Phase 2 Merges for Cluster 2 (Drafts 01 to 08)...")

# Mapping of short target files to long source files
merges = [
    ("draft-cluster2-01-self-hosted-qdrant-cluster-vultr-docker-sop.json", "draft-cluster2-01.json"),
    ("draft-cluster2-02-vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide.json", "draft-cluster2-02.json"),
    ("draft-cluster2-03-securing-self-hosted-vector-databases-ssl-vultr-firewall.json", "draft-cluster2-03.json"),
    ("draft-cluster2-04-the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n.json", "draft-cluster2-04.json"),
    ("draft-cluster2-05-pinecone-serverless-vs-qdrant-vultr-latency-benchmark.json", "draft-cluster2-05.json"),
    ("draft-cluster2-06-pinecone-namespaces-vs-qdrant-payload-filters-comparison.json", "draft-cluster2-06.json"),
    ("draft-cluster2-07-hybrid-vector-keyword-search-qdrant-n8n-pipeline.json", "draft-cluster2-07.json"),
    ("draft-cluster2-08-scaling-qdrant-vector-database-to-10-million-embeddings.json", "draft-cluster2-08.json")
]

for target, source in merges:
    if os.path.exists(target) and os.path.exists(source):
        with open(source, "r", encoding="utf-8") as f_src:
            src_data = json.load(f_src)
        with open(target, "r", encoding="utf-8") as f_tgt:
            tgt_data = json.load(f_tgt)
        
        # Copy long body and rich fields from source while keeping target metadata
        tgt_data["body"] = src_data.get("body", tgt_data.get("body"))
        if src_data.get("schemaMarkup"):
            tgt_data["schemaMarkup"] = src_data.get("schemaMarkup")
            
        with open(target, "w", encoding="utf-8") as f_out:
            json.dump(tgt_data, f_out, indent=2, ensure_ascii=False)
        print(f"[MERGED] {source} -> {target}")

print("Phase 2 Draft Merges Complete!")
