const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/manychat-async-timeout-handler.json');

const workflow = {
  "name": "Handle ManyChat WhatsApp leads with OpenAI, Brevo CRM and Slack alerts",
  "nodes": [
    {
      "parameters": {
        "content": "## ⚡ Workflow Overview\nThis workflow captures incoming leads from ManyChat, sends an immediate HTTP 200 response to avoid the 10-second timeout, enriches the lead data, drafts an AI response, updates Brevo CRM, and alerts your team on Slack.",
        "height": 200,
        "width": 400
      },
      "id": "sticky-overview",
      "name": "Sticky Note: Overview",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [100, -250]
    },
    {
      "parameters": {
        "content": "## 🔑 Credentials Required\n- OpenAI API Key (for GPT-4o-mini)\n- Brevo API Key (for CRM sync)\n- ManyChat API Key (for WhatsApp message push)\n- Slack Webhook URL (for hot lead alerts)",
        "height": 200,
        "width": 350
      },
      "id": "sticky-credentials",
      "name": "Sticky Note: Credentials",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [540, -250]
    },
    {
      "parameters": {
        "content": "### 1. Ingestion & Fast Handshake\nWebhook receives subscriber payload and immediately returns 200 OK (<150ms) to bypass ManyChat 10s timeout.",
        "height": 180,
        "width": 400
      },
      "id": "sticky-step-1",
      "name": "Sticky Note: Step 1",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [80, 0]
    },
    {
      "parameters": {
        "content": "### 2. Lead Qualification\nParses subscriber info, intent, budget, and scores the lead.",
        "height": 180,
        "width": 250
      },
      "id": "sticky-step-2",
      "name": "Sticky Note: Step 2",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [520, 0]
    },
    {
      "parameters": {
        "content": "### 3. AI Generation & CRM Sync\nGenerates personalized WhatsApp reply and updates Brevo CRM in parallel.",
        "height": 350,
        "width": 320
      },
      "id": "sticky-step-3",
      "name": "Sticky Note: Step 3",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [810, -80]
    },
    {
      "parameters": {
        "content": "### 4. WhatsApp Push & Slack Escalation\nSends reply to WhatsApp subscriber and alerts sales team if lead is HOT.",
        "height": 350,
        "width": 600
      },
      "id": "sticky-step-4",
      "name": "Sticky Note: Step 4",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [1170, -80]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "manychat-async-ingress",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "node-webhook",
      "name": "ManyChat Webhook Ingest",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [100, 100],
      "webhookId": "manychat-async-ingress"
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n  \"status\": \"success\",\n  \"message\": \"Handshake acknowledged. Async execution dispatched.\",\n  \"subscriber_id\": \"{{ $json.body?.subscriber_id || $json.body?.id || 'unknown' }}\",\n  \"timestamp\": \"{{ new Date().toISOString() }}\"\n}",
        "options": {
          "responseCode": 200
        }
      },
      "id": "node-respond",
      "name": "Instant 200 OK Handshake (<150ms)",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [340, 100]
    },
    {
      "parameters": {
        "jsCode": "// Extract & Qualify Subscriber Data from ManyChat Payload\nconst rawBody = $('ManyChat Webhook Ingest').item.json.body || {};\nconst customFields = rawBody.custom_fields || {};\n\nconst subscriberId = String(rawBody.subscriber_id || rawBody.id || customFields.subscriber_id || '');\nconst firstName = rawBody.first_name || customFields.first_name || 'there';\nconst lastName = rawBody.last_name || '';\nconst phone = rawBody.phone || customFields.phone || '';\nconst email = (rawBody.email || customFields.email || '').trim().toLowerCase();\nconst userMessage = rawBody.user_message || customFields.last_user_input || rawBody.last_input_text || 'Tell me about your services';\nconst budget = customFields.budget_range || rawBody.budget || '$5k-$15k';\nconst timeline = customFields.timeline || rawBody.timeline || 'This Month';\nconst interest = customFields.interest || rawBody.interest || 'AI Automation';\n\n// Lead Scoring Logic\nlet score = 0;\nif (budget.includes('15k+') || budget.includes('20k+')) score += 40;\nelse if (budget.includes('5k') || budget.includes('10k')) score += 25;\nelse score += 10;\n\nif (timeline.toLowerCase().includes('week') || timeline.toLowerCase().includes('now')) score += 30;\nelse if (timeline.toLowerCase().includes('month')) score += 20;\nelse score += 10;\n\nif (phone) score += 15;\nif (email) score += 15;\n\nconst leadTier = score >= 70 ? 'HOT_LEAD' : (score >= 40 ? 'WARM_LEAD' : 'NURTURE_LEAD');\n\nreturn [{\n  json: {\n    subscriber_id: subscriberId,\n    first_name: firstName,\n    last_name: lastName,\n    phone: phone,\n    email: email,\n    user_message: userMessage,\n    budget: budget,\n    timeline: timeline,\n    interest: interest,\n    lead_score: score,\n    lead_tier: leadTier,\n    isHotLead: leadTier === 'HOT_LEAD',\n    received_at: new Date().toISOString()\n  }\n}];"
      },
      "id": "node-code-qualify",
      "name": "Parse & Qualify Subscriber",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [560, 100]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.openai.com/v1/chat/completions",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "Authorization",
              "value": "Bearer ={{ $env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY' }}"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"model\": \"gpt-4o-mini\",\n  \"temperature\": 0.3,\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a world-class WhatsApp AI SDR for Accelerated Growth Studio (founded by Alfaz Mahmud Rizve, whoisalfaz.me).\\n\\nGuidelines:\\n1. Generate a natural, helpful, conversational WhatsApp reply under 300 characters.\\n2. Acknowledge the user's specific interest (\" + $json.interest + \") and their question.\\n3. Keep formatting clean with friendly emojis.\\n4. Provide a clear next step (e.g. 'I can schedule a quick 15-min discovery call or share a tailored proposal').\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"User Name: \" + $json.first_name + \"\\nUser Message: \" + $json.user_message + \"\\nBudget: \" + $json.budget + \"\\nTimeline: \" + $json.timeline\n    }\n  ]\n}",
        "options": {}
      },
      "id": "node-openai",
      "name": "AI WhatsApp Copy Generator",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [840, 0]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.brevo.com/v3/contacts",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "api-key",
              "value": "={{ $env.BREVO_API_KEY || 'YOUR_BREVO_API_KEY' }}"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"email\": \"{{ $json.email || 'wa_' + $json.subscriber_id + '@whatsapp.lead' }}\",\n  \"attributes\": {\n    \"FIRSTNAME\": \"{{ $json.first_name }}\",\n    \"LASTNAME\": \"{{ $json.last_name }}\",\n    \"SMS\": \"{{ $json.phone }}\",\n    \"WHATSAPP_ID\": \"{{ $json.subscriber_id }}\",\n    \"LEAD_SCORE\": {{ $json.lead_score }},\n    \"LEAD_TIER\": \"{{ $json.lead_tier }}\",\n    \"INTEREST\": \"{{ $json.interest }}\",\n    \"BUDGET\": \"{{ $json.budget }}\",\n    \"AUTOMATION_ORIGIN\": \"manychat_async_engine\"\n  },\n  \"updateEnabled\": true\n}",
        "options": {}
      },
      "id": "node-brevo",
      "name": "Brevo CRM Async Upsert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [840, 200]
    },
    {
      "parameters": {
        "jsCode": "// Prepare ManyChat WhatsApp Push Payload\nconst subscriber = $('Parse & Qualify Subscriber').item.json;\nconst aiRes = $('AI WhatsApp Copy Generator').item.json;\n\nconst generatedText = aiRes.choices && aiRes.choices[0] && aiRes.choices[0].message\n  ? aiRes.choices[0].message.content\n  : `Hi ${subscriber.first_name}, thanks for reaching out! Our team has received your inquiry regarding ${subscriber.interest} and will reply shortly.`;\n\nreturn [{\n  json: {\n    subscriber_id: subscriber.subscriber_id,\n    message_text: generatedText,\n    lead_score: subscriber.lead_score,\n    lead_tier: subscriber.lead_tier,\n    isHotLead: subscriber.isHotLead,\n    first_name: subscriber.first_name,\n    phone: subscriber.phone\n  }\n}];"
      },
      "id": "node-format-msg",
      "name": "Format WhatsApp Message",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1200, 0]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.manychat.com/fb/sending/sendContent",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "Authorization",
              "value": "Bearer ={{ $env.MANYCHAT_API_KEY || 'YOUR_MANYCHAT_API_KEY' }}"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"subscriber_id\": \"{{ $json.subscriber_id }}\",\n  \"data\": {\n    \"version\": \"v2\",\n    \"content\": {\n      \"messages\": [\n        {\n          \"type\": \"text\",\n          \"text\": \"{{ $json.message_text.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') }}\"\n        }\n      ]\n    }\n  }\n}",
        "options": {}
      },
      "id": "node-manychat-api",
      "name": "ManyChat WhatsApp Callback API",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1440, 0]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "cond-1",
              "leftValue": "={{ $('Format WhatsApp Message').item.json.isHotLead }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "true"
              }
            }
          ],
          "combinator": "and"
        }
      },
      "id": "node-if",
      "name": "Is Hot WhatsApp Lead?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [1680, 0]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK' }}",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": \"🚨 *HOT WhatsApp Lead Escalation!*\",\n  \"blocks\": [\n    {\n      \"type\": \"header\",\n      \"text\": {\n        \"type\": \"plain_text\",\n        \"text\": \"🔥 Immediate SDR Action Required\"\n      }\n    },\n    {\n      \"type\": \"section\",\n      \"fields\": [\n        {\n          \"type\": \"mrkdwn\",\n          \"text\": \"*Lead:* \" + $('Format WhatsApp Message').item.json.first_name + \"\\n*Phone:* \" + $('Format WhatsApp Message').item.json.phone\n        },\n        {\n          \"type\": \"mrkdwn\",\n          \"text\": \"*Lead Score:* `\" + $('Format WhatsApp Message').item.json.lead_score + \"/100`\\n*Tier:* `HOT_LEAD`\"\n        },\n        {\n          \"type\": \"mrkdwn\",\n          \"text\": \"*Direct WhatsApp Chat:* <https://wa.me/\" + $('Format WhatsApp Message').item.json.phone.replace(/[^0-9]/g, '') + \"|Open WhatsApp Chat>\"\n        }\n      ]\n    }\n  ]\n}",
        "options": {}
      },
      "id": "node-slack",
      "name": "Slack SDR WhatsApp Alert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1920, -100]
    }
  ],
  "connections": {
    "ManyChat Webhook Ingest": {
      "main": [
        [
          {
            "node": "Instant 200 OK Handshake (<150ms)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Instant 200 OK Handshake (<150ms)": {
      "main": [
        [
          {
            "node": "Parse & Qualify Subscriber",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse & Qualify Subscriber": {
      "main": [
        [
          {
            "node": "AI WhatsApp Copy Generator",
            "type": "main",
            "index": 0
          },
          {
            "node": "Brevo CRM Async Upsert",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI WhatsApp Copy Generator": {
      "main": [
        [
          {
            "node": "Format WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Format WhatsApp Message": {
      "main": [
        [
          {
            "node": "ManyChat WhatsApp Callback API",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "ManyChat WhatsApp Callback API": {
      "main": [
        [
          {
            "node": "Is Hot WhatsApp Lead?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Is Hot WhatsApp Lead?": {
      "main": [
        [
          {
            "node": "Slack SDR WhatsApp Alert",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {}
};

fs.writeFileSync(filePath, JSON.stringify(workflow, null, 2));
console.log('✅ Generated ultra-clean n8n template JSON without runtime wrapper bloat!');
