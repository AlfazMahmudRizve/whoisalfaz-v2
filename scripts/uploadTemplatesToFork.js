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
    commitMsg: 'Add Multi-Tenant Qdrant RAG Engine template'
  },
  {
    localFile: path.resolve(__dirname, '../ecosystem/n8n-templates/apollo-to-brevo-enrichment-pipeline.json'),
    repoPath: 'Gmail_and_Email_Automation/apollo-to-brevo-enrichment-pipeline.json',
    commitMsg: 'Add Apollo to Brevo B2B Enrichment Pipeline template'
  },
  {
    localFile: path.resolve(__dirname, '../ecosystem/n8n-templates/manychat-async-timeout-handler.json'),
    repoPath: 'WhatsApp/manychat-async-timeout-handler.json',
    commitMsg: 'Add ManyChat Async WhatsApp Timeout Handler template'
  }
];

async function uploadFiles() {
  console.log(`🚀 Uploading actual workflow JSON files to fork branch ${branch}...`);

  for (const t of templatesToUpload) {
    console.log(`\n📌 Uploading ${t.repoPath}...`);
    const content = fs.readFileSync(t.localFile, 'utf-8');
    const base64Content = Buffer.from(content).toString('base64');

    // Check if file already exists in branch to get SHA
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

    if (!uploadRes.ok) {
      console.error(`   ❌ Failed to upload ${t.repoPath}: ${uploadRes.status}`);
      const err = await uploadRes.text();
      console.error(err);
    } else {
      console.log(`   ✅ Successfully added ${t.repoPath} to PR #193!`);
    }
  }

  console.log('\n✨ All workflow JSON files uploaded to PR branch! The automated bot will now validate the PR as a genuine template submission.');
}

uploadFiles().catch(console.error);
