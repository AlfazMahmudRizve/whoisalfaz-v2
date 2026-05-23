import { NextResponse } from 'next/server';
import { z } from 'zod';
import { runFullAudit } from '@/lib/audit';
import { sendAuditReport, notifyAdmin, addToBrevoList } from '@/lib/audit-email';

export const maxDuration = 60; // Allow up to 60 seconds to prevent Vercel 504 timeouts

const auditSchema = z.object({
    url: z.string().url('Please enter a valid URL'),
    name: z.string().optional().or(z.literal('')),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate
        const parsed = auditSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { url, name, email } = parsed.data;
        const auditName = name || 'Audit User';

        // Normalize URL
        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

        // 2. Run the full audit (all 6 checks in parallel)
        const results = await runFullAudit(normalizedUrl);

        // 3. Conditionally send emails if email is provided
        let emailSent = false;
        let contactAdded = false;
        let adminNotified = false;
        let emailError: string | undefined = undefined;

        if (email) {
            console.log(`[Audit API] Starting email delivery for ${email}...`);
            const emailResults = await Promise.allSettled([
                sendAuditReport(email, auditName, results),
                addToBrevoList(email, auditName, normalizedUrl),
                notifyAdmin(auditName, email, normalizedUrl, results),
            ]);

            emailSent = emailResults[0].status === 'fulfilled' && emailResults[0].value === true;
            contactAdded = emailResults[1].status === 'fulfilled' && emailResults[1].value === true;
            adminNotified = emailResults[2].status === 'fulfilled' && emailResults[2].value === true;

            emailError = !emailSent && emailResults[0].status === 'rejected' ? String(emailResults[0].reason) : (!emailSent ? 'false' : 'ok');
            console.log(`[Audit API Delivery] email=${emailSent} (${emailError}), contact=${contactAdded}, admin=${adminNotified}`);
        } else {
            console.log(`[Audit API] Anonymous audit run for ${normalizedUrl}`);
        }

        // 4. Return results immediately so the UI doesn't hang and Vercel doesn't timeout
        return NextResponse.json({
            success: true,
            results,
            emailSent,
            emailError: emailError !== 'ok' ? emailError : undefined,
        });

    } catch (error: unknown) {
        console.error('Audit API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
