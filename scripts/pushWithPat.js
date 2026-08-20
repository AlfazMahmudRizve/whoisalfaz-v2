const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pat = process.env.GITHUB_PAT;
if (!pat) {
  console.error('❌ GITHUB_PAT not found in .env.local');
  process.exit(1);
}

try {
  console.log('🚀 Pushing to origin (AlfazMahmudRizve/whoisalfaz-v2)...');
  const originUrl = `https://AlfazMahmudRizve:${pat}@github.com/AlfazMahmudRizve/whoisalfaz-v2.git`;
  execSync(`git push "${originUrl}" main --force`, { stdio: 'inherit' });
  console.log('✅ Pushed to origin successfully!');
} catch (e) {
  console.error('❌ Failed to push to origin:', e.message);
}

try {
  console.log('\n🚀 Pushing to deploy (Whois-Alfaz/whoisalfazv2)...');
  const deployUrl = `https://AlfazMahmudRizve:${pat}@github.com/Whois-Alfaz/whoisalfazv2.git`;
  execSync(`git push "${deployUrl}" main --force`, { stdio: 'inherit' });
  console.log('✅ Pushed to deploy successfully!');
} catch (e) {
  console.error('⚠️ Note on deploy remote:', e.message);
}
