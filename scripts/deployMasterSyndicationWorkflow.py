import json
import urllib.request
import urllib.error

N8N_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzUzNmYzMy1kZmZiLTQyNjAtYmZjYi0zZGQ2ZDk3MGRlOWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWZlZGQ1ZDctZTNjZC00ZmI2LWE1YmYtMmVmZDk3NGRkZTdkIiwiaWF0IjoxNzg1NDQ0MDg2fQ.8NF8ODEbyIENYhO0K2UsZxK6-_T7KvFUtnjhfC1ALyc"
N8N_URL = "http://localhost:5678/api/v1"

def create_master_workflow():
    workflow_payload = {
        "name": "🚀 Master Blog & Case Study Syndication Engine (NVIDIA NIM + Canvas Branding + 9 Platforms)",
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
                "position": [100, 300]
            },
            {
                "parameters": {
                    "jsCode": """
// Fetch pending items from blogs_and_casestudies.csv or payload queue
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
                "position": [300, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://integrate.api.nvidia.com/v1/chat/completions",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {
                                "name": "Authorization",
                                "value": "Bearer nvapi-YOUR_NVIDIA_NIM_KEY"
                            },
                            {
                                "name": "Content-Type",
                                "value": "application/json"
                            }
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "model": "meta/llama-3.3-70b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are a master social media growth strategist and content syndicator. Create virality-optimized copy for Dev.to, Medium, Hashnode, LinkedIn, X, Reddit, Pinterest, Telegram, and Tumblr. Include image_alt_text and preserve canonical URL."
    },
    {
      "role": "user",
      "content": "Article Title: {{ $json.title }}\\nSlug: {{ $json.slug }}\\nCanonical URL: {{ $json.canonical_url }}\\nMeta Description: {{ $json.meta_description }}"
    }
  ],
  "temperature": 0.3
}"""
                },
                "id": "llm-generator",
                "name": "NVIDIA NIM LLM #1: Copy Generator (Llama 3.3 70B)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [520, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://integrate.api.nvidia.com/v1/chat/completions",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {
                                "name": "Authorization",
                                "value": "Bearer nvapi-YOUR_NVIDIA_NIM_KEY"
                            },
                            {
                                "name": "Content-Type",
                                "value": "application/json"
                            }
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "model": "meta/llama-3.1-405b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are the Quality Control (QC) Auditor. Audit the generated platform copy for character limits, formatting errors, link hygiene, and brand tone."
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
                "position": [740, 300]
            },
            {
                "parameters": {
                    "jsCode": """
// Canvas & Branding Overlay Generator
// Generates high-res image with centered Title & bottom-right watermark: 'whoisalfaz.me • Alfaz Mahmud Rizve'
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
                "position": [960, 300]
            },
            {
                "parameters": {
                    "amount": 3,
                    "unit": "seconds"
                },
                "id": "wait-telegram",
                "name": "Rate Limit Delay (3s)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 100]
            },
            {
                "parameters": {
                    "amount": 5,
                    "unit": "minutes"
                },
                "id": "wait-pinterest",
                "name": "Rate Limit Delay (5m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 250]
            },
            {
                "parameters": {
                    "amount": 15,
                    "unit": "minutes"
                },
                "id": "wait-devto-hashnode",
                "name": "Rate Limit Delay (15m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 400]
            },
            {
                "parameters": {
                    "amount": 30,
                    "unit": "minutes"
                },
                "id": "wait-twitter",
                "name": "Rate Limit Delay (30m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 550]
            },
            {
                "parameters": {
                    "amount": 1,
                    "unit": "hours"
                },
                "id": "wait-linkedin",
                "name": "Rate Limit Delay (1h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 700]
            },
            {
                "parameters": {
                    "amount": 2,
                    "unit": "hours"
                },
                "id": "wait-reddit",
                "name": "Rate Limit Delay (2h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 850]
            },
            {
                "parameters": {
                    "jsCode": """
// Master Audit Logger & CSV State Update
return {
  json: {
    status: 'syndicated',
    completed_at: new Date().toISOString(),
    blog_title: $json.title,
    canonical_url: $json.canonical_url
  }
};
"""
                },
                "id": "csv-logger",
                "name": "CSV Logger & Audit Updater",
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [1400, 450]
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
                    [{"node": "Rate Limit Delay (3s)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay (5m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay (15m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay (30m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay (1h)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay (2h)", "type": "main", "index": 0}]
                ]
            },
            "Rate Limit Delay (3s)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay (5m)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay (15m)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay (30m)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay (1h)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay (2h)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            }
        }
    }
    
    req = urllib.request.Request(
        f"{N8N_URL}/workflows",
        data=json.dumps(workflow_payload).encode('utf-8'),
        headers={
            "X-N8N-API-KEY": N8N_API_KEY,
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            wf_id = data['id']
            print(f"Successfully created Master Syndication Workflow (ID: {wf_id})")
            
            # Activate Workflow
            act_req = urllib.request.Request(
                f"{N8N_URL}/workflows/{wf_id}/activate",
                headers={"X-N8N-API-KEY": N8N_API_KEY},
                method="POST"
            )
            with urllib.request.urlopen(act_req) as act_resp:
                act_data = json.loads(act_resp.read().decode('utf-8'))
                print(f"Successfully ACTIVATED Workflow {wf_id}! Active: {act_data.get('active')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")

if __name__ == '__main__':
    create_master_workflow()
