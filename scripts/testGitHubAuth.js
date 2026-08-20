const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
if (!pat || pat === 'paste_your_github_token_here') {
  console.error('❌ GITHUB_PAT not set in .env.local');
  process.exit(1);
}

async function testAuth() {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Antigravity-Agent'
    }
  });

  if (!res.ok) {
    console.error(`❌ GitHub Auth Failed: ${res.status} ${res.statusText}`);
    const err = await res.text();
    console.error(err);
    process.exit(1);
  }

  const data = await res.json();
  console.log(`✅ GitHub Authenticated successfully as: ${data.login} (${data.name || 'N/A'})`);
  console.log(`   Public Repos: ${data.public_repos}`);
  console.log(`   Account URL: ${data.html_url}`);
}

testAuth().catch(console.error);
