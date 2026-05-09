import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addContactToBrevoList, sendNewsletterWelcome } from '@/lib/brevo-email';

const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
    source: z.string().optional().default('newsletter'),
});

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
        const newsletterListId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '11', 10);

        // 1. Add to Brevo Newsletter List
        const added = await addContactToBrevoList({
            email,
            source,
            listId: newsletterListId,
        });

        if (!added) {
            return NextResponse.json(
                { error: 'Subscription failed. Please try again.' },
                { status: 500 }
            );
        }

        // 2. Send welcome auto-responder
        await sendNewsletterWelcome(email);

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
