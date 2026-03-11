'use client';

import { useMemo, useState } from 'react';
import { SceneView } from '@/components/scene/SceneView';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { AgentState, AvatarMode } from '@/lib/types';

export default function HomePage() {
  const [state, setState] = useState<AgentState>('idle');
  const [selected, setSelected] = useState(true);

  const avatarMode = useMemo<AvatarMode>(() => {
    return process.env.NEXT_PUBLIC_AGENT_MODEL_ENABLED === 'true' ? 'glb' : 'placeholder';
  }, []);

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
            <p style={{ maxWidth: 260 }}>
              Click Andy to focus the assistant. This MVP already has a live scene, chat panel, and configurable backend.
            </p>
          </div>
        </div>

        {!selected ? (
          <button className="focusHint" onClick={() => setSelected(true)}>
            Focus Andy
          </button>
        ) : null}

        <SceneView
          state={state}
          selected={selected}
          avatarMode={avatarMode}
          onSelect={() => setSelected(true)}
          onBackgroundSelect={() => setSelected(false)}
        />
      </section>
      <ChatPanel
        state={state}
        selected={selected}
        avatarMode={avatarMode}
        onFocusAgent={() => setSelected(true)}
        onStateChange={setState}
      />
    </main>
  );
}
