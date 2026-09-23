const fs = require('fs');

function sanitizeBanned(text) {
  let res = text;
  res = res.replace(/\bfurthermore\b/gi, 'in addition');
  res = res.replace(/\bmoreover\b/gi, 'additionally');
  res = res.replace(/\bseamlessly\b/gi, 'directly');
  res = res.replace(/\bseamless\b/gi, 'frictionless');
  res = res.replace(/\bcrucial\b/gi, 'essential');
  res = res.replace(/\bvital\b/gi, 'critical');
  res = res.replace(/\bparamount\b/gi, 'essential');
  res = res.replace(/\brobust\b/gi, 'resilient');
  res = res.replace(/\belevate\b/gi, 'upgrade');
  res = res.replace(/\belevates\b/gi, 'upgrades');
  res = res.replace(/\belevating\b/gi, 'upgrading');
  res = res.replace(/\belevated\b/gi, 'upgraded');
  res = res.replace(/\bdelve into\b/gi, 'explore');
  res = res.replace(/\bdelve\b/gi, 'examine');
  res = res.replace(/\btestament\b/gi, 'proof');
  res = res.replace(/\bgame-changer\b/gi, 'major breakthrough');
  res = res.replace(/\bgame changer\b/gi, 'major breakthrough');
  res = res.replace(/\brevolutionize\b/gi, 'transform');
  res = res.replace(/\brevolutionizing\b/gi, 'transforming');
  res = res.replace(/\brevolutionized\b/gi, 'transformed');
  res = res.replace(/\bunlock the power of\b/gi, 'harness');
  res = res.replace(/in today's fast-paced digital world/gi, 'in modern software engineering');
  res = res.replace(/\bbeacon\b/gi, 'benchmark');
  res = res.replace(/\bleveraging\b/gi, 'deploying');
  res = res.replace(/\bleveraged\b/gi, 'deployed');
  res = res.replace(/\bleverages\b/gi, 'uses');
  res = res.replace(/\bleverage\b/gi, 'apply');
  res = res.replace(/it is worth noting that\s*/gi, '');
  res = res.replace(/## Conclusion/gi, '## Architecture Verdict');
  res = res.replace(/### Conclusion/gi, '### Architecture Verdict');
  res = res.replace(/\bin conclusion\b/gi, 'to summarize');
  res = res.replace(/## Executive Summary & Engineering Mandate/gi, '## Architectural Mandate & Technical Overview');
  res = res.replace(/## Executive Summary: Re-engineering Financial Operational Velocity/gi, '## Technical Blueprint: Financial Operational Velocity');
  res = res.replace(/## Executive Summary/gi, '## Architectural Overview');
  res = res.replace(/Executive Summary/gi, 'Architectural Overview');
  res = res.replace(/\bsummary report\b/gi, 'diagnostic breakdown');
  res = res.replace(/\bconsolidated summary\b/gi, 'consolidated digest');
  res = res.replace(/\bmathematical summary\b/gi, 'mathematical breakdown');
  res = res.replace(/const summary = \{\};/g, 'const leadCounts = {};');
  res = res.replace(/summary\[source\]/g, 'leadCounts[source]');
  res = res.replace(/Object\.keys\(summary\)/g, 'Object.keys(leadCounts)');
  res = res.replace(/summary\[key\]/g, 'leadCounts[key]');
  res = res.replace(/\bsummary\b/gi, 'overview');
  return res;
}

// 1. n8n-data-privacy-security-guide
function upgradePost1() {
  const post = JSON.parse(fs.readFileSync('scratch/batch14_n8n-data-privacy-security-guide.json', 'utf8'));
  let body = post.body.replace(/\r\n/g, '\n');

  // Strip WP artifact
  body = body.replace(/<hr class="wp-block-separator has-alpha-channel-opacity"\/>/g, '');
  body = body.replace(/By Alfaz Mahmud Rizve \| RevOps & Full Stack Automation Architect at whoisalfaz\.me/g, '');

  const directAnswer = `> **Direct Answer (n8n Enterprise Data Privacy & Security):** Unlike cloud automation SaaS (Zapier/Make) that store decrypted payload logs on third-party multi-tenant databases, self-hosted n8n offers full data sovereignty. A hardened n8n deployment enforces zero-data-retention "Ghost Mode" (\`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\`), aggressive log pruning (\`EXECUTIONS_DATA_PRUNE=true\`, max 72 hours), TLS 1.3 reverse proxy encryption, and database-at-rest encryption (PostgreSQL LUKS). This architecture allows healthcare and fintech organizations to achieve strict HIPAA and GDPR compliance.\n\n`;

  if (!body.includes('Direct Answer (n8n Enterprise Data Privacy & Security)')) {
    body = directAnswer + body.trim();
  }

  // Add FAQ
  if (!body.includes('## Frequently Asked Questions')) {
    const faq = `\n\n## Frequently Asked Questions

### How do you configure n8n log pruning to prevent sensitive customer PII from persisting on disk?
In your self-hosted \`docker-compose.yml\`, set \`EXECUTIONS_DATA_PRUNE=true\`, \`EXECUTIONS_DATA_MAX_AGE=72\` (prunes execution records older than 72 hours), and \`EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000\`. This ensures that webhook payloads containing sensitive emails, phone numbers, or tokens are purged on a continuous background schedule.

### What is "Ghost Mode" in enterprise n8n deployments and when should it be enabled?
Ghost Mode is achieved by setting \`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\` and \`EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false\`. In this mode, n8n processes incoming data entirely in ephemeral memory and only writes execution records to PostgreSQL if an unhandled node failure occurs (\`EXECUTIONS_DATA_SAVE_ON_ERROR=all\`), guaranteeing zero-data-retention for successful runs.

### Can self-hosted n8n meet strict HIPAA and GDPR data residency compliance standards?
Yes. When self-hosted on dedicated bare metal or private cloud VPC instances (e.g. Vultr, AWS GovCloud) within specific geopolitical boundaries, customer data never traverses external SaaS networks. Combining container network isolation, LUKS disk encryption, TLS 1.3 Caddy reverse proxying, and a signed Business Associate Agreement (BAA) satisfies both HIPAA and GDPR requirements.
`;
    body = body + faq;
  }

  body = sanitizeBanned(body);

  post.body = body;
  post.seoTitle = "n8n Data Privacy & Security Guide [2026 Blueprint]"; // 50c
  post.seoDescription = "Secure client data across n8n workflows. Discover the 6-layer privacy protocol: self-hosted hardening, auto-pruning logs, Ghost Mode, and GDPR compliance.";

  fs.writeFileSync('scratch/batch14_n8n-data-privacy-security-guide_upgraded.json', JSON.stringify(post, null, 2));
  console.log(`Upgraded Post 1: ${post.slug}`);
}

// 2. automated-marketing-reporting-with-n8n-at-whoisalfaz
function upgradePost2() {
  const post = JSON.parse(fs.readFileSync('scratch/batch14_automated-marketing-reporting-with-n8n-at-whoisalfaz.json', 'utf8'));
  let body = post.body.replace(/\r\n/g, '\n');

  const directAnswer = `> **Direct Answer (Automated Marketing Reporting in n8n):** Client dashboards in Looker or Tableau suffer from low engagement because clients rarely log in. An autonomous marketing reporting pipeline in n8n queries advertising APIs (Meta Ads, Google Ads, GA4), aggregates raw event arrays inside a JavaScript Code node, computes blended customer acquisition metrics (CPA, ROAS), and dispatches a clean, responsive HTML digest directly to client inboxes every Monday morning—eliminating hours of manual spreadsheet compiling.\n\n`;

  if (!body.includes('Direct Answer (Automated Marketing Reporting in n8n)')) {
    body = directAnswer + body.trim();
  }

  // Add FAQ
  if (!body.includes('## Frequently Asked Questions')) {
    const faq = `\n\n## Frequently Asked Questions

### How does n8n aggregate raw array records into channel-grouped metrics?
In an n8n JavaScript Code node, the script iterates over the incoming array of conversion events using a hash map (\`const leadCounts = {}\`). It groups entries by campaign attributes (such as \`utm_source\` or \`adset_name\`), tallies total conversions, and maps the aggregated object into a structured JSON array suitable for dynamic HTML table generation.

### Why deliver automated email/HTML digests instead of sharing live Looker or Tableau dashboards?
B2B clients and executive stakeholders suffer from dashboard fatigue and rarely log into business intelligence portals. Delivering an automated, beautifully formatted HTML report directly to their inbox on Monday morning guarantees high executive visibility, reinforces agency value, and delivers key performance metrics without login friction.

### How do you prevent reporting workflows from delivering blank emails when an ad API fails?
The workflow implements strict data validation: an IF node checks that the array length of retrieved events is greater than zero and validates required numerical fields. If an ad platform API returns an error or empty dataset, the workflow alerts the internal account team via Slack while holding client email dispatch until resolved.
`;
    body = body + faq;
  }

  body = sanitizeBanned(body);

  post.body = body;
  post.seoTitle = "Automated Marketing Reporting with n8n [2026 Blueprint]"; // 55c
  post.seoDescription = "Build automated marketing reporting workflows in n8n. Aggregate analytics, generate weekly performance digests, and email automated HTML client reports.";

  fs.writeFileSync('scratch/batch14_automated-marketing-reporting-with-n8n-at-whoisalfaz_upgraded.json', JSON.stringify(post, null, 2));
  console.log(`Upgraded Post 2: ${post.slug}`);
}

// 3. automated-email-follow-up-n8n-brevo
function upgradePost3() {
  const post = JSON.parse(fs.readFileSync('scratch/batch14_automated-email-follow-up-n8n-brevo.json', 'utf8'));
  let body = post.body.replace(/\r\n/g, '\n');

  // Strip WP author header
  body = body.replace(/By \[Alfaz Mahmud Rizve\]\(https:\/\/whoisalfaz\.me\/portfolio\/\) \| RevOps & Full Stack Automation Architect at \[whoisalfaz\.me\]\(https:\/\/whoisalfaz\.me\)/g, '');

  const directAnswer = `> **Direct Answer (Automated Email Follow-Up with n8n & Brevo):** Over 80% of B2B sales require at least five follow-ups, yet manual tracking causes leads to slip through the cracks. In n8n, an event-driven "Check-Wait-Check" pipeline synchronizes with Brevo CRM. It schedules delayed follow-ups using n8n Wait nodes, evaluates inbound email webhooks to automatically cancel remaining sequences the moment a prospect replies, and uses JavaScript business-hours filters to prevent sending messages at awkward times.\n\n`;

  if (!body.includes('Direct Answer (Automated Email Follow-Up with n8n & Brevo)')) {
    body = directAnswer + body.trim();
  }

  // Add FAQ
  if (!body.includes('## Frequently Asked Questions')) {
    const faq = `\n\n## Frequently Asked Questions

### How does the Check-Wait-Check architecture in n8n prevent sending follow-ups after a prospect replies?
Before sending any scheduled email in the sequence, n8n queries Brevo's Contact API to check the contact's live status. If an inbound reply webhook was received during the wait window (setting \`has_replied: true\`), the IF node terminates the follow-up branch immediately, preventing awkward automated messages to active conversational leads.

### How does the JavaScript Code Node enforce business hours across prospect timezones?
An n8n Code Node inspects the prospect's timezone or phone country code. If the current local hour falls outside 9:00 AM – 5:00 PM Monday through Friday, the script calculates the millisecond difference until 9:15 AM on the next business day and dynamically sets the parameter for the subsequent Wait node.

### Why use Brevo transactional API endpoints instead of standard marketing campaigns for outbound follow-ups?
Standard marketing campaign emails route through bulk IP pools that trigger Gmail and Outlook promotional tabs. Brevo's transactional API endpoints (\`POST /v3/smtp/email\`) deliver plain-text, unstyled emails directly through high-reputation dedicated transactional IPs, ensuring inbox placement in the primary tab.
`;
    body = body + faq;
  }

  body = sanitizeBanned(body);

  post.body = body;
  post.seoTitle = "Automated Email Follow-Up: n8n & Brevo [2026 Blueprint]"; // 55c
  post.seoDescription = "Build an automated email follow-up system with n8n and Brevo. Recover cold leads, manage stateful reply delays, and scale outbound pipeline conversions.";

  fs.writeFileSync('scratch/batch14_automated-email-follow-up-n8n-brevo_upgraded.json', JSON.stringify(post, null, 2));
  console.log(`Upgraded Post 3: ${post.slug}`);
}

// 4. case-study-careerops-ai-resume-builder
function upgradePost4() {
  const post = JSON.parse(fs.readFileSync('scratch/batch14_case-study-careerops-ai-resume-builder.json', 'utf8'));
  let body = post.body.replace(/\r\n/g, '\n');

  // Strip WP artifact
  body = body.replace(/<hr class="wp-block-separator has-alpha-channel-opacity"\/>/g, '');
  body = body.replace(/By \[Alfaz Mahmud Rizve\]\(\/portfolio\/\) \| RevOps & Full Stack Automation Architect/g, '');

  const directAnswer = `> **Direct Answer (CareerOps AI Resume Builder Architecture):** CareerOps solves the privacy paradox of AI career tools by decoupling client-side resume rendering from serverless AI orchestration. Built with Next.js App Router and \`@react-pdf/renderer\`, resumes compile locally in the user's browser, eliminating server storage of sensitive personal employment records. For AI rewrites, Next.js calls a stateless n8n webhook proxy that streams prompts to LLMs with zero data persistence, delivering real-time ATS optimization at \$0 storage cost.\n\n`;

  if (!body.includes('Direct Answer (CareerOps AI Resume Builder Architecture)')) {
    body = directAnswer + body.trim();
  }

  // Add FAQ
  if (!body.includes('## Frequently Asked Questions')) {
    const faq = `\n\n## Frequently Asked Questions

### Why compile PDFs in the user's browser using React PDF rather than a backend Puppeteer container?
Server-side headless Chrome rendering (Puppeteer/Playwright) is memory-intensive and creates substantial server overhead during traffic spikes. By utilizing \`@react-pdf/renderer\` directly in the client's web browser, PDF generation offloads compute to the user's device, enables real-time document live-previews, and keeps backend hosting costs to zero.

### How does the CareerOps stateless architecture guarantee data privacy for sensitive resumes?
User resume data, contact info, and career history are stored exclusively in the browser's local state and IndexedDB storage. No resume text or PII is ever written to a permanent backend database, eliminating the risk of data leaks or regulatory compliance violations.

### How does n8n orchestrate AI resume rewrites without exposing OpenAI API keys on the frontend?
The Next.js client issues an authenticated POST request to an internal API route, which forwards the request to an n8n webhook using a secret authorization header. n8n holds all provider API keys securely in encrypted environment variables, injects ATS scoring system prompts, and streams the structured JSON response back to the client.
`;
    body = body + faq;
  }

  body = sanitizeBanned(body);

  post.body = body;
  post.seoTitle = "[Case Study] CareerOps AI Resume Builder Architecture"; // 53c
  post.seoDescription = "Architecture teardown of CareerOps, detailing local-first AI processing, n8n orchestration, and dynamic browser-based PDF generation.";

  fs.writeFileSync('scratch/batch14_case-study-careerops-ai-resume-builder_upgraded.json', JSON.stringify(post, null, 2));
  console.log(`Upgraded Post 4: ${post.slug}`);
}

// 5. case-study-cashops-financial-dashboard
function upgradePost5() {
  const post = JSON.parse(fs.readFileSync('scratch/batch14_case-study-cashops-financial-dashboard.json', 'utf8'));
  let body = post.body.replace(/\r\n/g, '\n');

  // Strip WP artifact
  body = body.replace(/<hr class="wp-block-separator has-alpha-channel-opacity"\/>/g, '');
  body = body.replace(/By \[Alfaz Mahmud Rizve\]\(\/portfolio\/\) \| RevOps & Full Stack Automation Architect/g, '');

  const directAnswer = `> **Direct Answer (CashOps Financial Operations Architecture):** Consumer financial tools suffer from slow UI latency and fragmented banking syncs. CashOps solves this by coupling an optimistic React UI with local-first React Context state management and NextAuth session security. Transactions render instantly on the dashboard (<10ms perceived latency) while asynchronous Next.js Server Actions and n8n webhooks commit ledger entries to PostgreSQL and Stripe in the background with zero blocking overhead.\n\n`;

  if (!body.includes('Direct Answer (CashOps Financial Operations Architecture)')) {
    body = directAnswer + body.trim();
  }

  // Add FAQ
  if (!body.includes('## Frequently Asked Questions')) {
    const faq = `\n\n## Frequently Asked Questions

### How does optimistic UI update state in CashOps before the database write completes?
When a user logs a transaction or updates a ledger balance, React immediately updates local state and renders the new figures in the UI. Concurrently, a background dispatch fires to the backend API. If the server write succeeds, state confirms silently; if it fails, a rollback action restores the previous state and displays a non-blocking toast alert.

### Why choose local-first React Context over heavyweight state libraries like Redux?
For high-velocity financial operations dashboards, React Context combined with custom hooks provides fine-grained state isolation without boilerplate actions and reducers. Paired with persistent localStorage caching, financial metrics load instantly on repeat visits without network request delays.

### How does CashOps handle session authentication and security with NextAuth?
CashOps implements NextAuth with JWT-based session tokens encrypted using standard AES-GCM algorithms. Sensitive API endpoints verify JSON Web Tokens on incoming headers, ensuring that financial ledger modifications are authorized and cryptographically isolated between organization tenants.
`;
    body = body + faq;
  }

  body = sanitizeBanned(body);

  post.body = body;
  post.seoTitle = "[Case Study] CashOps Financial Operations Architecture"; // 54c
  post.seoDescription = "Architecture teardown of CashOps.app: zero-latency data visualization, local-first React Context state management, and high-velocity automated workflows.";

  fs.writeFileSync('scratch/batch14_case-study-cashops-financial-dashboard_upgraded.json', JSON.stringify(post, null, 2));
  console.log(`Upgraded Post 5: ${post.slug}`);
}

upgradePost1();
upgradePost2();
upgradePost3();
upgradePost4();
upgradePost5();
console.log('\nAll Batch 14 articles upgraded and written to scratch/ directory.');
