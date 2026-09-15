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
};

export const NON_CANONICAL_SLUGS = new Set(Object.keys(CANONICAL_OVERRIDES));
