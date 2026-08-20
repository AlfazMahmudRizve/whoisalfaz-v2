const fs = require('fs');
const path = require('path');

const templates = [
  'manychat-async-timeout-handler.json',
  'apollo-to-brevo-enrichment-pipeline.json',
  'qdrant-multi-tenant-rag-engine.json'
];

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

console.log('🔍 Comprehensive Multi-Template AABB Collision & Layout Audit:\n');

for (const t of templates) {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates', t);
  const workflow = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const boxes = workflow.nodes.map(n => {
    const isSticky = n.type === 'n8n-nodes-base.stickyNote' || n.type.includes('sticky');
    const x = n.position[0];
    const y = n.position[1];
    const w = isSticky ? (n.parameters.width || 300) : NODE_WIDTH;
    const h = isSticky ? (n.parameters.height || 150) : NODE_HEIGHT;

    return {
      name: n.name,
      x1: x,
      y1: y,
      x2: x + w,
      y2: y + h
    };
  });

  let overlaps = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];

      if (a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1) {
        console.error(`   ❌ [${t}] Collision: "${a.name}" <-> "${b.name}"`);
        overlaps++;
      }
    }
  }

  console.log(`📋 Template: ${t}`);
  console.log(`   - Status: ${overlaps === 0 ? '✅ 100% PASS (Zero Overlaps)' : `❌ ${overlaps} Overlaps Detected`}\n`);
}
