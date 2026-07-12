const fs = require('fs');
const path = require('path');

const files = [
  'workflows/monday-com-revops-recipes.json',
  'workflows/databox-revops-dashboard-pipeline.json',
  'workflows/trainual-sop-documenting-engine.json',
  'workflows/living-operations-manual-sync.json'
];

files.forEach(f => {
  const fullPath = path.resolve(__dirname, '..', f);
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const parsed = JSON.parse(content);
    console.log(`✅ ${f} is valid JSON.`);
    console.log(`   Name: "${parsed.name}"`);
    console.log(`   Nodes Count: ${parsed.nodes?.length}`);
    console.log(`   Connections: ${Object.keys(parsed.connections || {}).length} node connections.`);
  } catch (error) {
    console.error(`❌ ${f} failed validation:`, error.message);
  }
});
