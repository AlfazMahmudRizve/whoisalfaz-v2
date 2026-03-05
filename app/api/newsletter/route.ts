import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
    source: z.string().optional().default('newsletter'),
});

async function addToNewsletterList(email: string, source: string) {
    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '11', 10);

    if (!apiKey) {
        console.error('[Newsletter] BREVO_API_KEY not configured.');
        return false;
    }

    try {
        const res = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                attributes: {
                    SIGNUP_SOURCE: source,
                },
                listIds: [listId],
                updateEnabled: true,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(`[Newsletter] Brevo Error (${res.status}):`, err);
            return false;
        }
        return true;
    } catch (error) {
        console.error('[Newsletter] Failed to add contact:', error);
        return false;
    }
}

async function sendWelcomeEmail(email: string) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@whoisalfaz.me';

    if (!apiKey) return false;

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender: { name: 'Alfaz Mahmud — whoisalfaz.me', email: senderEmail },
                to: [{ email }],
                subject: `Welcome to the whoisalfaz.me newsletter`,
                htmlContent: `
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;font-size:15px;padding:20px;">
                    <p>Hey there 👋</p>
                    <p>You're now on the list. I send practical, no-fluff playbooks on AI automation, technical SEO, and scaling agency workflows.</p>
                    <p>No spam. No filler. Just things that actually move the needle.</p>
                    <p>While you wait for the first issue, here are some resources you might find useful:</p>
                    <ul style="padding-left:20px;">
                        <li><a href="https://whoisalfaz.me/audit/" style="color:#2563eb;">Run a free SEO audit on your site</a></li>
                        <li><a href="https://whoisalfaz.me/blog/" style="color:#2563eb;">Read the latest on the blog</a></li>
                        <li><a href="https://whoisalfaz.me/services/" style="color:#2563eb;">See what I build for clients</a></li>
                    </ul>
                    <br>
                    <p>Talk soon,<br><strong>Alfaz Mahmud Rizve</strong><br><a href="https://whoisalfaz.me" style="color:#2563eb;">whoisalfaz.me</a></p>
                </div>
                `,
            }),
        });

        if (!res.ok) {
            console.error('[Newsletter] Welcome email failed:', await res.text());
        }
        return res.ok;
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = newsletterSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        const { email, source } = result.data;

        // 1. Add to Brevo Newsletter List #11
        const added = await addToNewsletterList(email, source);

        if (!added) {
            return NextResponse.json(
                { error: 'Subscription failed. Please try again.' },
                { status: 500 }
            );
        }

        // 2. Send welcome auto-responder
        await sendWelcomeEmail(email);

        return NextResponse.json(
            { success: true, message: 'Subscribed successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('[Newsletter] API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
