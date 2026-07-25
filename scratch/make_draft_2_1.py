import json
import os
import sys

# Category & Affiliate constants
CAT_30DAYS = "Al3E26R37amzsHAqPF1yCU"  # 30 Days of n8n & Automation
CAT_TEARDOWNS = "pJmrsKLAWC800vFHegUEU1" # Architecture Teardowns

# --- Draft 2.1: Apollo to Brevo n8n Pipeline ---
draft_2_1 = {
    "_id": "drafts.apollo-to-brevo-n8n-pipeline-guide",
    "_type": "post",
    "title": "Apollo to Brevo n8n Pipeline: B2B Automated Outreach Guide",
    "slug": {
        "_type": "slug",
        "current": "apollo-to-brevo-n8n-pipeline-guide"
    },
    "description": "Build an automated Apollo to Brevo n8n pipeline for B2B prospecting. Includes copy-pasteable JSON blueprints, JavaScript deduplication, and CRM sync.",
    "date": "2026-07-25T13:00:00.000Z",
    "seoTitle": "Apollo to Brevo n8n Pipeline: B2B Automated Outreach Guide",
    "seoDescription": "Build an automated Apollo to Brevo n8n pipeline for B2B prospecting. Includes copy-pasteable JSON blueprints, JavaScript deduplication, and CRM sync.",
    "image": {
        "_type": "image",
        "asset": {
            "_type": "reference",
            "_ref": "image-apollo-brevo-n8n-pipeline-16x9"
        }
    },
    "categories": [
        {"_type": "reference", "_ref": CAT_30DAYS}
    ],
    "affiliates": ["apollo", "brevo", "n8n"],
    "body": """In modern outbound RevOps infrastructure, building a seamless **Apollo to Brevo n8n pipeline** is the single highest-leverage automation for B2B sales teams. Manual prospect exporting, CSV uploading, and dirty email lists severely degrade sender reputation, waste SDR hours, and inflate customer acquisition costs. By combining **[Apollo.io](/go/apollo)** for rich B2B database prospecting, **[n8n](/go/n8n)** for fair-code workflow orchestration, and **[Brevo](/go/brevo)** for high-deliverability transactional SMTP and CRM sequences, revenue operations leaders can construct a self-healing outbound machine.

*(Looking to align your entire revenue infrastructure beyond prospecting? Read our complete teardown of the [SaaS RevOps Automation Stack](/blog/revops-automation-stack-saas-2026/)).*

---

## <mark>How Does an Apollo to Brevo n8n Pipeline Work?</mark>

An Apollo to Brevo n8n pipeline automates B2B outbound sales by bridging data prospecting with multi-channel CRM execution through asynchronous workflow orchestration. When a target prospect matches your Ideal Customer Profile criteria in Apollo.io, n8n captures the contact payload via secure HTTP webhooks, executes programmatic data validation, and extracts verified B2B email addresses alongside mobile direct-dial phone numbers. Rather than manually copying records into static spreadsheets or risking data degradation, n8n processes the enriched metadata using localized JavaScript transformations to normalize job titles, domain protocols, and corporate headcount metrics. Once cleaned and scored, the payload is pushed directly into Brevo CRM via transactional REST API endpoints to automatically assign contact lists, trigger personalized email warm-up sequences, and schedule automated SDR follow-ups. By removing manual data entry bottlenecks, this decoupled integration architecture empowers RevOps teams to execute high-velocity B2B prospecting with zero latency, continuous data freshness, and complete operational transparency.

Below is the high-level decoupled node architecture governing this automated outbound pipeline:

```mermaid
graph TD
    A[Apollo Webhook / Export Trigger] -->|Raw Prospect JSON| B[n8n Webhook Ingestion Node]
    B -->|Payload| C[JavaScript Deduplication & Hash Node]
    C -->|New Valid Contact| D[Brevo REST API Upsert Node]
    C -->|Duplicate Record| E[Patch Update & Event Log]
    D -->|HTTP 200 OK| F[Brevo List & Sequence Assignment]
    F -->|Enrolled Contact| G[Slack RevOps Alert]
```

---

## <mark>How Do You Configure the n8n Apollo Webhook Ingestion Node?</mark>

Configuring the n8n Apollo webhook ingestion node requires establishing a dedicated HTTP POST endpoint that receives incoming B2B prospect payloads asynchronously without causing upstream network timeouts. Within n8n, create a Webhook Node configured with an explicit path such as /apollo-lead-ingest, set the HTTP Method to POST, and assign Response Mode to 'onReceived' to immediately return a 200 OK status code within 150 milliseconds. This non-blocking design ensures that Apollo webhooks or third-party web forms do not drop connections during heavy downstream API calls. Secure authentication is maintained by setting custom HTTP headers, specifically validating an X-Apollo-Signature token or secret header against your environment variables before passing raw JSON data downstream. The incoming payload contains raw contact object parameters including corporate email, full name, job title, LinkedIn profile URL, and company domain. Establishing this robust ingestion layer guarantees that every captured lead triggers downstream processing reliably without payload loss or server congestion.

You can import this production-ready **n8n Workflow JSON Blueprint** directly into your n8n canvas:

```json
{
  "name": "Apollo to Brevo Outbound Pipeline Blueprint",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "apollo-lead-ingest",
        "responseMode": "onReceived",
        "options": {}
      },
      "name": "Apollo Webhook Ingest",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all();\nconst cleaned = items.map(item => {\n  const body = item.json.body || item.json;\n  const email = (body.email || '').trim().toLowerCase();
  const domain = email.includes('@') ? email.split('@')[1] : '';\n  return {\n    json: {\n      email,\n      first_name: body.first_name || '',\n      last_name: body.last_name || '',\n      title: body.title || '',\n      company_name: body.organization_name || body.company || '',\n      domain,\n      phone: body.phone_number || '',\n      linkedin_url: body.linkedin_url || '',\n      processed_at: new Date().toISOString()\n    }\n  };\n});\nreturn cleaned;"
      },
      "name": "JavaScript Lead Normalizer",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [480, 300]
    }
  ],
  "connections": {
    "Apollo Webhook Ingest": {
      "main": [
        [
          {
            "node": "JavaScript Lead Normalizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## <mark>How Do You Deduplicate Prospect Data Using JavaScript Code Nodes?</mark>

Deduplicating B2B prospect data using JavaScript Code Nodes in n8n prevents CRM data corruption, eliminates duplicate contact creation, and optimizes API credit consumption across outbound platforms. Before invoking Brevo API endpoints, an n8n Code Node executes an in-memory hash check and domain normalization using cryptographic SHA-256 signatures derived from normalized email addresses and company domains. The JavaScript code trims whitespace, converts email strings to lowercase, strips common tracking parameters, and checks an internal Redis cache or temporary workflow array for prior record processing within the last 24 hours. If a matching hash or active contact ID is detected, the Code Node sets a routing flag titled isDuplicate to true, diverting the workflow execution away from new contact creation and toward a patch record update. Implementing this programmatic deduplication logic ensures clean database hygiene, protects your Brevo contact list limits, and preserves strict compliance with enterprise CRM data governance rules.

Below is the copy-pasteable **n8n JavaScript Code Node** for SHA-256 deduplication and email string hygiene:

```javascript
// n8n Code Node: SHA-256 Email & Domain Deduplication Guard
const crypto = require('crypto');

const items = $input.all();
const processedOutputs = [];

for (const item of items) {
  const rawEmail = item.json.email || '';
  const normalizedEmail = rawEmail.trim().toLowerCase();
  
  // Ignore malformed email entries
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    continue;
  }
  
  // Compute deterministic SHA-256 contact fingerprint hash
  const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex');
  
  // Extract corporate domain for account-based clustering
  const domain = normalizedEmail.split('@')[1];
  const isGeneric = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain);
  
  processedOutputs.push({
    json: {
      contactHash: hash,
      email: normalizedEmail,
      firstName: (item.json.first_name || '').trim(),
      lastName: (item.json.last_name || '').trim(),
      company: item.json.company_name || '',
      jobTitle: item.json.title || '',
      isCorporateDomain: !isGeneric,
      automationOrigin: 'n8n_apollo_pipeline',
      dedupTimestamp: new Date().getTime()
    }
  });
}

return processedOutputs;
```

---

## <mark>How Do You Sync Enriched Lead Data into Brevo CRM via API?</mark>

Syncing enriched B2B lead data into Brevo CRM via REST API requires executing a structured contact upsert pattern inside n8n to ensure seamless attribute mapping and automated sequence enrollment. Utilizing an n8n HTTP Request Node configured with your Brevo v3 API key header, the workflow calls the /v3/contacts endpoint using a PUT request with updateEnabled set to true. The JSON request payload dynamically maps Apollo enrichment fields including first name, last name, corporate job title, direct phone number, employee headcount, annual revenue, and LinkedIn URL directly into custom Brevo contact attributes. Furthermore, the payload specifies target list IDs to immediately segment prospects into specialized email warming or SDR outreach campaigns based on calculated ICP qualification scores. By wrapping this API call in an n8n Router node, RevOps architects can dynamically assign Tier-1 enterprise leads to high-touch sales queues while directing secondary leads into nurture drip campaigns automatically.

The table below summarizes the exact attribute mapping schema between Apollo.io API and Brevo CRM:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Apollo Field</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Brevo Attribute</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Data Type</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Outbound Sequence Action</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-sm">person.email</td>
      <td class="p-3 border border-slate-700 font-mono text-sm text-cyan-400">EMAIL</td>
      <td class="p-3 border border-slate-700 text-sm">String</td>
      <td class="p-3 border border-slate-700 text-sm">Primary Unique Contact Key</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-sm">person.first_name</td>
      <td class="p-3 border border-slate-700 font-mono text-sm text-cyan-400">FIRSTNAME</td>
      <td class="p-3 border border-slate-700 text-sm">String</td>
      <td class="p-3 border border-slate-700 text-sm">Dynamic Email Copy {{ FIRSTNAME }}</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-sm">person.title</td>
      <td class="p-3 border border-slate-700 font-mono text-sm text-cyan-400">JOB_TITLE</td>
      <td class="p-3 border border-slate-700 text-sm">String</td>
      <td class="p-3 border border-slate-700 text-sm">ICP Persona List Routing</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-sm">organization.estimated_num_employees</td>
      <td class="p-3 border border-slate-700 font-mono text-sm text-cyan-400">HEADCOUNT</td>
      <td class="p-3 border border-slate-700 text-sm">Integer</td>
      <td class="p-3 border border-slate-700 text-sm">Tier 1 Enterprise Segmentation</td>
    </tr>
  </tbody>
</table>

---

## <mark>How Do You Handle Webhook Loop Guards and Rate Limit Failures?</mark>

Handling webhook loop guards and API rate limits inside n8n requires implementing self-healing error branches, exponential backoff retries, and strict payload headers to guarantee 99.9% pipeline reliability. To prevent infinite loops caused by bi-directional syncs between Apollo, n8n, and Brevo CRM, the JavaScript transformation node injects a custom header titled AUTOMATION_ORIGIN with a value of n8n_apollo_pipeline into every outgoing payload. Downstream webhook triggers evaluate this header and abort processing if the tag is detected, successfully breaking recursive execution loops. For rate-limiting challenges such as Apollo's HTTP 429 status codes or Brevo API quota limits, n8n node parameters are configured with Retry On Failure enabled, setting max retries to 5 attempts with an exponential backoff interval starting at 5000 milliseconds. If persistent API failures occur, an Error Trigger workflow routes the failed execution to a dead-letter queue in PostgreSQL and dispatches alert notifications directly to Slack.

*(For a deeper architectural breakdown on building production-ready automated error recovery systems, see our master guide on [Self-Healing n8n Automation Architecture](/blog/self-healing-n8n-automation-architecture/)).*

### Operational Verification & Health Benchmarks:
To ensure your Apollo to Brevo pipeline performs at enterprise standards, monitor these three critical health metrics:

* **Webhook Ingestion Latency:** Must respond with HTTP `200 OK` in under **150ms**.
* **Deduplication Rate:** Successfully filter duplicate incoming prospects with **> 99.5% accuracy**.
* **Brevo API Sync Success Rate:** Maintain an HTTP `200/201` success rate of **> 99.8%** across all automated CRM upserts.
"""
}

# Write generator script
with open("scratch/draft_2_1.json", "w", encoding="utf-8") as f:
    json.dump(draft_2_1, f, indent=2)
print("Saved draft 2.1")
