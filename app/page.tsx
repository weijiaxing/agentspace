'use client';

import { useState } from 'react';
import { SceneView } from '@/components/scene/SceneView';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { AgentState } from '@/lib/types';

export default function HomePage() {
  const [state, setState] = useState<AgentState>('idle');

  return (
    <main className="page">
      <section className="viewport">
        <div className="topbar">
          <div className="brand">
            <h1>Agent Space</h1>
            <p>A 3D interface for AI agents.</p>
          </div>
          <div className="statusCard">
            <StatusBadge state={state} />
            <p style={{ maxWidth: 240 }}>Click Andy to focus the assistant. Chat lives on the right.</p>
          </div>
        </div>
        <SceneView state={state} onSelect={() => setState('idle')} />
      </section>
      <ChatPanel state={state} onStateChange={setState} />
    </main>
  );
}
