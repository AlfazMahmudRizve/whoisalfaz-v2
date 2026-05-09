import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
    sendContactNotification,
    sendContactAutoResponder,
    addContactToBrevoList,
} from '@/lib/brevo-email';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
    service: z.string().optional().default('General'),
    source: z.string().optional().default('whoisalfaz.me'),
});

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

        // 2. Send admin notification email via Brevo (critical — blocks response)
        const emailSent = await sendContactNotification({ name, email, message, service });

        if (!emailSent) {
            return NextResponse.json(
                { error: 'Failed to send message. Please try again or email directly.' },
                { status: 500 }
            );
        }

        // 3 & 4. Fire auto-responder + list-add in parallel (non-blocking)
        console.log(`[Contact] Admin email sent. Now firing auto-responder + list-add for ${email}...`);

        const [autoResult, listResult] = await Promise.allSettled([
            sendContactAutoResponder({ name, email, service }),
            addContactToBrevoList({ email, name, service }),
        ]);

        console.log(`[Contact] Auto-responder: ${autoResult.status === 'fulfilled' ? autoResult.value : autoResult.reason}`);
        console.log(`[Contact] List add: ${listResult.status === 'fulfilled' ? listResult.value : listResult.reason}`);

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
