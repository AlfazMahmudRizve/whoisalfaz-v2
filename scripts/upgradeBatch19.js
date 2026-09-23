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
  cleaned = cleaned.replace(/By \[Alfaz Mahmud Rizve\]\(https:\/\/whoisalfaz\.me\/portfolio\/\) \| RevOps & Full Stack Automation Architect at \[whoisalfaz\.me\]\(https:\/\/whoisalfaz\.me\)/g, '');
  cleaned = cleaned.replace(/By Alfaz Mahmud Rizve \| RevOps & Full Stack Automation Architect at \[whoisalfaz\.me\]\(https:\/\/whoisalfaz\.me\)/g, '');
  cleaned = cleaned.trim();
  return cleaned;
}

// 1. n8n-production-workflows-by-alfaz-mahmud-rizve
{
  const slug = 'n8n-production-workflows-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch19_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace seamlessly
  body = body.replace(/Worker 2 and Worker 3 seamlessly pick up the slack/g, 'Worker 2 and Worker 3 instantly pick up the slack');

  const directAnswer = `> **Direct Answer:** Scaling n8n for enterprise production requires migrating from default single-process mode to Queue Mode powered by Redis and external worker processes. Set \`EXECUTIONS_MODE=queue\` with an external PostgreSQL database, deploy multiple worker containers via Docker Compose, and configure \`EXECUTIONS_DATA_PRUNE=true\` with a 48-hour retention window. This architecture isolates memory spikes, guarantees zero dropped webhooks during payload bursts, and enables horizontal autoscaling on cost-effective VPS infrastructure.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  const faqSection = `\n\n## Frequently Asked Questions

### What is the difference between n8n regular mode and Queue Mode?
In regular mode, a single Node.js process handles the frontend UI, incoming webhooks, and workflow executions, which creates severe CPU and memory contention under heavy load. In Queue Mode, the main n8n instance acts strictly as a dispatcher, pushing job manifests to Redis, while autonomous background worker containers consume and execute tasks independently, preventing server crashes during spike events.

### How do I configure PostgreSQL connection pooling for high-concurrency n8n workers?
When scaling past 3 n8n worker nodes, configure PgBouncer in transaction pooling mode between n8n and PostgreSQL. Set \`DB_POSTGRESDB_POOL_SIZE=10\` per worker instance to prevent database connection exhaustion errors (\`too many clients already\`), while allocating sufficient shared buffer memory to PostgreSQL.

### How do I recover from Redis queue memory overflow when workers stall?
Set \`maxmemory-policy volatile-lru\` and configure strict task timeouts (\`EXECUTIONS_TIMEOUT=300\`) in your n8n environment variables. If an unhandled execution freezes, n8n automatically terminates the zombie worker thread after 300 seconds, evicting the stuck message from Redis and preventing out-of-memory cascading failures across your cluster.
`;

  // Insert FAQ right before the author bio or tail
  const bioIndex = body.lastIndexOf('---');
  if (bioIndex !== -1) {
    body = body.slice(0, bioIndex) + faqSection + '\n' + body.slice(bioIndex);
  } else {
    body = body + faqSection;
  }

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n Production Workflows: Scale Guide [2026 Blueprint]',
    seoDescription: 'Scale n8n production workflows without crashes. Master Queue Mode, Redis workers, PostgreSQL scaling, execution pruning, and robust retry architectures.'
  };

  fs.writeFileSync(`scratch/batch19_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 2. build-an-automated-rank-tracker-tool-with-n8n
{
  const slug = 'build-an-automated-rank-tracker-tool-with-n8n';
  const post = JSON.parse(fs.readFileSync(`scratch/batch19_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace summary in image alt
  body = body.replace(/The final automated weekly SEO report summary delivered/g, 'The final automated weekly SEO report digest delivered');

  const directAnswer = `> **Direct Answer:** To build an automated rank tracker in n8n, trigger a weekly Schedule node that fetches your target keyword list from Google Sheets or PostgreSQL. An HTTP Request node queries a SERP scraping API (such as Serper or ValueSERP) with exact geolocation parameters. A JavaScript Code node parses the organic results array to locate your domain, computes week-over-week position deltas, logs updated ranks back to your database, and dispatches a Slack or Discord digest alert highlighting top movers.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Build an Automated Rank Tracker with n8n [2026 Blueprint]',
    seoDescription: 'Build your own automated rank tracker with n8n and SERP APIs. Monitor target keywords, log SERP shifts to Google Sheets, and save thousands on SEO tools.'
  };

  fs.writeFileSync(`scratch/batch19_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 3. automated-content-research-by-alfaz-mahmud-rizve
{
  const slug = 'automated-content-research-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch19_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace summaries in tail
  body = body.replace(/pushing weekly SEO summaries directly into your Slack channel/g, 'pushing weekly SEO digests directly into your Slack channel');

  const directAnswer = `> **Direct Answer:** Automating SEO and competitor content research in n8n involves a 4-step pipeline: (1) An RSS or Reddit API trigger polls niche industry sources for high-velocity discussions; (2) An HTTP Request node fetches top-ranking SERP URLs via Google Search API; (3) Firecrawl or an HTML extract node strips clean markdown content; and (4) Claude 3.5 Sonnet analyzes competitor content gaps, generates search intent classifications, and drafts structured editorial briefs directly into Notion or Airtable.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  const faqSection = `\n\n## Frequently Asked Questions

### How do I scrape competitor articles without getting blocked by Cloudflare in n8n?
Avoid using native HTTP Request nodes on JavaScript-rendered or Cloudflare-protected pages. Instead, route scraping tasks through Firecrawl API or a self-hosted headless browser service (such as Browserless/Puppeteer in Docker) with rotating residential proxies and realistic user-agent headers to extract clean markdown payloads reliably.

### How do I calculate competitor keyword gap metrics programmatically in n8n?
Extract the competitor's raw markdown text using an HTML node, run a Code node with a TF-IDF or n-gram tokenizer to identify high-frequency two-word and three-word phrases, and compare them against your internal target keyword list using set difference logic. The unranked high-relevance terms represent immediate content gap opportunities.

### How much does this automated research pipeline cost compared to enterprise SEO suites?
A custom n8n content research pipeline combining Serper API ($0.001/query), Firecrawl ($0.002/scrape), and Claude 3.5 Sonnet ($0.008/brief) costs roughly $0.05 per comprehensive topic brief—over 95% cheaper than traditional Ahrefs or Semrush API subscriptions that charge $500+/month.
`;

  // Insert FAQ right before the author bio or tail
  const bioIndex = body.lastIndexOf('---');
  if (bioIndex !== -1) {
    body = body.slice(0, bioIndex) + faqSection + '\n' + body.slice(bioIndex);
  } else {
    body = body + faqSection;
  }

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Automated Content Research with n8n [2026 Blueprint]',
    seoDescription: 'Build an automated content research engine with n8n. Scrape trending industry news, analyze SERP competition, and generate AI-powered SEO topic briefs.'
  };

  fs.writeFileSync(`scratch/batch19_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 4. facebook-lead-ads-automation-by-alfaz-mahmud-rizve
{
  const slug = 'facebook-lead-ads-automation-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch19_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** Automating Facebook Lead Ads in n8n requires setting up a Webhook node connected to Meta's Webhooks API for Page Leadgen subscriptions. When a prospect submits an instant form, Meta sends a webhook payload containing the \`leadgen_id\`. An n8n HTTP Request node calls the Graph API (\`/v20.0/{leadgen_id}\`) using a system user access token to retrieve form field values, normalizes the phone number with libphonenumber logic, and upserts the contact into your CRM while dispatching an instant Slack lead alert under 60 seconds.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  const faqSection = `\n\n## Frequently Asked Questions

### How do I authenticate the Meta Webhook verification handshake in n8n?
When setting up Facebook Webhooks in the Meta App Dashboard, Meta sends a GET request with \`hub.challenge\` and \`hub.verify_token\`. In your n8n Webhook node, set the HTTP Method to GET, evaluate \`hub.verify_token\` against your secret string in an IF node, and return \`$json.query['hub.challenge']\` with a 200 HTTP status code in the Respond to Webhook node.

### Why does Meta Graph API return empty lead field values for certain submissions?
Empty field values occur when the Meta App lacks the \`leads_retrieval\` permission or when the associated Page access token lacks Admin or System User scopes. Ensure your Meta Business Manager System User is assigned both the Page and Lead Access permissions, and generate a long-lived 60-day or permanent System User Access Token.

### How do I prevent duplicate CRM entries if Meta retries a failed webhook delivery?
Meta retries unacknowledged webhooks with exponential backoff for up to 24 hours. To ensure idempotency, store the incoming \`leadgen_id\` in a Redis cache or PostgreSQL table with a unique constraint. If an incoming \`leadgen_id\` already exists in your cache, return an immediate HTTP 200 without re-executing downstream CRM creation or team alerts.
`;

  // Insert FAQ right before the author bio or tail
  const bioIndex = body.lastIndexOf('---');
  if (bioIndex !== -1) {
    body = body.slice(0, bioIndex) + faqSection + '\n' + body.slice(bioIndex);
  } else {
    body = body + faqSection;
  }

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'Facebook Lead Ads Automation with n8n [2026 Blueprint]',
    seoDescription: 'Automate Facebook Lead Ads with n8n to sync leads directly to your CRM in real time. Eliminate Zapier costs and alert sales teams instantly on new leads.'
  };

  fs.writeFileSync(`scratch/batch19_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 5. n8n-slack-notifications-by-alfaz-mahmud-rizve
{
  const slug = 'n8n-slack-notifications-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch19_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** High-converting n8n Slack lead notifications are built by sending structured JSON payloads to a Slack Incoming Webhook URL using Slack Block Kit formatting. The n8n workflow parses incoming lead data from forms or CRMs, enriches the prospect with company revenue and tech stack data via Clearbit or Apollo, formats interactive buttons (such as "Claim Lead" or "Open in CRM"), and routes urgent VIP alerts to dedicated sales channels in real time with zero latency.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  const faqSection = `\n\n## Frequently Asked Questions

### Should I use Slack Incoming Webhooks or the official n8n Slack Node?
Use the n8n Slack Node (OAuth/Bot Token) if you need two-way interactivity, such as capturing button clicks, updating existing messages in-place, or uploading CSV attachments. Use Slack Incoming Webhooks via the HTTP Request node if you only need outbound broadcast alerts, as webhooks are simpler to configure and require fewer Slack workspace permissions.

### How do I format interactive buttons and colored urgency sidebars in n8n Slack alerts?
Use Slack's Block Kit JSON builder. Configure an \`actions\` block containing \`button\` elements with distinct \`action_id\` and \`value\` fields. For colored vertical status strips (green for closed deals, red for high-churn risks), wrap the blocks inside an \`attachments\` array and define the hex color code in the \`color\` property (e.g. \`#10B981\` or \`#EF4444\`).

### How do I avoid hitting Slack API rate limits during sudden lead volume spikes?
Slack enforces a rate limit of approximately 1 message per second per channel for incoming webhooks. To prevent HTTP 429 errors during marketing campaigns, place a Wait node (set to 1,000ms) or an n8n Split In Batches node before your Slack dispatch node, or queue notifications into Redis when operating in Queue Mode.
`;

  // Insert FAQ right before the author bio or tail
  const bioIndex = body.lastIndexOf('---');
  if (bioIndex !== -1) {
    body = body.slice(0, bioIndex) + faqSection + '\n' + body.slice(bioIndex);
  } else {
    body = body + faqSection;
  }

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n Slack Notifications: Lead Alerts [2026 Blueprint]',
    seoDescription: 'Deploy real-time n8n Slack notifications to alert sales reps instantly when high-intent leads convert. Includes dynamic Block Kit UI cards and webhooks.'
  };

  fs.writeFileSync(`scratch/batch19_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

console.log('\nAll Batch 19 upgrades generated in scratch/.');
