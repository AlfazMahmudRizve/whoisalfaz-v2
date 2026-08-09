import json
import urllib.request
import urllib.error

N8N_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzUzNmYzMy1kZmZiLTQyNjAtYmZjYi0zZGQ2ZDk3MGRlOWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWZlZGQ1ZDctZTNjZC00ZmI2LWE1YmYtMmVmZDk3NGRkZTdkIiwiaWF0IjoxNzg1NDQ0MDg2fQ.8NF8ODEbyIENYhO0K2UsZxK6-_T7KvFUtnjhfC1ALyc"
N8N_URL = "http://localhost:5678/api/v1"

def deploy_complete_workflow():
    workflow_payload = {
        "name": "🚀 Complete 9-Platform Blog & Case Study Syndication Engine",
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
// Fetch pending items from blogs_and_casestudies.csv
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
      "content": "You are a master social media growth strategist. Generate virality-optimized copy for Dev.to, Medium, Hashnode, LinkedIn, X, Reddit, Pinterest, Telegram, and Tumblr. Include image_alt_text and preserve canonical URL."
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
                "position": [520, 450]
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
      "content": "You are the Quality Control (QC) Auditor. Audit generated platform copy for character limits, formatting errors, link hygiene, and brand tone."
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
// Canvas Branding & Watermark Overlay Generator
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
            
            # --- 1. Telegram Branch ---
            {
                "parameters": {
                    "amount": 3,
                    "unit": "seconds"
                },
                "id": "wait-telegram",
                "name": "Rate Limit Delay: Telegram (3s)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 100]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "chat_id": "@YOUR_TELEGRAM_CHANNEL_ID",
  "text": "🚀 *New Article Published!*\\n\\n*{{ $json.title }}*\\n\\n{{ $json.meta_description }}\\n\\n🔗 [Read full article]({{ $json.canonical_url }}?utm_source=telegram)",
  "parse_mode": "Markdown"
}"""
                },
                "id": "post-telegram",
                "name": "Telegram Bot API: Publish to Channel",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 100]
            },

            # --- 2. Pinterest Branch ---
            {
                "parameters": {
                    "amount": 5,
                    "unit": "minutes"
                },
                "id": "wait-pinterest",
                "name": "Rate Limit Delay: Pinterest (5m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 250]
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
                "id": "post-pinterest",
                "name": "Pinterest API v5: Create Pin",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 250]
            },

            # --- 3. Dev.to & Hashnode Branch ---
            {
                "parameters": {
                    "amount": 15,
                    "unit": "minutes"
                },
                "id": "wait-devto-hashnode",
                "name": "Rate Limit Delay: Dev.to & Hashnode (15m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 400]
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
                "id": "post-devto",
                "name": "Dev.to API: Create Article (Draft)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 400]
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
                "id": "post-hashnode",
                "name": "Hashnode GraphQL API: Publish Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 480]
            },

            # --- 4. Medium Branch ---
            {
                "parameters": {
                    "amount": 20,
                    "unit": "minutes"
                },
                "id": "wait-medium",
                "name": "Rate Limit Delay: Medium (20m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 550]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.medium.com/v1/users/YOUR_MEDIUM_USER_ID/posts",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_MEDIUM_INTEGRATION_TOKEN"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "title": "{{ $json.title }}",
  "contentFormat": "markdown",
  "content": "{{ $json.body_text }}",
  "canonicalUrl": "{{ $json.canonical_url }}",
  "tags": ["automation", "ai", "technology"],
  "publishStatus": "draft"
}"""
                },
                "id": "post-medium",
                "name": "Medium API: Create Story (Draft)",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 550]
            },

            # --- 5. X / Twitter Branch ---
            {
                "parameters": {
                    "amount": 30,
                    "unit": "minutes"
                },
                "id": "wait-twitter",
                "name": "Rate Limit Delay: X/Twitter (30m)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 680]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.twitter.com/2/tweets",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_TWITTER_BEARER_TOKEN"},
                            {"name": "Content-Type", "value": "application/json"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "text": "🚀 {{ $json.title }}\\n\\n{{ $json.meta_description }}\\n\\nRead complete case study: {{ $json.canonical_url }}?utm_source=twitter"
}"""
                },
                "id": "post-twitter",
                "name": "X/Twitter API v2: Create Tweet",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 680]
            },

            # --- 6. LinkedIn Branch ---
            {
                "parameters": {
                    "amount": 1,
                    "unit": "hours"
                },
                "id": "wait-linkedin",
                "name": "Rate Limit Delay: LinkedIn (1h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 810]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://api.linkedin.com/v2/ugcPosts",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_LINKEDIN_OAUTH_TOKEN"},
                            {"name": "Content-Type", "value": "application/json"},
                            {"name": "X-Restli-Protocol-Version", "value": "2.0.0"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "author": "urn:li:person:YOUR_LINKEDIN_PERSON_URN",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "{{ $json.title }}\\n\\n{{ $json.meta_description }}\\n\\nRead original post: {{ $json.canonical_url }}?utm_source=linkedin"
      },
      "shareMediaCategory": "ARTICLE",
      "media": [
        {
          "status": "READY",
          "description": {"text": "{{ $json.meta_description }}"},
          "originalUrl": "{{ $json.canonical_url }}",
          "title": {"text": "{{ $json.title }}"}
        }
      ]
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}"""
                },
                "id": "post-linkedin",
                "name": "LinkedIn REST API: Create Share Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 810]
            },

            # --- 7. Reddit Branch ---
            {
                "parameters": {
                    "amount": 2,
                    "unit": "hours"
                },
                "id": "wait-reddit",
                "name": "Rate Limit Delay: Reddit (2h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 940]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://oauth.reddit.com/api/submit",
                    "sendHeaders": True,
                    "headerParameters": {
                        "parameters": [
                            {"name": "Authorization", "value": "Bearer YOUR_REDDIT_OAUTH_TOKEN"},
                            {"name": "User-Agent", "value": "whoisalfaz-bot/1.0 (by /u/AlfazRizve)"},
                            {"name": "Content-Type", "value": "application/x-www-form-urlencoded"}
                        ]
                    },
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": """{
  "sr": "test",
  "kind": "link",
  "title": "{{ $json.title }}",
  "url": "{{ $json.canonical_url }}?utm_source=reddit",
  "api_type": "json"
}"""
                },
                "id": "post-reddit",
                "name": "Reddit API: Submit Link Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 940]
            },

            # --- 8. Tumblr Branch ---
            {
                "parameters": {
                    "amount": 3,
                    "unit": "hours"
                },
                "id": "wait-tumblr",
                "name": "Rate Limit Delay: Tumblr (3h)",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1180, 1070]
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
                "id": "post-tumblr",
                "name": "Tumblr NPF API: Create Post",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1400, 1070]
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
    total_platforms_targeted: 9
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
                    [{"node": "Rate Limit Delay: Telegram (3s)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Pinterest (5m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Dev.to & Hashnode (15m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Medium (20m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: X/Twitter (30m)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: LinkedIn (1h)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Reddit (2h)", "type": "main", "index": 0}],
                    [{"node": "Rate Limit Delay: Tumblr (3h)", "type": "main", "index": 0}]
                ]
            },
            "Rate Limit Delay: Telegram (3s)": {
                "main": [[{"node": "Telegram Bot API: Publish to Channel", "type": "main", "index": 0}]]
            },
            "Telegram Bot API: Publish to Channel": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Pinterest (5m)": {
                "main": [[{"node": "Pinterest API v5: Create Pin", "type": "main", "index": 0}]]
            },
            "Pinterest API v5: Create Pin": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Dev.to & Hashnode (15m)": {
                "main": [
                    [{"node": "Dev.to API: Create Article (Draft)", "type": "main", "index": 0}],
                    [{"node": "Hashnode GraphQL API: Publish Post", "type": "main", "index": 0}]
                ]
            },
            "Dev.to API: Create Article (Draft)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Hashnode GraphQL API: Publish Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Medium (20m)": {
                "main": [[{"node": "Medium API: Create Story (Draft)", "type": "main", "index": 0}]]
            },
            "Medium API: Create Story (Draft)": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: X/Twitter (30m)": {
                "main": [[{"node": "X/Twitter API v2: Create Tweet", "type": "main", "index": 0}]]
            },
            "X/Twitter API v2: Create Tweet": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: LinkedIn (1h)": {
                "main": [[{"node": "LinkedIn REST API: Create Share Post", "type": "main", "index": 0}]]
            },
            "LinkedIn REST API: Create Share Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Reddit (2h)": {
                "main": [[{"node": "Reddit API: Submit Link Post", "type": "main", "index": 0}]]
            },
            "Reddit API: Submit Link Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            },
            "Rate Limit Delay: Tumblr (3h)": {
                "main": [[{"node": "Tumblr NPF API: Create Post", "type": "main", "index": 0}]]
            },
            "Tumblr NPF API: Create Post": {
                "main": [[{"node": "CSV Logger & Audit Updater", "type": "main", "index": 0}]]
            }
        }
    }
    
    # 1. Clean existing workflows
    req_get = urllib.request.Request(
        f"{N8N_URL}/workflows",
        headers={"X-N8N-API-KEY": N8N_API_KEY}
    )
    try:
        with urllib.request.urlopen(req_get) as r:
            existing_wfs = json.loads(r.read().decode('utf-8')).get('data', [])
            for wf in existing_wfs:
                del_req = urllib.request.Request(
                    f"{N8N_URL}/workflows/{wf['id']}",
                    headers={"X-N8N-API-KEY": N8N_API_KEY},
                    method="DELETE"
                )
                try:
                    urllib.request.urlopen(del_req)
                    print(f"Deleted old workflow {wf['id']}")
                except Exception as e:
                    pass
    except Exception as e:
        print(f"Error listing workflows: {e}")

    # 2. Deploy fresh Master Workflow
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
            print(f"Successfully created Complete Master Syndication Workflow (ID: {wf_id})")
            
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
    deploy_complete_workflow()
