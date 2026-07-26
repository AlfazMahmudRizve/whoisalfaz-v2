import json
import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 20 Cluster #2 Posts with strict SEO Title Tags (<= 60 chars) & Funnel Stage Mapping
seo_titles_map = [
    # Pillar 1: Self-Hosted Vector DBs & Vultr Cloud GPU Infrastructure
    {
        "slug": "self-hosted-qdrant-cluster-vultr-docker-sop",
        "title": "Self-Hosted Qdrant Vultr Cluster: Docker SOP",  # 45 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Transactional / Setup SOP",
        "primary_keyword": "Self-Hosted Qdrant Vultr"
    },
    {
        "slug": "vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide",
        "title": "Vultr Cloud GPU vs AWS EC2: AI Cost Teardown",  # 44 chars | MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Commercial / Cost Comparison",
        "primary_keyword": "Vultr Cloud GPU vs AWS EC2"
    },
    {
        "slug": "securing-self-hosted-vector-databases-ssl-vultr-firewall",
        "title": "Securing Self-Hosted Vector DBs: Vultr SOP",  # 43 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Technical Security SOP",
        "primary_keyword": "Securing Self-Hosted Vector DBs"
    },
    {
        "slug": "the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n",
        "title": "Self-Hosted AI Stack 2026: Vultr & n8n Guide",  # 44 chars | TOFU/BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Architectural Blueprint",
        "primary_keyword": "Self-Hosted AI Stack 2026"
    },

    # Pillar 2: Vector Search Benchmarks & Payload Architectures
    {
        "slug": "pinecone-serverless-vs-qdrant-vultr-latency-benchmark",
        "title": "Pinecone vs Qdrant Vultr: RAG Latency Benchmark",  # 47 chars | MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Commercial Benchmark",
        "primary_keyword": "Pinecone vs Qdrant Vultr"
    },
    {
        "slug": "pinecone-namespaces-vs-qdrant-payload-filters-comparison",
        "title": "Pinecone Namespaces vs Qdrant Payload Filters",  # 46 chars | MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Technical Architecture Teardown",
        "primary_keyword": "Pinecone Namespaces vs Qdrant"
    },
    {
        "slug": "hybrid-vector-keyword-search-qdrant-n8n-pipeline",
        "title": "Hybrid Vector & Keyword Search: Qdrant n8n SOP",  # 46 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Implementation Blueprint",
        "primary_keyword": "Hybrid Vector Search Qdrant"
    },
    {
        "slug": "scaling-qdrant-vector-database-to-10-million-embeddings",
        "title": "Scaling Qdrant to 10M Embeddings on Vultr VPS",  # 46 chars | TOFU/MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Scale & Optimization Teardown",
        "primary_keyword": "Scaling Qdrant 10M Embeddings"
    },

    # Pillar 3: Advanced RAG Architecture & Corrective Search
    {
        "slug": "corrective-rag-crag-blueprint-n8n-tavily-fallback",
        "title": "Corrective RAG CRAG Blueprint: n8n & Tavily",  # 43 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "RAG Implementation Blueprint",
        "primary_keyword": "Corrective RAG CRAG Blueprint"
    },
    {
        "slug": "automated-pdf-document-chunking-vectorization-n8n",
        "title": "Automated PDF Document Chunking in n8n Guide",  # 44 chars | TOFU/BOFU
        "funnel_stage": "BOFU",
        "search_intent": "ETL & Vectorization Workflow",
        "primary_keyword": "Automated PDF Chunking n8n"
    },
    {
        "slug": "building-an-enterprise-knowledge-graph-rag-n8n",
        "title": "Enterprise Knowledge Graph RAG in n8n Blueprint",  # 47 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Advanced RAG Architecture",
        "primary_keyword": "Enterprise Knowledge Graph RAG"
    },
    {
        "slug": "open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark",
        "title": "Open-Source LLM Embeddings: BGE vs Voyage RAG",  # 46 chars | MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Commercial Model Benchmark",
        "primary_keyword": "Open-Source LLM Embeddings"
    },

    # Pillar 4: Dify.ai & LLM Application Orchestration
    {
        "slug": "dify-ai-vultr-gpu-docker-deployment-guide",
        "title": "Dify.ai Vultr GPU Docker Deployment Blueprint",  # 46 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Deployment & Self-Host SOP",
        "primary_keyword": "Dify.ai Vultr GPU Docker"
    },
    {
        "slug": "dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes",
        "title": "Dify.ai vs n8n AI Agents: Architecture Guide",  # 44 chars | MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Platform Comparison",
        "primary_keyword": "Dify.ai vs n8n AI Agents"
    },
    {
        "slug": "semantic-search-api-n8n-qdrant-fastapi-bridge",
        "title": "Semantic Search API: n8n Qdrant FastAPI Guide",  # 45 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "API Microservice Blueprint",
        "primary_keyword": "Semantic Search API n8n"
    },
    {
        "slug": "zero-data-retention-enterprise-rag-vultr-vps",
        "title": "Zero-Data-Retention Enterprise RAG: Vultr SOP",  # 45 chars | TOFU/BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Enterprise Compliance SOP",
        "primary_keyword": "Zero-Data-Retention RAG"
    },

    # Pillar 5: Production n8n Vector Memory & Ingestion
    {
        "slug": "building-multi-tenant-vector-search-n8n-qdrant",
        "title": "Multi-Tenant Vector Search: n8n Qdrant Blueprint",  # 49 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "SaaS Architecture Blueprint",
        "primary_keyword": "Multi-Tenant Vector Search"
    },
    {
        "slug": "n8n-vector-store-memory-management-production-guide",
        "title": "n8n AI Agent Memory Persistence: Qdrant Guide",  # 46 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "Agent Memory Implementation",
        "primary_keyword": "n8n AI Agent Memory"
    },
    {
        "slug": "high-throughput-batch-vector-ingestion-n8n-qdrant",
        "title": "High-Throughput Batch Vector Ingestion: n8n SOP",  # 47 chars | BOFU
        "funnel_stage": "BOFU",
        "search_intent": "ETL Rate-Limiting Protocol",
        "primary_keyword": "Batch Vector Ingestion n8n"
    },
    {
        "slug": "n8n-ai-agent-memory-persistence-qdrant-vector-store",
        "title": "n8n Context Compression: Qdrant Memory Guide",  # 45 chars | TOFU/MOFU
        "funnel_stage": "MOFU",
        "search_intent": "Optimization Teardown",
        "primary_keyword": "n8n Context Compression"
    }
]

def apply_seo_titles():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(f"⚡ Applying SEO-engineered titles & funnel stage mapping to 20 Cluster #2 draft files...\n")
    
    for item in seo_titles_map:
        slug = item["slug"]
        files = [f for f in os.listdir(root_dir) if f.startswith("draft-cluster2-") and slug in f]
        if not files:
            continue
        
        filepath = os.path.join(root_dir, files[0])
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        data["title"] = item["title"]
        data["description"] = f"[{item['funnel_stage']} - {item['search_intent']}] {data['description']}"
        
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
            
        char_len = len(item["title"])
        print(f"[{item['funnel_stage']}] ({char_len} chars) {item['title']}")
        print(f"     Slug: {slug}\n")

if __name__ == "__main__":
    apply_seo_titles()
