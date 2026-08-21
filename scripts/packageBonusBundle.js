const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const templatesDir = path.resolve(__dirname, '../ecosystem/n8n-templates');
const publicDownloadsDir = path.resolve(__dirname, '../public/downloads');
const zipOutputPath = path.join(publicDownloadsDir, 'manychat-automation-bonus-pack.zip');

if (!fs.existsSync(publicDownloadsDir)) {
  fs.mkdirSync(publicDownloadsDir, { recursive: true });
}

// Create a staging directory
const stagingDir = path.join(__dirname, '../scratch/bonus-staging');
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// Copy templates
const filesToCopy = [
  'manychat-async-timeout-handler.json',
  'apollo-to-brevo-enrichment-pipeline.json',
  'qdrant-multi-tenant-rag-engine.json',
  'README.md'
];

for (const file of filesToCopy) {
  const src = path.join(templatesDir, file);
  const dest = path.join(stagingDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Write Quick Start Guide
const quickStartGuide = `# 🚀 ManyChat & n8n VIP Automation Bonus Pack
**Curated by Alfaz Mahmud Rizve — whoisalfaz.me**

Thank you for registering for the Instagram Summit by ManyChat via our partner link! 

---

## 📦 What's Inside This Archive:

1. **\`manychat-async-timeout-handler.json\`**
   * Solves ManyChat's 10-second external webhook timeout limit.
   * Decouples synchronous handshake from heavy AI/CRM processing with async WhatsApp callback.

2. **\`apollo-to-brevo-enrichment-pipeline.json\`**
   * Automatically enriches inbound leads from Apollo API.
   * Filters out disposable/personal emails and scores ICP fit before syncing to Brevo CRM.

3. **\`qdrant-multi-tenant-rag-engine.json\`**
   * Enterprise vector search and AI knowledge-retrieval pipeline.
   * Includes metadata filtering and OpenAI/Ollama vector embeddings.

---

## 🛠️ How to Import into n8n:
1. Open your self-hosted or cloud **n8n instance**.
2. Click **Workflows** > **Import from File...** (or press \`Ctrl+O\` / \`Cmd+O\`).
3. Select any of the \`.json\` workflow files above.
4. Replace environment placeholders (e.g., \`$BREVO_API_KEY\`, \`$MANYCHAT_PAGE_TOKEN\`) with your own credentials.
5. Hit **Activate**!

---

## 💬 Need Custom Architecture or Enterprise Implementation?
If your team needs custom AI agent development, multi-tenant vector databases, or high-volume RevOps automation:
👉 **Book a Private Architecture Review:** [https://whoisalfaz.me/contact/](https://whoisalfaz.me/contact/)
`;

fs.writeFileSync(path.join(stagingDir, 'QUICK-START-GUIDE.md'), quickStartGuide, 'utf8');

// Zip on Windows using PowerShell Compress-Archive
try {
  if (fs.existsSync(zipOutputPath)) {
    fs.unlinkSync(zipOutputPath);
  }
  const psCmd = `powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${zipOutputPath}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });
  console.log(`✅ Successfully generated: ${zipOutputPath}`);
} catch (err) {
  console.error('Error generating zip:', err);
}
