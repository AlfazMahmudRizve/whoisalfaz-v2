import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Alfaz AI Assistant | Labs | whoisalfaz",
    description: "Interactive AI assistant to discuss RevOps automation, headless architecture, and self-healing n8n pipelines.",
    alternates: {
        canonical: "https://whoisalfaz.me/labs/chat/",
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
