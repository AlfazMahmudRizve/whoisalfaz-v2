const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { execSync } = require('child_process');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
if (!pat || pat === 'paste_your_github_token_here') {
  console.error('❌ GITHUB_PAT is not configured in .env.local');
  process.exit(1);
}

const GITHUB_OWNER = 'AlfazMahmudRizve';
const HEADERS = {
  'Authorization': `Bearer ${pat}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Antigravity-Blueprint-Deployer/1.0'
};

const BLUEPRINTS = [
  {
    name: 'n8n-qdrant-fastapi-bridge',
    dir: path.resolve(__dirname, '../blueprints/n8n-qdrant-fastapi-bridge'),
    description: 'High-performance FastAPI bridge connecting n8n automation workflows with Qdrant vector database for self-hosted RAG & RevOps.',
    homepage: 'https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/',
    topics: ['n8n', 'qdrant', 'fastapi', 'vector-database', 'rag', 'docker', 'revops', 'embeddings', 'vultr']
  },
  {
    name: 'enterprise-rag-vultr-docker',
    dir: path.resolve(__dirname, '../blueprints/enterprise-rag-vultr-docker'),
    description: 'Production-ready self-hosted Enterprise RAG infrastructure with Qdrant, Dify AI Studio, Ollama LLM, and Caddy Auto-HTTPS on Vultr.',
    homepage: 'https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/',
    topics: ['rag', 'qdrant', 'dify', 'ollama', 'docker', 'caddy', 'vultr', 'vector-database', 'self-hosted', 'ai-agents']
  },
  {
    name: 'headless-nextjs-seo-auditor',
    dir: path.resolve(__dirname, '../blueprints/headless-nextjs-seo-auditor'),
    description: 'Automated technical SEO crawler & auditor for Next.js App Router, SSR, and Headless CMS websites. Free Screaming Frog alternative.',
    homepage: 'https://whoisalfaz.me/audit/',
    topics: ['seo', 'nextjs', 'technical-seo', 'seo-audit', 'crawler', 'screaming-frog-alternative', 'headless-cms', 'revops', 'json-ld']
  }
];

async function ensureRepository(repo) {
  console.log(`\n🔍 Checking repository: ${GITHUB_OWNER}/${repo.name}...`);
  
  const checkRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo.name}`, {
    headers: HEADERS
  });

  if (checkRes.status === 404) {
    console.log(`📦 Creating new public repository: ${repo.name}...`);
    const createRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: repo.name,
        description: repo.description,
        homepage: repo.homepage,
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: false,
        auto_init: false
      })
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create repository ${repo.name}: ${createRes.status} ${err}`);
    }
    const created = await createRes.json();
    console.log(`✅ Repository created: ${created.html_url}`);
  } else if (checkRes.ok) {
    console.log(`ℹ️ Repository already exists. Updating metadata...`);
    const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo.name}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({
        description: repo.description,
        homepage: repo.homepage,
        private: false,
        has_issues: true,
        has_projects: true
      })
    });
    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.warn(`⚠️ Warning: Failed to update metadata: ${err}`);
    } else {
      console.log(`✅ Repository metadata updated.`);
    }
  } else {
    const err = await checkRes.text();
    throw new Error(`Failed to check repository ${repo.name}: ${checkRes.status} ${err}`);
  }

  // Set Topics
  console.log(`🏷️ Updating topics for ${repo.name}...`);
  const topicsRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo.name}/topics`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({
      names: repo.topics
    })
  });

  if (!topicsRes.ok) {
    const err = await topicsRes.text();
    console.warn(`⚠️ Warning: Failed to set topics: ${err}`);
  } else {
    console.log(`✅ Topics applied: [${repo.topics.join(', ')}]`);
  }
}

function pushBlueprintToGit(repo) {
  console.log(`🚀 Preparing Git push for ${repo.name} from ${repo.dir}...`);

  if (!fs.existsSync(repo.dir)) {
    throw new Error(`Directory does not exist: ${repo.dir}`);
  }

  const gitAuthUrl = `https://x-access-token:${pat}@github.com/${GITHUB_OWNER}/${repo.name}.git`;
  const cleanUrl = `https://github.com/${GITHUB_OWNER}/${repo.name}.git`;

  try {
    // 1. Check if .git exists, init if not
    const gitDir = path.join(repo.dir, '.git');
    if (!fs.existsSync(gitDir)) {
      execSync('git init', { cwd: repo.dir, stdio: 'pipe' });
    }

    // 2. Configure git identity
    execSync('git config user.name "Alfaz Mahmud Rizve"', { cwd: repo.dir, stdio: 'pipe' });
    execSync('git config user.email "contact@whoisalfaz.me"', { cwd: repo.dir, stdio: 'pipe' });

    // 3. Checkout main branch
    execSync('git checkout -B main', { cwd: repo.dir, stdio: 'pipe' });

    // 4. Add all files
    execSync('git add -A', { cwd: repo.dir, stdio: 'pipe' });

    // 5. Commit if changes exist
    try {
      execSync('git commit -m "feat: initial production blueprint release"', { cwd: repo.dir, stdio: 'pipe' });
    } catch (e) {
      console.log('   (No changes to commit or working tree clean)');
    }

    // 6. Set authenticated remote
    try {
      execSync('git remote remove origin', { cwd: repo.dir, stdio: 'pipe' });
    } catch (_) {}
    execSync(`git remote add origin ${gitAuthUrl}`, { cwd: repo.dir, stdio: 'pipe' });

    // 7. Push to GitHub
    console.log(`   Pushing commits to remote origin/main...`);
    execSync('git push -u origin main --force', { cwd: repo.dir, stdio: 'pipe' });

    // 8. Sanitize remote to clean URL without embedded token
    execSync(`git remote set-url origin ${cleanUrl}`, { cwd: repo.dir, stdio: 'pipe' });

    console.log(`✅ Code successfully pushed to https://github.com/${GITHUB_OWNER}/${repo.name}`);
  } catch (err) {
    // Sanitize any token from error output
    const sanitizedMsg = err.message ? err.message.replace(pat, '***') : 'Unknown Git error';
    throw new Error(`Git operation failed for ${repo.name}: ${sanitizedMsg}`);
  }
}

async function main() {
  console.log('================================================================');
  console.log('🚀 Phase 4: GitHub Blueprint & Repository Automation Engine');
  console.log(`   Target Organization / User: ${GITHUB_OWNER}`);
  console.log('================================================================');

  const deployedRepos = [];

  for (const repo of BLUEPRINTS) {
    try {
      await ensureRepository(repo);
      pushBlueprintToGit(repo);
      deployedRepos.push({
        name: repo.name,
        url: `https://github.com/${GITHUB_OWNER}/${repo.name}`,
        homepage: repo.homepage,
        topics: repo.topics
      });
    } catch (err) {
      console.error(`❌ Error deploying ${repo.name}:`, err.message);
      process.exit(1);
    }
  }

  console.log('\n================================================================');
  console.log('🎉 ALL BLUEPRINTS DEPLOYED AND SYNCHRONIZED SUCCESSFULLY!');
  console.log('================================================================\n');

  console.table(deployedRepos.map(r => ({
    Repository: r.name,
    'Live GitHub URL': r.url,
    'Connected Blog / Tool': r.homepage
  })));
}

main().catch(err => {
  console.error('Fatal Deployment Error:', err);
  process.exit(1);
});

