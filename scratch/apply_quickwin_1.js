const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const slug = 'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes';

async function updatePost() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.error('Post not found:', slug);
    process.exit(1);
  }

  let body = post.body;

  // New section on Dify Python Code Export & Agent Pipeline
  const newSection = `

## How to Export Dify Workflows to Python Code & Agent Pipelines

One of the most requested capabilities for technical AI engineers is taking a visually prototyped Dify workflow and embedding it into an autonomous Python script, microservice, or content generation agent pipeline.

### What is the Difference Between an Agent and a Workflow in Dify?
Before exporting or invoking code, understanding Dify's structural distinction between an **Agent** and a **Workflow** is critical:
* **Dify Workflow:** Deterministic, step-by-step directed acyclic graph (DAG). Executes node by node (LLM, code, HTTP request, template transform) with predictable execution paths, zero prompt deviation, and sub-second control flow. Ideal for batch content pipelines and data ETL.
* **Dify Agent:** Non-deterministic, ReAct-based autonomous reasoning engine. The LLM dynamically decides which tools to call, inspects intermediate tool outputs, and loops until the user's objective is achieved. Ideal for complex research, multi-hop lookups, and customer support resolution.

### Exporting Dify DSL and Executing via Python Agent Pipeline
While Dify stores its visual graph as an exportable YAML DSL file (\`Export DSL\`), executing that workflow programmatically inside a Python backend or automated content generation agent pipeline is achieved via Dify's Service-API.

Here is the production-ready Python pattern to execute a Dify workflow, feed structured inputs, and handle streaming outputs for automated content generation:

\`\`\`python
import os
import requests
import json

DIFY_API_KEY = os.getenv("DIFY_WORKFLOW_API_KEY")
DIFY_BASE_URL = os.getenv("DIFY_BASE_URL", "https://api.dify.ai/v1")

def run_dify_content_pipeline(topic: str, target_audience: str, tone: str = "authoritative"):
    """
    Executes a Dify content generation agent workflow via the Python API client.
    Passes runtime inputs and captures deterministic LLM generation outputs.
    """
    headers = {
        "Authorization": f"Bearer {DIFY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": {
            "topic": topic,
            "target_audience": target_audience,
            "tone": tone
        },
        "response_mode": "blocking",  # Use 'streaming' for real-time SSE chunk processing
        "user": "python-agent-runner-01"
    }
    
    response = requests.post(
        f"{DIFY_BASE_URL}/workflows/run",
        headers=headers,
        json=payload,
        timeout=120
    )
    
    if response.status_code != 200:
        raise RuntimeError(f"Dify workflow execution failed: {response.status_code} - {response.text}")
        
    data = response.json()
    outputs = data.get("data", {}).get("outputs", {})
    return outputs

# Example execution in a Python automated pipeline
if __name__ == "__main__":
    result = run_dify_content_pipeline(
        topic="Enterprise RAG Vector Search Best Practices",
        target_audience="B2B CTOs & Engineering Leads"
    )
    print("Generated Content:", result.get("article_body"))
\`\`\`

### Wrapping Dify Workflows into LangChain & n8n Agent Pipelines
If your architecture requires n8n to act as the primary operational trigger (e.g., pulling new RSS feeds, Airtable records, or CRM events) while Dify performs semantic content generation:
1. **Trigger via Webhook / Cron in n8n:** n8n monitors your data source.
2. **Execute HTTP Request Node:** Pass the payload to Dify's \`/workflows/run\` endpoint.
3. **Parse and Deliver:** n8n takes Dify's structured markdown output and immediately syndicates it to your CMS or database.

`;

  // New FAQs to inject
  const newFaqs = `
### How do you export a Dify workflow to Python code for an AI agent pipeline?
You can export the workflow architecture as a YAML DSL file from the Dify canvas (\`Export DSL\`). To run the workflow inside a Python script or AI agent pipeline, use Dify's REST API \`/v1/workflows/run\` with a Bearer API token. Pass your custom inputs in the JSON payload using \`response_mode: 'blocking'\` or \`'streaming'\` to consume outputs programmatically.

### What is the difference between a Dify Agent and a Dify Workflow?
A Dify Workflow is a deterministic DAG (Directed Acyclic Graph) where every step executes in a predefined sequence, making it best for reliable pipelines like automated content generation. A Dify Agent uses an LLM reasoning loop (such as ReAct) to autonomously decide which tools to call, when to call them, and how many iterations to perform before concluding.
`;

  // Inject section before "## Frequently Asked Questions"
  const faqHeader = '## Frequently Asked Questions';
  if (body.includes(faqHeader)) {
    const parts = body.split(faqHeader);
    body = parts[0] + newSection + faqHeader + newFaqs + parts[1];
  } else {
    body = body + newSection + faqHeader + newFaqs;
  }

  const metaDesc = "Dify vs n8n architecture comparison: Learn execution models, how to export Dify workflows to Python code agent pipelines, and self-hosted cost benchmarks.";

  console.log('Updating document ID:', post._id);
  console.log('New MetaDescription length:', metaDesc.length);

  await client
    .patch(post._id)
    .set({
      body: body,
      metaDescription: metaDesc,
    })
    .commit();

  console.log('✅ Successfully updated Sanity post for slug:', slug);
}

updatePost().catch(console.error);
