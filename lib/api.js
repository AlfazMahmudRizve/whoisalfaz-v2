// TEMPORARY FIX: Hardcoding the URL to bypass the .env error
const API_URL = 'https://whoisalfaz.me/graphql';

async function fetchAPI(query, { variables } = {}) {
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
  } catch (error) {
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

export async function getPostBySlug(slug) {
  const data = await fetchAPI(`
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `, { variables: { slug } });
  return data?.post;
}

export async function getPageBySlug(slug) {
  const data = await fetchAPI(`
    query PageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
        date
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