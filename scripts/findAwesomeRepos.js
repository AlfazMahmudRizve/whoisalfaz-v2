const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Antigravity-Agent'
};

async function findRepos() {
  const queries = ['awesome n8n', 'awesome rag', 'awesome-selfhosted'];
  for (const q of queries) {
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=3`, { headers });
    const data = await res.json();
    console.log(`\n🔍 Query "${q}":`);
    if (data.items) {
      data.items.forEach(item => {
        console.log(`   - ${item.full_name} (⭐ ${item.stargazers_count}) - ${item.description || 'N/A'}`);
      });
    }
  }
}

findRepos().catch(console.error);
