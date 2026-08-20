const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/manychat-async-timeout-handler.json');

// First execute repositioning in memory
const workflow = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

console.log('🔍 Validating n8n Canvas Layout & Overlaps for:', workflow.name);

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

// Gather all bounding boxes: { id, name, type, x1, y1, x2, y2, isSticky }
const boxes = workflow.nodes.map(n => {
  const isSticky = n.type === 'n8n-nodes-base.stickyNote' || n.type.includes('sticky');
  const x = n.position[0];
  const y = n.position[1];
  const w = isSticky ? (n.parameters.width || 300) : NODE_WIDTH;
  const h = isSticky ? (n.parameters.height || 150) : NODE_HEIGHT;

  return {
    id: n.id,
    name: n.name,
    type: n.type,
    isSticky,
    x1: x,
    y1: y,
    x2: x + w,
    y2: y + h,
    w,
    h
  };
});

let overlapsFound = 0;

// Test AABB intersection between all pairs
for (let i = 0; i < boxes.length; i++) {
  for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i];
    const b = boxes[j];

    const overlapX = a.x1 < b.x2 && a.x2 > b.x1;
    const overlapY = a.y1 < b.y2 && a.y2 > b.y1;

    if (overlapX && overlapY) {
      console.error(`❌ COLLISION DETECTED between "${a.name}" and "${b.name}":`);
      console.error(`   A [${a.x1}, ${a.y1}, ${a.x2}, ${a.y2}]`);
      console.error(`   B [${b.x1}, ${b.y1}, ${b.x2}, ${b.y2}]`);
      overlapsFound++;
    }
  }
}

// Check connections integrity
let brokenConnections = 0;
const nodeNames = new Set(workflow.nodes.map(n => n.name));
for (const [sourceNode, connGroup] of Object.entries(workflow.connections || {})) {
  if (!nodeNames.has(sourceNode)) {
    console.error(`❌ Broken connection: Source node "${sourceNode}" does not exist in nodes list!`);
    brokenConnections++;
  }
  for (const [outputType, branchList] of Object.entries(connGroup)) {
    for (const branches of branchList) {
      for (const target of branches) {
        if (!nodeNames.has(target.node)) {
          console.error(`❌ Broken connection: Target node "${target.node}" does not exist in nodes list!`);
          brokenConnections++;
        }
      }
    }
  }
}

console.log('\n📊 Validation Summary:');
console.log(`   - Total Nodes: ${workflow.nodes.filter(n => !n.type.includes('sticky')).length}`);
console.log(`   - Total Sticky Notes: ${workflow.nodes.filter(n => n.type.includes('sticky')).length}`);
console.log(`   - Canvas Overlaps: ${overlapsFound === 0 ? '0 (PERFECT)' : overlapsFound}`);
console.log(`   - Broken Connections: ${brokenConnections === 0 ? '0 (PERFECT)' : brokenConnections}`);

if (overlapsFound === 0 && brokenConnections === 0) {
  console.log('\n🌟 RESULT: 100% PASS - Clean layout ready for n8n community publication!');
} else {
  console.log('\n⚠️ RESULT: FAIL - Fix coordinates.');
}
