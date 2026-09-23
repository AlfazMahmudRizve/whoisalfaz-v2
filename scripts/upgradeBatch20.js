const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

function sanitizeBody(body) {
  let cleaned = body;
  cleaned = cleaned.replace(/<hr class="wp-block-separator has-alpha-channel-opacity"\/>/g, '');
  cleaned = cleaned.replace(/By \[Alfaz Mahmud Rizve\]\(\/portfolio\/\) \| RevOps & Full Stack Automation Architect at whoisalfaz\.me/g, '');
  cleaned = cleaned.replace(/Master n8n debugging and error handling with logs, retries, and alerts\. Real examples for SaaS & agencies by \[Alfaz Mahmud Rizve\]\(\/portfolio\/\) at whoisalfaz\.me\./g, '');
  cleaned = cleaned.replace(/\*\*By Alfaz Mahmud Rizve \| RevOps & Full Stack Automation Architect\*\*/g, '');
  cleaned = cleaned.trim();
  return cleaned;
}

// 1. lead-scoring-automation-with-alfaz-mahmud-rizve
{
  const slug = 'lead-scoring-automation-with-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch20_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace leveraging
  body = body.replace(/By leveraging \*\*\[n8n\]/g, 'By deploying **[n8n]');

  const directAnswer = `> **Direct Answer:** Automated lead scoring in n8n evaluates incoming form prospects by extracting demographic, intent, and source attributes from webhook payloads. A JavaScript Code node computes a composite lead score based on company email domains, budget tiers, and timeline urgency. High-intent leads (score >= 80) trigger immediate multi-channel sales actions—such as automated HeyReach LinkedIn connection requests and high-priority Slack notifications—while lower-scoring leads are dynamically tagged and routed to automated Brevo nurture sequences.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Lead Scoring Automation with n8n [2026 Blueprint]',
    seoDescription: 'Automate lead scoring with n8n and Brevo. Tag prospects by intent and source, calculate dynamic ICP scores, and trigger instant HeyReach LinkedIn outreach.'
  };

  fs.writeFileSync(`scratch/batch20_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 2. capture-n8n-lead-data-from-wordpress-elementor
{
  const slug = 'capture-n8n-lead-data-from-wordpress-elementor';
  const post = JSON.parse(fs.readFileSync(`scratch/batch20_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace seamlessly
  body = body.replace(/allows us to seamlessly plug in microservices later/g, 'allows us to effortlessly plug in microservices later');
  body = body.replace(/push this Google Sheet data seamlessly into advanced enterprise environments/g, 'push this Google Sheet data directly into advanced enterprise environments');

  const directAnswer = `> **Direct Answer:** To capture WordPress Elementor form leads in n8n without paid plugins, configure Elementor's native "Actions After Submit" to include a Webhook action pointing to your n8n production Webhook URL. The n8n Webhook node receives form field data as JSON, an Edit Fields node cleanses phone numbers and trims string whitespace, an upsert operation writes the record to Google Sheets or PostgreSQL, and an automated email alert notifies your sales team under 5 seconds.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Capture WordPress Elementor Leads: n8n [2026 Blueprint]',
    seoDescription: 'Capture WordPress Elementor leads in n8n without paid plugins. Automatically sync form data to Google Sheets and send instant email notifications to sales.'
  };

  fs.writeFileSync(`scratch/batch20_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 3. n8n-debugging-error-handling-basics
{
  const slug = 'n8n-debugging-error-handling-basics';
  const post = JSON.parse(fs.readFileSync(`scratch/batch20_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** Building bulletproof error handling in n8n requires setting up a dedicated Global Error Trigger workflow configured in workflow settings under "Error Workflow". When any node execution fails, n8n invokes the error handler with execution ID, workflow metadata, and the failing node's error message. The error workflow logs the incident to a PostgreSQL audit table, sends an actionable Slack Block Kit card with direct execution retry links, and triggers automated exponential backoff retries on transient network errors.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n Debugging & Error Handling Basics [2026 Blueprint]',
    seoDescription: 'Stop silent automation failures. Master n8n debugging and error handling basics: set up execution logs, retry policies, and instant Slack and email alerts.'
  };

  fs.writeFileSync(`scratch/batch20_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 4. essential-n8n-core-nodes-by-alfaz-mahmud-rizve
{
  const slug = 'essential-n8n-core-nodes-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch20_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** The 5 essential core nodes in n8n that replace proprietary app integrations are: (1) **HTTP Request** for authenticating and communicating with any REST/GraphQL API; (2) **IF / Switch** for deterministic branching logic and routing; (3) **Edit Fields (Set)** for data cleansing and payload shaping; (4) **Merge** for combining asynchronous data streams or performing SQL-like joins across disparate datasets; and (5) **Code (JavaScript/Python)** for complex multi-item array manipulations, regex parsing, and cryptographic operations.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Essential n8n Core Nodes: Architecture [2026 Blueprint]',
    seoDescription: 'Master the 5 essential n8n core nodes: HTTP Request, IF, Edit Fields, Merge, and Code. Build resilient, scalable enterprise workflows without app limits.'
  };

  fs.writeFileSync(`scratch/batch20_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 5. n8n-workflow-design-best-practices
{
  const slug = 'n8n-workflow-design-best-practices';
  const post = JSON.parse(fs.readFileSync(`scratch/batch20_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** Production-grade n8n workflow design follows 5 architectural rules: (1) Modularize complex logic into specialized sub-workflows via the Execute Workflow node; (2) Use Sticky Notes to visually document intent, data contracts, and maintainers; (3) Enforce explicit error triggers and retry policies on external HTTP requests; (4) Chunk large datasets using the Split In Batches node to prevent Node.js heap exhaustion; and (5) Disable execution data saving on successful runs (\`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\`) to maintain peak database performance.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n Workflow Design Best Practices [2026 Blueprint]',
    seoDescription: 'Master n8n workflow design best practices. Build modular sub-workflows, implement robust error paths, and scale reliable enterprise automation pipelines.'
  };

  fs.writeFileSync(`scratch/batch20_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

console.log('\nAll Batch 20 upgrades generated in scratch/.');
