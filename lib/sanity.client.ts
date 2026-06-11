import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true if you want faster responses for static data, false for fresh data
})

export async function getSanityPosts() {
  const query = `*[_type == "post"] | order(date desc) {
    title,
    slug,
    description,
    date,
    "image": image.asset->url,
    "categories": categories[]->name
  }`
  return client.fetch(query)
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
  return client.fetch(query, { categorySlug })
}

export async function getSanityCategoryBySlug(categorySlug: string) {
  const query = `*[_type == "category" && slug.current == $categorySlug][0] {
    name,
    slug
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
