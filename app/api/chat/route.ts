import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // 1. Convert to lowercase for matching
        const lowerMsg = message.toLowerCase();

        // 2. Define the Logic Map (Priority Order)
        let reply = "";

        if (lowerMsg.match(/price|cost|rate|how much|budget/)) {
            reply = "Pricing depends on complexity. Automation Workflows start at $300. Headless Systems start at $1,500. Consulting starts at $200/hr.";
        }
        else if (lowerMsg.match(/n8n|automation|workflow|zapier/)) {
            reply = "I build custom n8n workflows that replace manual work. I can automate lead enrichment, PDF reporting, and CRM syncing. Systems start from $300.";
        }
        else if (lowerMsg.match(/website|wordpress|headless|next|react/)) {
            reply = "I specialize in Headless WordPress. You keep the WordPress admin panel, but the frontend is built with Next.js for 100/100 speed scores and instant loading.";
        }
        else if (lowerMsg.match(/seo|rank|audit|google/)) {
            reply = "I perform Technical SEO Audits to fix invisible code errors. I also focus on Core Web Vitals to ensure Google loves your site.";
        }
        else if (lowerMsg.match(/who|alfaz|about|resume/)) {
            // Note: We return text here, the frontend can handle markdown links if configured, 
            // but standard text is safest for this simple implementation.
            reply = "Alfaz Mahmud Rizve is a Full-Stack Automation Architect and Business Growth Consultant. He builds 'self-driving' agencies using n8n and Headless Tech. Check out his Portfolio page.";
        }
        else if (lowerMsg.match(/stack|tech|tools/)) {
            reply = "My Core Stack: Next.js (Frontend), n8n (Automation), Headless WordPress (CMS), and Vercel (Edge Infrastructure).";
        }
        else if (lowerMsg.match(/contact|hire|email|book/)) {
            reply = "You can email me at contact@whoisalfaz.me or use the [contact form](/contact) to book a discovery call.";
        }
        else {
            // Default Fallback
            reply = "I am an AI simulation trained on Alfaz's portfolio. You can ask me about Services, Pricing, Headless Tech, or Automation!";
        }

        // Simulate a tiny network delay for realism (optional, but feels better)
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error('Chat Logic Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request', details: error.message },
            { status: 500 }
        );
    }
}
