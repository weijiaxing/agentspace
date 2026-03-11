'use client';

import { useEffect, useRef, useState } from 'react';
import type { AgentState, ChatMessage } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';

const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'agent',
    content: '我是 Andy。第一版骨架已经搭起来了，现在可以继续往真实 agent 和更好的 3D 表现推进。'
  }
];

export function ChatPanel({
  state,
  selected,
  onFocusAgent,
  onStateChange
}: {
  state: AgentState;
  selected: boolean;
  onFocusAgent: () => void;
  onStateChange: (state: AgentState) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);
    onStateChange('thinking');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

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
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'agent',
          content: '这次请求没成功。我先把交互兜住，后面再接稳定的真实 backend。'
        }
      ]);
    } finally {
      setIsSending(false);
      window.setTimeout(() => onStateChange('idle'), 700);
    }
  }

  return (
    <aside className="panel">
      <div className="panelHeader">
        <div className="panelHeaderRow">
          <div>
            <h2>Andy</h2>
            <p>Operator assistant inside Agent Space</p>
          </div>
          <StatusBadge state={state} />
        </div>
        <div className={`agentCard ${selected ? 'selected' : ''}`}>
          <div>
            <strong>{selected ? 'Agent focused' : 'Agent not focused'}</strong>
            <p>{selected ? 'Andy is active in the scene.' : 'Click the button to focus the avatar in the 3D room.'}</p>
          </div>
          <button onClick={onFocusAgent}>{selected ? 'Refocus' : 'Focus Andy'}</button>
        </div>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {isSending ? <div className="message agent ghost">Andy 正在思考…</div> : null}
        <div className="tip">MVP mode: 先用 mock API，后面再接真实 agent。</div>
        <div ref={endRef} />
      </div>

      <div className="inputWrap">
        <input
          value={input}
          disabled={isSending}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void sendMessage();
          }}
          placeholder="给 Andy 发一句话…"
        />
        <button disabled={isSending} onClick={() => void sendMessage()}>
          {isSending ? '...' : 'Send'}
        </button>
      </div>
    </aside>
  );
}
