const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const OUTPUT_DIR = path.resolve(__dirname, '../scratch/featured_images');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Category theme styling configurations
const THEMES = {
  'revops-architecture': {
    badge: 'REVOPS & REVENUE ARCHITECTURE',
    glowColor: '#10b981', // Emerald
    accentColor: '#14b8a6', // Teal
    secondaryGlow: '#06b6d4',
  },
  'ai-lead-generation': {
    badge: 'AI LEAD GENERATION & PROSPECTING',
    glowColor: '#3b82f6', // Blue
    accentColor: '#6366f1', // Indigo
    secondaryGlow: '#8b5cf6',
  },
  'n8n-automation': {
    badge: 'WORKFLOW & AGENT AUTOMATION',
    glowColor: '#8b5cf6', // Purple
    accentColor: '#a855f7', // Violet
    secondaryGlow: '#ec4899',
  },
  'ai-content-systems': {
    badge: 'VOICE & CONVERSATIONAL AI',
    glowColor: '#06b6d4', // Cyan
    accentColor: '#3b82f6',
    secondaryGlow: '#8b5cf6',
  },
  'architecture-teardowns': {
    badge: 'ARCHITECTURE TEARDOWN & SYSTEMS',
    glowColor: '#f59e0b', // Amber
    accentColor: '#f97316', // Orange
    secondaryGlow: '#ef4444',
  },
  'tool-comparisons': {
    badge: 'HEAD-TO-HEAD TOOL BENCHMARK',
    glowColor: '#ec4899', // Pink
    accentColor: '#f43f5e', // Rose
    secondaryGlow: '#8b5cf6',
  },
  'seo-optimization': {
    badge: 'TECHNICAL SEO & INFRASTRUCTURE',
    glowColor: '#eab308', // Yellow
    accentColor: '#10b981', // Emerald
    secondaryGlow: '#06b6d4',
  },
  '30-days-of-n8n-automation': {
    badge: '30 DAYS OF N8N AUTOMATION',
    glowColor: '#8b5cf6',
    accentColor: '#3b82f6',
    secondaryGlow: '#10b981',
  },
};

function getCategoryTheme(slug, categories) {
  if (categories && categories.length > 0) {
    const cat = categories[0].toLowerCase();
    if (cat.includes('revops')) return THEMES['revops-architecture'];
    if (cat.includes('lead') || cat.includes('prospect')) return THEMES['ai-lead-generation'];
    if (cat.includes('voice') || cat.includes('content') || cat.includes('chat')) return THEMES['ai-content-systems'];
    if (cat.includes('teardown') || cat.includes('case')) return THEMES['architecture-teardowns'];
    if (cat.includes('comparison') || cat.includes('vs')) return THEMES['tool-comparisons'];
    if (cat.includes('seo')) return THEMES['seo-optimization'];
    if (cat.includes('30 days')) return THEMES['30-days-of-n8n-automation'];
  }

  // Slug-based fallback detection
  if (slug.includes('revops') || slug.includes('databox') || slug.includes('attribution') || slug.includes('monday')) return THEMES['revops-architecture'];
  if (slug.includes('apollo') || slug.includes('lead') || slug.includes('brevo') || slug.includes('outreach') || slug.includes('sdr') || slug.includes('enrichment')) return THEMES['ai-lead-generation'];
  if (slug.includes('voice') || slug.includes('shorts') || slug.includes('elevenlabs') || slug.includes('dify') || slug.includes('manychat') || slug.includes('adcreative')) return THEMES['ai-content-systems'];
  if (slug.includes('case-study') || slug.includes('architecture') || slug.includes('teardown')) return THEMES['architecture-teardowns'];
  if (slug.includes('vs') || slug.includes('comparison') || slug.includes('benchmark') || slug.includes('alternatives')) return THEMES['tool-comparisons'];
  if (slug.includes('seo') || slug.includes('sitemap') || slug.includes('speed') || slug.includes('audit')) return THEMES['seo-optimization'];

  return THEMES['n8n-automation'];
}

function wrapText(text, maxCharsPerLine = 34, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateSvgBanner(title, slug, theme) {
  const lines = wrapText(title, 32, 3);
  const titleY = lines.length === 1 ? 310 : lines.length === 2 ? 280 : 250;
  const lineHeight = 64;

  const textElements = lines.map((line, idx) => {
    return `<text x="100" y="${titleY + idx * lineHeight}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="48" font-weight="900" letter-spacing="-1.5" style="text-shadow: 0 4px 16px rgba(0,0,0,0.8);">${escapeXml(line)}</text>`;
  }).join('\n      ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="radialGlow1" cx="0.8" cy="0.2" r="0.8">
      <stop offset="0%" stop-color="${theme.glowColor}" stop-opacity="0.30" />
      <stop offset="60%" stop-color="#0b101e" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="radialGlow2" cx="0.2" cy="0.9" r="0.7">
      <stop offset="0%" stop-color="${theme.secondaryGlow}" stop-opacity="0.25" />
      <stop offset="70%" stop-color="#070a12" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.accentColor}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${theme.glowColor}" stop-opacity="0.10" />
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.accentColor}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${theme.glowColor}" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Deep Background Layer -->
  <rect width="1200" height="630" fill="#070a13" />
  <rect width="1200" height="630" fill="url(#radialGlow1)" />
  <rect width="1200" height="630" fill="url(#radialGlow2)" />

  <!-- Subtle Engineering Grid -->
  <g opacity="0.10" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="240" x2="1200" y2="240" />
    <line x1="0" y1="360" x2="1200" y2="360" />
    <line x1="0" y1="480" x2="1200" y2="480" />
  </g>

  <!-- Abstract Vector Node Architecture -->
  <g opacity="0.4">
    <circle cx="1050" cy="180" r="160" stroke="${theme.accentColor}" stroke-width="1.5" stroke-dasharray="6 12" />
    <circle cx="1050" cy="180" r="90" stroke="${theme.glowColor}" stroke-width="2" />
    <circle cx="1050" cy="180" r="6" fill="${theme.accentColor}" />
    <circle cx="960" cy="120" r="4" fill="#ffffff" />
    <circle cx="1140" cy="240" r="4" fill="${theme.glowColor}" />
    <line x1="960" y1="120" x2="1050" y2="180" stroke="${theme.accentColor}" stroke-width="1.5" />
    <line x1="1050" y1="180" x2="1140" y2="240" stroke="${theme.glowColor}" stroke-width="1.5" />
  </g>

  <!-- Category Badge Pill -->
  <g transform="translate(100, 95)">
    <rect width="auto" height="38" rx="19" fill="url(#pillGrad)" stroke="${theme.accentColor}" stroke-width="1.2" />
    <circle cx="18" cy="19" r="5" fill="${theme.glowColor}" />
    <text x="32" y="24" fill="${theme.accentColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" letter-spacing="2">${escapeXml(theme.badge)}</text>
  </g>

  <!-- Main Headline -->
  <g>
    ${textElements}
  </g>

  <!-- Accent Divider Line -->
  <rect x="100" y="470" width="220" height="4" rx="2" fill="url(#lineGrad)" />

  <!-- Bottom Brand Watermark -->
  <g transform="translate(100, 530)">
    <text x="0" y="0" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" letter-spacing="1">
      WHOISALFAZ.ME <tspan fill="#475569" font-weight="400">•</tspan> <tspan fill="#64748b" font-weight="600">REVOPS &amp; AUTOMATION ARCHITECTURE</tspan>
    </text>
  </g>

  <!-- Decorative Outer Frame Border -->
  <rect x="1" y="1" width="1198" height="628" rx="8" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
</svg>`;
}

async function runBatchUpload() {
  console.log('🔍 Fetching all posts missing featured images from Sanity...');
  const posts = await client.fetch(`*[_type == "post" && !defined(image.asset)]{ _id, title, "slug": slug.current, "categories": categories[]->name }`);

  console.log(`\n📦 Found ${posts.length} posts requiring featured images.`);
  if (posts.length === 0) {
    console.log('🎉 All posts already have featured images!');
    return;
  }

  let successCount = 0;
  let failCount = 0;

  // Process in chunks of 5 with 300ms pause
  const CHUNK_SIZE = 5;
  for (let i = 0; i < posts.length; i += CHUNK_SIZE) {
    const chunk = posts.slice(i, i + CHUNK_SIZE);
    console.log(`\n🚀 Processing batch ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(posts.length / CHUNK_SIZE)} (Posts ${i + 1} to ${Math.min(i + CHUNK_SIZE, posts.length)})...`);

    await Promise.all(chunk.map(async (post) => {
      const cleanSlug = post.slug || post._id.replace(/^drafts\./, '');
      const theme = getCategoryTheme(cleanSlug, post.categories);
      const svgContent = generateSvgBanner(post.title, cleanSlug, theme);
      const svgPath = path.join(OUTPUT_DIR, `${cleanSlug}.svg`);

      // 1. Write local SVG buffer
      fs.writeFileSync(svgPath, svgContent, 'utf-8');

      try {
        // 2. Upload asset to Sanity CDN
        const fileStream = fs.createReadStream(svgPath);
        const asset = await client.assets.upload('image', fileStream, {
          filename: `${cleanSlug}-featured.svg`,
          contentType: 'image/svg+xml'
        });

        const imageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        };

        // 3. Patch document in Sanity
        await client.patch(post._id).set({ image: imageRef }).commit();

        // 4. Also patch draft if post._id is published or vice versa
        const altId = post._id.startsWith('drafts.') ? post._id.replace('drafts.', '') : `drafts.${post._id}`;
        try {
          await client.patch(altId).set({ image: imageRef }).commit();
        } catch (_) {
          // It's okay if altId doesn't exist
        }

        console.log(`  ✅ [${cleanSlug}] Image attached (Asset ID: ${asset._id})`);
        successCount++;
      } catch (err) {
        console.error(`  ❌ [${cleanSlug}] Failed:`, err.message);
        failCount++;
      }
    }));

    // Delay between chunks to respect rate limits
    if (i + CHUNK_SIZE < posts.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  console.log(`\n======================================================`);
  console.log(`🏁 Batch Image Ingestion Complete!`);
  console.log(`✅ Successfully uploaded & attached: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`======================================================\n`);
}

runBatchUpload().catch((err) => {
  console.error('Fatal batch error:', err);
});
