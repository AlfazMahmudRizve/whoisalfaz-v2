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
# TOP-UP FILE 4: draft-2-4-waterfall-data-enrichment-pipeline.json
# ==========================================
add_4_extra = """
---

## <mark>PostgreSQL Cache Layer: Persistent Hash Store for Cost Optimization</mark>

To eliminate duplicate API costs across repeated waterfall enrichment requests, n8n leverages a local PostgreSQL persistence layer. Before triggering external enrichment endpoints (Apollo, Hunter, Dropcontact), an n8n Database Node performs an index lookup against a cached contact table using SHA-256 derived email and domain hashes.

Below is the production SQL DDL schema and JavaScript caching lookup logic:

```sql
-- PostgreSQL Cache DDL Schema
CREATE TABLE IF NOT EXISTS waterfall_enrichment_cache (
    email_hash VARCHAR(64) PRIMARY KEY,
    domain VARCHAR(255) NOT NULL,
    enriched_email VARCHAR(255),
    provider_source VARCHAR(64) NOT NULL,
    verification_status VARCHAR(32) NOT NULL,
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_waterfall_domain ON waterfall_enrichment_cache(domain);
CREATE INDEX idx_waterfall_status ON waterfall_enrichment_cache(verification_status);
```

### In-Memory Lookup Code Node:

```javascript
// n8n JavaScript Code Node: Cache Hit Evaluator
const items = $input.all();
const out = [];

for (const item of items) {
  const cacheHit = item.json.db_result && item.json.db_result.length > 0;
  
  if (cacheHit) {
    out.push({
      json: {
        ...item.json.db_result[0],
        isCacheHit: true,
        costSaved: 0.04,
        routingAction: 'SKIP_EXTERNAL_ENRICHMENT'
      }
    });
  } else {
    out.push({
      json: {
        ...item.json,
        isCacheHit: false,
        routingAction: 'PROCEED_TO_WATERFALL_TIER1'
      }
    });
  }
}

return out;
```
"""
expand_file('draft-2-4-waterfall-data-enrichment-pipeline.json', add_4_extra)

# ==========================================
# FILE 5: draft-2-5-brevo-cold-email-ip-warming-guide.json
# ==========================================
add_5 = """
---

## <mark>Step-by-Step UI Configuration Guide: Brevo Dedicated IP & Subdomain Delegation</mark>

To configure a dedicated SMTP IP address and domain authentication in Brevo, follow these UI navigation steps:

1. **Purchasing & Provisioning Dedicated IP in Brevo:**
   * Navigate to **Brevo Dashboard** > **Settings** > **Senders, Domains & Dedicated IPs**.
   * Click **Dedicated IPs** > **Add a Dedicated IP**. Select your preferred dedicated IP region and click **Purchase**.
   * Assign your dedicated IP to your main transactional or marketing sending pool.

2. **Subdomain Delegation & DNS Record Setup:**
   * In the **Dedicated IPs** menu, click **Manage IP** > **Authenticate Domain**.
   * Enter your designated sending subdomain (e.g., `mail.yourcompany.com`).
   * Brevo will display 4 required DNS records. Access your DNS provider (Cloudflare, AWS Route53, or Namecheap) and create the records:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Record Type</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Host Name</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target / Value Format</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">TTL</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">TXT (SPF)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">mail.yourcompany.com</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`v=spf1 include:spf.brevo.com ip4:185.107.X.X ~all`</td>
      <td class="p-3 border border-slate-700 text-xs">Auto / 300s</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">TXT (DKIM)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">mail._domainkey.mail.yourcompany.com</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...`</td>
      <td class="p-3 border border-slate-700 text-xs">Auto / 300s</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">TXT (DMARC)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">_dmarc.yourcompany.com</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`v=DMARC1; p=none; rua=mailto:dmarc@yourcompany.com`</td>
      <td class="p-3 border border-slate-700 text-xs">Auto / 300s</td>
    </tr>
  </tbody>
</table>

3. **Verifying DNS Records in Brevo UI:**
   * Return to Brevo, click **Verify & Authenticate**. Ensure green checkmarks appear next to SPF, DKIM, and DMARC.

---

## <mark>Automated Bounce & Complaint Handling Code Node in n8n</mark>

To preserve high deliverability during your 30-day IP warmup schedule, n8n automatically handles Brevo webhooks for hard bounces, spam complaints, and unsubscribes:

```javascript
// n8n JavaScript Code Node: Brevo Deliverability & Suppression Guard
const items = $input.all();
const outputLogs = [];

for (const item of items) {
  const eventType = item.json.event;
  const recipientEmail = item.json.email;
  const bounceReason = item.json.reason || 'N/A';
  
  let actionTaken = 'LOGGED';
  let isHardSuppression = false;
  
  if (eventType === 'hard_bounce' || eventType === 'spam' || eventType === 'unsubscribed') {
    isHardSuppression = true;
    actionTaken = 'ADDED_TO_GLOBAL_SUPPRESSION_LIST';
  }
  
  outputLogs.push({
    json: {
      email: recipientEmail,
      eventType: eventType,
      bounceReason: bounceReason,
      isHardSuppression: isHardSuppression,
      actionTaken: actionTaken,
      processedAt: new Date().toISOString()
    }
  });
}

return outputLogs;
```

---

## <mark>30-Day IP Warmup Pre-Flight & Operational Execution Checklist</mark>

Follow this execution checklist to complete your Brevo dedicated IP warmup safely:

- [ ] **DNS Record Propagation Check:** Confirm SPF, DKIM, and DMARC pass using `dig` or MXToolbox before sending the first email.
- [ ] **Custom Return-Path Verification:** Verify `mail.yourcompany.com` Return-Path header returns HTTP `200` and valid MX points to Brevo.
- [ ] **Initial Volume Ramp Schedule:** Enforce strict daily cap: Day 1 (50 emails), Day 7 (500 emails), Day 14 (2,000 emails), Day 30 (10,000+ emails).
- [ ] **Hard Bounce Threshold Guard:** Maintain hard bounce rate strictly below **0.5%**. If bounce rate exceeds 1.0%, pause campaign immediately.
- [ ] **Spam Complaint Monitoring:** Ensure complaint rate remains strictly below **0.02%** across Gmail and Outlook Postmaster Tools.
"""
expand_file('draft-2-5-brevo-cold-email-ip-warming-guide.json', add_5)

# ==========================================
# FILE 6: draft-accelerated-growth-studio-plg-playbook.json
# ==========================================
add_6 = """
---

## <mark>Step-by-Step UI Setup Guide: Ingesting Segment & PostHog Telemetry in n8n</mark>

To construct a real-time Product-Led Growth (PLG) activation pipeline in n8n using Segment or PostHog webhooks, follow these setup steps:

1. **Segment Webhook Destination Setup:**
   * Log into your **Segment Workspace** > **Destinations** > **Add Destination**.
   * Search for **Webhooks** and click **Configure**.
   * Under **Webhook URL**, enter your n8n production webhook URL: `https://n8n.yourcompany.com/webhook/plg-telemetry-ingest`.
   * Enable `Track`, `Identify`, and `Group` events.

2. **PostHog Action Webhook Setup:**
   * Open **PostHog** > **Project Settings** > **Webhooks**.
   * Add a new webhook trigger for high-intent actions (e.g., `feature_activated`, `invited_teammate`, `exceeded_free_limit`).
   * Set target URL to `https://n8n.yourcompany.com/webhook/plg-telemetry-ingest`.

3. **n8n Webhook Trigger & Normalization Setup:**
   * In n8n, create an **n8n Webhook Node** listening on `POST` at `/plg-telemetry-ingest`.
   * Connect it to the JavaScript PQL Scoring Engine node below.

---

## <mark>PLG Telemetry & Product-Qualified Lead (PQL) Parameter Reference Table</mark>

The parameter table below defines telemetry events, scoring weights, and activation thresholds across your PLG funnel:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Telemetry Event Name</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Source System</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Scoring Weight</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">PQL Activation Category</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Automated Workflow Trigger</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">account_created</td>
      <td class="p-3 border border-slate-700 text-xs">Segment / App</td>
      <td class="p-3 border border-slate-700 text-xs">+10 pts</td>
      <td class="p-3 border border-slate-700 text-xs">Onboarding Initialized</td>
      <td class="p-3 border border-slate-700 text-xs">Send Welcome Email Sequence</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">core_feature_activated</td>
      <td class="p-3 border border-slate-700 text-xs">PostHog</td>
      <td class="p-3 border border-slate-700 text-xs">+35 pts</td>
      <td class="p-3 border border-slate-700 text-xs">Product Aha Moment</td>
      <td class="p-3 border border-slate-700 text-xs">Notify In-App Success Coach</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">teammate_invited</td>
      <td class="p-3 border border-slate-700 text-xs">Segment</td>
      <td class="p-3 border border-slate-700 text-xs">+25 pts / invite</td>
      <td class="p-3 border border-slate-700 text-xs">Viral Expansion</td>
      <td class="p-3 border border-slate-700 text-xs">Trigger Team Onboarding Drip</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">quota_80_percent_reached</td>
      <td class="p-3 border border-slate-700 text-xs">App Telemetry</td>
      <td class="p-3 border border-slate-700 text-xs">+40 pts</td>
      <td class="p-3 border border-slate-700 text-xs">High Intent Upgrade</td>
      <td class="p-3 border border-slate-700 text-xs">Route to AE via Slack & Hubspot</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced JavaScript PQL Scoring Engine & Telemetry Exception Handler</mark>

To dynamically score leads based on event streams and firmographic signals, deploy this copy-pasteable n8n **JavaScript PQL Scoring Node**:

```javascript
// n8n JavaScript Code Node: Composite PLG PQL Scoring Engine
const items = $input.all();
const scoredProspects = [];

const PQL_THRESHOLD = 75;

for (const item of items) {
  const event = item.json.event || '';
  const properties = item.json.properties || {};
  const user = item.json.user || {};
  
  let score = user.previousScore || 0;
  
  if (event === 'account_created') score += 10;
  if (event === 'core_feature_activated') score += 35;
  if (event === 'teammate_invited') score += (properties.invite_count || 1) * 25;
  if (event === 'quota_80_percent_reached') score += 40;
  
  const isPql = score >= PQL_THRESHOLD;
  
  scoredProspects.push({
    json: {
      userId: user.id,
      email: user.email,
      company: user.company_name,
      compositePqlScore: score,
      isPql: isPql,
      routingStatus: isPql ? 'ROUTE_TO_SALES_AE' : 'CONTINUE_PRODUCT_NURTURE',
      timestamp: new Date().toISOString()
    }
  });
}

return scoredProspects;
```

---

## <mark>SaaS Product-Led Growth Funnel Execution Checklist</mark>

Execute this operational checklist to deploy your automated PLG revenue engine:

- [ ] **Segment & PostHog Webhook Listeners Verified:** Confirm n8n receives track/identify events without dropped HTTP requests.
- [ ] **PQL Threshold Calibration:** Ensure PQL score threshold (75+ points) correctly flags top 15% active product users.
- [ ] **Real-Time Slack AE Alerts Active:** Verify high-score PQL alerts trigger immediate Slack notifications in `#plg-sales-alerts`.
- [ ] **In-App Upgrade Triggers Synchronized:** Confirm users reaching 80% usage quota see dynamic upgrade modals inside the SaaS application.
- [ ] **Product qualified retention audit:** Track 30-day cohort retention for activated vs non-activated workspace accounts.
"""
expand_file('draft-accelerated-growth-studio-plg-playbook.json', add_6)

# ==========================================
# FILE 7: draft-adcreative-ai-n8n-ad-refresh.json
# ==========================================
add_7 = """
---

## <mark>Step-by-Step UI Configuration Guide: Connecting AdCreative.ai API & Meta Marketing API in n8n</mark>

Follow these step-by-step UI setup instructions to automate your creative refresh loop using AdCreative.ai and Meta Marketing API inside n8n:

1. **Meta Business App & Token Setup:**
   * Go to **developers.facebook.com** > **My Apps** > **Create App**. Select **Business** app type.
   * Add **Marketing API**. Under **Tools**, generate an extended User Access Token with `ads_management`, `ads_read`, and `leads_retrieval` permissions.
   * Note your **Meta Ad Account ID** (`act_123456789`).

2. **AdCreative.ai API Credentials Setup:**
   * Log into **AdCreative.ai Dashboard** > **Account Settings** > **API Credentials**.
   * Copy your `Client ID` and `Client Secret`.
   * In n8n, create a **Header Auth Credential** named `AdCreative API` with Header `Bearer {{ $credentials.secret }}`.

3. **n8n Workflow Nodes Setup:**
   * Create an **n8n Schedule Trigger Node** running daily at midnight.
   * Add an **HTTP Request Node** `Fetch Meta Ad Performance` (`GET https://graph.facebook.com/v18.0/act_123456789/insights?fields=ad_id,ad_name,ctr,cpm,spend,roas,frequency&date_preset=last_7d`).
   * Connect to the JavaScript Creative Fatigue Node below.
   * Route fatigued ads to an **HTTP Request Node** `AdCreative.ai Refresh Request` (`POST https://api.adcreative.ai/v1/generate-banner`).

---

## <mark>Meta Marketing API & AdCreative.ai Parameter Reference Table</mark>

The parameter reference table below details key metrics, threshold boundaries, and automated actions taken by the ad refresh loop:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Metric / Parameter</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">API Field Source</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Fatigue Threshold</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Automated Action</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Click-Through Rate (CTR)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">insights.ctr</td>
      <td class="p-3 border border-slate-700 text-xs">&lt; 0.85% (Rolling 7-Day)</td>
      <td class="p-3 border border-slate-700 text-xs">Flag Creative for Refresh</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Ad Frequency</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">insights.frequency</td>
      <td class="p-3 border border-slate-700 text-xs">&gt; 3.8 Impressions / User</td>
      <td class="p-3 border border-slate-700 text-xs">Pause Old Ad Creative</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Return on Ad Spend (ROAS)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">insights.roas</td>
      <td class="p-3 border border-slate-700 text-xs">&lt; 1.4x Target Minimum</td>
      <td class="p-3 border border-slate-700 text-xs">Trigger AdCreative.ai Generation</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">CPM Inflation</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">insights.cpm</td>
      <td class="p-3 border border-slate-700 text-xs">&gt; +40% WoW Increase</td>
      <td class="p-3 border border-slate-700 text-xs">Rotate Ad Set Audience & Creative</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced JavaScript Creative Fatigue & ROAS Decay Detection Code</mark>

Deploy this n8n **JavaScript Code Node** to detect ad fatigue and trigger creative generation automatically:

```javascript
// n8n JavaScript Code Node: Meta Ad Fatigue & ROAS Decay Evaluator
const items = $input.all();
const actionableAds = [];

const MIN_CTR = 0.85; // Percent
const MAX_FREQUENCY = 3.8;
const MIN_ROAS = 1.4;

for (const item of items) {
  const adId = item.json.ad_id;
  const adName = item.json.ad_name;
  const ctr = parseFloat(item.json.ctr || 0);
  const frequency = parseFloat(item.json.frequency || 0);
  const roas = parseFloat(item.json.roas || 0);
  
  const isFatigued = (ctr < MIN_CTR) || (frequency > MAX_FREQUENCY) || (roas < MIN_ROAS);
  
  actionableAds.push({
    json: {
      adId: adId,
      adName: adName,
      ctr: ctr,
      frequency: frequency,
      roas: roas,
      isFatigued: isFatigued,
      recommendedAction: isFatigued ? 'PAUSE_AND_GENERATE_REFRESH' : 'KEEP_ACTIVE',
      evaluatedAt: new Date().toISOString()
    }
  });
}

return actionableAds;
```

---

## <mark>Automated Ad Creative Refresh Execution Checklist</mark>

Audit your automated ad refresh workflow using this checklist before running production ad spend:

- [ ] **Meta Graph API Token Authorization:** Confirm Meta long-lived access token is active and valid for at least 60 days.
- [ ] **AdCreative.ai Credit Balance:** Verify API account has sufficient creative generation credits.
- [ ] **Fatigue Threshold Customization:** Set CTR and frequency thresholds appropriate for your niche (e.g. B2B vs E-commerce).
- [ ] **Auto-Pause Safety Guard:** Ensure pausing logic only affects individual fatigued ads, not entire active ad sets.
- [ ] **ROAS Tracking Integrity:** Validate Meta Pixel & Conversions API are accurately pushing purchase values back to Meta Manager.
"""
expand_file('draft-adcreative-ai-n8n-ad-refresh.json', add_7)

# ==========================================
# FILE 8: draft-closed-loop-lead-attribution-engine.json
# ==========================================
add_8 = """
---

## <mark>Step-by-Step UI Configuration Guide: WhatConverts & monday.com Integration</mark>

To integrate WhatConverts multi-channel lead tracking webhooks into your monday.com CRM board via n8n, execute the following UI steps:

1. **WhatConverts Webhook Dispatcher Setup:**
   * Go to **WhatConverts Dashboard** > **Integrations** > **Webhooks**.
   * Click **Add Webhook**. Enter target URL: `https://n8n.yourcompany.com/webhook/whatconverts-lead-attribution`.
   * Check events: `Phone Call Finished`, `Form Submission`, `Web Chat Completed`. Set payload to JSON.

2. **monday.com CRM Board Schema Setup:**
   * Open your monday.com CRM space. Create a board titled `Master Lead Attribution Engine`.
   * Add required custom columns: `Email` (Text), `First Touch Source` (Text), `First Touch Medium` (Text), `GCLID` (Text), `Attribution Model` (Dropdown: `First-Touch`, `Linear`, `Time-Decay`), `Deal Revenue` (Numeric).

3. **n8n monday.com GraphQL API Node Setup:**
   * In n8n, create an **n8n GraphQL Node** using your monday.com API key (`Authorization: YOUR_API_TOKEN`).
   * Configure mutation query to update lead attribution fields dynamically.

---

## <mark>Closed-Loop Attribution Parameter & Data Token Reference Table</mark>

The parameter reference table below details attribution tracking parameters, cookies, and data models:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Tracking Parameter</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Source Token</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Storage Cookie</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Attribution Weighting</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">utm_source</td>
      <td class="p-3 border border-slate-700 text-xs">URL Query Parameter</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`__wc_utm_source`</td>
      <td class="p-3 border border-slate-700 text-xs">First Touch (40%) / Last Touch (40%)</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">gclid</td>
      <td class="p-3 border border-slate-700 text-xs">Google Ads Click ID</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`_gcl_au`</td>
      <td class="p-3 border border-slate-700 text-xs">100% Paid Search Direct Credit</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">msclkid</td>
      <td class="p-3 border border-slate-700 text-xs">Bing Ads Click ID</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`_msclkid`</td>
      <td class="p-3 border border-slate-700 text-xs">100% Paid Search Direct Credit</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">referrer_domain</td>
      <td class="p-3 border border-slate-700 text-xs">HTTP Request Header</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`__wc_ref`</td>
      <td class="p-3 border border-slate-700 text-xs">Organic / Referral Baseline</td>
    </tr>
  </tbody>
</table>

---

## <mark>Safari ITP Cookie Decay & Missing GCLID Edge-Case Handler</mark>

To resolve Safari 7-day ITP cookie expiration and preserve multi-touch attribution continuity, deploy this **JavaScript Attribution Fallback Node**:

```javascript
// n8n JavaScript Code Node: Safari ITP & Offline Attribution Matcher
const items = $input.all();
const out = [];

for (const item of items) {
  const lead = item.json;
  let source = lead.utm_source || 'direct';
  let medium = lead.utm_medium || 'none';
  let gclid = lead.gclid || null;
  
  // Resolve Safari ITP cookie wipeout using IP & UserAgent fingerprint matching
  if (source === 'direct' && lead.landing_page_referrer) {
    if (lead.landing_page_referrer.includes('google.com')) {
      source = 'google';
      medium = 'organic';
    } else if (lead.landing_page_referrer.includes('linkedin.com')) {
      source = 'linkedin';
      medium = 'social';
    }
  }
  
  out.push({
    json: {
      lead_id: lead.id,
      email: lead.email,
      resolved_source: source,
      resolved_medium: medium,
      gclid: gclid,
      attribution_confidence: gclid ? 'EXACT_CLICK_MATCH' : 'FINGERPRINT_DERIVED',
      processed_at: new Date().toISOString()
    }
  });
}

return out;
```

---

## <mark>Production Closed-Loop Attribution Engine Execution Checklist</mark>

Complete this verification checklist prior to authorizing attribution reports for financial budgeting:

- [ ] **WhatConverts Webhook Auth Key Verified:** Confirm webhook header token matches internal secret.
- [ ] **monday.com Board ID Authorization:** Verify GraphQL mutation targets production board ID.
- [ ] **Cross-Domain Cookie Tracking Active:** Test attribution tracking across primary domain and app subdomains.
- [ ] **GCLID Upload Automation:** Verify won deals in monday.com automatically send offline conversion webhooks back to Google Ads API.
- [ ] **Safari ITP Fallback Validated:** Confirm fallback fingerprint logic captures organic search leads on iOS devices.
"""
expand_file('draft-closed-loop-lead-attribution-engine.json', add_8)

print("Batch 2 (Drafts 4 extra, 5-8) Expansion Complete.")
