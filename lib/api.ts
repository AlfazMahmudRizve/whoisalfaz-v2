// Using environment variable for API URL with fallback for production stability
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://v1.whoisalfaz.me/graphql';

async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Updates data every 60 seconds
  });

  if (!res.ok) {
    console.error(`API returned status ${res.status}`);
    return null;
  }

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (json.errors) {
      console.error(json.errors);
      return null;
    }
    return json.data;
  } catch (_error) { // prefixed with underscore to silence unused variable warning
    console.error("Failed to parse API response:", text.slice(0, 100));
    return null;
  }
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          title
          description
          canonicalUrl
          openGraph {
            title
            description
            image {
              sourceUrl
            }
          }
        }
      }
    }
  `, { variables: { slug } });
  return data?.post;
}

export async function getPageBySlug(slug: string) {
  const data = await fetchAPI(`
    query PageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
        date
        seo {
          title
          description
          canonicalUrl
          openGraph {
            title
            description
            image {
              sourceUrl
            }
          }
        }
      }
    }
  `, { variables: { slug } });
  return data?.page;
}

export async function getAllCategories() {
  const data = await fetchAPI(`
    query AllCategories {
      categories(first: 20) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `);
  return data?.categories?.nodes;
}

export async function getPostsByCategory(slug: string) {
  const data = await fetchAPI(`
    query PostsByCategory($slug: String) {
      posts(first: 100, where: { categoryName: $slug }) {
        nodes {
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
      categories(where: { slug: [$slug] }) {
        nodes {
          name
          slug
        }
      }
    }
  `, { variables: { slug } });

  return {
    posts: data?.posts?.nodes || [],
    category: data?.categories?.nodes?.[0] || null
  };
}

export async function getSitemapData() {
  const data = await fetchAPI(`
    query SitemapData {
      posts(first: 1000) {
        nodes {
          slug
          modified
          date
        }
      }
      pages(first: 1000) {
        nodes {
          slug
          modified
          date
        }
      }
    }
  `);
  return {
    posts: data?.posts?.nodes || [],
    pages: data?.pages?.nodes || []
  };
}