/**
 * UTM Campaign Attribution & Parameter Builder for whoisalfaz.me
 * Solves the dark traffic attribution problem (85%+ Direct traffic) by establishing
 * standardized, validated UTM tagging across all social, community, and syndication distribution channels.
 */

export interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export interface ChannelPreset {
  source: string;
  medium: string;
  defaultCampaign: string;
  description: string;
}

export const UTM_PRESETS: Record<string, ChannelPreset> = {
  LINKEDIN_POST: {
    source: 'linkedin',
    medium: 'social_post',
    defaultCampaign: 'organic_authority',
    description: 'Standard LinkedIn text post or status update',
  },
  LINKEDIN_CAROUSEL: {
    source: 'linkedin',
    medium: 'social_carousel',
    defaultCampaign: 'summit_2026_growth',
    description: 'LinkedIn document carousel (PDF) attachment links',
  },
  TWITTER_THREAD: {
    source: 'twitter',
    medium: 'social_thread',
    defaultCampaign: 'summit_2026_growth',
    description: 'X/Twitter technical thread breakdown or quote tweet',
  },
  REDDIT_COMMUNITY: {
    source: 'reddit',
    medium: 'community',
    defaultCampaign: 'rag_architecture',
    description: 'Architectural answers in r/n8n, r/selfhosted, or r/marketing',
  },
  DEVTO_SYNDICATION: {
    source: 'devto',
    medium: 'syndication',
    defaultCampaign: 'developer_guides',
    description: 'Dev.to canonical companion articles and cross-posts',
  },
  HASHNODE_SYNDICATION: {
    source: 'hashnode',
    medium: 'syndication',
    defaultCampaign: 'developer_guides',
    description: 'Hashnode developer blog cross-posts and engineering guides',
  },
  WHATSAPP_DIRECT: {
    source: 'whatsapp',
    medium: 'direct_share',
    defaultCampaign: 'client_referral',
    description: 'Direct 1-on-1 agency or founder messaging and advisory',
  },
  TELEGRAM_CHANNEL: {
    source: 'telegram',
    medium: 'direct_share',
    defaultCampaign: 'community_broadcast',
    description: 'Telegram group shares or channel broadcasts',
  },
  SLACK_COMMUNITY: {
    source: 'slack',
    medium: 'community',
    defaultCampaign: 'automation_ops',
    description: 'Shared in n8n, AI Agent, or RevOps Slack communities',
  },
  DISCORD_COMMUNITY: {
    source: 'discord',
    medium: 'community',
    defaultCampaign: 'automation_ops',
    description: 'Shared in AI Engineer, Qdrant, or Dify Discord servers',
  },
  NEWSLETTER_WEEKLY: {
    source: 'newsletter',
    medium: 'email',
    defaultCampaign: 'inner_circle_weekly',
    description: 'Weekly automation & RevOps email dispatched via Brevo',
  },
};

/**
 * Builds a clean, fully-formed URL with valid UTM parameters.
 * Preserves existing hash fragments and handles relative paths.
 */
export function buildUtmUrl(rawUrl: string, params: UtmParams): string {
  const baseDomain = 'https://whoisalfaz.me';
  let fullUrl = rawUrl.trim();

  // Handle relative paths (e.g., /blog/n8n-rag-tutorial/)
  if (fullUrl.startsWith('/')) {
    fullUrl = `${baseDomain}${fullUrl}`;
  } else if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    fullUrl = `${baseDomain}/${fullUrl}`;
  }

  try {
    const parsed = new URL(fullUrl);

    // Sanitize and set UTM parameters
    const cleanParam = (val?: string) =>
      val ? val.trim().toLowerCase().replace(/\s+/g, '_') : '';

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
    // If URL parsing fails, return original
    return rawUrl;
  }
}

/**
 * Convenience helper to create a UTM tagged link using a predefined preset.
 */
export function buildPresetUtmUrl(
  rawUrl: string,
  presetKey: keyof typeof UTM_PRESETS,
  overrides?: Partial<UtmParams>
): string {
  const preset = UTM_PRESETS[presetKey];
  if (!preset) {
    throw new Error(`Unknown UTM preset: ${String(presetKey)}`);
  }

  return buildUtmUrl(rawUrl, {
    source: preset.source,
    medium: preset.medium,
    campaign: overrides?.campaign || preset.defaultCampaign,
    content: overrides?.content,
    term: overrides?.term,
  });
}
