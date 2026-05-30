const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function optimizePost() {
  const filePath = path.resolve(__dirname, 'n8n-rag-tutorial-raw.json');
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Raw post JSON not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log('Original SEO Title:', postData.seoTitle);
    
    // 1. Update metadata fields
    postData.seoTitle = "n8n RAG Tutorial: Build a Private Knowledge Base (2026)";
    postData.seoDescription = "Stop AI hallucinations on your private data. Learn how to build a production-grade n8n RAG pipeline with Pinecone and OpenAI to query documents with 100% accuracy.";

    let body = postData.body || '';

    // 2. Insert reciprocal link for Corrective RAG
    const insertionText = `\n\n> [!NOTE]\n> **Enterprise Escalation:** If you are building a system for client-facing support or highly regulated compliance workloads where zero hallucination is mandatory, we recommend advancing from standard vector lookup to our self-healing **[Corrective RAG (CRAG) Pinecone Blueprint in n8n](/blog/pinecone-n8n-rag-knowledge-base-blueprint/)** which adds programmatic document grading and tavily web-search failover buffers.\n\n`;
    
    body = body.replace(
      'To achieve this precision, we need **RAG — Retrieval-Augmented Generation.** Today we are building it from scratch in n8n.',
      'To achieve this precision, we need **RAG — Retrieval-Augmented Generation.** Today we are building it from scratch in n8n.' + insertionText
    );

    // 3. Update Headings with optimized <mark> questions and direct answers for AEO/Featured Snippets
    body = body.replace(
      '## The Concept: What is RAG? (The Open Book Exam)',
      '## <mark>What is RAG (Retrieval-Augmented Generation)?</mark>\n\nRetrieval-Augmented Generation (RAG) is an architectural framework that optimizes Large Language Model (LLM) responses by dynamically retrieving relevant facts from an external private knowledge base, such as a Pinecone vector database, before generating the final output.'
    );

    body = body.replace(
      '## The Tech Stack (Free Tier Friendly)',
      '## <mark>What tech stack is required for n8n RAG?</mark>\n\nA production-ready n8n RAG architecture requires an orchestration engine (n8n), a specialized vector database (such as Pinecone) to store and query text embeddings, and an intelligence layer (such as OpenAI GPT-4o) to generate embeddings and synthesize the final contextual responses.'
    );

    body = body.replace(
      '## Part 1: The Ingestion Pipeline (Teaching the AI)',
      '## <mark>How do you build the n8n Document Ingestion pipeline?</mark>\n\nThe document ingestion pipeline is built by configuring a trigger node (e.g. Google Drive) to detect new documents, extracting text via a Default Data Loader node, chunking the text into semantic pieces using a Text Splitter, converting chunks to coordinates via an Embedding model, and storing them inside a Pinecone vector index.'
    );

    body = body.replace(
      '## Part 2: The Retrieval Agent (The Librarian Who Talks Back)',
      '## <mark>How do you configure the n8n AI Retrieval Agent?</mark>\n\nThe n8n AI Retrieval Agent is configured by connecting a Chat Trigger to an AI Agent node running a Tools Agent framework, attaching a permanent Window Buffer Memory for conversation history, and equipping it with a Vector Store Tool pointing to the Pinecone index.'
    );

    postData.body = body;

    // 4. Clean system system-generated fields before replacing
    const updateId = postData._id;
    delete postData._createdAt;
    delete postData._updatedAt;
    delete postData._rev;

    console.log(`Optimizing live post in Sanity: "${postData.title}"...`);
    const result = await client.createOrReplace({
      ...postData,
      _id: updateId,
      _type: 'post'
    });

    console.log('✅ Successfully optimized and updated n8n-rag-tutorial in Sanity:', result._id);
    console.log('New SEO Title:', result.seoTitle);
    console.log('New SEO Description:', result.seoDescription);

    fs.writeFileSync(path.resolve(__dirname, 'n8n-rag-tutorial-optimized.json'), JSON.stringify(result, null, 2), 'utf-8');
  } catch (error) {
    console.error('❌ Failed to optimize post:', error);
  }
}

optimizePost();
