descriptions = {
  'self-hosted-qdrant-docker-vultr':
    'Deploy self-hosted Qdrant on Vultr with Docker Compose. Step-by-step production SOP for systemd, memory quantization, TLS security, and n8n vector search.',
  'pinecone-vs-qdrant-vultr-benchmark':
    'Pinecone vs Qdrant Vultr benchmark: Detailed comparison of vector search latency, RAM usage, and Docker performance tradeoffs for n8n RAG AI agent workflows.',
  'emergent-ai-autonomous-gtm-guide':
    'Master autonomous go-to-market execution with our Emergent AI autonomous GTM guide, featuring complete n8n workflow blueprints and JavaScript routing nodes.',
  'adcreative-ai-review-n8n-ad-refresh-loop':
    'Discover our in-depth AdCreative.ai review and build an automated n8n ad refresh loop for Meta ads to prevent creative fatigue using JavaScript AI algorithms.',
  'cometchat-dify-inapp-voice':
    'Integrate CometChat and Dify.ai for in-app voice AI agents. Step-by-step guide covering React SDK setup, Webhook authentication, and custom Python nodes.',
  'omnichannel-ai-voice-note-handler':
    'Build an omnichannel AI agent voice note handler with n8n, Whisper, and WhatsApp API. Normalize audio files across Telegram, Slack, and web widgets.',
  'elevenlabs-n8n-voice-ai-sales-agent':
    'Build a production ElevenLabs n8n voice AI agent with low latency. Step-by-step tutorial covering Twilio Webhooks, OpenAI LLMs, and HubSpot CRM sync.',
  'corrective-rag-crag-n8n-blueprint':
    'Build a Corrective RAG (CRAG) workflow in n8n with Qdrant vector search, Tavily Web Search evaluation, automated grading, and self-healing fallback logic.',
  'dify-vs-n8n-architecture':
    'Compare Dify.ai vs n8n architecture for enterprise AI orchestration. Learn how self-hosted Docker containers, Python code nodes, and APIs scale workflows.',
  'tapstitch-vs-printful-ecommerce-pipeline':
    'Compare Tapstitch vs Printful e-commerce pipeline fulfillment and build an automated n8n order routing workflow with JavaScript for Shopify store scaling.',
  'trainual-alternatives-active-agency-sop-engine':
    'Explore top Trainual alternatives and learn how to build an active agency SOP engine using n8n and JavaScript to automate onboarding, tasks, and documentation.',
  'headless-wordpress-vs-monolithic':
    'Headless WordPress vs Monolithic comparison: Evaluate Core Web Vitals, security, TCO, performance, and API integration for enterprise CMS architectures.',
  'manychat-to-n8n-integration-lead-scoring':
    'Build a ManyChat to n8n integration for AI lead scoring. Technical guide covering webhooks, Brevo CRM sync, and beating the 10-second response timeout.',
  'n8n-multi-tenant-vector-schema':
    'Design an n8n multi-tenant vector schema using Qdrant payload filters, namespace isolation, pre-filtering rules, and automated tenant context isolation.',
  'pinecone-n8n-rag-knowledge-base-blueprint':
    'Build a Pinecone n8n RAG knowledge base blueprint. Production guide covering document chunking, vector retrieval, document grading, and web search fallback.',
  'aisdr-vs-human-sdr-unit-economics-benchmark':
    'Benchmark AiSDR vs Human SDR unit economics for B2B SaaS. Analysis of cost per booked meeting, reply rates, pipeline velocity, and hybrid scaling models.',
  'apollo-vs-lusha-vs-aisdr-comparison':
    'Compare Apollo vs Lusha vs AiSDR for B2B outbound prospecting. Deep breakdown of phone accuracy, AI copy generation, unit costs, and n8n stack integration.',
  'brevo-cold-email-ip-warming-guide':
    'Master Brevo cold email deliverability and dedicated IP warming. Step-by-step schedule, SPF/DKIM/DMARC setup, and automated n8n throttling logic.',
  'accelerated-growth-studio-plg-playbook':
    'Implement product-led growth strategies with our Accelerated Growth Studio PLG playbook, complete with n8n automation blueprints and JavaScript analytics.',
  'waterfall-data-enrichment-pipeline-n8n-guide':
    'Build a waterfall data enrichment pipeline in n8n using Apollo and Lusha APIs. Learn step-by-step fallback logic, credit optimization, and code node setup.',
  'closed-loop-lead-attribution-engine':
    'Build a closed-loop lead attribution engine using n8n, monday.com, and WhatConverts. Track ROI, first-touch, and multi-touch revenue data automatically.'
}

for k, v in descriptions.items():
    length = len(v)
    valid = 140 <= length <= 160
    print(f"[{'OK' if valid else 'FAIL'}] {length} chars | {k}")
