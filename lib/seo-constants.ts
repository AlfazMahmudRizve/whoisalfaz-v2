/**
 * Centralized SEO Constants & Canonical Overrides for whoisalfaz.me
 * Any slug registered here has its rel="canonical" pointed to the primary canonical URL
 * and is automatically excluded from sitemap.xml to prevent Google Search Console
 * "Submitted URL not selected as canonical" warnings.
 */

export const CANONICAL_OVERRIDES: Record<string, string> = {
  'dify-vs-n8n-architecture': 'https://whoisalfaz.me/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/',
  'pinecone-serverless-vs-qdrant-vultr-latency-benchmark': 'https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/',
  'pinecone-namespaces-vs-qdrant-payload-filters-comparison': 'https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/',
  // Phase 1 consolidation (deep audit 2026-09-25): merged into canonical pillars, 301'd in next.config.ts
  'scaling-qdrant-vector-database-to-10-million-embeddings': 'https://whoisalfaz.me/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n/',
  'self-hosted-qdrant-cluster-vultr-docker-sop': 'https://whoisalfaz.me/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n/',
  'n8n-ai-agent-memory-persistence-qdrant-vector-store': 'https://whoisalfaz.me/blog/n8n-vector-store-memory-management-production-guide/',
  // Phase 2 consolidations (deep audit 2026-09-25): pairs targeting same SERP, 301'd in next.config.ts
  'apollo-to-brevo-n8n-pipeline-guide': 'https://whoisalfaz.me/blog/apollo-brevo-n8n-outbound-pipeline/',
  'aisdr-vs-human-sdr-unit-economics-benchmark': 'https://whoisalfaz.me/blog/aisdr-vs-human-sdr-performance-teardown/',
};

export const NON_CANONICAL_SLUGS = new Set(Object.keys(CANONICAL_OVERRIDES));
