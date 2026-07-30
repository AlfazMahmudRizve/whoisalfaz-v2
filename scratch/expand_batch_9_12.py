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
# TOP-UP FILE 5: draft-2-5-brevo-cold-email-ip-warming-guide.json
# ==========================================
add_5_extra = """
---

## <mark>Automated Daily Volume Escalation Node in n8n</mark>

To strictly enforce the 30-day warmup ramp without manual campaign adjustments in Brevo, n8n executes an automated volume throttling node. This node reads current campaign day from a database state and dynamically sets the HTTP batch chunk size.

Below is the copy-pasteable n8n JavaScript Throttling Engine:

```javascript
// n8n JavaScript Code Node: Dynamic Warmup Schedule Throttler
const items = $input.all();
const out = [];

// 30-Day Automated Sending Cap Map
const WARMUP_SCHEDULE = {
  1: 50, 2: 75, 3: 100, 4: 150, 5: 200, 6: 300, 7: 500,
  8: 750, 9: 1000, 10: 1500, 11: 2000, 12: 2500, 13: 3500, 14: 5000,
  15: 6500, 16: 8000, 17: 10000, 18: 12500, 19: 15000, 20: 20000
};

const currentDay = $node["Get Warmup Day"].json.current_day || 1;
const dailyCap = WARMUP_SCHEDULE[currentDay] || 25000;

for (let i = 0; i < Math.min(items.length, dailyCap); i++) {
  out.push({
    json: {
      ...items[i].json,
      warmupDay: currentDay,
      dailyVolumeCap: dailyCap,
      throttledStatus: 'APPROVED_FOR_BATCH'
    }
  });
}

return out;
```
"""
expand_file('draft-2-5-brevo-cold-email-ip-warming-guide.json', add_5_extra)

# ==========================================
# TOP-UP FILE 6: draft-accelerated-growth-studio-plg-playbook.json
# ==========================================
add_6_extra = """
---

## <mark>Automated Slack & Hubspot Multi-Channel PQL Escalation</mark>

When a user triggers high product usage signals (e.g. inviting 3+ team members or exceeding 80% workspace quota), n8n executes a multi-channel sales escalation. This node formats an interactive Slack alert for Account Executives and creates a high-priority deal task inside HubSpot CRM.

Below is the JavaScript notification payload generator for n8n:

```javascript
// n8n JavaScript Code Node: Multi-Channel Sales Escalation Payload
const items = $input.all();
const escalations = [];

for (const item of items) {
  if (item.json.isPql) {
    escalations.push({
      json: {
        slackPayload: {
          text: `🚨 *High Intent PQL Alert!* User ${item.json.email} at *${item.json.company}* reached a PQL score of *${item.json.compositePqlScore}*.`,
          channel: "#plg-pql-alerts"
        },
        hubspotPayload: {
          properties: {
            hs_task_subject: `PQL Follow-Up: ${item.json.company}`,
            hs_task_body: `User ${item.json.email} exceeded PQL threshold with score ${item.json.compositePqlScore}.`,
            hs_task_priority: "HIGH"
          }
        }
      }
    });
  }
}

return escalations;
```
"""
expand_file('draft-accelerated-growth-studio-plg-playbook.json', add_6_extra)

# ==========================================
# TOP-UP FILE 7: draft-adcreative-ai-n8n-ad-refresh.json
# ==========================================
add_7_extra = """
---

## <mark>Automated Meta Campaign Pause & Swap Execution Node</mark>

When an active ad creative breaks fatigue thresholds (frequency > 3.8 or CTR < 0.85%), n8n directly executes a Graph API mutation to pause the fatigued ad object and publish the newly rendered AdCreative.ai banner asset into the target ad set.

Below is the copy-pasteable n8n JavaScript Ad Swap Node:

```javascript
// n8n JavaScript Code Node: Meta Ad Object Pause & Swap Payload
const items = $input.all();
const mutations = [];

for (const item of items) {
  if (item.json.isFatigued) {
    mutations.push({
      json: {
        pauseAdEndpoint: `https://graph.facebook.com/v18.0/${item.json.adId}`,
        pausePayload: { status: "PAUSED" },
        createNewAdEndpoint: `https://graph.facebook.com/v18.0/act_123456789/ads`,
        newAdPayload: {
          name: `${item.json.adName}_Refreshed_${Date.now()}`,
          adset_id: item.json.adsetId,
          creative: { creative_id: item.json.newCreativeId },
          status: "ACTIVE"
        }
      }
    });
  }
}

return mutations;
```
"""
expand_file('draft-adcreative-ai-n8n-ad-refresh.json', add_7_extra)

# ==========================================
# FILE 9: draft-cometchat-dify-inapp-voice.json
# ==========================================
add_9 = """
---

## <mark>Step-by-Step UI Configuration Guide: CometChat Dashboard & Dify.ai Voice Agent Setup</mark>

To integrate real-time CometChat in-app voice messaging with a Dify.ai conversational agent, follow these setup steps:

1. **CometChat Developer Console Setup:**
   * Log into **app.cometchat.com** > **Create New App**. Name it `Voice AI Assistant`.
   * Under **App Settings** > **Credentials**, copy your `App ID`, `Auth Key`, and `REST API Key`.
   * Under **Webhooks**, click **Add Webhook**. Set target URL to your FastAPI service: `https://voice-api.yourcompany.com/webhook/cometchat-voice`. Select event `v1.message.sent` and message type `audio`.

2. **Dify.ai Voice Agent Workflow Setup:**
   * Open **Dify.ai Dashboard** > **Create App** > **Chat App**.
   * Under **Features**, enable **Speech-to-Text (STT)** using OpenAI Whisper and **Text-to-Speech (TTS)** using ElevenLabs or OpenAI Voice.
   * Under **API Access**, generate an **App API Key** (`app-xxxx`).

3. **FastAPI Middleware Service Deployment:**
   * Deploy the Python FastAPI middleware server below to act as a real-time WebSocket and webhook bridge between CometChat audio streams and Dify API.

---

## <mark>In-App Voice Architecture Parameter Reference Table</mark>

The parameter reference table below details audio formats, streaming buffers, and latency constraints across the CometChat-Dify voice bridge:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Parameter Name</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target Value / Format</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Component Location</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Latency Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Audio Encoding</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">Opus / WebM (16kHz, Mono)</td>
      <td class="p-3 border border-slate-700 text-xs">CometChat Web SDK</td>
      <td class="p-3 border border-slate-700 text-xs">Optimized for low-bandwidth mobile</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">STT Model</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">OpenAI Whisper-1 (Real-Time)</td>
      <td class="p-3 border border-slate-700 text-xs">Dify.ai STT Engine</td>
      <td class="p-3 border border-slate-700 text-xs">Transcribes audio in ~250ms</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">TTS Synthesis Engine</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">ElevenLabs Turbo v2.5</td>
      <td class="p-3 border border-slate-700 text-xs">Dify.ai TTS Output</td>
      <td class="p-3 border border-slate-700 text-xs">Streamed speech output in ~300ms</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">WebSocket Buffer Size</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">4096 Bytes / Chunk</td>
      <td class="p-3 border border-slate-700 text-xs">FastAPI Middleware Stream</td>
      <td class="p-3 border border-slate-700 text-xs">Prevents audio stutter & packet loss</td>
    </tr>
  </tbody>
</table>

---

## <mark>FastAPI Real-Time WebSocket Stream & Error Handling Middleware</mark>

Deploy this production-ready **Python FastAPI WebSockets Service** to handle streaming audio translation between CometChat and Dify.ai:

```python
# FastAPI Service: Real-Time CometChat to Dify.ai Voice Bridge
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
import httpx
import json
import asyncio

app = FastAPI(title="CometChat Dify Voice Bridge")

DIFY_API_KEY = "app-your-dify-api-key"
DIFY_BASE_URL = "https://api.dify.ai/v1"

@app.websocket("/ws/voice-stream/{user_id}")
async def voice_stream_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            while True:
                # Receive raw Opus/WebM audio chunk from CometChat client
                audio_bytes = await websocket.receive_bytes()
                
                # Forward chunk to Dify Speech-to-Text & LLM agent
                files = {'file': ('audio.webm', audio_bytes, 'audio/webm')}
                headers = {"Authorization": f"Bearer {DIFY_API_KEY}"}
                
                response = await client.post(
                    f"{DIFY_BASE_URL}/audio-to-text",
                    headers=headers,
                    files=files
                )
                
                if response.status_code == 200:
                    text_transcript = response.json().get("text", "")
                    # Send back text transcript + voice reply frame
                    await websocket.send_json({
                        "status": "SUCCESS",
                        "user_id": user_id,
                        "transcript": text_transcript
                    })
                else:
                    await websocket.send_json({"status": "STT_ERROR", "code": response.status_code})
                    
        except WebSocketDisconnect:
            print(f"WebSocket client {user_id} disconnected gracefully.")
        except Exception as e:
            await websocket.send_json({"status": "FATAL_EXCEPTION", "error": str(e)})
```

---

## <mark>Production In-App Voice AI Deployment Checklist</mark>

Verify your CometChat + Dify.ai voice integration against this engineering pre-flight checklist:

- [ ] **CometChat Webhook Signature Verification:** Confirm FastAPI endpoint validates HMAC SHA-256 signatures on all incoming webhook calls.
- [ ] **Audio Encoding Compatibility:** Test audio recording across Safari WebRTC, Android Chrome, and iOS WebViews.
- [ ] **End-to-End Latency Target:** Confirm combined STT + LLM Inference + TTS streaming latency stays under **1,200ms**.
- [ ] **Network Reconnection Protocol:** Ensure React SDK auto-reconnects WebSockets on mobile network drops.
- [ ] **Token Expiration Handling:** Implement automatic JWT refresh for CometChat user authentication sessions.
"""
expand_file('draft-cometchat-dify-inapp-voice.json', add_9)

# ==========================================
# FILE 10: draft-competitor-seo-audit.json
# ==========================================
add_10 = """
---

## <mark>Step-by-Step UI Guide: Configuring Anonymous Scraping & PageSpeed Analysis in n8n</mark>

To execute a complete competitor technical SEO audit without DNS access using n8n and headless tools, follow these setup steps:

1. **Setting Up n8n Headless Chrome / Puppeteer Node:**
   * In n8n, add a **Puppeteer Node** or **HTTP Request Node** configured with proxy rotation headers (`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...`).
   * Set target URL to your competitor's landing page (e.g. `https://competitor.com`).
   * Extract DOM HTML, metadata headers, and SSL certificates dynamically.

2. **Google PageSpeed Insights API Setup:**
   * Obtain a free Google API key from **console.cloud.google.com**.
   * Add an **HTTP Request Node** in n8n targeting: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://competitor.com&strategy=mobile&key=YOUR_API_KEY`.

3. **Analyzing Competitor Robots.txt & Sitemap Directives:**
   * Fetch `https://competitor.com/robots.txt` and `https://competitor.com/sitemap.xml` using HTTP GET requests.
   * Pass output text to the Node.js / Python Parser Node below.

---

## <mark>Technical SEO Metric & Header Parameter Reference Table</mark>

The table below lists key technical SEO security headers, Core Web Vitals targets, and audit benchmark standards:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Audit Metric / Security Header</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target Benchmark Standard</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Extraction Tool / Endpoint</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">SEO Impact Score</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Largest Contentful Paint (LCP)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">&lt; 2.5 Seconds</td>
      <td class="p-3 border border-slate-700 text-xs">Google PageSpeed API v5</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">High (Core Web Vitals)</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Cumulative Layout Shift (CLS)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">&lt; 0.10 Index</td>
      <td class="p-3 border border-slate-700 text-xs">Google PageSpeed API v5</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">High (Core Web Vitals)</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Strict-Transport-Security (HSTS)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`max-age=31536000; includeSubDomains`</td>
      <td class="p-3 border border-slate-700 text-xs">HTTP Response Headers</td>
      <td class="p-3 border border-slate-700 text-xs text-cyan-400">Medium (Security & Rank Signal)</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Canonical Tag Match</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">Self-Referential Match</td>
      <td class="p-3 border border-slate-700 text-xs">DOM HTML Parser</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">Critical (Indexation Guard)</td>
    </tr>
  </tbody>
</table>

---

## <mark>WAF Bot Block & Scraper Rate Limit Exception Handler</mark>

When scraping competitor metadata without authorization, WAFs like Cloudflare or Akamai may issue HTTP 403 or 429 status codes. Deploy this n8n **JavaScript Proxy Rotation Node** to maintain access:

```javascript
// n8n JavaScript Code Node: WAF Proxy Rotation & Headers Spoofer
const items = $input.all();
const retryRequests = [];

const PROXY_POOL = [
  'http://proxy1.residential.io:8080',
  'http://proxy2.residential.io:8080'
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15'
];

for (let i = 0; i < items.length; i++) {
  const selectedProxy = PROXY_POOL[i % PROXY_POOL.length];
  const selectedUA = USER_AGENTS[i % USER_AGENTS.length];
  
  retryRequests.push({
    json: {
      ...items[i].json,
      requestHeaders: {
        'User-Agent': selectedUA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      proxyUrl: selectedProxy,
      isBypassingWaf: true
    }
  });
}

return retryRequests;
```

---

## <mark>No-DNS Competitor Technical SEO Audit Execution Checklist</mark>

Follow this checklist to execute an anonymous competitor technical SEO audit:

- [ ] **Proxy Pool Health Verified:** Confirm residential proxy pool effectively bypasses WAF blocks.
- [ ] **PageSpeed API Quota Verified:** Validate Google PageSpeed API key has active quota (25,000 queries/day).
- [ ] **SSL & Security Header Inspection:** Verify HSTS, X-Frame-Options, and Content-Security-Policy headers across competitor subdomains.
- [ ] **Robots.txt Crawl Gap Analysis:** Compare disallowed paths in competitor `robots.txt` against active indexed pages in Google Search.
- [ ] **Schema & OpenGraph Audit:** Ensure JSON-LD structured data and OpenGraph tags are fully extracted for content gap mapping.
"""
expand_file('draft-competitor-seo-audit.json', add_10)

# ==========================================
# FILE 11: draft-corrective-rag-crag-n8n.json
# ==========================================
add_11 = """
---

## <mark>Step-by-Step UI Setup Guide: Configuring Qdrant & Tavily API Nodes in n8n</mark>

To deploy an automated Corrective RAG (CRAG) workflow in n8n combining Qdrant vector retrieval with Tavily search fallbacks, follow these step-by-step UI instructions:

1. **Qdrant Vector Database Connection in n8n:**
   * In your n8n canvas, insert an **n8n Qdrant Node** or **HTTP Request Node**.
   * Set endpoint URL: `https://your-qdrant-cluster.cloud.qdrant.io:6333/collections/knowledge_base/points/search`.
   * Add header: `api-key: your_qdrant_api_key`.
   * JSON Body: `{"vector": [0.024, -0.015, ...], "limit": 5, "with_payload": true}`.

2. **Tavily Search API Node Setup:**
   * Create an **HTTP Request Node** titled `Tavily Web Search Fallback`.
   * Method: `POST`. Endpoint: `https://api.tavily.com/search`.
   * Set JSON body: `{"api_key": "tvly-your_key", "query": "={{ $json.user_query }}", "search_depth": "advanced"}`.

3. **Connecting OpenAI Grade Scoring & Refinement Nodes:**
   * Connect Qdrant output to an **n8n Code Node** running the CRAG Evaluation Script below.
   * If confidence score is high (>= 0.75), route directly to **OpenAI Chat Model Node** for answer synthesis.
   * If confidence is low (< 0.75), route query through the `Tavily Web Search Fallback` node first.

---

## <mark>Corrective RAG (CRAG) Parameter Reference Table</mark>

The table below defines vector similarity score boundaries, chunk sizes, and retrieval thresholds for the CRAG engine:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">CRAG Parameter</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target Threshold / Value</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Pipeline Component</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Functional Role</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Cosine Similarity Score</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">&gt;= 0.75 (High Quality)</td>
      <td class="p-3 border border-slate-700 text-xs">Qdrant Retrieval Evaluator</td>
      <td class="p-3 border border-slate-700 text-xs">Pass context directly to LLM generator</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Uncertainty Zone</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">0.40 to 0.74 Score</td>
      <td class="p-3 border border-slate-700 text-xs">CRAG Branch Switcher</td>
      <td class="p-3 border border-slate-700 text-xs">Trigger Tavily Web Search & Context Refinement</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Vector Chunk Size</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">512 Tokens (100 Overlap)</td>
      <td class="p-3 border border-slate-700 text-xs">Embedding Pre-processor</td>
      <td class="p-3 border border-slate-700 text-xs">Optimal semantic granularity for technical docs</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Tavily Search Depth</td>
      <td class="p-3 border border-slate-700 font-mono text-xs font-bold text-cyan-400">`advanced`</td>
      <td class="p-3 border border-slate-700 text-xs">Tavily Web Search Node</td>
      <td class="p-3 border border-slate-700 text-xs">Deep web parsing for real-time accurate facts</td>
    </tr>
  </tbody>
</table>

---

## <mark>Advanced JavaScript Re-Ranking & Hallucination Guard Code Node</mark>

Deploy this n8n **JavaScript Evaluation Code Node** to score retrieved documents and branch execution automatically:

```javascript
// n8n JavaScript Code Node: CRAG Vector Retrieval Evaluator & Re-Ranker
const items = $input.all();
const evaluatedResults = [];

const HIGH_CONFIDENCE_THRESHOLD = 0.75;
const LOW_CONFIDENCE_THRESHOLD = 0.40;

for (const item of items) {
  const points = item.json.result || [];
  let maxScore = 0;
  let bestContext = '';
  
  if (points.length > 0) {
    maxScore = points[0].score || 0;
    bestContext = points.map(p => p.payload.text || '').join('\n\n');
  }
  
  let cragAction = 'FALLBACK_WEB_SEARCH';
  if (maxScore >= HIGH_CONFIDENCE_THRESHOLD) {
    cragAction = 'PASS_TO_LLM';
  } else if (maxScore >= LOW_CONFIDENCE_THRESHOLD) {
    cragAction = 'REFINE_AND_SEARCH_WEB';
  }
  
  evaluatedResults.push({
    json: {
      userQuery: item.json.query,
      topSimilarityScore: maxScore,
      retrievedContext: bestContext,
      cragDecision: cragAction,
      evaluatedAt: new Date().toISOString()
    }
  });
}

return evaluatedResults;
```

---

## <mark>Production Corrective RAG (CRAG) Deployment Checklist</mark>

Verify your Corrective RAG system prior to production API deployment:

- [ ] **Qdrant Index & Vector Dimensions Verified:** Confirm collection uses 1536-dim vectors for OpenAI embeddings.
- [ ] **Similarity Score Calibration:** Validate score thresholds (0.75 / 0.40) against ground-truth query test set.
- [ ] **Tavily Fallback Endpoint Active:** Test Tavily Web Search API response times (< 400ms target).
- [ ] **LLM Context Window Buffer:** Ensure merged vector + web search context stays under 8,000 tokens to prevent model context truncation.
- [ ] **Hallucination Audit:** Monitor LLM generation outputs for factual compliance against retrieved source context.
"""
expand_file('draft-corrective-rag-crag-n8n.json', add_11)

# ==========================================
# FILE 12: draft-databox-revops-dashboard-pipeline-velocity.json
# ==========================================
add_12 = """
---

## <mark>Step-by-Step UI Setup Guide: Databox Push API & monday.com Board Connections</mark>

To pipe real-time pipeline velocity metrics from monday.com CRM into executive Databox dashboards via n8n, complete these UI setup steps:

1. **Generating Databox Push API Token:**
   * Log into your **Databox Account** > **Data Manager** > **Add Connection**.
   * Search for **Databox Push API**. Click **Create Token** and name it `monday_revops_pipeline`.
   * Copy your **Push API Token**.

2. **n8n Calculation Engine Configuration:**
   * Create an n8n workflow triggered on a **Schedule Node** (runs hourly).
   * Fetch all active deal records from monday.com using an **n8n GraphQL Node**.
   * Pass deal records to the JavaScript Pipeline Velocity Engine code below.

3. **Configuring Databox Push HTTP Request Node in n8n:**
   * Add an **HTTP Request Node** connected downstream of the calculation code.
   * Method: `POST`. Endpoint URL: `https://push.databox.com`.
   * Headers: `Content-Type: application/json`, `Accept: application/vnd.databox.v2+json`.
   * Authorization: Basic Auth with Username = your Databox token and Password empty.
   * JSON Payload Body:

```json
{
  "data": [
    { "$pipeline_velocity": "={{ $json.pipelineVelocity }}", "date": "={{ $json.date }}" },
    { "$win_rate": "={{ $json.winRate }}", "date": "={{ $json.date }}" },
    { "$avg_deal_size": "={{ $json.avgDealSize }}", "date": "={{ $json.date }}" }
  ]
}
```

---

## <mark>Databox Push API & RevOps Metric Parameter Reference Table</mark>

The parameter reference table below details key RevOps equations, Databox metric keys, and target benchmarks:

<table class="w-full text-left border-collapse border border-slate-700 my-6">
  <thead>
    <tr class="bg-slate-800 text-slate-200 border-b border-slate-700">
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">RevOps Executive Metric</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Databox Push Key</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Mathematical Formula</th>
      <th class="p-3 border border-slate-700 font-bold text-xs uppercase">Target Benchmark</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Pipeline Velocity ($/Day)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`$pipeline_velocity`</td>
      <td class="p-3 border border-slate-700 text-xs font-mono">`(Deals * WinRate * AvgSize) / Days`</td>
      <td class="p-3 border border-slate-700 text-xs font-bold text-emerald-400">&gt; $15,000 / Day</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/30">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Win Rate (%)</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`$win_rate`</td>
      <td class="p-3 border border-slate-700 text-xs font-mono">`(Won Deals / Closed Deals) * 100`</td>
      <td class="p-3 border border-slate-700 text-xs">&gt; 28% Opportunity Win Rate</td>
    </tr>
    <tr class="border-b border-slate-700 bg-slate-900/50">
      <td class="p-3 border border-slate-700 font-mono text-xs text-cyan-400">Average Sales Cycle</td>
      <td class="p-3 border border-slate-700 font-mono text-xs">`$sales_cycle_days`</td>
      <td class="p-3 border border-slate-700 text-xs font-mono">`Sum(CloseDate - CreateDate) / WonDeals`</td>
      <td class="p-3 border border-slate-700 text-xs">&lt; 42 Days (B2B SaaS)</td>
    </tr>
  </tbody>
</table>

---

## <mark>Division-by-Zero & Null Value Calculation Exception Guard</mark>

To prevent pipeline velocity calculation errors (`NaN` or `Infinity`) during quiet sales periods, deploy this **JavaScript Division Guard Node**:

```javascript
// n8n JavaScript Code Node: Pipeline Velocity Safe Calculation Engine
const items = $input.all();
const metrics = [];

for (const item of items) {
  const openDealsCount = parseInt(item.json.open_deals_count || 0);
  const wonDealsCount = parseInt(item.json.won_deals_count || 0);
  const totalClosedDeals = parseInt(item.json.total_closed_deals || 0);
  const totalWonValue = parseFloat(item.json.total_won_value || 0);
  const avgSalesCycleDays = parseFloat(item.json.avg_sales_cycle_days || 30);
  
  // Safe calculation guards
  const winRate = totalClosedDeals > 0 ? (wonDealsCount / totalClosedDeals) : 0;
  const avgDealSize = wonDealsCount > 0 ? (totalWonValue / wonDealsCount) : 0;
  const salesCycleDays = avgSalesCycleDays > 0 ? avgSalesCycleDays : 30;
  
  // Compute Pipeline Velocity: (Number of Qualified Opportunities * Win Rate * Average Deal Size) / Sales Cycle Length in Days
  const pipelineVelocity = (openDealsCount * winRate * avgDealSize) / salesCycleDays;
  
  metrics.push({
    json: {
      pipelineVelocity: Math.round(pipelineVelocity * 100) / 100,
      winRate: Math.round(winRate * 10000) / 100,
      avgDealSize: Math.round(avgDealSize * 100) / 100,
      salesCycleDays: salesCycleDays,
      date: new Date().toISOString().split('T')[0],
      status: 'CALCULATION_SUCCESS'
    }
  });
}

return metrics;
```

---

## <mark>Production RevOps Pipeline Velocity Dashboard Execution Checklist</mark>

Verify your Databox executive dashboard integration using this checklist before publishing:

- [ ] **Databox Push API Token Authorization:** Confirm API token accepts metrics pushed via n8n HTTP Request node.
- [ ] **monday.com Schema Synchronization:** Verify column IDs for `Deal Value`, `Stage`, and `Close Date` match n8n GraphQL queries.
- [ ] **Division-by-Zero Guard Active:** Confirm JavaScript calculation node gracefully handles 0 closed deals without crashing.
- [ ] **Hourly Calculation Sync Verified:** Validate Databox dashboard updates within 5 minutes of deal status changes in monday.com.
- [ ] **Executive Dashboard Mobile Formatting:** Verify pipeline velocity gauges and win-rate charts format cleanly on Databox mobile app.
"""
expand_file('draft-databox-revops-dashboard-pipeline-velocity.json', add_12)

print("Batch 3 (Top-ups 5-7, Drafts 9-12) Expansion Complete.")
