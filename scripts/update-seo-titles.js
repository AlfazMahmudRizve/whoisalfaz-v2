const fs = require('fs');
const path = require('path');

const updates = {
  'day-1.mdx': 'How to Set Up n8n: Complete Beginner Guide (2026)',
  'day-2.mdx': 'n8n Tutorial: Build Your First Workflow in 10 Minutes',
  'day-3.mdx': 'n8n Webhook Integration: Connect Any App via HTTP',
  'day-4.mdx': 'How to Build a Data Pipeline with n8n (Step-by-Step)',
  'day-5.mdx': 'n8n IF Node & Conditional Logic: Complete Guide',
  'day-6.mdx': 'Essential n8n Nodes: The Complete Reference Guide (2026)',
  'day-7.mdx': 'n8n Error Handling: Debug & Fix Broken Workflows',
  'day-8.mdx': 'WordPress to n8n: Auto-Capture Form Leads via Webhook',
  'day-9.mdx': 'Lead Scoring Automation with n8n & Brevo (Free Template)',
  'day-10.mdx': 'n8n Email Automation: Build Drip Sequences with Brevo',
  'day-11.mdx': 'n8n + Airtable: Build a Free CRM Automation',
  'day-12.mdx': 'n8n Google Sheets Integration: Auto-Sync Data Tutorial',
  'day-13.mdx': 'n8n Slack Notifications: Automated Alert System Guide',
  'day-14.mdx': 'n8n API Integration: Pull External Data into Your CRM',
  'day-15.mdx': 'Generate PDF Reports Automatically with n8n',
  'day-16.mdx': 'n8n + OpenAI: Build an AI Content Summarizer',
  'day-17.mdx': 'Automate Social Media Posting with n8n (Multi-Platform)',
  'day-18.mdx': 'Auto-Generate Invoices with n8n: Complete Workflow',
  'day-19.mdx': 'Website Uptime Monitoring with n8n (Free Alert System)',
  'day-20.mdx': 'n8n Database Sync: PostgreSQL & MySQL Automation',
  'day-21.mdx': 'Lead Enrichment Automation: n8n + Apollo.io Guide',
  'day-22.mdx': 'n8n Cron & Scheduling: Automate Recurring Tasks',
  'day-23.mdx': 'n8n File Processing: Upload, Transform & Store Files',
  'day-24.mdx': 'Complex n8n Workflows: Multi-Step Automation Patterns',
  'day-25.mdx': 'n8n vs Zapier: Which Automation Tool Should You Use?',
  'day-26.mdx': 'How to Self-Host n8n on Vultr VPS (Complete Guide)',
  'day-27.mdx': 'n8n Security Best Practices for Production Deployments',
  'day-28.mdx': 'n8n for Teams: Multi-User Workflows & Permissions',
  'day-29.mdx': 'How to Scale n8n: Queue Mode, Workers & Performance',
  'day-30.mdx': 'n8n Production Architecture: The Complete Playbook'
};

const dir = path.join(__dirname, 'content/blog/30-days-of-n8n-automation');

for (const [filename, newTitle] of Object.entries(updates)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace block scalar format
  content = content.replace(/seoTitle:\s*>-\s*[\s\S]*?(?=seoDescription:)/, `seoTitle: >-\n  ${newTitle}\n`);
  
  // Replace double quote format
  content = content.replace(/seoTitle:\s*".*?"/, `seoTitle: "${newTitle}"`);
  
  // Replace single quote format
  content = content.replace(/seoTitle:\s*'.*?'/, `seoTitle: '${newTitle}'`);
  
  // Clean up any double-replacements if multiple regexes matched
  // (Not normally an issue because if one matched, the old quote pattern is gone)
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filename}`);
  }
}
