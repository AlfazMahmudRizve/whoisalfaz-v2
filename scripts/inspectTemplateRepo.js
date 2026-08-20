const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Antigravity-Agent'
};

async function inspectRepo() {
  const res = await fetch('https://api.github.com/repos/enescingoz/awesome-n8n-templates/contents', { headers });
  const items = await res.json();
  console.log('📂 Repo root contents of enescingoz/awesome-n8n-templates:');
  items.forEach(i => console.log(`   - ${i.type}: ${i.path}`));
}

inspectRepo().catch(console.error);
