const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const slug = 'screaming-frog-alternatives-free-seo-audit-tools';

async function updatePost() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.error('Post not found:', slug);
    process.exit(1);
  }

  let body = post.body;

  const openSourceAndFaqSection = `

## Free & Open-Source Screaming Frog Alternatives (Unlimited Crawls)

If your website exceeds Screaming Frog's 500-URL limit and you don't want to pay the £99/year ($125/year) license, several **open-source and browser-based alternative crawlers** eliminate software installation and URL restrictions:

### 1. Open-Source Python & Node Crawlers (Self-Hosted)
* **Advertools (Python):** An open-source Python package that executes asynchronous HTTP crawling, extracting status codes, canonicals, Hreflang, and schema without arbitrary URL caps.
* **Site-Audit-CLI (Node.js):** Lightweight terminal-based crawler using Puppeteer to audit JavaScript-rendered pages and Core Web Vitals on self-hosted VPS servers.
* **Scrapy SEO Spider:** A customizable framework for distributed large-scale crawling across tens of thousands of URLs without memory crashing.

### 2. Zero-Install Online Alternatives
Unlike desktop spiders that consume heavy local CPU and RAM (frequently freezing on computers with under 16GB RAM), online cloud crawlers run scans asynchronously in the cloud:
* Run ad-hoc audits on client domains without needing DNS verification or license keys.
* Generate shareable web reports with instant status code trees, redirect chains, and missing metadata alerts.

---

## Frequently Asked Questions

### What is the best free alternative to Screaming Frog?
For zero-install web audits, the [WhoisAlfaz Website Audit Tool](/audit) and Ahrefs Webmaster Tools (AWT) are top choices. AWT allows up to 5,000 monthly URLs on verified websites, while browser-based audit tools let you inspect any domain instantly without local RAM consumption or installation.

### Is there an online Screaming Frog alternative that doesn't require downloading software?
Yes. Browser-based crawlers like the WhoisAlfaz Audit Utility, SEOptimer, and Spotibo perform full technical on-page audits entirely in the cloud. They analyze response codes, heading hygiene, OpenGraph tags, and canonical integrity without downloading desktop Java software.

### Are there open-source alternatives to Screaming Frog SEO Spider?
Yes. Popular open-source alternatives include Advertools (Python-based asynchronous crawler) and Scrapy SEO frameworks. These provide unlimited crawling capabilities with zero licensing fees, though they require command-line familiarity to configure and parse data.

### What are the limits of the free version of Screaming Frog?
Screaming Frog's free tier is strictly capped at 500 URLs per crawl session. It also disables critical advanced features, including JavaScript rendering (Chromium headless), Google Search Console and GA4 API integration, custom source code extraction, and automated scheduling.
`;

  body = body + openSourceAndFaqSection;

  const newSeoTitle = 'Free Screaming Frog Alternatives: 5 Best Crawlers [2026]'; // 56 chars
  const newMetaDesc = 'Discover the 5 best free and open-source Screaming Frog alternatives in 2026. Compare online web crawlers, crawl limits, and zero-install audit tools.'; // 151 chars

  console.log('Updating Screaming Frog Post ID:', post._id);
  console.log('SEOTitle:', newSeoTitle, 'Length:', newSeoTitle.length);
  console.log('MetaDescription:', newMetaDesc, 'Length:', newMetaDesc.length);

  await client
    .patch(post._id)
    .set({
      body: body,
      seoTitle: newSeoTitle,
      metaDescription: newMetaDesc,
    })
    .commit();

  console.log('✅ Successfully updated Screaming Frog post in Sanity');
}

updatePost().catch(console.error);
