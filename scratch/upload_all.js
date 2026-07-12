const token = "apik_0sXQgGrNfjFAT_C5662849_C_5c4052af1ea78e66923fcc60bac25af83a4e3a865c77c0f7fdc9062d6a2dbc";
const companyId = "biz_AVepjMJgIkU6rk";

const workflows = [
  {
    title: "AI Lead Enrichment Pipeline",
    planTitle: "AI Lead Enrichment",
    price: 49,
    description: "Production-ready n8n workflow template. Automate lead gathering, scoring, and CRM insertion."
  },
  {
    title: "RAG Knowledge Base Blueprint",
    planTitle: "RAG Knowledge Base",
    price: 49,
    description: "Connect n8n to vector databases (Pinecone/Qdrant) for high-context semantic search and RAG."
  },
  {
    title: "Voice AI Sales Agent",
    planTitle: "Voice AI Sales Agent",
    price: 49,
    description: "Production-ready Voice AI and agent nodes to answer support tickets, qualify leads, and update CRM."
  },
  {
    title: "n8n AI Agent Nodes & Memory Buffer",
    planTitle: "AI Agent Nodes & Memory",
    price: 49,
    description: "AI Agent nodes and memory buffer management workflows for stateful n8n agents."
  },
  {
    title: "AdCreative.ai Automated Graphic Pipeline",
    planTitle: "AdCreative Auto Graphic",
    price: 49,
    description: "Automated banner and graphic design pipeline using n8n and AdCreative.ai API."
  },
  {
    title: "Autonomous Cold Email Machine",
    planTitle: "Autonomous Cold Email",
    price: 49,
    description: "Deploy a fully automated outbound outbound email prospecting machine utilizing n8n, Smartlead, and Instantly."
  }
];

async function run() {
  const results = [];
  
  for (const wf of workflows) {
    console.log(`Creating product: "${wf.title}"...`);
    try {
      // 1. Create Product
      const productRes = await fetch(`https://api.whop.com/api/v1/products?company_id=${companyId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: wf.title,
          description: wf.description,
          company_id: companyId
        })
      });
      
      if (!productRes.ok) {
        const errorText = await productRes.text();
        throw new Error(`Failed to create product. Status: ${productRes.status}. Error: ${errorText}`);
      }
      
      const productData = await productRes.json();
      const productId = productData.id;
      console.log(`Product created successfully. ID: ${productId}`);

      // 2. Create Plan
      console.log(`Creating plan "${wf.planTitle}" for product ${productId}...`);
      const planRes = await fetch(`https://api.whop.com/api/v1/plans?company_id=${companyId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: productId,
          title: wf.planTitle,
          description: wf.description,
          plan_type: "one_time",
          initial_price: wf.price,
          currency: "usd"
        })
      });

      if (!planRes.ok) {
        const errorText = await planRes.text();
        throw new Error(`Failed to create plan. Status: ${planRes.status}. Error: ${errorText}`);
      }

      const planData = await planRes.json();
      const planId = planData.id;
      const checkoutUrl = planData.purchase_url;
      console.log(`Plan created successfully. ID: ${planId}. URL: ${checkoutUrl}`);

      results.push({
        title: wf.title,
        productId: productId,
        planId: planId,
        checkoutUrl: checkoutUrl
      });
    } catch (e) {
      console.error(`Error processing "${wf.title}":`, e.message);
    }
  }

  // Write mapping to file
  const fs = require('fs');
  const path = require('path');
  const outPath = path.join(__dirname, 'created_mapping.json');
  fs.writeFileSync(outPath, JSON.stringify({ results }, null, 2));
  console.log(`Results saved to ${outPath}`);
  console.log(JSON.stringify({ results }, null, 2));
}

run();
