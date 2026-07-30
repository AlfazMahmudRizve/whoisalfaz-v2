import json
import os
import re

base_dir = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"

def count_words(text):
    if not text:
        return 0
    return len(re.findall(r'\b\w+\b', text))

def clean_boilerplate(body):
    boilerplates = [
        r"By establishing automated telemetry pipelines and event-driven n8n triggers, growth engineers eliminate manual operational friction while maintaining data integrity across core business tools\.",
        r"Deploying this automated system enables digital agencies and SaaS enterprises to optimize resource utilization, accelerate turnaround times, and sustain long-term revenue growth\."
    ]
    cleaned = body
    for bp in boilerplates:
        cleaned = re.sub(bp, "", cleaned, flags=re.MULTILINE)
    return cleaned.strip()

# Map of file expansions
expansions = {}

# 13. draft-dify-vs-n8n-architecture.json
expansions['draft-dify-vs-n8n-architecture.json'] = """

## <mark>Hybrid Architecture Integration: Orchestrating Dify AI Agents inside n8n Workflows</mark>

While Dify excels at LLM prompt orchestration, RAG retrieval, and conversation memory, enterprise automation requires deep API integrations, complex database operations, and multi-system data routing. The optimal architecture for scaling enterprise AI operations is often a **hybrid model**: utilizing Dify as the dedicated AI reasoning microservice and n8n as the enterprise workflow orchestrator.

### Step-by-Step API Integration Workflow

To connect Dify agents seamlessly within n8n workflows:

1. **Provision Dify API Key**: Navigate to your Dify application dashboard, select **API Access**, and generate an API Secret Key (`app-...`).
2. **Configure n8n HTTP Request Node**:
   - **Method**: `POST`
   - **URL**: `https://api.dify.ai/v1/chat-messages` (or self-hosted Dify endpoint `http://dify-api.internal:5001/v1/chat-messages`)
   - **Authentication**: Header Auth -> `Authorization: Bearer <YOUR_DIFY_API_KEY>`
   - **Body Type**: JSON
3. **Payload Structure**:
```json
{
  "inputs": {
    "user_role": "Enterprise Account Executive",
    "crm_account_id": "ACC-94820"
  },
  "query": "Summarize recent email interaction logs and formulate a personalized follow-up proposal.",
  "response_mode": "blocking",
  "user": "n8n_workflow_runner_01",
  "conversation_id": "{{ $json.conversation_id || '' }}"
}
```

### Architectural Decision & Feature Matrix

The following matrix compares Dify Native, n8n Native, and the Hybrid Orchestration Stack across core production metrics:

<table class="w-full text-left border-collapse my-6">
  <thead>
    <tr class="border-b border-slate-700 bg-slate-800/50">
      <th class="p-3 font-semibold text-slate-200">Architectural Metric</th>
      <th class="p-3 font-semibold text-slate-200">Dify Native</th>
      <th class="p-3 font-semibold text-slate-200">n8n Native (LangChain)</th>
      <th class="p-3 font-semibold text-slate-200">Hybrid Stack (Dify + n8n)</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-800">
      <td class="p-3 text-slate-300 font-medium">Core Primary Use Case</td>
      <td class="p-3 text-slate-400">LLM Apps, Prompt Engineering, RAG</td>
      <td class="p-3 text-slate-400">API Integration, ETL, Business Automation</td>
      <td class="p-3 text-emerald-400 font-semibold">Enterprise AI Agent Operations</td>
    </tr>
    <tr class="border-b border-slate-800">
      <td class="p-3 text-slate-300 font-medium">State & Memory Management</td>
      <td class="p-3 text-slate-400">Built-in Conversation Context & Annotations</td>
      <td class="p-3 text-slate-400">Requires external Redis/Vector memory nodes</td>
      <td class="p-3 text-emerald-400 font-semibold">Dify manages conversational state; n8n manages business state</td>
    </tr>
    <tr class="border-b border-slate-800">
      <td class="p-3 text-slate-300 font-medium">Third-Party Connectors</td>
      <td class="p-3 text-slate-400">Limited (focused on LLM tools)</td>
      <td class="p-3 text-slate-400">400+ Native App Connectors</td>
      <td class="p-3 text-emerald-400 font-semibold">400+ Connectors + Custom Webhooks</td>
    </tr>
    <tr class="border-b border-slate-800">
      <td class="p-3 text-slate-300 font-medium">Execution Latency (Overhead)</td>
      <td class="p-3 text-slate-400">Sub-100ms internal processing</td>
      <td class="p-3 text-slate-400">Sub-50ms node execution</td>
      <td class="p-3 text-slate-400">150ms-250ms combined network hop</td>
    </tr>
    <tr class="border-b border-slate-800">
      <td class="p-3 text-slate-300 font-medium">Visual Debugging & Observability</td>
      <td class="p-3 text-slate-400">Trace views for LLM steps & prompt variables</td>
      <td class="p-3 text-slate-400">Step-by-step payload execution history</td>
      <td class="p-3 text-emerald-400 font-semibold">Complete end-to-end telemetry across AI & APIs</td>
    </tr>
  </tbody>
</table>

## <mark>Production Edge Cases: Rate Limiting, Error Recovery, and Token Budgeting</mark>

When executing high-throughput hybrid workflows, managing LLM API quota limits and handling upstream service failures is critical for maintaining high availability.

### Custom JavaScript Code Node: Dify Response Parsing & Token Tracking

Use this n8n JavaScript Code node to process Dify API responses, extract metadata, monitor token utilization, and execute error fallback paths:

```javascript
// n8n JavaScript Code Node: Dify Response Parsing & Token Budget Enforcement
const inputData = $input.first().json;

if (!inputData || inputData.error) {
  return [{
    json: {
      success: false,
      error_code: inputData?.status || 500,
      message: inputData?.message || "Dify upstream service error.",
      fallback_triggered: true,
      timestamp: new Date().toISOString()
    }
  }];
}

// Extract Dify execution payload and usage metrics
const answer = inputData.answer || "";
const conversationId = inputData.conversation_id || "";
const metadata = inputData.metadata || {};
const usage = metadata.usage || {};

const totalTokens = usage.total_tokens || 0;
const promptTokens = usage.prompt_tokens || 0;
const completionTokens = usage.completion_tokens || 0;

// Token Budget Guardrail (e.g. Max 4,000 tokens per request)
const TOKEN_LIMIT = 4000;
const budgetExceeded = totalTokens > TOKEN_LIMIT;

return [{
  json: {
    success: true,
    answer: answer,
    conversation_id: conversationId,
    telemetry: {
      total_tokens: totalTokens,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      latency_ms: metadata.latency || 0,
      budget_exceeded: budgetExceeded
    },
    crm_sync_ready: true,
    timestamp: new Date().toISOString()
  }
}];
```

### Operational SOP for Enterprise Deployments

1. **Deploy Redis Caching**: Cache common user query embeddings in Redis before hitting the Dify API to reduce redundant LLM calls by up to 35%.
2. **Implement Retries with Exponential Backoff**: Configure the n8n HTTP Request node settings to perform 3 retry attempts on HTTP `429` (Rate Limited) or `503` (Service Unavailable) status codes with an initial backoff interval of 2,000ms.
3. **Database Telemetry Logging**: Write token metrics and execution latency logs to PostgreSQL asynchronously using a secondary non-blocking n8n workflow route.
"""

print("Expansion for Dify vs n8n prepared.")
