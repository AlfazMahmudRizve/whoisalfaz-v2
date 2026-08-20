const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function createTelegraphArticle() {
  console.log('🚀 Creating Telegraph Account & Publishing Article...\n');

  // 1. Create or get account
  const accountRes = await fetch('https://api.telegra.ph/createAccount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      short_name: 'whoisalfaz',
      author_name: 'Alfaz Mahmud Rizve',
      author_url: 'https://whoisalfaz.me'
    })
  });

  const accountData = await accountRes.json();
  if (!accountData.ok) {
    console.error('❌ Failed to create Telegraph account:', accountData.error);
    return;
  }

  const accessToken = accountData.result.access_token;
  console.log(`✅ Telegraph Account Ready: ${accountData.result.author_name}`);

  // 2. Format article content in Telegraph Node tree structure
  const content = [
    {
      tag: 'p',
      children: [
        {
          tag: 'b',
          children: ['The 2026 Technical SEO Dilemma: ']
        },
        'Screaming Frog has been the industry standard desktop crawler for over a decade. But at $259/year per user, with an arbitrary 500-URL crawl cap on its free plan and heavy local RAM consumption during JavaScript rendering, modern growth teams and agencies need lightweight, cloud-based alternatives.'
      ]
    },
    {
      tag: 'h3',
      children: ['Why Desktop Crawlers Fall Short in 2026']
    },
    {
      tag: 'p',
      children: [
        '1. ',
        { tag: 'b', children: ['Local RAM Bottlenecks: '] },
        'Rendering heavy client-side React and Next.js applications on a desktop laptop consumes 8GB+ of system memory.\n',
        '2. ',
        { tag: 'b', children: ['No Real-Time Client Sharing: '] },
        'Desktop crawlers save raw CSVs and local project databases that cannot be shared instantly with clients or team members via a live URL.\n',
        '3. ',
        { tag: 'b', children: ['Domain Verification Walls: '] },
        'Most cloud tools require DNS record verification or Google Search Console ownership, preventing rapid pre-sales competitor audits.'
      ]
    },
    {
      tag: 'h3',
      children: ['The 5 Best Free Screaming Frog Alternatives']
    },
    {
      tag: 'p',
      children: [
        { tag: 'b', children: ['1. WhoisAlfaz Website Audit Tool (Best Free Browser Tool)'] },
        '\n• 100% browser-based single-page crawler.\n• Zero software installation and zero domain verification.\n• Instant checks for Core Web Vitals, TLS SSL certificates, and HTTP security headers (HSTS, CSP, X-Frame-Options).\n• Run free scan: ',
        {
          tag: 'a',
          attrs: { href: 'https://whoisalfaz.me/audit/' },
          children: ['whoisalfaz.me/audit']
        }
      ]
    },
    {
      tag: 'p',
      children: [
        { tag: 'b', children: ['2. Ahrefs Webmaster Tools (AWT)'] },
        '\n• 5,000 free monthly crawl credits for verified domains.\n• Excellent link equity visualization and canonical error detection.'
      ]
    },
    {
      tag: 'p',
      children: [
        { tag: 'b', children: ['3. SEOptimer'] },
        '\n• Fast visual page grading with PDF report exports.'
      ]
    },
    {
      tag: 'p',
      children: [
        { tag: 'b', children: ['4. Spotibo'] },
        '\n• On-page cloud crawler supporting up to 500 URLs monthly without desktop software.'
      ]
    },
    {
      tag: 'p',
      children: [
        { tag: 'b', children: ['5. Google Search Console'] },
        '\n• Authoritative first-party indexation, mobile usability, and Core Web Vitals telemetry.'
      ]
    },
    {
      tag: 'h3',
      children: ['Architectural Comparison Matrix']
    },
    {
      tag: 'p',
      children: [
        'Read the full deep-dive comparison and benchmark teardown at ',
        {
          tag: 'a',
          attrs: { href: 'https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/' },
          children: ['5 Best Screaming Frog Alternatives: Free Browser-Based SEO Audit Tools [2026]']
        },
        '.'
      ]
    },
    {
      tag: 'hr'
    },
    {
      tag: 'p',
      children: [
        { tag: 'i', children: ['Engineered by Alfaz Mahmud Rizve — RevOps Architect & Full Stack Automation Engineer. Explore workflows and open-source blueprints at '] },
        {
          tag: 'a',
          attrs: { href: 'https://whoisalfaz.me' },
          children: ['whoisalfaz.me']
        },
        '.'
      ]
    }
  ];

  // 3. Publish page
  const pageRes = await fetch('https://api.telegra.ph/createPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: accessToken,
      title: '5 Free Screaming Frog Alternatives (No Install, No 500-URL Limit) [2026]',
      author_name: 'Alfaz Mahmud Rizve',
      author_url: 'https://whoisalfaz.me',
      content: content,
      return_content: false
    })
  });

  const pageData = await pageRes.json();
  if (!pageData.ok) {
    console.error('❌ Failed to publish Telegraph page:', pageData.error);
    return;
  }

  console.log('🎉 TELEGRAPH ARTICLE PUBLISHED SUCCESSFULLY!');
  console.log(`🔗 Live URL: https://telegra.ph/${pageData.result.path}`);
  console.log(`📌 Title: ${pageData.result.title}`);
}

createTelegraphArticle().catch(console.error);
