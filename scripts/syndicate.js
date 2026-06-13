const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// Helper to parse CLI arguments
function getArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--')) {
      const parts = arg.split('=');
      const key = parts[0].substring(2);
      const val = parts[1] || true;
      args[key] = val;
    }
  });
  return args;
}

const args = getArgs();
const slug = args.slug;

if (!slug) {
  console.error('❌ Error: Please specify a post slug using --slug=<slug_name>');
  console.log('Usage: node scripts/syndicate.js --slug=apollo-brevo-n8n-outbound-pipeline');
  process.exit(1);
}

// 1. Locate and read the post content (local JSON or Sanity CMS fallback)
async function getPostContent(slug) {
  // Check local root folder for any draft-*.json file matching the slug internally
  const rootDir = path.resolve(__dirname, '..');
  try {
    const files = fs.readdirSync(rootDir);
    const draftFiles = files.filter(f => f.startsWith('draft-') && f.endsWith('.json'));
    
    for (const file of draftFiles) {
      const filePath = path.join(rootDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      const fileSlug = data.slug?.current || data._id || '';
      // Direct match or filename matches a prefix
      if (fileSlug === slug || file.replace('draft-', '').replace('.json', '') === slug) {
        console.log(`📖 Found matching local draft file at: ${filePath}`);
        return {
          title: data.title,
          description: data.description || data.seoDescription,
          body: data.body,
          canonicalUrl: `https://whoisalfaz.me/blog/${slug}`,
          tags: data.affiliates || ['automation', 'revops', 'n8n']
        };
      }
    }
  } catch (err) {
    console.warn(`⚠️ Error scanning local draft files: ${err.message}`);
  }


  // Sanity CDN fallback if local draft is not found or fails to parse
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  if (projectId && token) {
    console.log(`🌐 Local draft not found. Fetching from Sanity CMS API for slug: ${slug}...`);
    try {
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]`);
      const url = `https://${projectId}.api.sanity.io/v2026-05-13/data/query/${dataset}?query=${query}`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const doc = json.result;

      if (!doc) {
        throw new Error(`No document found in Sanity with slug: ${slug}`);
      }

      return {
        title: doc.title,
        description: doc.description || doc.seoDescription,
        body: doc.body,
        canonicalUrl: `https://whoisalfaz.me/blog/${slug}`,
        tags: doc.affiliates || ['automation', 'revops', 'n8n']
      };
    } catch (err) {
      console.error(`❌ Failed to fetch from Sanity CMS: ${err.message}`);
    }
  }

  throw new Error(`Could not find content for slug: ${slug}. Ensure draft-${slug}.json exists or Sanity credentials are configured.`);
}

// 2. Publish to Medium API (as draft)
async function syndicateToMedium(post) {
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  if (!token) {
    console.log('⏭️ Skipping Medium: MEDIUM_INTEGRATION_TOKEN not found in environment.');
    return;
  }

  try {
    console.log('📤 Syndicating to Medium...');
    
    // Step A: Get author ID
    const meRes = await fetch('https://api.medium.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    if (!meRes.ok) {
      const errorText = await meRes.text();
      throw new Error(`Failed to fetch user profiles (HTTP ${meRes.status}): ${errorText}`);
    }

    const meJson = await meRes.json();
    const authorId = meJson.data.id;

    // Step B: Create draft post
    const postRes = await fetch(`https://api.medium.com/v1/users/${authorId}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        title: post.title,
        contentFormat: 'markdown',
        content: `# ${post.title}\n\n${post.body}`,
        canonicalUrl: post.canonicalUrl,
        tags: post.tags.slice(0, 5), // Medium supports max 5 tags
        publishStatus: 'draft'
      })
    });

    if (!postRes.ok) {
      const errorText = await postRes.text();
      throw new Error(`Failed to create post (HTTP ${postRes.status}): ${errorText}`);
    }

    const postJson = await postRes.json();
    console.log(`✅ Medium Draft Created: ${postJson.data.url}`);
  } catch (err) {
    console.error(`❌ Medium Syndication Failed: ${err.message}`);
  }
}

// 3. Publish to Dev.to API (as draft)
async function syndicateToDevTo(post) {
  const apiKey = process.env.DEV_TO_API_KEY;
  if (!apiKey) {
    console.log('⏭️ Skipping Dev.to: DEV_TO_API_KEY not found in environment.');
    return;
  }

  try {
    console.log('📤 Syndicating to Dev.to...');
    
    // Check if there is an optimized dev.to markdown file
    let bodyMarkdown = post.body;
    const scriptsDir = __dirname;
    const baseSlug = slug.split('-n8n')[0]; // e.g. pinecone-vs-qdrant
    const devToMdPath = path.join(scriptsDir, `draft-${baseSlug}-devto.md`);
    
    if (fs.existsSync(devToMdPath)) {
      console.log(`📖 Found optimized Dev.to markdown draft at: ${devToMdPath}`);
      const rawMd = fs.readFileSync(devToMdPath, 'utf-8');
      if (rawMd.startsWith('---')) {
        const parts = rawMd.split('---');
        if (parts.length >= 3) {
          bodyMarkdown = parts.slice(2).join('---').trim();
        }
      } else {
        bodyMarkdown = rawMd;
      }
    }

    const res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        article: {
          title: post.title,
          published: false, // Create as draft
          body_markdown: bodyMarkdown,
          tags: post.tags.slice(0, 4), // Dev.to supports max 4 tags
          canonical_url: post.canonicalUrl,
          description: post.description
        }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log(`✅ Dev.to Draft Created: ${data.url}`);
  } catch (err) {
    console.error(`❌ Dev.to Syndication Failed: ${err.message}`);
  }
}

// 4. Publish to Hashnode GraphQL API (as draft)
async function syndicateToHashnode(post) {
  const pat = process.env.HASHNODE_PAT;
  if (!pat) {
    console.log('⏭️ Skipping Hashnode: HASHNODE_PAT not found in environment.');
    return;
  }

  try {
    console.log('📤 Syndicating to Hashnode...');
    
    // Step A: Get publication ID
    const query = JSON.stringify({
      query: `
        query {
          me {
            publications(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      `
    });

    const pubRes = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        Authorization: pat,
        'Content-Type': 'application/json'
      },
      body: query
    });

    if (!pubRes.ok) {
      throw new Error(`HTTP ${pubRes.status}`);
    }

    let pubJson;
    try {
      pubJson = await pubRes.json();
    } catch (e) {
      throw new Error(`Hashnode API returned HTML instead of JSON. Your HASHNODE_PAT token may be invalid, causing Hashnode/Cloudflare to reject the request.`);
    }
    const pubEdge = pubJson.data?.me?.publications?.edges?.[0];
    if (!pubEdge) {
      throw new Error('No publication found for this Hashnode account.');
    }
    const publicationId = pubEdge.node.id;

    // Step B: Create draft post
    const mutation = JSON.stringify({
      query: `
        mutation CreateDraft($input: CreateDraftInput!) {
          createDraft(input: $input) {
            draft {
              id
              slug
              title
            }
          }
        }
      `,
      variables: {
        input: {
          title: post.title,
          markdown: post.body,
          canonicalUrl: post.canonicalUrl,
          publicationId: publicationId,
          tags: [] // Hashnode tags require specific ID mapping; default to empty for draft setup
        }
      }
    });

    const postRes = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        Authorization: pat,
        'Content-Type': 'application/json'
      },
      body: mutation
    });

    if (!postRes.ok) {
      throw new Error(`HTTP ${postRes.status}`);
    }

    let postJson;
    try {
      postJson = await postRes.json();
    } catch (e) {
      throw new Error('Failed to parse Hashnode creation response: response was not valid JSON.');
    }
    if (postJson.errors && postJson.errors.length > 0) {
      throw new Error(postJson.errors[0].message);
    }

    const draft = postJson.data?.createDraft?.draft;
    console.log(`✅ Hashnode Draft Created successfully! (Draft ID: ${draft.id})`);
  } catch (err) {
    console.error(`❌ Hashnode Syndication Failed: ${err.message}`);
  }
}

// 5. Post link update to LinkedIn API
async function syndicateToLinkedIn(post) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    console.log('⏭️ Skipping LinkedIn: LINKEDIN_ACCESS_TOKEN not found in environment.');
    return;
  }

  try {
    console.log('📤 Posting update to LinkedIn...');
    
    // Step A: Fetch user URN if not explicitly configured
    let authorUrn = process.env.LINKEDIN_PERSON_URN;
    if (!authorUrn || !authorUrn.startsWith('urn:')) {
      const meRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      if (!meRes.ok) {
        throw new Error(`Failed to retrieve LinkedIn user profiles (HTTP ${meRes.status})`);
      }
      const meJson = await meRes.json();
      const subId = meJson.sub;
      if (!subId) {
        throw new Error('Unable to extract user sub ID from LinkedIn profile response.');
      }
      authorUrn = `urn:li:person:${subId}`;
    }

    // Step B: Post share/article update to feed
    const postRes = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202605'
      },
      body: JSON.stringify({
        author: authorUrn,
        commentary: args.commentary || `I just published a new article on whoisalfaz.me: "${post.title}"\n\nRead the full post here: ${post.canonicalUrl}`,
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: []
        },
        content: {
          article: {
            source: post.canonicalUrl,
            title: post.title,
            description: post.description
          }
        },
        lifecycleState: 'PUBLISHED'
      })
    });

    if (!postRes.ok) {
      const errorText = await postRes.text();
      throw new Error(`HTTP ${postRes.status}: ${errorText}`);
    }

    console.log(`✅ Successfully shared update to LinkedIn!`);
  } catch (err) {
    console.error(`❌ LinkedIn Posting Failed: ${err.message}`);
  }
}

const { exec } = require('child_process');

function copyToClipboard(text) {
  try {
    const { execSync } = require('child_process');
    if (process.platform === 'win32') {
      execSync(`echo | set /p="${text}" | clip`);
      console.log(`📋 Copied canonical URL to clipboard: ${text}`);
    }
  } catch (err) {
    // Fail silently
  }
}

function openBrowser(url) {
  const openCmd = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${openCmd} "${url}"`);
}

// Main execution block
async function main() {
  try {
    console.log(`⚡ Initiating syndication process for slug: "${slug}"...`);
    const post = await getPostContent(slug);
    
    // 1. Fully Automated APIs
    await syndicateToDevTo(post);
    await syndicateToLinkedIn(post);
    
    // 2. Semi-Automated / Browser-Assisted Platforms
    console.log('\n🌐 Opening browser tabs for semi-automated syndication...');
    
    // Copy canonical URL for easy pasting
    copyToClipboard(post.canonicalUrl);
    
    console.log('🔗 Launching Medium Import Page...');
    openBrowser('https://medium.com/p/import');
    
    console.log('🔗 Launching Hashnode Editor...');
    openBrowser('https://hashnode.com/create');
    
    console.log('🔗 Launching Substack Dashboard...');
    openBrowser('https://substack.com/publish');
    
    console.log('\n🎉 Syndication script run complete!');
  } catch (err) {
    console.error(`❌ Process terminated abnormally: ${err.message}`);
  }
}

main();

