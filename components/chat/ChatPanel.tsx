'use client';

import { useState } from 'react';
import type { AgentState, ChatMessage } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';

const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'agent',
    content: '我是 Andy。点你了，Agent Space 的第一版就该开工了。'
  }
];

export function ChatPanel({ state, onStateChange }: { state: AgentState; onStateChange: (state: AgentState) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');

  async function sendMessage() {
    const content = input.trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    onStateChange('thinking');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content })
    });

    const data = (await res.json()) as { reply: string };
    onStateChange('replying');

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'agent',
        content: data.reply
      }
    ]);

    window.setTimeout(() => onStateChange('idle'), 700);
  }

  return (
    <aside className="panel">
      <div className="panelHeader">
        <h2>Andy</h2>
        <p>Operator assistant inside Agent Space</p>
        <div style={{ marginTop: 12 }}>
          <StatusBadge state={state} />
        </div>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        <div className="tip">MVP mode: 先用 mock API，后面再接真实 agent。</div>
      </div>

      <div className="inputWrap">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void sendMessage();
          }}
          placeholder="给 Andy 发一句话…"
        />
        <button onClick={() => void sendMessage()}>Send</button>
      </div>
    </aside>
  );
}
