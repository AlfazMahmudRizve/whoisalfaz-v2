import json
import sys
from n8nManager import create_workflow, activate_workflow

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

workflow_name = "🚀 Blog Syndication & Backlink Automation Pipeline"

nodes = [
    {
        "parameters": {
            "httpMethod": "POST",
            "path": "blog-syndicate",
            "options": {}
        },
        "name": "Publish Event Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [250, 300]
    },
    {
        "parameters": {
            "jsCode": """// Normalize metadata & canonical backlink URLs
const item = $input.first().json;
const title = item.title || 'Untitled Post';
const slug = item.slug || '';
const canonicalUrl = `https://whoisalfaz.me/blog/${slug}`;
const description = item.description || '';
const content = item.body || '';

// Format Dev.to Body with Canonical Marker
const devToMarkdown = `---
title: "${title.replace(/"/g, '\\"')}"
published: true
tags: automation, n8n, revops, ai
canonical_url: ${canonicalUrl}
description: "${description.replace(/"/g, '\\"')}"
---

${content}

---
*Originally published at [whoisalfaz.me](${canonicalUrl})*`;

return [{
    json: {
        title,
        slug,
        canonicalUrl,
        description,
        content,
        devToMarkdown,
        socialShareText: `🔥 New Technical SOP Published: ${title}\\n\\nRead the full engineering guide with production blueprints & code blocks 👇\\n\\n${canonicalUrl}`
    }
}];"""
        },
        "name": "Canonical URL & Payload Normalizer",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [480, 300]
    },
    {
        "parameters": {
            "url": "https://dev.to/api/articles",
            "sendHeaders": True,
            "headerParameters": {
                "parameters": [
                    {
                        "name": "api-key",
                        "value": "={{ $env.DEVTO_API_KEY }}"
                    },
                    {
                        "name": "Content-Type",
                        "value": "application/json"
                    }
                ]
            },
            "sendBody": True,
            "bodyParameters": {
                "parameters": [
                    {
                        "name": "article",
                        "value": "={{ { title: $json.title, body_markdown: $json.devToMarkdown, published: true, canonical_url: $json.canonicalUrl, tags: [\"automation\", \"n8n\", \"revops\"] } }}"
                    }
                ]
            },
            "options": {}
        },
        "name": "Dev.to Syndication Node (Canonical Backlink)",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [720, 180]
    },
    {
        "parameters": {
            "url": "https://api.medium.com/v1/me",
            "sendHeaders": True,
            "headerParameters": {
                "parameters": [
                    {
                        "name": "Authorization",
                        "value": "=Bearer {{ $env.MEDIUM_API_TOKEN }}"
                    }
                ]
            },
            "options": {}
        },
        "name": "Medium User Verification Node",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [720, 340]
    },
    {
        "parameters": {
            "chatId": "={{ $env.TELEGRAM_CHANNEL_ID }}",
            "text": "={{ $json.socialShareText }}",
            "additionalFields": {
                "parse_mode": "Markdown"
            }
        },
        "name": "Telegram Channel Broadcast Node",
        "type": "n8n-nodes-base.telegram",
        "typeVersion": 1,
        "position": [720, 500]
    }
]

connections = {
    "Publish Event Webhook Trigger": {
        "main": [[{"node": "Canonical URL & Payload Normalizer", "type": "main", "index": 0}]]
    },
    "Canonical URL & Payload Normalizer": {
        "main": [
            [
                {"node": "Dev.to Syndication Node (Canonical Backlink)", "type": "main", "index": 0},
                {"node": "Medium User Verification Node", "type": "main", "index": 0},
                {"node": "Telegram Channel Broadcast Node", "type": "main", "index": 0}
            ]
        ]
    }
}

try:
    print(f"Creating n8n Workflow: {workflow_name}...")
    res = create_workflow(workflow_name, nodes, connections)
    wf_id = res.get("id")
    print(f"✅ Workflow Created Successfully! ID: {wf_id}")
    
    print(f"Activating Workflow {wf_id}...")
    act_res = activate_workflow(wf_id)
    print(f"🚀 Workflow Activated Live! Status: {act_res.get('active', True)}")

except Exception as e:
    print(f"Error creating workflow: {e}")
