import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
    service: z.string().optional().default('General'),
    source: z.string().optional().default('whoisalfaz.me'),
});

async function sendBrevoEmail(data: { name: string; email: string; message: string; service: string }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@whoisalfaz.me';
    const adminEmail = process.env.BREVO_ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
        console.error('[Contact] BREVO_API_KEY or BREVO_ADMIN_EMAIL not configured.');
        return false;
    }

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender: { name: 'whoisalfaz.me', email: senderEmail },
            to: [{ email: adminEmail }],
            replyTo: { email: data.email, name: data.name },
            subject: `New Contact: ${data.service} — ${data.name}`,
            htmlContent: `
                <h2>New Contact Form Submission</h2>
                <table style="border-collapse:collapse;width:100%;max-width:600px;">
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #ddd;">${data.service}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${data.message}</td></tr>
                </table>
                <p style="margin-top:16px;color:#666;font-size:12px;">Sent from whoisalfaz.me contact form</p>
            `,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`[Contact] Brevo API Error (${res.status}):`, errorText);
        return false;
    }

    return true;
}

async function sendAutoResponder(data: { name: string; email: string; service: string }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@whoisalfaz.me';

    if (!apiKey) return false;

    const firstName = data.name.split(' ')[0];

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender: { name: 'Alfaz Mahmud — whoisalfaz.me', email: senderEmail },
                to: [{ email: data.email, name: data.name }],
                subject: `Received: Your inquiry to whoisalfaz.me`,
                htmlContent: `
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;font-size:15px;padding:20px;">
                    <p>Hi ${firstName},</p>
                    <p>I received your inquiry regarding <strong>${data.service}</strong>.</p>
                    <p>I typically review new project requests and reply within 24 hours. If your request is urgent, you can book a discovery session directly on my calendar here:</p>
                    <p><a href="https://whoisalfaz.me/contact" style="display:inline-block;background-color:#0f172a;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Book a Strategy Call</a></p>
                    <br>
                    <p>Best,<br><strong>Alfaz Mahmud Rizve</strong><br><a href="https://whoisalfaz.me" style="color:#2563eb;">whoisalfaz.me</a></p>
                </div>
                `,
            }),
        });

        if (!res.ok) {
            console.error('[Contact] Auto-responder failed:', await res.text());
        }
        return res.ok;
    } catch {
        return false;
    }
}

async function addContactToBrevoList(data: { name: string; email: string; service: string }) {
    const apiKey = process.env.BREVO_API_KEY;
    const listIdStr = process.env.BREVO_CONTACT_LIST_ID || '10'; // Default to List #10 for commercial leads

    if (!apiKey || !listIdStr) {
        return false;
    }

    const listId = parseInt(listIdStr, 10);
    if (isNaN(listId)) return false;

    try {
        const res = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                attributes: {
                    FIRSTNAME: data.name.split(' ')[0],
                    LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
                    SERVICE_INTEREST: data.service,
                },
                listIds: [listId],
                updateEnabled: true,
            }),
        });

        if (!res.ok) {
            console.error(`[Contact] Brevo List Error:`, await res.text());
            return false;
        }
        return true;
    } catch (error) {
        console.error(`[Contact] Failed to add to Brevo list:`, error);
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate with Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, message, service } = result.data;

        // 2. Send admin notification email via Brevo
        const emailSent = await sendBrevoEmail({ name, email, message, service });

        if (!emailSent) {
            return NextResponse.json(
                { error: 'Failed to send message. Please try again or email directly.' },
                { status: 500 }
            );
        }

        // 3. Add to Brevo Contacts List #10
        await addContactToBrevoList({ name, email, service });

        // 4. Send Auto-responder to User
        await sendAutoResponder({ name, email, service });

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('[Contact] API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
