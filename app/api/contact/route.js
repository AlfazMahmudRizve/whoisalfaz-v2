import { NextResponse } from 'next/server';

export async function POST(request) {
    // REMINDER: Make sure to set N8N_CONTACT_WEBHOOK in your .env.local file

    try {
        // 1. Parse Data
        const body = await request.json();
        const { name, email, message, source, service, website } = body;

        console.log('Received Contact Request:', { name, email, source, service, website }); // Debug log

        // 2. Strict Validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields: name or email.' },
                { status: 400 }
            );
        }

        // 3. Forward to n8n Webhook
        const webhookUrl = process.env.N8N_CONTACT_WEBHOOK;

        if (!webhookUrl) {
            console.error('SERVER ERROR: N8N_CONTACT_WEBHOOK is not defined.');
            return NextResponse.json(
                { error: 'Server misconfiguration.' },
                { status: 500 }
            );
        }

        const payload = {
            name,
            email,
            message: message || 'No message provided',
            service: service || 'General',
            source: source || 'whoisalfaz.me',
            website: website || null,
            timestamp: new Date().toISOString(),
        };

        const n8nResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // 4. Handle n8n Response
        if (n8nResponse.ok) {
            return NextResponse.json(
                { success: true, message: 'Message sent successfully!' },
                { status: 200 }
            );
        } else {
            const errorText = await n8nResponse.text();
            console.error('n8n Webhook Error:', errorText);
            return NextResponse.json(
                { error: 'Failed to process message downstream.' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
