# Technical Spec: n8n + Pinecone Corrective RAG (CRAG) Blueprint
<!-- Updated: 2026-05-28 -->

This specification details the architecture, data structures, internal linking matrix, and deployment plan for Day 3's high-intent technical blog asset.

---

## 🏷️ 1. Metadata & SEO Configurations

*   **Primary Title:** *Building a RAG Knowledge Base with Pinecone and n8n: A Production-Ready Blueprint*
*   **Slug:** `pinecone-n8n-rag-knowledge-base-blueprint`
*   **SEO Title:** `Corrective RAG in n8n: Zero-Hallucination Pinecone Blueprint (2026)`
*   **SEO Description:** `Build an enterprise-grade Corrective RAG (CRAG) knowledge base with n8n and Pinecone. Step-by-step blueprint covering document grading, hybrid search, and self-healing web search fallbacks.`
*   **Categories:**
    - `Al3E26R37amzsHAqPF1yCU` (Automation Tools)
    - `pJmrsKLAWC800vFHegUEU1` (Architecture Teardowns)
*   **Affiliates:** `["n8n", "Pinecone"]`

---

## 📐 2. Dual Pipeline System Architecture

To ensure operational scale, B2B startups must decouple document ingestion from query/retrieval execution:

### A. The Document Ingestion Pipeline
1.  **Trigger:** Watches Google Drive, database tables, or webhook endpoints for new unstructured content.
2.  **Default Data Loader:** Ingests raw text, PDFs, or raw HTML tables.
3.  **Recursive Character Text Splitter:** Configured with `chunkSize: 1000` and `chunkOverlap: 200` to prevent context fragmentation.
4.  **Embeddings Node:** Generates vector dimensions using `text-embedding-3-small` (1536 dimensions).
5.  **Vector Store Upsert:** Inserts document vectors dynamically into Pinecone index, tagged with strict metadata coordinates.

### B. The Corrective Retrieval (CRAG) Pipeline
1.  **Ingestion:** Receives query from Chat Trigger or REST endpoint.
2.  **Vector Search:** Queries the Pinecone index to retrieve candidate context chunks.
3.  **The Grader Node:** A custom n8n JS Code Node or lightweight scoring prompt evaluates document relevance against the query, assigning a score `0-100`.
4.  **Conditional Router:**
    - **Score >= 80% (Correct):** Feeds verified document chunks straight to the generator LLM.
    - **Score < 80% (Incorrect/Ambiguous):** Intercepts flow, queries the Tavily Web Search API to grab live, factually accurate context, merges it into the context window, and passes to the LLM.
5.  **Generation:** Zero-hallucination response compiled and delivered back to the client.

---

## 🔗 3. Dynamic Internal Linking Schema

We will embed natural, high-intent contextual backlinks inside the copy to establish deep topical authority clusters:

### A. High-Value Core Conversion Pages
*   **n8n Services Page:** `[n8n Automation Services](/services/n8n-automation/)` — drives users seeking workflow build consulting.
*   **Free Pipeline Audit:** `[RevOps & Pipeline Audit](/audit/)` — captures operational audit prospects.
*   **Contact / Booking Page:** `[RevOps & Pipeline Strategy](/contact/)` — calls-to-action placed inside the outsourcing teardown.

### B. 30 Days of n8n & Automation Course Links
*   **Day 26 (RAG Primer):** `[building a standard n8n RAG pipeline](/blog/n8n-rag-tutorial/)` — links in the intro as prerequisite reading.
*   **Day 25 (AI Tools):** `[giving your n8n AI Agent hands with custom tools](/blog/n8n-ai-agent-tools/)` — links in the agent-tool wiring section.
*   **Day 27 (AI Receptionist):** `[automated n8n AI receptionist](/blog/n8n-ai-receptionist/)` — cited as a real-world conversational memory case study.
*   **Day 18 (Data Privacy):** `[n8n data privacy and security protocol](/blog/n8n-data-privacy-security-guide/)` — links in the data governance section.

### C. Macro Silo Links
*   **Day 1 (Apollo Lead Gen):** `[AI-Powered Lead Enrichment Pipeline with n8n and Apollo.io](/blog/n8n-apollo-lead-enrichment-pipeline/)` — references lead parsing pipelines.
*   **Day 2 (RevOps Stack):** `[SaaS RevOps Automation Stack](/blog/revops-automation-stack-saas-2026/)` — references general operations databases.

---

## 📊 4. Database Schema: Standardized Vector Metadata

We will display a clean HTML table inside the article specifying standard GTM vector schema properties:

| Standard Metadata Key | Data Type | Purpose |
| :--- | :--- | :--- |
| `namespace_id` | String | Segregates client documents in a multi-tenant index. |
| `document_source` | String / URL | Captures the absolute path of the origin file. |
| `chunk_index_id` | Integer | Tracks sequence number for parent-child reconstruction. |
| `parent_doc_ref` | String | Ties child text chunks back to the master document ID. |
| `confidence_weight` | Float | Evaluates base document trustworthiness score. |

---

## ⚙️ 5. The Evaluator Grader Code Node

We will provide this production-ready JavaScript block inside the tutorial:

```javascript
// Dynamic retrieval grading script inside n8n Code Node
const chunks = $input.all();
const query = $('Trigger').item.json.query.toLowerCase();

let relevanceScore = 0;
let matchingKeywords = 0;

chunks.forEach(chunk => {
  const text = chunk.json.text.toLowerCase();
  const queryTerms = query.split(/\s+/);
  queryTerms.forEach(term => {
    if (text.includes(term)) matchingKeywords++;
  });
});

relevanceScore = (matchingKeywords / query.split(/\s+/).length) * 100;
return { relevanceScore, action: relevanceScore >= 80 ? "GENERATE" : "CORRECT" };
```
