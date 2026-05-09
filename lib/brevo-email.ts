/**
 * lib/brevo-email.ts
 * Centralized Brevo (Sendinblue) email and contact management utilities.
 * Extracted from /api/contact and /api/newsletter route handlers
 * to reduce complexity and enable reuse.
 */

// ─── Configuration ───────────────────────────────────────────────────────────
function getBrevoConfig() {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@whoisalfaz.me';
    const adminEmail = process.env.BREVO_ADMIN_EMAIL;
    return { apiKey, senderEmail, adminEmail };
}

async function brevoFetch(endpoint: string, body: object): Promise<boolean> {
    const { apiKey } = getBrevoConfig();
    if (!apiKey) {
        console.error(`[Brevo] API key not configured for ${endpoint}`);
        return false;
    }

    try {
        const res = await fetch(`https://api.brevo.com/v3${endpoint}`, {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            console.error(`[Brevo] ${endpoint} Error (${res.status}):`, await res.text());
            return false;
        }
        return true;
    } catch (error) {
        console.error(`[Brevo] ${endpoint} Failed:`, error);
        return false;
    }
}

// ─── Contact Form: Admin Notification ────────────────────────────────────────
export async function sendContactNotification(data: {
    name: string;
    email: string;
    message: string;
    service: string;
}): Promise<boolean> {
    const { senderEmail, adminEmail } = getBrevoConfig();
    if (!adminEmail) {
        console.error('[Brevo] BREVO_ADMIN_EMAIL not configured.');
        return false;
    }

    return brevoFetch('/smtp/email', {
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
    });
}

// ─── Contact Form: Auto-Responder ────────────────────────────────────────────
export async function sendContactAutoResponder(data: {
    name: string;
    email: string;
    service: string;
}): Promise<boolean> {
    const { senderEmail } = getBrevoConfig();
    const firstName = data.name.split(' ')[0];

    return brevoFetch('/smtp/email', {
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
    });
}

// ─── Add Contact to Brevo List ───────────────────────────────────────────────
export async function addContactToBrevoList(data: {
    email: string;
    name?: string;
    service?: string;
    source?: string;
    listId?: number;
}): Promise<boolean> {
    const listId = data.listId || parseInt(process.env.BREVO_CONTACT_LIST_ID || '10', 10);
    if (isNaN(listId)) return false;

    const attributes: Record<string, string> = {};
    if (data.name) {
        attributes.FIRSTNAME = data.name.split(' ')[0];
        attributes.LASTNAME = data.name.split(' ').slice(1).join(' ') || '';
    }
    if (data.service) attributes.SERVICE_INTEREST = data.service;
    if (data.source) attributes.SIGNUP_SOURCE = data.source;

    return brevoFetch('/contacts', {
        email: data.email,
        attributes,
        listIds: [listId],
        updateEnabled: true,
    });
}

// ─── Newsletter: Welcome Email ───────────────────────────────────────────────
export async function sendNewsletterWelcome(email: string): Promise<boolean> {
    const { senderEmail } = getBrevoConfig();

    return brevoFetch('/smtp/email', {
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
    });
}
