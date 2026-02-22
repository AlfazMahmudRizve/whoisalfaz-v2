const API_URL = 'https://v1.whoisalfaz.me/graphql';

async function generateUrlList() {
    const query = `
    query AllUrls {
      posts(first: 100) {
        nodes {
          slug
        }
      }
      pages(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const json = await res.json();

        const urls = [
            'https://whoisalfaz.me/',
            'https://whoisalfaz.me/blog',
            'https://whoisalfaz.me/portfolio',
            'https://whoisalfaz.me/services',
            'https://whoisalfaz.me/contact',
            'https://whoisalfaz.me/audit',
            'https://whoisalfaz.me/labs',
            'https://whoisalfaz.me/privacy-policy',
            'https://whoisalfaz.me/terms'
        ];

        json.data.posts.nodes.forEach(post => {
            urls.push(`https://whoisalfaz.me/blog/${post.slug}`);
        });

        json.data.pages.nodes.forEach(page => {
            // Avoid duplicating hardcoded pages
            if (!['home', 'blog', 'portfolio', 'services', 'contact', 'audit', 'labs', 'privacy-policy', 'terms'].includes(page.slug)) {
                urls.push(`https://whoisalfaz.me/${page.slug}`);
            }
        });

        console.log(urls.join('\n'));
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

generateUrlList();
