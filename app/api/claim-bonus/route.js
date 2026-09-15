import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, orderId, hp_website } = body;

    // 1. Honeypot anti-bot check
    if (hp_website && hp_website.trim().length > 0) {
      console.warn('[Security] Bot detected via honeypot field.');
      return NextResponse.json({ success: true, message: 'Your request is being processed.' });
    }

    // 2. Email Validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please provide a valid work email address.' }, { status: 400 });
    }

    const cleanName = (name || 'Friend').trim();
    const cleanEmail = email.toLowerCase().trim();
    const cleanOrderId = (orderId || 'FREE_COMMUNITY_ACCESS').trim();

    const downloadUrl = 'https://whoisalfaz.me/downloads/manychat-automation-bonus-pack.zip';

    // 3. Brevo Transactional Email & CRM Sync
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@whoisalfaz.me';

    if (apiKey) {
      // Transactional Email HTML
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
            .card { max-width: 600px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #7c3aed, #0d9488); padding: 32px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; }
            .content { padding: 32px; line-height: 1.6; color: #cbd5e1; }
            .btn { display: inline-block; background: #0d9488; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .box { background: #0f172a; border-left: 4px solid #7c3aed; padding: 14px; border-radius: 6px; margin: 16px 0; font-size: 13px; color: #94a3b8; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>🎉 Your ManyChat Automation Blueprint Pack</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${cleanName}</strong>,</p>
              <p>Thank you for requesting your <strong>Production Automation Blueprint Pack</strong> for ManyChat and n8n!</p>
              
              <p>Your production-ready n8n workflow templates, schemas, and Quick Start Guide are ready to download below:</p>

              <div style="text-align: center;">
                <a href="${downloadUrl}" class="btn">Download Blueprint Pack (.ZIP) →</a>
              </div>

              <h4 style="color: #f1f5f9; margin-top: 24px;">📦 Included Workflows:</h4>
              <ul style="color: #94a3b8; font-size: 14px;">
                <li><strong>ManyChat Async Timeout Handler:</strong> Solves 10s webhook timeouts with decoupled n8n queues.</li>
                <li><strong>Apollo to Brevo Lead Enrichment:</strong> Enriches B2B contacts and cleans CRM data.</li>
                <li><strong>Qdrant Multi-Tenant RAG Engine:</strong> Enterprise vector search pipeline for AI agents.</li>
              </ul>

              <hr style="border: 0; border-top: 1px solid #1e293b; margin: 28px 0;" />

              <p style="font-size: 13px; color: #94a3b8;">
                Need help deploying this into your agency or e-commerce stack? Feel free to reply directly to this email or book a triage call at <a href="https://whoisalfaz.me/contact/" style="color: #0d9488;">whoisalfaz.me/contact/</a>.
              </p>

              <p style="margin-top: 24px; font-size: 14px;">
                Best regards,<br>
                <strong>Alfaz Mahmud Rizve</strong><br>
                <span style="font-size: 12px; color: #64748b;">Systems Architect · whoisalfaz.me</span>
              </p>
            </div>
            <div class="footer">
              Sent with ❤️ from whoisalfaz.me · Accelerated Growth Studio
            </div>
          </div>
        </body>
        </html>
      `;

      // Dispatch Brevo Transactional Emails (User Delivery + Admin Notification) & Sync Contact
      try {
        const adminAlertHtml = `
          <div style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px;">
            <h2 style="color: #38bdf8; margin-top: 0;">🚨 New Blueprint Pack Download</h2>
            <p>A new user has requested the ManyChat &amp; n8n Automation Blueprint Pack:</p>
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 6px 0;"><strong>👤 Name:</strong> ${cleanName}</p>
              <p style="margin: 6px 0;"><strong>✉️ Email:</strong> <a href="mailto:${cleanEmail}" style="color: #2dd4bf;">${cleanEmail}</a></p>
              <p style="margin: 6px 0;"><strong>🕒 Date:</strong> ${new Date().toUTCString()}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8;">
              This contact has been tagged with <code>MANYCHAT_BLUEPRINT_DOWNLOAD: true</code> in your Brevo CRM.
            </p>
          </div>
        `;

        await Promise.allSettled([
          // 1. Email to User with Download Link
          fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: { name: 'Alfaz Mahmud Rizve', email: senderEmail },
              to: [{ email: cleanEmail, name: cleanName }],
              replyTo: { email: senderEmail, name: 'Alfaz Mahmud Rizve' },
              subject: '🎁 Your ManyChat & n8n Automation Blueprint Pack is Ready!',
              htmlContent: htmlContent
            })
          }),

          // 2. Instant Admin Alert to Alfaz (contact@whoisalfaz.me + configured admin email)
          fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: { name: 'WhoisAlfaz Lead Engine', email: senderEmail },
              to: [
                { email: 'contact@whoisalfaz.me', name: 'Alfaz Contact' },
                ...(process.env.BREVO_ADMIN_EMAIL ? [{ email: process.env.BREVO_ADMIN_EMAIL, name: 'Alfaz Admin' }] : [])
              ],
              replyTo: { email: cleanEmail, name: cleanName },
              subject: `🚨 New Blueprint Download: ${cleanName}`,
              htmlContent: adminAlertHtml
            })
          }),

          // 3. Upsert Contact in Brevo CRM with Tag
          fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: cleanEmail,
              attributes: {
                FIRSTNAME: cleanName,
                MANYCHAT_BLUEPRINT_DOWNLOAD: true
              },
              updateEnabled: true
            })
          })
        ]);
      } catch (brevoErr) {
        console.error('[Brevo Sync Error]', brevoErr);
      }
    }

    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl,
      message: 'Download link successfully prepared and dispatched to your email.'
    });

  } catch (err) {
    console.error('[Claim API Error]', err);
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}
