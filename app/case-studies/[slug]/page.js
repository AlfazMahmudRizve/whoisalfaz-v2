import { redirect } from 'next/navigation';

export default async function CaseStudyDynamicRedirect({ params }) {
  const { slug } = await params;
  if (slug === 'tempmail10min-seo-audit') {
    redirect('/blog/tempmail10min-seo-case-study/');
  }
  redirect(`/blog/${slug}/`);
}
