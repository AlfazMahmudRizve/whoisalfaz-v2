const fs = require('fs');
const path = 'C:/Users/user/.gemini/antigravity/brain/80eec7d8-c70a-4b75-a6bd-88f5a5ec3db3/walkthrough.md';
let content = fs.readFileSync(path, 'utf8');

const batch18Section = `

---

## Batch 18: Articles #86–#90 (100% Verified, Published & Indexed)

| # | Slug | Banned Words | Upgraded SEO Title (Char Count) | Engineering Anchors & Technical Depth Injected |
|---|------|:------------:|---------------------------------|------------------------------------------------|
| **#86** | \`n8n-rag-tutorial\` | **0** | \`n8n RAG Tutorial: Stop AI Hallucinations [2026 Blueprint]\` (57c) | Decoupled two-phase RAG architecture; PDF text extraction with 500-token chunking and 50-token overlap; OpenAI \`text-embedding-3-small\` vectorization; Qdrant/Pinecone similarity search with 0.78 cosine threshold; prompt-level boundary checks. |
| **#87** | \`n8n-ai-agent-tools\` | **0** | \`n8n AI Agent Tools: Function Calling [2026 Blueprint]\` (53c) | LangChain-compatible custom function calling; JSON Schema parameter constraints for tool inputs; graceful error recovery when LLM invokes tools with malformed payloads; Execute Workflow tool decoupling. |
| **#88** | \`how-to-build-an-api-with-n8n\` | **0** | \`How to Build an API with n8n [2026 Blueprint]\` (45c) | Synchronous REST API architecture via Webhook + Respond to Webhook nodes; custom HTTP status code routing (200, 400, 401, 500); Header Auth secret tokens; \`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\` database throughput optimization. |
| **#89** | \`n8n-google-analytics-4-pipeline\` | **0** | \`n8n Google Analytics 4 Pipeline [2026 Blueprint]\` (48c) | Google Analytics Data API v1beta integration with GCP Service Account; quota-safe scheduling; composite key \`date_propertyId\` Google Sheets upsert preventing duplicates; Slack Block Kit automated executive brief. |
| **#90** | \`n8n-tips-and-tricks-by-alfaz-mahmud-rizve\` | **0** | \`n8n Tips and Tricks: 5 Pro Hacks [2026 Blueprint]\` (49c) | Database bloat prevention via \`EXECUTIONS_DATA_PRUNE\`; Code node vs Set node performance benchmarking (>500 items); native Luxon \`DateTime\` formatting; global error trigger alerting; Split In Batches rate limiting. |

### Multi-Point Verification Results
- **Anti-AI Quality Gate:** \`scripts/verifyBatch18Upgrades.js\` confirmed **100% compliance** across all 5 articles.
- **Sanity CMS Publish:** Live patched via API token (\`scripts/publishBatch18ToSanity.js\`).
- **Edge Cache Purge:** Revalidated on-demand (\`node scripts/triggerRevalidate.js\`).
- **Google Indexing API:** Submitted all 5 URLs + \`/blog/\` with **6/6 HTTP 200** confirmations (\`scripts/submitBatch18ToGoogleIndexing.py\`).
- **Master Ledger:** Updated \`scratch/master_upgrade_ledger.json\` (**90 / 105 articles VERIFIED**).
- **Git Sync:** Staged, committed, and pushed to origin main via \`node scripts/pushWithPat.js\`.
`;

fs.writeFileSync(path, content.trim() + batch18Section, 'utf8');
console.log('Batch 18 successfully appended to walkthrough.md');
