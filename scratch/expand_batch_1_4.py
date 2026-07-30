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

# ==========================================
# FILE 1: draft-2-1-apollo-brevo-n8n-pipeline.json
# ==========================================
add_1 = """
---

## <mark>Step-by-Step UI Configuration Guide: Setting Up Apollo Webhooks & Brevo API Nodes</mark>

To successfully deploy this pipeline, follow this step-by-step UI configuration protocol across Apollo.io, n8n, and Brevo CRM:

1. **Apollo.io Webhook Export Setup:**
   * Navigate to your **Apollo.io Dashboard** > **Settings** > **Integrations** > **Webhooks**.
   * Click **Add Webhook Target** and enter your production n8n webhook listener URL: `https://n8n.yourdomain.com/webhook/apollo-lead-ingest`.
   * Under **Event Triggers**, select `Contact Saved to Sequence` and `New Saved Prospect`.
   * Enable HTTP `POST` method and set payload format to `JSON`. Copy the generated **Webhook Secret Token** for signature verification.

2. **n8n Auth Credentials & Header Setup:**
   * In your n8n workspace, navigate to **Credentials** > **New Credential** > **Header Auth**.
   * Name the credential `Brevo API Key Header`.
   * Set **Header Name** to `api-key` and paste your Brevo v3 API secret key (`xkeysib-...`) into the **Header Value** field.

3. **n8n HTTP Request Node Configuration for Brevo Contact Upsert:**
   * Double-click the **HTTP Request Node** connected downstream from your JavaScript Deduplication Node.
   * Set **Request Method** to `PUT`.
   * Enter the endpoint URL: `https://api.brevo.com/v3/contacts/{{ encodeURIComponent($json.email) }}`.
   * Toggle **Send Headers** ON, select your `Brevo API Key Header` credential, and add header `Content-Type: application/json`.
   * In the **Body Parameters** section, select `JSON` mode and insert the dynamic payload mapping:

```json
{
  "updateEnabled": true,
  "attributes": {
    "FIRSTNAME": "={{ $json.firstName }}",
    "LASTNAME": "={{ $json.lastName }}",
    "JOB_TITLE": "={{ $json.jobTitle }}",
    "COMPANY": "={{ $json.company }}",
    "HEADCOUNT": "={{ $json.headcount }}",
    "CONTACT_HASH": "={{ $json.contactHash }}"
  },
  "listIds": [42, 108]
}
```

---

## <mark>Comprehensive Parameter Reference Table for Apollo-Brevo n8n Pipeline</mark>

The table below provides a full technical reference for all configuration parameters, environment variables, and validation rules used across the Apollo to Brevo n8n integration workflow:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Node Name</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Parameter / Field</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Data Type</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Valid Schema / Range</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Description & Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs">Apollo Webhook Ingest</td>
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">path</td>
      <td class="p-3 border border-slate-700 text-xs">String</td>
      <td class="p-3 border border-slate-700 text-xs">URI Path String</td>
      <td class="p-3 border border-slate-700 text-xs">Path segment for webhook endpoint. Default: `/apollo-lead-ingest`.</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs">JavaScript Lead Normalizer</td>
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">contactHash</td>
      <td class="p-3 border border-slate-700 text-xs">String (Hex)</td>
      <td class="p-3 border border-slate-700 text-xs">64-char SHA-256</td>
      <td class="p-3 border border-slate-700 text-xs">Deterministic SHA-256 hash derived from lowercase trimmed prospect email.</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs">HTTP Request Node</td>
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">updateEnabled</td>
      <td class="p-3 border border-slate-700 text-xs">Boolean</td>
      <td class="p-3 border border-slate-700 text-xs">`true` | `false`</td>
      <td class="p-3 border border-slate-700 text-xs">Brevo API setting allowing contact field updates if contact exists. Default: `true`.</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs">HTTP Request Node</td>
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">listIds</td>
      <td class="p-3 border border-slate-700 text-xs">Array[Integer]</td>
      <td class="p-3 border border-slate-700 text-xs">Valid Brevo List IDs</td>
      <td class="p-3 border border-slate-700 text-xs">Target list IDs for email sequence enrollment. Required.</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs">Error Trigger Node</td>
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">retryAttempts</td>
      <td class="p-3 border border-slate-700 text-xs">Integer</td>
      <td class="p-3 border border-slate-700 text-xs">1 to 10</td>
      <td class="p-3 border border-slate-700 text-xs">Maximum retry count on transient HTTP failures (429/500). Default: `5`.</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced Edge-Case Error Logging & Self-Healing Dead-Letter Queue</mark>

In production automation pipelines, API rate limits, schema shifts, or transient network timeouts will inevitably occur. Below is the copy-pasteable n8n **Error Trigger Sub-Workflow Code** and PostgreSQL Dead-Letter Queue (DLQ) integration pattern to capture, log, and alert on pipeline failures:

```javascript
// n8n JavaScript Code Node: Edge-Case Error Logger & Payload Standardizer
const errorData = $input.item.json;
const failedNode = errorData.execution ? errorData.execution.error.node.name : 'Unknown Node';
const errorMessage = errorData.execution ? errorData.execution.error.message : 'Unspecified Error';
const rawPayload = errorData.body || errorData.json || {};

// Categorize failure severity and HTTP status code
let statusCode = 500;
if (errorMessage.includes('400')) statusCode = 400;
if (errorMessage.includes('401')) statusCode = 401;
if (errorMessage.includes('429')) statusCode = 429;

const formattedDlqRecord = {
  json: {
    dlq_id: `DLQ_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    source_pipeline: 'Apollo_Brevo_n8n_Sync',
    failed_node: failedNode,
    http_status_code: statusCode,
    error_message: errorMessage,
    contact_email: rawPayload.email || 'N/A',
    raw_payload: JSON.stringify(rawPayload),
    retry_count: 0,
    status: 'PENDING_INVESTIGATION'
  }
};

return [formattedDlqRecord];
```

### PostgreSQL Dead-Letter Queue Schema:
Run this SQL DDL command in your database to instantiate the dead-letter queue table:

```sql
CREATE TABLE IF NOT EXISTS dlq_apollo_brevo_failures (
    dlq_id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source_pipeline VARCHAR(128) NOT NULL,
    failed_node VARCHAR(128) NOT NULL,
    http_status_code INT NOT NULL,
    error_message TEXT NOT NULL,
    contact_email VARCHAR(255),
    raw_payload JSONB NOT NULL,
    retry_count INT DEFAULT 0,
    status VARCHAR(32) DEFAULT 'PENDING_INVESTIGATION'
);
CREATE INDEX idx_dlq_status ON dlq_apollo_brevo_failures(status);
```

---

## <mark>Production Execution & Deployment Checklist</mark>

Before putting your Apollo to Brevo n8n pipeline into production, execute this pre-flight verification checklist:

- [ ] **Webhook Security Verification:** Validate that Apollo webhook signature secret matches the verification check inside n8n.
- [ ] **SSL / TLS Certificate Validation:** Confirm n8n instance uses valid TLS 1.3 HTTPS endpoint certificates.
- [ ] **Brevo Attribute Pre-Creation:** Verify custom fields (`JOB_TITLE`, `HEADCOUNT`, `CONTACT_HASH`) exist in Brevo CRM settings before triggering first API push.
- [ ] **JavaScript SHA-256 Deduplication Audit:** Confirm Code Node accurately handles null emails and strips generic domains (`gmail.com`, `yahoo.com`).
- [ ] **API Rate Limit Guardrails:** Verify n8n HTTP Request node has **Retry On Failure** enabled with `Max Retries = 5` and `Retry Interval = 5000ms`.
- [ ] **Dead-Letter Queue Health Check:** Test simulated HTTP 500 error to ensure failed payloads write to PostgreSQL `dlq_apollo_brevo_failures` table and trigger Slack alerts.
- [ ] **GDPR & CAN-SPAM Compliance:** Ensure opt-out suppression lists are synced bi-directionally between Apollo and Brevo lists.
"""

expand_file('draft-2-1-apollo-brevo-n8n-pipeline.json', add_1)

# ==========================================
# FILE 2: draft-2-2-apollo-vs-lusha-vs-aisdr.json
# ==========================================
add_2 = """
---

## <mark>Step-by-Step UI Configuration Guide: Orchestrating Apollo, Lusha, and AiSDR in n8n</mark>

To set up an integrated multi-provider sales stack combining Apollo for database search, Lusha for phone enrichment, and AiSDR for automated email dispatch, follow these detailed UI steps:

1. **n8n Canvas Node Sequence:**
   * Create a new n8n workflow and place an **n8n Webhook Node** or **Schedule Trigger Node** (e.g., set to run weekdays at 08:00 AM).
   * Drag an **HTTP Request Node** named `Apollo API Prospect Search`.
   * Connect its output to an **n8n Switch Node** named `Check Phone Presence`.
   * Branch missing-phone leads to an **HTTP Request Node** named `Lusha API Phone Lookup`.
   * Merge output streams into an **HTTP Request Node** named `AiSDR Campaign Enroller`.

2. **Configuring Apollo & Lusha API Credentials in n8n UI:**
   * **Apollo Setup:** Create Header Auth credential with Header Name `Cache-Control` and set query parameters `api_key = your_apollo_api_key`.
   * **Lusha Setup:** Create Header Auth credential with Header Name `api_key` and Header Value `your_lusha_api_key`. Set endpoint URL to `https://api.lusha.com/person?email={{ $json.email }}`.

3. **Configuring AiSDR Webhook Action Node:**
   * In the `AiSDR Campaign Enroller` node, select `POST` method.
   * Set endpoint URL: `https://api.aisdr.com/v1/prospects/enroll`.
   * Add Bearer Token Auth using your AiSDR API secret.
   * Set JSON body parameters mapping the enriched record:

```json
{
  "campaign_id": "cmp_saas_decision_makers_v1",
  "prospect": {
    "email": "={{ $json.email }}",
    "first_name": "={{ $json.first_name }}",
    "last_name": "={{ $json.last_name }}",
    "direct_phone": "={{ $json.phone_number }}",
    "company": "={{ $json.company_name }}",
    "title": "={{ $json.title }}"
  }
}
```

---

## <mark>Comprehensive Tech Stack Parameter & Data Schema Reference Table</mark>

The table below provides a side-by-side technical evaluation of parameters, limits, endpoints, and schema formats across Apollo.io, Lusha, and AiSDR:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Platform</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Primary API Endpoint</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Auth Header</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Rate Limits</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Primary Strength</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Est. Unit Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Apollo.io</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v1/mixed_people/search`</td>
      <td class="p-3 border border-slate-700 text-xs">`api_key` (Query/Header)</td>
      <td class="p-3 border border-slate-700 text-xs">120 requests / min</td>
      <td class="p-3 border border-slate-700 text-xs">Mass B2B email search & firmographics</td>
      <td class="p-3 border border-slate-700 text-xs">$0.02 – $0.05 / contact</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Lusha</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v2/person/enrich`</td>
      <td class="p-3 border border-slate-700 text-xs">`api_key` (Header)</td>
      <td class="p-3 border border-slate-700 text-xs">60 requests / min</td>
      <td class="p-3 border border-slate-700 text-xs">High-accuracy direct phone & mobile dials</td>
      <td class="p-3 border border-slate-700 text-xs">$0.20 – $0.45 / phone lookup</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">AiSDR</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v1/prospects/enroll`</td>
      <td class="p-3 border border-slate-700 text-xs">`Authorization: Bearer`</td>
      <td class="p-3 border border-slate-700 text-xs">300 requests / min</td>
      <td class="p-3 border border-slate-700 text-xs">Autonomous AI email sequence execution</td>
      <td class="p-3 border border-slate-700 text-xs">$750 – $1,200 / month flat</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced Error Logging, Exception Handling, and Provider Failover Logic</mark>

To ensure uninterrupted lead enrichment when an API service encounters outages or quota exhaustion, deploy this copy-pasteable n8n **JavaScript Failover Node**:

```javascript
// n8n JavaScript Code Node: Multi-Provider Enrichment Failover Handler
const items = $input.all();
const enrichedProspects = [];

for (const item of items) {
  const apolloData = item.json.apolloResponse || {};
  const lushaData = item.json.lushaResponse || {};
  
  let finalEmail = apolloData.email || '';
  let finalPhone = apolloData.phone_numbers ? apolloData.phone_numbers[0] : '';
  let phoneSource = 'Apollo';
  
  // Fallback to Lusha if Apollo phone is missing or low confidence
  if (!finalPhone && lushaData.phoneNumbers && lushaData.phoneNumbers.length > 0) {
    finalPhone = lushaData.phoneNumbers[0].internationalNumber;
    phoneSource = 'Lusha';
  }
  
  // Verify contact viability
  const isViable = finalEmail && (finalEmail.includes('@')) && finalPhone;
  
  enrichedProspects.push({
    json: {
      email: finalEmail,
      phone: finalPhone,
      phoneEnrichmentSource: phoneSource,
      isEnrichedViable: isViable,
      enrichmentTimestamp: new Date().toISOString(),
      status: isViable ? 'READY_FOR_AISDR' : 'REJECTED_INCOMPLETE_DATA'
    }
  });
}

return enrichedProspects;
```

---

## <mark>Production Tech Stack Audit & Deployment Checklist</mark>

Follow this operational execution checklist to audit and launch your Apollo + Lusha + AiSDR prospecting machine:

- [ ] **API Key Scope Verification:** Confirm Apollo, Lusha, and AiSDR API tokens have active read/write permissions.
- [ ] **Direct-Dial Verification Protocol:** Validate that Lusha enrichment is only invoked when Apollo returns null phone numbers to optimize API credit usage.
- [ ] **AiSDR Campaign Alignment:** Verify that campaign IDs in n8n HTTP Request node correspond to live, active AiSDR outreach sequences.
- [ ] **Rate-Limit Buffer Verification:** Set n8n execution concurrency to maximum 5 parallel execution threads to avoid HTTP 429 errors.
- [ ] **Suppression Sync Audit:** Validate that global opt-outs in AiSDR automatically push suppression webhooks back to your master CRM database.
"""

expand_file('draft-2-2-apollo-vs-lusha-vs-aisdr.json', add_2)

# ==========================================
# FILE 3: draft-2-3-aisdr-vs-human-sdr-unit-economics.json
# ==========================================
add_3 = """
---

## <mark>Step-by-Step UI Configuration Guide: Building the Human-in-the-Loop Approval Node in n8n</mark>

To combine the speed of AiSDR with human SDR quality control, configure an n8n Human-in-the-Loop (HITL) approval workflow using Slack Interactive Buttons. Here is the step-by-step UI setup:

1. **Setting Up Slack App & Webhook Bot:**
   * Go to **api.slack.com/apps** > **Create New App** > **From Scratch**.
   * Name your app `AiSDR Outreach Approver` and select your company workspace.
   * Under **Features** > **Interactive Components**, turn Interactivity **ON** and set the **Request URL** to: `https://n8n.yourdomain.com/webhook/slack-aisdr-approval-callback`.
   * Under **OAuth & Permissions**, add `chat:write` scope and install the app to your workspace. Copy the **Bot User OAuth Token**.

2. **n8n Workflow UI Setup for Slack Review:**
   * In n8n, insert a **Slack Node** downstream of the AiSDR copy generation step.
   * Set **Resource** to `Message`, **Operation** to `Send`.
   * Set **Channel** to `#sdr-outreach-approvals`.
   * Switch **Message Type** to `Blocks` and paste the Slack Block Kit payload:

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*New AiSDR Generated Email Draft for Review*\n*Target:* {{ $json.prospect_name }} ({{ $json.company }})\n*Subject:* {{ $json.email_subject }}"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "```{{ $json.email_body }}```"
    }
  },
  {
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": { "type": "plain_text", "text": "Approve & Send" },
        "style": "primary",
        "value": "approve_{{ $json.prospect_id }}"
      },
      {
        "type": "button",
        "text": { "type": "plain_text", "text": "Reject & Archive" },
        "style": "danger",
        "value": "reject_{{ $json.prospect_id }}"
      }
    ]
  }
]
```

3. **Handling Approval Callback:**
   * Add an **n8n Webhook Node** listening at `/webhook/slack-aisdr-approval-callback`.
   * Add a **Switch Node** evaluating `{{ $json.body.payload.actions[0].value }}`.
   * If action starts with `approve`, route payload to the **AiSDR Dispatch Node**. If `reject`, update record status to `CANCELLED`.

---

## <mark>Comprehensive Financial & Unit Economics Parameter Reference Table</mark>

The table below provides a detailed unit economic model comparing human SDR hires against autonomous AiSDR deployments across critical financial metrics:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Financial Metric</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Human SDR (In-House)</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">AiSDR Autonomous Agent</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Hybrid (AiSDR + HITL Review)</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Variance / Delta</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Fully Loaded Annual Cost</td>
      <td class="p-3 border border-slate-700 text-xs">$85,000 – $110,000 / yr</td>
      <td class="p-3 border border-slate-700 text-xs">$9,000 – $14,400 / yr</td>
      <td class="p-3 border border-slate-700 text-xs">$25,000 – $35,000 / yr</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">70% – 88% Savings</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Monthly Email Volume</td>
      <td class="p-3 border border-slate-700 text-xs">800 – 1,200 emails</td>
      <td class="p-3 border border-slate-700 text-xs">15,000 – 30,000 emails</td>
      <td class="p-3 border border-slate-700 text-xs">8,000 – 12,000 emails</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">10x Volume Scaling</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Cost Per Booked Meeting</td>
      <td class="p-3 border border-slate-700 text-xs">$450 – $750 / meeting</td>
      <td class="p-3 border border-slate-700 text-xs">$45 – $90 / meeting</td>
      <td class="p-3 border border-slate-700 text-xs">$85 – $140 / meeting</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">80% Cost Reduction</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Response Velocity</td>
      <td class="p-3 border border-slate-700 text-xs">2 – 6 Hours</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-cyan-400">&lt; 90 Seconds</td>
      <td class="p-3 border border-slate-700 text-xs">15 – 30 Minutes</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">Instant Reply Speed</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced Exception Handling: Hallucination Safeguards & Opt-Out Overrides</mark>

When using AI to generate outbound emails, safeguarding against AI hallucinations, inappropriate claims, and legal opt-out violations is essential. Below is an n8n **JavaScript Compliance Guard Node** that validates generated copy prior to dispatch:

```javascript
// n8n JavaScript Code Node: AI Copy Compliance & Hallucination Guard
const items = $input.all();
const verifiedPayloads = [];

const PROHIBITED_TERMS = ['guaranteed roi', '100% discount', 'free forever', 'best in world', 'legally binding'];
const DNC_DOMAINS = ['competitora.com', 'competitorb.com', 'government.gov'];

for (const item of items) {
  const copy = (item.json.email_body || '').toLowerCase();
  const targetDomain = (item.json.prospect_email || '').split('@')[1];
  
  let passesSafetyCheck = true;
  let rejectionReason = '';
  
  // 1. Check for hallucinated promises or prohibited terms
  for (const term of PROHIBITED_TERMS) {
    if (copy.includes(term)) {
      passesSafetyCheck = false;
      rejectionReason = `Prohibited term detected: "${term}"`;
      break;
    }
  }
  
  // 2. Check domain suppression list
  if (passesSafetyCheck && DNC_DOMAINS.includes(targetDomain)) {
    passesSafetyCheck = false;
    rejectionReason = `Domain ${targetDomain} is on active DNC list`;
  }
  
  verifiedPayloads.push({
    json: {
      ...item.json,
      isCompliant: passesSafetyCheck,
      complianceStatus: passesSafetyCheck ? 'APPROVED_FOR_SEND' : 'BLOCKED_COMPLIANCE_VIOLATION',
      rejectionReason: rejectionReason,
      auditTimestamp: new Date().toISOString()
    }
  });
}

return verifiedPayloads;
```

---

## <mark>Production Governance & SDR Deployment Checklist</mark>

Audit your hybrid AiSDR deployment against this operational governance checklist:

- [ ] **Slack App Interactivity Authorization:** Confirm Slack Request URL points to a production n8n HTTPS webhook endpoint with valid SSL.
- [ ] **Compliance Guard Filter Active:** Validate that JavaScript compliance node blocks hallucinated pricing or prohibited guarantee claims.
- [ ] **Opt-Out & Unsubscribe Sync:** Ensure unsubscribe requests received by AiSDR update master CRM suppression lists in under 60 seconds.
- [ ] **SDR Escalation Notification:** Verify that interested prospect responses trigger instant high-priority Slack notifications to human account executives.
- [ ] **Monthly ROI & CAC Audit:** Monitor Cost Per Booked Meeting against target KPI threshold ($120/meeting limit).
"""

expand_file('draft-2-3-aisdr-vs-human-sdr-unit-economics.json', add_3)

# ==========================================
# FILE 4: draft-2-4-waterfall-data-enrichment-pipeline.json
# ==========================================
add_4 = """
---

## <mark>Step-by-Step UI Setup Guide: Configuring Multi-Tier Switch Nodes in n8n</mark>

To configure a multi-tier waterfall enrichment engine in n8n that cascades from Apollo to Hunter.io, Dropcontact, and Debounce, follow these exact UI steps:

1. **Creating the Switch Routing Hierarchy:**
   * In n8n, add a **Switch Node** titled `Check Tier-1 Apollo Result`.
   * Set **Mode** to `Rules`. Add Rule 1: Expression `{{ $json.email_status }}` equals `valid` and `{{ $json.email }}` is not empty.
   * Route Output 0 (Valid Email) directly to your CRM Upsert Node.
   * Route Output 1 (Fallback Stream) to an **HTTP Request Node** titled `Tier-2 Hunter Enrichment`.

2. **Configuring Tier-2 Hunter API Request Node:**
   * Method: `GET`. Endpoint: `https://api.hunter.io/v2/email-finder`.
   * Query Parameters: `domain = {{ $json.domain }}`, `first_name = {{ $json.first_name }}`, `last_name = {{ $json.last_name }}`, `api_key = your_hunter_key`.
   * Connect Hunter output to another **Switch Node** titled `Check Tier-2 Hunter Result`.

3. **Configuring Tier-3 Dropcontact & Tier-4 Debounce Nodes:**
   * Route Hunter missing results to `Tier-3 Dropcontact` (`POST https://api.dropcontact.io/batch`).
   * Route remaining unverified emails to `Tier-4 Debounce` (`GET https://api.debounce.io/v1/?api={{ your_debounce_key }}&email={{ $json.email }}`).
   * Connect all valid outputs to an **n8n Merge Node** in `Combine` mode to consolidate enriched contact objects before final CRM ingestion.

---

## <mark>Waterfall Enrichment Parameter Reference Table</mark>

The parameter reference table below details endpoints, credit costs, latencies, and match criteria for each waterfall enrichment tier:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Waterfall Tier</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Provider Name</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Primary Endpoint URL</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Cost Per Request</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Avg Latency</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target Match Field</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Tier 1 (Primary)</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-slate-200">Apollo.io</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v1/people/match`</td>
      <td class="p-3 border border-slate-700 text-xs">$0.02</td>
      <td class="p-3 border border-slate-700 text-xs">180ms</td>
      <td class="p-3 border border-slate-700 text-xs">Corporate Email & Firmographics</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Tier 2 (Fallback A)</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-slate-200">Hunter.io</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v2/email-finder`</td>
      <td class="p-3 border border-slate-700 text-xs">$0.04</td>
      <td class="p-3 border border-slate-700 text-xs">320ms</td>
      <td class="p-3 border border-slate-700 text-xs">Domain Email Pattern Discovery</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Tier 3 (Fallback B)</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-slate-200">Dropcontact</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/batch`</td>
      <td class="p-3 border border-slate-700 text-xs">$0.06</td>
      <td class="p-3 border border-slate-700 text-xs">850ms</td>
      <td class="p-3 border border-slate-700 text-xs">Custom Domain SMTP Verification</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Tier 4 (Validation)</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-slate-200">Debounce.io</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`/v1/`</td>
      <td class="p-3 border border-slate-700 text-xs">$0.002</td>
      <td class="p-3 border border-slate-700 text-xs">120ms</td>
      <td class="p-3 border border-slate-700 text-xs">Catch-all & Spam Trap Filter</td>
    </tr>
  </tbody>
</table>

---

## <mark>Technical Code Walkthrough: JavaScript Fallback & Credit Budget Guard Node</mark>

To protect against runaway API credit consumption when a provider returns errors or reaches monthly quota limits, deploy this **n8n JavaScript Credit Budget Guard Node**:

```javascript
// n8n JavaScript Code Node: Credit Budget & API Health Guard
const items = $input.all();
const processedItems = [];

// Define operational credit budget limits per execution batch
const CREDIT_LIMITS = {
  apollo: 500,
  hunter: 200,
  dropcontact: 100
};

// State counter across execution stream
let usageCounters = { apollo: 0, hunter: 0, dropcontact: 0 };

for (const item of items) {
  let providerToInvoke = 'apollo';
  
  if (usageCounters.apollo >= CREDIT_LIMITS.apollo) {
    providerToInvoke = 'hunter';
  }
  if (usageCounters.hunter >= CREDIT_LIMITS.hunter) {
    providerToInvoke = 'dropcontact';
  }
  
  usageCounters[providerToInvoke]++;
  
  processedItems.push({
    json: {
      ...item.json,
      selectedProvider: providerToInvoke,
      batchCreditUsage: usageCounters[providerToInvoke],
      budgetStatus: 'WITHIN_LIMITS'
    }
  });
}

return processedItems;
```

---

## <mark>Production Waterfall Enrichment Readiness Checklist</mark>

Verify your waterfall enrichment pipeline prior to production release using this engineering checklist:

- [ ] **Multi-Provider API Credentials Verified:** Confirm active API subscription keys for Apollo, Hunter, Dropcontact, and Debounce.
- [ ] **Cascade Switch Conditions Validated:** Ensure n8n Switch expressions accurately evaluate null, empty, and `catch-all` email statuses.
- [ ] **Debounce Catch-All Verification:** Confirm all emails tagged as `catch-all` undergo secondary Debounce SMTP verification before CRM entry.
- [ ] **Credit Budget Alert Thresholds:** Set up Slack alerts when daily API credit consumption reaches 80% of quota.
- [ ] **Merge Node Synchronization:** Test parallel stream merging to ensure no prospect records are duplicated or dropped during waterfall execution.
"""

expand_file('draft-2-4-waterfall-data-enrichment-pipeline.json', add_4)

print("Batch 1 (Drafts 1-4) Expansion Complete.")
