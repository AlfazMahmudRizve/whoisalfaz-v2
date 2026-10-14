const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const baseUrl = 'https://whoisalfaz.me';
const apiKey = process.env.BING_API_KEY;
const indexNowKey = process.env.INDEXNOW_KEY || 'ad4ebd88b14a40879951cbab5300d6aa';

async function run() {
  console.log('🚀 Gathering all site URLs for Bing & IndexNow push...');

  // 1. Core static routes
  const staticRoutes = [
    '/',
    '/about/',
    '/portfolio/',
    '/blog/',
    '/blog/30-days-of-n8n/',
    '/case-studies/',
    '/contact/',
    '/services/',
    '/partners/',
    '/labs/',
    '/labs/roi/',
    '/audit/',
    '/terms/',
    '/privacy-policy/',
    '/editorial-policy/',
  ].map(r => `${baseUrl}${r}`);

  // 2. Service pages
  const serviceSlugs = [
    'n8n-automation',
    'growth-consulting',
    'headless-architecture',
    'seo-organic-growth'
  ];
  const serviceRoutes = serviceSlugs.map(slug => `${baseUrl}/services/${slug}/`);

  // 3. Blog posts from Sanity
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] { "slug": slug.current }`);
  const blogRoutes = posts.map(p => `${baseUrl}/blog/${p.slug}/`);

  // 4. Categories
  const categories = await client.fetch(`*[_type == "category" && defined(slug.current)] { "slug": slug.current }`);
  const categoryRoutes = categories.map(c => `${baseUrl}/blog/category/${c.slug}/`);

  const allUrls = Array.from(new Set([...staticRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes]));
  console.log(`📋 Total unique canonical URLs gathered: ${allUrls.length}`);

  // 5. Submit to IndexNow
  console.log('\n📡 Submitting to IndexNow (Bing, Yandex, Seznam)...');
  try {
    const indexNowPayload = {
      host: 'whoisalfaz.me',
      key: indexNowKey,
      keyLocation: `${baseUrl}/${indexNowKey}.txt`,
      urlList: allUrls
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow Submission Successful! (Status: ${res.status}) - ${allUrls.length} URLs submitted.`);
    } else {
      const errText = await res.text();
      console.warn(`⚠️ IndexNow responded with HTTP ${res.status}: ${errText}`);
    }
  } catch (err) {
    console.error('❌ IndexNow Error:', err.message);
  }

  // 6. Submit directly to Bing Webmaster URL Batch API
  if (apiKey) {
    console.log('\n📡 Submitting directly to Bing Webmaster URL Batch API...');
    const batchSize = 100;
    for (let i = 0; i < allUrls.length; i += batchSize) {
      const batch = allUrls.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      try {
        const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            siteUrl: baseUrl,
            urlList: batch
          })
        });

        if (res.ok) {
          console.log(`✅ Bing Batch #${batchNum} (${batch.length} URLs) Accepted!`);
        } else {
          const errText = await res.text();
          console.warn(`⚠️ Bing Batch #${batchNum} Error ${res.status}: ${errText}`);
        }
      } catch (err) {
        console.error(`❌ Bing Batch #${batchNum} Network Error:`, err.message);
      }
    }
  } else {
    console.log('ℹ️ BING_API_KEY not configured for direct API; IndexNow handled Bing distribution.');
  }

  console.log('\n🎉 Submission cycle complete!');
}

run().catch(console.error);
