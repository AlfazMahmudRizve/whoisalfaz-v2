import { AuditResults, CheckResult } from './audit';

// ─── Send Branded Audit Report Email ─────────────────────────
export async function sendAuditReport(email: string, name: string, results: AuditResults): Promise<boolean> {
    const apiKey = process.env.BREVO_API_KEY;
    // Always send from the verified domain — never from Gmail (fails DMARC)
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@whoisalfaz.me';

    if (!apiKey) {
        console.error('[Audit Email] BREVO_API_KEY not set');
        return false;
    }

    try {
        const html = buildReportHTML(name, results);

        const payload = {
            sender: { name: 'Alfaz Mahmud — whoisalfaz.me', email: senderEmail },
            to: [{ email, name }],
            subject: `Your Site Audit: ${results.grade} Grade (${results.overallScore}/100) — ${results.url}`,
            htmlContent: html,
        };

        console.log(`[Audit Email] Sending to ${email} from ${senderEmail}...`);

        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const responseText = await res.text();

        if (!res.ok) {
            console.error(`[Audit Email] Brevo Error (${res.status}):`, responseText);
            return false;
        }

        console.log(`[Audit Email] Successfully sent to ${email}. Response:`, responseText);
        return true;
    } catch (error: any) {
        console.error('[Audit Email] Exception encountered:', error.message || error);
        return false;
    }
}

// ─── Send Admin Notification ────────────────────────────────
export async function notifyAdmin(name: string, email: string, url: string, results: AuditResults): Promise<boolean> {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@whoisalfaz.me';
    const adminEmail = process.env.BREVO_ADMIN_EMAIL;

    if (!apiKey || !adminEmail) return false;

    try {
        const checkSummary = results.checks.map(c => `${c.status === 'pass' ? '✅' : c.status === 'warn' ? '⚠️' : '❌'} ${c.name}: ${c.score}/100`).join('<br>');

        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender: { name: 'Audit System', email: senderEmail },
                to: [{ email: adminEmail }],
                subject: `🔔 New Audit Lead: ${name} — ${results.grade} (${results.overallScore}/100)`,
                htmlContent: `
                    <div style="font-family:monospace;padding:20px;background:#0a0a0a;color:#e2e8f0;">
                        <h2 style="color:#fff;">New Audit Submission</h2>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td style="padding:8px;color:#94a3b8;">Name</td><td style="padding:8px;color:#fff;">${name}</td></tr>
                            <tr><td style="padding:8px;color:#94a3b8;">Email</td><td style="padding:8px;color:#fff;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td></tr>
                            <tr><td style="padding:8px;color:#94a3b8;">URL</td><td style="padding:8px;color:#fff;"><a href="${url}" style="color:#3b82f6;">${url}</a></td></tr>
                            <tr><td style="padding:8px;color:#94a3b8;">Grade</td><td style="padding:8px;color:#fff;font-size:24px;font-weight:bold;">${results.grade} (${results.overallScore}/100)</td></tr>
                        </table>
                        <hr style="border-color:#1e293b;margin:16px 0;">
                        <p style="color:#94a3b8;">${checkSummary}</p>
                    </div>
                `,
            }),
        });

        return res.ok;
    } catch {
        return false;
    }
}

// ─── Add Contact to Brevo List #9 ───────────────────────────
export async function addToBrevoList(email: string, name: string, url: string): Promise<boolean> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return false;

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
                    FIRSTNAME: name.split(' ')[0],
                    LASTNAME: name.split(' ').slice(1).join(' ') || '',
                    WEBSITE: url,
                },
                listIds: [9],
                updateEnabled: true,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Brevo contact error:', err);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to add Brevo contact:', error);
        return false;
    }
}

// ─── Build Branded HTML Report ──────────────────────────────
function buildReportHTML(name: string, results: AuditResults): string {
    const firstName = name.split(' ')[0];
    const scoreColor = results.overallScore >= 80 ? '#22c55e' : results.overallScore >= 50 ? '#f59e0b' : '#ef4444';
    const gradeColor = scoreColor;

    const checksHTML = results.checks.map(check => {
        const statusIcon = check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌';
        const statusColor = check.status === 'pass' ? '#22c55e' : check.status === 'warn' ? '#f59e0b' : '#ef4444';
        const detailsHTML = check.details.map(d => `<li style="padding:4px 0;color:#94a3b8;font-size:13px;">${d}</li>`).join('');

        return `
            <div style="background:#111827;border:1px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <span style="font-size:16px;font-weight:700;color:#f8fafc;">${statusIcon} ${check.name}</span>
                    <span style="font-size:14px;font-weight:700;color:${statusColor};background:${statusColor}15;padding:4px 12px;border-radius:20px;">${check.score}/100</span>
                </div>
                <p style="color:#cbd5e1;font-size:14px;margin-bottom:12px;line-height:1.5;">${check.summary}</p>
                <ul style="list-style:none;padding:0;margin:0;">${detailsHTML}</ul>
            </div>
        `;
    }).join('');

    // Recommendations based on failing checks
    const failingChecks = results.checks.filter(c => c.status === 'fail');
    const warningChecks = results.checks.filter(c => c.status === 'warn');

    let recommendationsHTML = '';
    if (failingChecks.length > 0 || warningChecks.length > 0) {
        const recItems = [
            ...failingChecks.map(c => `<li style="padding:6px 0;color:#f87171;">🔴 <strong>${c.name}</strong> — ${c.summary}</li>`),
            ...warningChecks.map(c => `<li style="padding:6px 0;color:#fbbf24;">🟡 <strong>${c.name}</strong> — ${c.summary}</li>`),
        ].join('');

        recommendationsHTML = `
            <div style="background:#1e1b2e;border:1px solid #312e81;border-radius:12px;padding:24px;margin:24px 0;">
                <h3 style="color:#f8fafc;font-size:18px;margin-bottom:12px;">Priority Fixes</h3>
                <ul style="list-style:none;padding:0;margin:0;">${recItems}</ul>
            </div>
        `;
    }

    return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:640px;margin:0 auto;padding:40px 20px;">

            <!-- Header -->
            <div style="text-align:center;margin-bottom:40px;">
                <h1 style="color:#f8fafc;font-size:24px;margin-bottom:4px;">whoisalfaz<span style="color:#2dd4bf;">.me</span></h1>
                <p style="color:#64748b;font-size:13px;margin:0;">Site Audit Report</p>
            </div>

            <!-- Score Badge -->
            <div style="text-align:center;margin-bottom:32px;">
                <div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:4px solid ${scoreColor};background:${scoreColor}10;line-height:120px;text-align:center;">
                    <span style="font-size:48px;font-weight:900;color:${gradeColor};">${results.grade}</span>
                </div>
                <p style="color:#f8fafc;font-size:20px;margin-top:16px;font-weight:700;">Overall Score: ${results.overallScore}/100</p>
                <p style="color:#64748b;font-size:13px;">${results.url} — ${new Date(results.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <!-- Greeting -->
            <p style="color:#cbd5e1;font-size:15px;line-height:1.6;margin-bottom:24px;">
                ${firstName}, here's a no-BS breakdown of your website's technical health. Every data point below is from a live scan — nothing is inflated or sugarcoated. If something is broken, you'll see it clearly.
            </p>

            <!-- Check Results -->
            ${checksHTML}

            <!-- Recommendations -->
            ${recommendationsHTML}

            <!-- CTA -->
            <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);border:1px solid #334155;border-radius:16px;padding:32px;text-align:center;margin:32px 0;">
                <h3 style="color:#f8fafc;font-size:20px;margin-bottom:8px;">Want These Fixed?</h3>
                <p style="color:#94a3b8;font-size:14px;margin-bottom:20px;line-height:1.5;">
                    I build high-performance Next.js sites and automation systems.<br>
                    If your score isn't where you want it, let's have a 15-minute call to discuss what's realistic.
                </p>
                <a href="https://whoisalfaz.me/contact/" style="display:inline-block;background:#2dd4bf;color:#0a0a0a;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;">Book a Strategy Call</a>
                <p style="color:#475569;font-size:11px;margin-top:12px;">No obligation. No pitch deck. Just a straight conversation.</p>
            </div>

            <!-- Footer -->
            <div style="border-top:1px solid #1e293b;padding-top:24px;margin-top:32px;text-align:center;">
                <p style="color:#475569;font-size:11px;line-height:1.6;">
                    This report was generated by an automated analysis system at whoisalfaz.me.<br>
                    Data accuracy depends on network conditions at the time of scan.<br>
                    For a deeper manual review, reach out directly.
                </p>
                <p style="color:#334155;font-size:10px;margin-top:8px;">© ${new Date().getFullYear()} Alfaz Mahmud Rizve</p>
            </div>

        </div>
    </body>
    </html>
    `;
}
