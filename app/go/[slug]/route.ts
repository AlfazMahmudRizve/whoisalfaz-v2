import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateItem } from '@/lib/affiliate-catalog';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Handles /go/[slug] outbound affiliate redirections with:
 * 1. Typed catalog lookup from lib/affiliate-catalog.ts
 * 2. Asynchronous click telemetry (structured logs + Supabase fallback)
 * 3. HTTP 307 Temporary Redirect (preventing stale browser caches)
 * 4. X-Robots-Tag: noindex, nofollow headers to preserve SEO equity
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const affiliate = getAffiliateItem(slug);

  if (!affiliate) {
    return new NextResponse('Affiliate destination not found', {
      status: 404,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  // 1. Asynchronous Telemetry Logging
  const referrer = request.headers.get('referer') || request.headers.get('referrer') || 'direct';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const clickEvent = {
    event: 'affiliate_click',
    slug: affiliate.slug,
    destination: affiliate.destination,
    referrer,
    userAgent,
    timestamp: new Date().toISOString(),
  };

  // Structured Log for Vercel Log Drain / Datadog
  console.log(JSON.stringify(clickEvent));

  // Asynchronous Supabase write (fire-and-forget, non-blocking)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    fetch(`${supabaseUrl}/rest/v1/affiliate_clicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        slug: affiliate.slug,
        destination: affiliate.destination,
        referrer,
        user_agent: userAgent,
        created_at: clickEvent.timestamp,
      }),
    }).catch(() => {
      // Silently catch network or schema errors to guarantee sub-10ms redirection
    });
  }

  // 2. HTTP 307 Temporary Redirect with strict anti-caching & SEO protection headers
  return NextResponse.redirect(affiliate.destination, {
    status: 307,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
