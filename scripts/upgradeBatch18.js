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

  // Remove WordPress separator artifacts
  cleaned = cleaned.replace(/<hr class="wp-block-separator has-alpha-channel-opacity"\/>/g, '');

  // Standardize Author Byline
  cleaned = cleaned.replace(/By Alfaz Mahmud Rizve \| RevOps & Full Stack Automation Architect at \[whoisalfaz\.me\]\(https:\/\/whoisalfaz\.me\)/g, '');
  cleaned = cleaned.trim();

  return cleaned;
}

function checkBannedWords(text, label) {
  const hits = [];
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word.replace(/'/g, "\\'")}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      hits.push(`${word} (${matches.length}x)`);
    }
  });
  if (hits.length > 0) {
    console.error(`❌ [${label}] Banned words found: ${hits.join(', ')}`);
    return false;
  }
  return true;
}

// 1. n8n-rag-tutorial
{
  const slug = 'n8n-rag-tutorial';
  const post = JSON.parse(fs.readFileSync(`scratch/batch18_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace elevated
  body = body.replace(/Elevated due to broken context boundaries/g, 'High due to broken context boundaries');

  const directAnswer = `> **Direct Answer:** To stop AI hallucinations in production, build a decoupled two-phase RAG system in n8n. The ingestion workflow extracts text from internal PDFs or Markdown, chunks content into 500-token blocks with a 50-token overlap, generates vector embeddings using OpenAI \`text-embedding-3-small\`, and stores vectors with strict metadata in Qdrant or Pinecone. The retrieval workflow captures user queries, runs vector similarity search with a top-k cutoff score of 0.78, and injects validated context chunks directly into the LLM prompt window with prompt-level anti-hallucination bounds.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n RAG Tutorial: Stop AI Hallucinations [2026 Blueprint]',
    seoDescription: 'Stop AI hallucinations on private data. Build an n8n RAG pipeline with Qdrant vector search and OpenAI embeddings to query business documents accurately.'
  };

  fs.writeFileSync(`scratch/batch18_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 2. n8n-ai-agent-tools
{
  const slug = 'n8n-ai-agent-tools';
  const post = JSON.parse(fs.readFileSync(`scratch/batch18_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace leverages
  body = body.replace(/which leverages the LangChain framework under the hood/g, 'which runs on the LangChain framework under the hood');

  const directAnswer = `> **Direct Answer:** n8n AI Agent Tools allow autonomous LLMs to invoke external functions, query internal databases, and trigger HTTP endpoints via schema-defined function calling. By attaching LangChain-compatible Tool nodes (such as the Custom Tool, Execute Workflow Tool, or Vector Store Tool) to the n8n AI Agent node with strict JSON parameter schemas, the LLM dynamically evaluates user prompts, passes typed arguments, executes deterministic backend code, and uses the returned JSON payload to formulate factually grounded responses.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n AI Agent Tools: Function Calling [2026 Blueprint]',
    seoDescription: 'Empower autonomous agents with n8n AI Agent Tools. Connect LLMs to live APIs, vector databases, and custom JavaScript functions with zero-hallucination.'
  };

  fs.writeFileSync(`scratch/batch18_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 3. how-to-build-an-api-with-n8n
{
  const slug = 'how-to-build-an-api-with-n8n';
  const post = JSON.parse(fs.readFileSync(`scratch/batch18_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** To build a high-performance synchronous REST API in n8n, configure a Webhook trigger node set to the target HTTP method (GET, POST, PUT, DELETE) and change its response mode from "On Received" to "Using 'Respond to Webhook' Node". Implement authentication (Header Auth or Bearer tokens) in an IF node, process the payload with Code and database nodes, and return structured JSON through the Respond to Webhook node with explicit HTTP status codes (200 OK, 400 Bad Request, 401 Unauthorized, 500 Internal Error) within a 10-second timeout window.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'How to Build an API with n8n [2026 Blueprint]',
    seoDescription: 'Learn how to build a serverless API with n8n. Set up Webhook triggers, enforce authentication, execute business logic, and return custom JSON responses.'
  };

  fs.writeFileSync(`scratch/batch18_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 4. n8n-google-analytics-4-pipeline
{
  const slug = 'n8n-google-analytics-4-pipeline';
  const post = JSON.parse(fs.readFileSync(`scratch/batch18_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  // Replace summary occurrences
  body = body.replace(/executive summary/gi, 'executive brief');
  body = body.replace(/AI summary/gi, 'AI brief');
  body = body.replace(/\bsummary\b/gi, 'brief');

  const directAnswer = `> **Direct Answer:** Building an automated Google Analytics 4 pipeline in n8n requires setting up a Google Cloud Service Account or OAuth2 credential with read access to the Google Analytics Data API (v1beta). An n8n Schedule Trigger queries daily sessions, active users, engagement rates, and conversion events via the Google Analytics node. The workflow normalizes the JSON response, executes an upsert into Google Sheets or PostgreSQL to eliminate duplicate records, and formats a Slack Block Kit alert for automated weekly client reporting.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  const faqSection = `\n\n## Frequently Asked Questions

### How do I prevent Google Analytics 4 API rate limits in n8n?
Google Analytics Data API (v1beta) enforces quota limits of 10 concurrent requests and 10,000 tokens per project per hour. To avoid quota exhaustion, schedule your n8n workflow during off-peak hours (e.g., 03:00 UTC), aggregate queries over 7-day batches instead of hourly slices, and insert a Wait node with a 500ms delay between multi-property API calls.

### How do I eliminate duplicate metric rows when syncing GA4 data to Google Sheets?
Configure your Google Sheets node to use the "Append or Update" (upsert) operation rather than a simple "Append Row". Define a composite key column combining \`date\` and \`propertyId\` (e.g., \`2026-03-24_98234123\`). When n8n executes the sync, it checks for existing key matches and overwrites historical adjustments without creating redundant entries.

### What is the advantage of using a GCP Service Account over OAuth2 in n8n?
A Google Cloud Service Account authenticates via server-to-server RSA keys, eliminating the need for periodic OAuth2 browser consent screens and preventing workflow halts caused by expired refresh tokens. You simply invite the service account email (e.g., \`ga4-sync@project-id.iam.gserviceaccount.com\`) as a Viewer in your Google Analytics property access management console.
`;

  // Insert FAQ right before the author bio
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
    seoTitle: 'n8n Google Analytics 4 Pipeline [2026 Blueprint]',
    seoDescription: 'Automate your agency reporting with an n8n Google Analytics 4 pipeline. Extract live GA4 traffic and conversion metrics directly into Google Sheets.'
  };

  fs.writeFileSync(`scratch/batch18_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

// 5. n8n-tips-and-tricks-by-alfaz-mahmud-rizve
{
  const slug = 'n8n-tips-and-tricks-by-alfaz-mahmud-rizve';
  const post = JSON.parse(fs.readFileSync(`scratch/batch18_${slug}.json`, 'utf8'));
  let body = sanitizeBody(post.body);

  const directAnswer = `> **Direct Answer:** The 5 most critical n8n production optimizations are: (1) Setting \`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\` in environment variables to prevent SQLite/Postgres bloat; (2) Decoupling heavy data transformations into modular sub-workflows via the Execute Workflow node; (3) Using native Luxon \`DateTime\` expressions instead of heavy external date libraries; (4) Enforcing global error triggers to capture workflow failures and dispatch Slack/Telegram triage alerts; and (5) Chunking API requests using the Split In Batches node with 1-second delays to respect upstream rate limits.`;

  const authorByline = `*By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at [whoisalfaz.me](https://whoisalfaz.me)*\n\n`;

  body = `${authorByline}${directAnswer}\n\n${body}`;

  const upgraded = {
    ...post,
    body,
    seoTitle: 'n8n Tips and Tricks: 5 Pro Hacks [2026 Blueprint]',
    seoDescription: 'Master 5 advanced n8n tips and tricks to scale workflows. Learn batch processing, sub-workflows, custom expressions, and execution speed optimization.'
  };

  fs.writeFileSync(`scratch/batch18_upgraded_${slug}.json`, JSON.stringify(upgraded, null, 2));
  console.log(`✅ Prepared upgrade for: ${slug}`);
}

console.log('\nAll Batch 18 upgrades generated in scratch/.');
