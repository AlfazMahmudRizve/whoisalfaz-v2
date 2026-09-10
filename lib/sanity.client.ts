import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN enabled: faster responses, edge-cached reads, lower memory pressure
  perspective: 'published',
})

// Legacy 308 redirect slug normalizer to prevent internal redirect chains
const LEGACY_SLUG_MAP: Record<string, string> = {
  'outstanding-ideas-for-youtube-shorts': 'automated-youtube-shorts-generator',
  'outstanding-ideas-for-saas-mvps': 'build-personal-ai-assistant',
  'outstanding-ideas-for-b2b-lead-generation': 'cold-email-machine-apollo-aisdr-brevo',
  'outstanding-ideas-for-b2b-lead-capture': 'manychat-whatsapp-b2b-lead-capture-agency',
}

export function normalizePostSlug(slug: string): string {
  if (!slug) return slug
  return LEGACY_SLUG_MAP[slug] || slug
}

export async function getSanityPosts() {
  const query = `*[_type == "post"] | order(date desc) {
    title,
    slug,
    description,
    date,
    "image": image.asset->url,
    "categories": categories[]->name
  }`
  const posts = await client.fetch(query)
  return (posts || []).map((post: any) => {
    if (post?.slug?.current) {
      post.slug.current = normalizePostSlug(post.slug.current)
    }
    return post
  })
}

export async function getSanityPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    description,
    date,
    seoTitle,
    seoDescription,
    "image": image.asset->url,
    affiliates,
    "categories": categories[]->name,
    body,
    schemaMarkup
  }`
  return client.fetch(query, { slug })
}

export async function getSanityCategories() {
  const query = `*[_type == "category"] {
    name,
    slug,
    "count": count(*[_type == "post" && references(^._id)])
  } | order(count desc)`
  return client.fetch(query)
}

export async function getSanityPostsByCategory(categorySlug: string) {
  const query = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(date desc) {
    title,
    slug,
    description,
    date,
    "image": image.asset->url,
    "categories": categories[]->name
  }`
  const posts = await client.fetch(query, { categorySlug })
  return (posts || []).map((post: any) => {
    if (post?.slug?.current) {
      post.slug.current = normalizePostSlug(post.slug.current)
    }
    return post
  })
}

export async function getSanityCategoryBySlug(categorySlug: string) {
  const query = `*[_type == "category" && slug.current == $categorySlug][0] {
    name,
    slug,
    description
  }`
  return client.fetch(query, { categorySlug })
}

// Utility: Slugify a string (matches the old MDX slugify for sitemap compatibility)
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
