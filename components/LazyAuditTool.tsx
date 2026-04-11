'use client';

import dynamic from 'next/dynamic';

const AuditTool = dynamic(() => import('./AuditTool'), { ssr: false });

export default function LazyAuditTool() {
    return <AuditTool />;
}
