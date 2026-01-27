# Ai Automation & Business Consultancy for saas, agencies & small business | whoisalfaz.me

![Automation OS Logo](public/logo.png)

> **"Control. Connect. Conquer."**  
> The central nervous system for my digital existence. A high-performance, headless architecture designed to showcase the future of automation, AI, and faceless business systems.

## 🚀 Mission

I help agency owners and entrepreneurs escape the **"Content Treadmill"** and build systems that run on autopilot. This repository (`whoisalfaz-v2`) is the frontend for my personal brand, serving as both a portfolio and a laboratory for my experiments in **AI Agents**, **n8n workflows**, and **CashOps**.

---

## 🏗 Headless Architecture

This project splits the traditional monolithic CMS into a high-performance **Frontend** and a flexible **Backend**.

```mermaid
graph LR
  A[WordPress Backend] -- GraphQL API --> B(Next.js Frontend)
  B -- React Server Components --> C{User Experience}
  D[n8n Automation] -- Webhooks --> A
  E[AI Agents] -- Chat Interface --> B
```

### 1. The Brain (Backend)
- **CMS**: WordPress (Headless Mode)
- **API**: WPGraphQL
- **Hosting**: DigitalOcean Droplet (`v1.whoisalfaz.me`)
- **Role**: Manages content, media library, and SEO metadata. It is completely decoupled from the frontend design.

### 2. The Face (Frontend)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom Design System (Dark Mode / Glassmorphism)
- **Deployment**: Dual-Remote Pipeline (GitHub + DigitalOcean)
- **Role**: Renders the UI, manages routing, and hosts interactive tools (ROI Calculator, AI Chat).

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15** | Server-Side Rendering (SSR) & Static Generation |
| **UI/UX** | **Tailwind CSS** | Utility-first styling with "Cyberpunk" aesthetic |
| **Languages** | **JavaScript / React** | Core logic and interactive components |
| **Backend** | **WordPress + GraphQL** | Headless CMS for Blog & Pages |
| **Logic** | **n8n / Node.js** | Backend automation Workflows |
| **Security** | **xss** | Cross-Site Scripting protection for dynamic content |
| **Analytics** | **Vercel Analytics** | Performance tracking |

---

## 🔬 Key Features (Labs)

### 🤖 AI Chat Interface (`/labs/chat`)
A custom-built chat interface mimicking an AI Agen.
- **Rule-Based Logic**: Responds to keywords (Pricing, Tech Stack, Contact).
- **UI**: Streaming text effect, auto-scroll, and "Thinking" states.

### 💰 ROI Calculator (`/labs/roi`)
Interactive tool for agencies to estimate automation savings.
- **Real-time Math**: Instant calculation based on employee count & hours saved.
- **Visuals**: Dynamic progress bars and result cards.

### 📝 Tech Magazine Blog (`/blog`)
A fully custom blog engine.
- **Premium Layout**: 2-Column "Magazine" style with Sticky TOC.
- **Deep Deep**: Terminal-style code blocks and rich typography.

### 🔍 Global Search
- **Client-Side**: Instant filtering of blog posts and services.
- **Secure**: Sanitized inputs to prevent injection attacks.

---

## 📦 Deployment Protocol

This project uses a custom **Dual-Push** pipeline to ensure redundancy.

**Command:**
```bash
npm run push-all
```
*Effect*: Pushes code to both `origin` (GitHub backup) and `deploy` (Live DigitalOcean server) simultaneously.

---

## 💻 Running Locally

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/AlfazMahmudRizve/whoisalfaz-v2.git
    cd whoisalfaz-v2
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file (Contact me for API keys).

4.  **Launch**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

---

**Built by Alfaz Mahmud Rizve**  
*Building the future of work, one workflow at a time.*
