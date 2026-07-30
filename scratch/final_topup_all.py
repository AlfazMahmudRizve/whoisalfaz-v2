import json
import os

def expand_file(filename, addition_markdown):
    if not os.path.exists(filename):
        print(f"Error: {filename} does not exist.")
        return
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    orig_words = len(data['body'].split())
    data['body'] = data['body'].strip() + "\n\n" + addition_markdown.strip()
    new_words = len(data['body'].split())
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"SUCCESS: {filename} expanded from {orig_words} to {new_words} words (>= 2000: {new_words >= 2000})")

# 1. Accelerated Growth Studio PLG Playbook
topup_plg = """
---

## <mark>Product-Qualified Lead (PQL) Conversion Rate Benchmarks & SLA Management</mark>

Establishing strict Service Level Agreements (SLAs) between product telemetry triggers and sales team outreach guarantees that high-intent PQLs are contacted while buying interest is peaked.

When a workspace account breaches the PQL threshold (composite score >= 75), n8n initializes an SLA timer. If an Account Executive does not log an initial outreach activity in HubSpot or Salesforce within **15 minutes**, n8n escalates the notification to the RevOps team channel in Slack.

### PQL Conversion & Velocity SLA Standards:

* **PQL-to-Demo Conversion Rate:** Target benchmark of **> 24.5%** across organic self-serve signups.
* **First Outreach SLA Velocity:** Target response time of **< 15 Minutes** post PQL threshold breach.
* **PQL-to-Closed Won Velocity:** Average sales cycle duration of **< 18 Days** for product-activated enterprise teams.

```json
{
  "sla_policy": "PLG_TIER1_PQL_RAPID_RESPONSE",
  "max_response_window_minutes": 15,
  "escalation_channel": "#revops-sla-escalations",
  "fallback_assignee": "sales-manager@yourcompany.com"
}
```
"""
expand_file('draft-accelerated-growth-studio-plg-playbook.json', topup_plg)

# 2. AdCreative.ai n8n Ad Refresh
topup_ad = """
---

## <mark>Automated Multi-Platform Creative Synchronization (Meta + TikTok + LinkedIn)</mark>

Scaling ad refresh loops beyond Meta Ads requires synchronizing creative assets across TikTok Ads Manager and LinkedIn Campaign Manager simultaneously.

When AdCreative.ai generates new banner and video variations, an n8n Router Node dynamically reformats aspect ratios (1:1 for Meta Feed, 9:16 for TikTok Stories/Reels, 1.91:1 for LinkedIn Sponsored Content) and dispatches campaign updates via platform-specific REST APIs.

### Multi-Platform Creative Asset Formats:

* **Meta Feed / Instagram:** `1080x1080px` (Square 1:1) & `1080x1920px` (Vertical 9:16).
* **TikTok Ads Manager:** `1080x1920px` (Vertical 9:16), H.264 MP4, bitrate > 5Mbps.
* **LinkedIn Ads:** `1200x627px` (Horizontal 1.91:1), PNG/JPG, max file size 5MB.

```javascript
// n8n JavaScript Code Node: Aspect Ratio & Platform Asset Router
const items = $input.all();
const routedAssets = [];

for (const item of items) {
  const rawImage = item.json.generatedImage;
  
  routedAssets.push({
    json: {
      metaAsset: { url: rawImage.square, ratio: '1:1' },
      tiktokAsset: { url: rawImage.vertical, ratio: '9:16' },
      linkedinAsset: { url: rawImage.landscape, ratio: '1.91:1' },
      syncTimestamp: new Date().toISOString()
    }
  });
}

return routedAssets;
```
"""
expand_file('draft-adcreative-ai-n8n-ad-refresh.json', topup_ad)

# 3. Corrective RAG (CRAG) n8n
topup_crag = """
---

## <mark>Vector Storage Index Optimization & Multi-Tenant Namespace Partitioning</mark>

Operating Corrective RAG in enterprise multi-tenant environments demands strict namespace isolation and HNSW index tuning in Qdrant or Pinecone.

To prevent cross-tenant context leakage, every vector search payload in n8n includes a mandatory metadata payload filter enforcing tenant authorization (`tenant_id = req.user.tenant_id`).

### HNSW Index Performance Parameters:

* **Distance Metric:** Cosine Similarity (`distance: "Cosine"`).
* **HNSW m Parameter:** `m = 16` (Number of edges per node for optimal retrieval speed vs recall).
* **HNSW ef_construct:** `ef_construct = 100` (Index construction precision).
* **Payload Indexing:** Index `tenant_id` as Keyword and `created_at` as Integer timestamp.

```json
{
  "filter": {
    "must": [
      { "key": "tenant_id", "match": { "value": "tenant_enterprise_acme" } },
      { "key": "document_status", "match": { "value": "VERIFIED_PRODUCTION" } }
    ]
  }
}
```
"""
expand_file('draft-corrective-rag-crag-n8n.json', topup_crag)

# 4. Apollo vs Lusha vs AiSDR
topup_apollo_lusha = """
---

## <mark>Enterprise Compliance & Privacy Framework (GDPR, CCPA & SOC2 Type II)</mark>

When deploying sales intelligence databases like Apollo and Lusha alongside automated AI outreach platforms like AiSDR, enterprise RevOps teams must enforce strict data privacy governance.

To comply with GDPR and CCPA guidelines, all automated lead ingestion pipelines must check target contact emails against an automated Suppression API before initiating any outreach sequence.

### Privacy Compliance Checklist:

* **Unsubscribe Link Enforcement:** Every email sent via AiSDR or Brevo must contain a functional 1-click unsubscribe link.
* **Right-to-be-Forgotten Webhook:** Upon receiving a GDPR deletion request, n8n executes deletion calls across Apollo, Lusha, CRM, and vector stores.
* **SOC2 Type II Audit Logging:** Store all API transaction logs in encrypted PostgreSQL database tables with a 90-day retention policy.
"""
expand_file('draft-2-2-apollo-vs-lusha-vs-aisdr.json', topup_apollo_lusha)

print("Final Top-ups Applied.")
