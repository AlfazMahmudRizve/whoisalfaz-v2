/**
 * Master Affiliate Catalog & Cloaking Dictionary
 * Centralized source of truth for all outbound affiliate links, redirect routes,
 * and partner card definitions across whoisalfaz.me
 */

export interface AffiliateItem {
  slug: string;
  destination: string;
  title: string;
  description: string;
  badge: string;
  buttonText: string;
  isPartner: boolean; // Controls whether "Verified Partner" trust badge renders
  tags?: string[];
}

export const AFFILIATE_CATALOG: Record<string, AffiliateItem> = {
  // Core Automation & Dev Infrastructure
  n8n: {
    slug: 'n8n',
    destination: 'https://n8n.partnerlinks.io/ch585gsqzanp',
    title: 'n8n Cloud',
    description: 'The most powerful fair-code automation platform. Deploy cloud or self-host production workflows.',
    badge: 'Automation Core',
    buttonText: 'Get Started with n8n',
    isPartner: true,
    tags: ['n8n', 'automation', 'orchestration'],
  },
  vultr: {
    slug: 'vultr',
    destination: 'https://www.vultr.com/?ref=9849830-9J',
    title: 'Vultr High-Performance Cloud',
    description: 'Deploy self-hosted vector databases & AI infrastructure worldwide. Claim up to $100 free cloud credit.',
    badge: 'Cloud Compute',
    buttonText: 'Claim $100 Free Vultr Credit',
    isPartner: true,
    tags: ['vultr', 'vps', 'compute', 'docker'],
  },
  'vultr-promo': {
    slug: 'vultr-promo',
    destination: 'https://www.vultr.com/?ref=9849830-9J',
    title: 'Vultr High-Performance Cloud',
    description: 'Deploy self-hosted vector databases & AI infrastructure worldwide. Claim up to $100 free cloud credit.',
    badge: 'Cloud Compute',
    buttonText: 'Claim $100 Free Vultr Credit',
    isPartner: true,
    tags: ['vultr', 'vultr-promo'],
  },
  runpod: {
    slug: 'runpod',
    destination: 'https://get.runpod.io/9jlyvj42j3t7',
    title: 'RunPod',
    description: 'Globally distributed GPU cloud compute platform for AI inference, LLM fine-tuning, and serverless AI.',
    badge: 'GPU Cloud',
    buttonText: 'Deploy on RunPod',
    isPartner: true,
    tags: ['runpod', 'gpu', 'ai'],
  },

  // Email & Comms
  brevo: {
    slug: 'brevo',
    destination: 'https://get.brevo.com/6b88c13841c4',
    title: 'Brevo (formerly Sendinblue)',
    description: 'Enterprise-grade email API and marketing automation. High-deliverability transactional SMTP for n8n.',
    badge: 'Email & SMTP',
    buttonText: 'Try Brevo Free',
    isPartner: true,
    tags: ['brevo', 'sendinblue', 'smtp', 'email'],
  },
  cometchat: {
    slug: 'cometchat',
    destination: 'https://try.cometchat.com/r4j3p5y2c9mn',
    title: 'CometChat',
    description: 'Developer-first in-app messaging and voice/video calling APIs.',
    badge: 'Comms API',
    buttonText: 'Integrate CometChat',
    isPartner: true,
    tags: ['cometchat', 'chat', 'webrtc'],
  },
  callhippo: {
    slug: 'callhippo',
    destination: 'https://join.callhippo.com/hhmmpa4bynwl',
    title: 'CallHippo',
    description: 'Intelligent cloud-based virtual phone system and VoIP call center software for sales teams.',
    badge: 'Cloud Telephony',
    buttonText: 'Try CallHippo',
    isPartner: true,
    tags: ['callhippo', 'voip', 'telephony'],
  },

  // Vector DBs & AI Tools
  pinecone: {
    slug: 'pinecone',
    destination: 'https://try.pinecone.io/ra3cq48xakg6',
    title: 'Pinecone Vector Database',
    description: 'The vector database for building AI applications. Essential for production RAG architectures.',
    badge: 'Vector DB',
    buttonText: 'Start Building with Pinecone',
    isPartner: true,
    tags: ['pinecone', 'rag', 'vector'],
  },
  qdrant: {
    slug: 'qdrant',
    destination: 'https://cloud.qdrant.io/',
    title: 'Qdrant Cloud',
    description: 'Rust-native vector search engine for the next generation of AI. Fast, scalable, and memory-efficient.',
    badge: 'Vector DB',
    buttonText: 'Try Qdrant Cloud Free',
    isPartner: false, // Editorial architecture recommendation
    tags: ['qdrant', 'vector', 'search'],
  },
  dify: {
    slug: 'dify',
    destination: 'https://affiliate.dify.ai/wxgid30puoqg',
    title: 'Dify.ai',
    description: 'An open-source LLM app development platform. Orchestrate agents, RAG pipelines, and LLM workflows with ease.',
    badge: 'AI Orchestration',
    buttonText: 'Try Dify.ai',
    isPartner: true,
    tags: ['dify', 'dify.ai', 'ai-agents'],
  },
  elevenlabs: {
    slug: 'elevenlabs',
    destination: 'https://try.elevenlabs.io/vde8vlnbokq4',
    title: 'ElevenLabs',
    description: 'The most realistic text-to-speech and voice cloning software for autonomous AI agents.',
    badge: 'Voice AI',
    buttonText: 'Try ElevenLabs',
    isPartner: true,
    tags: ['elevenlabs', 'voice', 'tts'],
  },
  mindstudio: {
    slug: 'mindstudio',
    destination: 'https://get.mindstudio.ai/abhrejep48v7',
    title: 'MindStudio',
    description: 'No-code AI application builder. Build custom AI models, internal workflow assistants, and intelligent bots.',
    badge: 'No-Code AI',
    buttonText: 'Build with MindStudio',
    isPartner: true,
    tags: ['mindstudio', 'ai-builder'],
  },

  // Sales Intelligence & Outbound
  apollo: {
    slug: 'apollo',
    destination: 'https://get.apollo.io/bs1ny1i5eigv',
    title: 'Apollo.io',
    description: 'The ultimate B2B database and sales engagement platform for lead generation and enrichment.',
    badge: 'B2B Prospecting',
    buttonText: 'Try Apollo Free',
    isPartner: true,
    tags: ['apollo', 'apollo.io', 'leadgen'],
  },
  lusha: {
    slug: 'lusha',
    destination: 'https://partnerstack.lusha.com/0ghbkn0b1inm',
    title: 'Lusha',
    description: 'B2B database and contact enrichment platform. Find verified emails and phone numbers instantly.',
    badge: 'Data Enrichment',
    buttonText: 'Try Lusha Free',
    isPartner: true,
    tags: ['lusha', 'enrichment', 'b2b'],
  },
  aisdr: {
    slug: 'aisdr',
    destination: 'https://partner.aisdr.com/2jffam3qqf6h',
    title: 'AiSDR',
    description: 'AI-powered sales development representative for automated outbound and email booking.',
    badge: 'AI Sales',
    buttonText: 'Try AiSDR',
    isPartner: true,
    tags: ['aisdr', 'outbound'],
  },

  // RevOps, CRM & Lead Attribution
  monday: {
    slug: 'monday',
    destination: 'https://try.monday.com/66vrkkiezhrz',
    title: 'monday.com CRM',
    description: 'The Work OS that lets you shape workflows, your way. Perfect for team scale and pipeline management.',
    badge: 'CRM & Work OS',
    buttonText: 'Try monday.com',
    isPartner: true,
    tags: ['monday', 'monday.com', 'crm'],
  },
  databox: {
    slug: 'databox',
    destination: 'https://join.databox.com/qfzdqmwp7elc',
    title: 'Databox',
    description: 'Business analytics platform to build and share custom dashboards and real-time RevOps metrics.',
    badge: 'Analytics & BI',
    buttonText: 'Start Visualizing Data',
    isPartner: true,
    tags: ['databox', 'analytics', 'dashboards'],
  },
  whatconverts: {
    slug: 'whatconverts',
    destination: 'https://partners.whatconverts.com/9drg99k8gt06',
    title: 'WhatConverts',
    description: 'Call, form, chat, and lead tracking software for complete GTM attribution and marketing analytics.',
    badge: 'Lead Attribution',
    buttonText: 'Try WhatConverts',
    isPartner: true,
    tags: ['whatconverts', 'attribution', 'tracking'],
  },
  turbotic: {
    slug: 'turbotic',
    destination: 'https://try.turbotic.com/2xu9cie2qj39',
    title: 'Turbotic',
    description: 'Enterprise automation optimization and orchestration tracking system.',
    badge: 'Automation Governance',
    buttonText: 'Explore Turbotic',
    isPartner: true,
    tags: ['turbotic', 'governance'],
  },
  trainual: {
    slug: 'trainual',
    destination: 'https://start.trainual.com/m0kygjqcistb',
    title: 'Trainual',
    description: 'The leading standard operating procedure (SOP) and training platform for growing teams.',
    badge: 'SOP & Onboarding',
    buttonText: 'Try Trainual Free',
    isPartner: true,
    tags: ['trainual', 'sop'],
  },
  clickup: {
    slug: 'clickup',
    destination: 'https://try.web.clickup.com/j02z9h7xns1x',
    title: 'ClickUp',
    description: 'All-in-one productivity platform for task management, team collaboration, and automated project sprints.',
    badge: 'Project Ops',
    buttonText: 'Try ClickUp Free',
    isPartner: true,
    tags: ['clickup', 'tasks', 'pm'],
  },

  // Marketing, Social & Content
  vistasocial: {
    slug: 'vistasocial',
    destination: 'https://join.vistasocial.com/d333w96sai9t',
    title: 'Vista Social',
    description: 'Modern social media management platform for scheduling, analytics, and multi-channel engagement.',
    badge: 'Social Media',
    buttonText: 'Try Vista Social',
    isPartner: true,
    tags: ['vistasocial', 'social-media'],
  },
  manychat: {
    slug: 'manychat',
    destination: 'https://manychat.partnerlinks.io/ev5iu5hld3ef',
    title: 'ManyChat',
    description: 'The #1 conversational marketing platform for Instagram, Facebook, and WhatsApp.',
    badge: 'Conversational Marketing',
    buttonText: 'Explore ManyChat',
    isPartner: true,
    tags: ['manychat', 'chatbots'],
  },
  adcreative: {
    slug: 'adcreative',
    destination: 'https://free-trial.adcreative.ai/78ye4zckgmez',
    title: 'AdCreative.ai',
    description: 'Generate conversion-focused ad creatives and social media post designs in seconds.',
    badge: 'AI Creative Design',
    buttonText: 'Try AdCreative Free',
    isPartner: true,
    tags: ['adcreative', 'adcreative.ai', 'ads'],
  },

  // Operations & Global Workforce
  deel: {
    slug: 'deel',
    destination: 'https://get.deel.com/fvthdmduwz5d',
    title: 'Deel',
    description: 'Global hiring, compliance, and international payroll platform for remote engineering teams.',
    badge: 'Global HR & Payroll',
    buttonText: 'Get Started with Deel',
    isPartner: true,
    tags: ['deel', 'hr', 'payroll'],
  },
  plansom: {
    slug: 'plansom',
    destination: 'https://get.plansom.com/yy8i59lv14g4',
    title: 'Plansom',
    description: 'Intelligent financial planning, budgeting, and automated cash flow forecasting for growing businesses.',
    badge: 'FinOps & Planning',
    buttonText: 'Try Plansom',
    isPartner: true,
    tags: ['plansom', 'finance', 'budgeting'],
  },
  foxit: {
    slug: 'foxit',
    destination: 'https://partnerstack.foxit.com/sr8x95o9c32x',
    title: 'Foxit PDF Editor',
    description: 'Enterprise PDF editor, e-sign platform, and automated document workflow management solution.',
    badge: 'Document Ops',
    buttonText: 'Try Foxit PDF',
    isPartner: true,
    tags: ['foxit', 'pdf', 'documents'],
  },
  softsync: {
    slug: 'softsync',
    destination: 'https://affiliate.softsync.ai/f0s8n3dsp6tu',
    title: 'SoftSync',
    description: 'AI automation and data integration platform connecting enterprise tools with low latency.',
    badge: 'AI Automation',
    buttonText: 'Explore SoftSync',
    isPartner: true,
    tags: ['softsync', 'integration'],
  },
  staytuned: {
    slug: 'staytuned',
    destination: 'https://try.zenpire.tech/gwex67j1p4u3',
    title: 'Staytuned Digital (Zenpire)',
    description: 'High-conversion e-commerce growth tools, sizing charts, and Shopify store revenue automation.',
    badge: 'E-commerce Ops',
    buttonText: 'Explore Zenpire',
    isPartner: true,
    tags: ['staytuned', 'zenpire', 'ecommerce'],
  },
  emergent: {
    slug: 'emergent',
    destination: 'https://get.emergent.sh/f7yhqncomeyr',
    title: 'Emergent',
    description: 'AI-powered revenue operations platform for scaling B2B growth.',
    badge: 'AI RevOps',
    buttonText: 'Try Emergent',
    isPartner: true,
    tags: ['emergent', 'revops'],
  },
  tapstitch: {
    slug: 'tapstitch',
    destination: 'https://affiliate.tapstitch.com/7k2jjtg3dl0f',
    title: 'Tapstitch',
    description: 'Data integration and workflow stitching platform for modern teams.',
    badge: 'Workflow Integration',
    buttonText: 'Explore Tapstitch',
    isPartner: true,
    tags: ['tapstitch', 'integration'],
  },
  ags: {
    slug: 'ags',
    destination: 'https://acceleratedgrowthstudio.partnerlinks.io/ferzzxgyi9p3',
    title: 'Accelerated Growth Studio',
    description: 'Growth engineering and product-led acquisition acceleration platform.',
    badge: 'Growth Acceleration',
    buttonText: 'Explore AGS',
    isPartner: true,
    tags: ['ags', 'growth'],
  },

  // Gumroad / Creator Partnerships
  'krafera-upgrade': {
    slug: 'krafera-upgrade',
    destination: 'https://gumroad.com/a/74272099/pbeqo',
    title: 'Krafera Upgrade Watch',
    description: 'Automated AST scanning & monitoring for n8n 3.0 breaking nodes. Use code ALFAZUG20 for 20% off.',
    badge: 'n8n 3.0 Safety',
    buttonText: 'Get Upgrade Watch (20% Off)',
    isPartner: true,
    tags: ['krafera-upgrade', 'krafera', 'n8n-upgrade'],
  },
  'krafera-watchtower': {
    slug: 'krafera-watchtower',
    destination: 'https://gumroad.com/a/74272099/lltue',
    title: 'Krafera Silent Failure Watch',
    description: 'Continuous telemetry & watchtower alert pack to catch silent execution dropouts in production n8n workflows.',
    badge: 'n8n Telemetry',
    buttonText: 'Get Watchtower Pack',
    isPartner: true,
    tags: ['krafera-watchtower', 'krafera', 'n8n-telemetry'],
  },

  // Enterprise Architecture Non-Partner Stacks
  twilio: {
    slug: 'twilio',
    destination: 'https://www.twilio.com/',
    title: 'Twilio',
    description: 'The industry-standard communications platform. Essential for provisioning numbers and streaming call audio.',
    badge: 'Telephony Stack',
    buttonText: 'Explore Twilio',
    isPartner: false, // Architectural stack reference
    tags: ['twilio', 'telephony'],
  },
  hubspot: {
    slug: 'hubspot',
    destination: 'https://www.hubspot.com/',
    title: 'HubSpot CRM',
    description: 'The leading customer relationship platform. Perfect for centralizing contacts, logs, and pipeline workflows.',
    badge: 'CRM Stack',
    buttonText: 'Try HubSpot',
    isPartner: false, // Architectural stack reference
    tags: ['hubspot', 'crm'],
  },
};

/**
 * Normalizes input key/tag strings to handle common typos, trailing domain suffixes,
 * and case-insensitivity (e.g., 'monday.com' -> 'monday', 'AdCreative.ai' -> 'adcreative').
 */
export function normalizeAffiliateKey(key: string): string {
  if (!key) return '';
  const cleaned = key
    .toLowerCase()
    .trim()
    .replace(/^(\/go\/)/, '')
    .replace(/\.com$|\.ai$|\.io$/i, '');

  if (AFFILIATE_CATALOG[cleaned]) return cleaned;
  if (AFFILIATE_CATALOG[key.toLowerCase().trim()]) return key.toLowerCase().trim();

  // Common aliases
  if (cleaned === 'sendinblue') return 'brevo';
  if (cleaned === 'zenpire') return 'staytuned';
  if (cleaned === 'vultrpromo') return 'vultr-promo';

  return cleaned;
}

/**
 * Resolves an affiliate item by slug or tag.
 */
export function getAffiliateItem(key: string): AffiliateItem | undefined {
  const normalized = normalizeAffiliateKey(key);
  return AFFILIATE_CATALOG[normalized];
}
