from analyze_gsc_content_gap import filtered_queries, pages_data

# Specific query groups
clusters = {
    "Screaming Frog Free Alternatives & Competitors": [
        "screaming frog alternative", "screamingfrog alternative", "alternatives to screamingfrog",
        "alternative to screamingfrog", "screaming frog alternatives", "alternativ screamingfrog",
        "free alternative to screaming frog", "alternative to screaming frog", "alternativ til screamingfrog",
        "alternativ screaming frog", "screamingfrog alternativ", "seo frog alternative",
        "screaming frog alternative free", "best screaming frog alternatives", "screaming frog free alternative",
        "alternative zu screamingfrog", "screamingfrog alternativer", "alternative zu screaming frog",
        "alternativer til screamingfrog", "alternatives to screaming frog", "screaming frog alternativer",
        "alternativer screamingfrog", "alternatives screaming frog", "alternativ til screaming frog",
        "alternativer til screaming frog", "alternativen zu screamingfrog", "screaming frog alternativ",
        "screaming frog seo spider free alternative", "free screaming frog alternative", "screaming frog competitors",
        "alternativen zu screaming frog", "screaming frog free", "alternativer screaming frog",
        "screaming frog online alternative", "screaming frog alternative online", "screaming frog open source alternative",
        "screaming frog seo spider alternative"
    ],
    "Screaming Frog Direct 1-on-1 Head-to-Head Comparisons": [
        "screaming frog vs lil robots", "screaming frog vs website auditor", "screaming frog vs deepcrawl",
        "screaming frog vs ahrefs", "ahrefs vs screaming frog",
        "how does crawlnow compare to screaming frog in providing website crawling and technical seo audit capabilities for digital marketing teams?"
    ],
    "Dify Python Code Export & Agent Workflow Pipelines": [
        "dify workflow export python code agent", "dify workflow content generation agent pipeline",
        "dify vs n8n", "n8n vs dify", "@n8n/n8n-nodes-langchain.lmchatopenai\" \"modelname\"",
        "dify difference between agent and workflow"
    ],
    "ManyChat Pricing, Plans & SMS/WhatsApp Tiering": [
        "manychat pricing", "manychat whatsapp pricing", "manychat pricing official 2026",
        "manychat price", "manychat agency pricing", "manychat sms pricing", "manychat cost",
        "how much is manychat", "manychat plans", "manychat.com pricing", "manychat pricing calculator",
        "pricing manychat", "how much do broadcasts costs on manychat", "how much does manychat cost",
        "many chat pricing", "many chats pricing"
    ],
    "ManyChat Alternatives & CRM Integrations": [
        "manychat alternative", "manychat leadconnector integration", "manychat alternatives",
        "alternatives to manychat", "alternative to manychat", "manychat languages"
    ],
    "n8n Voice Agents & Monitoring Workflows": [
        "n8n template workflows for check brand visibility in ai", "n8n voice agent",
        "n8n website monitoring", "n8n cloud", "n8n branding", "n8n brand guidelines"
    ],
    "Call Attribution & GTM Comparisons (WhatConverts vs CallRail / Centerflow)": [
        "whatconverts vs callrail", "callrail vs whatconverts", "whatconverts vs centerflow"
    ],
    "AI SDR & Creative Automation Teardowns": [
        "tapstitch vs printful", "ai sdr vs human sdr cost comparison news",
        "ai sdr vs human sdr cost conversion comparison news",
        "how does ai handle automatic creative rotation and refreshing of ads"
    ],
    "Vector Databases & Cloud Infrastructure (Vultr, Pinecone, Qdrant, BGE)": [
        "pinecone vs qdrant", "vultr vs aws", "bge llm", "intitle:\"vultr\" \"credit\" \"limit\" -vultr.com"
    ]
}

query_map = {q['key']: q for q in filtered_queries}

print("=== CLUSTER METRICS ===")
for c_name, c_queries in clusters.items():
    tot_imp = 0
    tot_clicks = 0
    weighted_pos = 0.0
    matched = 0
    for q_text in c_queries:
        if q_text in query_map:
            q = query_map[q_text]
            tot_imp += q['impressions']
            tot_clicks += q['clicks']
            weighted_pos += q['position'] * q['impressions']
            matched += 1
        else:
            # Try partial match or lower
            found = False
            for k, q in query_map.items():
                if q_text.lower() == k.lower():
                    tot_imp += q['impressions']
                    tot_clicks += q['clicks']
                    weighted_pos += q['position'] * q['impressions']
                    matched += 1
                    found = True
                    break
    if tot_imp > 0:
        avg_pos = weighted_pos / tot_imp
        ctr = (tot_clicks / tot_imp) * 100
        print(f"\nCluster: {c_name}")
        print(f"  Matched Queries: {matched}/{len(c_queries)}")
        print(f"  Total Impressions: {tot_imp} | Clicks: {tot_clicks} | CTR: {ctr:.2f}% | Avg Position: {avg_pos:.1f}")

