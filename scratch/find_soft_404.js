const baseUrl = 'https://whoisalfaz.me';

async function checkSoft404() {
  const suspectUrls = [
    `${baseUrl}/search/`,
    `${baseUrl}/store/`,
    `${baseUrl}/labs/chat/`,
    `${baseUrl}/audit/results/test/`,
    `${baseUrl}/blog/category/learn-automation-in-30-days/`,
    `${baseUrl}/blog/category/30-days-of-n8n-automation/`,
    `${baseUrl}/blog/category/technology/`
  ];

  // Also check all category pages
  const cats = ['architecture-teardowns', '30-days-of-n8n-automation', 'automation-tools', 'seo-optimization', 'ai-content-systems', 'revops-architecture'];
  for (const c of cats) {
    suspectUrls.push(`${baseUrl}/blog/category/${c}/`);
  }

  for (const u of suspectUrls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      console.log(`URL: ${u} | Status: ${res.status} | Length: ${text.length}`);
      if (res.status === 200 && (text.includes('Page Not Found') || text.includes('404') || text.includes('No posts found') || text.includes('no articles found'))) {
        console.log(`  👉 Potential Soft 404: ${u}`);
      }
    } catch (e) {
      console.error(u, e.message);
    }
  }
}

checkSoft404();
