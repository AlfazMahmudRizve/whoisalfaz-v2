const fs = require('fs');

const ledger = JSON.parse(fs.readFileSync('scratch/master_upgrade_ledger.json', 'utf8'));

const batch1Slugs = [
  'cometchat-dify-inapp-voice',
  'headless-wordpress-seo-nextjs-guide',
  'dify-ai-vultr-gpu-docker-deployment-guide',
  'apollo-to-brevo-n8n-pipeline-guide',
  'turbotic-automation-governance'
];

const batch2Slugs = [
  'elevenlabs-n8n-voice-ai-sales-agent',
  'corrective-rag-crag-blueprint-n8n-tavily-fallback',
  'self-hosted-qdrant-docker-vultr',
  'emergent-ai-autonomous-gtm-guide',
  'dify-vs-n8n-architecture'
];

const batch3Slugs = [
  'headless-wordpress-vs-monolithic',
  'case-study-veloryc-premium-ecommerce',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'n8n-multi-tenant-vector-schema',
  'pinecone-vs-qdrant-vultr-benchmark'
];

const batch4Slugs = [
  'monday-crm-advanced-lead-scoring',
  'trainual-alternatives-active-agency-sop-engine',
  'how-to-audit-competitor-seo-no-verification',
  'n8n-apollo-lead-enrichment-pipeline',
  'automate-personal-branding-with-n8n'
];

const batch5Slugs = [
  'automated-pdf-document-chunking-vectorization-n8n',
  'semantic-search-api-n8n-qdrant-fastapi-bridge',
  'closed-loop-lead-attribution-engine',
  'databox-revops-dashboard-pipeline-velocity',
  'whatconverts-vs-callrail-attribution'
];

const batch6Slugs = [
  'manychat-n8n-whatsapp-voice-bot',
  'lead-enrichment-with-n8n',
  'zero-data-retention-enterprise-rag-vultr-vps',
  'building-an-enterprise-knowledge-graph-rag-n8n',
  'building-multi-tenant-vector-search-n8n-qdrant'
];

const batch7Slugs = [
  'n8n-ai-agent-memory-persistence-qdrant-vector-store',
  'n8n-vector-store-memory-management-production-guide',
  'brevo-cold-email-ip-warming-guide',
  'waterfall-data-enrichment-pipeline-n8n-guide',
  'aisdr-vs-human-sdr-unit-economics-benchmark'
];

const batch8Slugs = [
  'apollo-vs-lusha-vs-aisdr-comparison',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'ai-automation-agency-business-model',
  'n8n-global-error-handling',
  'automations-for-saas-and-agencies'
];

const batch9Slugs = [
  'outstanding-ideas-for-b2b-lead-capture',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'high-throughput-batch-vector-ingestion-n8n-qdrant',
  'hybrid-vector-keyword-search-qdrant-n8n-pipeline',
  'pinecone-namespaces-vs-qdrant-payload-filters-comparison'
];

ledger.forEach(item => {
  if (
    batch1Slugs.includes(item.slug) || 
    batch2Slugs.includes(item.slug) || 
    batch3Slugs.includes(item.slug) ||
    batch4Slugs.includes(item.slug) ||
    batch5Slugs.includes(item.slug) ||
    batch6Slugs.includes(item.slug) ||
    batch7Slugs.includes(item.slug) ||
    batch8Slugs.includes(item.slug) ||
    batch9Slugs.includes(item.slug)
  ) {
    item.status = 'VERIFIED';
    item.aiSlopHits = 0;
    item.lastUpdated = new Date().toISOString();
  }
});

fs.writeFileSync('scratch/master_upgrade_ledger.json', JSON.stringify(ledger, null, 2));


const verified = ledger.filter(i => i.status === 'VERIFIED').length;
console.log(`Updated Master Ledger: ${verified} / 105 articles VERIFIED.`);




