/**
 * Campaign URL Generator Utility (CommonJS for direct Node execution)
 * Generates verified UTM-tagged links for all primary topic pillars and distribution channels.
 */

const UTM_PRESETS = {
  LINKEDIN_POST: {
    source: 'linkedin',
    medium: 'social_post',
    defaultCampaign: 'organic_authority',
  },
  LINKEDIN_CAROUSEL: {
    source: 'linkedin',
    medium: 'social_carousel',
    defaultCampaign: 'summit_2026_growth',
  },
  TWITTER_THREAD: {
    source: 'twitter',
    medium: 'social_thread',
    defaultCampaign: 'summit_2026_growth',
  },
  REDDIT_COMMUNITY: {
    source: 'reddit',
    medium: 'community',
    defaultCampaign: 'rag_architecture',
  },
  DEVTO_SYNDICATION: {
    source: 'devto',
    medium: 'syndication',
    defaultCampaign: 'developer_guides',
  },
  HASHNODE_SYNDICATION: {
    source: 'hashnode',
    medium: 'syndication',
    defaultCampaign: 'developer_guides',
  },
  WHATSAPP_DIRECT: {
    source: 'whatsapp',
    medium: 'direct_share',
    defaultCampaign: 'client_referral',
  },
  NEWSLETTER_WEEKLY: {
    source: 'newsletter',
    medium: 'email',
    defaultCampaign: 'inner_circle_weekly',
  },
};

function buildUtmUrl(rawUrl, params) {
  const baseDomain = 'https://whoisalfaz.me';
  let fullUrl = rawUrl.trim();

  if (fullUrl.startsWith('/')) {
    fullUrl = `${baseDomain}${fullUrl}`;
  } else if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    fullUrl = `${baseDomain}/${fullUrl}`;
  }

  try {
    const parsed = new URL(fullUrl);
    const cleanParam = (val) => (val ? val.trim().toLowerCase().replace(/\s+/g, '_') : '');

    const source = cleanParam(params.source);
    const medium = cleanParam(params.medium);
    const campaign = cleanParam(params.campaign);
    const content = cleanParam(params.content);
    const term = cleanParam(params.term);

    if (source) parsed.searchParams.set('utm_source', source);
    if (medium) parsed.searchParams.set('utm_medium', medium);
    if (campaign) parsed.searchParams.set('utm_campaign', campaign);
    if (content) parsed.searchParams.set('utm_content', content);
    if (term) parsed.searchParams.set('utm_term', term);

    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

const TARGET_URLS = [
  {
    name: 'Pinecone vs Qdrant Benchmark (Primary)',
    url: 'https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/',
  },
  {
    name: 'Pinecone vs Qdrant RAG Guide',
    url: 'https://whoisalfaz.me/blog/pinecone-vs-qdrant-n8n-rag-comparison/',
  },
  {
    name: 'Dify vs n8n AI Agents Teardown',
    url: 'https://whoisalfaz.me/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/',
  },
  {
    name: 'Voyage AI vs BGE Embeddings Benchmark',
    url: 'https://whoisalfaz.me/blog/open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark/',
  },
  {
    name: 'n8n Production RAG Tutorial',
    url: 'https://whoisalfaz.me/blog/n8n-rag-tutorial/',
  },
  {
    name: 'Free Screaming Frog Alternatives',
    url: 'https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/',
  },
  {
    name: 'ManyChat Summit 2026 Review & Bonus',
    url: 'https://whoisalfaz.me/claim-manychat-bonus/',
  },
  {
    name: 'Interactive RevOps & Pipeline Audit',
    url: 'https://whoisalfaz.me/audit/',
  },
];

console.log('================================================================================');
console.log('WHOISALFAZ.ME — CAMPAIGN URL ATTRIBUTION MATRIX');
console.log('================================================================================\n');

TARGET_URLS.forEach((target) => {
  console.log(`\n📌 Target: ${target.name}`);
  console.log(`   Canonical URL: ${target.url}`);

  ['LINKEDIN_CAROUSEL', 'TWITTER_THREAD', 'REDDIT_COMMUNITY', 'WHATSAPP_DIRECT', 'NEWSLETTER_WEEKLY'].forEach((presetKey) => {
    const preset = UTM_PRESETS[presetKey];
    if (!preset) return;
    const tagged = buildUtmUrl(target.url, {
      source: preset.source,
      medium: preset.medium,
      campaign: preset.defaultCampaign,
    });
    console.log(`   - [${presetKey}]: ${tagged}`);
  });
});

console.log('\n================================================================================');
console.log('Generated successfully. Use these tagged URLs for distribution to eliminate direct traffic leaks.');
console.log('================================================================================\n');

module.exports = { UTM_PRESETS, buildUtmUrl, TARGET_URLS };
