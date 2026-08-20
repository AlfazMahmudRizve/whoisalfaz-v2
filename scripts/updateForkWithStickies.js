const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Antigravity-Agent',
  'Content-Type': 'application/json'
};

const forkOwner = 'AlfazMahmudRizve';
const forkRepo = 'awesome-n8n-templates';
const branch = 'add-whoisalfaz-enterprise-templates';

const templatesToUpload = [
  {
    localFile: path.resolve(__dirname, '../ecosystem/n8n-templates/qdrant-multi-tenant-rag-engine.json'),
    repoPath: 'AI_Research_RAG_and_Data_Analysis/qdrant-multi-tenant-rag-engine.json',
    commitMsg: 'Update Qdrant RAG template with explanatory sticky notes'
  },
  {
    localFile: path.resolve(__dirname, '../ecosystem/n8n-templates/apollo-to-brevo-enrichment-pipeline.json'),
    repoPath: 'Gmail_and_Email_Automation/apollo-to-brevo-enrichment-pipeline.json',
    commitMsg: 'Update Apollo Brevo pipeline with explanatory sticky notes'
  },
  {
    localFile: path.resolve(__dirname, '../ecosystem/n8n-templates/manychat-async-timeout-handler.json'),
    repoPath: 'WhatsApp/manychat-async-timeout-handler.json',
    commitMsg: 'Update ManyChat Async Handler with explanatory sticky notes'
  }
];

async function updateFork() {
  console.log(`🚀 Updating workflow JSON files with sticky notes on fork branch ${branch}...`);

  for (const t of templatesToUpload) {
    const content = fs.readFileSync(t.localFile, 'utf-8');
    const base64Content = Buffer.from(content).toString('base64');

    let fileSha = undefined;
    try {
      const checkRes = await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/contents/${t.repoPath}?ref=${branch}`, { headers });
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        fileSha = checkData.sha;
      }
    } catch (_) {}

    const uploadRes = await fetch(`https://api.github.com/repos/${forkOwner}/${forkRepo}/contents/${t.repoPath}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: t.commitMsg,
        content: base64Content,
        branch: branch,
        ...(fileSha ? { sha: fileSha } : {})
      })
    });

    if (uploadRes.ok) {
      console.log(`   ✅ Updated ${t.repoPath} on GitHub!`);
    } else {
      console.error(`   ❌ Failed to update ${t.repoPath}`);
    }
  }
}

updateFork().catch(console.error);
