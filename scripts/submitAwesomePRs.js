const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
if (!pat) {
  console.error('❌ GITHUB_PAT not set in .env.local');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${pat}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Antigravity-Agent',
  'Content-Type': 'application/json'
};

const targets = [
  {
    upstreamOwner: 'restyler',
    upstreamRepo: 'awesome-n8n',
    branchName: 'add-n8n-qdrant-fastapi-bridge',
    entry: '- [n8n-qdrant-fastapi-bridge](https://github.com/AlfazMahmudRizve/n8n-qdrant-fastapi-bridge) - Production-ready FastAPI bridge connecting n8n workflows to self-hosted Qdrant vector database with bearer token security and sub-5ms local embeddings.',
    findSection: /##\s*(?:Community Nodes|Community|Tutorials|Integrations|Workflows)/i,
    prTitle: 'Add n8n-qdrant-fastapi-bridge vector database integration',
    prBody: `### Description
Adds [n8n-qdrant-fastapi-bridge](https://github.com/AlfazMahmudRizve/n8n-qdrant-fastapi-bridge) to the list of community n8n integrations.

### Features
- Connects n8n AI agent nodes to self-hosted Qdrant vector databases
- FastEmbed sub-5ms local ONNX embeddings (no OpenAI API rate limits)
- Bearer token authentication and Docker Compose deployment

Thank you!`
  },
  {
    upstreamOwner: 'enescingoz',
    upstreamRepo: 'awesome-n8n-templates',
    branchName: 'add-whoisalfaz-enterprise-templates',
    entry: '- [Multi-Tenant Qdrant RAG & Apollo Brevo Enrichment](https://github.com/AlfazMahmudRizve/whoisalfaz-v2/tree/main/ecosystem/n8n-templates) - Enterprise RAG vector search with tenant isolation, Apollo to Brevo B2B waterfall lead enrichment, and ManyChat async timeout handling.',
    findSection: /##\s*(?:AI Agents|RAG|Templates|Workflows|Category)/i,
    prTitle: 'Add Multi-Tenant RAG & Apollo Enrichment workflows',
    prBody: `### Description
Adds enterprise production templates from [Alfaz Mahmud Rizve](https://github.com/AlfazMahmudRizve/whoisalfaz-v2/tree/main/ecosystem/n8n-templates) covering:
1. **Multi-Tenant Qdrant RAG Engine:** Isolated vector store queries with OpenAI/Ollama embeddings.
2. **Apollo to Brevo Outbound Pipeline:** Automated lead scraping, domain classification, and ICP scoring.
3. **ManyChat Async Timeout Handler:** Sub-150ms handshake to bypass 10-second webhook timeouts.

Thank you!`
  }
];

async function submitPR(target) {
  console.log(`\n======================================================`);
  console.log(`🎯 Processing target: ${target.upstreamOwner}/${target.upstreamRepo}`);

  // 1. Get upstream repo details
  const upstreamRes = await fetch(`https://api.github.com/repos/${target.upstreamOwner}/${target.upstreamRepo}`, { headers });
  if (!upstreamRes.ok) {
    console.error(`   ❌ Upstream repo not accessible: ${upstreamRes.status}`);
    return;
  }
  const upstreamData = await upstreamRes.json();
  const defaultBranch = upstreamData.default_branch || 'main';
  console.log(`   Default branch: ${defaultBranch}`);

  // 2. Fork repository
  console.log(`   🍴 Forking ${target.upstreamOwner}/${target.upstreamRepo}...`);
  const forkRes = await fetch(`https://api.github.com/repos/${target.upstreamOwner}/${target.upstreamRepo}/forks`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ default_branch_only: true })
  });
  const forkData = await forkRes.json();
  const forkOwner = forkData.owner?.login || 'AlfazMahmudRizve';
  const forkRepo = forkData.name || target.upstreamRepo;
  console.log(`   Fork created at: ${forkOwner}/${forkRepo}`);

  // Wait 4 seconds for fork propagation
  await new Promise(r => setTimeout(r, 4000));

  // 3. Fetch README from upstream
  const readmeRes = await fetch(`https://api.github.com/repos/${target.upstreamOwner}/${target.upstreamRepo}/readme`, { headers });
  if (!readmeRes.ok) {
    console.error(`   ❌ Failed to fetch README: ${readmeRes.status}`);
    return;
  }
  const readmeData = await readmeRes.json();
  const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
  const readmePath = readmeData.path || 'README.md';

  if (readmeContent.includes('AlfazMahmudRizve') || readmeContent.includes(target.branchName)) {
    console.log(`   ℹ️ Entry already present in README!`);
    return;
  }

  // 4. Insert entry cleanly into README content
  let updatedContent = readmeContent;
  const sectionMatch = readmeContent.match(target.findSection);
  if (sectionMatch) {
    const idx = sectionMatch.index + sectionMatch[0].length;
    updatedContent = readmeContent.slice(0, idx) + '\n' + target.entry + readmeContent.slice(idx);
  } else {
    updatedContent = readmeContent + '\n\n' + target.entry + '\n';
  }

  // 5. Get base branch commit SHA
  const refRes = await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/git/ref/heads/${defaultBranch}`, { headers });
  if (!refRes.ok) {
    console.error(`   ❌ Failed to get base branch SHA: ${refRes.status}`);
    return;
  }
  const refData = await refRes.json();
  const baseSha = refData.object.sha;

  // 6. Create new branch in fork
  console.log(`   🌿 Creating branch '${target.branchName}' in fork...`);
  await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/git/refs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ref: `refs/heads/${target.branchName}`,
      sha: baseSha
    })
  });

  // 7. Get fork's README sha on new branch
  const forkReadmeRes = await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/contents/${readmePath}?ref=${target.branchName}`, { headers });
  const forkReadmeData = await forkReadmeRes.json();
  const currentFileSha = forkReadmeData.sha;

  // 8. Commit updated README to branch
  console.log(`   📝 Committing update to ${readmePath}...`);
  const updateRes = await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/contents/${readmePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: target.prTitle,
      content: Buffer.from(updatedContent).toString('base64'),
      sha: currentFileSha,
      branch: target.branchName
    })
  });

  if (!updateRes.ok) {
    console.error(`   ❌ Failed to commit update: ${updateRes.status}`);
    const err = await updateRes.text();
    console.error(err);
    return;
  }
  console.log(`   ✅ File committed to branch successfully!`);

  // 9. Open Pull Request on upstream
  console.log(`   🚀 Opening Pull Request on ${target.upstreamOwner}/${target.upstreamRepo}...`);
  const prRes = await fetch(`https://api.github.com/repos/${target.upstreamOwner}/${target.upstreamRepo}/pulls`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: target.prTitle,
      body: target.prBody,
      head: `${forkOwner}:${target.branchName}`,
      base: defaultBranch
    })
  });

  if (!prRes.ok) {
    console.error(`   ⚠️ PR Creation Response: ${prRes.status}`);
    const prErr = await prRes.text();
    console.error(`   ${prErr}`);
    return;
  }

  const prData = await prRes.json();
  console.log(`   🎉 PULL REQUEST CREATED SUCCESSFULLY!`);
  console.log(`   🔗 PR URL: ${prData.html_url}`);
}

async function run() {
  console.log('🚀 Automating GitHub Awesome-List Pull Requests via GitHub API...\n');
  for (const target of targets) {
    await submitPR(target);
  }
  console.log('\n✨ All Awesome-List PRs processed!');
}

run().catch(console.error);
