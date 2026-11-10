import React from 'react';
import { getSanityPosts } from '@/lib/sanity.client';
import AwwwardsHomepage from './AwwwardsHomepage';

export const metadata = {
  title: 'Alfaz Mahmud Rizve — GTM & RevOps Architect (Awwwards Prototype)',
  description: 'A high-velocity RevOps runtime portfolio: an autonomous technical pipeline where every project is an active node on a live telemetry grid.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DemoPage() {
  let posts: any[] = [];
  try {
    posts = await getSanityPosts();
  } catch (err) {
    console.error('Failed to fetch Sanity posts for /demo:', err);
    posts = [];
  }

  return <AwwwardsHomepage posts={posts || []} />;
}
