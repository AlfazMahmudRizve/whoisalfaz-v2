const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-monday-recipes-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-monday-recipes.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 9 blog post...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.monday_recipes_featured) {
        featuredAssetId = imagesMeta.monday_recipes_featured._id;
        featuredUrl = imagesMeta.monday_recipes_featured.url;
      }
      if (imagesMeta.monday_recipes_body1) body1Url = imagesMeta.monday_recipes_body1.url;
      if (imagesMeta.monday_recipes_body2) body2Url = imagesMeta.monday_recipes_body2.url;
    }

    // Replace the placeholders or standard sandbox URLs in the body
    if (featuredUrl) {
      bodyContent = bodyContent.split('monday_recipes_featured.webp').join(featuredUrl);
      console.log('✅ Replaced featured placeholder.');
    }
    // Also handle replacing the full path if it's there
    if (body1Url) {
      bodyContent = bodyContent.split('https://cdn.sanity.io/images/gfd4n1nu/production/monday_recipes_body1.webp').join(body1Url);
      bodyContent = bodyContent.split('monday_recipes_body1.webp').join(body1Url);
      console.log('✅ Replaced body1 placeholders.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('https://cdn.sanity.io/images/gfd4n1nu/production/monday_recipes_body2.webp').join(body2Url);
      bodyContent = bodyContent.split('monday_recipes_body2.webp').join(body2Url);
      console.log('✅ Replaced body2 placeholders.');
    }

    if (!featuredAssetId) {
      console.warn('⚠️  Featured image not found — using fallback.');
      featuredAssetId = 'image-61676029db6c9efaea430bb38e0245b0c59aa0e4-1280x720-webp';
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "monday.com Automation Recipes Every RevOps Team Should Deploy in 2026",
      "description": "Step-by-step blueprints for 12 battle-tested monday.com automation recipes to optimize B2B sales pipelines, lead routing, cross-board project handoffs, and operational hygiene.",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Territory-Based Lead Routing",
          "text": "Set up territory-based lead routing by configuring a monday.com automation: 'When an item is created, and only if Region is EMEA, assign Rep A as Owner and notify Rep A'."
        },
        {
          "@type": "HowToStep",
          "name": "Weighted Round-Robin Distribution",
          "text": "Distribute inbound leads evenly by setting up a round-robin routing automation targeting your defined Sales Team group. Ensure users marked as Out of Office are skipped."
        },
        {
          "@type": "HowToStep",
          "name": "Automated ICP Lead Triage & Scoring",
          "text": "Create a calculated Formula Column evaluating Job Title, Company Size, and Lead Source to dynamically output a numeric lead score."
        },
        {
          "@type": "HowToStep",
          "name": "Stalled Deal Aging Alerts",
          "text": "Prevent deal slippage by configuring a recipe: 'When Status does not change for 7 days, and only if Stage is Proposal Sent, notify Owner and set Status to Action Required'."
        },
        {
          "@type": "HowToStep",
          "name": "Weighted Forecast Calculations",
          "text": "Automate sales forecasting by multiplying the Total Deal Value by a SWITCH formula evaluating the probability percentage of the current Stage."
        },
        {
          "@type": "HowToStep",
          "name": "SLA Time-to-Contact Escalation",
          "text": "Set a Target SLA Time column and build a webhook watcher via n8n to send Slack alerts to managers if an enterprise lead is not contacted within 15 minutes."
        },
        {
          "@type": "HowToStep",
          "name": "Automated Onboarding Project Creation",
          "text": "Create a recipe: 'When Status changes to Closed Won, create item in Onboarding Board and link them via Connect Boards' to instantly spin up delivery projects."
        },
        {
          "@type": "HowToStep",
          "name": "Dynamic Handoff Data Mapping",
          "text": "Intercept Closed Won triggers via an n8n webhook node to copy CRM subitems and deal specifications directly from the Sales board to the Delivery board."
        },
        {
          "@type": "HowToStep",
          "name": "Automatic Client-Facing Onboarding Invites",
          "text": "Automatically email a welcome checklist to the client when the Onboarding Status changes to Kickoff Scheduled."
        },
        {
          "@type": "HowToStep",
          "name": "Bidirectional Sync 'Circuit Breaker'",
          "text": "Avoid infinite loop automation spirals by adding conditions: 'When Status changes on Board A, update Board B ONLY IF Status on Board B is NOT same status'."
        },
        {
          "@type": "HowToStep",
          "name": "Accidental Send 'Double-Gate' Protection",
          "text": "Add a gatekeeper condition requiring both status to be Completed and an internal checkbox 'Approved for Client Send' to be checked before sending emails."
        },
        {
          "@type": "HowToStep",
          "name": "Mandatory Field Enforcer",
          "text": "Enforce data entry by reverting status changes (e.g. Closed Lost) back to their original state if required columns (e.g. Loss Reason) are empty."
        }
      ]
    };

    const postJson = {
      _id: 'monday-com-automation-recipes-revops-2026',
      _type: 'post',
      title: 'monday.com Automation Recipes Every RevOps Team Should Deploy in 2026',
      slug: { _type: 'slug', current: 'monday-com-automation-recipes-revops-2026' },
      description: "12 battle-tested monday.com automation recipes for RevOps teams — from pipeline stage alerts to cross-board reporting syncs and client onboarding flows.",
      date: new Date().toISOString(),
      seoTitle: '12 monday.com Automation Recipes for RevOps Teams (2026)',
      seoDescription: "Step-by-step blueprints for 12 essential monday.com automation recipes. Learn to build lead routing, SLA alerts, circuit breakers, and handoffs.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }  // Automation Tools
      ],
      affiliates: ['monday.com', 'n8n', 'Databox'],
      body: bodyContent,
      schemaMarkup: JSON.stringify(howToSchema)
    };

    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

buildJson();
