const fs = require('fs');
const path = require('path');

function autoLayoutWorkflow(filename) {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates', filename);
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const stickies = raw.nodes.filter(n => n.type.includes('sticky'));
  const executable = raw.nodes.filter(n => !n.type.includes('sticky'));

  console.log(`\n📐 Auto-layout for ${filename}:`);
  console.log(`   Stickies: ${stickies.length}, Executable: ${executable.length}`);

  // Place overview stickies at Y = -350
  if (stickies[0]) stickies[0].position = [0, -350];
  if (stickies[1]) stickies[1].position = [620, -350];

  // Distribute other stickies at Y = -50 with 600px spacing
  let stickyX = 0;
  for (let i = 2; i < stickies.length; i++) {
    stickies[i].position = [stickyX, -50];
    const w = stickies[i].parameters.width || 450;
    stickyX += w + 80;
  }

  // Layout executable nodes at Y = 200 with 340px spacing
  let nodeX = 0;
  let branchOffset = 0;
  executable.forEach((n) => {
    const isBranch = n.name.includes('Reject') || n.name.includes('Normalizer') || n.name.includes('Standard List') || n.name.includes('Unauthorized');
    if (isBranch) {
      n.position = [nodeX, 440];
      nodeX += 340;
    } else {
      n.position = [nodeX, 200];
      nodeX += 340;
    }
  });

  raw.nodes = [...stickies, ...executable];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
}

autoLayoutWorkflow('manychat-async-timeout-handler.json');
autoLayoutWorkflow('apollo-to-brevo-enrichment-pipeline.json');
autoLayoutWorkflow('qdrant-multi-tenant-rag-engine.json');

console.log('\n✨ Auto-layout completed for all 3 templates!');
