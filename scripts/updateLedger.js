const fs = require('fs');

const ledger = JSON.parse(fs.readFileSync('scratch/master_upgrade_ledger.json', 'utf8'));

const batch1Slugs = [
  'cometchat-dify-inapp-voice',
  'headless-wordpress-seo-nextjs-guide',
  'dify-ai-vultr-gpu-docker-deployment-guide',
  'apollo-to-brevo-n8n-pipeline-guide',
  'turbotic-automation-governance'
];

ledger.forEach(item => {
  if (batch1Slugs.includes(item.slug)) {
    item.status = 'VERIFIED';
    item.aiSlopHits = 0;
    item.lastUpdated = new Date().toISOString();
  }
});

fs.writeFileSync('scratch/master_upgrade_ledger.json', JSON.stringify(ledger, null, 2));

const verified = ledger.filter(i => i.status === 'VERIFIED').length;
console.log(`Updated Master Ledger: ${verified} / 105 articles VERIFIED.`);
