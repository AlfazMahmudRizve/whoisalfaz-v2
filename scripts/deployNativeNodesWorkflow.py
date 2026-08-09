import os
import json
import urllib.request
import urllib.error

N8N_API_KEY = os.environ.get("N8N_API_KEY", "")
N8N_URL = os.environ.get("N8N_BASE_URL", "http://localhost:5678/api/v1")

def deploy_native_workflow():
    workflow_payload = {
        "name": "🚀 Native Social Nodes Syndication Engine (Medium, Reddit, LinkedIn, Twitter, Pinterest, Dev.to, Hashnode, Tumblr)",
        "settings": {
            "executionOrder": "v1"
        },
        "nodes": [
            {
                "parameters": {
                    "rule": {
                        "interval": [
                            {
                                "field": "hours",
                                "hoursInterval": 6
                            }
                        ]
                    }
                },
                "id": "trigger-cron",
                "name": "Schedule Trigger (Every 6 Hours)",
                "type": "n8n-nodes-base.scheduleTrigger",
                "typeVersion": 1.2,
                "position": [100, 450]
            },
            {
                "parameters": {
                    "jsCode": """
// Read payload queue from blogs_and_casestudies.csv
const items = $input.all();
return items.map(item => ({
  json: {
    ...item.json,
    status: 'processing',
    started_at: new Date().toISOString()
  }
}));
"""
                },
                "id": "code-normalizer",
                "name": "CSV Payload Normalizer",
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [300, 450]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://integrate.api.nvidia.com/v1/chat/completions",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer nvapi-YOUR_NVIDIA_NIM_KEY"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "model": "meta/llama-3.3-70b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are a master social strategist. Generate platform copy for Dev.to, Medium, Hashnode, LinkedIn, X, Reddit, Pinterest, and Tumblr. Include image_alt_text and preserve canonical URL."
    },
    {
      "role": "user",
      "content": "Title: {{ $json.title }}\\nSlug: {{ $json.slug }}\\nCanonical URL: {{ $json.canonical_url }}\\nMeta Description: {{ $json.meta_description }}"
    }
  ],
  "temperature": 0.3
}"""
                },
                "id": "llm-generator",
                "name": "NVIDIA NIM LLM #1: Copy Generator (Llama 3.3 70B)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [520, 450]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://integrate.api.nvidia.com/v1/chat/completions",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer nvapi-YOUR_NVIDIA_NIM_KEY"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "model": "meta/llama-3.1-405b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are QC Critic Auditor. Audit generated platform copy for character limits, formatting, link hygiene, and brand tone."
    },
    {
      "role": "user",
      "content": "{{ $json.body }}"
    }
  ],
  "temperature": 0.1
}"""
                },
                "id": "llm-qc-auditor",
                "name": "NVIDIA NIM LLM #2: QC Critic (Llama 3.1 405B)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [740, 450]
            },
            {
                "parameters": {
                    "jsCode": """
// Canvas Branding Overlay Generator
const title = $json.title || 'Automation Strategy';
const watermark = 'whoisalfaz.me • Alfaz Mahmud Rizve';
const altText = `Featured infographic header for ${title} by Alfaz Mahmud Rizve`;

return {
  json: {
    ...$json,
    branding_image_url: `https://via.placeholder.com/1200x630.png?text=${encodeURIComponent(title)}`,
    watermark: watermark,
    image_alt_text: altText
  }
};
"""
                },
                "id": "canvas-branding-generator",
                "name": "Canvas Branding & Image Generator",
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [960, 450]
            },

            # --- 1. Pinterest API Node ---
            {
                "parameters": {
                    "amount": 5,
                    "unit": "minutes"
                },
                "id": "wait-pinterest",
                "name": "Rate Limit Delay: Pinterest (5m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 150]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.pinterest.com/v5/pins",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_PINTEREST_OAUTH_TOKEN"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "board_id": "YOUR_PINTEREST_BOARD_ID",
  "title": "{{ $json.title }}",
  "description": "{{ $json.meta_description }}",
  "link": "{{ $json.canonical_url }}?utm_source=pinterest",
  "media_source": {
    "source_type": "image_url",
    "url": "{{ $json.branding_image_url }}"
  }
}"""
                },
                "id": "node-pinterest",
                "name": "Pinterest Node: Create Pin",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 150]
            },

            # --- 2. Dev.to & Hashnode Nodes ---
            {
                "parameters": {
                    "amount": 15,
                    "unit": "minutes"
                },
                "id": "wait-devto-hashnode",
                "name": "Rate Limit Delay: Dev.to & Hashnode (15m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://dev.to/api/articles",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "api-key", "value": "YOUR_DEV_TO_API_KEY"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "article": {
    "title": "{{ $json.title }}",
    "body_markdown": "{{ $json.body_text }}\\n\\n---\\n*Originally published at [whoisalfaz.me]({{ $json.canonical_url }})*",
    "published": false,
    "canonical_url": "{{ $json.canonical_url }}",
    "main_image": "{{ $json.branding_image_url }}",
    "tags": ["automation", "n8n", "ai"]
  }
}"""
                },
                "id": "node-devto",
                "name": "Dev.to Node: Create Article (Draft)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 270]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://gql.hashnode.com",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "YOUR_HASHNODE_PAT"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "query": "mutation PublishPost($input: PublishPostInput!) { publishPost(input: $input) { post { id url } } }",
  "variables": {
    "input": {
      "title": "{{ $json.title }}",
      "contentMarkdown": "{{ $json.body_text }}",
      "publicationId": "YOUR_HASHNODE_PUBLICATION_ID",
      "originalArticleUrl": "{{ $json.canonical_url }}",
      "coverImageOptions": {
        "coverImageURL": "{{ $json.branding_image_url }}"
      }
    }
  }
}"""
                },
                "id": "node-hashnode",
                "name": "Hashnode GraphQL Node: Publish Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 350]
            },

            # --- 3. Medium Native Node ---
            {
                "parameters": {
                    "amount": 20,
                    "unit": "minutes"
                },
                "id": "wait-medium",
                "name": "Rate Limit Delay: Medium (20m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 450]
            },
            {
                "parameters": {
                    "title": "={{ $json.title }}",
                    "contentFormat": "markdown",
                    "content": "={{ $json.body_text }}",
                    "canonicalUrl": "={{ $json.canonical_url }}",
                    "publishStatus": "draft"
                },
                "id": "node-medium",
                "name": "Medium Native Node: Create Story",
                "type": "n8n-nodes-base.medium",
                "typeVersion": 1,
                "position": [1400, 450]
            },

            # --- 4. X / Twitter Native Node ---
            {
                "parameters": {
                    "amount": 30,
                    "unit": "minutes"
                },
                "id": "wait-twitter",
                "name": "Rate Limit Delay: X/Twitter (30m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 600]
            },
            {
                "parameters": {
                    "text": "=🚀 {{ $json.title }}\n\n{{ $json.meta_description }}\n\nRead case study: {{ $json.canonical_url }}?utm_source=twitter"
                },
                "id": "node-twitter",
                "name": "X/Twitter Native Node: Create Tweet",
                "type": "n8n-nodes-base.twitter",
                "typeVersion": 2,
                "position": [1400, 600]
            },

            # --- 5. LinkedIn Native Node ---
            {
                "parameters": {
                    "amount": 1,
                    "unit": "hours"
                },
                "id": "wait-linkedin",
                "name": "Rate Limit Delay: LinkedIn (1h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 750]
            },
            {
                "parameters": {
                    "text": "={{ $json.title }}\n\n{{ $json.meta_description }}\n\nRead original post: {{ $json.canonical_url }}?utm_source=linkedin"
                },
                "id": "node-linkedin",
                "name": "LinkedIn Native Node: Create Post",
                "type": "n8n-nodes-base.linkedIn",
                "typeVersion": 1,
                "position": [1400, 750]
            },

            # --- 6. Reddit Native Node ---
            {
                "parameters": {
                    "amount": 2,
                    "unit": "hours"
                },
                "id": "wait-reddit",
                "name": "Rate Limit Delay: Reddit (2h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 900]
            },
            {
                "parameters": {
                    "subreddit": "test",
                    "title": "={{ $json.title }}",
                    "kind": "link",
                    "url": "={{ $json.canonical_url }}?utm_source=reddit"
                },
                "id": "node-reddit",
                "name": "Reddit Native Node: Submit Link",
                "type": "n8n-nodes-base.reddit",
                "typeVersion": 1,
                "position": [1400, 900]
            },

            # --- 7. Tumblr Node ---
            {
                "parameters": {
                    "amount": 3,
                    "unit": "hours"
                },
                "id": "wait-tumblr",
                "name": "Rate Limit Delay: Tumblr (3h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 1050]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.tumblr.com/v2/blog/whoisalfaz.tumblr.com/post",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_TUMBLR_OAUTH_TOKEN"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "content": [
    {"type": "text", "text": "{{ $json.title }}", "subtype": "heading1"},
    {"type": "text", "text": "{{ $json.meta_description }}"},
    {"type": "link", "url": "{{ $json.canonical_url }}?utm_source=tumblr", "title": "Read complete post"}
  ],
  "tags": "automation,n8n,tech"
}"""
                },
                "id": "node-tumblr",
                "name": "Tumblr NPF Node: Create Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 1050]
            },

            # --- Master CSV State Logger ---
            {
                "parameters": {
                    "jsCode": """
// Master Audit Logger & CSV State Update
return {
  json: {
    status: 'syndicated',
    completed_at: new Date().toISOString(),
    blog_title: $json.title,
    canonical_url: $json.canonical_url,
    total_platforms_targeted: 8
  }
};
"""
                },
                "id": "csv-logger",
                "name": "CSV Logger & Audit Updater",
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [1650, 550]
            }
        ],
        "connections": {
            "Schedule Trigger (Every 6 Hours)": {
                "main": [[{"node": "CSV Payload Normalizer", "type": "main", "index": 0}]]
            },
            "CSV Payload Normalizer": {
                "main": [[{"node": "NVIDIA NIM LLM #1: Copy Generator (Llama 3.3 70B)", "type": "main", "index": 0}]]
            },
            "NVIDIA NIM LLM #1: Copy Generator (Llama 3.3 70B)": {
                "main": [[{"node": "NVIDIA NIM LLM #2: QC Critic (Llama 3.1 405B)", "type": "main", "index": 0}]]
            },
            "NVIDIA NIM LLM #2: QC Critic (Llama 3.1 405B)": {
                "main": [[{"node": "Canvas Branding & Image Generator", "type": "main", "index": 0}]]
            },
            "Canvas Branding & Image Generator": {
                "main": [
                    [{"node": "Rate Limit Delay: Pinterest (5m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Dev.to & Hashnode (15m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Medium (20m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: X/Twitter (30m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: LinkedIn (1h)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Reddit (2h)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Tumblr (3h)", "type": "main", "index": 0}]
                ]
            },
            "Rate Limit Delay: Pinterest (5m)": {
                "main": [[{"node": "Pinterest Node: Create Pin", "type": "main", "index": 0}]]
            },
            "Pinterest Node: Create Pin": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Dev.to & Hashnode (15m)": {
                "main": [
                    [{"node": "Dev.to Node: Create Article (Draft)", "type": "main", "index": 0}],
                    [{"node": "Hashnode GraphQL Node: Publish Post", "type": "main", "index": 0}]
                ]
            },
            "Dev.to Node: Create Article (Draft)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Hashnode GraphQL Node: Publish Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Medium (20m)": {
                "main": [[{"node": "Medium Native Node: Create Story", "type": "main", "index": 0}]]
            },
            "Medium Native Node: Create Story": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: X/Twitter (30m)": {
                "main": [[{"node": "X/Twitter Native Node: Create Tweet", "type": "main", "index": 0}]]
            },
            "X/Twitter Native Node: Create Tweet": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: LinkedIn (1h)": {
                "main": [[{"node": "LinkedIn Native Node: Create Post", "type": "main", "index": 0}]]
            },
            "LinkedIn Native Node: Create Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Reddit (2h)": {
                "main": [[{"node": "Reddit Native Node: Submit Link", "type": "main", "index": 0}]]
            },
            "Reddit Native Node: Submit Link": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Tumblr (3h)": {
                "main": [[{"node": "Tumblr NPF Node: Create Post", "type": "main", "index": 0}]]
            },
            "Tumblr NPF Node: Create Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            }
        }
    }
    
    # Create workflow in inactive state so user can select native credentials in n8n UI
    req_create = urllib.request.Request(
        f"{N8N_URL}/workflows",
        data=json.dumps(workflow_payload).encode('utf-8'),
        headers={
            "X-N8N-API-KEY": N8N_API_KEY,
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req_create) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            wf_id = data['id']
            print(f"Successfully created Native Social Nodes Master Workflow (ID: {wf_id})")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")

if __name__ == '__main__':
    deploy_native_workflow()
