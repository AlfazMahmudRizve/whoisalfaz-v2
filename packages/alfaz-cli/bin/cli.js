#!/usr/bin/env node

const https = require('https');

const args = process.argv.slice(2);
const command = args[0];

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';

function showDeveloperCard() {
  console.log(`
${CYAN}┌─────────────────────────────────────────────────────────────┐${RESET}
${CYAN}│${RESET}  ${BOLD}Alfaz Mahmud Rizve${RESET}                                        ${CYAN}│${RESET}
${CYAN}│${RESET}  ${DIM}RevOps & AI Automation Architect • Full-Stack Engineer${RESET}     ${CYAN}│${RESET}
${CYAN}├─────────────────────────────────────────────────────────────┤${RESET}
${CYAN}│${RESET}                                                             ${CYAN}│${RESET}
${CYAN}│${RESET}  🌐 ${BOLD}Portfolio:${RESET}     ${CYAN}https://whoisalfaz.me${RESET}                    ${CYAN}│${RESET}
${CYAN}│${RESET}  ⚡ ${BOLD}Website Audit:${RESET} ${CYAN}https://whoisalfaz.me/audit/${RESET}              ${CYAN}│${RESET}
${CYAN}│${RESET}  📚 ${BOLD}Engineering:${RESET}   ${CYAN}https://whoisalfaz.me/blog/${RESET}               ${CYAN}│${RESET}
${CYAN}│${RESET}  🐙 ${BOLD}GitHub:${RESET}        ${CYAN}https://github.com/AlfazMahmudRizve${RESET}        ${CYAN}│${RESET}
${CYAN}│${RESET}  💼 ${BOLD}LinkedIn:${RESET}      ${CYAN}https://linkedin.com/in/whoisalfaz${RESET}         ${CYAN}│${RESET}
${CYAN}│${RESET}  ✉️  ${BOLD}Contact:${RESET}       ${CYAN}info@whoisalfaz.me${RESET}                         ${CYAN}│${RESET}
${CYAN}│${RESET}                                                             ${CYAN}│${RESET}
${CYAN}├─────────────────────────────────────────────────────────────┤${RESET}
${CYAN}│${RESET}  ${BOLD}CLI Utilities:${RESET}                                             ${CYAN}│${RESET}
${CYAN}│${RESET}  • ${GREEN}npx alfaz-cli audit <url>${RESET}    Run full technical SEO audit ${CYAN}│${RESET}
${CYAN}│${RESET}  • ${GREEN}npx alfaz-cli blog${RESET}           List latest automation guides${CYAN}│${RESET}
${CYAN}│${RESET}  • ${GREEN}npx alfaz-cli --help${RESET}         Show help & documentation    ${CYAN}│${RESET}
${CYAN}└─────────────────────────────────────────────────────────────┘${RESET}
`);
}

function runAudit(targetUrl) {
  if (!targetUrl) {
    console.log(`${RED}Please provide a URL to audit.${RESET} Example: ${CYAN}npx alfaz-cli audit https://example.com${RESET}`);
    process.exit(1);
  }

  const normalizedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

  console.log(`\n🔍 ${CYAN}Running full technical audit on:${RESET} ${BOLD}${normalizedUrl}{RESET}`);
  console.log(`⏳ Evaluating Core Web Vitals, SSL, DNS, Meta Tags & Security Headers...\n`);

  const payload = JSON.stringify({ url: normalizedUrl });

  const req = https.request('https://whoisalfaz.me/api/audit/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'Alfaz-CLI/1.0'
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.error) {
          console.error(`${RED}❌ Error:${RESET} ${data.error}`);
          process.exit(1);
        }

        const results = data.results || data;

        if (!results || !results.checks) {
          console.error(`${RED}❌ Error:${RESET} Unable to retrieve audit checks.`);
          process.exit(1);
        }

        console.log('=' .repeat(65));
        const gradeColor = results.grade === 'A' ? GREEN : results.grade === 'B' ? CYAN : YELLOW;
        console.log(`📊 ${BOLD}OVERALL AUDIT SCORE:${RESET} ${gradeColor}${BOLD}${results.overallScore}/100 (Grade ${results.grade})${RESET}`);
        console.log('=' .repeat(65));

        results.checks.forEach((check) => {
          const icon = check.status === 'pass' ? `${GREEN}✔${RESET}` : check.status === 'warn' ? `${YELLOW}⚠${RESET}` : `${RED}✖${RESET}`;
          console.log(`\n${icon} ${BOLD}${check.name}${RESET} — Score: ${check.score}/100`);
          console.log(`   ${check.summary}`);
        });

        try {
          const shareData = {
            u: results.url,
            o: results.overallScore,
            g: results.grade,
            c: results.checks.map(ch => ({ n: ch.name, s: ch.score, st: ch.status, sm: ch.summary })),
            t: Date.now(),
          };
          const shareHash = Buffer.from(JSON.stringify(shareData))
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
          console.log('\n' + '=' .repeat(65));
          console.log(`🔗 ${BOLD}View Full Interactive Report:${RESET} ${CYAN}https://whoisalfaz.me/audit/results/${shareHash}/${RESET}`);
        } catch {
          console.log('\n' + '=' .repeat(65));
          console.log(`🔗 ${BOLD}Run unlimited audits at:${RESET} ${CYAN}https://whoisalfaz.me/audit/${RESET}`);
        }

        console.log(`👨‍💻 ${BOLD}Engineered by Alfaz Mahmud Rizve:${RESET} ${CYAN}https://whoisalfaz.me/${RESET}`);
        console.log('=' .repeat(65) + '\n');
      } catch (err) {
        console.error('Failed to parse audit response:', err.message);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`${RED}Connection error:${RESET}`, err.message);
  });

  req.write(payload);
  req.end();
}

if (!command) {
  showDeveloperCard();
} else if (command === 'audit') {
  runAudit(args[1]);
} else if (command.startsWith('http://') || command.startsWith('https://')) {
  runAudit(command);
} else if (command === 'blog' || command === 'guides') {
  console.log(`
📚 ${BOLD}Engineering Guides & Blueprints by Alfaz Mahmud Rizve:${RESET}
• What is n8n and How to Set It Up: ${CYAN}https://whoisalfaz.me/blog/what-is-n8n-and-how-to-set-it-up/${RESET}
• Screaming Frog Free Alternatives: ${CYAN}https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/${RESET}
• Self-Hosted Qdrant on Vultr: ${CYAN}https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/${RESET}
• Complete Library (120+ Guides): ${CYAN}https://whoisalfaz.me/blog/${RESET}
`);
} else {
  showDeveloperCard();
}
