const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-pinecone-vs-qdrant-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-pinecone-vs-qdrant.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 10 blog post...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.pinecone_qdrant_featured) {
        featuredAssetId = imagesMeta.pinecone_qdrant_featured._id;
        featuredUrl = imagesMeta.pinecone_qdrant_featured.url;
      }
      if (imagesMeta.pinecone_qdrant_body1) body1Url = imagesMeta.pinecone_qdrant_body1.url;
      if (imagesMeta.pinecone_qdrant_body2) body2Url = imagesMeta.pinecone_qdrant_body2.url;
    }

    if (featuredUrl) {
      bodyContent = bodyContent.split('pinecone_qdrant_featured.webp').join(featuredUrl);
      console.log('✅ Replaced featured placeholder.');
    }
    if (body1Url) {
      bodyContent = bodyContent.split('pinecone_qdrant_body1.webp').join(body1Url);
      console.log('✅ Replaced body1 placeholder.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('pinecone_qdrant_body2.webp').join(body2Url);
      console.log('✅ Replaced body2 placeholder.');
    }

    if (!featuredAssetId) {
      console.warn('⚠️  Featured image not found — using fallback.');
      featuredAssetId = 'image-6ec565e97da4f36e1d1539052783e5044dd61637-1280x720-webp';
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which is faster: Pinecone or Qdrant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qdrant is generally faster in raw query speed due to its Rust implementation and SIMD hardware acceleration, achieving p95 latencies under 15ms. Pinecone Serverless latencies average 20-45ms and can experience initial cold starts."
          }
        },
        {
          "@type": "Question",
          "name": "Can you self-host Pinecone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Pinecone is a proprietary, closed-source cloud service. Qdrant, however, is open-source (Apache 2.0) and can be easily self-hosted via Docker or Kubernetes on your own VPS or bare-metal servers."
          }
        },
        {
          "@type": "Question",
          "name": "What is vector quantization and why does Qdrant use it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vector quantization (like Scalar Quantization or SQ) compresses float32 vector coordinates into int8 values. This yields a 4x reduction in RAM requirements for vector indexes with less than 1% loss of search accuracy, significantly lowering hosting costs."
          }
        },
        {
          "@type": "Question",
          "name": "How do you handle multi-tenancy in Qdrant without OOM crashes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instead of creating a separate Collection for every tenant, store all vectors in a single collection and attach a tenant_id metadata key to the payload. Query Qdrant with a mandatory must match filter on tenant_id to isolate data securely and efficiently."
          }
        }
      ]
    };

    const postJson = {
      _id: 'pinecone-vs-qdrant-n8n-rag-comparison',
      _type: 'post',
      title: 'Pinecone vs Qdrant for n8n RAG Pipelines: Which Vector DB Should You Choose?',
      slug: { _type: 'slug', current: 'pinecone-vs-qdrant-n8n-rag-comparison' },
      description: "A technical comparison of Pinecone vs Qdrant for RAG workflows in n8n — covering indexing speed, cost, semantic search accuracy, and self-hosting trade-offs.",
      date: new Date().toISOString(),
      seoTitle: 'Pinecone vs Qdrant: Vector DB Guide for n8n RAG (2026)',
      seoDescription: "Compare Pinecone and Qdrant for n8n RAG pipelines. Benchmark study on speed, latency, hosting costs, and Docker deployment setups.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }  // Architecture Teardowns
      ],
      affiliates: ['n8n', 'pinecone', 'qdrant'],
      body: bodyContent,
      schemaMarkup: JSON.stringify(faqSchema)
    };

    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

buildJson();
