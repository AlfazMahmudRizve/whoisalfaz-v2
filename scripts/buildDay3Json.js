const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-pinecone-n8n-rag-body.md');
const outputPath = path.resolve(__dirname, '../draft-pinecone-n8n-rag.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 3 blog post...');
    
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Body markdown file not found: ${bodyPath}`);
    }
    const bodyContent = fs.readFileSync(bodyPath, 'utf-8');
    
    const featuredAssetId = 'image-07eb0d7215a8bf36acde7d1f3fba6e7dcfb8e309-1024x1024-webp';
    
    const postJson = {
      _id: 'pinecone-n8n-rag-knowledge-base-blueprint', // Direct live publish
      _type: 'post',
      title: 'Building a RAG Knowledge Base with Pinecone and n8n: A Production-Ready Blueprint',
      slug: {
        _type: 'slug',
        current: 'pinecone-n8n-rag-knowledge-base-blueprint'
      },
      description: 'Build an enterprise-grade Corrective RAG (CRAG) knowledge base with n8n and Pinecone. Step-by-step blueprint covering document grading, hybrid search, and self-healing web search fallbacks.',
      date: new Date().toISOString(),
      seoTitle: 'Corrective RAG in n8n: Zero-Hallucination Pinecone Blueprint (2026)',
      seoDescription: 'Build an enterprise-grade Corrective RAG (CRAG) knowledge base with n8n and Pinecone. Step-by-step blueprint covering document grading, hybrid search, and self-healing web search fallbacks.',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: featuredAssetId
        }
      },
      categories: [
        {
          _type: 'reference',
          _ref: 'Al3E26R37amzsHAqPF1yCU' // Automation Tools
        },
        {
          _type: 'reference',
          _ref: 'pJmrsKLAWC800vFHegUEU1' // Architecture Teardowns
        }
      ],
      affiliates: [
        'n8n',
        'pinecone'
      ],
      body: bodyContent
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Successfully generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to compile post JSON:', error);
  }
}

buildJson();
