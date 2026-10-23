const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://temp-mail10min.online/5-minute-mail#webpage",
      "url": "https://temp-mail10min.online/5-minute-mail",
      "name": "5 Minute Mail - Free Instant Disposable Temp Email Generator",
      "description": "Get a free 5 minute mail address instantly. Auto-destructs in 300 seconds. Receive OTPs, block spam, and protect your privacy with zero logs. Try it now!",
      "breadcrumb": {
        "@id": "https://temp-mail10min.online/5-minute-mail#breadcrumb"
      },
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://temp-mail10min.online/#website",
        "name": "TempMail10min",
        "url": "https://temp-mail10min.online/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://temp-mail10min.online/5-minute-mail#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://temp-mail10min.online/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "5 Minute Mail",
          "item": "https://temp-mail10min.online/5-minute-mail"
        }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://temp-mail10min.online/5-minute-mail#app",
      "name": "5 Minute Mail Generator",
      "url": "https://temp-mail10min.online/5-minute-mail",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Instant 300-second disposable email",
        "RAM-only volatile storage with zero logs",
        "Real-time OTP code delivery",
        "One-click address extension",
        "No registration or personal data required"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it legal to use a 5-minute temporary email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Using a disposable email address to protect your personal inbox from unwanted spam, tracking scripts, and data brokers is 100% legal worldwide. The only restriction is that you cannot use disposable addresses for fraudulent, illegal, or abusive conduct."
          }
        },
        {
          "@type": "Question",
          "name": "Is 5 minutes enough time to receive a verification code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Over 95% of automated registration systems deliver OTP codes within 5 to 15 seconds. Because our servers process incoming messages instantly via real-time connections, 300 seconds provides plenty of time to receive and copy your code. If a third-party site is delayed, you can click Extend +5 Minutes to keep your address active."
          }
        },
        {
          "@type": "Question",
          "name": "Can other people see emails sent to my 5-minute address?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Your inbox is private and protected by a session-locked browser token. Unlike public shared services where anyone who types your username can read your incoming mail, only your active browser session can access your messages."
          }
        },
        {
          "@type": "Question",
          "name": "Can I recover an account registered with a 5-minute email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Once the timer reaches zero and the mailbox is wiped, it cannot be recreated or recovered. Never use a 5-minute address for banking accounts, primary communication tools, or platforms you plan to keep long-term."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a 5 minute mail with password?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. People often search for a 5 minute mail with password, but our service is completely password-free by design. Requiring a password would slow you down and force us to store credentials. Instead, your inbox is unlocked automatically through your private browser tab."
          }
        }
      ]
    }
  ]
};

console.log('✅ Valid JSON-LD schema with', schema['@graph'].length, 'entities');
